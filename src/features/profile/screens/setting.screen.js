import React, { useContext, useState, useEffect } from "react";
import { TouchableOpacity, View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Button, Text, TextInput } from "react-native-paper";
import { Spacer } from "../../../components/spacer/spacer-component";
import { SafeArea } from "../../../components/utility/safe-area-component";

export const SettingScreen = () => {
  return (
    <SafeArea>
      <Text>SettingScreen</Text>
    </SafeArea>
  );
};
