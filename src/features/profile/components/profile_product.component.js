import { View, Text } from "react-native";
import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { loadUserProductList } from "../../../redux/store/slices/userThinkCounterSlice";

import {
  ProductMainContainer,
  ProductTitle,
  AvailableThink,
  ThinkUsageContainer,
  IconThink,
} from "../components/profile.style";

const ProfileProduct = ({ product_name, available_think, used_think, purchase_date }) => {
  return (
    <ProductMainContainer>
      <ProductTitle>{product_name}</ProductTitle>
      <ThinkUsageContainer>
        <IconThink
          source={require("../../../../assets/images/ic_remaining_think.png")}
        />
        <AvailableThink>{available_think}</AvailableThink>
      </ThinkUsageContainer>
      <ThinkUsageContainer>
        <IconThink
          source={require("../../../../assets/images/ic_used_think.png")}
        />
        <AvailableThink>{used_think}</AvailableThink>
      </ThinkUsageContainer>
      <ThinkUsageContainer>
        <IconThink
          source={require("../../../../assets/images/ic_profile_calendar.png")}
        />
        <AvailableThink>{purchase_date}</AvailableThink>
      </ThinkUsageContainer>
    </ProductMainContainer>
  );
};

export default ProfileProduct;
