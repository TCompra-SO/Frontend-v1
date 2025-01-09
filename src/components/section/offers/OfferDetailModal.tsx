import { BasicRateData, Offer } from "../../../models/MainInterfaces";
import { useTranslation } from "react-i18next";
import FrontImage from "../../common/utils/FrontImage";
import RequirementInfoNoTags from "../requirements/requirementDetail/RequirementInfoNoTags";
import { useContext, useEffect, useState } from "react";
import { IdValueMap, IdValueObj } from "../../../models/Interfaces";
import { ListsContext } from "../../../contexts/ListsContext";
import { dateFormat, defaultCountry } from "../../../utilities/globals";
import dayjs from "dayjs";
import PriceInHeader from "../../common/utils/PriceInHeader";
import OfferDetailRequirementData from "./OfferDetailRequirementData";
import ImagesAndDocs from "../../common/utils/ImagesAndDocs";
import { CardByStateOffer } from "../../../utilities/colors";
import { MainState } from "../../../models/Redux";
import { useSelector } from "react-redux";

interface OfferDetailModalProps {
  offer: Offer;
  basicRateData: BasicRateData;
}

export default function OfferDetailModal(props: OfferDetailModalProps) {
  const { t } = useTranslation();
  const context = useContext(ListsContext);
  const { countryData, deliveryTimeData } = context;
  const [cities, setCities] = useState<IdValueMap>({});
  const uid = useSelector((state: MainState) => state.user.uid);

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

  function goToChat() {
    console.log(
      "go to chat",
      props.offer.subUser && uid == props.offer.subUser.uid,
      props.offer.user.uid == uid,
      (props.offer.subUser && uid == props.offer.subUser.uid) ||
        props.offer.user.uid == uid
    );
  }

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
                  {cities[props.offer.location]?.value}
                </div>
              )}
              <div className="badge-grey-border">
                {t("published")}:{" "}
                {dayjs(props.offer.publishDate).format(dateFormat)}
              </div>
              {deliveryTimeData &&
                deliveryTimeData[props.offer.deliveryTime] && (
                  <div className="badge-grey-border">
                    {t("deliveryTime")}:{" "}
                    {deliveryTimeData[props.offer.deliveryTime]?.value}
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
              <OfferDetailRequirementData
                requirementTitle={props.offer.requirementTitle}
                type={props.offer.type}
                isOffer={false}
                basicRateData={props.basicRateData}
              />
              <div className="multimedia-oferta">
                <ImagesAndDocs
                  image={props.offer.image}
                  document={props.offer.document}
                  showChat
                  goToChat={
                    props.offer.subUser
                      ? uid == props.offer.subUser.uid
                        ? goToChat
                        : undefined
                      : props.offer.user.uid == uid
                      ? goToChat
                      : undefined
                  } // r3v
                />
              </div>
            </div>
          </div>
        </div>
        <div className="t-flex gap-15 estado-oferta">
          <div className={`${CardByStateOffer[props.offer.state].class} wd-50`}>
            <i
              className={`fa-solid ${CardByStateOffer[props.offer.state].icon}`}
            ></i>{" "}
            {t(CardByStateOffer[props.offer.state].label)}
          </div>
          <div className="card-gray-m wd-50">
            <i
              className={`fa-regular ${
                props.offer.delivered
                  ? "fa-person-dolly"
                  : "fa-person-dolly-empty"
              }`}
            ></i>{" "}
            {t(props.offer.delivered ? "delivered" : "notDelivered")}
          </div>
        </div>
      </div>
    </div>
  );
}
