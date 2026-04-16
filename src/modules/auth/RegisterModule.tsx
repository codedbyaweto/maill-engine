"use client";

import { useState } from "react";
import { useFormik } from "formik";
import { registerSchema } from "@/utils/schema/authSchema";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useRegisterMutation } from "@/services/endpoints/authApi";
import { Mail, EyeOff, Eye, Lock, User, Building, Briefcase} from "lucide-react";
import BaseFormField from "@/components/form/BaseFormField";

type RegisterFormValues = {
    name: string;
    email: string;
    password: string;
    companyName: string;
};

export default function RegisterModule() {
    const [register, { isLoading }] = useRegisterMutation();
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);

    const formik = useFormik<RegisterFormValues>({
        initialValues: {
            name: "",
            email: "",
            password: "",
            companyName: "",
        },
        validationSchema: registerSchema,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                await register(values).unwrap();

                toast.success("Verify your Email address");
                router.push(`/check-email?email=${values.email}`);
            } catch (err: any) {
                toast.error(err?.data?.message ?? "Registration failed");
            } finally {
                setSubmitting(false);
            }
        },
    });

    const getError = (name: keyof RegisterFormValues) =>
        formik.touched[name] ? formik.errors[name] : undefined;

    return (
        <div className="w-full flex flex-col items-center justify-center pt-18 md:pt-30">

            <div className="w-full max-w-sm lg:max-w-md p-4 lg:p-4 rounded-lg border border-gray-100 dark:border-blue-500/10 shadow-sm dark:shadow-lg dark:shadow-blue-500/10">

                <div className="flex flex-col items-center gap-2 mb-1">
                    <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-center">
                        Sign up for MailEngine
                    </h1>
                </div>

                <p className="text-xs sm:text-sm text-center text-gray-600 dark:text-white mb-6 font-light">
                    Create your account to get started
                </p>

                <form onSubmit={formik.handleSubmit} className="space-y-4">

                    <BaseFormField
                        name="name"
                        placeholder="Full name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={getError("name")}
                        leftIcon={<User />}
                    />

                    <BaseFormField
                        name="email"
                        placeholder="Email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={getError("email")}
                        leftIcon={<Mail size={18} />}
                    />

                    <BaseFormField
                        name="companyName"
                        placeholder="Company name"
                        value={formik.values.companyName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={getError("companyName")}
                        leftIcon={<Briefcase size={18} />}
                    />

                    <BaseFormField
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={getError("password")}
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
                        {isLoading ? "Creating..." : "Sign Up"}
                    </button>
                </form>

                <p className="text-center text-sm mt-3">
                    Already have an account?{" "}
                    <button
                        onClick={() => router.push("/login")}
                        className="font-medium hover:underline"
                    >
                        Login
                    </button>
                </p>
            </div>
        </div>
    );
}