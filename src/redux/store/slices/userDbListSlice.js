import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import firestore from "@react-native-firebase/firestore";

const initialState = {
  userList: [],
  status: 'idle', //'idle'|'loading'|'succeeded'|'failed'
  error: null,
}

export const fetchUserList = createAsyncThunk(
  "userList/fetchUserList",
  async () => {
    const array = [];
    try {
      await firestore()
        .collection("users")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((element) => {
            array.push(element.data());
          });
        });

    } catch (error) {
      console.log("error fetching:", error);
    }
    return array;

  }
)

const userListSlice = createSlice({
  name: "userList",
  initialState,
  reducers: {
    addUserList: {
      reducer(state, action) {
        state.userList.push(action.payload);
      },
      prepare(
        userName,
        userEmail,
        userId,
        userPhone,
        token,
      ) {
        return {
          payload: {
            userName,
            userEmail,
            userId,
            userPhone,
            token,
          },
        };
      },
    },

  },
  extraReducers(builder) {
    builder
      .addCase(fetchUserList.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchUserList.fulfilled, (state, action) => {
        state.status = "succeeded";
        const userLoaded = action.payload.map(u => {
          const userData = {
            userName: u.userName,
            userEmail: u.userEmail,
            userId: u.userId,
            userPhone: u.userPhone,
            token: u.token
          }
          return userData;
        });
        state.userList = userLoaded;
      })
      .addCase(fetchUserList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
})

export const loadUserList = (state) => state.userList.userList;
export const getUserListStatus = (state) => state.userList.status;
export const getUserListError = (state) => state.userList.error;
export const { addUserList } = userListSlice.actions;
export default userListSlice.reducer;