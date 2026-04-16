"use client";

import NiceModal from "@ebay/nice-modal-react";
import * as React from "react";

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
    return <NiceModal.Provider>{children}</NiceModal.Provider>;
};