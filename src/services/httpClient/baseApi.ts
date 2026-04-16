import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { tags } from "@/utils/types/auth/tagTypes";
import { get } from "http";
import { RootState } from "@/store/store";
import { kotlinBaseQueryWithResponseCodeHandling } from "./baseQuery";
import {BaseService} from "@/services/httpClient/config";


// export const baseApi = createApi({
//   reducerPath: "baseApi",
//   baseQuery: kotlinBaseQueryWithResponseCodeHandling,
//   tagTypes: Object.values(tags),
//   endpoints: () => ({}),
// });

export const baseApi = BaseService.appClient


