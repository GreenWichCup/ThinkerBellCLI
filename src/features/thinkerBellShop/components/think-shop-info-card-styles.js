import styled from "styled-components";
import { Card, Button } from "react-native-paper";
import Slider from "@react-native-community/slider";
import { FlatList } from "react-native";
import { Text } from "../../../components/typography/text-component";
import { colors } from "../../../infrastructure/theme/colors";

export const Info = styled.View`
  padding-left: ${(props) => props.theme.space[0]};
  padding-right: ${(props) => props.theme.space[0]};
  padding-top: ${(props) => props.theme.space[2]};
  padding-bottom: ${(props) => props.theme.space[2]};
  width: 100%;
  flex-direction: row;
  justify-content: flex-start;
`;

export const ThinkShopCard = styled(Card)`
  background-color: ${(props) => props.theme.colors.bg.primary};
  margin-bottom: ${(props) => props.theme.space[0]};
  padding-right: ${(props) => props.theme.space[0]};
`;

export const ThinkShopCardCover = styled(Card.Cover)`
  background-color: ${(props) => props.theme.colors.bg.primary};
  width: 30%;
  max-height: 120px;
  border-radius: 15px;
  margin-right: ${(props) => props.theme.space[1]};
  margin-left: ${(props) => props.theme.space[2]};
`;

export const Icon = styled.Image`
  width: 24px;
  height: 24px;
`;

export const SectionRight = styled.View``;

export const SectionBottom = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Rating = styled.View`
  flex-direction: row;
  padding-top: ${(props) => props.theme.space[2]};
  padding-bottom: ${(props) => props.theme.space[2]};
`;

export const BuyButton = styled(Button).attrs({
  color: colors.brand.primary,
  uppercase: false,
})`
  align-self: center;
  margin-top: ${(props) => props.theme.space[2]};
  max-width: 60%;
`;

export const PlayerContainer = styled.View`
  max-width: 80%;
  width: 80%;
  margin-top: ${(props) => props.theme.space[2]};
`;

export const MainContainer = styled.View`
  flex-direction: row;
  padding-left: ${(props) => props.theme.space[1]};
  padding-right: ${(props) => props.theme.space[1]};
  margin-left: ${(props) => props.theme.space[1]};
  margin-right: ${(props) => props.theme.space[1]};
  padding-bottom: ${(props) => props.theme.space[1]};
`;

export const SoundImageContainer = styled.View`
  width: 40%;
  max-height: 120px;
  align-self: center;
`;

export const PriceText = styled(Text).attrs({
  variant: "price",
})``;

export const RingToneList = styled(FlatList)``;

export const RingToneTitleContainer = styled.View`
  align-items: center;
  border: solid 1px black;
  border-radius: 5px;
  margin-left: ${(props) => props.theme.space[2]};
  margin-right: ${(props) => props.theme.space[2]};
`;

export const RingToneSlider = styled(Slider).attrs({})`
  flex-direction: row;
`;

export const RingToneSliderContainer = styled.View`
  padding-left: ${(props) => props.theme.space[2]};
  padding-right: ${(props) => props.theme.space[2]};
`;

export const RingToneTitle = styled(Text).attrs({
  variant: "title",
})`
  color: ${(props) => props.theme.colors.text.success};
`;

export const ProgressText = styled(Text).attrs({
  variant: "caption",
})`
  color: ${colors.text.primary};
`;

export const ProgressTextContainer = styled.View`
  padding-left: ${(props) => props.theme.space[2]};
  padding-right: ${(props) => props.theme.space[2]};
  width: 100%;
  flex-direction: row;
  align-self: center;
  justify-content: space-between;
`;

export const RingToneButtonContainer = styled.View`
  margin-top: ${(props) => props.theme.space[0]};
  flex-direction: row;
  align-self: center;
  align-items: center;
  padding-bottom: ${(props) => props.theme.space[0]};
`;
