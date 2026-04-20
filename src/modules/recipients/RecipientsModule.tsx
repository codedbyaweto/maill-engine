"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  Filter,
  Download,
  MoreVertical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  useGetRecipientListsQuery,
  useDeleteRecipientListMutation,
} from "@/services/endpoints/recipientApi";

export interface RecipientList {
  id: string | number;
  name: string;
  recipientCount?: number;
  status?: string;
}

interface RecipientApiResponse {
  content: RecipientList[];
  totalElements?: number;
}

function Skeleton({ className }: { className: string }) {
  return (
      <div className={`animate-pulse bg-slate-200 dark:bg-slate-800 rounded ${className}`} />
  );
}

function TableSkeleton() {
  return (
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b">
          <tr>
            <th className="px-6 py-3"><Skeleton className="h-4 w-24" /></th>
            <th className="px-6 py-3"><Skeleton className="h-4 w-20" /></th>
            <th className="px-6 py-3"><Skeleton className="h-4 w-16" /></th>
            <th className="px-6 py-3 text-right"><Skeleton className="h-4 w-16 ml-auto" /></th>
          </tr>
          </thead>

          <tbody>
          {Array.from({ length: 6 }).map((_, i) => (
              <tr key={i} className="border-b">
                <td className="px-6 py-4">
                  <Skeleton className="h-4 w-40" />
                </td>
                <td className="px-6 py-4">
                  <Skeleton className="h-4 w-10" />
                </td>
                <td className="px-6 py-4">
                  <Skeleton className="h-5 w-16 rounded-full" />
                </td>
                <td className="px-6 py-4 flex justify-end gap-2">
                  <Skeleton className="h-8 w-24" />
                  <Skeleton className="h-8 w-8 rounded" />
                </td>
              </tr>
          ))}
          </tbody>
        </table>
      </div>
  );
}

export default function RecipientsModule() {
  const { data, isLoading } = useGetRecipientListsQuery();
  const [deleteList] = useDeleteRecipientListMutation();

  const lists = Array.isArray(data)
      ? data
      : (data as unknown as RecipientApiResponse)?.content || [];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(lists.length / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLists = lists.slice(indexOfFirstItem, indexOfLastItem);

  return (
      <div className="p-6 space-y-6">

        <div className="flex justify-between items-center">
          <div className="space-y-2">
            {isLoading ? (
                <>
                  <Skeleton className="h-6 w-40" />
                  <Skeleton className="h-4 w-64" />
                </>
            ) : (
                <>
                  <h1 className="text-2xl font-bold">Recipients</h1>
                  <p className="text-sm text-slate-500">
                    Manage your contact lists and view details.
                  </p>
                </>
            )}
          </div>

          <div>
            {isLoading ? (
                <Skeleton className="h-10 w-32" />
            ) : (
                <Link href="/recipients/upload">
                  <Button variant="earth">
                    <Plus className="mr-2 h-4 w-4" />
                    New Import
                  </Button>
                </Link>
            )}
          </div>
        </div>

        <div className="space-y-4">

          <div className="flex gap-4 items-center">
            {isLoading ? (
                <>
                  <Skeleton className="h-10 flex-1" />
                  <Skeleton className="h-10 w-36" />
                </>
            ) : (
                <>
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input placeholder="Search..." className="pl-10" />
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" /> Filter
                  </Button>
                </>
            )}
          </div>

          {isLoading ? (
              <TableSkeleton />
          ) : (
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="border-b">
                  <tr>
                    <th className="px-6 py-3">List Name</th>
                    <th className="px-6 py-3">Contacts</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3 text-right">Action</th>
                  </tr>
                  </thead>

                  <tbody className="divide-y">
                  {currentLists.map((list: RecipientList) => (
                      <tr key={list.id}>
                        <td className="px-6 py-4 font-medium">
                          {list.name}
                        </td>
                        <td className="px-6 py-4">
                          {list.recipientCount ?? 0}
                        </td>
                        <td className="px-6 py-4">
                                        <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-700">
                                            {list.status || "Active"}
                                        </span>
                        </td>
                        <td className="px-6 py-4 text-right flex justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Export
                          </Button>
                          <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => deleteList(Number(list.id))}
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                  ))}
                  </tbody>
                </table>
              </div>
          )}

          {isLoading ? (
              <div className="flex justify-between items-center pt-4">
                <Skeleton className="h-4 w-48" />
                <div className="flex gap-2">
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-8 w-16" />
                </div>
              </div>
          ) : (
              <div className="px-2 py-4 flex items-center justify-between border-t">
                <p className="text-xs text-slate-500">
                  Page {currentPage} of {totalPages}
                </p>

                <div className="flex gap-2">
                  <Button
                      size="sm"
                      variant="outline"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                  >
                    Prev
                  </Button>
                  <Button
                      size="sm"
                      variant="outline"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                  >
                    Next
                  </Button>
                </div>
              </div>
          )}
        </div>
      </div>
  );
}