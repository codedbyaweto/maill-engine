import { baseApi } from "@/services/httpClient/baseApi";
import { tags } from '@/utils/types/auth/tagTypes';
import {
    LoginRequest,
    RegisterRequest,
    InitiatePasswordResetRequest,
    CompletePasswordResetRequest,
    ChangePasswordRequest,
    ResendOtpRequest,
    ForgotPasswordRequest, ResetPasswordRequest,
} from "@/models/request/userRequest";
import {
    BaseResponse,
    VerifyEmailResponse,
    LoginResponse, RegisterResponse, ForgotPasswordResponse, ResetPasswordResponse,
} from '@/models/response/userResponses';

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (body) => ({
                url: 'auth/login',
                method: 'POST',
                body,
            }),
            invalidatesTags: [tags.AUTH],
        }),

        register: builder.mutation<RegisterResponse, RegisterRequest>({
            query: (body) => ({
                url: 'auth/register',
                method: 'POST',
                body,
            }),
            invalidatesTags: [tags.AUTH],
        }),

        verifyEmail: builder.mutation<VerifyEmailResponse, { token: string } >({
            query: ({ token }) => ({
                url: `auth/verify-email?token=${token}`,
                method: "GET",
            }),
            invalidatesTags: [tags.AUTH],
        }),

        forgotPassword: builder.mutation<ForgotPasswordResponse, ForgotPasswordRequest>({
            query: (body) => ({
                url: 'auth/forgot-password',
                method: 'POST',
                body,
            }),
            invalidatesTags: [tags.AUTH],
        }),

        resetPassword: builder.mutation<ResetPasswordResponse, ResetPasswordRequest>({
            query: ({ token, newPassword }) => ({
                url: `auth/reset-password`,
                method: "POST",
                body: {
                    token,
                    newPassword,
                },
            }),
        }),

        changePassword: builder.mutation<BaseResponse, ChangePasswordRequest>({
            query: (body) => ({
                url: 'authentication/change-password',
                method: 'POST',
                body,
            }),
            invalidatesTags: [tags.AUTH],
        }),
        initiatePasswordReset: builder.mutation<BaseResponse, InitiatePasswordResetRequest>({
            query: (body) => ({
                url: 'authentication/initiate-password-reset',
                method: 'POST',
                body,
            }),
            invalidatesTags: [tags.AUTH],
        }),
        completePasswordReset: builder.mutation<BaseResponse, CompletePasswordResetRequest>({
            query: (body) => ({
                url: 'authentication/complete-password-reset',
                method: 'POST',
                body,
            }),
            invalidatesTags: [tags.AUTH],
        }),
        resendOtp: builder.mutation<BaseResponse, ResendOtpRequest>({
            query: (body) => ({
                url: 'authentication/resend-otp',
                method: 'POST',
                body,
            }),
            invalidatesTags: [tags.AUTH],
        }),
        userDetails: builder.query<LoginResponse, void>({
            query: () => ({
                url: 'authentication/user-details',
                method: 'GET',
            }),
            providesTags: [tags.AUTH],
        }),
    }),
});

export const {useLoginMutation, useRegisterMutation, useForgotPasswordMutation, useVerifyEmailMutation, useResetPasswordMutation, useInitiatePasswordResetMutation, useCompletePasswordResetMutation} = authApi