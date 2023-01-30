import PushNotificationIOS from "@react-native-community/push-notification-ios";
import React, { useEffect } from "react";
import messaging from "@react-native-firebase/messaging";
import { Platform } from "react-native";
import auth from "@react-native-firebase/auth";
import PushNotification, { Importance } from "react-native-push-notification";

export const ForegroundHandler = () => {
  PushNotification.createChannel(
    {
      channelId: "channel-id-1", // (required)
      channelName: "My channel", // (required)
      channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
      playSound: true, // (optional) default: true
      soundName: "bell_1.wav", // (optional) See `soundName` parameter of `localNotification` function
      importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
    },
    (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
  );
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      const { notification, messageId } = remoteMessage;
      if (Platform.OS === "ios") {
        PushNotificationIOS.addNotificationRequest({
          id: messageId,
          body: notification.body,
          title: notification.title,
          sound: "default",
        });
      } else {
        PushNotification.localNotification({
          channelId: "channel-id-1",
          id: "android notification id",
          title: "android notification title",
          showWhen: true, // (optional) default: true
          vibrate: true,
          playSound: true,
          soundName: "bell_1.wav",
          priority: "max",
        });
      }
    });
    return unsubscribe;
  }, []);
  return null;
};

export class NotificationHandler {
  onNotification(notification) {
    console.log("onNotification function:", notification);

    if (typeof this._onNotification === "function") {
      this._onNotification(notification);
    }
  }
  onRegister(token) {
    console.log("onRegister function :", token);

    if (typeof this._onRegister === "function") {
      this._onRegister(token);
      return token;
    }
  }
  onAction(notification) {
    console.log("Notification action received:");
    console.log(notification.action);
    console.log(notification);

    if (notification.action === "Yes") {
      PushNotification.invokeApp(notification);
    }
  }
  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError(err) {
    console.log(err);
  }
  attachRegister(handler) {
    this._onRegister = handler;
  }
  attachNotification(handler) {
    this._onNotification = handler;
  }
}

const handler = new NotificationHandler();

PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: handler.onRegister.bind(handler),

  // (required) Called when a remote or local notification is opened or received
  onNotification: handler.onNotification.bind(handler),

  // (optional) Called when Action is pressed (Android)
  onAction: handler.onAction.bind(handler),

  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError: handler.onRegistrationError.bind(handler),

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   */
  requestPermissions: true,
});
export default handler;
