import React, { useCallback, useState, useEffect, useMemo, useContext } from "react";
import messaging from "@react-native-firebase/messaging";
import { Searchbar, Colors, Text } from "react-native-paper";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import {
  loadAllContacts,
  getContactsStatus,
  getContactsError,
  fetchContacts,
} from "../../../redux/store/slices/contactListSlice";

import { fetchUserProductList, updateThinkAmout } from "../../../redux/store/slices/userThinkCounterSlice";

import {
  fetchUserList, loadUserList
} from "../../../redux/store/slices/userDbListSlice";
import { loadUserProductList } from "../../../redux/store/slices/userThinkCounterSlice";

//required for iOS,
//import { requestNotificationsPermission,} from "../../../services/notifications/notifications.service";

import { ContactCardItem } from "./contactCard.component";
import {
  SearchContainer,
  LoadingContainer,
  Loading,
  Separator
} from "./contact-components.styles";
import { List } from "./contact-components.styles";
import { notificationChannel } from "../../../services/notifications/notifications.service";

import { FavouriteBar } from "../../../components/favourites/favourite-bar-component";
import { FavouritesContext } from "../../../services/favourites/favourites-context";
import { Spacer } from "../../../components/spacer/spacer-component";
import { exists } from "react-native-fs";

export const ContactList = ({ navigation }) => {
  const notifIcon = require("../../../../assets/images/send_btn.png");
  const dispatch = useDispatch();
  const contacts = useSelector(loadAllContacts);
  const contactsStatus = useSelector(getContactsStatus);
  const error = useSelector(getContactsError);
  const userProducts = useSelector(loadUserProductList);
  const userList = useSelector(loadUserList);

  const [searchKeyword, setSearchKeyword] = useState("");
  const [isToggled, setIsToggled] = useState(false);
  const { favourites } = useContext(FavouritesContext);


  const filteredContact = useMemo(() => {
    return Array.from(
      contacts.filter((contact) =>
        String(contact.displayName)
          .toLowerCase()
          .startsWith(searchKeyword.toLowerCase())
      )
    );
  }, [searchKeyword, contacts]);

  const contactScreenCallback = useCallback(() => {
    if (contactsStatus === "idle") {
      dispatch(fetchContacts());
      dispatch(fetchUserProductList());
      dispatch(fetchUserList());
    }
  }, [dispatch, contactsStatus]);

  //iOS only
  /* const handleSendNotification = () => {
     requestNotificationsPermission()
   }*/

  const userTokenChecker = async (contactItem) => {
    let userTok = "";
    const results = userList.filter((u) => {
      (u.userPhone.slice(u.userPhone.length - 9)) === contactItem.phoneNumbers;
    })
    console.log("userList filter :", results);
  }

  const renderItems = ({ item, index }) => {
    let matchPhone = true;
    let token = "";
    userList.forEach((u) => {
      const nineDigitsNumber = u.userPhone.slice(u.userPhone.length - 9);
      if (nineDigitsNumber === item.phoneNumbers)
        matchPhone = false;
      token = u.token[u.token.length - 1];
    }
    );
    return (
      <ContactCardItem
        exists={matchPhone}
        key={item.recordID}
        contactInfo={item}
        sendNotification={() => { sendSingleDeviceNotification("001", "bell_1") }}
        onPress={() => {
          console.log("contacts :", contacts)
        }}
      />
    );
  };

  useEffect(() => {
    contactScreenCallback();
    console.log("usersList :", userList);
  }, [contactScreenCallback]);

  return (
    <View style={{ flex: 1 }} >
      <SearchContainer>
        <Searchbar
          placeholder="Search contact..."
          value={searchKeyword}
          icon={isToggled ? "heart" : "heart-outline"}
          onIconPress={() => {
            setIsToggled(!isToggled);
            console.log("favourites list: ", favourites);
          }}
          onChangeText={(text) => {
            setSearchKeyword(text);
          }}
        />
      </SearchContainer>
      {isToggled && (
        <FavouriteBar
          favourites={favourites}
        />
      )}
      <Separator />
      <Spacer size="large" />
      {contactsStatus === "loading" && (
        <LoadingContainer>
          <Loading size={50} animating={true} color={Colors.red300} />
        </LoadingContainer>
      )}
      {contactsStatus === "succeeded" && (
        <List
          data={filteredContact}
          keyExtractor={(item) => item.recordID}
          renderItem={renderItems}
          numColumns={2}
          horizontal={false}
        />
      )}
      {contactsStatus === "error" && (
        <View>
          <Text>ERROR IS {error}</Text>
        </View>
      )}
    </View>
  );
};
