import { OfferListItem } from "../../../../models/MainInterfaces";
import { useTranslation } from "react-i18next";
import FrontImage from "../../../common/FrontImage";
import RequirementInfoNoTags from "../../requirements/requirementDetail/RequirementInfoNoTags";
import { useContext, useEffect, useState } from "react";
import { IdValueMap, IdValueObj } from "../../../../models/Interfaces";
import { ListsContext } from "../../../../contexts/listsContext";
import { dateFormat, defaultCountry } from "../../../../utilities/globals";
import dayjs from "dayjs";
import PriceInHeader from "../../../common/PriceInHeader";
import OfferDetailRequirementData from "./OfferDetailRequirementData";

interface OfferDetailModalProps {
  offer: OfferListItem;
}

export default function OfferDetailModal(props: OfferDetailModalProps) {
  const { t } = useTranslation();
  const context = useContext(ListsContext);
  const { countryData, deliveryTimeList } = context;
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
    <div className="modal-card">
      <div className="detalle-oferta">
        <div className="t-flex gap-15 requerimiento-o">
          <FrontImage image={props.offer.image} isUser={false} />
          <div className="t-flex detalle-req">
            <RequirementInfoNoTags
              title={props.offer.title}
              user={props.offer.user}
              type={props.offer.type}
              subUser={props.offer.subUser}
              description={props.offer.description}
            />
            <div className="t-flex tags-req t-wrap">
              {cities[props.offer.location] && (
                <div className="badge-grey-border">
                  {cities[props.offer.location].value}
                </div>
              )}
              <div className="badge-grey-border">
                {t("published")}:{" "}
                {dayjs(props.offer.publishDate).format(dateFormat)}
              </div>
              {deliveryTimeList &&
                deliveryTimeList[props.offer.deliveryTime] && (
                  <div className="badge-grey-border">
                    {t("deliveryTime")}:{" "}
                    {deliveryTimeList[props.offer.deliveryTime].value}
                  </div>
                )}
            </div>
            <div className="t-flex tags-req t-wrap">
              <PriceInHeader
                coin={props.offer.coin}
                price={props.offer.price}
                useOfferClass={false}
              />
              {props.offer.deliveryDate && (
                <div className="badge-default-border">
                  {t("deliveryDate")}:{" "}
                  {dayjs(props.offer.deliveryDate).format(dateFormat)}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="t-flex gap-15" style={{ flexDirection: "column" }}>
          <div className="card-ofertas">
            <div className="t-flex" style={{ alignItems: "center" }}>
              <OfferDetailRequirementData />
              <div className="multimedia-oferta">
                <div className="t-flex multimedia">
                  <div className="t-flex">
                    <i className="fa-regular fa-images multi-datos"></i>
                    <div className="multi-back"></div>
                    <div className="multi-cantidad">10</div>
                  </div>
                  <div className="t-flex">
                    <i className="fa-regular fa-file-lines multi-datos"></i>
                  </div>
                  <div className="t-flex">
                    <i className="fa-regular fa-comment multi-chat"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="t-flex gap-15 estado-oferta">
          <div className="card-red wd-50">
            <i className="fa-solid fa-ban"></i> Oferta Cancelada
          </div>
          <div className="card-gray-m wd-50">
            <i className="fa-regular fa-person-dolly-empty"></i> No Entregado
          </div>
        </div>
        <div className="t-flex gap-15 estado-oferta">
          <div className="card-green wd-50">
            <i className="fa-regular fa-circle-check"></i> Oferta Elegida
          </div>
          <div className="card-gray-m wd-50">
            <i className="fa-regular fa-person-dolly"></i> Entregado
          </div>
        </div>
      </div>
    </div>
  );
}
