import React, { useContext } from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { View } from "react-native";
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import { IconButton, Colors, Badge } from "react-native-paper";

import { CheckoutScreen } from "../../features/checkout/screens/checkout.screen";
import { ThinkShopScreen } from "../../features/thinkerBellShop/screens/think-shop.screen";
import { ThinkShopDetailScreen } from "../../features/thinkerBellShop/screens/think-shop-detail.screen";
import { CartContext } from "../../services/cart/cart-context";

const ShopStack = createStackNavigator();

export const ShopNavigator = ({ navigation }) => {
  const { cart } = useContext(CartContext);

  return (
    <ShopStack.Navigator
      screenOptions={{ ...TransitionPresets.ModalPresentationIOS }}
    >
      <ShopStack.Screen
        name="ThinkShopList"
        component={ThinkShopScreen}
        options={{
          headerTitle: "Shop",
          headerTitleAlign: "center",
          headerRight: () => (
            <View style={{ marginRight: 8 }}>
              <IconButton
                icon={() => (
                  <IoniconsIcon size={20} color="black" name="ios-cart" />
                )}
                color={Colors.red500}
                size={20}
                onPress={() => navigation.navigate("CheckoutScreen")}
              />
              <Badge
                visible={true}
                size={16}
                style={{ top: 4, position: "absolute" }}
              >
                {cart.length}
              </Badge>
            </View>
          ),
          headerLeft: () => (
            <IconButton
              icon={() => (
                <IoniconsIcon size={24} color="black" name="ios-chevron-back" />
              )}
              color={Colors.red500}
              size={20}
              onPress={() => navigation.goBack()}
            />
          ),
        }}
      />
      <ShopStack.Screen
        name="ThinkShopDetail"
        component={ThinkShopDetailScreen}
      />
      <ShopStack.Screen name="CheckoutScreen" component={CheckoutScreen} />
    </ShopStack.Navigator>
  );
};
