import { baseApi } from "../../api/baseApi";

const expenseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createExpense: builder.mutation({
      query: (data) => ({
        url: "/expense/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["expense"],
    }),
    allExpenses: builder.query({
      query: ({search,category}) => ({
        url: `/expense?search=${search}&category=${category}`,
        method: "GET",
      }),
      providesTags: ["expense"],
    }),
    expense: builder.query({
      query: (id) => ({
        url: `/expense/${id}`,
        method: "GET",
      }),
      providesTags: ["expense"],
    }),
    categoryExpense: builder.query({
      query: () => ({
        url: `/expense/category`,
        method: "GET",
      }),
      providesTags: ["expense"],
    }),
    editExpense: builder.mutation({
      query: ({ id, data }) => ({
        url: `/expense/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags:["expense"]
    }),
    deleteExpense: builder.mutation({
      query: (id) => ({
        url: `/expense/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["expense"],
    }),
  }),
});

export const {
  useCreateExpenseMutation,
  useAllExpensesQuery,
  useEditExpenseMutation,
  useDeleteExpenseMutation,
  useCategoryExpenseQuery,
  useExpenseQuery,
} = expenseApi;
