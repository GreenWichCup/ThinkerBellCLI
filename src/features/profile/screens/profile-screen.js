import React, { useCallback, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import auth from "@react-native-firebase/auth";
import { List, Avatar, TextInput } from "react-native-paper";
import { ScrollView } from "react-native-virtualized-view";

import { useFocusEffect } from "@react-navigation/native";
import {
  TouchableOpacity,
  FlatList,
  StyleSheet,
  View,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { loadUserProductList } from "../../../redux/store/slices/userThinkCounterSlice";
import Bell_Solo2 from "../../../../assets/images/Bell_solo2.svg";

import "../../../../assets/images/heart_c.png";
import { colors } from "../../../infrastructure/theme/colors";
import { Text } from "../../../components/typography/text-component";
import { Spacer } from "../../../components/spacer/spacer-component";
import { SafeArea } from "../../../components/utility/safe-area-component";
import {
  userStateChange,
  userStateValue,
  noUser,
} from "../../../redux/store/slices/authSlice";

import {
  AvatarContainer,
  ProfileItem,
  ProfileInfo,
  ThinkCounter,
  Amount,
  IconThink,
  ProductList,
  ProfilePhotoCard
} from "../components/profile.style";
import { set } from "immer/dist/internal";

const profileMenu = [
  {
    id: 1,
    title: "Info",
    color: "#FF4500",
    image: require("../../../../assets/images/user.png"),
  },
  {
    id: 2,
    title: "Products",
    color: "#87CEEB",
    image: require("../../../../assets/images/new-product.png"),
  },
  {
    id: 3,
    title: "Activity",
    color: "#4682B4",
    image: require("../../../../assets/images/activity.png"),
  },
  {
    id: 4,
    title: "Settings",
    color: "#6A5ACD",
    image: require("../../../../assets/images/ic_profile_settings.png"),
  },
];

export const ProfileScreen = ({ route, navigation }) => {
  const userAuthState = useSelector(userStateValue);
  const dispatch = useDispatch();
  const [profilePhoto, setProfilePhoto] = useState(null);

  const handleMenuChoice = (itemTitle) => {
    switch (itemTitle) {
      case "Info":
        navigation.navigate("UserInfoScreen");

        break;
      case "Products":
        navigation.navigate("UserProductScreen");

        break;
      case "Activity":
        navigation.navigate("ActivityScreen");

        break;
      case "Settings":
        navigation.navigate("SettingScreen");
        break;

      default:
        break;
    }
  };

  const getProfilePicture = useCallback(async () => {
    const defaultPhoto = "https://firebasestorage.googleapis.com/v0/b/tatthood-ee0f3.appspot.com/o/app_images%2Fuser.png?alt=media&token=a3fac232-3d6c-4336-aea6-ee04acc9b036";
    try {
      const photoUri = await AsyncStorage.getItem(
        userAuthState.currentUser.userId
      );
      if (photoUri) {
        setProfilePhoto(photoUri);
        console.log("value photo ", photoUri);
        console.log("storage key : ", userAuthState.currentUser.userId);
      } else {
        setProfilePhoto(defaultPhoto);
      }
    } catch (error) {
      console.log("AsyncStorage error:", error);
    }
  }, [userAuthState.currentUser.userId]);

  useFocusEffect(
    useCallback(() => {
      getProfilePicture();
    }, [getProfilePicture])
  );

  return (
    <SafeArea>
      <AvatarContainer>
        <View
          style={{
            backgroundColor: "#eaf4d6",
            width: "100%",
          }}
        >
          <Spacer position="top" size="large" />
          {profilePhoto === null ? (
            <View
              style={styles.profilePhoto}
            >
              <Bell_Solo2 width={84} height={84} />
            </View>
          ) : (
            <Avatar.Image
              size={80}
              source={{ uri: `file://${profilePhoto}` }}
              style={{ alignSelf: "center" }}
            />
          )}

          <Spacer position="top" size="small" />
          <Text style={styles.userName} variant="label">{userAuthState.currentUser.userName}</Text>
          <Spacer position="top" size="medium" />
        </View>
        <ProfileInfo>
          <ThinkCounter>
            <IconThink
              source={require("../../../../assets/images/ic_total_sent.png")}
            />
            <Amount>200</Amount>
          </ThinkCounter>
          <ThinkCounter>
            <IconThink
              source={require("../../../../assets/images/ic_total_received.png")}
            />
            <Amount>200</Amount>
          </ThinkCounter>
        </ProfileInfo>
      </AvatarContainer>

      <FlatList
        style={styles.list}
        contentContainerStyle={styles.listContainer}
        data={profileMenu}
        horizontal={false}
        numColumns={2}
        keyExtractor={(item) => {
          return item.id;
        }}
        renderItem={({ item }) => {
          return (
            <View>
              <TouchableOpacity
                style={[
                  styles.card,
                  {
                    backgroundColor: "#eaf4d6",
                  },
                ]}
                onPress={() => {
                  //navigation function;
                  handleMenuChoice(item.title);
                }}
              >
                <Image style={styles.cardImage} source={item.image} />
              </TouchableOpacity>

              <View style={styles.cardHeader}>
                <View>
                  <Text style={[styles.title, { color: item.color }]}>
                    {item.title}
                  </Text>
                </View>
              </View>
            </View>
          );
        }}
      />
    </SafeArea>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    backgroundColor: "#fff",
  },
  list: {
    paddingHorizontal: 5,
    backgroundColor: "#fff",
  },
  listContainer: {
    alignItems: "center",
  },
  /******** card **************/
  card: {
    shadowColor: "#474747",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,

    backgroundColor: "#e2e2e2",
    //flexBasis: '42%',
    width: 80,
    height: 80,
    borderRadius: 60,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
    marginStart: 32,
    marginEnd: 32,
  },
  cardHeader: {
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",

    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  cardImage: {
    height: 50,
    width: 50,
    alignSelf: "center",
  },
  title: {
    fontSize: 24,
    flex: 1,
    alignSelf: "center",
    fontWeight: "bold",
  },
  userName: {
    alignSelf: "center",
  },
  profilePhoto: {
    backgroundColor: "green",
    borderRadius: 50,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 8,
    paddingBottom: 8,
    alignSelf: "center",
  }
});
