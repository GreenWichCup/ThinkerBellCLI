import React, { useContext, useState, useEffect } from "react";
import { TouchableOpacity, View, Image, FlatList } from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

import { useNavigation } from "@react-navigation/native";
import { colors } from "../../../infrastructure/theme/colors";
import {
  List,
  Avatar,
  TextInput,
  ActivityIndicator,
  Colors,
  Paragraph,
  Button,
  Provider,
  Text,
  Portal,
  Dialog,
} from "react-native-paper";
import styled from "styled-components";

import { Spacer } from "../../../components/spacer/spacer-component";
import { SafeArea } from "../../../components/utility/safe-area-component";
import { FadeInView } from "../../../components/animation/fade.animation";
import ThinkShopInfoCard from "../components/think-shop-info-card";
import { ThinkShopContext } from "../../../services/thinkShop/think-shop-context";
import { ThinkShopList } from "../components/think-shop-list-styles-component";
import { CartContext } from "../../../services/cart/cart-context";

const ProductItem = ({ ...props }) => {
  return (
    <FadeInView>
      <ThinkShopInfoCard
        navigation={props.navigation}
        thinkShop={props.index}
      />
    </FadeInView>
  );
};

const CartDialog = () => {
  const navigation = useNavigation();
  const { visible, hideDialog } = useContext(CartContext);

  return (
    <Provider>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Content>
            <Paragraph>Successfully added.</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={() => {
                navigation.navigate("CheckoutScreen");
              }}
            >
              Go cart
            </Button>
            <Button onPress={hideDialog}>Close</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </Provider>
  );
};

export const ThinkShopScreen = ({ navigation }) => {
  const [expandedA, setExpendedA] = useState(true);
  const [expandedB, setExpendedB] = useState(true);
  const { isLoadingFinal, thinkShopFinal } = useContext(ThinkShopContext);
  const Loading = styled(ActivityIndicator)`
    margin-left: -25px;
  `;

  const LoadingContainer = styled.View`
    position: absolute;
    top: 50%;
    left: 50%;
  `;
  const { visible } = useContext(CartContext);

  const renderItems = () => {
    return (
      <FadeInView>
        <ThinkShopInfoCard
          navigation={props.navigation}
          thinkShop={props.index}
        />
      </FadeInView>
    )
  }

  return (
    <SafeArea>
      {isLoadingFinal && (
        <LoadingContainer>
          <Loading size={50} animating={true} color={Colors.red300} />
        </LoadingContainer>
      )}
      <FlatList
        data={thinkShopFinal}
        keyExtractor={(item) => item.name}
        renderItem={(item, index) => {
          console.log("thinkShopFinal flatlist", item)
          return (
            <FadeInView>
              <ThinkShopInfoCard
                navigation={navigation}
                thinkShop={item.item}
              />
            </FadeInView>
          )
        }}
        horizontal={false}
      />
    </SafeArea>
  );
};

/*<ScrollView style={{ flex: 1, width: "100%" }}>
<List.Item
  style={{
    marginBottom: -8,
    marginLeft: 8,
    marginRight: 8
  }}
  left={() => {
    return (
      <ProductItem
        navigation={navigation}
        index={thinkShopFinal[0]}
      />
    );
  }}
/>
<List.Item
  style={{
    marginBottom: -8,
    marginLeft: 8,
    marginRight: 8
  }}
  left={() => {
    return (
      <ProductItem
        navigation={navigation}
        index={thinkShopFinal[1]}
      />
    );
  }}
/>
<List.Item
  style={{
    marginBottom: -8,
    marginLeft: 8,
    marginRight: 8
  }}
  left={() => {
    return (
      <ProductItem
        navigation={navigation}
        index={thinkShopFinal[2]}
      />
    );
  }}
/>
</ScrollView>*/