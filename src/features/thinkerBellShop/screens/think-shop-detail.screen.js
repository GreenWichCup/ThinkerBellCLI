import React, { useState, useContext, useEffect } from "react";
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import IonIcon from 'react-native-vector-icons/Ionicons';
import { Audio } from "expo-av";
/*import {
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../../services/authentification/authentification-service";*/

import { colors } from "../../../infrastructure/theme/colors";
import ThinkShopInfoCard from "../components/think-shop-info-card";
import { SafeArea } from "../../../components/utility/safe-area-component";
import { Spacer } from "../../../components/spacer/spacer-component";
import { OrderButton } from "../components/think-shop-list-styles-component";
import { CartContext } from "../../../services/cart/cart-context";
import {
  PlayerContainer,
  RingToneTitleContainer,
  RingToneSliderContainer,
  RingToneTitle,
  RingToneSlider,
  ProgressTextContainer,
  ProgressText,
  RingToneButtonContainer,
  MainContainer,
  RingToneList,
} from "../components/think-shop-info-card-styles";

export const ThinkShopDetailScreen = ({ navigation, route }) => {
  const [ringTone, setRingTone] = useState(null);
  const [seekBarPosition, setSeekBarPosition] = useState(null);
  const [soundIsPlaying, setSoundIsPlaying] = useState(false);
  const [playbackPosition, setPlaybackPosition] = useState(0);
  const [playbackDuration, setPlaybackDuration] = useState(0);
  const [time, setTime] = useState(0);
  const [selectedSound, setSelectedSound] = useState([]);

  const { thinkShop } = route.params;
  const { addToCart, cart } = useContext(CartContext);

  const playSound = async (soundUri) => {
    try {
      const { sound } = await Audio.Sound.createAsync({
        uri: soundUri,
      });
      setSoundIsPlaying(true);
      setRingTone(sound);
      const soundDataObject = await sound.getStatusAsync();
      console.log(soundDataObject.durationMillis);

      //const soundDuration = await soundDataObject.durationMillis;
      await sound.playAsync();
      sound.setOnPlaybackStatusUpdate(handlePlaybackStatusUpdate);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePlaybackStatusUpdate = (playbackStatus) => {
    if (playbackStatus.isLoaded && playbackStatus.isPlaying) {
      setPlaybackPosition(playbackStatus.positionMillis);
      setPlaybackDuration(playbackStatus.durationMillis);
      calculateSeekBar(playbackStatus);
    }
    if (playbackStatus.didJustFinish) {
      console.log("finished: ", playbackStatus.didJustFinish);
      setSeekBarPosition(0);
      setSoundIsPlaying(false);
      setSelectedSound([]);
    }
  };
  const selectItem = (index) => {
    if (selectedSound.indexOf(index) > -1) {
      let newArray = selectedSound.filter((indexObject) => {
        if (indexObject === index) {
          return false;
        }
        return true;
      });
      setSelectedSound(newArray);
    } else {
      setSelectedSound([...selectedSound, index]);
    }
  };
  const calculateSeekBar = (status) => {
    if (status.positionMillis !== null && status.durationMillis !== null) {
      const r = status.positionMillis / status.durationMillis;
      setSeekBarPosition(r);
      return r;
    }
    return 0;
  };
  const seekBarTimer = (itemDuration) => {
    let i = 0;
    for (let index = 0; index < itemDuration; index++) {
      i++;
      setTime(String.valueof(i));
      return String.valueof(i);
    }
  };

  const renderItems = ({ item, index }) => {
    return (
      <Spacer position="top" size="medium">
        <RingToneTitle> {item.name} </RingToneTitle>
        <MainContainer>
          <RingToneButtonContainer>
            <TouchableOpacity
              enabled={!soundIsPlaying}
              onPress={() => {
                console.log("of");
              }}
            >
              <IonIcon name="ios-refresh" size={32} />
            </TouchableOpacity>
            <TouchableWithoutFeedback
              enabled={!selectedSound.indexOf(item.isPlaying) > -1}
              onPress={() => {
                playSound(item.url);
                selectItem(item.isPlaying);
              }}
            >
              <IonIcon
                name={
                  selectedSound.indexOf(item.isPlaying) > -1 && soundIsPlaying
                    ? "ios-pause-circle"
                    : "ios-play-circle"
                }
                size={32}
              />
            </TouchableWithoutFeedback>
          </RingToneButtonContainer>
          <PlayerContainer>
            <RingToneSliderContainer>
              <RingToneSlider
                value={
                  selectedSound.indexOf(item.isPlaying) > -1 && soundIsPlaying
                    ? seekBarPosition
                    : 0
                }
                minimumValue={0}
                maximumValue={1}
                thumbTintColor={colors.ui.primary}
                maximumTrackTintColor={colors.ui.secondary}
                minimumTrackTintColor={colors.ui.primary}
                onSlidingComplete={() => {
                  console.log("please stop the music!");
                }}
              />
            </RingToneSliderContainer>
          </PlayerContainer>
        </MainContainer>
      </Spacer>
    );
  };

  useEffect(() => {
    return ringTone
      ? () => {
        console.log("Unloading Sound");
        ringTone.unloadAsync();
      }
      : undefined;
  }, [ringTone]);

  return (
    <SafeArea>
      <ThinkShopInfoCard thinkShop={thinkShop} />
      <RingToneList
        keyExtractor={(item) => item.name}
        data={thinkShop.ringtones}
        renderItem={renderItems}
      />
      <Spacer position="top" size="large" />
      <OrderButton
        icon="cart"
        mode="contained"
        onPress={() => {
          addToCart(
            { item: thinkShop.name, price: thinkShop.price * 100 },
            thinkShop
          );
          navigation.navigate("CheckoutScreen");
        }}
      >
        Add to cart
      </OrderButton>
      <Spacer position="bottom" size="large" />
    </SafeArea>
  );
};
