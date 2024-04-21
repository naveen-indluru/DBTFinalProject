import { BOOKS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const booksApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => ({
        url: BOOKS_URL,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Book"],
    }),
    getBookByID: builder.query({
      query: (id) => ({
        url: `${BOOKS_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createBook: builder.mutation({
      query: (userid) => ({
        url: `${BOOKS_URL}`,
        method: "POST",
        body: { id: userid },
      }),
      invalidatesTags: ["Book"],
    }),
    updateProduct: builder.mutation({
      query: (data) => ({
        url: `${BOOKS_URL}/${data.bookId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Books"],
    }),
    uploadProductImage: builder.mutation({
      query: (data) => ({
        url: `/api/upload`,
        method: "POST",
        body: data,
      }),
    }),
    deleteBook: builder.mutation({
      query: (bookId) => ({
        url: `${BOOKS_URL}/${bookId}`,
        method: "DELETE",
      }),
      providesTags: ["Book"],
    }),
    getGenres: builder.query({
      query: () => ({
        url: `${BOOKS_URL}/genres`,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
    }),
    createReview: builder.mutation({
      query: (data) => ({
        url: `${BOOKS_URL}/${data.bookId}/reviews`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Book"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookByIDQuery,
  useDeleteBookMutation,
  useCreateBookMutation,
  useUpdateProductMutation,
  useGetGenresQuery,
  useUploadProductImageMutation,
  useCreateReviewMutation,
} = booksApiSlice;
