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

const ProfileProduct = ({ productInfo = {} }) => {
  return (
    <ProductMainContainer>
      <ProductTitle>{productInfo.product_name}</ProductTitle>
      <ThinkUsageContainer>
        <IconThink
          source={require("../../../../assets/images/ic_remaining_think.png")}
        />
        <AvailableThink>{productInfo.available_think}</AvailableThink>
      </ThinkUsageContainer>
      <ThinkUsageContainer>
        <IconThink
          source={require("../../../../assets/images/ic_used_think.png")}
        />
        <AvailableThink>{productInfo.used_think}</AvailableThink>
      </ThinkUsageContainer>
      <ThinkUsageContainer>
        <IconThink
          source={require("../../../../assets/images/ic_profile_calendar.png")}
        />
        <AvailableThink>{productInfo.purchase_date}</AvailableThink>
      </ThinkUsageContainer>
    </ProductMainContainer>
  );
};

export default ProfileProduct;
