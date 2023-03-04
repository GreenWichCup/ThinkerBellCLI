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
`;

const Item = styled.View`
  max-width: 120px;
  align-items: center;
`;

export const CompactThinkShopInfo = ({ contactInfo }) => {
  const [uriValue, setUriValue] = useState(null);
  const photo = require('../../../assets/images/Bell_solo2.png');
  const favouritePressed = () => { console.log("favourite card pressed is:", contactInfo) }

  return (
    <Item>
      <TouchableWithoutFeedback onPress={favouritePressed}>

        <CompactImage source={contactInfo.thumbnailPath.startsWith("content://") ? { uri: contactInfo.thumbnailPath } : photo} />
        <Text center variant="caption">
          {contactInfo.displayName}
        </Text>
      </TouchableWithoutFeedback>

    </Item>
  );
};
