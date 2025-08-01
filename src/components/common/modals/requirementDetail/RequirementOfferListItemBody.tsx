import { Offer } from "../../../../models/MainInterfaces";
import { dateFormat, defaultCountry } from "../../../../utilities/globals";

import { useTranslation } from "react-i18next";
import {
  TimeMeasurement,
  EntityType,
  RequirementType,
} from "../../../../utilities/types";
import { ListsContext } from "../../../../contexts/ListsContext";
import { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import { IdValueMap } from "../../../../models/Interfaces";
import PriceInHeader from "../../utils/PriceInHeader";
import ImagesAndDocs from "../../utils/ImagesAndDocs";
import { getCityObj } from "../../../../utilities/globalFunctions";

interface RequirementOfferListItemBodyProps {
  offer: Offer;
  showUserData: boolean;
}

export default function RequirementOfferListItemBody(
  props: RequirementOfferListItemBodyProps
) {
  const { t } = useTranslation();

  const context = useContext(ListsContext);
  const { deliveryTimeData, countryData } = context;
  const [cities, setCities] = useState<IdValueMap>({});

  useEffect(() => {
    if (countryData && countryData[defaultCountry]) {
      setCities(getCityObj(countryData, defaultCountry));
    }
  }, [countryData]);

  return (
    <div className="t-flex body-ofertas">
      <div className="t-flex t-wrap tags-oferta">
        {cities[props.offer.location] && (
          <div className="tag-gray">{cities[props.offer.location].value}</div>
        )}
        {props.showUserData &&
          props.offer.user.typeEntity == EntityType.COMPANY && (
            <div className="tag-gray">
              {t("tenure")}: {props.offer.user.tenure} {t("years")}
            </div>
          )}
        {deliveryTimeData &&
          props.offer.deliveryTime &&
          deliveryTimeData[props.offer.deliveryTime] && (
            <div className="tag-gray">
              {t("delivery")}:{" "}
              {deliveryTimeData[props.offer.deliveryTime].value}
            </div>
          )}

        {(props.offer.type == RequirementType.GOOD ||
          props.offer.type == RequirementType.SERVICE) &&
          (props.offer.warranty && props.offer.warrantyTime !== undefined ? (
            <div className="tag-gray">
              {t("warranty")}: {props.offer.warranty}{" "}
              {props.offer.warrantyTime == TimeMeasurement.DAYS
                ? t("days")
                : props.offer.warrantyTime == TimeMeasurement.MONTHS
                ? t("months")
                : t("years")}
            </div>
          ) : (
            <div className="tag-gray">
              {t("warranty")}: {t("no")}
            </div>
          ))}
        {props.showUserData && (
          <div className="tag-gray">
            {props.offer.subUser
              ? props.offer.subUser.email
              : props.offer.user.email}
          </div>
        )}
        <div className="tag-gray-2">
          {t("igv")}: {props.offer.igv ? t("yes") : t("no")}
        </div>
        {props.offer.selectionDate && (
          <div className="tag-default">
            {t("selectionDate")}:{" "}
            {dayjs(props.offer.selectionDate).format(dateFormat)}
          </div>
        )}
      </div>

      <div className="multimedia-oferta">
        <ImagesAndDocs
          image={props.offer.image}
          document={props.offer.document}
        />
        <PriceInHeader
          coin={props.offer.coin}
          price={props.offer.price}
          useOfferClass={true}
        />
      </div>
    </div>
  );
}
