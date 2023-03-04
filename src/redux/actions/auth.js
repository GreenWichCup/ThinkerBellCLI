import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

export const login = (email, password) => (dispatch) =>
  new Promise((resolve, reject) => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        resolve();
      })
      .catch((e) => {
        console.log(e);
        reject();
      });
  });

export const register = (email, password) => (dispatch) =>
  new Promise((resolve, reject) => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        resolve();
      })
      .catch((e) => {
        console.log("error", e)
        reject();
      });
  });

export const updateUser = (id, uri) => (dispatch) =>
  new Promise((resolve, reject) => {
    firestore().collection("users").doc(id).update({
      userPhoto: uri,
    })
      .then(() => {
        resolve();
      })
      .catch((e) => {
        reject();
        console.log("error")
      });
  });

export const saveUserToDb = async (
  id,
  email,
  name,
  phone,
  notificationToken
) => {
  const userObj = {
    userName: name,
    userEmail: email,
    userId: id,
    userPhone: phone,
    token: firestore.FieldValue.arrayUnion(notificationToken),
  };
  try {
    await firestore().collection("users").doc(id).set({
      userName: name,
      userEmail: email,
      userId: id,
      userPhone: phone,
      token: firestore.FieldValue.arrayUnion(notificationToken),
    });
  } catch (error) {
    console.log("error write db data:", error);
  }
  return userObj;
};

