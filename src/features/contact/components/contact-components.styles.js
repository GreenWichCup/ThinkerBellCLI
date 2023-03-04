import styled from "styled-components";
import { Card, Avatar, Button, ActivityIndicator } from "react-native-paper";
import { FlatList, TouchableOpacity, Image } from "react-native";
import { Text } from "../../../components/typography/text-component";
import { colors } from "../../../infrastructure/theme/colors";
import { Divider } from 'react-native-paper';

export const SearchContainer = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;

export const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;

export const Separator = styled(Divider)`
  margin-left: 25%  ;
  margin-right: 25%;
  border-radius: 10px;
  height: 4px;
  background-color: ${colors.brand.quaternary}
`;

export const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`;

export const List = styled(FlatList).attrs({
  paddingHorizontal: 5,
})``;

export const ContactCard = styled(Card).attrs({
  padding: 4,
})`
  margin-bottom: ${(props) => props.theme.space[3]};
  flex: 1;
  max-width: 45%;
  margin-left: 8px;
  margin-right: 8px;
`;

export const ContactName = styled(Text).attrs({
  variant: "label",
})`
  align-self: center;
`;

export const ContactInfoContainer = styled.View`
  background-color: ${(props) => props.theme.colors.ui.error};
`;

export const ContactAvatar = styled(Avatar.Image).attrs({
  size: 64,
})`
  width: 64px;
  height: 64px;
  align-self: center;
  justify-content: center;
`;

export const Icon = styled.Image`
  width: 15px;
  height: 15px;
`;

export const ThinkerBellImage = styled.Image.attrs({})`
  width: 72px;
  height: 32px;
`;

export const ContactImage = styled.Image`
  width: 64px;
  height: 64px;
`;

export const BuyButton = styled(Button).attrs({
  color: colors.ui.primary,
})``;

export const SendButtonContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
export const ButtonImage = styled(TouchableOpacity).attrs({})``;
