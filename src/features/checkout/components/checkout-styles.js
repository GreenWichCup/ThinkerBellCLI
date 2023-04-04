import styled from "styled-components";
import { FlatList, TouchableOpacity } from "react-native";
import { Card, Avatar, Button, TextInput } from "react-native-paper";
import { colors } from "../../../infrastructure/theme/colors";
import { Text } from "../../../components/typography/text-component";

export const CartIconContainer = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
`;
export const CartIcon = styled(Avatar.Icon).attrs({ size: 128 })`
  background-color: ${(props) => props.bg || props.theme.colors.brand.primary};
`;

export const NameInput = styled(TextInput)`
  margin: ${(props) => props.theme.space[3]};
`;

export const PayButton = styled(Button).attrs({
})`
  padding: ${(props) => props.theme.space[2]};
  width: 70%;
  align-self: center;
  color: ${(props) => props.theme.colors.ui.success}

`;

export const ClearButton = styled(Button).attrs({
  color: colors.ui.error,
})`
  padding: ${(props) => props.theme.space[2]};
  width: 70%;
  align-self: center;
`;

export const CartList = styled(FlatList).attrs({})``;
export const Info = styled.View`
  padding-left: ${(props) => props.theme.space[1]};
  padding-right: ${(props) => props.theme.space[1]};
  padding-top: ${(props) => props.theme.space[2]};
  padding-bottom: ${(props) => props.theme.space[2]};
  width: 100%;
  flex-direction: row;
  justify-content: flex-start;
`;

export const ThinkShopCard = styled(Card)`
  background-color: ${(props) => props.theme.colors.bg.primary};
  margin-bottom: ${(props) => props.theme.space[2]};
`;

export const ThinkShopCardCover = styled(Card.Cover)`
  background-color: ${(props) => props.theme.colors.bg.primary};
  width: 20%;
  max-height: 60px;
  border-radius: 5px;
  margin-right: ${(props) => props.theme.space[1]};
`;

export const Icon = styled.Image`
  width: 24px;
  height: 24px;
`;

export const SectionRight = styled.View`
  margin-top: ${(props) => props.theme.space[1]};
`;

export const SectionBottom = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const PriceText = styled(Text).attrs({
  variant: "price",
})`
  align-self: center;
`;

export const Rating = styled.View`
  flex-direction: row;
  padding-top: ${(props) => props.theme.space[2]};
  padding-bottom: ${(props) => props.theme.space[2]};
`;

export const BuyButton = styled(Button).attrs({
  color: colors.brand.primary,
  maxHeight: 40,
  uppercase: false,
})`
align-self:center;
`;

export const ButtonRemove = styled(TouchableOpacity).attrs({})``;
