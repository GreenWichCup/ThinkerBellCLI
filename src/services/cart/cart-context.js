import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [thinkShop, setThinkShop] = useState(null);
  const [sum, setSum] = useState(0);
  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const add = (item, rst) => {
    //if there is no product or when we are purchasing a different products;
    if (!thinkShop || !thinkShop.placeId === rst.placeId) {
      setCart([item]);
      setThinkShop(rst);
    } else {
      setThinkShop(rst);
      setCart([...cart, item]);
    }
    console.log("add btn clicked: ", item);
  };
  const clear = () => {
    setCart([]);
    setThinkShop(null);
    console.log("cart context provider log :", cart);
  };

  const remove = (index) => {
    //const newCart = cart.filter((product) => product.id !== item.id);
    const deleteEntrie = cart.filter(
      (product) => cart.indexOf(product) !== index
    );
    setCart([...deleteEntrie]);
  };

  useEffect(() => {
    if (!cart.length) {
      setSum(0);
      return;
    }
    const newSum = cart.reduce((acc, { price }) => {
      return (acc += price);
    }, 0);
    setSum(newSum);
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        addToCart: add,
        clearCart: clear,
        removeItem: remove,
        thinkShop,
        cart,
        sum,
        showDialog,
        hideDialog,
        visible,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
