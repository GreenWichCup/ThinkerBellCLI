import React from "react";
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ShopNavigator } from "./shop-navigator";
import { ProfileNavigator } from "./profile-navigator";
import { ContactListScreen } from "../../features/contact/screens/contact-list.screen";
import { ThinkShopContextProvider } from "../../services/thinkShop/think-shop-context";
import { FavouritesContextProvider } from "../../services/favourites/favourites-context";
import { CartContextProvider } from "../../services/cart/cart-context";

import { colors } from "../theme/colors";

const Tab = createBottomTabNavigator();
const TAB_ICON = {
  Contacts: "contacts",
  Shop: "shop",
  Profile: "user",
};

const createScreenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];
  return {
    tabBarIcon: ({ size, color }) => {
      if (route.name === "Contacts") {
        return <AntDesignIcon name={iconName} size={size} color={color} />;
      } else if (route.name === "Shop") {
        return <EntypoIcon name={iconName} size={size} color={color} />;
      } else if (route.name === "Profile" || route.name === "Map") {
        return <FontAwesome5Icon name={iconName} size={size} color={color} />;
      }
    },
    headerShown: false,
    tabBarActiveTintColor: colors.brand.primary,
    tabBarInactiveTintColor: colors.brand.muted,
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
          </Tab.Navigator>
        </CartContextProvider>
      </ThinkShopContextProvider>

    </FavouritesContextProvider>
  );
};
