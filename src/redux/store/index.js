import { configureStore } from "@reduxjs/toolkit";
import contactListReducer from "./slices/contactListSlice";
import authReducer from "./slices/authSlice";
import userProductReducer from "./slices/userThinkCounterSlice";
import userDataReducer from "./slices/userDataSlice";
export const store = configureStore({
  reducer: {
    contactList: contactListReducer,
    userProductList: userProductReducer,
    userData: userDataReducer,
    auth: authReducer,
  },
});
