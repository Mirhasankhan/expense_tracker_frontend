
import { JWTDecode } from "@/utils/jwt";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://expense-tracker-backend-sepia.vercel.app/api/v1",
    prepareHeaders: (headers) => {
      const {token} = JWTDecode()
      if (token) {
        headers.set("Authorization", `${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["users","expense","service"],
  endpoints: () => ({}),
});
