import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ActivityIndicator, Colors } from "react-native-paper";
import { login } from "../../../redux/actions/auth";
import { View, Alert } from "react-native";
import {
  AccountContainer,
  AuthButton,
  AuthInput,
  ErrorContainer,
} from "../components/account-styles";
import Logo from "../../../../assets/images/LOGO_300.svg";
import { Spacer } from "../../../components/spacer/spacer-component";
import { Text } from "../../../components/typography/text-component";
import { ScreenOsVariant } from "./ScreenOsVariant";

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
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    }
  };

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
        <Spacer size="large">
          <AuthInput
            label="Password"
            value={password}
            textContentType="password"
            secureTextEntry
            autoCapitalize="none"
            onChangeText={(p) => setPassword(p)}
          />
        </Spacer>
        {error && (
          <ErrorContainer size="large">
            <Text variant="error">{error}</Text>
          </ErrorContainer>
        )}
        <Spacer size="large">
          {!isLoading ? (
            <AuthButton
              icon="lock-open-outline"
              mode="contained"
              onPress={handleLogin}
            >
              Login
            </AuthButton>
          ) : (
            <ActivityIndicator animating={true} color={Colors.red400} />
          )}
        </Spacer>
        <Spacer size="large">
          <AuthButton mode="contained" onPress={() => navigation.goBack()}>
            Back
          </AuthButton>
        </Spacer>
      </AccountContainer>
    </ScreenOsVariant>
  );
};
