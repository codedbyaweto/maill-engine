"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function CheckEmailModule() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const email = searchParams.get("email");

    const [isResending, setIsResending] = useState(false);

    const handleResend = async () => {
        try {
            setIsResending(true);

            console.log("Resending email to:", email);

            toast.success("Verification email sent again");
        } catch (err: any) {
            toast.error("Failed to resend email");
        } finally {
            setIsResending(false);
        }
    };

    return (
        <div className="w-full flex flex-col items-center justify-center pt-20 md:pt-32">

            <div className="w-full max-w-sm lg:max-w-md p-4 lg:p-4 rounded-lg border border-gray-100 dark:border-blue-500/10 shadow-sm dark:shadow-lg dark:shadow-blue-500/10">

                <div className="flex flex-col items-center text-center">

                    <div className="flex items-center gap-2 mt-2 mb-2">
                        <Mail size={28} />
                        <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-center">
                            Check your email
                        </h1>
                    </div>

                    <p className="text-xs sm:text-sm text-gray-600 dark:text-white mb-2 font-light">
                        We’ve sent a verification link to
                    </p>

                    <p className="font-medium mb-6 break-all text-sm sm:text-base">
                        {email || "your email address"}
                    </p>

                    <p className="text-xs sm:text-sm text-gray-500 mb-6 leading-relaxed">
                        Click the link in the email to verify your account.
                        If you didn’t receive it, you can resend below.
                    </p>

                    <button
                        onClick={handleResend}
                        disabled={isResending}
                        className="w-full py-3 bg-[#2b251a] dark:bg-[#00004f] text-white font-bold rounded-lg"
                    >
                        {isResending ? "Resending..." : "Resend Email"}
                    </button>

                    <button
                        onClick={() => router.push("/login")}
                        className="mt-4 text-sm hover:underline"
                    >
                        Back to Login
                    </button>
                </div>
            </div>
        </div>
    );
}