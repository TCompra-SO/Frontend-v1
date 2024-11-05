import { Offer, Requirement } from "../../../../models/MainInterfaces";
import RequirementOfferListItemHeader from "./RequirementOfferListItemHeader";
import RequirementOfferListItemBody from "./RequirementOfferListItemBody";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { OfferState, RequirementState } from "../../../../utilities/types";

interface RequirementOfferListProps {
  offers: Offer[];
  requirement: Requirement;
  forPurchaseOrder: boolean;
}

export default function RequirementOfferList(props: RequirementOfferListProps) {
  const { t } = useTranslation();
  const [reqCopy, setReqCopy] = useState<Requirement>(props.requirement);
  const [offersCopy, setOffersCopy] = useState<Offer[]>([]);

  useEffect(() => {
    setOffersCopy([...props.offers]);
  }, [props.offers]);

  function handleSuccessfulSelection(offerId: string) {
    setReqCopy((prevObject) => ({
      ...prevObject,
      state: RequirementState.SELECTED,
    }));
    setOffersCopy((prev) => {
      const indexToUpdate = prev.findIndex((offer) => offer.key === offerId);
      if (indexToUpdate !== -1) {
        prev[indexToUpdate] = {
          ...prev[indexToUpdate],
          state: OfferState.WINNER,
        };
      }
      return prev;
    });
  }

  if (offersCopy.length > 0)
    return (
      <div className="t-flex gap-15" style={{ flexDirection: "column" }}>
        {offersCopy.map((offer: Offer) => {
          return (
            <div key={offer.key} className="card-ofertas">
              <RequirementOfferListItemHeader
                offer={offer}
                showStateAndActions={{
                  show: !props.forPurchaseOrder,
                  requirement: reqCopy,
                  onSuccessfulSelection: handleSuccessfulSelection,
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
