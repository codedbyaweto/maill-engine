import CampaignsContent from "@/modules/campaigns/CampaignsContent";
import PermissionGuard from "@/components/providers/PermissinGuard";

export default function CampaignsPage() {
    return (
        <PermissionGuard resource="campaigns">
            <CampaignsContent/>;
        </PermissionGuard>
    )
}