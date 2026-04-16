export const Roles = {
    ADMIN: "admin",
    EDITOR: "editor",
    VIEWER: "viewer",
} as const;

export type Role = (typeof Roles)[keyof typeof Roles];

export const rolePermissions: Record<Role, string[]> = {
    admin: [
        "dashboard",
        "templates",
        "campaigns",
        "analytics",
        "recipients",
        "users",
    ],
    editor: [
        "dashboard",
        "templates",
        "campaigns",
        "analytics",
        "recipients",
    ],
    viewer: [
        "campaigns",
        "analytics",
    ],
};