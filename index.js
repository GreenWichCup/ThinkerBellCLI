import { AppRegistry, NativeModules } from 'react-native';
import App from './App';
import messaging from "@react-native-firebase/messaging";
import PushNotification from 'react-native-push-notification';
import { notificationChannel } from './src/services/notifications/notifications.service';
import { name as appName } from './app.json';

messaging().onNotificationOpenedApp(remoteMessage => {
  console.log('Notif caused app to open from bck', remoteMessage.notification);
});

messaging().onMessage(async remoteMessage => {
  const cId = remoteMessage.data.channelId;
  const sName = remoteMessage.data.soundName;
  console.log(`cId ${cId} sName ${sName}`);
  await notificationChannel(cId, sName)

  await PushNotification.localNotification({
    /* Android Only Properties */
    channelId: cId, // (required) channelId, if the channel doesn't exist, notification will not trigger.
    message: ' Notification Foreground', // (required)
    showWhen: true, // (optional) default: true
    autoCancel: true, // (optional) default: true
    playSound: true, // (optional) default: true
    largeIcon: 'ic_launcher', // (optional) default: "ic_launcher". Use "" for no large icon.
    largeIconUrl: 'https://www.example.tld/picture.jpg', // (optional) default: undefined
    smallIcon: 'mail_box',
    ongoing: false, // (optional) set whether this is an "ongoing" notification
    tag: 'some_tag', // (optional) add tag to message
    bigPictureUrl: 'https://www.example.tld/picture.jpg', // (optional) default: undefined
    bigLargeIcon: 'ic_launcher', // (optional) default: undefined
    bigLargeIconUrl: 'https://www.example.tld/bigicon.jpg',
    priority: 'high',
    when: null, // (optional) Add a timestamp (Unix timestamp value in milliseconds) pertaining to the notification (usually the time the event occurred). For apps targeting Build.VERSION_CODES.N and above, this time is not shown anymore by default and must be opted into by using `showWhen`, default: null.
    usesChronometer: false, // (optional) Show the `when` field as a stopwatch. Instead of presenting `when` as a timestamp, the notification will show an automatically updating display of the minutes and seconds since when. Useful when showing an elapsed time (like an ongoing phone call), default: false.
    timeoutAfter: null, // (optional) Specifies a duration in milliseconds after which this notification should be canceled, if it is not already canceled, default: null
    messageId: 'google:message_id', // (optional) added as `message_id` to intent extras so opening push notification can find data stored by @react-native-firebase/messaging module.
    actions: ['Yes', 'No'], // (Android only) See the doc for notification actions to know more
    invokeApp: true, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true
  });
  PushNotification.getChannels(function (channel_ids) {
    console.log('goat function', channel_ids); // ['channel_id_1']
  });
});

messaging().setBackgroundMessageHandler(async remoteMessage => {
  const cId = remoteMessage.data.channelId;
  const sName = remoteMessage.data.soundName;
  console.log(`cId ${cId} sName ${sName}`);
  await notificationChannel(cId, sName)
  await PushNotification.localNotification({
    /* Android Only Properties */
    channelId: cId, // (required) channelId, if the channel doesn't exist, notification will not trigger.
    message: ' Notification BACKGROUND', // (required)
    showWhen: true, // (optional) default: true
    autoCancel: true, // (optional) default: true
    playSound: true, // (optional) default: true
    largeIcon: 'ic_launcher', // (optional) default: "ic_launcher". Use "" for no large icon.
    largeIconUrl: 'https://www.example.tld/picture.jpg', // (optional) default: undefined
    smallIcon: 'mail_box',
    bigPictureUrl: 'https://www.example.tld/picture.jpg', // (optional) default: undefined
    bigLargeIcon: 'ic_launcher', // (optional) default: undefined
    bigLargeIconUrl: 'https://www.example.tld/bigicon.jpg',
    priority: 'high',
    when: null, // (optional) Add a timestamp (Unix timestamp value in milliseconds) pertaining to the notification (usually the time the event occurred). For apps targeting Build.VERSION_CODES.N and above, this time is not shown anymore by default and must be opted into by using `showWhen`, default: null.
    usesChronometer: false, // (optional) Show the `when` field as a stopwatch. Instead of presenting `when` as a timestamp, the notification will show an automatically updating display of the minutes and seconds since when. Useful when showing an elapsed time (like an ongoing phone call), default: false.
    timeoutAfter: null, // (optional) Specifies a duration in milliseconds after which this notification should be canceled, if it is not already canceled, default: null
    messageId: 'google:message_id', // (optional) added as `message_id` to intent extras so opening push notification can find data stored by @react-native-firebase/messaging module.
    actions: ['Yes', 'No'], // (Android only) See the doc for notification actions to know more
    invokeApp: true, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true
  });
  PushNotification.getChannels(function (channel_ids) {
    console.log('goat function', channel_ids); // ['channel_id_1']
  });
});

messaging()
  .getInitialNotification()
  .then(remoteMessage => {
    if (remoteMessage) {
      console.log('opening from quit state', remoteMessage.notification);
    }
  });


AppRegistry.registerComponent(appName, () => App);
