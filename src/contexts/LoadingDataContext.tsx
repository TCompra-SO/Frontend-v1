import { createContext, ReactNode, useState } from "react";

interface LoadingDataContextType {
  myPurchaseOrdersLoadingPdf: boolean;
  subUserPurchaseOrdersLoadingPdf: boolean;
  allPurchaseOrdersLoadingPdf: boolean;
  updateMyPurchaseOrdersLoadingPdf: (val: boolean | undefined) => void;
  updateSubUserPurchaseOrdersLoadingPdf: (val: boolean | undefined) => void;
  updateAllPurchaseOrdersLoadingPdf: (val: boolean | undefined) => void;

  myRequirementsLoadingViewOffers: boolean;
  subUserRequirementsViewOffers: boolean;
  allRequirementsViewOffers: boolean;
  updateMyRequirementsLoadingViewOffers: (val: boolean | undefined) => void;
  updateSubUserRequirementsViewOffers: (val: boolean | undefined) => void;
  updateAllRequirementsViewOffers: (val: boolean | undefined) => void;
}

export const LoadingDataContext = createContext<LoadingDataContextType>({
  myPurchaseOrdersLoadingPdf: false,
  subUserPurchaseOrdersLoadingPdf: false,
  allPurchaseOrdersLoadingPdf: false,
  updateMyPurchaseOrdersLoadingPdf: () => {},
  updateSubUserPurchaseOrdersLoadingPdf: () => {},
  updateAllPurchaseOrdersLoadingPdf: () => {},

  myRequirementsLoadingViewOffers: false,
  subUserRequirementsViewOffers: false,
  allRequirementsViewOffers: false,
  updateMyRequirementsLoadingViewOffers: () => {},
  updateSubUserRequirementsViewOffers: () => {},
  updateAllRequirementsViewOffers: () => {},
});

export function LoadingDataProvider({ children }: { children: ReactNode }) {
  const [myPurchaseOrdersLoadingPdf, setMyPurchaseOrdersLoadingPdf] =
    useState(false);
  const [subUserPurchaseOrdersLoadingPdf, setSubUserPurchaseOrdersLoadingPdf] =
    useState(false);
  const [allPurchaseOrdersLoadingPdf, setAllPurchaseOrdersLoadingPdf] =
    useState(false);
  const [myRequirementsLoadingViewOffers, setMyRequirementsLoadingViewOffers] =
    useState(false);
  const [subUserRequirementsViewOffers, setSubUserRequirementsViewOffers] =
    useState(false);
  const [allRequirementsViewOffers, setAllRequirementsViewOffers] =
    useState(false);

  function updateMyPurchaseOrdersLoadingPdf(val: boolean | undefined) {
    setMyPurchaseOrdersLoadingPdf(val ? true : false);
  }

  function updateSubUserPurchaseOrdersLoadingPdf(val: boolean | undefined) {
    setSubUserPurchaseOrdersLoadingPdf(val ? true : false);
  }

  function updateAllPurchaseOrdersLoadingPdf(val: boolean | undefined) {
    setAllPurchaseOrdersLoadingPdf(val ? true : false);
  }

  function updateMyRequirementsLoadingViewOffers(val: boolean | undefined) {
    setMyRequirementsLoadingViewOffers(val ? true : false);
  }

  function updateSubUserRequirementsViewOffers(val: boolean | undefined) {
    setSubUserRequirementsViewOffers(val ? true : false);
  }

  function updateAllRequirementsViewOffers(val: boolean | undefined) {
    console.log(val);
    setAllRequirementsViewOffers(val ? true : false);
  }

  return (
    <LoadingDataContext.Provider
      value={{
        myPurchaseOrdersLoadingPdf,
        subUserPurchaseOrdersLoadingPdf,
        allPurchaseOrdersLoadingPdf,
        myRequirementsLoadingViewOffers,
        subUserRequirementsViewOffers,
        allRequirementsViewOffers,
        updateMyPurchaseOrdersLoadingPdf,
        updateSubUserPurchaseOrdersLoadingPdf,
        updateAllPurchaseOrdersLoadingPdf,
        updateMyRequirementsLoadingViewOffers,
        updateSubUserRequirementsViewOffers,
        updateAllRequirementsViewOffers,
      }}
    >
      {children}
    </LoadingDataContext.Provider>
  );
}
