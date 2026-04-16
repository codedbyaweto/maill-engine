"use client";

import {ReactNode} from "react";
import {useDispatch} from "react-redux";
import {logout} from "@/features/auth/authSlice";
import {useRouter} from "next/navigation";
import {ProtectedRoute} from "@/components/providers/protected-route";
import Image from "next/image";
import {ImgLinks} from "@/assets/assets";
import AppSideBar from "@/components/shared/AppSideBar";
import DashboardNavbar from "@/components/shared/DashboardNavbar";

const DashBoardLayout = ({children}: { children: ReactNode }) => {
    const dispatch = useDispatch();
    const router = useRouter();

    const handleLogout = () => {
        dispatch(logout());
        router.replace("/login");
    };

    return (
        // <ProtectedRoute>
    <>
        <AppSideBar/>
        <main className="w-full">
            <DashboardNavbar/>
            <div className="px-4">{children}</div>
        </main>
    </>
    // </ProtectedRoute>
)
    ;
};

export default DashBoardLayout;