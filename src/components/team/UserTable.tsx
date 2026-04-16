'use client';

import React, { useState } from 'react';
import { Pencil, Eye, Trash2, Loader2, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 items-center">
        <div className="relative flex-1 min-w-75">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input placeholder="Search by name or email..." className="pl-10" />
        </div>
        <Button variant="outline" size="sm" className="h-10">
          <Filter className="mr-2 h-4 w-4" /> Filter Roles
        </Button>
      </div>

      <div className="border rounded-xl shadow-sm overflow-hidden min-h-100">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-64 space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
            <p className="text-sm text-slate-500">Fetching team members...</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 font-semibold uppercase text-[11px] tracking-wider text-slate-500">Name</th>
                    <th className="px-6 py-4 font-semibold uppercase text-[11px] tracking-wider text-slate-500">Email</th>
                    <th className="px-6 py-4 font-semibold uppercase text-[11px] tracking-wider text-slate-500">Role</th>
                    <th className="px-6 py-4 font-semibold uppercase text-[11px] tracking-wider text-slate-500">Status</th>
                    <th className="px-6 py-4 text-right font-semibold uppercase text-[11px] tracking-wider text-slate-500">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {currentUsers.length > 0 ? (
                    currentUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="h-9 w-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-xs text-slate-600 dark:text-slate-400">
                              {getInitials(user.name)}
                            </div>
                            <div className="font-medium text-foreground">{user.name}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                          {user.email}
                        </td>
                        <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                          <span className="capitalize">{user.role.toLowerCase()}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold border bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800">
                            {user.status || 'ACTIVE'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-blue-600">
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-600">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 text-slate-400 hover:text-red-500"
                              onClick={() => onDelete?.(user.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>

                      <td colSpan={6} className="px-6 py-20 text-center text-slate-500">
                        No team members found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="px-6 py-4 bg-slate-50/50 dark:bg-transparent border-t border-slate-200 flex items-center justify-between">
              <p className="text-xs text-slate-500">
                Showing <span className="font-medium">{users.length > 0 ? indexOfFirstItem + 1 : 0}</span> to 
                <span className="font-medium"> {Math.min(indexOfLastItem, users.length)}</span> of 
                <span className="font-medium"> {users.length}</span>
              </p>
              <div className="flex items-center gap-4">
                <div className="text-xs text-slate-500">
                   Page {currentPage} of {totalPages}
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-8 px-3 text-[11px]"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-8 px-3 text-[11px]"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}