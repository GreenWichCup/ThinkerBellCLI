import React from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import styled from "styled-components";
import { Spacer } from "../spacer/spacer-component";
import { CompactThinkShopInfo } from "../thinkShop/compact-thinkShop-info";
import { Text } from "../typography/text-component";

const FavouriteWrapper = styled.View` 
`;
const Title = styled(Text)`
align-self:center;`;

export const FavouriteBar = ({ favourites, onNavigate }) => {
  if (!favourites.length) {
    return null;
  }
  return (
    <FavouriteWrapper>
      <Title variant="title" >Favourites</Title>
      <Spacer />
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {favourites.map((contactInfo) => {
          const key = contactInfo.displayName.split(" ").join("");
          return (
            <Spacer key={key} position="left" size="medium">
              <CompactThinkShopInfo contactInfo={contactInfo} />
            </Spacer>
          );
        })}
      </ScrollView>
      <Spacer size="medium" />
    </FavouriteWrapper>
  );
};
