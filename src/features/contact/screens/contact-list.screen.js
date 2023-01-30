import React, { useContext, useState } from "react";
import { SafeArea } from "../../../components/utility/safe-area-component";
import { ContactList } from "../components/contactsList.component";
import { Spacer } from "../../../components/spacer/spacer-component";

export const ContactListScreen = ({ navigation }) => {
  const [isToggled, setIsToggled] = useState(false);

  return (
    <SafeArea>
      <ContactList />
    </SafeArea>
  );
};
