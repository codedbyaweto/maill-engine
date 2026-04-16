"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUploadRecipientsMutation, useCreateRecipientListMutation } from "@/services/endpoints/recipientApi";

import UploadFile from "./components/UploadFile";
import PreviewStep from "./components/Preview";
import Mapping from "./components/Mapping";
import ValidationStep from "./components/Validation";
import FinalReview from "./components/Review";

type PreviewRow = Record<string, string | number | boolean | null>;

interface UploadDataState {
  headers: string[];
  preview: PreviewRow[];
  file: File;
  listName: string;
}

export default function UploadRecipientModule() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);

  const [createRecipientList] = useCreateRecipientListMutation();
  const [uploadRecipients, { isLoading: isUploading }] =
    useUploadRecipientsMutation();

  const [uploadData, setUploadData] = useState<UploadDataState | null>(null);
  const [mapping, setMapping] = useState<Record<string, string>>({});
  const [validData, setValidData] = useState<PreviewRow[]>([]);

  const handleStepOneComplete = (
    name: string,
    file: File,
    headers: string[],
    preview: PreviewRow[]
  ) => {
    setUploadData({ listName: name, file, headers, preview });
    setCurrentStep(2);
  };

  const handleFinalSubmit = async () => {
    if (!uploadData) return;

    try {
      const response = await createRecipientList({
        name: uploadData.listName,
      }).unwrap();

      const listId = response.id;

      await uploadRecipients({
        listId,
        file: uploadData.file,
      }).unwrap();

      alert("Success! Your mailing list has been imported.");
      router.push("/recipients");
    } catch (err: unknown) {
      console.error("FULL ERROR:", err);

      let errorMsg = "Something went wrong during the import.";

      if (typeof err === "object" && err !== null && "data" in err) {
        const e = err as {
          data?: { message?: string; error?: string };
        };

        errorMsg =
          e.data?.message ||
          e.data?.error ||
          errorMsg;
      }

      alert(errorMsg);
    }
  };

  return (
    <div className="p-6 lg:p-10 space-y-8 max-w-6xl mx-auto">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold text-black dark:text-white">
          Import Recipients
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-300">
          Upload and map your contact list to start a new campaign.
        </p>
      </div>

      <div className="flex justify-center w-full">
        <div className="w-full max-w-4xl bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 p-8 md:p-12">
          
          {currentStep === 1 && (
            <UploadFile onNext={handleStepOneComplete} />
          )}

          {currentStep === 2 && uploadData && (
            <PreviewStep
              headers={uploadData.headers}
              previewData={uploadData.preview}
              onBack={() => setCurrentStep(1)}
              onConfirm={() => setCurrentStep(3)}
            />
          )}

          {currentStep === 3 && uploadData && (
            <Mapping
              fileHeaders={uploadData.headers}
              onBack={() => setCurrentStep(2)}
              onConfirm={(m) => {
                setMapping(m);
                setCurrentStep(4);
              }}
            />
          )}

          {currentStep === 4 && uploadData && (
            <ValidationStep
              data={uploadData.preview}
              mapping={mapping}
              onBack={() => setCurrentStep(3)}
              onConfirm={(d) => {
                setValidData(d);
                setCurrentStep(5);
              }}
            />
          )}

          {currentStep === 5 && (
            <FinalReview
              totalCount={validData.length}
              mapping={mapping}
              onBack={() => setCurrentStep(4)}
              onSubmit={handleFinalSubmit}
              isSubmitting={isUploading}
            />
          )}
        </div>
      </div>
    </div>
  );
}