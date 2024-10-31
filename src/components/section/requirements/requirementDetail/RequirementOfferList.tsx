import { Offer, Requirement } from "../../../../models/MainInterfaces";
import RequirementOfferListItemHeader from "./RequirementOfferListItemHeader";
import RequirementOfferListItemBody from "./RequirementOfferListItemBody";
import { useTranslation } from "react-i18next";

interface RequirementOfferListProps {
  offers: Offer[];
  requirement: Requirement;
  forPurchaseOrder: boolean;
}

export default function RequirementOfferList(props: RequirementOfferListProps) {
  const { t } = useTranslation();

  if (props.offers.length > 0)
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
  else
    return (
      <div className="card-gray">
        <div className="ofertas-recib">{t("thereAreNoOffers")}</div>
      </div>
    );
}
