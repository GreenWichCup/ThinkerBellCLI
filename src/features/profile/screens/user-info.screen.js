import React, { useContext, useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import auth from "@react-native-firebase/auth";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
import { TouchableOpacity, FlatList, View, StyleSheet } from "react-native";
import { Avatar, TextInput } from "react-native-paper";
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import EntypoIcon from 'react-native-vector-icons/Entypo';

import { colors } from "../../../infrastructure/theme/colors";
import { Text } from "../../../components/typography/text-component";
import { Spacer } from "../../../components/spacer/spacer-component";
import { SafeArea } from "../../../components/utility/safe-area-component";

import { AvatarContainer } from "../components/profile.style";

import {
  userStateChange,
  userStateValue,
} from "../../../redux/store/slices/authSlice";

export const UserInfoScreen = ({ route, navigation }) => {
  const userAuthState = useSelector(userStateValue);
  const dispatch = useDispatch();
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [email, setEmail] = useState(userAuthState.currentUser.userEmail);
  const [userName, setUserName] = useState(userAuthState.currentUser.userName);

  //const [editUserInfo, setEditUserInfo] = useState(false);

  //@ change function to call firestore instead of Async storage
  const getProfilePicture = useCallback(async () => {
    try {
      const photoUri = await AsyncStorage.getItem(
        userAuthState.currentUser.userId
      );
      setProfilePhoto(photoUri);
    } catch (error) {
      console.log("AsyncStorage error:", error);
      console.log(
        "user Data for photo edit profile :",
        userAuthState.currentUser
      );
    }
  }, [userAuthState.currentUser]);

  useFocusEffect(
    useCallback(() => {
      getProfilePicture();
    }, [getProfilePicture])
  );

  return (
    <SafeArea>
      <AvatarContainer>
        <Spacer position="top" size="large" />
        <TouchableOpacity onPress={() => navigation.navigate("Camera")}>
          {profilePhoto === null ? (
            <Avatar.Icon
              size={80}
              icon="account"
              backgroundColor={colors.bg.sixth}
            />
          ) : (
            <Avatar.Image
              size={80}
              source={{ uri: profilePhoto }}
              backgroundColor={colors.bg.secondary}
            />
          )}
        </TouchableOpacity>
        <Spacer position="top" size="large" />
        <Text variant="label">{userAuthState.currentUser.userName}</Text>
        <Spacer position="top" size="large" />
      </AvatarContainer>
      <Spacer position="top" size="large" />
      <TextInput
        style={styles.text_input}
        left={
          <TextInput.Icon
            name={() => <FontAwesome5Icon name="user-edit" size={16} />}
          />
        }
        value={userName}
        textContentType="name"
        keyboardType="default"
        autoCapitalize="none"
        onChangeText={(u) => setUserName(u)}
        onEndEditing={() =>
          dispatch(
            userStateChange({
              ...userAuthState.currentUser,
              userName: userName,
            })
          )
        }
        label="Username"
        placeholderTextColor={colors.text.secondary}
      />
      <Spacer position="top" size="medium" />
      <TextInput
        style={styles.text_input}
        left={<TextInput.Icon name={() => <EntypoIcon name="email" size={16} />} />}
        value={email}
        textContentType="emailAddress"
        keyboardType="default"
        autoCapitalize="none"
        onChangeText={(u) => setEmail(u)}
        label="Email"
        placeholderTextColor={colors.text.secondary}
      />
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  text_input: {
    color: colors.text.primary,
    alignSelf: "center",
    width: "90%",
  },
});
