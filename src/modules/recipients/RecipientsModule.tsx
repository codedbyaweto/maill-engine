"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Plus, Search, Filter, Download, MoreVertical, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetRecipientListsQuery, useDeleteRecipientListMutation } from "@/services/endpoints/recipientApi";

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

export default function RecipientsModule() {
  const { data, isLoading } = useGetRecipientListsQuery();
  const [deleteList] = useDeleteRecipientListMutation();

  const lists = Array.isArray(data)
    ? data
    : (data as unknown as RecipientApiResponse)?.content || [];

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(lists.length / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLists = lists.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Recipients
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-200">
            Manage your contact lists and view details.
          </p>
        </div>

        <div className="flex gap-2">
          <Link href="/recipients/upload">
            <Button variant="earth" className="cursor-pointer">
              <Plus className="mr-2 h-4 w-4" /> New Import
            </Button>
          </Link>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search by name or email..."
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" /> Filter by status
          </Button>
        </div>

        <div className="border rounded-lg bg-background overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-background border-b">
              <tr className="divide-x">
                <th className="px-6 py-3 font-medium text-foreground">
                  List Name
                </th>
                <th className="px-6 py-3 font-medium text-foreground">
                  Contacts
                </th>
                <th className="px-6 py-3 font-medium text-foreground">
                  Status
                </th>
                <th className="px-6 py-3 text-right">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {isLoading ? (
                <tr>
                  <td
                    colSpan={4}
                    className="py-10 text-center text-slate-500"
                  >
                    <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2" />
                    Loading lists...
                  </td>
                </tr>
              ) : currentLists.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="py-10 text-center text-slate-500"
                  >
                    No recipient lists found.
                  </td>
                </tr>
              ) : (
                currentLists.map((list: RecipientList) => (
                  <tr
                    key={list.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-foreground cursor-pointer">
                      {list.name}
                    </td>
                    <td className="px-6 py-4">
                      {list.recipientCount?.toLocaleString() || 0}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full text-xs font-medium">
                        {list.status || "Active"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4 mr-2" /> Export CSV
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteList(Number(list.id))}
                        >
                          <MoreVertical className="h-4 w-4 text-slate-400" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        
        <div className="px-6 py-4 bg-slate-50/50 dark:bg-transparent border-t border-slate-200 flex items-center justify-between">
          <p className="text-xs text-slate-500">
            Showing{" "}
            <span className="font-medium">
              {lists.length > 0 ? indexOfFirstItem + 1 : 0}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {Math.min(indexOfLastItem, lists.length)}
            </span>{" "}
            of{" "}
            <span className="font-medium">{lists.length}</span>
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
                onClick={() =>
                  setCurrentPage((prev) => Math.max(prev - 1, 1))
                }
                disabled={currentPage === 1}
              >
                Prev
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="h-8 px-3 text-[11px]"
                onClick={() =>
                  setCurrentPage((prev) =>
                    Math.min(prev + 1, totalPages)
                  )
                }
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}