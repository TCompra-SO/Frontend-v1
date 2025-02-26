import { createContext, ReactNode, useState } from "react";
import { Offer, Requirement } from "../models/MainInterfaces";
import { RequirementType } from "../utilities/types";
import { OfferFilters } from "../models/Interfaces";

interface DetailedRequirementModalDataType {
  requirement: Requirement | undefined;
  requirementId: string;
  requirementType: RequirementType;
}

interface DetailedOfferModalDataType {
  offerId: string;
  offerType: RequirementType;
  offer: Offer | undefined;
}

interface ViewHistoryModalDataType extends DetailedRequirementModalDataType {
  filters?: OfferFilters;
  purchaseOrderId: string;
}

interface DownloadPdfOrderType {
  orderId: string;
  type: RequirementType;
}

interface ModalsContextType {
  detailedRequirementModalData: DetailedRequirementModalDataType;
  detailedOfferModalData: DetailedOfferModalDataType;
  viewHistoryModalData: ViewHistoryModalDataType;
  viewHistorySalesModalData: ViewHistoryModalDataType;
  downloadPdfOrderData: DownloadPdfOrderType;
  updateDetailedRequirementModalData: (
    val: DetailedRequirementModalDataType
  ) => void;
  updateDetailedOfferModalData: (val: DetailedOfferModalDataType) => void;
  updateViewHistoryModalData: (val: ViewHistoryModalDataType) => void;
  updateViewHistorySalesModalData: (val: ViewHistoryModalDataType) => void;
  updateDownloadPdfOrderData: (val: DownloadPdfOrderType) => void;
  resetDetailedRequirementModalData: () => void;
  resetDetailedOfferModalData: () => void;
  resetViewHistoryModalData: () => void;
  resetViewHistorySalesModalData: () => void;
  resetDownloadPdfOrderData: () => void;
}

export const ModalsContext = createContext<ModalsContextType>({
  detailedRequirementModalData: {
    requirement: undefined,
    requirementId: "",
    requirementType: RequirementType.GOOD,
  },
  detailedOfferModalData: {
    offerId: "",
    offerType: RequirementType.GOOD,
    offer: undefined,
  },
  viewHistoryModalData: {
    requirement: undefined,
    requirementId: "",
    requirementType: RequirementType.GOOD,
    purchaseOrderId: "",
  },
  viewHistorySalesModalData: {
    requirement: undefined,
    requirementId: "",
    requirementType: RequirementType.GOOD,
    purchaseOrderId: "",
  },
  downloadPdfOrderData: {
    orderId: "",
    type: RequirementType.GOOD,
  },
  updateDetailedRequirementModalData: () => {},
  updateDetailedOfferModalData: () => {},
  updateViewHistoryModalData: () => {},
  updateViewHistorySalesModalData: () => {},
  updateDownloadPdfOrderData: () => {},
  resetDetailedRequirementModalData: () => {},
  resetDetailedOfferModalData: () => {},
  resetViewHistoryModalData: () => {},
  resetViewHistorySalesModalData: () => {},
  resetDownloadPdfOrderData: () => {},
});

export function ModalsProvider({ children }: { children: ReactNode }) {
  const [detailedRequirementModalData, setDetailedRequirementModalData] =
    useState<DetailedRequirementModalDataType>(
      getInitialDetailedRequirementModalData()
    );
  const [detailedOfferModalData, setDetailedOfferModalData] =
    useState<DetailedOfferModalDataType>(getInitialDetailedOfferModalData());
  const [viewHistoryModalData, setViewHistoryModalData] =
    useState<ViewHistoryModalDataType>(getInitialViewHistoryModalData());
  const [viewHistorySalesModalData, setViewHistorySalesModalData] =
    useState<ViewHistoryModalDataType>(getInitialViewHistorySalesModalData());
  const [downloadPdfOrderData, setDownloadPdfOrderData] =
    useState<DownloadPdfOrderType>(getInitialDownloadPdfOrderData());

  function getInitialDetailedRequirementModalData(): DetailedRequirementModalDataType {
    return {
      requirement: undefined,
      requirementId: "",
      requirementType: RequirementType.GOOD,
    };
  }

  function getInitialDetailedOfferModalData(): DetailedOfferModalDataType {
    return {
      offerId: "",
      offerType: RequirementType.GOOD,
      offer: undefined,
    };
  }

  function getInitialViewHistoryModalData(): ViewHistoryModalDataType {
    return {
      requirement: undefined,
      requirementId: "",
      requirementType: RequirementType.GOOD,
      purchaseOrderId: "",
    };
  }

  function getInitialViewHistorySalesModalData(): ViewHistoryModalDataType {
    return {
      requirement: undefined,
      requirementId: "",
      requirementType: RequirementType.GOOD,
      purchaseOrderId: "",
    };
  }

  function getInitialDownloadPdfOrderData(): DownloadPdfOrderType {
    return {
      orderId: "",
      type: RequirementType.GOOD,
    };
  }

  function updateDetailedRequirementModalData(
    val: DetailedRequirementModalDataType
  ) {
    setDetailedRequirementModalData(val);
  }

  function updateDetailedOfferModalData(val: DetailedOfferModalDataType) {
    setDetailedOfferModalData(val);
  }

  function updateViewHistoryModalData(val: ViewHistoryModalDataType) {
    setViewHistoryModalData(val);
  }

  function updateViewHistorySalesModalData(val: ViewHistoryModalDataType) {
    setViewHistorySalesModalData(val);
  }

  function updateDownloadPdfOrderData(val: DownloadPdfOrderType) {
    setDownloadPdfOrderData(val);
  }

  function resetDetailedRequirementModalData() {
    setDetailedRequirementModalData(getInitialDetailedRequirementModalData());
  }

  function resetDetailedOfferModalData() {
    setDetailedOfferModalData(getInitialDetailedOfferModalData());
  }

  function resetViewHistoryModalData() {
    setViewHistoryModalData(getInitialViewHistoryModalData());
  }

  function resetViewHistorySalesModalData() {
    setViewHistorySalesModalData(getInitialViewHistorySalesModalData());
  }

  function resetDownloadPdfOrderData() {
    setDownloadPdfOrderData(getInitialDownloadPdfOrderData());
  }

  return (
    <ModalsContext.Provider
      value={{
        detailedRequirementModalData,
        detailedOfferModalData,
        viewHistoryModalData,
        viewHistorySalesModalData,
        downloadPdfOrderData,
        updateDetailedRequirementModalData,
        updateDetailedOfferModalData,
        updateViewHistoryModalData,
        updateViewHistorySalesModalData,
        updateDownloadPdfOrderData,
        resetDetailedRequirementModalData,
        resetDetailedOfferModalData,
        resetViewHistoryModalData,
        resetViewHistorySalesModalData,
        resetDownloadPdfOrderData,
      }}
    >
      {children}
    </ModalsContext.Provider>
  );
}
