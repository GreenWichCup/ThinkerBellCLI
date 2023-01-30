import * as React from "react";
import Svg from "react-native-svg";

const UserPhoto = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={60}
    height={60}
    xmlSpace="preserve"
    {...props}
  />
);

export default UserPhoto;
