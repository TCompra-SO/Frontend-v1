import { ReactNode, createContext, useState } from "react";
import { CommonFilter } from "../utilities/types";
import { allSelect } from "../utilities/globals";
import { OfferFilters } from "../models/Interfaces";
import { useTranslation } from "react-i18next";

interface RequirementDetailProps {
  children: ReactNode;
}

export const requirementDetailContext = createContext<{
  filters: OfferFilters;
  updateFilters: (
    newFilters: OfferFilters,
    newNames: { location: string; deliveryTime: string }
  ) => void;
  filterNames: { location: string; deliveryTime: string };
}>({
  filters: {
    price: CommonFilter.ALL,
    location: allSelect,
    deliveryTime: allSelect,
    warranty: CommonFilter.ALL,
  },
  updateFilters: () => {},
  filterNames: {
    location: "",
    deliveryTime: "",
  },
});

export function RequirementDetailProvider({
  children,
}: RequirementDetailProps) {
  const { t } = useTranslation();
  const [filters, setFilters] = useState({
    price: CommonFilter.ALL,
    location: allSelect,
    deliveryTime: allSelect,
    warranty: CommonFilter.ALL,
  });

  const [filterNames, setFilterNames] = useState({
    location: t("all"),
    deliveryTime: t("all"),
  });

  function updateFilters(
    newFilters: OfferFilters,
    newNames: { location: string; deliveryTime: string }
  ) {
    setFilters(newFilters);
    setFilterNames(newNames);
  }

  return (
    <requirementDetailContext.Provider
      value={{
        filters,
        updateFilters,
        filterNames,
      }}
    >
      {children}
    </requirementDetailContext.Provider>
  );
}
