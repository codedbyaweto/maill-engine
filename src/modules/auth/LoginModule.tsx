"use client";

import { useFormik } from "formik";
import { LoginSchema } from "@/utils/schema/authSchema";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useAppDispatch } from "@/store/hooks";
import { setCredentials } from "@/features/auth/authSlice";
import { useLoginMutation } from "@/services/endpoints/authApi";
import { Mail, Eye, EyeOff, Lock } from "lucide-react";
import { ErrorHandler } from "@/services/httpClient/errorHandler";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ImgLinks } from "@/assets/assets";
import BaseFormField from "@/components/form/BaseFormField";
import { useTheme } from "next-themes";

type FormValues = {
    email: string;
    password: string;
};

const LoginModule = () => {
    const [login, { isLoading }] = useLoginMutation();
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);

    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const logo =
        mounted && theme === "dark"
            ? ImgLinks.Logo2
            : ImgLinks.Logo1;

    const formik = useFormik<FormValues>({
        initialValues: { email: "", password: "" },
        validationSchema: LoginSchema,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                const res = await login({
                    email: values.email,
                    password: values.password,
                }).unwrap();

                dispatch(setCredentials(res));
                router.push("/dashboard");
                toast.success("Login successful 🎉");
            } catch (err: any) {
                toast.error(
                    ErrorHandler.extractMessage(err) ?? "Invalid credentials"
                );
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <div className="w-full flex flex-col items-center justify-center pt-18 md:pt-30">

            <div className="w-full max-w-sm lg:max-w-md p-4 lg:p-4 rounded-lg border border-gray-100 dark:border-blue-500/10 shadow-sm dark:shadow-lg dark:shadow-blue-500/10">

                <div className="flex items-center justify-center">
                    <h1 className="text-lg sm:text-xl md:text-2xl font-semibold">
                        Welcome Back
                    </h1>
                </div>

                <p className="text-xs sm:text-sm text-center text-gray-600 dark:text-white mb-4 font-light">
                    Enter your details to access your account
                </p>

                <form onSubmit={formik.handleSubmit} className="space-y-4">

                    <BaseFormField
                        name="email"
                        placeholder="Email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.email ? formik.errors.email : ""}
                        leftIcon={<Mail size={20} />}
                    />

                    <BaseFormField
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.password ? formik.errors.password : ""}
                        leftIcon={<Lock size={18} />}
                        rightIcon={
                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        }
                    />

                    <button
                        type="submit"
                        disabled={formik.isSubmitting || isLoading}
                        className="w-full py-3 bg-[#2b251a] dark:bg-[#00004f] dark:text-white text-background font-bold rounded-lg"
                    >
                        {isLoading ? "Signing in..." : "Login"}
                    </button>
                </form>

                <div className="flex justify-end">
                    <button
                        type="button"
                        onClick={() => router.push("/forgot-password")}
                        className="text-sm hover:underline mt-2"
                    >
                        Forgot Password?
                    </button>
                </div>
            </div>

            <p className="text-center font-extralight mt-4 text-[12px]">
                By clicking continue you agree with our{" "}
                <a href="#" className="underline">
                    Terms of Service and Privacy Policy
                </a>
            </p>
        </div>
    );
};

export default LoginModule;





