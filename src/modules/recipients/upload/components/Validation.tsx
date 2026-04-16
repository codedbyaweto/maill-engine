'use client';

import React, { useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertCircle, CheckCircle2, XCircle, ArrowLeft } from 'lucide-react';

type PreviewRow = Record<string, string | number | boolean | null>;

interface ValidationStepProps {
  data: PreviewRow[];
  mapping: Record<string, string>;
  onBack: () => void;
  onConfirm: (validData: PreviewRow[]) => void;
}

export default function ValidationStep({ data, mapping, onBack, onConfirm }: ValidationStepProps) {
  
  const validationResults = useMemo(() => {
    const emailKey = mapping['email'];
    const valid: PreviewRow[] = [];
    const invalid: Array<{ row: number; reason: string }> = [];

    if (!emailKey) return { valid: [], invalid: [{ row: 0, reason: "No email column mapped" }] };

    data.forEach((row, index) => {
      const email = String(row[emailKey] || '').trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!email) {
        invalid.push({ row: index + 1, reason: "Missing email address" });
      } else if (!emailRegex.test(email)) {
        invalid.push({ row: index + 1, reason: "Malformed email format" });
      } else {
        valid.push(row);
      }
    });

    return { valid, invalid };
  }, [data, mapping]);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="border-b pb-4 dark:border-slate-800">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Review Data Quality</h2>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs font-medium px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">Step 4 of 4</span>
          <p className="text-sm text-slate-500 dark:text-slate-400">Checking rows for format errors.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 border-l-4 border-l-green-500 bg-green-50/20 dark:bg-green-900/10 border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
            <span className="text-2xl font-bold text-green-700 dark:text-green-400">
              {validationResults.valid.length}
            </span>
          </div>
          <p className="text-[10px] text-green-600 dark:text-green-500 font-bold mt-1 uppercase tracking-wider">Valid Rows</p>
        </Card>
        
        <Card className="p-4 border-l-4 border-l-amber-500 bg-amber-50/20 dark:bg-amber-900/10 border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            <span className="text-2xl font-bold text-amber-700 dark:text-amber-400">
              {validationResults.invalid.length}
            </span>
          </div>
          <p className="text-[10px] text-amber-600 dark:text-amber-500 font-bold mt-1 uppercase tracking-wider">Rows to Skip</p>
        </Card>
      </div>

      {validationResults.invalid.length > 0 && (
        <div className="max-h-48 overflow-y-auto border border-slate-200 dark:border-slate-800 rounded-lg p-4 bg-slate-50/50 dark:bg-slate-900/50 space-y-2">
          <p className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-tight">Errors found in file:</p>
          {validationResults.invalid.map((err, i) => (
            <div key={i} className="flex items-center gap-2 text-[11px] text-red-600 dark:text-red-400 bg-white dark:bg-slate-900 p-2 rounded border border-red-50 dark:border-red-900/30">
              <XCircle className="h-3 w-3 shrink-0" />
              <span>Row {err.row}: {err.reason}</span>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <Button variant="outline" onClick={onBack} className="flex-1 h-12 cursor-pointer order-2 sm:order-1">
          <ArrowLeft className="mr-2 h-4 w-4" /> Re-map Fields
        </Button>
        <Button 
          variant="yellow"
          className="flex-2 h-12 shadow-sm cursor-pointer text-black order-1 sm:order-2"
          disabled={validationResults.valid.length === 0}
          onClick={() => onConfirm(validationResults.valid)}
        >
          Continue with {validationResults.valid.length} Valid Users
        </Button>
      </div>
    </div>
  );
}