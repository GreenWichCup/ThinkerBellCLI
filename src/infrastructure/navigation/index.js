import React, { useCallback, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AccountNavigator } from './account-navigator';
import { AppNavigator } from './app-navigator';


//import { getAuth, onAuthStateChanged } from "firebase/auth";
import messaging from '@react-native-firebase/messaging';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import {
  userStateChange,
  userStateValue,
} from '../../redux/store/slices/authSlice';
import { fetchUserList } from '../../redux/store/slices/userDbListSlice';




export const Navigation = () => {
  const userAuthState = useSelector(userStateValue);
  const dispatch = useDispatch();
  const authStateCallback = useCallback(() => {
    auth().onAuthStateChanged((user) => {
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
            const { userId, userName, userPhoto, token, userEmail, userPhone } = results;
            console.log('Navigation main / user redux state : ', results);
            dispatch(
              userStateChange({
                userId: userId,
                userName: userName,
                userPhoto: userPhoto,
                userEmail: userEmail,
                token: token,
                userPhone: userPhone
              }),
            );
          });

      }
    });
    // If using other push notification providers (ie Amazon SNS, etc)
    // you may need to get the APNs token instead for iOS:
    // if(Platform.OS == 'ios') { messaging().getAPNSToken().then(token => { return saveTokenToDatabase(token); }); }
    // Listen to whether the token changes
  }, [])
  useEffect(() => {
    authStateCallback()
  }, [authStateCallback]);



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
