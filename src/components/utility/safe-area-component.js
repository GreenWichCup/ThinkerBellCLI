import { SafeAreaView, StatusBar } from "react-native";
import styled from "styled-components";

//Might be iOS condition
//${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}px `};

export const SafeArea = styled(SafeAreaView)`
  flex: 1;
  background-color: ${(props) => props.theme.colors.bg.primary};
`;
