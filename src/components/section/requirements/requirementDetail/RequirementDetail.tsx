import RequirementInfo from "./RequirementInfo";
import RequirementOfferFilters from "./RequirementOfferFilters";
import RequirementOfferList from "./RequirementOfferList";

import { Offer, Requirement } from "../../../../models/MainInterfaces";
import { SyntheticEvent } from "react";
import { OfferFilterTypes } from "../../../../utilities/types";
import { RequirementDetailProvider } from "../../../../contexts/requirementDetailContext";
import { OfferFilters } from "../../../../models/Interfaces";

interface RequirementDetailProps {
  offerList: Offer[];
  requirement: Requirement;
  forPurchaseOrder: boolean;
  filters?: OfferFilters;
  onClose: (e: SyntheticEvent<Element, Event>) => any;
}

export default function RequirementDetail(props: RequirementDetailProps) {
  function HandleonFilterChange(filterType: OfferFilterTypes, value: any) {
    console.log("Cambio en filtro", filterType, value);
  }

  return (
    <RequirementDetailProvider>
      <div className="modal-card">
        <div className="detalle-oferta">
          <RequirementInfo requirement={props.requirement}></RequirementInfo>

          <RequirementOfferFilters
            onFilterChange={HandleonFilterChange}
            fromPurchaseOrder={props.forPurchaseOrder}
            filters={props.filters}
          ></RequirementOfferFilters>

          <RequirementOfferList
            offers={props.offerList}
            requirement={props.requirement}
            forPurchaseOrder={props.forPurchaseOrder}
          />
        </div>
      </div>
    </RequirementDetailProvider>
  );
}
