import React, { useCallback, useState, useEffect, useMemo, useContext } from "react";
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
import {
  requestNotificationsPermission,
} from "../../../services/notifications/notifications.service";

import { ContactCardItem } from "./contactCard.component";
import {
  SearchContainer,
  LoadingContainer,
  Loading,
  Separator
} from "./contact-components.styles";
import { List } from "./contact-components.styles";
import PushNotification from 'react-native-push-notification';

import { FavouriteBar } from "../../../components/favourites/favourite-bar-component";
import { FavouritesContext } from "../../../services/favourites/favourites-context";
import { Spacer } from "../../../components/spacer/spacer-component";

export const ContactList = ({ navigation }) => {
  const notifIcon = require("../../../../assets/images/send_btn.png");
  const dispatch = useDispatch();
  const userVal = useSelector(userStateValue);
  const contacts = useSelector(loadAllContacts);
  const contactsStatus = useSelector(getContactsStatus);
  const userProductStatus = useSelector(getUserProductListStatus);
  const error = useSelector(getContactsError);

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
        sendNotification={sendSingleDeviceNotification}
        onPress={() => {
          console.log(item)
        }}
      />
    );
  };
  const handleSendNotification = () => {
    requestNotificationsPermission()
  }
  const sendSingleDeviceNotification = async (channel_id, sound) => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append(
      'Authorization',
      'Bearer AAAAZlqUaak:APA91bFV4p94jvFVLBLMALFqBEoT5ppxCq3QEU4lKycbnhyM55nJqQWclcHxgFcm0G1ixzbeSfiCW6e6F7MIi4kj6HSWaaqPAwoZeRsN7NoRC7fABIhulVLjchd2pjHy3emJzRyp0GAZ',
    );
    var raw = JSON.stringify({
      to: "fKQ1QKq4RHiRzHZJtv-ltn:APA91bFyvKLFblumH2HA3e1ZHBnFj6xcv_CltMAsjLfRRNVF-aGb0LepcGLwklFs5bUY2FWjFgmgH3bYOd9xkDRzfaYSbIJP-pBnEZggARFP2CPRz2mQQAarN45ZPwhs3Uux0inD8OKu",
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
    //contact Id or token as channel Id, 
    await notificationChannel('009');
    await fetch('https://fcm.googleapis.com/fcm/send', requestOptions)
      .then(response => console.log('response :', response.text()))
      .then(result => console.log('result :', result))
      .catch(error => console.log('error', error));
  };

  const notificationChannel = async (channelId, soundName, imgUrl) => {
    await PushNotification.channelExists(channelId, async exists => {
      console.log(exists); // true/false
      if (!exists) {
        await PushNotification.createChannel(
          {
            channelId: channelId, // (required)
            channelName: channelId, // (required)
            soundName: soundName,
          },
          created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
        );
      }
    });
  }

  useEffect(() => {
    contactsCallback();
    // userProductCallback();
  }, [contactsCallback]);


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
