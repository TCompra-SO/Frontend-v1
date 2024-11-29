import { Requirement } from "../../../../models/MainInterfaces";
import { useTranslation } from "react-i18next";
import { ListsContext } from "../../../../contexts/ListsContext";
import { useContext } from "react";
import dayjs from "dayjs";
import { dateFormat } from "../../../../utilities/globals";
import RequirementInfoNoTags from "./RequirementInfoNoTags";
import FrontImage from "../../../common/FrontImage";
import PriceInHeader from "../../../common/PriceInHeader";

interface RequirementInfoProps {
  requirement: Requirement;
  forHome?: boolean;
}

export default function RequirementInfo(props: RequirementInfoProps) {
  const { t } = useTranslation();
  const context = useContext(ListsContext);
  const { deliveryTimeData } = context;

  return (
    <div
      className={`t-flex gap-15 ${
        props.forHome ? "requerimiento-2" : "requerimiento-o"
      }`}
    >
      <FrontImage
        image={props.requirement.image}
        isUser={false}
        forHome={props.forHome}
      />
      <div
        className={
          props.forHome
            ? "t-flex f-column gap-10 req-det"
            : `t-flex detalle-req`
        }
      >
        <RequirementInfoNoTags
          title={props.requirement.title}
          user={props.requirement.user}
          type={props.requirement.type}
          subUser={props.requirement.subUser}
          description={props.requirement.description}
          forHome={props.forHome}
        />

        <div className="t-flex tags-req t-wrap">
          <PriceInHeader
            coin={props.requirement.coin}
            price={props.requirement.price}
            useOfferClass={false}
          />
          {props.forHome ? (
            <div className="badge-grey-border">
              {t("published")}:{" "}
              {dayjs(props.requirement.publishDate).format(dateFormat)}
            </div>
          ) : (
            <>
              <div className="badge-grey-border">
                {t("deliveryTime")}:{" "}
                {deliveryTimeData &&
                deliveryTimeData[props.requirement.deliveryTime]
                  ? deliveryTimeData[props.requirement.deliveryTime].value
                  : null}
              </div>
              <div className="badge-default-border">
                {t("expires")}:{" "}
                {dayjs(props.requirement.expirationDate).format(dateFormat)}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
