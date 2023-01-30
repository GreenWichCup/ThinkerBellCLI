import React from "react";
import styled from "styled-components";
import { Text } from "../typography/text-component";
import { Platform } from "react-native";
import WebView from "react-native-webview";

const isAndroid = Platform.OS === "android";

const CompactWebWiew = styled(WebView)`
  border-radius: 10px;
  width: 120px;
  height: 100px;
`;

const CompactImage = styled.Image`
  border-radius: 10px;
  width: 120px;
  height: 100px;
`;

const Item = styled.View`
  padding: 10px;
  max-width: 120px;
  align-items: center;
`;

export const CompactThinkShopInfo = ({ thinkShop, isMap }) => {
  const Image = isAndroid && isMap ? CompactWebWiew : CompactImage;
  return (
    <Item>
      <Image source={{ uri: thinkShop.photos[0] }} />
      <Text center variant="caption">
        {thinkShop.name}
      </Text>
    </Item>
  );
};
