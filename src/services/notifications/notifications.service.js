import messaging from "@react-native-firebase/messaging";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import firestore from "@react-native-firebase/firestore";
import PushNotification, { Importance } from "react-native-push-notification";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import NotificationHandler from "./foregroundHandler";


export const requestNotificationsPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log("Authorization status:", authStatus);
  }
  //getFcmToken();
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

export const getFcmToken = async (uid) => {
  let fcmToken = await AsyncStorage.getItem(uid);
  if (!fcmToken) {
    try {
      await messaging().registerDeviceForRemoteMessages();
      const newFcmToken = await messaging().getToken();
      if (newFcmToken) {
        console.log(fcmToken, "the new generated token");
        await AsyncStorage.setItem(uid, newFcmToken);
        return newFcmToken;
      }
    } catch (error) {
      console.log();
      console.log("error fcmToken message: ", error.messagage);
    }
  }
  //console.log(""fcmToken);
};

export default class NotifService {
  constructor(onRegister, onNotification) {
    this.lastId = 0;
    this.lastChannelCounter = 0;

    this.createDefaultChannels("bell_3.mp3");

    //NotificationHandler.attachRegister(onRegister);
    //NotificationHandler.attachNotification(onNotification);

    // Clear badge number at start
    PushNotification.getApplicationIconBadgeNumber(function (number) {
      if (number > 0) {
        PushNotification.setApplicationIconBadgeNumber(0);
      }
    });

    PushNotification.getChannels(function (channels) {
      console.log("channels array: ", channels);
    });
  }
  async createDefaultChannels(customSound) {
    PushNotification.createChannel(
      {
        channelId: "sound-channel-id", // (required)
        channelName: `Custom channel - Counter: ${this.lastChannelCounter}`, // (required)
        channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
        soundName: customSound, // (optional) See `soundName` parameter of `localNotification` function
        playSound: true, // (optional) default: true
        importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
      },
      (created) => console.log(`createChannel returned : '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
    );
  }
  popInitialNotification() {
    PushNotification.popInitialNotification((notification) =>
      console.log("InitialNotication:", notification)
    );
  }
  localNotif(soundName) {
    this.lastId++;
    PushNotification.localNotification({
      /* Android Only Properties */
      channelId: "sound-channel-id",
      ticker: "My Notification Ticker", // (optional)
      autoCancel: true, // (optional) default: true
      largeIcon: "ic_launcher", // (optional) default: "ic_launcher"
      smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher"
      bigText: "My big text that will be shown when notification is expanded", // (optional) default: "message" prop
      subText: "This is a subText", // (optional) default: none
      color: "red", // (optional) default: system default
      vibrate: true, // (optional) default: true
      vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
      tag: "some_tag", // (optional) add tag to message
      group: "group", // (optional) add group to message
      groupSummary: false, // (optional) set this notification to be the group summary for a group of notifications, default: false
      ongoing: false, // (optional) set whether this is an "ongoing" notification
      actions: ["Yes", "No"], // (Android only) See the doc for notification actions to know more
      invokeApp: true, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true

      when: null, // (optionnal) Add a timestamp pertaining to the notification (usually the time the event occurred). For apps targeting Build.VERSION_CODES.N and above, this time is not shown anymore by default and must be opted into by using `showWhen`, default: null.
      usesChronometer: false, // (optional) Show the `when` field as a stopwatch. Instead of presenting `when` as a timestamp, the notification will show an automatically updating display of the minutes and seconds since when. Useful when showing an elapsed time (like an ongoing phone call), default: false.
      timeoutAfter: null, // (optional) Specifies a duration in milliseconds after which this notification should be canceled, if it is not already canceled, default: null

      /* iOS only properties */
      category: "", // (optional) default: empty string
      subtitle: "My Notification Subtitle", // (optional) smaller title below notification title

      /* iOS and Android properties */
      id: this.lastId, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
      title: "Local Notification", // (optional)
      message: "My Notification Message", // (required)
      userInfo: { screen: "home" }, // (optional) default: {} (using null throws a JSON value '<null>' error)
      playSound: !!soundName, // (optional) default: true
      soundName: soundName ? soundName : "bell_4.mp3", // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
      number: 1, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
    });
  }
}
