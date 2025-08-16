import { baseApi } from "../../api/baseApi";

const expenseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createExpense: builder.mutation({
      query: (data) => ({
        url: "/expense/create",
        method: "POST",
        body: data,
      }),
    }),

    allExpenses: builder.query({
      query: () => ({
        url: `/expense`,
        method: "GET",
      }),
      providesTags: ["expense"],
    }),
  }),
});

export const { useCreateExpenseMutation, useAllExpensesQuery } = expenseApi;
