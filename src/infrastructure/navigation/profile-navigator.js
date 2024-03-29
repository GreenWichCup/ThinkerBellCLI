import React, { useEffect } from "react";
import { IconButton, Colors } from "react-native-paper";
import EntypoIcon from "react-native-vector-icons/Entypo";
import firestore from "@react-native-firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import auth from "@react-native-firebase/auth";
//import { signOut } from "firebase/auth";
//import { auth } from "../../services/authentification/authentification-service";
import {
  userStateChange,
  noUser,
  userStateValue,
} from "../../redux/store/slices/authSlice";
import { ProfileScreen } from "../../features/profile/screens/profile-screen";
import { FavouritesScreen } from "../../features/profile/screens/favourites-screen";
import { CameraScreen } from "../../features/profile/screens/camera-screen";
import { UserInfoScreen } from "../../features/profile/screens/user-info.screen";
import { UserProductScreen } from "../../features/profile/screens/user-product.screen";
import { SettingScreen } from "../../features/profile/screens/setting.screen";
import { ActivityScreen } from "../../features/profile/screens/activity.screen";
const ProfileStack = createStackNavigator();

export const ProfileNavigator = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const userDataState = useSelector(userStateValue);
  const handleLogout = async () => {
    auth()
      .signOut()
      .then(() => {
        dispatch(
          noUser({
            userEmail: null,
            userId: null,
            userName: null,
            userPhoto: null,
          })
        );
      })
      .catch((e) => console.log(e));
  };
  const saveUserChanges = async () => {
    try {
      await firestore().collection("users").doc(userDataState.currentUser.userId).update({
        userName: userDataState.currentUser.userName,
        userEmail: userDataState.currentUser.userEmail,
        userPhone: userDataState.currentUser.userPhone,
      });
      console.log("userDataState", userDataState);
    } catch (error) {
      console.log("error write db data:", error);
    }
  };
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <ProfileStack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        initialParams={{ snapUri: userDataState.currentUser.userPhoto }}
      />
      <ProfileStack.Screen name="Favourites" component={FavouritesScreen} />
      <ProfileStack.Screen name="Camera" component={CameraScreen} />
      <ProfileStack.Screen name="UserInfoScreen" component={UserInfoScreen} options={{
        headerShown: true,
        headerRight: () => (
          <IconButton
            icon={() => <EntypoIcon size={20} color="black" name="save" />}
            color={Colors.red500}
            size={20}
            onPress={() => saveUserChanges()}
          />
        )

      }} />
      <ProfileStack.Screen
        name="UserProductScreen"
        component={UserProductScreen}
      />
      <ProfileStack.Screen name="ActivityScreen" component={ActivityScreen} />
      <ProfileStack.Screen
        name="SettingScreen"
        component={SettingScreen}
        options={{
          headerShown: true,
          headerRight: () => (
            <IconButton
              icon={() => <EntypoIcon size={20} color="black" name="log-out" />}
              color={Colors.red500}
              size={20}
              onPress={handleLogout}
            />
          ),
        }}
      />
    </ProfileStack.Navigator >
  );
};
