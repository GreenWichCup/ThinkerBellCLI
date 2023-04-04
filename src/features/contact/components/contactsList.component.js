import React, { useCallback, useState, useEffect, useMemo, useContext } from "react";
import { Searchbar, Colors, Text } from "react-native-paper";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { userStateValue } from "../../../redux/store/slices/authSlice";
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
import { sentThinkCounter } from "../../../redux/actions/productList";
import { FavouriteBar } from "../../../components/favourites/favourite-bar-component";
import { FavouritesContext } from "../../../services/favourites/favourites-context";
import { Spacer } from "../../../components/spacer/spacer-component";
import { saveProductToDb, updateProduct } from "../../../redux/actions/productList";
import { ThinkShopContext } from "../../../services/thinkShop/think-shop-context";

export const ContactList = ({ navigation }) => {
  const notifIcon = require("../../../../assets/images/send_btn.png");
  const dispatch = useDispatch();
  const userDataState = useSelector(userStateValue)
  const contacts = useSelector(loadAllContacts);
  const contactsStatus = useSelector(getContactsStatus);
  const error = useSelector(getContactsError);
  const userProducts = useSelector(loadUserProductList);

  const [searchKeyword, setSearchKeyword] = useState("");
  const [isToggled, setIsToggled] = useState(false);
  const { favourites } = useContext(FavouritesContext);
  const { getProductFromFirestore } = useContext(ThinkShopContext);

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
    }
  }, [dispatch, contactsStatus]);

  const sendSingleDeviceNotification = async (channel_id, token, name) => {

    await notificationChannel(channel_id);

    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append(
      'Authorization',
      'Bearer AAAAZlqUaak:APA91bFV4p94jvFVLBLMALFqBEoT5ppxCq3QEU4lKycbnhyM55nJqQWclcHxgFcm0G1ixzbeSfiCW6e6F7MIi4kj6HSWaaqPAwoZeRsN7NoRC7fABIhulVLjchd2pjHy3emJzRyp0GAZ',
    );

    var raw = JSON.stringify({
      to: token,
      data: {
        channelId: channel_id,
        soundName: "mpd",
        senderId: userDataState.currentUser.userId,
        senderName: userDataState.currentUser.userName

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
    await fetch('https://fcm.googleapis.com/fcm/send', requestOptions)
      .then(response => console.log('response :', response.text()))
      .then(result => console.log('result :', result))
      .then(() => {
        dispatch(updateThinkAmout());
      })
      .then(() => {
        updateProduct(userProducts);
      })
      .catch(error => console.log('error returning new state of product list', error));
    try {
      await sentThinkCounter(channel_id, name);

    } catch (error) {
      console.log("error sotre notification sender :", error)
    }
  };

  const renderItems = ({ item, index }) => {

    return (
      <ContactCardItem
        exists={!item.exists}
        key={item.recordID}
        token={item.token}
        contactInfo={item}
        sendNotification={() => {
          sendSingleDeviceNotification(item.userId, item.token, item.displayName)
        }}
        onPress={() => {
          console.log("user :", userDataState)
        }}
      />
    );
  };

  useEffect(() => {
    contactScreenCallback();
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
