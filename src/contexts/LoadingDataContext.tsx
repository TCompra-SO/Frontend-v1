import { createContext, ReactNode, useEffect, useState } from "react";
import { Action } from "../utilities/types";

interface LoadingDataContextType {
  myPurchaseOrdersLoadingPdf: boolean;
  subUserPurchaseOrdersLoadingPdf: boolean;
  allPurchaseOrdersLoadingPdf: boolean;
  allSalesOrdersLoadingPdf: boolean;
  updateMyPurchaseOrdersLoadingPdf: (val: boolean | undefined) => void;
  updateSubUserPurchaseOrdersLoadingPdf: (val: boolean | undefined) => void;
  updateAllPurchaseOrdersLoadingPdf: (val: boolean | undefined) => void;
  updateAllSalesOrdersLoadingPdf: (val: boolean | undefined) => void;

  myRequirementsLoadingViewOffers: boolean;
  subUserRequirementsViewOffers: boolean;
  allPurchaseOrdersViewOffers: boolean;
  allSalesOrdersViewOffers: boolean;
  updateMyRequirementsLoadingViewOffers: (val: boolean | undefined) => void;
  updateSubUserRequirementsViewOffers: (val: boolean | undefined) => void;
  updateAllPurchaseOrdersViewOffers: (val: boolean | undefined) => void;
  updateAllSalesOrdersViewOffers: (val: boolean | undefined) => void;

  createRequirementLoading: boolean;
  updateCreateRequirementLoading: (val: boolean | undefined) => void;

  changeCertificationStateLoading: boolean;
  updateChangeCertificationStateLoading: (val: boolean | undefined) => void;

  // Para acciones
  idAndActionQueue: Record<string, Action>;
  updateIdAndActionQueue: (id: string, action: Action) => void;
  deleteFromIdAndActionQueue: (id: string) => void;
}

export const LoadingDataContext = createContext<LoadingDataContextType>({
  myPurchaseOrdersLoadingPdf: false,
  subUserPurchaseOrdersLoadingPdf: false,
  allPurchaseOrdersLoadingPdf: false,
  allSalesOrdersLoadingPdf: false,
  updateMyPurchaseOrdersLoadingPdf: () => {},
  updateSubUserPurchaseOrdersLoadingPdf: () => {},
  updateAllPurchaseOrdersLoadingPdf: () => {},
  updateAllSalesOrdersLoadingPdf: () => {},
  myRequirementsLoadingViewOffers: false,
  subUserRequirementsViewOffers: false,
  allPurchaseOrdersViewOffers: false,
  allSalesOrdersViewOffers: false,
  updateMyRequirementsLoadingViewOffers: () => {},
  updateSubUserRequirementsViewOffers: () => {},
  updateAllPurchaseOrdersViewOffers: () => {},
  updateAllSalesOrdersViewOffers: () => {},
  createRequirementLoading: false,
  updateCreateRequirementLoading: () => {},
  idAndActionQueue: {},
  updateIdAndActionQueue: () => {},
  deleteFromIdAndActionQueue: () => {},
  changeCertificationStateLoading: false,
  updateChangeCertificationStateLoading: () => {},
});

export function LoadingDataProvider({ children }: { children: ReactNode }) {
  const [myPurchaseOrdersLoadingPdf, setMyPurchaseOrdersLoadingPdf] =
    useState(false);
  const [subUserPurchaseOrdersLoadingPdf, setSubUserPurchaseOrdersLoadingPdf] =
    useState(false);
  const [allPurchaseOrdersLoadingPdf, setAllPurchaseOrdersLoadingPdf] =
    useState(false);
  const [allSalesOrdersLoadingPdf, setAllSalesOrdersLoadingPdf] =
    useState(false);
  const [myRequirementsLoadingViewOffers, setMyRequirementsLoadingViewOffers] =
    useState(false);
  const [subUserRequirementsViewOffers, setSubUserRequirementsViewOffers] =
    useState(false);
  const [allPurchaseOrdersViewOffers, setAllPurchaseOrdersViewOffers] =
    useState(false);
  const [allSalesOrdersViewOffers, setAllSalesOrdersViewOffers] =
    useState(false);
  const [createRequirementLoading, setCreateRequirementLoading] =
    useState(false);
  const [changeCertificationStateLoading, setChangeCertificationStateLoading] =
    useState(false);
  const [idAndActionQueue, setIdAndActionQueue] = useState<
    Record<string, Action>
  >({});

  useEffect(() => {
    console.log(idAndActionQueue);
  }, [idAndActionQueue]);

  function updateMyPurchaseOrdersLoadingPdf(val: boolean | undefined) {
    setMyPurchaseOrdersLoadingPdf(val ? true : false);
  }

  function updateSubUserPurchaseOrdersLoadingPdf(val: boolean | undefined) {
    setSubUserPurchaseOrdersLoadingPdf(val ? true : false);
  }

  function updateAllPurchaseOrdersLoadingPdf(val: boolean | undefined) {
    setAllPurchaseOrdersLoadingPdf(val ? true : false);
  }

  function updateAllSalesOrdersLoadingPdf(val: boolean | undefined) {
    setAllSalesOrdersLoadingPdf(val ? true : false);
  }

  function updateMyRequirementsLoadingViewOffers(val: boolean | undefined) {
    setMyRequirementsLoadingViewOffers(val ? true : false);
  }

  function updateSubUserRequirementsViewOffers(val: boolean | undefined) {
    setSubUserRequirementsViewOffers(val ? true : false);
  }

  function updateAllPurchaseOrdersViewOffers(val: boolean | undefined) {
    setAllPurchaseOrdersViewOffers(val ? true : false);
  }

  function updateAllSalesOrdersViewOffers(val: boolean | undefined) {
    setAllSalesOrdersViewOffers(val ? true : false);
  }

  function updateCreateRequirementLoading(val: boolean | undefined) {
    setCreateRequirementLoading(val ? true : false);
  }

  function updateChangeCertificationStateLoading(val: boolean | undefined) {
    setChangeCertificationStateLoading(val ? true : false);
  }

  function updateIdAndActionQueue(id: string, action: Action) {
    setIdAndActionQueue((prev) => ({
      ...prev,
      [id]: action,
    }));
  }

  function deleteFromIdAndActionQueue(id: string) {
    setIdAndActionQueue((prev) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [id]: _, ...rest } = prev;
      return rest;
    });
  }

  return (
    <LoadingDataContext.Provider
      value={{
        myPurchaseOrdersLoadingPdf,
        subUserPurchaseOrdersLoadingPdf,
        allPurchaseOrdersLoadingPdf,
        allSalesOrdersLoadingPdf,
        myRequirementsLoadingViewOffers,
        subUserRequirementsViewOffers,
        allPurchaseOrdersViewOffers,
        allSalesOrdersViewOffers,
        createRequirementLoading,
        changeCertificationStateLoading,
        idAndActionQueue,
        updateMyPurchaseOrdersLoadingPdf,
        updateSubUserPurchaseOrdersLoadingPdf,
        updateAllPurchaseOrdersLoadingPdf,
        updateAllSalesOrdersLoadingPdf,
        updateMyRequirementsLoadingViewOffers,
        updateSubUserRequirementsViewOffers,
        updateAllPurchaseOrdersViewOffers,
        updateAllSalesOrdersViewOffers,
        updateCreateRequirementLoading,
        updateIdAndActionQueue,
        deleteFromIdAndActionQueue,
        updateChangeCertificationStateLoading,
      }}
    >
      {children}
    </LoadingDataContext.Provider>
  );
}
