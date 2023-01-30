import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

//Data model [{productName: package_100, remaining_think: 100, used_think: 0, active: true, purchase_date: 22 avril 22 },{}]
const initialState = {
  userProductList: [],
  status: "idle", //'idle'|'loading'|'succeeded'|'failed'
  error: null,
  filteredProduct: [],
};

export const fetchUserProductList = createAsyncThunk(
  "userProductList/fetchUserProductList",
  async (id) => {
    const array = [];
    try {
      await firestore()
        .collection("users_purchases")
        .doc(auth().currentUser.uid)
        .get()
        .then((querySnapshot) => {
          if (querySnapshot.exists) {
            const userData = querySnapshot.data();
            userData.product_list.forEach((element) => {
              array.push(element);
            });
          } else {
            console.log("nothing returned");
          }
        });
    } catch (error) {
      console.log("error fetching:", error);
    }
    return array;
  }
);

export const updateUserProductList = createAsyncThunk(
  "userProductList/updateUserProductList",
  async (id) => {
    try {
      await firestore()
        .collection("users_purchases")
        .doc(auth().currentUser.uid)
        .get();
      //do something to update the data
    } catch (error) {
      console.log("error fetching:", error);
    }
  }
);

const userProductListSlice = createSlice({
  name: "userProductList",
  initialState,
  reducers: {
    addUserProductList: {
      reducer(state, action) {
        state.userProductList.push(action.payload);
      },
      prepare(
        product_name,
        active,
        product_sound,
        purchase_date,
        available_think,
        used_think
      ) {
        return {
          payload: {
            product_name,
            active,
            product_sound,
            purchase_date,
            available_think,
            used_think,
          },
        };
      },
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUserProductList.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchUserProductList.fulfilled, (state, action) => {
        state.status = "succeeded";
        const loadedProducts = action.payload.map((c) => {
          //const date = c.purchase_date.toDate();
          const productDataModel = {
            product_name: c.product_name,
            active: c.active,
            product_sound: c.product_sound,
            purchase_date: c.purchase_date,
            available_think: c.available_think,
            used_think: c.used_think,
          };
          return productDataModel;
        });
        state.userProductList = loadedProducts;
      })
      .addCase(fetchUserProductList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const loadUserProductList = (state) =>
  state.userProductList.userProductList;
export const getUserProductListStatus = (state) => state.userProductList.status;
export const getUserProductListError = (state) => state.userProductList.error;
export const { addUserProductList } = userProductListSlice.actions;
export default userProductListSlice.reducer;
