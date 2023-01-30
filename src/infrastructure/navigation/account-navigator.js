import React from "react";
import { Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import { AccountScreen } from "../../features/account/screens/account-screen";
import { LoginScreen } from "../../features/account/screens/login-screen";
import { RegisterScreen } from "../../features/account/screens/register-screen";
import { CameraScreen } from "../../features/account/screens/camera-screen";
const AccountStack = createStackNavigator();

export const AccountNavigator = () => {

  return (
    <AccountStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AccountStack.Screen name="Main" component={AccountScreen} />
      <AccountStack.Screen name="Login" component={LoginScreen} />
      <AccountStack.Screen name="Register" component={RegisterScreen} />
      <AccountStack.Screen name="Camera" component={CameraScreen} />
    </AccountStack.Navigator>
  );
};
