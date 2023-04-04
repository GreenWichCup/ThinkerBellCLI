import React, { useEffect, useState, useCallback } from 'react';

import { Alert, StatusBar, StyleSheet } from 'react-native';
import messaging from "@react-native-firebase/messaging";
import auth from "@react-native-firebase/auth";
import { ThemeProvider } from 'styled-components';
import { theme } from './src/infrastructure/theme';
import { Navigation } from "./src/infrastructure/navigation";
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { requestNotificationsPermission } from './src/services/notifications/notifications.service';
import SplashScreen from 'react-native-splash-screen';
const App = () => {
  const [publishableKey, setPublishableKey] = useState('');

  useEffect(() => {
    SplashScreen.hide();
    requestNotificationsPermission()

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


