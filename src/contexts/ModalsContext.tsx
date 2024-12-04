import { createContext, ReactNode, useState } from "react";

interface LoadingDataContextType {
  detailedRequirementModalQueue: boolean;
  detailedOfferModalQueue: boolean;
  viewHistoryModalQueue: boolean;
  updateMyPurchaseOrdersLoadingPdf: (val: boolean) => void;
  updateSubUserPurchaseOrdersLoadingPdf: (val: boolean) => void;
  updateAllPurchaseOrdersLoadingPdf: (val: boolean) => void;

  myRequirementsLoadingViewOffers: boolean;
  subUserRequirementsViewOffers: boolean;
  allRequirementsViewOffers: boolean;
  updateMyRequirementsLoadingViewOffers: (val: boolean) => void;
  updateSubUserRequirementsViewOffers: (val: boolean) => void;
  updateAllRequirementsViewOffers: (val: boolean) => void;
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

  function updateMyPurchaseOrdersLoadingPdf(val: boolean) {
    setMyPurchaseOrdersLoadingPdf(val);
  }

  function updateSubUserPurchaseOrdersLoadingPdf(val: boolean) {
    setSubUserPurchaseOrdersLoadingPdf(val);
  }

  function updateAllPurchaseOrdersLoadingPdf(val: boolean) {
    setAllPurchaseOrdersLoadingPdf(val);
  }

  function updateMyRequirementsLoadingViewOffers(val: boolean) {
    setMyRequirementsLoadingViewOffers(val);
  }

  function updateSubUserRequirementsViewOffers(val: boolean) {
    setSubUserRequirementsViewOffers(val);
  }

  function updateAllRequirementsViewOffers(val: boolean) {
    setAllRequirementsViewOffers(val);
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
