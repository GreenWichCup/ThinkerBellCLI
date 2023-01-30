import React, { useState, useEffect, useContext, useCallback } from "react";
import firestore from "@react-native-firebase/firestore";

//import { collection, getDocs, onSnapshot } from "firebase/firestore";
//import { db, auth } from "../authentification/authentification-service";

export const ThinkShopContext = React.createContext();

export const ThinkShopContextProvider = ({ children }) => {
  const [thinkShopFinal, setThinkShopFinal] = useState([]);
  const [isLoadingFinal, setIsLoadingFinal] = useState(true);
  const [error, setError] = useState(null);

  const getProductsFromFirestore = useCallback(async () => {
    //set me up back later
    let productList = [];
    firestore()
      .collection("products")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((documentSnapshot) => {
          productList.push(documentSnapshot.data());
        });
      })
      .then((result) => {
        setThinkShopFinal([...productList]);
        setIsLoadingFinal(false);
      })
      .catch((e) => {
        setError(e);
        console.log(e);
      });
  }, []);
  useEffect(() => {
    getProductsFromFirestore();
  }, [getProductsFromFirestore]);

  return (
    <ThinkShopContext.Provider
      value={{
        thinkShopFinal,
        isLoadingFinal,
        getProductsFromFirestore,
        error,
      }}
    >
      {children}
    </ThinkShopContext.Provider>
  );
};
