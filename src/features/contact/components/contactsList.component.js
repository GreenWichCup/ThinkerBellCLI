import React, { useCallback, useState, useEffect, useMemo } from "react";
import messaging from "@react-native-firebase/messaging";
import { Searchbar, Colors, Text } from "react-native-paper";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchUserProductList,
  getUserProductListStatus,
} from "../../../redux/store/slices/userThinkCounterSlice";
import { userStateValue } from "../../../redux/store/slices/authSlice";
import {
  loadAllContacts,
  getContactsStatus,
  getContactsError,
  fetchContacts,
} from "../../../redux/store/slices/contactListSlice";

import { Spacer } from "../../../components/spacer/spacer-component";
import { ContactCardItem } from "./contactCard.component";
import {
  SearchContainer,
  LoadingContainer,
  Loading,
} from "./contact-components.styles";
import { List } from "./contact-components.styles";
import NotifService, {
  getContactFcmToken,
  requestNotificationsPermission,
} from "../../../services/notifications/notifications.service";

const notif = new NotifService();

export const ContactList = () => {
  const notifIcon = require("../../../../assets/images/send_btn.png");
  const dispatch = useDispatch();
  const userVal = useSelector(userStateValue);
  const contacts = useSelector(loadAllContacts);
  const contactsStatus = useSelector(getContactsStatus);
  const userProductStatus = useSelector(getUserProductListStatus);
  const error = useSelector(getContactsError);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isToggled, setIsToggled] = useState(false);

  const filteredContact = useMemo(() => {
    return Array.from(
      contacts.filter((contact) =>
        String(contact.displayName)
          .toLowerCase()
          .startsWith(searchKeyword.toLowerCase())
      )
    );
  }, [searchKeyword, contacts]);

  const contactsCallback = useCallback(() => {
    if (contactsStatus === "idle") {
      dispatch(fetchContacts());
    }
  }, [dispatch, contactsStatus]);

  const userProductCallback = useCallback(() => {
    if (userProductStatus === "idle") {
      dispatch(fetchUserProductList());
    }
  }, [dispatch, userProductStatus]);

  const renderItems = ({ item, index }) => {
    return (
      <ContactCardItem
        key={item.recordID}
        contactInfo={item}
        sendNotification={handleSendNotification}
        onPress={() => {
          console.log(item)
        }}
      />
    );
  };
  // var admin = require("firebase-admin");

  const handleSendNotification = async () => {
    const tok = "fKNOvR8nThi2SPzqTyy9pB:APA91bFNMBpuIEIJ8zE_eHwg9UVsvzhUshzYKWi2XMwIrXySeIUPZg4-4GbSiJChBJPYQ8o1elBBLVSInGQSR4vJX3hM4sZdhs4GNsxvYgvSOrIpvIl-ZqClI67b1LuPkdiO8xO9BfEQ"
    const message = {
      token: tok,
      data: {
        name: "ddda"
      },
      notification: {
        title: "TITLE",
        body: "MY MESSAGE",
      },
      priority: 'high',

    }
    messaging().sendMessage(message)
      .then((response) => {
        // The message was successfully sent
        console.log('Successfully sent message:', response);
      })

      .catch((error) => {
        // There was an error sending the message
        console.error('Error sending message:', error);
      });
  };

  useEffect(() => {
    contactsCallback();
    userProductCallback();
  }, [contactsCallback, userProductCallback]);

  return (
    <>
      <SearchContainer>
        <Searchbar
          placeholder="Search contact..."
          value={searchKeyword}
          icon={isToggled ? "heart" : "heart-outline"}
          onIconPress={() => {
            setIsToggled(!isToggled);
            console.log("listName : / ", filteredContact);
          }}
          onChangeText={(text) => {
            setSearchKeyword(text);
          }}
        />
      </SearchContainer>
      <Spacer size="medium" position="top" />

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
    </>
  );
};
