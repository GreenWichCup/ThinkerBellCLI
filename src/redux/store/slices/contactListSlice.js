import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import { PermissionsAndroid } from 'react-native';
import Contacts from 'react-native-contacts';

const initialState = {
  contactList: [],
  status: "idle", //'idle'|'loading'|'succeeded'|'failed'
  error: null,
  filteredContact: [],
  filterKeyword: "",
};

export const fetchContacts = createAsyncThunk(
  "contactList/fetchContacts",
  async () => {
    const checkStatus = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_CONTACTS);
    if (checkStatus === true) {
      const contactData = await Contacts.getAll();
      return contactData;

    } else {
      const status = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          'title': 'Contacts',
          'message': 'This app would like to view your contacts.',
          'buttonPositive': 'ok'
        }
      )
        ;
      if (status === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Else request contact permission status / 1st app launch case: ", status)
        const contactData = await Contacts.getAll();
        return contactData;
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
    filterContact: {
      reducer(state, action) {
        action.payload.forEach(user => {
          state.contactList.forEach(c => {

          })
        });
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
          if (contact.phoneNumbers.length > 0) {
            var regexPattern = /[^A-Za-z0-9]/g;
            let userPhoneString = contact.phoneNumbers[0].number.replace(regexPattern, "");
            contact.phoneNumbers = userPhoneString.slice(userPhoneString.length - 9);
            contactsPhone.push(contact);
          }
        })
        state.contactList = state.contactList.concat(contactsPhone);
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const loadAllContacts = (state) => state.contactList.contactList;
export const getContactsStatus = (state) => state.contactList.status;
export const getContactsError = (state) => state.contactList.error;
export const { addContacts } = contactListSlice.actions;
export default contactListSlice.reducer;
