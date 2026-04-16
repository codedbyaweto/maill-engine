// import { ROUTES } from "@/constants/routes";
import { RootState } from "@/store/store";
import { logout } from "@/features/auth/authSlice";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import {useRouter} from "next/navigation";
export const baseQuery = fetchBaseQuery({
    baseUrl: `https://luvenia-unbargained-sergio.ngrok-free.dev/api/`,
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.user?.token;
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
    },
});

type ExtendedQueryArgs =
    | string
    | {
    url: string;
    method?: string;
    body?: unknown;
    params?: Record<string, any>;
    headers?: Record<string, string>;
    expectedResponseCodes?: string[];
};

export const kotlinBaseQueryWithResponseCodeHandling = async (
    args: ExtendedQueryArgs,
    api: Parameters<typeof baseQuery>[1],
    extraOptions: Parameters<typeof baseQuery>[2]
) => {
    const rawResult = await baseQuery(args, api, extraOptions);

    // 🚨 Handle network errors first
    if (rawResult.error) {
        return rawResult;
    }

    const result = rawResult.data as any;

    const responseCode = result?.responseCode ?? null;

    // ✅ If no responseCode, trust HTTP response
    if (responseCode == null) {
        return { data: result };
    }

    // 🚨 Session expired
    if (responseCode === "90") {
        api.dispatch(logout());

        return {
            error: {
                status: "SESSION_EXPIRED",
                data: {
                    message: "Session expired. Please log in again.",
                },
            },
        };
    }

    const expectedCodes =
        (typeof args === "object" && args.expectedResponseCodes) || ["00"];

    // ✅ Success
    if (expectedCodes.includes(String(responseCode))) {
        return { data: result };
    }

    // ❌ Error handling
    let errorMessage = "An unknown error occurred";

    if (typeof result?.responseMessage === "string") {
        errorMessage = result.responseMessage;
    } else if (
        typeof result?.responseMessage === "object" &&
        result?.responseMessage !== null
    ) {
        errorMessage = Object.entries(result.responseMessage)
            .map(([key, value]) => `${key}: ${value}`)
            .join(", ");
    }

    return {
        error: {
            status: responseCode,
            data: {
                message: errorMessage,
                original: result,
            },
        },
    };
};