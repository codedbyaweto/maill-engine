"use client";

import RouterUtil from "@/utilities/routerUtil";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Provider } from "react-redux";
import { store } from "@/store/store";

import NiceModal from "@ebay/nice-modal-react";
import { Toaster } from "react-hot-toast";

import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

const persistor = persistStore(store);

export default function Providers({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    useEffect(() => {
        RouterUtil.setRouter(router);
    }, [router]);

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <NiceModal.Provider>
                    <Toaster />
                    {children}
                </NiceModal.Provider>
            </PersistGate>
        </Provider>
    );
}