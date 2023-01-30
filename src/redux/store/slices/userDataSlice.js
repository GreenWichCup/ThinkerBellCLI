//const initialState = { currentUser: null };
/*export const user = (state = initialState, action) => {
  return { ...state, currentUser: action.currentUser };
};*/
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  usersContactInfo: [],
  loggedUser: {
    name: null,
    email: null,
    id: null,
    photo: null,
  },
};
const userDataSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoggedInUser(state, action) {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
      state.photo = action.payload.photo;
      state.name = action.payload.name;
    },

    setLogoutUser(state) {
      state.email = null;
      state.token = null;
      state.id = null;
      state.photo = null;
      state.name = null;
    },
  },
});
export const { setUser, removeUser } = userDataSlice.actions;

export default userDataSlice.reducer;
