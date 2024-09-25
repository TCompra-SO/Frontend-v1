import { Coins } from "../../../../utilities/types";
import { RequirementTableItem } from "../../../../models/MainInterfaces";
import { useTranslation } from "react-i18next";
import { ListsContext } from "../../../../contexts/listsContext";
import { useContext } from "react";
import dayjs from "dayjs";
import { dateFormat } from "../../../../utilities/globals";
import RequirementInfoNoTags from "./RequirementInfoNoTags";
import FrontImage from "../../../common/FrontImage";

interface RequirementInfoProps {
  requirement: RequirementTableItem;
}

export default function RequirementInfo(props: RequirementInfoProps) {
  const { t } = useTranslation();
  const context = useContext(ListsContext);
  const { currencyList, deliveryTimeList } = context;

  return (
    <div className="t-flex gap-15 requerimiento-o">
      <FrontImage image={props.requirement.image} isUser={false} />
      <div className="t-flex detalle-req">
        <RequirementInfoNoTags
          title={props.requirement.title}
          user={props.requirement.user}
          type={props.requirement.type}
          subUser={props.requirement.subUser}
          description={props.requirement.description}
        />

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
