import styled from "styled-components";
import { FlatList, TouchableOpacity } from "react-native";

import { List, Avatar, TextInput } from "react-native-paper";

import { colors } from "../../../infrastructure/theme/colors";

export const ProductList = styled(FlatList).attrs({})``;
export const ProfilePhotoCard = styled(Avatar.Image).attrs({})``;

export const ProductMainContainer = styled.View`
  padding-left: ${(props) => props.theme.space[0]};
  padding-right: ${(props) => props.theme.space[0]};
  width: 100%;
`;
export const ThinkUsageContainer = styled.View`
  flex-direction: row;
`;

export const IconThink = styled.Image`
  width: 48px;
  height: 48px;
  margin-end: 8px;
  margin-start: 8px;
`;

export const AvailableThink = styled.Text`
  font-size: 18;
  align-self: center;
`;
export const ProductTitle = styled.Text`
  font-size: 18;
  align-self: center;
`;
export const PurchaseDate = styled.Text`
  font-size: 18;
  align-self: center;
`;

export const UsedThink = styled.Text`
  font-size: 18;
  align-self: center;
`;

export const ProfileInfo = styled.View`
  flex-direction: row;
  background-color: ${colors.bg.primary};
`;

export const ProfileItem = styled(List.Item)`
  padding: ${(props) => props.theme.space[0]};
`;

export const ThinkCounter = styled.View`
  margin: 10px;
  align-items: center;
`;
export const AvatarContainer = styled.View`
  align-items: center;
  background-color: ${colors.bg.primary};
`;
export const Amount = styled.Text`
  font-size: 20px;
  color: #00ced1;
`;

export const Title = styled.Text`
  font-size: 18;
`;
