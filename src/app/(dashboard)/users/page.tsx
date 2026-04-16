import TeamModule from "@/modules/team/TeamModule";
import PermissionGuard from "@/components/providers/PermissinGuard";

export default function UsersPage() {
    return (
        <PermissionGuard resource="users">
            <TeamModule/>
        </PermissionGuard>
    )
}