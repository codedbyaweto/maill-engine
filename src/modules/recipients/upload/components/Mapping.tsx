'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';

const SYSTEM_FIELDS = [
  { id: 'email', label: 'Email Address', required: true },
  { id: 'firstName', label: 'First Name', required: false },
  { id: 'lastName', label: 'Last Name', required: false },
  { id: 'phone', label: 'Phone Number', required: false },
];

interface MappingProps {
  fileHeaders: string[];
  onBack: () => void;
  onConfirm: (mapping: Record<string, string>) => void;
}

export default function Mapping({ fileHeaders, onBack, onConfirm }: MappingProps) {
  const [mapping, setMapping] = useState<Record<string, string>>(() => {
    const initialMapping: Record<string, string> = {};
    SYSTEM_FIELDS.forEach(field => {
      const match = fileHeaders.find(h => 
        h.toLowerCase().replace(/\s/g, '') === field.id.toLowerCase()
      );
      if (match) initialMapping[field.id] = match;
    });
    return initialMapping;
  });

  const handleSelect = (fieldId: string, value: string) => {
    setMapping(prev => ({ ...prev, [fieldId]: value }));
  };

  const isEmailMapped = !!mapping['email'];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="border-b pb-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Map your columns</h2>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs font-medium px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">Step 3 of 4</span>
        </div>
      </div>

      <div className="grid gap-4">
        {SYSTEM_FIELDS.map((field) => (
          <Card key={field.id} className={`p-4 border-l-4 transition-all ${mapping[field.id] ? 'border-l-green-500' : 'border-l-slate-200 dark:border-l-slate-700'}`}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {mapping[field.id] ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                ) : (
                  <AlertCircle className={`h-5 w-5 ${field.required ? 'text-amber-500' : 'text-slate-300'}`} />
                )}
                <div>
                  <p className="text-sm font-semibold dark:text-slate-200">
                    {field.label} {field.required && <span className="text-red-500">*</span>}
                  </p>
                </div>
              </div>

              <div className="w-full md:w-64">
                <Select value={mapping[field.id] || ""} onValueChange={(val) => handleSelect(field.id, val)}>
                  <SelectTrigger className="cursor-pointer bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700">
                    <SelectValue placeholder="Select a column..." />
                  </SelectTrigger>
                  <SelectContent>
                    {fileHeaders.map((header) => {
                      const isAlreadyMapped = Object.values(mapping).includes(header) && mapping[field.id] !== header;
                      return (
                        <SelectItem
                          key={header} 
                          value={header}
                          disabled={isAlreadyMapped}
                        >
                          {header} {isAlreadyMapped && "(Mapped)"}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <Button variant="outline" onClick={onBack} className="flex-1 cursor-pointer order-2 sm:order-1 h-12">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button 
          variant="yellow"
          className="flex-2 cursor-pointer order-1 sm:order-2 h-12 text-black" 
          disabled={!isEmailMapped}
          onClick={() => onConfirm(mapping)}
        >
          Proceed to Review
        </Button>
      </div>
      {!isEmailMapped && (
        <p className="text-center text-xs text-amber-600 font-medium italic">
          * Email mapping is required to proceed.
        </p>
      )}
    </div>
  );
}