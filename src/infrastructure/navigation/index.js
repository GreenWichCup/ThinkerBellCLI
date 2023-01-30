import React, { useCallback, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { useDispatch, useSelector } from 'react-redux';
//import { getAuth, onAuthStateChanged } from "firebase/auth";
import messaging from '@react-native-firebase/messaging';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import {
  userStateChange,
  userStateValue,
} from '../../redux/store/slices/authSlice';

import { AccountNavigator } from './account-navigator';
import { AppNavigator } from './app-navigator';

export const Navigation = () => {
  const userAuthState = useSelector(userStateValue);
  const [isLoading, setIsLoading] = useState(true);
  const [userLogged, setUserLogged] = useState(null);
  const dispatch = useDispatch();

  async function saveTokenToDatabase(token, id) {
    // Assume user is already signed in

    // Add the token to the users datastore
    await firestore()
      .collection('users')
      .doc(id)
      .update({
        token: firestore.FieldValue.arrayUnion(token),
      });
  }
  useEffect(() => {
    auth().onAuthStateChanged(user => {
      if (user) {
        console.log("user redux:", userAuthState.currentUser.userId);

        firestore()
          .collection('users')
          .doc(user.uid)
          .get()
          .then(querySnapshot => {
            if (querySnapshot.exists) {
              const userData = querySnapshot.data();
              return userData;
            } else {
              console.log('no user returned');
            }
          })
          .then(results => {
            //got possible unhandledPromise
            const { userId, userName, userPhoto, token, userEmail } = results;
            console.log('Navigation main / user redux state : ', results);
            dispatch(
              userStateChange({
                userId: userId,
                userName: userName,
                userPhoto: userPhoto,
                userEmail: userEmail,
                token: token,
              }),
            );
          });
      }
    });
    // If using other push notification providers (ie Amazon SNS, etc)
    // you may need to get the APNs token instead for iOS:
    // if(Platform.OS == 'ios') { messaging().getAPNSToken().then(token => { return saveTokenToDatabase(token); }); }

    // Listen to whether the token changes
  }, [dispatch]);

  return (
    <NavigationContainer>
      {auth().currentUser === null ? (
        <AccountNavigator />
      ) : (
        <AppNavigator />
      )}
    </NavigationContainer>
  );
};