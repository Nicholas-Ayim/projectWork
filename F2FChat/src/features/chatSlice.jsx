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
    builder.addMatcher(
      chatApi.endpoints.managerRequest.matchFulfilled,
      (state, { payload }) => {
        return { ...state, managerRequest: payload };
      }
    );
    builder.addMatcher(
      chatApi.endpoints.logout.matchFulfilled,
      (state, { payload }) => {
        console.log("logout successfully", payload);
        return {
          student: null,
          hostelDetails: null,
          managerInfo: null,
          managerRequest: null,
          contacts: null
        };
      }
    );

    builder.addMatcher(
      chatApi.endpoints.hostelMembers.matchFulfilled,
      (state, { payload }) => {
        return { ...state, allMembers: payload };
      }
    );
  }
});

export const selectAllManagerInfo = (state) => state.contacts.managerInfo;
export const filledForm = (state) => state.contacts.student.hostelDetails;
export const newFilledForm = (state) => state.contacts.hostelDetails;
export const selectAllContacts = (state) => state.contacts?.student;
export const selectAll = (state) => state.contacts;
export const selectAllRequest = (state) => state.contacts.managerRequest;
export const selectNewRequest = (state) => state.managerRequest;
export const selectNewMemberAdded = (state) => state.allMembers;
export const selectAllMembers = (state) => state.contacts.allMembers;
export default contactSlice.reducer;
