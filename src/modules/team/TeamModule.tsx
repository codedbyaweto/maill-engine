'use client';

import React from 'react';
import { useGetUsersQuery } from '@/services/endpoints/teamApi';
import { UserTable } from '@/components/team/UserTable';
import { InviteMemberModal } from '@/components/team/InviteMemberModal';

function Skeleton({ className }: { className: string }) {
  return (
      <div className={`animate-pulse bg-slate-200 dark:bg-slate-800 rounded ${className}`} />
  );
}

export default function TeamModule() {
  const { data: users = [], isLoading, error } = useGetUsersQuery();

  return (
      <div className="p-6 lg:p-10 space-y-8 max-w-7xl mx-auto">

        <div className="flex justify-between items-start">

          <div className="space-y-2">
            {isLoading ? (
                <>
                  <Skeleton className="h-6 w-48" />
                  <Skeleton className="h-4 w-72" />
                </>
            ) : (
                <>
                  <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-foreground">
                    Team Management
                  </h1>
                  <p className="text-sm text-slate-500 dark:text-slate-200">
                    Manage your team members, roles, and account permissions.
                  </p>
                </>
            )}
          </div>

          <div>
            {isLoading ? (
                <Skeleton className="h-10 w-36" />
            ) : (
                <InviteMemberModal />
            )}
          </div>
        </div>

        {error && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
              {"status" in error ? 'Failed to fetch team: Session error' : 'An error occurred'}
            </div>
        )}

        {isLoading ? (
            <div className="space-y-3">
              <div className="border rounded-lg overflow-hidden">
                <div className="p-4 border-b flex gap-4">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-4 w-20 ml-auto" />
                </div>

                {Array.from({ length: 6 }).map((_, i) => (
                    <div
                        key={i}
                        className="p-4 flex items-center justify-between border-b"
                    >
                      <div className="flex gap-3 items-center">
                        <Skeleton className="h-9 w-9 rounded-full" />
                        <div className="space-y-2">
                          <Skeleton className="h-3 w-40" />
                          <Skeleton className="h-3 w-24" />
                        </div>
                      </div>

                      <Skeleton className="h-6 w-20" />
                    </div>
                ))}
              </div>
            </div>
        ) : (
            <UserTable users={users} isLoading={isLoading} />
        )}

      </div>
  );
}