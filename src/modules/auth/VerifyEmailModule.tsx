"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useVerifyEmailMutation } from "@/services/endpoints/authApi";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import {useRef} from "react";
import { toast } from "react-hot-toast";

export default function VerifyEmailContent() {
    const token = useSearchParams().get("token");
    const router = useRouter();

    const [verifyEmail] = useVerifyEmailMutation();
    const [status, setStatus] = useState<"loading" | "error" | "success">("loading");

        // if (!token) {
        //     setStatus("error");
        //     return;
        // }
    const ran = useRef(false);

    useEffect(() => {
        if (!token) return;

        if (ran.current) return;
        ran.current = true;

        const run = async () => {
            try {
                await verifyEmail({ token }).unwrap();
                setStatus("success");
                toast.success("Email verified!");

                setTimeout(()=> {
                    router.push("/login");
                }, 2000);

            } catch (err) {
                setStatus("error");
                toast.error("Invalid or expired link");
            }
        };

        run();
    }, [token, verifyEmail]);


    return (
        <div className="w-full">

            <div className="w-full max-w-sm lg:max-w-md p-4 rounded-lg border border-gray-100 dark:border-blue-500/10 shadow-sm dark:shadow-lg dark:shadow-blue-500/10 text-center">

                {status === "loading" && (
                    <div className="flex flex-col items-center">
                        <Loader2 className="animate-spin mb-4" size={40} />
                        <h1 className="text-xl font-semibold mb-2">
                            Verifying your email...
                        </h1>
                        <p className="text-sm text-gray-500">
                            Please wait while we confirm your account
                        </p>
                    </div>
                )}

                {status === "success" && (
                    <div className="flex flex-col items-center">
                        <CheckCircle className="mb-4 text-green-500" size={40} />
                        <h1 className="text-xl font-semibold mb-2">
                            Email verified 🎉
                        </h1>
                        <p className="text-sm text-gray-500">
                            Redirecting to login...
                        </p>
                    </div>
                )}

                {status === "error" && (
                    <div className="flex flex-col items-center">
                        <XCircle className="mb-4 text-red-500" size={40} />
                        <h1 className="text-xl font-semibold mb-2">
                            Verification failed
                        </h1>
                        <p className="text-sm text-gray-500">
                            Link is invalid or expired
                        </p>
                    </div>
                )}

            </div>
        </div>
    );
}