import { Offer, Requirement } from "../../../../models/MainInterfaces";
import RequirementOfferListItemHeader from "./RequirementOfferListItemHeader";
import RequirementOfferListItemBody from "./RequirementOfferListItemBody";
import { useTranslation } from "react-i18next";
import { useContext, useEffect, useState } from "react";
import {
  CommonFilter,
  OfferState,
  RequirementDetailType,
  RequirementState,
} from "../../../../utilities/types";
import { requirementDetailContext } from "../../../../contexts/RequirementDetailContext";
import { allSelect, pageSizeOfferList } from "../../../../utilities/globals";
import { transformToDays } from "../../../../utilities/globalFunctions";
import { ModalContent } from "../../../../models/Interfaces";
import { Flex, Pagination } from "antd";

interface RequirementOfferListProps {
  offers: Offer[];
  requirement: Requirement;
  type: RequirementDetailType;
  onClose: () => any;
  setDataModalSelectOffer?: (val: ModalContent) => void;
  setIsOpenModalSelectOffer?: (val: boolean) => void;
  orderId?: string;
}

export default function RequirementOfferList(props: RequirementOfferListProps) {
  const { t } = useTranslation();
  const { filters } = useContext(requirementDetailContext);
  const [reqCopy, setReqCopy] = useState<Requirement>(props.requirement);
  const [offersCopy, setOffersCopy] = useState<Offer[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(pageSizeOfferList);

  useEffect(() => {
    setOffersCopy([...props.offers]);
  }, [props.offers]);

  useEffect(() => {
    setOffersCopy(() => {
      let prev: Offer[] = [...props.offers];
      let unmatchedOffers: Offer[] = [];
      // Ubicación y tiempo de entrega
      if (filters.location != allSelect && filters.deliveryTime == allSelect) {
        const { matched, unmatched } = filterOffers(
          prev,
          (offer) => offer.location == filters.location
        );
        prev = matched;
        unmatchedOffers = unmatched;
      } else if (
        filters.location == allSelect &&
        filters.deliveryTime != allSelect
      ) {
        const { matched, unmatched } = filterOffers(
          prev,
          (offer) => offer.deliveryTime == filters.deliveryTime
        );
        prev = matched;
        unmatchedOffers = unmatched;
      } else if (
        filters.location != allSelect &&
        filters.deliveryTime != allSelect
      ) {
        const { matched, unmatched } = filterOffers(
          prev,
          (offer) =>
            offer.location == filters.location &&
            offer.deliveryTime == filters.deliveryTime
        );
        prev = matched;
        unmatchedOffers = unmatched;
      }
      // Precio y garantía
      if (filters.price == CommonFilter.ASC)
        prev.sort((a, b) => a.price - b.price);
      else if (filters.price == CommonFilter.DESC)
        prev.sort((a, b) => b.price - a.price);
      if (filters.warranty == CommonFilter.ASC)
        prev.sort((a, b) => {
          const aVal =
            a.warranty && a.warrantyTime !== undefined
              ? transformToDays(a.warranty, a.warrantyTime)
              : -Infinity;
          const bVal =
            b.warranty && b.warrantyTime !== undefined
              ? transformToDays(b.warranty, b.warrantyTime)
              : -Infinity;
          return aVal - bVal;
        });
      else if (filters.warranty == CommonFilter.DESC)
        prev.sort((a, b) => {
          const aVal =
            a.warranty && a.warrantyTime !== undefined
              ? transformToDays(a.warranty, a.warrantyTime)
              : Infinity;
          const bVal =
            b.warranty && b.warrantyTime !== undefined
              ? transformToDays(b.warranty, b.warrantyTime)
              : Infinity;
          return bVal - aVal;
        });
      return props.type == RequirementDetailType.ORDER
        ? prev.concat(unmatchedOffers)
        : prev;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  function filterOffers(
    offers: Offer[],
    condition: (offer: Offer) => boolean
  ): { matched: Offer[]; unmatched: Offer[] } {
    return offers.reduce(
      (acc: { matched: Offer[]; unmatched: Offer[] }, offer) => {
        if (condition(offer)) {
          acc.matched.push(offer);
        } else {
          acc.unmatched.push(offer);
        }
        return acc;
      },
      { matched: [], unmatched: [] }
    );
  }

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

  function handleCancelSuccess(offerId: string) {
    setReqCopy((prevObject) => ({
      ...prevObject,
      state: RequirementState.PUBLISHED,
    }));
    setOffersCopy((prev) => {
      const indexToUpdate = prev.findIndex((offer) => offer.key === offerId);
      if (indexToUpdate !== -1) {
        prev[indexToUpdate] = {
          ...prev[indexToUpdate],
          state: OfferState.CANCELED,
        };
      }
      return prev;
    });
  }

  function handleRateCancel(offerId: string, showOption?: boolean) {
    setOffersCopy((prev) => {
      const indexToUpdate = prev.findIndex((offer) => offer.key === offerId);
      if (indexToUpdate !== -1) {
        prev[indexToUpdate] = {
          ...prev[indexToUpdate],
          cancelRated: showOption ? false : true,
        };
      }
      return prev;
    });
  }

  function onChangePage(page: number) {
    setCurrentPage(page);
    const stIndex = (page - 1) * pageSizeOfferList;
    setStartIndex(stIndex);
    setEndIndex(stIndex + pageSizeOfferList);
  }

  if (offersCopy.length > 0)
    return (
      <div className="t-flex gap-15" style={{ flexDirection: "column" }}>
        {offersCopy
          .slice(startIndex, endIndex)
          .map((offer: Offer, index: number) => {
            return (
              <div key={`${offer.key}${index}`} className="card-ofertas">
                <RequirementOfferListItemHeader
                  offer={offer}
                  showActions={{
                    type: props.type,
                    requirement: reqCopy,
                    onSelectionSuccess: handleSuccessfulSelection,
                    onCancelSuccess: handleCancelSuccess,
                    onRateCancel: handleRateCancel,
                    notificationTargetData: {
                      receiverId: offer.subUser?.uid ?? offer.user.uid,
                      targetId: offer.key,
                      targetType: offer.type,
                    },
                    requirementTitle: props.requirement.title,
                    orderId: props.orderId,
                  }}
                  onClose={props.onClose}
                  requirementId={props.requirement.key}
                  requirementTitle={props.requirement.title}
                  setDataModalSelectOffer={props.setDataModalSelectOffer}
                  setIsOpenModalSelectOffer={props.setIsOpenModalSelectOffer}
                />
                <RequirementOfferListItemBody
                  offer={offer}
                  showUserData={true}
                />
              </div>
            );
          })}
        {offersCopy.length > 0 && (
          <Flex justify="center">
            <Pagination
              size="small"
              total={offersCopy.length}
              onChange={onChangePage}
              // showTotal={(total) => `${total}`}
              pageSize={pageSizeOfferList}
              current={currentPage}
              hideOnSinglePage={true}
            />
          </Flex>
        )}
      </div>
    );
  else
    return (
      <div className="card-gray">
        <div className="ofertas-recib">{t("thereAreNoOffers")}</div>
      </div>
    );
}
