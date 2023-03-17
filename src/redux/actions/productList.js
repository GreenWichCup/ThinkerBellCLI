import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { CartContext } from "../../services/cart/cart-context";

export const saveProductToDb = async (thinkShop, userProducts) => {
  let newProductsArray = [...userProducts];
  const d = new Date();
  const timestamp = d.getMilliseconds();
  thinkShop.forEach((product) => {
    const productObj = {
      active: true,
      product_name: product.name,
      product_sound: product.ringtones,
      purchase_date: timestamp,
      available_think: product.available_think,
      used_think: 0,
    };
    newProductsArray.push(productObj)

  });

  try {
    await firestore()
      .collection("users_purchases")
      .doc(auth().currentUser.uid)
      .set({ product_list: newProductsArray });
  } catch (error) {
    console.log("something went wrong: ", error);
  }
};
