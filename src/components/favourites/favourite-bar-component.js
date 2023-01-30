import React from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import styled from "styled-components";
import { Spacer } from "../spacer/spacer-component";
import { CompactThinkShopInfo } from "../thinkShop/compact-thinkShop-info";
import { Text } from "../typography/text-component";

const FavouriteWrapper = styled.View`
  padding: 10px;
`;

export const FavouriteBar = ({ favourites, onNavigate }) => {
  if (!favourites.length) {
    return null;
  }
  return (
    <FavouriteWrapper>
      <Spacer variant="left.large">
        <Text variant="caption"> Favourites</Text>
      </Spacer>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {favourites.map((thinkShop) => {
          const key = thinkShop.name.split(" ").join("");
          return (
            <Spacer key={key} position="left" size="medium">
              <TouchableOpacity
                onPress={() => onNavigate("ThinkShopDetail", { thinkShop })}
              >
                <CompactThinkShopInfo thinkShop={thinkShop} />
              </TouchableOpacity>
            </Spacer>
          );
        })}
      </ScrollView>
    </FavouriteWrapper>
  );
};
