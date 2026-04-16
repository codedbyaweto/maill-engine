'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Check, FileSpreadsheet } from 'lucide-react';

type PreviewRow = Record<string, string | number | boolean | null>;

interface PreviewStepProps {
  headers: string[];
  previewData: PreviewRow[];
  onBack: () => void;
  onConfirm: () => void;
}

export default function PreviewStep({ headers, previewData, onBack, onConfirm }: PreviewStepProps) {
  const listName = useSelector((state: RootState) => state.upload.listName);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Review Data</h2>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs font-medium px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">Step 2 of 4</span>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              List: <span className="font-semibold text-slate-800 dark:text-slate-200">{listName || "Untitled List"}</span>
            </p>
          </div>
        </div>
        <Button 
          variant="outline" 
          onClick={onBack} 
          className="cursor-pointer bg-yellow-400 hover:bg-yellow-500 dark:bg-[#00004f] text-black dark:text-white border-none"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Change File
        </Button>
      </div>

      <Card className="border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto max-h-112.5">
          <table className="w-full text-sm text-left border-collapse">
            <thead className="bg-slate-50 dark:bg-slate-800 sticky top-0 z-10">
              <tr>
                {headers.map((header, index) => (
                  <th 
                    key={index} 
                    className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-200 border-b border-slate-200 dark:border-slate-700 uppercase text-[11px] tracking-wider bg-slate-50 dark:bg-slate-800"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900">
              {previewData.length > 0 ? (
                previewData.slice(0, 5).map((row, rowIndex) => (
                  <tr key={rowIndex} className="hover:bg-blue-50/30 dark:hover:bg-slate-800/50 transition-colors">
                    {headers.map((header, colIndex) => (
                      <td key={colIndex} className="px-4 py-3 text-slate-600 dark:text-slate-400 whitespace-nowrap">
                        {String(row[header] ?? "")}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={headers.length} className="px-4 py-10 text-center text-slate-500 dark:text-slate-400 italic">
                    No data found in this file.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="space-y-4">
        <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
          <FileSpreadsheet className="h-3 w-3" />
          <span>Showing a sample of the first 5 rows.</span>
        </div>
        
        <Button 
          variant="yellow"
          className="w-full cursor-pointer h-12 text-black"
          onClick={onConfirm} 
        >
          <Check className="mr-2 h-5 w-5" /> Confirm and Map Fields
        </Button>
      </div>
    </div>
  );
}