import React, { useRef, useState, useEffect, useCallback } from "react";
import { View, TouchableOpacity, StyleSheet, ActivityIndicator, Image } from "react-native";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Camera, useCameraDevices } from "react-native-vision-camera";
import styled from "styled-components";

import { Text } from "../../../components/typography/text-component";
import {
  userStateValue,
  userStateChange,
} from "../../../redux/store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";

const ProfileCamera = styled(Camera)`
  width: 100%;
  height: 100%;
  flex: 1;
`;

const InnerSnap = styled.View`
  width: 100%;
  height: 100%;
  z-index: 999;
`;

export const CameraScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(false);
  const [camId, setCamId] = useState(null);
  const cameraRef = useRef(Camera);
  // const dispatch = useDispatch();
  const userAuthState = useSelector(userStateValue);
  console.log('Data user dispatch before', userAuthState.currentUser);
  const devices = useCameraDevices('wide-angle-camera');
  const device = devices.front;

  const snap = async () => {
    if (cameraRef) {
      console.log('before key was : ', userAuthState.currentUser.userPhoto);
      try {
        const photo = await cameraRef.current.takePhoto()
          .then((result) =>
            console.log(result));
        console.log(photo);
        //navigation.navigate('UserInfoScreen');
      } catch (error) {
        console.log('Data not stored', error);
      }
    }
  };

  const checkCamPermission = useCallback(async () => {
    const cameraPermission = await Camera.getCameraPermissionStatus();
    if (
      cameraPermission === 'not-determined' ||
      cameraPermission === 'denied'
    ) {
      const newCameraPermission = await Camera.requestCameraPermission();
      if (newCameraPermission === 'denied') {
        navigation.navigate('UserInfoScreen');
      } else if (newCameraPermission === 'authorized') {
        setHasPermission(true);
      }
    } else {
      setHasPermission(true);
    }
  }, [hasPermission]);

  useEffect(() => {
    checkCamPermission();
  }, []);

  if (device != null) {
    return (
      <View style={styles.container} >
        <Camera
          ref={camera => (cameraRef.current = camera)}
          photo={true}
          device={device}
          isActive={true}
          style={styles.preview}>
        </Camera>
        <TouchableOpacity onPress={snap} style={styles.actionButton}>
          <Image source={require('../../../../assets/images/camera_icon.png')} />
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <ActivityIndicator color="green" size={40} style={{ alignSelf: "center" }} />
    );
  }

};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preview: {
    flex: 1,
  },
  actionButton: {
    position: 'absolute',
    bottom: 24,
    right: 20,
    left: 20,
    borderRadius: 20,
    alignItems: 'center',
  },
});
