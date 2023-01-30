import React, { useContext } from "react";
import styled from "styled-components";
import { TouchableOpacity } from "react-native";
import { Spacer } from "../../../components/spacer/spacer-component";

import { ThinkShopList } from "../../thinkerBellShop/components/think-shop-list-styles-component";
import ThinkShopInfoCard from "../../thinkerBellShop/components/think-shop-info-card";
import { SafeArea } from "../../../components/utility/safe-area-component";
import { Text } from "../../../components/typography/text-component";

import { FavouritesContext } from "../../../services/favourites/favourites-context";

const NoFavouritesArea = styled(SafeArea)`
  align-items: center;
  justify-content: center;
`;

export const FavouritesScreen = ({ navigation }) => {
  const { favourites } = useContext(FavouritesContext);
  return favourites.length ? (
    <SafeArea>
      <ThinkShopList
        data={favourites}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ThinkShopDetail", { thinkShop: item })
              }
            >
              <Spacer position="bottom" size="large">
                <ThinkShopInfoCard thinkShop={item} />
              </Spacer>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.name}
      />
    </SafeArea>
  ) : (
    <NoFavouritesArea>
      <Text center>No favourites yey </Text>
    </NoFavouritesArea>
  );
};
