import { View, Text } from "react-native";
import React from "react";
import { Platform } from "react-native";

import { KeyboardAvoidingWrapper } from "../../../components/keyboard/keyboardAvoidingWrapper.component";
import {
  AccountBackgroundIos,
  AccountBackgroundAndroid,
} from "../components/account-styles";

export const ScreenOsVariant = ({ children }) => {
  return Platform.OS === "ios" ? (
    <AccountBackgroundIos>
      <KeyboardAvoidingWrapper>{children}</KeyboardAvoidingWrapper>
    </AccountBackgroundIos>
  ) : (
    <KeyboardAvoidingWrapper>
      <AccountBackgroundAndroid>{children}</AccountBackgroundAndroid>
    </KeyboardAvoidingWrapper>
  );
};
