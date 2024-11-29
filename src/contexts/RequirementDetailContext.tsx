import { createContext } from "react";
import { CommonFilter } from "../utilities/types";
import { allSelect } from "../utilities/globals";
import { OfferFilters } from "../models/Interfaces";

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
