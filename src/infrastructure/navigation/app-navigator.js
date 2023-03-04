import React from "react";
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FeatherIcon from 'react-native-vector-icons/Feather';

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ShopNavigator } from "./shop-navigator";
import { ProfileNavigator } from "./profile-navigator";
import { ContactListScreen } from "../../features/contact/screens/contact-list.screen";
import { ThinkShopContextProvider } from "../../services/thinkShop/think-shop-context";
import { FavouritesContextProvider } from "../../services/favourites/favourites-context";
import { CartContextProvider } from "../../services/cart/cart-context";

import { colors } from "../theme/colors";
import { CheckoutScreen } from "../../features/checkout/screens/checkout.screen";

const Tab = createBottomTabNavigator();
const TAB_ICON = {
  Contacts: "contacts",
  Shop: "shop",
  Profile: "user",
  Cart: "shoppingcart"
};
const ICON_COLOR = colors.icon.tertiary;
ICON_SIZE = 16;


const createScreenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];
  return {
    tabBarIcon: () => {
      if (route.name === "Contacts") {
        return <AntDesignIcon name={iconName} size={24} color={ICON_COLOR} />;
      } else if (route.name === "Shop") {
        return <EntypoIcon name={iconName} size={24} color={ICON_COLOR} />;
      } else if (route.name === "Profile") {
        return <FontAwesome5Icon name={iconName} size={24} color={ICON_COLOR} />;
      } else if (route.name === "Cart") {
        return <AntDesignIcon name={iconName} size={24} color={ICON_COLOR} />;
      }
    },
    headerShown: false,
    tabBarActiveTintColor: colors.bg.tertiary,
    tabBarInactiveTintColor: colors.bg.tertiary,
    tabBarHideOnKeyboard: true,
  };
};

export const AppNavigator = () => {
  return (
    <FavouritesContextProvider>

      <ThinkShopContextProvider>
        <CartContextProvider>
          <Tab.Navigator screenOptions={createScreenOptions}>
            <Tab.Screen name="Contacts" component={ContactListScreen} />
            <Tab.Screen name="Shop" component={ShopNavigator} />
            <Tab.Screen name="Profile" component={ProfileNavigator} />
            <Tab.Screen name="Cart" component={CheckoutScreen} />
          </Tab.Navigator>
        </CartContextProvider>
      </ThinkShopContextProvider>

    </FavouritesContextProvider>
  );
};
