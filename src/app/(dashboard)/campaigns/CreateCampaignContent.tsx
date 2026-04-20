// "use client";
//
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { CheckCircle2, ChevronRight } from "lucide-react";
// import { useCreateCampaignMutation, useScheduleCampaignMutation, useSendCampaignMutation, } from "@/services/endpoints/campaignApi";
// import StepDetails from "@/modules/campaigns/steps/StepDetails";
// import StepTemplate from "@/modules/campaigns/steps/StepTemplate";
// import StepRecipients from "@/modules/campaigns/steps/StepRecipients";
// import StepReview from "@/modules/campaigns/steps/StepReview";
// import StepSend from "@/modules/campaigns/steps/StepSend";
//
// export const campaignSchema = z.object({
//     name: z.string().min(1, "Campaign name is required"),
//     subjectLine: z.string().min(1, "Subject line is required"),
//     fromName: z.string().min(1, "From name is required"),
//     fromEmail: z.string().email("Valid email is required"),
//     templateId: z.string().min(1, "Please select a template"),
//     recipientListIds: z.array(z.number()).min(1, "Select at least one list"),
//     scheduleType: z.enum(["now", "schedule"]),
//     scheduledAt: z.string().optional(),
//     timezone: z.string().optional(),
// });
//
// export type CampaignFormValues = z.infer<typeof campaignSchema>;
//
// const STEPS = [
//     { number: 1, label: "Details" },
//     { number: 2, label: "Template" },
//     { number: 3, label: "Recipients" },
//     { number: 4, label: "Review" },
//     { number: 5, label: "Send" },
// ];
//
// export default function CreateCampaignContent() {
//     const router = useRouter();
//     const [currentStep, setCurrentStep] = useState(1);
//     const [createdCampaignId, setCreatedCampaignId] = useState<number | null>(null);
//
//     const [createCampaign, { isLoading: isCreating }] = useCreateCampaignMutation();
//     const [sendCampaign, { isLoading: isSending }] = useSendCampaignMutation();
//     const [scheduleCampaign, { isLoading: isScheduling }] = useScheduleCampaignMutation();
//
//     const form = useForm<CampaignFormValues>({
//         resolver: zodResolver(campaignSchema),
//         defaultValues: {
//             name: "",
//             subjectLine: "",
//             fromName: "",
//             fromEmail: "",
//             templateId: "",
//             recipientListIds: [],
//             scheduleType: "now",
//             scheduledAt: "",
//             timezone: "Africa/Lagos",
//         },
//     });
//
//     const goNext = () => setCurrentStep((s) => Math.min(s + 1, STEPS.length));
//     const goBack = () => setCurrentStep((s) => Math.max(s - 1, 1));
//
//     const handleCreateAndNext = async () => {
//         const values = form.getValues();
//         try {
//             const result = await createCampaign({
//                 name: values.name,
//                 subjectLine: values.subjectLine,
//                 fromName: values.fromName,
//                 fromEmail: values.fromEmail,
//                 templateId: Number(values.templateId),
//                 recipientListIds: values.recipientListIds,
//             }).unwrap();
//
//             setCreatedCampaignId(result.id);
//             goNext();
//         } catch {
//             console.error("Failed to create campaign");
//         }
//     };
//
//     const handleSend = async () => {
//         if (!createdCampaignId) return;
//         const values = form.getValues();
//
//         try {
//             if (values.scheduleType === "schedule" && values.scheduledAt) {
//                 await scheduleCampaign({
//                     id: createdCampaignId,
//                     scheduledAt: values.scheduledAt,
//                     timezone: values.timezone ?? "Africa/Lagos",
//                 }).unwrap();
//             } else {
//                 await sendCampaign({ id: createdCampaignId }).unwrap();
//             }
//
//             router.push("/campaigns");
//         } catch (error) {
//             console.error("Failed to send campaign", error);
//         }
//     };
//
//     return (
//         <div className="p-6 max-w-3xl mx-auto space-y-8">
//             <div>
//                 <h1 className="text-2xl font-semibold">Create Campaign</h1>
//                 <p className="text-sm  mt-1">
//                     Set up your email campaign in a few steps
//                 </p>
//             </div>
//
//             <div className="flex text-foreground bg-background items-center gap-2">
//                 {STEPS.map((step, index) => (
//                     <div key={step.number} className="flex  text-foreground bg-background items-center gap-2">
//                         <div className="flex items-center gap-2">
//                             <div
//                                 className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${currentStep > step.number
//                                     ? "bg-yellow-400 text-black"
//                                     : currentStep === step.number
//                                         ? "bg-yellow-400 text-black"
//                                         : "bg-gray-100 text-gray-400"
//                                     }`}
//                             >
//                                 {currentStep > step.number ? <CheckCircle2 size={16} /> : step.number}
//                             </div>
//                             <span
//                                 className={`text-sm font-medium hidden sm:block ${currentStep === step.number ? "text-foreground" : "text-gray-400"
//                                     }`}
//                             >
//                                 {step.label}
//                             </span>
//                         </div>
//                         {index < STEPS.length - 1 && <ChevronRight size={16} className="text-gray-300 mx-1" />}
//                     </div>
//                 ))}
//             </div>
//
//             <div className="border text-foreground bg-background border-gray-200 rounded-xl p-6 space-y-4">
//                 {currentStep === 1 && (
//                     <StepDetails
//                         form={form}
//                         onNext={() =>
//                             form.trigger(["name", "subjectLine", "fromName", "fromEmail"]).then((valid) => {
//                                 if (valid) goNext();
//                             })
//                         }
//                     />
//                 )}
//
//                 {currentStep === 2 && (
//                     <StepTemplate
//                         form={form}
//                         onNext={() =>
//                             form.trigger(["templateId"]).then((valid) => {
//                                 if (valid) goNext();
//                             })
//                         }
//                         onBack={goBack}
//                     />
//                 )}
//
//                 {currentStep === 3 && (
//                     <StepRecipients
//                         form={form}
//                         onNext={() =>
//                             form.trigger(["recipientListIds"]).then((valid) => {
//                                 if (valid) goNext();
//                             })
//                         }
//                         onBack={goBack}
//                     />
//                 )}
//
//                 {currentStep === 4 && (
//                     <StepReview
//                         form={form}
//                         onNext={handleCreateAndNext}
//                         onBack={goBack}
//                         isLoading={isCreating}
//                     />
//                 )}
//
//                 {currentStep === 5 && (
//                     <StepSend
//                         form={form}
//                         onSend={handleSend}
//                         onBack={goBack}
//                         isLoading={isSending || isScheduling}
//                     />
//                 )}
//             </div>
//         </div>
//     );
// }
//
// export const primaryBtn =
//     "bg-yellow-400 hover:bg-yellow-500 text-black text-sm font-medium px-5 py-2.5 rounded-lg transition-colors disabled:opacity-60";
//
// export const secondaryBtn =
//     "border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium px-5 py-2.5 rounded-lg transition-colors";

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, ChevronRight } from "lucide-react";

