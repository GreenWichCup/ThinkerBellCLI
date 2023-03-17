import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import IonIcon from 'react-native-vector-icons/Ionicons';

import { TouchableOpacity } from "react-native";

import { FavouritesContext } from "../../services/favourites/favourites-context";

const FavouriteButton = styled(TouchableOpacity)`
padding-left: 4px;
`;

export const Favourite = ({ contact }) => {
  const { favourites, addToFavourites, removeFromFavourites } =
    useContext(FavouritesContext);
  const isFavourite = favourites.find((r) => r.recordID === contact.recordID);
  return (
    <FavouriteButton
      onPress={() =>
        !isFavourite ? addToFavourites(contact) : removeFromFavourites(contact)
      }
    >
      <IonIcon
        name={isFavourite ? "ios-heart" : "ios-heart-outline"}
        size={24}
        color={isFavourite ? "red" : "black"}
      />
    </FavouriteButton>
  );
};
