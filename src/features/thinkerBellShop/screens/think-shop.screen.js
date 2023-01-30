import React, { useContext, useState, useEffect } from "react";
import { TouchableOpacity, View, Image } from "react-native";
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
    <TouchableOpacity
      style={{
        width: "100%",
      }}
      onPress={() => {
        console.log("product data click", props.index);
        props.navigation.navigate("ThinkShopDetail", {
          thinkShop: props.index,
        });
      }}
    >
      <Spacer position="bottom" size="large">
        <FadeInView>
          <ThinkShopInfoCard
            navigation={props.navigation}
            thinkShop={props.index}
          />
        </FadeInView>
      </Spacer>
    </TouchableOpacity>
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

  const handleExpendA = () => {
    //const state = expended;
    setExpendedA(!expandedA);
  };
  const handleExpendB = () => {
    //const state = expended;
    setExpendedB(!expandedB);
  };

  return (
    <SafeArea>
      {isLoadingFinal && (
        <LoadingContainer>
          <Loading size={50} animating={true} color={Colors.red300} />
        </LoadingContainer>
      )}
      <ScrollView>
        <List.Accordion
          id={1}
          title="Think packs"
          left={() => (
            <List.Icon
              icon={() => {
                return (
                  <FontAwesome5Icon
                    name="store"
                    size={24}
                    color={colors.bg.tertiary}
                  />
                );
              }}
            />
          )}
          expanded={expandedA}
          onPress={handleExpendA}
        >
          <List.Item
            style={{
              marginBottom: -8,
              marginLeft: 8,
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
          <List.Item
            style={{ marginBottom: -8, marginLeft: 8 }}
            left={() => {
              return (
                <ProductItem
                  navigation={navigation}
                  index={thinkShopFinal[3]}
                />
              );
            }}
          />
          <List.Item
            style={{ marginBottom: -8, marginLeft: 8 }}
            left={() => {
              return (
                <ProductItem
                  navigation={navigation}
                  index={thinkShopFinal[4]}
                />
              );
            }}
          />
        </List.Accordion>
        <List.Accordion
          id={2}
          title="Think plans"
          left={() => (
            <List.Icon
              icon={() => {
                return (
                  <FontAwesome5Icon
                    name="user"
                    size={24}
                    color={colors.bg.tertiary}
                  />
                );
              }}
            />
          )}
          expanded={expandedB}
          onPress={handleExpendB}
        >
          <List.Item
            style={{ marginBottom: -8, marginLeft: 8 }}
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
            style={{ marginBottom: -8, marginLeft: 8 }}
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
            style={{ marginBottom: -8, marginLeft: 8 }}
            left={() => {
              return (
                <ProductItem
                  navigation={navigation}
                  index={thinkShopFinal[5]}
                />
              );
            }}
          />
        </List.Accordion>
      </ScrollView>
    </SafeArea>
  );
};
/* <ThinkShopList
        data={thinkShopFinal}
=        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ThinkShopDetail", {
                  thinkShop: item,
                })
              }
            >
              <Spacer position="bottom" size="large">
                <FadeInView>
                  <ThinkShopInfoCard navigation={navigation} thinkShop={item} />
                </FadeInView>
              </Spacer>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.name}
      />*/
