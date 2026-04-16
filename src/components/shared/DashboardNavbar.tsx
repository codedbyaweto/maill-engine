"use client";

import * as React from "react";
import {
    LogOut,
    Moon,
    Settings,
    Sun,
    User,
    BellIcon,
    MailIcon,
    MessageSquareIcon
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuCheckboxItem,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import {SidebarTrigger} from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { logout } from "@/features/auth/authSlice";

export default function DashboardNavbar() {
    const [notifications, setNotifications] = React.useState({
        email: true,
        sms: false,
        push: true
    });

    const { setTheme } = useTheme();
    const router = useRouter();
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem("token");
        router.push("/");
    };

    return (
        <nav className="w-full h-16 flex items-center justify-between px-6 bg-background border-b border-muted">
            <SidebarTrigger />

            <div className="flex items-center gap-3">

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon">
                            <Sun className="h-4 w-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                            <Moon className="absolute h-4 w-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                            <span className="sr-only">Toggle theme</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-36">
                        <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon">
                            <BellIcon className="h-4 w-4" />
                            <span className="sr-only">Notifications</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-52">
                        <DropdownMenuGroup>
                            <DropdownMenuLabel>Notification Preferences</DropdownMenuLabel>
                            <DropdownMenuCheckboxItem
                                checked={notifications.email}
                                onCheckedChange={(checked) =>
                                    setNotifications({ ...notifications, email: checked})
                                }
                            >
                                <MailIcon className="w-4 h-4 mr-2" />
                                Email notifications
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem
                                checked={notifications.sms}
                                onCheckedChange={(checked) =>
                                    setNotifications({ ...notifications, sms: checked})
                                }
                            >
                                <MessageSquareIcon className="w-4 h-4 mr-2" />
                                SMS notifications
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem
                                checked={notifications.push}
                                onCheckedChange={(checked) =>
                                    setNotifications({ ...notifications, push: checked })
                                }
                            >
                                <BellIcon className="w-4 h-4 mr-2" />
                                Push notifications
                            </DropdownMenuCheckboxItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="p-0">
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuGroup>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <User className="mr-2 w-4 h-4" />
                                Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Settings className="mr-2 w-4 h-4" />
                                Settings
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={handleLogout} variant="destructive">
                                <LogOut className="mr-2 w-4 h-4" />
                                Logout
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </nav>
    );
}