"use client";

import React, { useState } from 'react';
import { Pencil, Eye, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserTableSkeleton } from './UserTableSkeleton';

interface User {
  id: string | number;
  name: string;
  email: string;
  role: string;
  status: string;
  created?: string;
}

interface UserTableProps {
  users: User[];
  isLoading: boolean;
  onDelete?: (id: string | number) => void;
}

export function UserTable({ users, isLoading, onDelete }: UserTableProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(users.length / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);

  const getInitials = (name: string): string =>
      name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : '??';

  if (isLoading) {
    return <UserTableSkeleton />;
  }

  return (
      <div className="space-y-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="relative flex-1 min-w-75">
            <Input placeholder="Search by name or email..." className="pl-10" />
          </div>
          <Button variant="outline" size="sm" className="h-10">
            Filter Roles
          </Button>
        </div>

        <div className="border rounded-xl shadow-sm overflow-hidden min-h-100">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
              </thead>

              <tbody>
              {currentUsers.length > 0 ? (
                  currentUsers.map((user) => (
                      <tr key={user.id} className="border-t">
                        <td className="px-6 py-4 flex items-center gap-3">
                          <div className="h-9 w-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs">
                            {getInitials(user.name)}
                          </div>
                          {user.name}
                        </td>

                        <td className="px-6 py-4">{user.email}</td>
                        <td className="px-6 py-4 capitalize">{user.role.toLowerCase()}</td>

                        <td className="px-6 py-4">
                      <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
                        {user.status || 'ACTIVE'}
                      </span>
                        </td>

                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-1">
                            <Button variant="ghost" size="icon">
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => onDelete?.(user.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                  ))
              ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-20 text-center text-slate-500">
                      No team members found.
                    </td>
                  </tr>
              )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
  );
}