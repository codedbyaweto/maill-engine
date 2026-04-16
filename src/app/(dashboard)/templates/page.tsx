import TemplatesModule from "@/modules/templates/TemplateModule";
import PermissionGuard from "@/components/providers/PermissinGuard";

export default function TemplatesPage() {
    return (
        <PermissionGuard resource="templates">
            <TemplatesModule />
        </PermissionGuard>
    )
}
