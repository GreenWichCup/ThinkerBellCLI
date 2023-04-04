import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import { PermissionsAndroid } from 'react-native';
import firestore from "@react-native-firebase/firestore";
import Contacts from 'react-native-contacts';

const initialState = {
  contactList: [],
  status: "idle", //'idle'|'loading'|'succeeded'|'failed'
  error: null,
  filteredContact: [],
  filterKeyword: "",
};
const fetchUsersFirestore = async () => {
  const arrayOfUsers = [];
  try {
    await firestore()
      .collection("users")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((element) => {
          arrayOfUsers.push(element.data());
        });
        console.log("list users in function : ", arrayOfUsers);
      });

  } catch (error) {
    console.log("error fetching:", error);
  }
  return [...arrayOfUsers];
}
const formatContactArray = async (array) => {
  let formattedArray = [];
  array.forEach((contact) => {
    if (contact.phoneNumbers.length > 0) {
      var regexPattern = /[^A-Za-z0-9]/g;
      let userPhoneString = contact.phoneNumbers[0].number.replace(regexPattern, "");
      contact.phoneNumbers = userPhoneString.slice(userPhoneString.length - 9);
    }
    const contactForm = {
      displayName: contact.displayName,
      recordID: contact.recordID,
      thumbnailPath: contact.thumbnailPath,
      hasThumbnail: contact.hasThumbnail,
      phoneNumbers: contact.phoneNumbers,
      userId: null,
      exists: false,
      token: null,
      notificationSent: 0,
      notificationReceived: 0,
    }
    formattedArray.push(contactForm);
  })
  return [...formattedArray];
};

export const fetchContacts = createAsyncThunk(
  "contactList/fetchContacts",
  async () => {
    const userList = await fetchUsersFirestore();

    console.log("user list in asyncThunk", userList);
    const checkStatus = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_CONTACTS);
    if (checkStatus === true) {
      let finalContactListArray = [];
      const contactData = await Contacts.getAll();
      const formattedContactData = await formatContactArray(contactData);
      formattedContactData.forEach((contact) => {
        userList.forEach((user) => {
          if (
            contact.phoneNumbers === user.userPhone.slice(user.userPhone.length - 9)
          ) {
            contact.exists = true;
            contact.token = user.token[user.token.length - 1];
            contact.userId = user.userId;
          }
        });
        finalContactListArray.push(contact);
      });
      console.log("final array list", finalContactListArray);

      return finalContactListArray;

    } else {
      const status = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          'title': 'Contacts',
          'message': 'This app would like to view your contacts.',
          'buttonPositive': 'ok'
        }
      );
      if (status === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Else request contact permission status / 1st app launch case: ", status)
        let finalContactListArray = [];
        const contactData = await Contacts.getAll();
        const formattedContactData = await formatContactArray(contactData);
        formattedContactData.forEach((contact) => {
          userList.forEach((user) => {
            if (
              contact.phoneNumbers === user.userPhone.slice(user.userPhone.length - 9)
            ) {
              contact.exists = true;
              contact.token = user.token[user.token.length - 1];
              contact.userId = user.userId;
            }
          });
          finalContactListArray.push(contact);
        });
        console.log("final array list", finalContactListArray);

        return finalContactListArray;
      }
    }
  }
);

const contactListSlice = createSlice({
  name: "contactList",
  initialState,
  reducers: {
    addContacts: {
      reducer(state, action) {
        state.contactList.push(action.payload);
      },
      prepare(displayName, recordID, thumbnailPath, hasThumbnail, phoneNumbers) {
        return {
          payload: {
            displayName,
            recordID,
            thumbnailPath,
            hasThumbnail,
            phoneNumbers
          },
        };
      },
    },
    notificationCounter: {
      reducer(state, action) {
        state.notificationSent
      },
      prepare(displayName, recordID, thumbnailPath, hasThumbnail, phoneNumbers) {
        return {
          payload: {
            displayName,
            recordID,
            thumbnailPath,
            hasThumbnail,
            phoneNumbers
          },
        };
      },

    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchContacts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.status = "succeeded";
        let contactsPhone = [];
        action.payload.forEach((contact) => {
          contactsPhone.push(contact);
        })
        state.contactList = state.contactList.concat(contactsPhone);
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })


  },
});

export const loadAllContacts = (state) => state.contactList.contactList;
export const getContactsStatus = (state) => state.contactList.status;
export const getContactsError = (state) => state.contactList.error;
export const { addContacts } = contactListSlice.actions;
export default contactListSlice.reducer;
