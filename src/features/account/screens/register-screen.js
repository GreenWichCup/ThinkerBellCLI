import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, TouchableOpacity } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import messaging from "@react-native-firebase/messaging";
import auth from "@react-native-firebase/auth";
import { getFcmToken } from "../../../services/notifications/notifications.service";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { ActivityIndicator, Colors, Avatar } from "react-native-paper";
//import { getAuth } from "firebase/auth";
import { register, saveUserToDb } from "../../../redux/actions/auth";
import {
  userStateValue,
  userStateChange,
  noUser,
} from "../../../redux/store/slices/authSlice";

import {
  AccountContainer,
  AuthButton,
  AuthInput,
  ErrorContainer,
  AvatarContainer,
} from "../components/account-styles";
import Logo from "../../../../assets/images/LOGO_300.svg";
import { colors } from "../../../infrastructure/theme/colors";
import { ScreenOsVariant } from "./ScreenOsVariant";
import { Spacer } from "../../../components/spacer/spacer-component";
import { Text } from "../../../components/typography/text-component";
import { NotificationHandler } from "../../../services/notifications/foregroundHandler";
import PushNotification from "react-native-push-notification";

export const RegisterScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [userPhoto, setUserPhoto] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [photoStorageKey, setPhotoStorageKey] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const profilePhoto = route.params.snapUri;
  const user = useSelector(userStateValue);
  const getUserToken = async () => {
    const tok = await messaging().getToken();
    const tokString = JSON.stringify(tok)
    setUserToken(tokString);
  };

  const getProfilePicture = useCallback(async () => {
    try {
      if (profilePhoto !== null) {
        setPhotoStorageKey(profilePhoto);
        const photoUri = await AsyncStorage.getItem(profilePhoto);
        setUserPhoto(photoUri);
      }
    } catch (e) {
      console.log("AsyncStorage :", e);
    }
  }, [profilePhoto]);

  useFocusEffect(
    useCallback(() => {
      getProfilePicture();
    }, [getProfilePicture])
  );

  const saveUserCallBack = async () => {
    const { uid } = auth().currentUser;
    if (uid !== null) {
      // get token and save it with Async storage
      await getUserToken();
      await saveUserToDb(uid, userEmail, userName, profilePhoto, userToken)
        .then(() => {
          dispatch(
            userStateChange({
              userId: uid,
              userName: userName,
              userPhoto: photoStorageKey,
              userEmail: userEmail,
              token: JSON.stringify(userToken),
            })
          );
        })
        .catch((e) => {
          console.log("situation", e);
        });
      setIsLoading(false);
    } else {
      Alert.alert("FAILURE!!!");
    }
  };

  const handleRegister = async () => {
    setIsLoading(true);
    const testPassword = password === repeatedPassword;
    const testEmail = /^[a-z0-9.]{1,64}@[a-z0-9.]{1,64}$/i.test(userEmail);

    if (testPassword && testEmail) {
      setIsLoading(true);
      dispatch(register(userEmail, password));
      setTimeout(async () => {
        await saveUserCallBack();
        setIsLoading(false);
      }, 3200);
    } else {
      dispatch(noUser());
      setError("Error: Passords do not match");
      setIsLoading(false);
      return;
    }
  };
  return (
    <ScreenOsVariant>
      <AccountContainer>
        <AvatarContainer>
          <Logo width={128} height={128} />
        </AvatarContainer>
        <Spacer position="top" size="small" />
        <AuthInput
          label="Username"
          value={userName}
          textContentType="name"
          keyboardType="default"
          autoCapitalize="none"
          onChangeText={(u) => setUserName(u)}
        />
        <Spacer size="medium" />

        <AuthInput
          label="E-mail"
          value={userEmail}
          textContentType="emailAddress"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={(u) => setUserEmail(u)}
        />
        <Spacer size="medium" />
        <AuthInput
          label="Password"
          value={password}
          textContentType="password"
          secureTextEntry
          autoCapitalize="none"
          onChangeText={(p) => setPassword(p)}
        />
        <Spacer size="medium" />
        <AuthInput
          label="Repeat Password"
          value={repeatedPassword}
          textContentType="password"
          secureTextEntry
          autoCapitalize="none"
          onChangeText={(p) => setRepeatedPassword(p)}
        />
        {error && (
          <ErrorContainer size="medium">
            <Text variant="error">{error}</Text>
          </ErrorContainer>
        )}
        <Spacer size="medium" />
        {!isLoading ? (
          <AuthButton icon="email" mode="contained" onPress={handleRegister}>
            Register
          </AuthButton>
        ) : (
          <ActivityIndicator animating={true} color={Colors.red400} />
        )}
        <Spacer size="medium" />
        <AuthButton mode="contained" onPress={() => navigation.goBack()}>
          Back
        </AuthButton>
      </AccountContainer>
    </ScreenOsVariant>
  );
};
