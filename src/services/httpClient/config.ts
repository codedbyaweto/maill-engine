"use client";
import {
    BaseQueryApi,
    BaseQueryFn,
    createApi,
    FetchArgs,
    FetchBaseQueryError,
    fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { BaseUtil } from "@/utilities/baseUtil";
import { ApiTagsEnum } from "@/utilities/enums/apiTagsEnum";
import { toastUtil } from "@/utilities/toastUtil";
import { BaseResponse } from "@/utils/types/baseTypes";
import { BaseEnum } from "@/utilities/enums/baseEnum";
import RouterUtil from "@/utilities/routerUtil";
// import RouteConstant from "@/utilities/constants/routeConstants";

// import {Permission} from "@/utilities/constants/permissionConstants";
import { logout } from "@/features/auth/authSlice";
import { RootState } from "@/store/store";
import { tags } from "@/utils/types/auth/tagTypes";

// Extended FetchArgs to include expected response codes and permission guards
interface ExtendedFetchArgs extends FetchArgs {
    expectedResponseCodes?: string[];
    /**
     * Permissions required to fire this request (OR logic — user needs at least one).
     * If the current user lacks all listed permissions, the request is skipped silently.
     * Leave undefined to allow all authenticated users.
     */
    // requiredPermissions?: Permission[];
}

const handleApiError = (
    error: FetchBaseQueryError,
    api: BaseQueryApi,
    expectedResponseCodes?: string[]
): { shouldLogout?: boolean } => {
    const status = error.status;
    const data = error.data as BaseResponse;
    const defaultMessage = "An unexpected error occurred";
    const message = data?.responseMessage || defaultMessage;
    const responseCode = data?.responseCode;

    let shouldLogout = false;

    // Handle auth-specific response codes — logout user
    if (
        responseCode === BaseEnum.RESPONSE_CODE_ACCESS_TOKEN_EXPIRED ||
        responseCode === BaseEnum.RESPONSE_CODE_INVALID_REFRESH_TOKEN
    ) {
        shouldLogout = true;
        toastUtil.showUniqueToast(
            "session-expired",
            "Session expired. Please login again.",
            "error"
        );
        api.dispatch(logout());
        if (typeof window !== "undefined") {
            RouterUtil.navigate('/login');
        }
        return { shouldLogout };
    }

    // Handle legacy JWT session expiration
    if (
        message.includes("JWT") ||
        message.toLowerCase().includes("invalid authorization token")
    ) {
        shouldLogout = true;
        toastUtil.showUniqueToast(
            "session-expired",
            "Session expired, kindly login",
            "error"
        );
        api.dispatch(logout());
        if (typeof window !== "undefined") {
            RouterUtil.navigate('/login');
        }
        return { shouldLogout };
    }

    // Skip if expected response code
    if (
        expectedResponseCodes &&
        responseCode &&
        expectedResponseCodes.includes(responseCode)
    ) {
        return { shouldLogout };
    }

    // Handle standard HTTP errors
    switch (status) {
        case 400:
            toastUtil.showUniqueToast("bad-request", message || "Invalid request", "error");
            break;
        case 403:
            toastUtil.showUniqueToast("forbidden", message || "Forbidden resource", "error");
            break;
        case 404:
            toastUtil.showUniqueToast("not-found", message || "Resource not found", "error");
            break;
        case 500:
            toastUtil.showUniqueToast("server-error", message || "Server error", "error");
            break;
        case "FETCH_ERROR":
            toastUtil.showUniqueToast("network-error", "Network error, please check your connection", "error");
            break;
        case "TIMEOUT_ERROR":
            toastUtil.showUniqueToast("timeout-error", "Request timed out, try again later", "error");
            break;
        default:
            if (message && message !== defaultMessage) {
                toastUtil.showUniqueToast(`error-${status}`, message, "error");
            }
    }

    return { shouldLogout };
};

const baseUrl = `https://mailengine-production1123.up.railway.app/api`

// const baseQuery = fetchBaseQuery({
//     baseUrl: baseUrl,
//     prepareHeaders: (headers, {getState}) => {
//         // const authState = (getState() as RootState).auth;
//         const token = (getState() as RootState).auth.user?.token;
//
//         headers.set("Authorization", `${token}`);
//         headers.set("Content-Type", "application/json");
//         headers.set("Accept", "application/json");
//         return headers;
//     },
//     timeout: 29000,
// });

const baseQuery = fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers, { getState }) => {
        // const token = (getState() as RootState).auth.user?.token;
        const token = (getState() as RootState).auth.token;
        console.log(token)
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }

        headers.set("Accept", "application/json");

        return headers;
    },
});
const baseQueryWithErrorHandling: BaseQueryFn<
    string | ExtendedFetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    BaseUtil.logger("requestArgument: ", args);

    // Extract our custom properties
    let expectedResponseCodes: string[] | undefined;
    let cleanArgs = args;

    if (typeof args === "object" && "expectedResponseCodes" in args) {
        expectedResponseCodes = args.expectedResponseCodes;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { expectedResponseCodes: _, ...rest } = args;
        cleanArgs = rest;
    }

    // Permission guard — check before making any network call
    // if (typeof args === "object" && "requiredPermissions" in args && args.requiredPermissions?.length) {
    //     const authState = (api.getState() as RootState).auth;
    //     const userPermissions: Permission[] = (authState?.userInfo as any)?.permissions?.map(
    //         (p: { resourceEntity: string; actionType: string }) => `${p.resourceEntity}:${p.actionType}` as Permission
    //     ) ?? [];
    //
    //     const hasPermission = args.requiredPermissions.some((required) =>
    //         userPermissions.includes(required)
    //     );
    //
    //     if (!hasPermission) {
    //         BaseUtil.logger("Permission denied for request:", args.url, "— required:", args.requiredPermissions);
    //         // Only toast for mutations — reads silently return no data (avoids noisy toasts on page load)
    //         if (api.type === "mutation") {
    //             toastUtil.showUniqueToast(
    //                 "permission-denied",
    //                 "You do not have permission to perform this action",
    //                 "error"
    //             );
    //             // eslint-disable-next-line @typescript-eslint/no-unused-vars
    //             const {requiredPermissions: _, ...rest} = cleanArgs as ExtendedFetchArgs;
    //             cleanArgs = rest;
    //             return {error: {status: 403, data: {responseCode: "403", responseMessage: "Permission denied"}} as FetchBaseQueryError};
    //         }
    //         // eslint-disable-next-line @typescript-eslint/no-unused-vars
    //         const {requiredPermissions: _, ...rest} = cleanArgs as ExtendedFetchArgs;
    //         cleanArgs = rest;
    //         return {data: undefined};
    //     }
    //
    //     // Strip requiredPermissions before passing to fetchBaseQuery
    //     // eslint-disable-next-line @typescript-eslint/no-unused-vars
    //     const {requiredPermissions: _, ...rest} = cleanArgs as ExtendedFetchArgs;
    //     cleanArgs = rest;
    // }

    const result = await baseQuery(cleanArgs, api, extraOptions);

    // Handle successful responses with business logic errors
    if (result.data && !BaseUtil.isApiResponseSuccessful(result.data as BaseResponse)) {
        const data = result.data as BaseResponse;
        const responseCode = data?.responseCode;

        // Handle auth errors — logout user
        if (
            responseCode === BaseEnum.RESPONSE_CODE_ACCESS_TOKEN_EXPIRED ||
            responseCode === BaseEnum.RESPONSE_CODE_INVALID_REFRESH_TOKEN
        ) {
            toastUtil.showUniqueToast(
                "session-expired",
                "Session expired. Please login again.",
                "error"
            );
            api.dispatch(logout());
            if (typeof window !== "undefined") {
                RouterUtil.navigate('/login');
            }
            return result;
        }

        // Skip if expected response code
        if (expectedResponseCodes && responseCode && expectedResponseCodes.includes(responseCode)) {
            return result;
        }

        // Show error for other business logic errors
        const message = data?.responseMessage;
        if (message) {
            toastUtil.showUniqueToast(`error-${responseCode}`, message, "error");
        }
    }

    // Handle fetch errors
    if (result.error) {
        const { shouldLogout } = handleApiError(result.error, api, expectedResponseCodes);

        if (shouldLogout) {
            return result;
        }
    }

    BaseUtil.logger("result: ", result);
    return result;
};

// Create base API instance
const baseApi = createApi({
    baseQuery: baseQueryWithErrorHandling,
    tagTypes: Object.values(tags),
    endpoints: () => ({}),
    keepUnusedDataFor: 60,
    refetchOnReconnect: true,
});

export const BaseService = {
    appClient: baseApi,
};
