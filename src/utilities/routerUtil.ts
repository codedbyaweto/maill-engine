// Utility for handling navigation in Next.js App Router

import type {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";

class RouterUtil {
    // Use correct Next.js type instead of any
    private static router: AppRouterInstance | null = null;

    static setRouter(router: AppRouterInstance) {
        this.router = router;
    }

    static navigate(path: string) {
        if (this.router) {
            this.router.push(path);
        } else if (typeof window !== "undefined") {
            window.location.href = path;
        }
    }

    static replace(path: string) {
        if (this.router) {
            this.router.replace(path);
        } else if (typeof window !== "undefined") {
            window.location.replace(path);
        }
    }

    static goBack() {
        if (this.router) {
            this.router.back();
        } else if (typeof window !== "undefined") {
            window.history.back();
        }
    }
}

export default RouterUtil;
