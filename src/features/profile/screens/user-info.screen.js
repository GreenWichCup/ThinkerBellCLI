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
import Bell_Solo2 from "../../../../assets/images/Bell_solo2.svg";

import {
  userStateChange,
  userStateValue,
} from "../../../redux/store/slices/authSlice";

export const UserInfoScreen = ({ route, navigation }) => {
  const userDataState = useSelector(userStateValue);
  const dispatch = useDispatch();
  const [profilePhoto, setProfilePhoto] = useState(null);

  const [userEmail, setUserEmail] = useState(userDataState.currentUser.userEmail);
  const [userName, setUserName] = useState(userDataState.currentUser.userName);
  const [userPhone, setUserPhone] = useState(userDataState.currentUser.userPhone);

  //const [editUserInfo, setEditUserInfo] = useState(false);

  //@ change function to call firestore instead of Async storage
  const getProfilePicture = useCallback(async () => {
    try {
      const photoUri = await AsyncStorage.getItem(
        userDataState.currentUser.userId
      );
      setProfilePhoto(photoUri);
    } catch (error) {
      console.log("AsyncStorage error:", error);
      console.log(
        "user Data for photo edit profile :",
        userDataState.currentUser
      );
    }
  }, [userDataState.currentUser]);

  // create helpers function for firestore data update

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
            <View
              style={styles.profilePhoto}
            >
              <Bell_Solo2 width={84} height={84} />
            </View>
          ) : (
            <Avatar.Image
              size={80}
              source={{ uri: `file://${profilePhoto}` }}
              style={{ alignSelf: "center" }}
            />
          )}
        </TouchableOpacity>
        <Spacer position="top" size="large" />
        <Text variant="label">{userDataState.currentUser.userName}</Text>
        <Spacer position="top" size="large" />
      </AvatarContainer>
      <Spacer position="top" size="large" />
      <TextInput
        mode="outlined"
        style={styles.text_input}
        left={
          <TextInput.Icon
            name={() => <FontAwesome5Icon name="user-edit" size={16} color="black" />}
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
              ...userDataState.currentUser,
              userName: userName,
            })
          )
        }
        label="Username"
        placeholderTextColor={colors.text.secondary}
      />
      <Spacer position="top" size="medium" />
      <TextInput
        mode="outlined"
        style={styles.text_input}
        left={<TextInput.Icon name={() => <EntypoIcon name="email" size={16} color="black" />} />}
        value={userEmail}
        textContentType="emailAddress"
        keyboardType="default"
        autoCapitalize="none"
        onChangeText={(u) => setUserEmail(u)}
        onEndEditing={() =>
          dispatch(
            userStateChange({
              ...userDataState.currentUser,
              userEmail: userEmail,
            })
          )
        }
        label="Email"
        placeholderTextColor={colors.text.secondary}
      />
      <Spacer position="top" size="medium" />

      <TextInput
        mode="outlined"
        style={styles.text_input}
        left={<TextInput.Icon name={() => <FontAwesome5Icon name="phone-alt" size={16} color="black" />} />}
        value={userPhone}
        textContentType="telephoneNumber"
        keyboardType="default"
        autoCapitalize="none"
        onChangeText={(u) => setUserPhone(u)}
        onEndEditing={() =>
          dispatch(
            userStateChange({
              ...userDataState.currentUser,
              userPhone: userPhone,
            })
          )
        }
        label="Phone"
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
  userName: {
    alignSelf: "center",
  },
  profilePhoto: {
    backgroundColor: "green",
    borderRadius: 50,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 8,
    paddingBottom: 8,
    alignSelf: "center",
  }
});