import StepDetails from "@/modules/campaigns/steps/StepDetails";
import StepTemplate from "@/modules/campaigns/steps/StepTemplate";
import StepRecipients from "@/modules/campaigns/steps/StepRecipients";
import StepReview from "@/modules/campaigns/steps/StepReview";
import StepSend from "@/modules/campaigns/steps/StepSend";

export const campaignSchema = z.object({
    name: z.string().min(1),
    subjectLine: z.string().min(1),
    fromName: z.string().min(1),
    fromEmail: z.string().email(),
    templateId: z.string().min(1),
    recipientListIds: z.array(z.number()).min(1),
    scheduleType: z.enum(["now", "schedule"]),
    scheduledAt: z.string().optional(),
    timezone: z.string().optional(),
});

export type CampaignFormValues = z.infer<typeof campaignSchema>;

const STEPS = [
    { number: 1, label: "Details" },
    { number: 2, label: "Template" },
    { number: 3, label: "Recipients" },
    { number: 4, label: "Review" },
    { number: 5, label: "Send" },
];

function SkeletonBox({ className }: { className: string }) {
    return <div className={`animate-pulse bg-gray-200 dark:bg-gray-800 rounded ${className}`} />;
}

function CampaignCreateSkeleton() {
    return (
        <div className="p-6 max-w-3xl mx-auto space-y-8">
            <SkeletonBox className="h-6 w-1/3" />
            <SkeletonBox className="h-4 w-1/2" />

            <div className="flex gap-2">
                {STEPS.map((_, i) => (
                    <SkeletonBox key={i} className="h-8 w-20 rounded-full" />
                ))}
            </div>

            <div className="border rounded-xl p-6 space-y-4">
                <SkeletonBox className="h-4 w-1/3" />
                <SkeletonBox className="h-10 w-full" />
                <SkeletonBox className="h-10 w-full" />
                <SkeletonBox className="h-10 w-2/3" />
            </div>
        </div>
    );
}

