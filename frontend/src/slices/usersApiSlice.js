import { apiSlice } from "./apiSlice";
import { USERS_URL } from "../constants";
import { STAFF_URL } from "../constants";
export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
    profile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
    staffprofile: builder.mutation({
      query: (data) => ({
        url: `${STAFF_URL}/${data.staffId}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
    staffLogin: builder.mutation({
      query: (data) => ({
        url: `${STAFF_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    getStaff: builder.query({
      query: () => ({
        url: STAFF_URL,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Staff"],
    }),
    createStaff: builder.mutation({
      query: () => ({
        url: `${STAFF_URL}`,
        method: "POST",
      }),
      invalidatesTags: ["Book"],
    }),
    updateStaff: builder.mutation({
      query: (data) => ({
        url: `${STAFF_URL}/${data.staffId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Staff"],
    }),
    getStaffByID: builder.query({
      query: (id) => ({
        url: `${STAFF_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    deleteStaff: builder.mutation({
      query: (staffId) => ({
        url: `${STAFF_URL}/${staffId}`,
        method: "DELETE",
      }),
      providesTags: ["Staff"],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useStaffLoginMutation,
  useProfileMutation,
  useCreateStaffMutation,
  useDeleteStaffMutation,
  useGetStaffByIDQuery,
  useGetStaffQuery,
  useUpdateStaffMutation,
  useStaffprofileMutation,
} = userApiSlice;
