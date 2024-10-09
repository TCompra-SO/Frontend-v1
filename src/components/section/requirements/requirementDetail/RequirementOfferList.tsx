import { Offer, Requirement } from "../../../../models/MainInterfaces";
import RequirementOfferListItemHeader from "./RequirementOfferListItemHeader";
import RequirementOfferListItemBody from "./RequirementOfferListItemBody";

interface RequirementOfferListProps {
  offers: Offer[];
  requirement: Requirement;
  forPurchaseOrder: boolean;
}

export default function RequirementOfferList(props: RequirementOfferListProps) {
  return (
    <div className="t-flex gap-15" style={{ flexDirection: "column" }}>
      {props.offers.map((offer: Offer) => {
        return (
          <div key={offer.key} className="card-ofertas">
            <RequirementOfferListItemHeader
              offer={offer}
              showStateAndActions={{
                show: !props.forPurchaseOrder,
                requirement: props.requirement,
              }}
            />
            <RequirementOfferListItemBody offer={offer} showUserData={true} />
          </div>
        );
      })}
    </div>
  );
}
