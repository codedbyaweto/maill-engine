'use client';

import React from 'react';
import { useGetUsersQuery } from '@/services/endpoints/teamApi';
import { UserTable } from '@/components/team/UserTable';
import { InviteMemberModal } from '@/components/team/InviteMemberModal';

export default function TeamModule() {
  const { data: users = [], isLoading, error } = useGetUsersQuery();

  return (
    <div className="p-6 lg:p-10 space-y-8 max-w-7xl mx-auto">
      
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-foreground">
            Team Management
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-200">
            Manage your team members, roles, and account permissions.
          </p>
        </div>
        
        <div className="flex gap-2">
          <InviteMemberModal />
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
          {"status" in error ? 'Failed to fetch team: Session error' : 'An error occurred'}
        </div>
      )}

      <UserTable users={users} isLoading={isLoading} />
    </div>
  );
}