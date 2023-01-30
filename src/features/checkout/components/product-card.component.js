import React, { useContext } from "react";

import { CartContext } from "../../../services/cart/cart-context";
import {
  Info,
  ThinkShopCard,
  ThinkShopCardCover,
  Icon,
  SectionRight,
  SectionBottom,
  PriceText,
  BuyButton,
  ButtonRemove,
} from "../components/checkout-styles";
import { Text } from "../../../components/typography/text-component";
import { Spacer } from "../../../components/spacer/spacer-component";

export const ProductCartComponent = ({
  onPress,
  name,
  photoUrl,
  special_price,
}) => {
  const { removeItem, cart, thinkShop } = useContext(CartContext);

  return (
    <ThinkShopCard elevation={5}>
      <Info>
        <ThinkShopCardCover source={{ uri: photoUrl }} />
        <SectionRight>
          <Text variant="caption">{name}</Text>
          <SectionBottom>
            <Icon
              source={require("../../../../assets/images/ic_variant_money_nbg_xs.png")}
            />
            <Text variant="body">${special_price}</Text>
          </SectionBottom>
        </SectionRight>
        <Spacer position="right" size="large" />
        <BuyButton icon="cancel" mode="contained" />
      </Info>
    </ThinkShopCard>
  );
};
