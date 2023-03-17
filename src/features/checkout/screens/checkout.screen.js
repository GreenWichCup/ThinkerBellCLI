import React, { useState, useEffect, useContext } from "react";
import { List } from "react-native-paper";
import auth from "@react-native-firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchUserProductList,
  loadUserProductList,
} from "../../../redux/store/slices/userThinkCounterSlice";
import { ScrollView } from "react-native-virtualized-view";


import { CartContext } from "../../../services/cart/cart-context";

import { SafeArea } from "../../../components/utility/safe-area-component";
import { CartList } from "../components/checkout-styles";
import { Text } from "../../../components/typography/text-component";
import {
  NameInput,
  CartIconContainer,
  CartIcon,
  PayButton,
  ClearButton,
} from "../components/checkout-styles";
import { Spacer } from "../../../components/spacer/spacer-component";
import { ProductCartComponent } from "../components/product-card.component";
import { saveProductToDb } from "../../../redux/actions/productList";
import { CreditCardComponent } from "../components/payment.component";

export const CheckoutScreen = ({ navigation }) => {
  const { cart, thinkShop, removeItem, sum, clearCart } =
    useContext(CartContext);
  const dispatch = useDispatch();
  const userProducts = useSelector(loadUserProductList);

  const handleSaveProduct = async () => {
    console.log("cart context product data:", cart);
    console.log("cart redux product data:", userProducts);

    await saveProductToDb(cart, userProducts)
      .then(() => {
        dispatch(fetchUserProductList());
      })
      .then(() => {
        clearCart();
      })
      .then(() => {
        navigation.navigate("ThinkShopList");
      });
  };

  const renderItem = ({ item, index }) => {
    return (
      <Spacer position="bottom" size="large">
        <ProductCartComponent
          onPress={() => {
            console.log("cart item click: ", item);
            removeItem(index);
          }}
          i={index}
          name={item.name}
          special_price={item.special_price / 100}
          photoUrl={item.photoUrl}
        />
      </Spacer>
    );
  };

  if (!cart.length || !thinkShop) {
    return (
      <SafeArea>
        <CartIconContainer>
          <CartIcon icon="cart-off" />
          <Text>Nothing yet</Text>
        </CartIconContainer>
      </SafeArea>
    );
  }
  return (
    <SafeArea>
      <ScrollView>
        <Spacer position="left" size="medium">
          <Spacer position="top" size="large">
            <Text>Your order </Text>
          </Spacer>
          <CartList
            data={cart}
            renderItem={renderItem}
            keyExtractor={(props) => {
              props.i;
            }}
          />
          <Text>Total: {`${sum / 100} CAD`}</Text>
        </Spacer>

        <Spacer position="top" size="large" />
        <CreditCardComponent savePurchase={handleSaveProduct} />
        <Spacer position="top" size="large">
          <ClearButton icon="cart-off" mode="contained" onPress={clearCart}>
            Clear cart
          </ClearButton>
        </Spacer>
      </ScrollView>
    </SafeArea>
  );
};
