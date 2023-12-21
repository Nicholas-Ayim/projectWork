import { createSlice } from "@reduxjs/toolkit";
import chatApi from "../services/chatApi";
const contactSlice = createSlice({
  name: "contacts",
  initialState: {},
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
  },
});

export const selectAllManagerInfo = (state) => state.contacts.managerInfo;
export const filledForm = (state) => state.contacts.student.hostelDetails;
export const newFilledForm = (state) => state.contacts.hostelDetails;
export const selectAllContacts = (state) => state.contacts.student;
export default contactSlice.reducer;
