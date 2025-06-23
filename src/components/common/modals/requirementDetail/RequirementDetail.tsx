import RequirementInfo from "./RequirementInfo";
import RequirementOfferFilters from "./RequirementOfferFilters";
import RequirementOfferList from "./RequirementOfferList";

import { Offer, Requirement } from "../../../../models/MainInterfaces";
import { ModalContent, OfferFilters } from "../../../../models/Interfaces";
import { RequirementDetailProvider } from "../../../../contexts/RequirementDetailProvider";
import { RequirementDetailType } from "../../../../utilities/types";

interface RequirementDetailProps {
  offerList: Offer[];
  requirement: Requirement;
  type: RequirementDetailType;
  filters?: OfferFilters;
  orderId?: string;
  onClose: () => any;
  setDataModalSelectOffer?: (val: ModalContent) => void;
  setIsOpenModalSelectOffer?: (val: boolean) => void;
}

export default function RequirementDetail(props: RequirementDetailProps) {
  return (
    <RequirementDetailProvider>
      <div className="modal-card">
        <div className="detalle-oferta">
          <RequirementInfo requirement={props.requirement}></RequirementInfo>

          {props.offerList.length > 0 && (
            <RequirementOfferFilters
              type={props.type}
              filters={props.filters}
            ></RequirementOfferFilters>
          )}

          <RequirementOfferList
            offers={props.offerList}
            requirement={props.requirement}
            type={props.type}
            onClose={props.onClose}
            setDataModalSelectOffer={props.setDataModalSelectOffer}
            setIsOpenModalSelectOffer={props.setIsOpenModalSelectOffer}
            orderId={props.orderId}
          />
        </div>
      </div>
    </RequirementDetailProvider>
  );
}
