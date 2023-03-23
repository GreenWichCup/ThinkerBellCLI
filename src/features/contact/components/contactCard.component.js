import React from "react";
import { TouchableOpacity, View, Image, StyleSheet } from "react-native";
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

export const ContactCardItem = ({ contactInfo = {}, onPress, exists, token }) => {
  const { name, id, uri, imageAvailable } = contactInfo;

  const sendSingleDeviceNotification = async (channel_id, sound_name) => {
    await notificationChannel(channel_id, sound_name);
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
        soundName: sound_name,
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
          <ButtonImage disabled={exists} onPress={() => { sendSingleDeviceNotification(contactInfo.userId, "mpd") }}>
            <BtnSend width={64} height={64} />
          </ButtonImage>
        </SendButtonContainer>
      </TouchableOpacity>
    </ContactCard>
  );
};

