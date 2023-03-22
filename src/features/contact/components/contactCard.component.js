import React, { useState, useEffect } from "react";
import { TouchableOpacity, View, Image, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import { Spacer } from "../../../components/spacer/spacer-component";
import {
  ContactAvatar,
  ContactName,
  ContactCard,
  SendButtonContainer,
  ButtonImage,
} from "./contact-components.styles";

import BtnSend from "../../../../assets/images/think_send_btn.svg";
import UserPhoto from "../../../../assets/images/Bell_solo2.svg";
import { Favourite } from "../../../components/favourites/favourite-component";

import { loadUserList } from "../../../redux/store/slices/userDbListSlice";
import { notificationChannel } from "../../../services/notifications/notifications.service";

export const ContactCardItem = ({ contactInfo = {}, sendNotification, onPress }) => {
  const { name, id, uri, imageAvailable } = contactInfo;

  const userList = useSelector(loadUserList);
  const [exists, setExists] = useState(true);
  const [userToken, setUserToken] = useState("");

  const contactExists = () => {
    userList.forEach((u) => {
      const nineDigitsNumber = u.userPhone.slice(u.userPhone.length - 9);
      if (nineDigitsNumber === contactInfo.phoneNumbers)
        setExists(false);
      setUserToken(u.token[u.token.length - 1])
    }
    );
    if (exists === false) {
      console.log("u matched :", contactInfo)
    }
  }

  const sendSingleDeviceNotification = async () => {
    await notificationChannel(userToken, "mpd");
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append(
      'Authorization',
      'Bearer AAAAZlqUaak:APA91bFV4p94jvFVLBLMALFqBEoT5ppxCq3QEU4lKycbnhyM55nJqQWclcHxgFcm0G1ixzbeSfiCW6e6F7MIi4kj6HSWaaqPAwoZeRsN7NoRC7fABIhulVLjchd2pjHy3emJzRyp0GAZ',
    );
    var raw = JSON.stringify({
      to: userToken,
      data: {
        channelId: userToken,
        soundName: "mpd",
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
        dispatch(updateThinkAmout("200 Thinks daily"));
      })
      .then(() => {
        console.log("updated or not product list :", userProducts)
      })
      .catch(error => console.log('error', error));

  };



  useEffect(() => {
    contactExists()
  })
  return (
    <ContactCard exists={exists} >
      <TouchableOpacity
        disabled={exists}
        onPress={onPress}
      >
        <ContactName numberOfLines={1} variant="label">
          {contactInfo.displayName}
        </ContactName>
        <Spacer position="top" size="large" />
        <View
          style={{
            alignSelf: "center",
            backgroundColor: "#eaf4d6",
            borderRadius: 50,
            padding: 4,
          }}
        >
          {contactInfo.hasThumbnail === false ? (
            <UserPhoto width={64} height={64} />
          ) : (
            <ContactAvatar source={{ uri: contactInfo.thumbnailPath }} />
          )}
        </View>
        <SendButtonContainer>
          <Favourite contact={contactInfo} />
          <ButtonImage disabled={exists} onPress={sendNotification}>
            <BtnSend width={64} height={64} />
          </ButtonImage>
        </SendButtonContainer>
      </TouchableOpacity>
    </ContactCard>
  );
};

