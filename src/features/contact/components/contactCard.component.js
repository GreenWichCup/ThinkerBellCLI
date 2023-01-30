import React from "react";
import { TouchableOpacity, View, Image } from "react-native";
import { useSelector } from "react-redux";
import { Spacer } from "../../../components/spacer/spacer-component";
import {
  ContactAvatar,
  ContactCard,
  ContactName,
  SendButtonContainer,
  ButtonImage,
} from "./contact-components.styles";
import BtnSend from "../../../../assets/images/think_send_btn.svg";
import UserPhoto from "../../../../assets/images/Bell_solo2.svg";
import { Favourite } from "../../../components/favourites/favourite-component";
import { loadUserProductList } from "../../../redux/store/slices/userThinkCounterSlice";

export const ContactCardItem = ({ contactInfo = {}, sendNotification, onPress }) => {
  const { name, id, uri, imageAvailable } = contactInfo;
  const userProducts = useSelector(loadUserProductList);
  return (
    <ContactCard>
      <TouchableOpacity
        onPress={onPress}
      >
        <ContactName numberOfLines={1} variant="label">
          {contactInfo.displayName}
        </ContactName>
        <Spacer position="top" size="large" />
        <View
          style={{
            alignSelf: "center",
            backgroundColor: "#eaf4d6",
            borderRadius: 50,
            padding: 4,
          }}
        >
          {contactInfo.hasThumbnail === false ? (
            <UserPhoto width={64} height={64} />
          ) : (

            <ContactAvatar source={{ uri: contactInfo.thumbnailPath }} />
          )}
        </View>

        <SendButtonContainer>
          <Favourite contact={contactInfo} />
          <ButtonImage onPress={sendNotification}>
            <BtnSend width={64} height={64} />
          </ButtonImage>
        </SendButtonContainer>
      </TouchableOpacity>
    </ContactCard>
  );
};
