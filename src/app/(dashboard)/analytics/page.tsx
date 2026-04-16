import AccountAnalyticsContent from "@/features/analytics/AccountAnalyticsContent";
import PermissionGuard from "@/components/providers/PermissinGuard";

export default function AnalyticsPage() {
    return (
        <PermissionGuard resource="analytics">
            <AccountAnalyticsContent/>
        </PermissionGuard>
    )
}