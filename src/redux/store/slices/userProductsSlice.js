import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userProductsList: [],
  loaded: false,
};
const userProductSlice = createSlice({
  name: "userProductList",
  initialState,
  reducers: {
    userActiveProducts: (state, action) => {
      state.userProductsList = action.payload;
      state.loaded = action.payload;
    },
    noActiveProduct: (state) => {
      state.userProductsList = [];
      state.loaded = true;
    },
  },
});
export const { userActiveProducts, noActiveProduct } = userProductSlice.actions;

export default userProductSlice.reducer;
