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
  async () => {
    const array = [];
    try {
      await firestore()
        .collection("users")
        .doc(auth().currentUser.uid)
        .collection("active_product")
        .where('active', '==', true)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((ds) => {
            const productData = ds.data();
            if (productData.active === true) {
              array.push(productData);
            }
          })
        });
    } catch (error) {
      console.log("error fetching products firestore:", error);
    }
    return array;
  }
);

/*export const updateUserProductList = createAsyncThunk(
  "userProductList/updateUserProductList",
  async (payload) => {
    try {
      await firestore()
        .collection("users_purchases")
        .doc(auth().currentUser.uid)
        .update({ product_list: payload });
      //do something to update the data
    } catch (error) {
      console.log("error fetching:", error);
    }
  }
);*/

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
    updateThinkAmout: {
      reducer(state) {
        for (let index = 0; index < state.userProductList.length; index++) {
          let element = state.userProductList[index];
          if (element.available_think - 1 > 0) {
            element.available_think -= 1;
            element.used_think += 1;
            console.log("product updated", element);
            return;

          } else if (element.available_think === "unlimited") {
            element.used_think += 1;
            console.log("product updated", element);
            return;

          } else if (element.available_think - 1 == 0) {
            element.available_think -= 1;
            element.used_think += 1;
            element.active = false;
            console.log("product updated", element);
            return;
          }
        }
        console.log("state.productList updating... :", state.userProductList);


      }
    }

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

export const updateUserProduct = async (payload) => {
  await firestore().collection("users_purchases").doc(userDataState.currentUser.userId).get()
  try {
    await firestore().collection("users_purchases").doc(userDataState.currentUser.userId).update({
      product_list: payload
    });
    console.log("userDataState", userDataState);
  } catch (error) {
    console.log("error write db data:", error);
  }
};



export const loadUserProductList = (state) => state.userProductList.userProductList;
export const getUserProductListStatus = (state) => state.userProductList.status;
export const getUserProductListError = (state) => state.userProductList.error;
export const { addUserProductList, updateThinkAmout } = userProductListSlice.actions;
export default userProductListSlice.reducer;
