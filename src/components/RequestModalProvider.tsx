"use client";

import { createContext, useCallback, useContext, useState } from "react";
import RequestModal from "@/components/RequestModal";

type Ctx = {
  open: (presetProduct?: string) => void;
  close: () => void;
};

const RequestModalContext = createContext<Ctx | null>(null);

export function useRequestModal() {
  const ctx = useContext(RequestModalContext);
  if (!ctx) throw new Error("useRequestModal must be used within RequestModalProvider");
  return ctx;
}

export default function RequestModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [presetProduct, setPresetProduct] = useState<string | undefined>(undefined);

  const open = useCallback((product?: string) => {
    setPresetProduct(product);
    setIsOpen(true);
  }, []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <RequestModalContext.Provider value={{ open, close }}>
      {children}
      <RequestModal isOpen={isOpen} onClose={close} presetProduct={presetProduct} />
    </RequestModalContext.Provider>
  );
}
