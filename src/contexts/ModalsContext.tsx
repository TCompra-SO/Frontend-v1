import { createContext, ReactNode, useState } from "react";
import { Offer, Requirement } from "../models/MainInterfaces";
import { RequirementType } from "../utilities/types";

interface DetailedRequirementModalDataType {
  requirement: Requirement | null;
  requirementId: string;
  requirementType: RequirementType;
}

interface DetailedOfferModalDataType {
  offerId: string;
  offer: Offer | null;
}

interface ViewHistoryModalDataType {
  requirementId: string;
}

interface ModalsContextType {
  detailedRequirementModalData: DetailedRequirementModalDataType;
  detailedOfferModalData: DetailedOfferModalDataType;
  viewHistoryModalData: ViewHistoryModalDataType;
  updateDetailedRequirementModalData: (
    val: DetailedRequirementModalDataType
  ) => void;
  updateDetailedOfferModalData: (val: DetailedOfferModalDataType) => void;
  updateViewHistoryModalData: (val: ViewHistoryModalDataType) => void;
}

export const ModalsContext = createContext<ModalsContextType>({
  detailedRequirementModalData: {
    requirement: null,
    requirementId: "",
    requirementType: RequirementType.GOOD,
  },
  detailedOfferModalData: { offerId: "", offer: null },
  viewHistoryModalData: { requirementId: "" },
  updateDetailedRequirementModalData: () => {},
  updateDetailedOfferModalData: () => {},
  updateViewHistoryModalData: () => {},
});

export function ModalsProvider({ children }: { children: ReactNode }) {
  const [detailedRequirementModalData, setDetailedRequirementModalData] =
    useState<DetailedRequirementModalDataType>({
      requirement: null,
      requirementId: "",
      requirementType: RequirementType.GOOD,
    });
  const [detailedOfferModalData, setDetailedOfferModalData] =
    useState<DetailedOfferModalDataType>({ offerId: "", offer: null });
  const [viewHistoryModalData, setViewHistoryModalData] =
    useState<ViewHistoryModalDataType>({ requirementId: "" });

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

  return (
    <ModalsContext.Provider
      value={{
        detailedRequirementModalData,
        detailedOfferModalData,
        viewHistoryModalData,
        updateDetailedRequirementModalData,
        updateDetailedOfferModalData,
        updateViewHistoryModalData,
      }}
    >
      {children}
    </ModalsContext.Provider>
  );
}
