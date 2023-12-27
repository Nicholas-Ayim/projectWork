import { createSlice } from "@reduxjs/toolkit";
import chatApi from "../services/chatApi";
const contactSlice = createSlice({
  name: "contacts",
  initialState:{},
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      chatApi.endpoints.managerProfile.matchFulfilled,
      (state, { payload }) => {
        return { ...state, managerInfo: payload };
      }
    );
    builder.addMatcher(
      chatApi.endpoints.signupStudent.matchFulfilled,
      (state, { payload }) => {
        return { ...state, student: payload };
      }
    );
    builder.addMatcher(
      chatApi.endpoints.loginStudent.matchFulfilled,
      (state, { payload }) => {
        return { ...state, student: payload };
      }
    );
    builder.addMatcher(
      chatApi.endpoints.signupManager.matchFulfilled,
      (state, { payload }) => {
        return { ...state, student: payload };
      }
    );
    builder.addMatcher(
      chatApi.endpoints.loginManager.matchFulfilled,
      (state, { payload }) => {
        return { ...state, student: payload };
      }
    );
    builder.addMatcher(
      chatApi.endpoints.hostelDetails.matchFulfilled,
      (state, { payload }) => {
        return { ...state, hostelDetails: payload };
      }
    );
    builder.addMatcher(
      chatApi.endpoints.logout.matchFulfilled,
      (state, { payload }) => {
        console.log("logout successfully", payload);
        return {
          ...state,
          student: null,
          hostelDetails: null,
          managerInfo: null,
        };
      }
    );
  },
});

export const selectAllManagerInfo = (state) => state.contacts.managerInfo;
export const filledForm = (state) => state.contacts.student.hostelDetails;
export const newFilledForm = (state) => state.contacts.hostelDetails;
export const selectAllContacts = (state) => state.contacts?.student;
export const selectAll= (state) => state.contacts;
export default contactSlice.reducer;
