import {
  OfferListItem,
  RequirementTableItem,
} from "../../../../models/MainInterfaces";
import RequirementOfferListItemHeader from "./RequirementOfferListItemHeader";
import RequirementOfferListItemBody from "./RequirementOfferListItemBody";

interface RequirementOfferListProps {
  offers: OfferListItem[];
  requirement: RequirementTableItem;
}

export default function RequirementOfferList(props: RequirementOfferListProps) {
  return (
    <div className="t-flex gap-15" style={{ flexDirection: "column" }}>
      {props.offers.map((offer: OfferListItem) => {
        return (
          <div key={offer.key} className="card-ofertas">
            <RequirementOfferListItemHeader
              offer={offer}
              requirement={props.requirement}
            />
            <RequirementOfferListItemBody offer={offer} />
          </div>
        );
      })}
    </div>
  );
}
