"use client";

import React, {CSSProperties, useEffect, useState} from "react";
import {AlertCircle, AlertTriangle, CheckCircle, Info, X} from "lucide-react";
import {cn} from "@/lib/utils";

export type ToastVariant = "success" | "error" | "warning" | "info";

export interface ToastProps {
    /** Toast message */
    message: string;
    /** Toast variant */
    variant?: ToastVariant;
    /** Whether toast is visible */
    visible?: boolean;
    /** Close handler */
    onClose?: () => void;
    /** Auto-dismiss duration in ms (0 to disable) */
    duration?: number;
    /** Position */
    position?: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center";
    /** Custom className */
    className?: string;
    /** Custom style */
    style?: CSSProperties;
    /** Show close button */
    showClose?: boolean;
    /** Title */
    title?: string;
}

const variantStyles: Record<ToastVariant, { container: string; icon: string }> = {
    success: {
        container: "bg-success-50 border-success-200 text-success-800",
        icon: "text-success-500",
    },
    error: {
        container: "bg-error-50 border-error-200 text-error-800",
        icon: "text-error-500",
    },
    warning: {
        container: "bg-warning-50 border-warning-200 text-warning-800",
        icon: "text-warning-500",
    },
    info: {
        container: "bg-blue-50 border-blue-200 text-blue-800",
        icon: "text-blue-500",
    },
};

const variantIcons: Record<ToastVariant, React.ComponentType<{ className?: string }>> = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
};

const positionStyles: Record<string, string> = {
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "top-center": "top-4 left-1/2 -translate-x-1/2",
    "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
};

export const Toast = ({
                          message,
                          variant = "info",
                          visible = true,
                          onClose,
                          duration = 5000,
                          position = "top-right",
                          className,
                          style,
                          showClose = true,
                          title,
                      }: ToastProps) => {
    const [isVisible, setIsVisible] = useState(visible);

    useEffect(() => {
        setIsVisible(visible);
    }, [visible]);

    useEffect(() => {
        if (isVisible && duration > 0) {
            const timer = setTimeout(() => {
                setIsVisible(false);
                onClose?.();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [isVisible, duration, onClose]);

    if (!isVisible) return null;

    const styles = variantStyles[variant];
    const Icon = variantIcons[variant];

    return (
        <div
            className={cn(
                "fixed z-[var(--z-toast,1070)] flex items-start gap-3 p-4 rounded-lg border shadow-lg max-w-md w-full animate-in slide-in-from-top-2 fade-in duration-300",
                styles.container,
                positionStyles[position],
                className
            )}
            style={style}
        >
            <Icon className={cn("h-5 w-5 shrink-0 mt-0.5", styles.icon)}/>
            <div className="flex-1 min-w-0">
                {title && <p className="font-semibold text-sm">{title}</p>}
                <p className={cn("text-sm", title ? "mt-1" : "")}>{message}</p>
            </div>
            {showClose && (
                <button
                    onClick={() => {
                        setIsVisible(false);
                        onClose?.();
                    }}
                    className="shrink-0 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-offset-2"
                >
                    <X className="h-4 w-4"/>
                    <span className="sr-only">Close</span>
                </button>
            )}
        </div>
    );
};

Toast.displayName = "Toast";

export default Toast;
