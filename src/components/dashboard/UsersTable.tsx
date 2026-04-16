"use client";

import React from "react";
import { useGetUsersQuery } from "@/services/endpoints/teamApi";
import { UserTable } from "@/components/team/UserTable";
import { InviteMemberModal } from "@/components/team/InviteMemberModal";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function UserTableModule() {
    const { data: users = [], isLoading, error } = useGetUsersQuery();

    return (
        <Card className="rounded-2xl bg-transparent border-0 shadow-none">

            <CardHeader className="flex items-center justify-between gap-2">

                <div className="font-bold text-sm sm:text-lg truncate">
                    Users
                </div>

                <div className="flex-shrink-0">
                    <InviteMemberModal />
                </div>

            </CardHeader>

            <CardContent className="space-y-4">
                {error && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm">
                        {"status" in error
                            ? "Failed to fetch users: Session error"
                            : "An error occurred"}
                    </div>
                )}

                {isLoading ? (
                    <div className="text-sm text-foreground">
                        Loading users...
                    </div>
                ) : (
                    <UserTable users={users} isLoading={isLoading} />
                )}
            </CardContent>
        </Card>
    );
}