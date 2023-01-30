import React, { useEffect } from 'react';
import { Alert, StatusBar, StyleSheet } from 'react-native';
import messaging from "@react-native-firebase/messaging";
import auth from "@react-native-firebase/auth";
import { ThemeProvider } from 'styled-components';
import { theme } from './src/infrastructure/theme';
import { Navigation } from "./src/infrastructure/navigation";
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { NotifService } from './src/services/notifications/notifications.service';
//import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';


const App = () => {

  useEffect(() => {
    messaging().onMessage(async remoteMessage => {
      console.log("some messsage :", remoteMessage)
    });

  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Navigation />
        </Provider>
      </ThemeProvider>
    </>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
