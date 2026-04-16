"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useFormik } from "formik";
import { toast } from "react-hot-toast";
import { Eye, EyeOff, Lock } from "lucide-react";
import BaseFormField from "@/components/form/BaseFormField";
import { useResetPasswordMutation } from "@/services/endpoints/authApi";

type ResetPasswordValues = {
    password: string;
    confirmPassword: string;
};

export default function ResetPasswordPage() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const token = searchParams.get("token");
    const type = searchParams.get("type");

    const [showPassword, setShowPassword] = useState(false);
    const [isValidToken, setIsValidToken] = useState(true);

    const [resetPassword, { isLoading }] = useResetPasswordMutation();

    useEffect(() => {
        if (!token) {
            setIsValidToken(false);
            toast.error("Invalid or missing token");
        }
    }, [token]);

    const formik = useFormik<ResetPasswordValues>({
        initialValues: {
            password: "",
            confirmPassword: "",
        },
        onSubmit: async (values, { setSubmitting }) => {
            if (!token) return;

            if (values.password !== values.confirmPassword) {
                toast.error("Passwords do not match");
                return;
            }
            console.log("PAYLOAD:", {
                token,
                newPassword: values.password,
            });
            try {
                await resetPassword({
                    token,
                    newPassword: values.password,
                }).unwrap();

                toast.success(
                    type === "invite"
                        ? "Password set successfully"
                        : "Password reset successfully"
                );

                setTimeout(() => {
                    router.push("/login");
                }, 1500);

            } catch (err: any) {
                toast.error(
                    err?.data?.message ?? "Something went wrong"
                );
            } finally {
                setSubmitting(false);
            }
        },
    });

    if (!isValidToken) {
        return (
            <div className="w-full flex flex-col items-center justify-center pt-18 md:pt-30">
                <div className="w-full max-w-sm p-4 rounded-lg border text-center">
                    <h1 className="text-xl font-semibold mb-2">
                        Invalid link
                    </h1>
                    <p className="text-sm text-gray-500 mb-4">
                        This reset link is invalid or expired
                    </p>
                    <button
                        onClick={() => router.push("/forgot-password")}
                        className="w-full py-2.5 bg-[#2b251a] dark:bg-[#00004f] text-white rounded-lg"
                    >
                        Try again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full flex flex-col items-center justify-center pt-20 md:pt-30">

            <div className="w-full max-w-sm lg:max-w-md p-4 rounded-lg border border-gray-100 dark:border-blue-500/10 shadow-sm dark:shadow-lg dark:shadow-blue-500/10">

                <h1 className="text-xl md:text-2xl font-semibold text-center mb-6">
                    {type === "invite"
                        ? "Set your password"
                        : "Reset Password"}
                </h1>

                <form onSubmit={formik.handleSubmit} className="space-y-4">

                    <BaseFormField
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="New Password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        leftIcon={<Lock size={18} />}
                        rightIcon={
                            <button
                                type="button"
                                onClick={() =>
                                    setShowPassword((prev) => !prev)
                                }
                            >
                                {showPassword ? (
                                    <EyeOff size={18} />
                                ) : (
                                    <Eye size={18} />
                                )}
                            </button>
                        }
                    />

                    <BaseFormField
                        name="confirmPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        leftIcon={<Lock size={18} />}
                    />

                    <button
                        type="submit"
                        disabled={formik.isSubmitting || isLoading}
                        className="w-full py-3 bg-[#2b251a] dark:bg-[#00004f] text-white font-bold rounded-lg disabled:opacity-60"
                    >
                        {isLoading
                            ? "Processing..."
                            : type === "invite"
                                ? "Set Password"
                                : "Reset Password"}
                    </button>
                </form>
            </div>
        </div>
    );
}