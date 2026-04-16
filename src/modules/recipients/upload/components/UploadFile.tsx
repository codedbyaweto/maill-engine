'use client';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setGlobalListName } from '@/lib/UploadSlice';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, FileText, AlertCircle, FileDown } from 'lucide-react';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';

type PreviewRow = Record<string, string | number | boolean | null>;

interface UploadProps {
  onNext: (name: string, file: File, headers: string[], preview: PreviewRow[]) => void;
}

export default function UploadFile({ onNext }: UploadProps) {
  const dispatch = useDispatch();
  const [listName, setListName] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const downloadTemplate = () => {
    const headers = ["Email (Required)", "First Name", "Last Name", "Other Name", "Phone Number"];
    const csvContent = "data:text/csv;charset=utf-8," + headers.join(",");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "recipient_template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setError(null);
    }
  };

  const processAndContinue = () => {
    const trimmedName = listName.trim();
    
    if (!trimmedName || !selectedFile) {
      setError('Please provide both a list name and a file.');
      return;
    }

    dispatch(setGlobalListName(trimmedName));

    const file = selectedFile;
    const isExcel = file.name.endsWith('.xlsx') || file.name.endsWith('.xls');

    if (isExcel) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const json = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: "" }) as (string | number)[][];
        
        if (json.length === 0) {
          setError("The uploaded file appears to be empty.");
          return;
        }

        const headers = json[0].map(String);
        const allRows: PreviewRow[] = json.slice(1).map((row) => 
          headers.reduce((acc, h, i) => ({ ...acc, [h]: row[i] ?? "" }), {} as PreviewRow)
        );
        
        onNext(trimmedName, file, headers, allRows);
      };
      reader.readAsBinaryString(file);
    } else {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results: Papa.ParseResult<PreviewRow>) => {
          if (results.data.length === 0) {
            setError("The CSV file appears to be empty.");
            return;
          }
          onNext(trimmedName, file, results.meta.fields || [], results.data);
        },
      });
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Upload File</h2>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs font-medium px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">Step 1 of 4</span>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="listName" className="text-slate-700 dark:text-slate-400 font-semibold">List Name</Label>
          <Input 
            id="listName"
            placeholder="e.g., Summer Newsletter 2026"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            className="h-12 border-slate-200 focus:border-yellow-400 focus:ring-yellow-400"
          />
        </div>

        <div className="grid gap-2">
          <div className="flex justify-between items-center">
            <Label className="text-slate-700 font-semibold dark:text-slate-400">Upload Contact File</Label>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={downloadTemplate}
              className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 dark:bg-[#00004f] text-black dark:text-white border-none transition-all cursor-pointer shadow-sm h-9">
              <FileDown className="h-4 w-4" />
              Get Template
            </Button>
          </div>

          <div className="relative group">
            <input
              id="file-upload"
              type="file"
              accept=".csv, .xlsx, .xls"
              onChange={handleFileChange}
              aria-label="Upload recipient file"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div className={`border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center transition-all 
              ${selectedFile ? 'border-green-400 bg-green-50/30' : 'border-slate-200 group-hover:border-yellow-400 bg-slate-50'}`}>
              {selectedFile ? (
                <>
                  <FileText className="h-10 w-10 text-green-500 mb-2" />
                  <p className="text-sm font-medium text-slate-900">{selectedFile.name}</p>
                  <p className="text-xs text-slate-500 mt-1">Click to replace file</p>
                </>
              ) : (
                <>
                  <Upload className="h-10 w-10 text-slate-400 mb-2 group-hover:text-yellow-500" />
                  <p className="text-sm font-medium text-slate-600">Click or drag file to upload</p>
                  <p className="text-xs text-slate-400 mt-1">Supports CSV and Excel files</p>
                </>
              )}
            </div>
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 p-3 rounded-lg border border-red-100">
            <AlertCircle className="h-4 w-4" />
            <p>{error}</p>
          </div>
        )}
      </div>

      <Button 
      variant="yellow"
        onClick={processAndContinue}
        className="w-full h-14 text-lg font-bold rounded-xl transition-all active:scale-[0.98] shadow-sm cursor-pointer border-none">
        Continue to Preview
      </Button>
    </div>
  );
}