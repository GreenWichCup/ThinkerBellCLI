import React, { useState } from "react";
import { useDispatch } from "react-redux";
import auth from "@react-native-firebase/auth"
import { ActivityIndicator, Colors } from "react-native-paper";
import { login } from "../../../redux/actions/auth";
import { View, Alert } from "react-native";
import {
  AccountContainer,
  LoginBtn,
  AuthInput,
  ErrorContainer,
  BtnContainer,
} from "../components/account-styles";
import Logo from "../../../../assets/images/LOGO_300.svg";
import { Spacer } from "../../../components/spacer/spacer-component";
import { Text } from "../../../components/typography/text-component";
import { ScreenOsVariant } from "./ScreenOsVariant";
import { TouchableOpacity } from "react-native-gesture-handler";

export const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (email !== "" && password !== "") {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 3200);
      dispatch(login(email, password));
    } else {
      Alert.alert('Login', 'Email and password are invalid', [
        { text: 'OK' },
      ]);
    }
  };

  const handleResetPassword = async () => {
    if (email != null) {
      auth().sendPasswordResetEmail(email)
        .then(() => {
          Alert.alert('Password reset link sent to your email');
        }).catch((err) => {
          console.log("error reset function ", err)
        });

    } else {
      Alert.alert("Please enter a valid email.");
    }
  }

  return (
    <ScreenOsVariant>
      <AccountContainer>
        <View style={{ alignSelf: "center", marginBottom: 24 }}>
          <Logo width={128} height={128} />
        </View>
        <AuthInput
          label="E-mail"
          value={email}
          textContentType="emailAddress"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={(u) => setEmail(u)}
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
        <Spacer size="large" />
        {error && (
          <ErrorContainer size="large">
            <Text variant="error">{error}</Text>
          </ErrorContainer>
        )}
        {!isLoading ? (
          <>
            <BtnContainer>
              <LoginBtn icon="keyboard-return" mode="contained" onPress={() => navigation.goBack()}>
                Back
              </LoginBtn>
              <LoginBtn
                icon="lock-open-outline"
                mode="contained"
                onPress={handleLogin}
              >
                Login
              </LoginBtn>
              <Spacer size="large" />
            </BtnContainer>
            <Spacer size="large" />
            <TouchableOpacity style={{ alignSelf: "center" }} onPress={handleResetPassword}>
              <Text>
                Forgot password ?
              </Text>
            </TouchableOpacity></>
        ) : (
          <ActivityIndicator animating={true} color={Colors.red400} />
        )}
      </AccountContainer>
    </ScreenOsVariant>
  );
};
