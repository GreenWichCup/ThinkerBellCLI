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
import {
  requestNotificationsPermission,
} from "../../../services/notifications/notifications.service";


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

  const handleSendNotification = () => {
    requestNotificationsPermission()

  }
  const sendSingleDeviceNotification = () => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append(
      'Authorization',
      'Bearer AAAAZlqUaak:APA91bFV4p94jvFVLBLMALFqBEoT5ppxCq3QEU4lKycbnhyM55nJqQWclcHxgFcm0G1ixzbeSfiCW6e6F7MIi4kj6HSWaaqPAwoZeRsN7NoRC7fABIhulVLjchd2pjHy3emJzRyp0GAZ',
    );
    var raw = JSON.stringify({
      to: 'ftr8FD7WShCTxGMQ9VP_TM:APA91bHOM_X2mhDFm6qbCz4io27EMbCjRJFIvGqOtAAul5wEcmOlv4gfoO1mnhmQ7xKz55Oisbm6qOM6VwnyEbqrxEfdHsTdOI2V80BBEXM8XAKSRra6Noc-bUDi54b3WJs82TQrw9ux',
      notification: {
        title: 'Some title',
        body: 'Some body',
        sound: 'bell_1.wav',
        android_channel_id: 'notification_channel',
      },
      data: {
        field1: 'value1',
        field2: 'value2',
      },
      content_available: true,
      priority: 'high',
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('https://fcm.googleapis.com/fcm/send', requestOptions)
      .then(response => console.log('response :', response.text()))
      .then(result => console.log('result :', result))
      .catch(error => console.log('error', error));
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
