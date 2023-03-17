import firestore from "@react-native-firebase/firestore";

export const fetchUserDbList = async () => {
  const array = [];
  try {
    await firestore()
      .collection("users")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((element) => {
          console.log("element snapshot", element.data());
          array.push(element.data())
        });

      });
    console.log("array userList", array);
    return array;

  } catch (error) {
    console.log("error fetching:", error);
  }
}
