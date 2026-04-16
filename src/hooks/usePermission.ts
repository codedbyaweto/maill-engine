import { useAppSelector } from "@/store/hooks";
import { rolePermissions} from "@/utils/types/permissions";

export function usePermission() {
    const role = useAppSelector((state) => state.auth.user?.role);

    const canAccess = (resource: string) => {
        if (!role) return false;
        return rolePermissions[role]?.includes(resource);
    };

    return { canAccess, role };
}