import RequirementInfo from "./RequirementInfo";
import RequirementOfferFilters from "./RequirementOfferFilters";
import RequirementOfferList from "./RequirementOfferList";

import {
  OfferListItem,
  RequirementTableItem,
} from "../../../../models/MainInterfaces";
import { SyntheticEvent } from "react";
import { OfferFilterTypes } from "../../../../utilities/types";
import { RequirementDetailProvider } from "../../../../contexts/requirementDetailContext";

interface RequirementDetailProps {
  offerList: OfferListItem[];
  requirement: RequirementTableItem;
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
          ></RequirementOfferFilters>

          <RequirementOfferList
            offers={props.offerList}
            requirement={props.requirement}
          />
        </div>
      </div>
    </RequirementDetailProvider>
  );
}
