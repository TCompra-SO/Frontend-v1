import { OfferListItem } from "../../../../models/MainInterfaces";
import { dateFormat, defaultCountry } from "../../../../utilities/globals";

import { useTranslation } from "react-i18next";
import { Coins, TimeMeasurement, UserTable } from "../../../../utilities/types";
import { ListsContext } from "../../../../contexts/listsContext";
import { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import { IdValueMap, IdValueObj } from "../../../../models/Interfaces";
import { Image } from "antd";

interface RequirementOfferListItemBodyProps {
  offer: OfferListItem;
}

export default function RequirementOfferListItemBody(
  props: RequirementOfferListItemBodyProps
) {
  const { t } = useTranslation();
  const [previewOpen, setPreviewOpen] = useState(false);

  const context = useContext(ListsContext);
  const { currencyList, deliveryTimeList, countryData } = context;
  const [cities, setCities] = useState<IdValueMap>({});

  useEffect(() => {
    if (countryData && countryData[defaultCountry]) {
      const loadedCities = countryData[defaultCountry].cities.reduce(
        (acc: IdValueMap, { id, value }: IdValueObj) => {
          acc[id] = { value };
          return acc;
        },
        {}
      );
      setCities(loadedCities);
    }
  }, [countryData]);

  return (
    <div className="t-flex body-ofertas">
      <div className="t-flex t-wrap tags-oferta">
        <div className="tag-gray">
          {cities[props.offer.location]?.value ?? null}
        </div>
        {props.offer.user.userTable == UserTable.COMPANY && (
          <div className="tag-gray">
            {t("tenure")}: {props.offer.user.tenure} {t("years")}
          </div>
        )}
        <div className="tag-gray">
          {t("delivery")}:{" "}
          {deliveryTimeList && deliveryTimeList[props.offer.deliveryTime]
            ? deliveryTimeList[props.offer.deliveryTime].value
            : null}
        </div>
        <div className="tag-gray">
          {t("warranty")}: {props.offer.warranty}{" "}
          {props.offer.warrantyTime == TimeMeasurement.DAYS
            ? t("days")
            : props.offer.warrantyTime == TimeMeasurement.MONTHS
            ? t("months")
            : t("years")}
        </div>
        <div className="tag-gray">{props.offer.user.email}</div>
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
        <div className="t-flex multimedia">
          {props.offer.image && props.offer.image.length > 0 && (
            <Image.PreviewGroup
              items={props.offer.image}
              preview={{
                visible: previewOpen,
                onVisibleChange: (visible) => setPreviewOpen(visible),
              }}
            />
          )}
          <div className="t-flex">
            <i
              className="fa-regular fa-images multi-datos"
              onClick={() => {
                if (props.offer.image && props.offer.image.length > 0)
                  setPreviewOpen(true);
              }}
            ></i>
            <div className="multi-back"></div>
            <div className="multi-cantidad">
              {props.offer.image ? props.offer.image.length : 0}
            </div>
          </div>
          <div className="t-flex">
            <i className="fa-regular fa-file-lines multi-datos"></i>
            <div className="multi-back"></div>
            <div className="multi-cantidad">
              {props.offer.document ? props.offer.document.length : 0}
            </div>
          </div>
        </div>
        <b className="precio-oferta">
          {currencyList && currencyList[props.offer.coin]
            ? Coins[currencyList[props.offer.coin].alias]
            : null}{" "}
          {props.offer.price}
        </b>
      </div>
    </div>
  );
}
