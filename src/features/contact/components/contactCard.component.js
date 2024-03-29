import React from "react";
import { TouchableOpacity, View, Image, StyleSheet } from "react-native";
import { Spacer } from "../../../components/spacer/spacer-component";
import {
  ContactAvatar,
  ContactName,
  ContactCard,
  SendButtonContainer,
  ButtonImage,
} from "./contact-components.styles";
import BtnSend from "../../../../assets/images/think_send_btn.svg";
import UserPhoto from "../../../../assets/images/Bell_solo2.svg";
import { Favourite } from "../../../components/favourites/favourite-component";

export const ContactCardItem = ({ contactInfo = {}, onPress, exists, sendNotification }) => {
  const { name, id, uri, imageAvailable } = contactInfo;

  return (
    <ContactCard exists={exists} >
      <TouchableOpacity
        disabled={exists}
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
          <ButtonImage disabled={exists} onPress={sendNotification}>
            <BtnSend width={64} height={64} />
          </ButtonImage>
        </SendButtonContainer>
      </TouchableOpacity>
    </ContactCard>
  );
};

