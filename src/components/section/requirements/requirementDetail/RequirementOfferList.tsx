import { Offer, Requirement } from "../../../../models/MainInterfaces";
import RequirementOfferListItemHeader from "./RequirementOfferListItemHeader";
import RequirementOfferListItemBody from "./RequirementOfferListItemBody";
import { useTranslation } from "react-i18next";
import { useContext, useEffect, useState } from "react";
import {
  CommonFilter,
  OfferState,
  RequirementState,
} from "../../../../utilities/types";
import { requirementDetailContext } from "../../../../contexts/requirementDetailContext";
import { allSelect } from "../../../../utilities/globals";
import { transformToDays } from "../../../../utilities/globalFunctions";

interface RequirementOfferListProps {
  offers: Offer[];
  requirement: Requirement;
  forPurchaseOrder: boolean;
}

export default function RequirementOfferList(props: RequirementOfferListProps) {
  const { t } = useTranslation();
  const { filters } = useContext(requirementDetailContext);
  const [reqCopy, setReqCopy] = useState<Requirement>(props.requirement);
  const [offersCopy, setOffersCopy] = useState<Offer[]>([]);

  useEffect(() => {
    setOffersCopy([...props.offers]);
  }, [props.offers]);

  useEffect(() => {
    console.log("aaaaaaa", filters);
    setOffersCopy(() => {
      let prev = [...props.offers];
      // Ubicación y tiempo de entrega
      if (filters.location != allSelect && filters.deliveryTime == allSelect)
        prev = prev.filter((offer) => offer.location == filters.location);
      else if (
        filters.location == allSelect &&
        filters.deliveryTime != allSelect
      )
        prev = prev.filter(
          (offer) => offer.deliveryTime == filters.deliveryTime
        );
      else if (
        filters.location != allSelect &&
        filters.deliveryTime != allSelect
      ) {
        prev = prev.filter((offer) => offer.location == filters.location);
        prev = prev.filter(
          (offer) => offer.deliveryTime == filters.deliveryTime
        );
      }
      // Precio y garantía
      if (filters.price == CommonFilter.ASC)
        prev.sort((a, b) => a.price - b.price);
      else if (filters.price == CommonFilter.DESC)
        prev.sort((a, b) => b.price - a.price);
      if (filters.warranty == CommonFilter.ASC)
        prev.sort(
          (a, b) =>
            transformToDays(a.warranty, a.warrantyTime) -
            transformToDays(b.warranty, b.warrantyTime)
        );
      else if (filters.warranty == CommonFilter.DESC)
        prev.sort(
          (a, b) =>
            transformToDays(b.warranty, b.warrantyTime) -
            transformToDays(a.warranty, a.warrantyTime)
        );
      return prev;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

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
