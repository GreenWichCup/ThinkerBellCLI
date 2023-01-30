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

export const ThinkShopInfoCard = ({ navigation, thinkShop = {} }) => {
  const {
    name = "Some Think Shop",
    photoUrl = "https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made-600x899.jpg",
    price = "0.99$",
    special_price = 15,
    available_think = "",
    ringtones = [],
  } = thinkShop;
  const { addToCart, showDialog } = useContext(CartContext);

  return (
    <ThinkShopCard elevation={5}>
      <Info>
        <ThinkShopCardCover source={{ uri: photoUrl }} />
        <SectionRight>
          <Text variant="caption">{name}</Text>
          <Spacer size="medium" position="top" />
          <SectionBottom>
            <Icon
              source={require("../../../../assets/images/ic_variant_money_nbg_xs.png")}
            />
            <PriceText>Was {price}</PriceText>
            <Spacer position="right" size="medium" />
            <Text variant="body"> Now ${special_price} </Text>
          </SectionBottom>
          <BuyButton
            style={styles.btnAdd}
            icon={() => <IonIcon size={20} color="black" name="ios-cart" />}
            mode="contained"
            onPress={() => {
              addToCart(
                {
                  name: name,
                  price: special_price * 100,
                  special_price: special_price * 100,
                  photoUrl: photoUrl,
                  available_think: available_think,
                  ringtones: ringtones,
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
