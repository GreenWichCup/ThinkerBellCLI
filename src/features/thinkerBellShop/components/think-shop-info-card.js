import React, { useContext } from "react";
import { useRoute } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import IonIcon from 'react-native-vector-icons/Ionicons';
import { CartContext } from "../../../services/cart/cart-context";
import { Spacer } from "../../../components/spacer/spacer-component";
import { Text } from "../../../components/typography/text-component";

import {
  Info,
  ThinkShopCard,
  ThinkShopCardCover,
  Icon,
  SectionRight,
  PriceText,
  SectionBottom,
  BuyButton,
} from "./think-shop-info-card-styles";

export const ThinkShopInfoCard = ({ navigation, thinkShop }) => {

  const { addToCart, showDialog } = useContext(CartContext);

  return (
    <ThinkShopCard elevation={5}>
      <Info>
        <ThinkShopCardCover source={{ uri: thinkShop.photoUrl }} />
        <SectionRight>
          <Text variant="caption">{thinkShop.name}</Text>
          <Spacer size="medium" position="top" />
          <SectionBottom>
            <Icon
              source={require("../../../../assets/images/ic_variant_money_nbg_xs.png")}
            />
            <PriceText>Was {thinkShop.price}</PriceText>
            <Spacer position="right" size="medium" />
            <Text variant="body"> Now ${thinkShop.special_price} </Text>
          </SectionBottom>
          <BuyButton
            style={styles.btnAdd}
            icon={() => <IonIcon size={20} color="black" name="ios-cart" />}
            mode="contained"
            onPress={() => {
              addToCart(
                {
                  name: thinkShop.name,
                  price: thinkShop.special_price * 100,
                  special_price: thinkShop.special_price * 100,
                  photoUrl: thinkShop.photoUrl,
                },
                thinkShop
              );
              showDialog();
            }}
          >
            <Text>Add</Text>
          </BuyButton>
        </SectionRight>
      </Info>
    </ThinkShopCard>
  );
};

export default ThinkShopInfoCard;

const styles = StyleSheet.create({
  btnAdd: {
    backgroundColor: "#eaf4d6",
    color: "black",
  },
  txt: {
    color: "black",
    fontSize: 16,
  },
});
