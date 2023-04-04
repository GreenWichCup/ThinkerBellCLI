import React from "react";
import { ScrollView, TouchableOpacity, FlatList } from "react-native";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { userStateValue } from "../../redux/store/slices/authSlice";
import { notificationChannel } from "../../services/notifications/notifications.service";

import { Spacer } from "../spacer/spacer-component";
import { CompactThinkShopInfo } from "../thinkShop/compact-thinkShop-info";
import { Text } from "../typography/text-component";

const FavouriteWrapper = styled.View` 
`;
const Title = styled(Text)`
align-self:center;`;

export const FavouriteBar = ({ favourites, onNavigate }) => {

  const dispatch = useDispatch();
  const userDataState = useSelector(userStateValue);

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

  if (!favourites.length) {
    return null;
  }
  return (
    <FavouriteWrapper>
      <Title variant="title" >Favourites</Title>
      <Spacer />
      <FlatList
        horizontal={true}
        data={favourites}
        keyExtractor={(item) => item.displayName.split(" ").join("")}
        renderItem={(item) => {
          console.log("favourite bar item ", item)
          return (
            <TouchableOpacity onPress={() => { sendSingleDeviceNotification(item.item.userId, item.item.token, item.item.displayName) }} >
              <Spacer position="left" size="medium" />
              <CompactThinkShopInfo contactInfo={item.item} />
            </TouchableOpacity>)
        }}
      />
      <Spacer size="medium" />
    </FavouriteWrapper>
  );
};
