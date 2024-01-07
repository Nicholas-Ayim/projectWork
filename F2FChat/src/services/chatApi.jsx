import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/contact"
  }),
  endpoints: (builder) => ({
    managerProfile: builder.mutation({
      query: (profile) => ({
        url: "/manager/data",
        method: "GET",
        body: profile
      })
    }),
    signupStudent: builder.mutation({
      query: (studentData) => ({
        url: "/signup/student",
        method: "POST",
        body: studentData
      })
    }),
    loginStudent: builder.mutation({
      query: (studentData) => ({
        url: "/login/student",
        method: "POST",
        body: studentData
      })
    }),
    signupManager: builder.mutation({
      query: (managerData) => ({
        url: "/signup/manager",
        method: "POST",
        body: managerData
      })
    }),
    loginManager: builder.mutation({
      query: (managerData) => ({
        url: "/login/manager",
        method: "POST",
        body: managerData
      })
    }),

    hostelDetails: builder.mutation({
      query: ({ hostelId, hostelData }) => ({
        url: `/managerinfo/${hostelId}`,
        method: "POST",
        body: hostelData
      })
    }),
    managerRequest: builder.mutation({
      query: (requestInfo) => ({
        url: "/joinRequest",
        method: "GET",
        body: requestInfo
      })
    }),
    logout: builder.mutation({
      query: ({ id }) => ({
        url: `/logout/${id}`,
        method: "DELETE"
      })
    }),
    hostelMembers: builder.mutation({
      query: (members) => ({
        url: "/allMembers",
        method: "GET",
        body: members
      })
    })
  })
});

export const {
  useManagerProfileMutation,
  useLoginManagerMutation,
  useLoginStudentMutation,
  useSignupManagerMutation,
  useSignupStudentMutation,
  useLogoutMutation,
  useHostelDetailsMutation,
  useManagerRequestMutation,
  useHostelMembersMutation
} = chatApi;
export default chatApi;
