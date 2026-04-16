import {FormikValues, useFormik} from "formik";
import type {CSSProperties} from "react";
import type { IconType } from "react-icons/lib";

export type Formik<Values extends FormikValues = FormikValues> = ReturnType<
    typeof useFormik<Values>
>;

export interface CustomCSSProperties extends CSSProperties {
    [key: `--${string}`]: string | number;
}

export type BaseResponse<T = unknown> = {
    responseCode: string;
    responseMessage: string;
    data?: T;
};

export type BasePaginationDTO<T = unknown> = {
    data: T[];
    page: number;
    per_page: number;
    totalItems: number;
    totalPages: number;
    hasNext: boolean;
};

export type BaseResponseWithPagination<T> = BaseResponse & BasePaginationDTO<T>
export type BaseErrorResponse = {
    type: string;
    title: string;
    status: number;
    errors: {
        [key: string]: string[];
    };
    traceId: string;
};

// ============== LAYOUT TYPES ==============

export interface ModuleItem {
    label: string;
    route: string;
    icon?: IconType;
    isActive?: boolean;
    isDisabled?: boolean;
    badge?: string | number;
}

export interface Module {
    moduleName: string;
    moduleRoute?: string;
    icon: IconType;
    isActive?: boolean;
    isDisabled?: boolean;
    moduleItems?: ModuleItem[];
    badge?: string | number;
}

export interface DashboardLayoutConfig {
    modules: Module[];
    branding?: {
        logo?: IconType;
        title?: string;
        logoComponent?: React.ComponentType;
    };
    footer?: {
        version?: string;
        support?: {
            label: string;
            action: () => void;
        };
    };
    user?: {
        name?: string;
        email?: string;
        avatar?: string;
    };
}

export interface BreadcrumbItem {
    label: string;
    route?: string;
    active?: boolean;
}

export interface ActionButton {
    id?: string;
    position?: "left" | "right";
    permission?: string;
    text?: string;
    onClick?: () => void;
    variant?: "primary" | "secondary" | "text" | "danger";
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    disabled?: boolean;
    loading?: boolean;
    style?: CSSProperties;
    className?: string;
}

export interface HeaderConfig {
    title?: string;
    subtitle?: string;
    showBackButton?: boolean;
    showHeader?: boolean;
    backButtonText?: string;
    onBackClick?: () => void;
    actionButtons?: ActionButton[];
    customContent?: React.ComponentType<HeaderContentProps>;
}

export interface HeaderContentProps {
    title?: string;
    subtitle?: string;
    onBackClick?: () => void;
    actionButtons?: ActionButton[];
}

export interface ModuleLayoutConfig {
    isActive?: boolean;
    icon?: IconType;
    modules: ModuleItem[];
    actionButtons?: ActionButton[];
    showBreadcrumbs?: boolean;
    customHeader?: React.ComponentType;
}

export interface LayoutContextType {
    // Configuration
    dashboardConfig: DashboardLayoutConfig;
    setDashboardConfig: (config: DashboardLayoutConfig) => void;

    // Current state
    activeModule: Module | null;
    activeSubModule: ModuleItem | null;
    currentPath: string;

    // Computed properties
    currentModuleItems: ModuleItem[];
    currentPageConfig: ModuleLayoutConfig;
    breadcrumbItems: BreadcrumbItem[];

    // Navigation
    navigateToModule: (moduleId: string, subModuleId?: string) => void;
    navigateToSubModule: (subModuleId: string) => void;
    navigateToPath: (path: string) => void;

    // Sidebar state
    isMainSidebarCollapsed: boolean;
    isModuleSidebarCollapsed: boolean;
    toggleMainSidebar: () => void;
    toggleModuleSidebar: () => void;

    // Utilities
    isModuleActive: (moduleId: string) => boolean;
    isSubModuleActive: (subModuleId: string) => boolean;
    getModuleByPath: (path: string) => Module | null;
    getSubModuleByPath: (path: string) => ModuleItem | null;
}
