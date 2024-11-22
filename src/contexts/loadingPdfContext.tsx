import { createContext, ReactNode, useState } from "react";

interface LoadingPdfContextType {
  myPurchaseOrdersLoadingPdf: boolean;
  subUserPurchaseOrdersLoadingPdf: boolean;
  allPurchaseOrdersLoadingPdf: boolean;
  updateMyPurchaseOrdersLoadingPdf: (val: boolean) => void;
  updateSubUserPurchaseOrdersLoadingPdf: (val: boolean) => void;
  updateAllPurchaseOrdersLoadingPdf: (val: boolean) => void;
}

export const LoadingPdfContext = createContext<LoadingPdfContextType>({
  myPurchaseOrdersLoadingPdf: false,
  subUserPurchaseOrdersLoadingPdf: false,
  allPurchaseOrdersLoadingPdf: false,
  updateMyPurchaseOrdersLoadingPdf: () => {},
  updateSubUserPurchaseOrdersLoadingPdf: () => {},
  updateAllPurchaseOrdersLoadingPdf: () => {},
});

export function LoadingPdfProvider({ children }: { children: ReactNode }) {
  const [myPurchaseOrdersLoadingPdf, setMyPurchaseOrdersLoadingPdf] =
    useState(false);
  const [subUserPurchaseOrdersLoadingPdf, setSubUserPurchaseOrdersLoadingPdf] =
    useState(false);
  const [allPurchaseOrdersLoadingPdf, setAllPurchaseOrdersLoadingPdf] =
    useState(false);

  function updateMyPurchaseOrdersLoadingPdf(val: boolean) {
    setMyPurchaseOrdersLoadingPdf(val);
  }

  function updateSubUserPurchaseOrdersLoadingPdf(val: boolean) {
    setSubUserPurchaseOrdersLoadingPdf(val);
  }

  function updateAllPurchaseOrdersLoadingPdf(val: boolean) {
    setAllPurchaseOrdersLoadingPdf(val);
  }

  return (
    <LoadingPdfContext.Provider
      value={{
        myPurchaseOrdersLoadingPdf,
        subUserPurchaseOrdersLoadingPdf,
        allPurchaseOrdersLoadingPdf,
        updateMyPurchaseOrdersLoadingPdf,
        updateSubUserPurchaseOrdersLoadingPdf,
        updateAllPurchaseOrdersLoadingPdf,
      }}
    >
      {children}
    </LoadingPdfContext.Provider>
  );
}
