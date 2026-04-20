// import { CampaignDto } from "@/models/response/campaignResponse";
//
// export default function CampaignStatsRow({ campaign }: { campaign: CampaignDto }) {
//     const calcRate = (numerator: number, denominator: number) =>
//         denominator > 0 ? ((numerator / denominator) * 100).toFixed(1) : "0";
//
//     const openRate = calcRate(campaign.totalOpened, campaign.totalSent);
//     const clickRate = calcRate(campaign.totalClicked, campaign.totalSent);
//     const bounceRate = calcRate(campaign.totalBounced, campaign.totalSent);
//
//     return (
//         <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-foreground bg-background">
//             <Stat label="Sent" value={campaign.totalSent.toLocaleString()} />
//             <Stat label="Open Rate" value={`${openRate}%`} />
//             <Stat label="Click Rate" value={`${clickRate}%`} />
//             <Stat label="Bounce Rate" value={`${bounceRate}%`} />
//         </div>
//     );
// }
//
// function Stat({ label, value }: { label: string; value: string }) {
//     return (
//         <div className="text-foreground bg-background">
//             <p className="text-xs text-gray-400">{label}</p>
//             <p className="text-sm font-semibold text-gray-800">{value}</p>
//         </div>
//     );
// }

import { CampaignWithStats } from "@/models/response/campaignResponse";

export default function CampaignStatsRow({ campaign }: { campaign: CampaignWithStats }) {
    const calcRate = (num = 0, denom = 0) =>
        denom > 0 ? ((num / denom) * 100).toFixed(1) : "0";

    const openRate = calcRate(campaign.totalOpened, campaign.totalSent);
    const clickRate = calcRate(campaign.totalClicked, campaign.totalSent);
    const bounceRate = calcRate(campaign.totalBounced, campaign.totalSent);

    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Stat label="Sent" value={(campaign.totalSent ?? 0).toLocaleString()} />
            <Stat label="Open Rate" value={`${openRate}%`} />
            <Stat label="Click Rate" value={`${clickRate}%`} />
            <Stat label="Bounce Rate" value={`${bounceRate}%`} />
        </div>
    );
}

function Stat({ label, value }: { label: string; value: string }) {
    return (
        <div>
            <p className="text-xs text-gray-400">{label}</p>
            <p className="text-sm font-semibold">{value}</p>
        </div>
    );
}