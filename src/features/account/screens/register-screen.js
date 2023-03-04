import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, TouchableOpacity, View } from "react-native";
import PhoneInput from "react-native-phone-number-input";
import { useFocusEffect } from "@react-navigation/native";
import messaging from "@react-native-firebase/messaging";
import auth from "@react-native-firebase/auth";
import { getFcmToken } from "../../../services/notifications/notifications.service";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { ActivityIndicator, Colors, Avatar } from "react-native-paper";
//import { getAuth } from "firebase/auth";
import { register, saveUserToDb } from "../../../redux/actions/auth";
import {
  userStateChange,
  noUser,
} from "../../../redux/store/slices/authSlice";

import {
  AccountContainer,
  RegisterBtn,
  PhoneNumberInput,
  AuthInput,
  ErrorContainer,
  AvatarContainer,
  BtnContainer
} from "../components/account-styles";
import Logo from "../../../../assets/images/LOGO_300.svg";
import { ScreenOsVariant } from "./ScreenOsVariant";
import { Spacer } from "../../../components/spacer/spacer-component";
import { Text } from "../../../components/typography/text-component";

export const RegisterScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();

  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const phoneInput = useRef(null);


  const getUserToken = async () => {
    const tok = await messaging().getToken();
    const tokString = JSON.stringify(tok)
    console.log("token in function :", tokString);
    setUserToken(tokString);
    console.log("token in state ", userToken);
  };

  const saveUserCallBack = async () => {
    const { uid } = auth().currentUser;
    if (uid !== null) {
      // get token and save it with Async storage
      await getUserToken();
      console.log("token on saveUser function: ", userToken)
      await saveUserToDb(uid, userEmail, userName, phoneNumber, userToken)
        .then(() => {
          dispatch(
            userStateChange({
              userId: uid,
              userName: userName,
              userPhone: phoneNumber,
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
      console.log("FAILURE!!!");
    }
  };

  const handleRegister = async () => {
    setIsLoading(true);
    const testPassword = password === repeatedPassword;
    const testEmail = /^[a-z0-9.]{1,64}@[a-z0-9.]{1,64}$/i.test(userEmail);
    const checkValid = phoneInput.current.isValidNumber(phoneNumber);

    if (testPassword && testEmail && checkValid) {
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
      console.log("phone valid value ", checkValid)
      return;
    }
  };

  useEffect(() => {
    getUserToken();
  }, [])


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
          placeholder="Username"
          onChangeText={(u) => setUserName(u)}
        />
        <Spacer size="small" />
        <PhoneNumberInput
          ref={phoneInput}
          defaultValue={phoneNumber}
          defaultCode="CA"
          layout="first"
          onChangeText={(text) => {
            setPhoneNumber(text);
          }}
          withDarkTheme={false}
          withShadow

        />
        <Spacer size="small" />
        <AuthInput
          label="E-mail"
          value={userEmail}
          textContentType="emailAddress"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={(u) => setUserEmail(u)}
        />
        <Spacer size="small" />
        <AuthInput
          label="Password"
          value={password}
          textContentType="password"
          secureTextEntry
          autoCapitalize="none"
          onChangeText={(p) => setPassword(p)}
        />
        <Spacer size="small" />
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
        <Spacer size="small" />
        {!isLoading ? (
          <BtnContainer>
            <RegisterBtn icon="keyboard-return" mode="contained" onPress={() => navigation.goBack()}>
              Back
            </RegisterBtn>
            <RegisterBtn
              icon="email" mode="contained" onPress={handleRegister}>
              Sign up
            </RegisterBtn>
          </BtnContainer>
        ) : (
          <ActivityIndicator animating={true} color={Colors.red400} />
        )}
      </AccountContainer>
    </ScreenOsVariant>
  );
};