export default function CreateCampaignContent() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [createdCampaignId, setCreatedCampaignId] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);

    const form = useForm<CampaignFormValues>({
        resolver: zodResolver(campaignSchema),
        defaultValues: {
            name: "",
            subjectLine: "",
            fromName: "",
            fromEmail: "",
            templateId: "",
            recipientListIds: [],
            scheduleType: "now",
            scheduledAt: "",
            timezone: "Africa/Lagos",
        },
    });

    const goNext = () => setCurrentStep((s) => Math.min(s + 1, STEPS.length));
    const goBack = () => setCurrentStep((s) => Math.max(s - 1, 1));

    const handleCreateAndNext = async () => {
        setLoading(true);

        setTimeout(() => {
            setCreatedCampaignId(1);
            setLoading(false);
            goNext();
        }, 1200);
    };

    const handleSend = async () => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            router.push("/campaigns");
        }, 1200);
    };

    if (loading) return <CampaignCreateSkeleton />;

    return (
        <div className="p-6 max-w-3xl mx-auto space-y-8">

            <div>
                <h1 className="text-2xl font-semibold">Create Campaign</h1>
                <p className="text-sm mt-1">Set up your email campaign in a few steps</p>
            </div>

            <div className="flex items-center gap-2">
                {STEPS.map((step, index) => (
                    <div key={step.number} className="flex items-center gap-2">
                        <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                            ${currentStep >= step.number
                                ? "bg-yellow-400 text-black"
                                : "bg-gray-100 text-gray-400"
                            }`}
                        >
                            {currentStep > step.number ? <CheckCircle2 size={16} /> : step.number}
                        </div>

                        <span className="text-sm hidden sm:block">{step.label}</span>

                        {index < STEPS.length - 1 && (
                            <ChevronRight size={16} className="text-gray-300 mx-1" />
                        )}
                    </div>
                ))}
            </div>

            <div className="border rounded-xl p-6 space-y-4">

                {currentStep === 1 && (
                    <StepDetails
                        form={form}
                        onNext={() =>
                            form.trigger(["name", "subjectLine", "fromName", "fromEmail"])
                                .then((v) => v && goNext())
                        }
                    />
                )}

                {currentStep === 2 && (
                    <StepTemplate
                        form={form}
                        onNext={() =>
                            form.trigger(["templateId"]).then((v) => v && goNext())
                        }
                        onBack={goBack}
                    />
                )}

                {currentStep === 3 && (
                    <StepRecipients
                        form={form}
                        onNext={() =>
                            form.trigger(["recipientListIds"]).then((v) => v && goNext())
                        }
                        onBack={goBack}
                    />
                )}

                {currentStep === 4 && (
                    <StepReview
                        form={form}
                        onNext={handleCreateAndNext}
                        onBack={goBack}
                        isLoading={loading}
                    />
                )}

                {currentStep === 5 && (
                    <StepSend
                        form={form}
                        onSend={handleSend}
                        onBack={goBack}
                        isLoading={loading}
                    />
                )}
            </div>
        </div>
    );
}