import messaging from "@react-native-firebase/messaging";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import firestore from "@react-native-firebase/firestore";
import PushNotification from 'react-native-push-notification';

import { showError } from "../../helpers/functionsHelpers";

export const requestNotificationsPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (enabled) {
    console.log("Authorization status:", authStatus);
  }
  getFcmToken();
};

export const getContactFcmToken = async (uid) => {
  let token = [];
  try {
    await firestore()
      .collection("users")
      // Filter results
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((documentSnapshot) => {
          if (documentSnapshot.id === uid) {
            //tok = documentSnapshot.data().userObj.token;
            token.push(documentSnapshot.data().token[0]);
            return token;
          }
        });
      });
  } catch (error) {
    console.log("getFcmToken: ", error);
  }
};

const getFcmToken = async () => {
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  console.log(fcmToken, ', the oldToken');
  if (!fcmToken) {
    try {
      fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log(fcmToken, ', the new token');
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    } catch (error) {
      console.log(error, 'no token set');
      showError(error.message);
    }
  }
};

export const notificationChannel = async (channelId, soundName) => {
  await PushNotification.channelExists(channelId, async exists => {
    console.log(exists); // true/false
    if (exists === false) {
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


