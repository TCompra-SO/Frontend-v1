import { ReactNode, useState } from "react";
import { OfferFilters } from "../models/Interfaces";
import { requirementDetailContext } from "./RequirementDetailContext";
import { CommonFilter } from "../utilities/types";
import { allSelect } from "../utilities/globals";
import { useTranslation } from "react-i18next";

interface RequirementDetailProps {
  children: ReactNode;
}

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
