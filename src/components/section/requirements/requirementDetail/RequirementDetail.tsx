import RequirementInfo from "./RequirementInfo";
import RequirementOfferFilters from "./RequirementOfferFilters";
import RequirementOfferList from "./RequirementOfferList";

import { Offer, Requirement } from "../../../../models/MainInterfaces";
import { OfferFilters } from "../../../../models/Interfaces";
import { RequirementDetailProvider } from "../../../../contexts/RequirementDetailProvider";

interface RequirementDetailProps {
  offerList: Offer[];
  requirement: Requirement;
  forPurchaseOrder: boolean;
  filters?: OfferFilters;
  onClose: () => any;
}

export default function RequirementDetail(props: RequirementDetailProps) {
  return (
    <RequirementDetailProvider>
      <div className="modal-card">
        <div className="detalle-oferta">
          <RequirementInfo requirement={props.requirement}></RequirementInfo>

          {props.offerList.length > 0 && (
            <RequirementOfferFilters
              fromPurchaseOrder={props.forPurchaseOrder}
              filters={props.filters}
            ></RequirementOfferFilters>
          )}

          <RequirementOfferList
            offers={props.offerList}
            requirement={props.requirement}
            forPurchaseOrder={props.forPurchaseOrder}
            onClose={props.onClose}
          />
        </div>
      </div>
    </RequirementDetailProvider>
  );
}
