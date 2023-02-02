import React from "react";
import { View } from "react-native";
import {
  AccountBackground,
  AccountContainer,
  AuthButton,
  AccountCover,
  LogoContainer,
} from "../components/account-styles";
import Logo from "../../../../assets/images/LOGO_300.svg";
import { Spacer } from "../../../components/spacer/spacer-component";
import { ScreenOsVariant } from "./ScreenOsVariant";

export const AccountScreen = ({ route, navigation }) => {
  return (
    <ScreenOsVariant>
      <AccountContainer>
        <View style={{ alignSelf: "center", marginBottom: 24 }}>
          <Logo width={128} height={128} />
        </View>
        <AuthButton
          icon="account-arrow-right"
          mode="contained"
          onPress={() => navigation.navigate("Login")}
        >
          Login
        </AuthButton>
        <Spacer size="large" />
        <AuthButton
          icon="account-details"
          mode="contained"
          onPress={() =>
            navigation.navigate("Register", {
              snapUri: null,
            })
          }
        >
          Register
        </AuthButton>
      </AccountContainer>
    </ScreenOsVariant>
  );
};
