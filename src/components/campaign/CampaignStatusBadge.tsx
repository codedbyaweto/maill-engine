// import { CampaignStatus } from "@/models/response/campaignResponse";
//
// const config: Record<CampaignStatus, { label: string; className: string }> = {
//     draft: { label: "Draft", className: "bg-gray-100 text-gray-600" },
//     scheduled: { label: "Scheduled", className: "bg-yellow-100 text-yellow-700" },
//     sending: { label: "Sending", className: "bg-blue-100 text-blue-700" },
//     sent: { label: "Sent", className: "bg-green-100 text-green-700" },
//     cancelled: { label: "Cancelled", className: "bg-red-100 text-red-600" },
//     failed: { label: "Failed", className: "bg-red-100 text-red-600" },
// };
//
// export default function CampaignStatusBadge({ status }: { status: CampaignStatus }) {
//     const { label, className } = config[status];
//     return (
//         <span className={`text-xs text-foreground bg-background font-medium px-2 py-0.5 rounded-full ${className}`}>
//             {label}
//         </span>
//     );
// }


import { CampaignStatus } from "@/models/response/campaignResponse";

const config: Record<CampaignStatus, { label: string; className: string }> = {
    draft: { label: "Draft", className: "bg-gray-100 text-gray-600" },
    scheduled: { label: "Scheduled", className: "bg-yellow-100 text-yellow-700" },
    sending: { label: "Sending", className: "bg-blue-100 text-blue-700" },
    sent: { label: "Sent", className: "bg-green-100 text-green-700" },
    cancelled: { label: "Cancelled", className: "bg-red-100 text-red-600" },
    failed: { label: "Failed", className: "bg-red-100 text-red-600" },
    completed: { label: "Completed", className: "bg-emerald-100 text-emerald-700" },
};

export default function CampaignStatusBadge({
                                                status,
                                            }: {
    status: CampaignStatus;
}) {
    const { label, className } = config[status];

    return (
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${className}`}>
            {label}
        </span>
    );
}