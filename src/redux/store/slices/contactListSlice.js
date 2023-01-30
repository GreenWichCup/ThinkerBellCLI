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
          'buttonPositive': 'Please accept bare mortal'
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
        console.log("log addContact payload: ", action.payload);
        state.contactList.push(action.payload);
      },
      prepare(displayName, recordID, thumbnailPath) {
        return {
          payload: {
            displayName,
            recordID,
            thumbnailPath,
            hasThumbnail,
          },
        };
      },
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchContacts.pending, (state, action) => {
        state.status = "loading";
        console.log("recux fetchContact.pending: ", action.payload)
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log("log fetchContact.fullfilled payload: ", action.payload);
        const loadedContacts = action.payload.map((c) => {
          const contactModel = {
            displayName: c.displayName.length ? c.displayName : "N/A",
            recordID: c.recordID,
            thumbnailPath: c.hasThumbnail ? c.thumbnailPath : require("../../../../assets/images/LOGO-enter.png"),
            hasThumbnail: c.hasThumbnail,
            defaultRingTone: null,
          };
          return contactModel;
        });
        state.contactList = state.contactList.concat(loadedContacts);
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
