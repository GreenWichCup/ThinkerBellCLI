import React, { useCallback, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TouchableOpacity, View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components";

import { Button, Text, TextInput } from "react-native-paper";
import { Spacer } from "../../../components/spacer/spacer-component";
import { SafeArea } from "../../../components/utility/safe-area-component";
import {
  ThinkCounter,
  Amount,
  IconThink,
  ProductList,
} from "../components/profile.style";
import { loadUserProductList } from "../../../redux/store/slices/userThinkCounterSlice";

import ProfileProduct from "../components/profile_product.component";

export const UserProductScreen = () => {
  const dispatch = useDispatch();
  const userProducts = useSelector(loadUserProductList);

  const ItemDivider = styled.View`
    height: 1px;
    width: 70%;
    align-self: center;
    background-color: #607d8b;
    margin: ${(props) => props.theme.space[2]};
  `;

  const renderItems = ({ item, index }) => {
    console.log("item ", item);
    return <ProfileProduct product_name={item.product_name} available_think={item.available_think} used_think={item.used_think} purchase_date={item.purchase_date} key={index} />;
  };

  return (
    <SafeArea>
      <Text>UserProductScreen</Text>
      <ProductList
        data={userProducts}
        keyExtractor={(item) => item.product_name}
        renderItem={renderItems}
        ItemSeparatorComponent={ItemDivider}
      />
    </SafeArea>
  );
};
