"use client";

import {useState} from "react";
import {useFormik} from "formik";
import {useRouter} from "next/navigation";
import {toast} from "react-hot-toast";
import {Mail} from "lucide-react";
import BaseFormField from "@/components/form/BaseFormField";
import {useForgotPasswordMutation} from "@/services/endpoints/authApi";

type ForgotPasswordValues = {
    email: string;
};

export default function ForgotPasswordPage() {
    const router = useRouter();
    const [forgotPassword, {isLoading}] = useForgotPasswordMutation();

    const [isSubmitted, setIsSubmitted] = useState(false);

    const formik = useFormik<ForgotPasswordValues>({
        initialValues: {
            email: "",
        },
        onSubmit: async (values, {setSubmitting}) => {
            try {
                await forgotPassword({
                    email: values.email,
                }).unwrap();

                toast.success("Reset link sent to your email");
                setIsSubmitted(true);

            } catch (err: any) {
                toast.error(
                    err?.data?.message ?? "Something went wrong"
                );
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <div className="w-full flex flex-col items-center justify-center pt-18 md:pt-30">

            <div
                className="w-full max-w-sm lg:max-w-md p-4 rounded-lg border border-gray-100 dark:border-blue-500/10 shadow-sm dark:shadow-lg dark:shadow-blue-500/10">

                {!isSubmitted ? (
                    <>
                        <div className="flex flex-col items-center gap-2 mb-2">
                            <h1 className="text-lg sm:text-xl md:text-2xl font-semibold mt-3 text-center">
                                Forgot Password
                            </h1>
                        </div>


                        <p className="text-xs sm:text-sm text-center text-gray-600 dark:text-white mb-6 font-light">
                            Enter your email and we’ll send you a reset link
                        </p>

                        <form onSubmit={formik.handleSubmit} className="space-y-4">

                            <BaseFormField
                                name="email"
                                placeholder="Email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={
                                    formik.touched.email
                                        ? formik.errors.email
                                        : undefined
                                }
                                leftIcon={<Mail size={18}/>}
                            />

                            <button
                                type="submit"
                                disabled={formik.isSubmitting || isLoading}
                                className="w-full py-3 bg-[#2b251a] dark:bg-[#00004f] text-white font-bold rounded-lg disabled:opacity-60"
                            >
                                {isLoading || formik.isSubmitting
                                    ? "Sending..."
                                    : "Send Reset Link"}
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="flex flex-col items-center text-center">

                        <Mail size={28} className="mb-3"/>

                        <h1 className="text-lg sm:text-xl font-semibold mb-2">
                            Check your email
                        </h1>

                        <p className="text-sm text-gray-500 mb-2">
                            We’ve sent a password reset link to
                        </p>

                        <p className="font-medium mb-6 break-all">
                            {formik.values.email}
                        </p>

                        <button
                            onClick={() => router.push("/login")}
                            className="w-full py-3 bg-[#2b251a] dark:bg-[#00004f] text-white font-bold rounded-lg"
                        >
                            Back to Login
                        </button>
                    </div>
                )}

                {!isSubmitted && (
                    <p className="text-center text-sm mt-5">
                        Remember your password?{" "}
                        <button
                            onClick={() => router.push("/login")}
                            className="font-medium hover:underline"
                        >
                            Login
                        </button>
                    </p>
                )}
            </div>
        </div>
    );
}