import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Text } from "../typography/text-component";
import { Platform, Image } from "react-native";
import RNFS from "react-native-fs";
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler";

const isAndroid = Platform.OS === "android";



const CompactImage = styled.Image`
  border-radius: 50px ;
  width: 50px;
  height: 50px;
  align-self:center;
`;

const Item = styled.View`
  width: 100px;
  align-items: center;
  border: 1px solid black;
  padding: 2px 2px 2px 2px
  margin: 2px 2px 2px 2px
  border-radius: 5px;
`;

export const CompactThinkShopInfo = ({ contactInfo, sendNotification }) => {
  const [uriValue, setUriValue] = useState(null);
  const photo = require('../../../assets/images/Bell_solo2.png');
  const favouritePressed = () => { console.log("favourite card pressed is:", contactInfo) }

  return (
    <Item>
      <CompactImage source={contactInfo.hasThumbnail === true ? { uri: contactInfo.thumbnailPath } : photo} />
      <Text numberOfLines={1} center variant="caption">
        {contactInfo.displayName}
      </Text>
    </Item>

  );
};
