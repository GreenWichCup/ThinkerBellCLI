import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { CartContext } from "../../services/cart/cart-context";

export const saveProductToDb = async (thinkShop) => {
  console.log("userProducts parameter", thinkShop);
  //let newProductsArray = [...userProducts];

  //const timestamp = firestore.FieldValue.serverTimestamp();
  const date = new Date(firestore.Timestamp.now().seconds * 1000).toLocaleDateString()

  for (let index = 0; index < thinkShop.length; index++) {
    const productObj = {
      active: true,
      product_name: thinkShop[index].name,
      product_sound: thinkShop[index].ringtones,
      purchase_date: date,
      available_think: thinkShop[index].available_think,
      used_think: 0,
    };
    try {
      firestore().collection("users").doc(auth().currentUser.uid).collection("active_product").doc(productObj.product_name).set(productObj)
      console.log("productObject ", productObj);
    } catch (error) {
      console.log("error update document", error)
    }
    // newProductsArray.push(productObj)
  }
};

export const updateProduct = async (thinkShop) => {
  console.log("userProducts parameter", thinkShop);
  //let newProductsArray = [...userProducts];
  //const timestamp = firestore.FieldValue.serverTimestamp();
  thinkShop.forEach(p => {
    try {
      firestore().collection("users").doc(auth().currentUser.uid).collection("active_product").doc(p.product_name).set(p)
      console.log("productObject ", p);
    } catch (error) {
      console.log("error update document", error);
    }
  });

  // newProductsArray.push(productObj)

};

export const sentThinkCounter = async (sentToId, sentToName) => {
  const date = new Date(firestore.Timestamp.now().seconds * 1000).toLocaleDateString();
  await firestore().collection("think_counter").doc(auth().currentUser.uid).collection("sent").add({ userId: sentToId, userName: sentToName, sentDate: date })

}

export const receivedThinkCounter = async (receivedFromId, receivedFromName) => {
  const date = new Date(firestore.Timestamp.now().seconds * 1000).toLocaleDateString();
  await firestore().collection("think_counter").doc(auth().currentUser.uid).collection("received").add({ userId: receivedFromId, userName: receivedFromName, sentDate: date })
}






