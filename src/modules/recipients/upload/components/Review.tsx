'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Loader2 } from 'lucide-react';

interface FinalReviewProps {
  totalCount: number;
  mapping: Record<string, string>;
  onBack: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export default function FinalReview({ 
  totalCount, 
  mapping, 
  onBack, 
  onSubmit, 
  isSubmitting 
}: FinalReviewProps) {
  const listName = useSelector((state: RootState) => state.upload.listName);

  return (
    <div className="space-y-6 text-center animate-in zoom-in-95 duration-300">
      <div className="py-4">
        <div className="h-20 w-20 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="h-12 w-12" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Ready to Import!</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-2">
          Please confirm your import settings below before we finalize.
        </p>
      </div>

      <Card className="p-6 text-left border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
        <div className="space-y-4">
          <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <span className="text-sm text-slate-500 dark:text-slate-400">Target List</span>
            <span className="font-bold text-slate-900 dark:text-white">
              {listName || "Untitled List"}
            </span>
          </div>
          
          <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <span className="text-sm text-slate-500 dark:text-slate-400">Total Contacts</span>
            <span className="font-bold text-slate-900 dark:text-white">
              {totalCount.toLocaleString()}
            </span>
          </div>

          <div>
            <span className="text-sm text-slate-500 dark:text-slate-400 mb-3 block">Field Mapping</span>
            <div className="flex flex-wrap gap-2">
              {Object.entries(mapping).map(([key, value]) => (
                <Badge 
                  key={key} 
                  variant="secondary" 
                  className="px-3 py-1.5 bg-slate-100 dark:bg-[#00004f] text-slate-700 dark:text-white border-none font-medium"
                >
                  <span className="capitalize opacity-70 mr-1">{key}</span> 
                  <span className="mx-1">→</span> 
                  <span>{value}</span>
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <div className="flex flex-col gap-3 pt-4">
        <Button 
          variant="yellow"
          disabled={isSubmitting}
          onClick={onSubmit}
          className="w-full h-14 font-bold text-lg cursor-pointer bg-yellow-400 hover:bg-yellow-500 text-black border-none"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Processing Import...
            </>
          ) : (
            "Start Import Now"
          )}
        </Button>
        
        <Button 
          variant="ghost" 
          onClick={onBack} 
          disabled={isSubmitting} 
          className="h-12 cursor-pointer text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
        >
          Go Back & Edit
        </Button>
      </div>
    </div>
  );
}