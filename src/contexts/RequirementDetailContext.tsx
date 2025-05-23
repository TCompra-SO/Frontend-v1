import { createContext } from "react";
import { CommonFilter } from "../utilities/types";
import { allSelect } from "../utilities/globals";
import { FilterNames, OfferFilters } from "../models/Interfaces";

export const requirementDetailContext = createContext<{
  filters: OfferFilters;
  updateFilters: (newFilters: OfferFilters, newNames: FilterNames) => void;
  filterNames: FilterNames;
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
