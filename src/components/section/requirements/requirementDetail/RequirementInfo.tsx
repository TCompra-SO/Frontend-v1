import { Tooltip } from "antd";

import { Coins, RequirementType } from "../../../../utilities/types";
import { RequirementTableItem } from "../../../../models/MainInterfaces";
import { useTranslation } from "react-i18next";
import {
  getLabelFromRequirementType,
  getScore,
} from "../../../../utilities/globalFunctions";
import { ListsContext } from "../../../../contexts/listsContext";
import { useContext } from "react";
import dayjs from "dayjs";
import { dateFormat } from "../../../../utilities/globals";
import SubUserName from "../../../common/SubUserName";
import DescriptionParagraph from "../../../common/DescriptionParagraph";

interface RequirementInfoProps {
  requirement: RequirementTableItem;
}

export default function RequirementInfo(props: RequirementInfoProps) {
  const { t } = useTranslation();
  const context = useContext(ListsContext);
  const { currencyList, deliveryTimeList } = context;

  return (
    <div className="t-flex gap-15 requerimiento-o">
      <img
        src={
          props.requirement.image && props.requirement.image.length > 0
            ? props.requirement.image[0]
            : "/src/assets/images/img-prod.svg"
        }
        className="portada-detalle"
      />
      <div className="t-flex detalle-req">
        <Tooltip title={props.requirement.title}>
          <h2 className="titulo-req">{props.requirement.title}</h2>
        </Tooltip>
        <div className="t-flex tags-req">
          <div className="badge-default">{props.requirement.user.name}</div>
          <SubUserName subUser={props.requirement.subUser} />
          <div className="badge-second">
            {t(getLabelFromRequirementType(props.requirement.type))}
          </div>
          <div className="puntuacion">
            <i className="fa-solid fa-star p-start"></i>
            <div className="valor-start">
              {getScore(
                props.requirement.type == RequirementType.SALE
                  ? props.requirement.user.sellerScore
                  : props.requirement.user.customerScore
              )}
            </div>
            <b className="p-cantidad">(41.5k)</b>
          </div>
        </div>

        <DescriptionParagraph text={props.requirement.description} />

        <div className="t-flex tags-req t-wrap">
          <b className="precio-req">
            {currencyList && currencyList[props.requirement.coin]
              ? Coins[currencyList[props.requirement.coin].alias]
              : null}
            {props.requirement.price}
          </b>
          <div className="badge-grey-border">
            {t("deliveryTime")}:{" "}
            {deliveryTimeList &&
            deliveryTimeList[props.requirement.deliveryTime]
              ? deliveryTimeList[props.requirement.deliveryTime].value
              : null}
          </div>
          <div className="badge-default-border">
            {t("expires")}:{" "}
            {dayjs(props.requirement.expirationDate).format(dateFormat)}
          </div>
        </div>
      </div>
    </div>
  );
}
