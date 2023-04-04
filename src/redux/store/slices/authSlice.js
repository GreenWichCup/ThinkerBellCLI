import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: {
    userId: null,
    userName: null,
    userPhone: null,
    userEmail: null,
    userToken: null,
    thinkSent: 0,
    thinkReceived: 0,
  },
  loaded: false,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userStateChange: (state, action) => {
      state.currentUser = action.payload;
      state.loaded = true;
    },
    noUser: (state, action) => {
      state.currentUser = {
        userId: null,
        userName: null,
        userPhone: null,
        userEmail: null,
        userToken: null,
        thinkSent: 0,
        thinkReceived: 0
      };
      state.loaded = false;
    },
  },
});
export const { userStateChange, noUser } = authSlice.actions;
export const userStateValue = (state) => state.auth;

export default authSlice.reducer;
