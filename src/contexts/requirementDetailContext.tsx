import { createContext } from "react";
import { PriceFilter, WarrantyFilter } from "../utilities/types";
import { allSelect } from "../utilities/globals";
import { OfferFilters } from "../models/Interfaces";

export const requirementDetailContext = createContext<{
  filters: OfferFilters;
  updateFilters: (newFilters: OfferFilters) => void;
}>({
  filters: {
    price: PriceFilter.ALL,
    location: allSelect,
    deliveryTime: allSelect,
    warranty: WarrantyFilter.ALL,
  },
  updateFilters: () => {},
});
