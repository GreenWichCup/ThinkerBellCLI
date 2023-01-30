import styled from "styled-components";
import { Button, TextInput } from "react-native-paper";
import { Platform, StatusBar } from "react-native";

import { colors } from "../../../infrastructure/theme/colors";
import { Text } from "../../../components/typography/text-component";
import {
  screenWidth,
  screenHeight,
} from "../../../components/utility/dimensions";

export const AccountBackgroundIos = styled.ImageBackground.attrs({
  backgroundColor: "rgba(255, 255, 255, 0.7)",
})`
  flex: 1;
  justify-content: center;
`;
export const AccountBackgroundAndroid = styled.ImageBackground.attrs({
  backgroundColor: "rgba(255, 255, 255, 0.7)",
})`
  height: ${screenHeight + StatusBar.currentHeight}px;
  width: ${screenWidth}px;
  z-index: -123;
  resize-mode: stretch;
  justify-content: center;
`;

export const AccountBackground = styled.ImageBackground.attrs({})`
  flex: 1;
  background-color: #ddd;
  align-items: center;
  justify-content: center;
`;

export const AccountCover = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.1);
`;

export const AccountContainer = styled.View`
  padding: ${(props) => props.theme.space[0]};
  margin-top: ${(props) => props.theme.space[4]};
  align-self: center;
  width: 90%;
`;

export const LogoContainer = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 20%;
  align-items: center;
  z-index: 5628;
`;

export const Logo = styled.Image.attrs({
  source: require("../../../../assets/images/LOGO_300.svg"),
})`
  transform: scale(0.4);
  align-self: center;
  margin-bottom: ${(props) => props.theme.space[2]};
`;

export const AuthButton = styled(Button).attrs({
  color: colors.bg.tertiary,
})`
  padding: ${(props) => props.theme.space[2]};
  margin-top: ${(props) => props.theme.space[2]};
`;

export const AuthInput = styled(TextInput).attrs({
  mode: "outlined",
})`
  margin-top: ${(props) => props.theme.space[1]};
  width: 100%;
  height: 48px;
  align-self: center;
`;

export const Title = styled(Text)`
  font-size: 30px;
`;
export const ErrorContainer = styled.View`
  max-width: 300px;
  align-items: center;
  align-self: center;
  margin-top: ${(props) => props.theme.space[2]};
  margin-bottom: ${(props) => props.theme.space[2]};
`;

export const AnimationWrapper = styled.View`
  width: 100%;
  height: 40%;
  position: absolute;
  top: 30px;
  padding: ${(props) => props.theme.space[2]};
`;

export const AvatarContainer = styled.View`
  align-items: center;
`;