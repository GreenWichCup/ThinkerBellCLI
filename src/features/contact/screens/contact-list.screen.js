import React, { useContext, useState } from "react";
import { SafeArea } from "../../../components/utility/safe-area-component";
import { ContactList } from "../components/contactsList.component";
import { Spacer } from "../../../components/spacer/spacer-component";
import { FavouritesContext } from "../../../services/favourites/favourites-context";
import { FavouriteBar } from "../../../components/favourites/favourite-bar-component";

export const ContactListScreen = ({ navigation }) => {
  //const [isToggled, setIsToggled] = useState(false);
  //const { favourites } = useContext(FavouritesContext);
  return (
    <SafeArea>
      <ContactList />
    </SafeArea>
  );
};
