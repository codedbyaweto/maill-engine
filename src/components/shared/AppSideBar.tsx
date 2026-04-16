"use client";

import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
    FaRegFileAlt,
    FaBullhorn,
    FaChartLine,
    FaUsers,
    FaAddressBook,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/features/auth/authSlice";

import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarSeparator,
} from "@/components/ui/sidebar";

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { ChevronUp, LogOut, Settings } from "lucide-react";
import { ImgLinks } from "@/assets/assets";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

import { rolePermissions } from "@/utils/types/permissions";

const items = [
    { id: 1, title: "Dashboard", url: "/dashboard", icon: MdDashboard, key: "dashboard" },
    { id: 2, title: "Templates", url: "/templates", icon: FaRegFileAlt, key: "templates" },
    { id: 3, title: "Campaigns", url: "/campaigns", icon: FaBullhorn, key: "campaigns" },
    { id: 4, title: "Analytics", url: "/analytics", icon: FaChartLine, key: "analytics" },
    { id: 5, title: "Recipients", url: "/recipients", icon: FaAddressBook, key: "recipients" },
    { id: 6, title: "Team", url: "/users", icon: FaUsers, key: "users" },
];

export default function AppSideBar() {
    const pathname = usePathname();
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    const user = useAppSelector((state) => state.auth.user);

    const role = user?.role;

    const filteredItems = useMemo(() => {
        if (!role) return [];

        const allowed = rolePermissions[role];

        return items.filter((item) => allowed.includes(item.key));
    }, [role]);

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem("token");
        router.push("/");
    };

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const logo = theme === "dark" ? ImgLinks.Logo2 : ImgLinks.Logo1;

    return (
        <Sidebar className="flex flex-col h-full border-r bg-background">

            <SidebarHeader className="px-4 mb-4 mt-3">
                <div className="flex items-center">
                    <p className="text-lg font-semibold tracking-tight">MailEngine</p>
                    <Image src={logo} alt="Logo" width={40} height={40} />
                </div>
            </SidebarHeader>

            <SidebarContent className="flex-1 px-2 mt-14">
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu className="space-y-1">
                            {filteredItems.map((item, index) => {
                                const isActive = pathname === item.url;

                                return (
                                    <React.Fragment key={item.id}>
                                        <SidebarMenuItem>
                                            <Link href={item.url} className="block">
                                                <SidebarMenuButton
                                                    className={cn(
                                                        "flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-all",
                                                        isActive &&
                                                        "bg-yellow-400 dark:bg-[#00004f] dark:text-white font-medium shadow-sm border"
                                                    )}
                                                >
                                                    <item.icon className="w-4 h-4" />
                                                    <span>{item.title}</span>
                                                </SidebarMenuButton>
                                            </Link>
                                        </SidebarMenuItem>

                                        {index !== filteredItems.length - 1 && (
                                            <SidebarSeparator className="my-1 opacity-40" />
                                        )}
                                    </React.Fragment>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="p-3 mt-6">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton className="flex items-center gap-3 rounded-xl px-3 py-2 cursor-default hover:bg-transparent focus:bg-transparent active:bg-transparent focus-visible:ring-0 focus-visible:outline-none">
                                    <div className="flex flex-col items-start">
                                        <span className="text-sm font-medium">
                                            {user?.name}
                                        </span>
                                        <span className="text-xs text-muted-foreground">
                                            {user?.role}
                                        </span>
                                    </div>
                                    <ChevronUp className="ml-auto w-4 h-4" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuItem>
                                    <Settings className="mr-2 w-4 h-4" />
                                    Settings
                                </DropdownMenuItem>

                                <DropdownMenuItem
                                    onClick={handleLogout}
                                    className="text-red-500"
                                >
                                    <LogOut className="mr-2 w-4 h-4" />
                                    Log Out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}