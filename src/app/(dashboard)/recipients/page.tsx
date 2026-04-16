import RecipientsModule from "@/modules/recipients/RecipientsModule";
import PermissionGuard from "@/components/providers/PermissinGuard";

export default function RecipientsPage() {
    return (
        <PermissionGuard resource="recipients">
            <RecipientsModule/>
        </PermissionGuard>
    )
}