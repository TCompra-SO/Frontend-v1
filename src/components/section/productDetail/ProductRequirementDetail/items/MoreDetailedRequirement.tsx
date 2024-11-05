import { useTranslation } from "react-i18next";
import { ListsContext } from "../../../../../contexts/listsContext";
import { useContext } from "react";
import { Requirement } from "../../../../../models/MainInterfaces";
import { TimeMeasurement } from "../../../../../utilities/types";
import dayjs from "dayjs";
import { dateFormat } from "../../../../../utilities/globals";

interface MoreDetailedRequirementProps {
  requirement: Requirement | undefined;
}

export default function MoreDetailedRequirement(
  props: MoreDetailedRequirementProps
) {
  const { t } = useTranslation();
  const context = useContext(ListsContext);
  const { paymentMethodData, currencyData, deliveryTimeData } = context;

  return (
    <div className="card-white cbl-3">
      <div className="t-flex mr-sub-2">
        <i className="fa-regular fa-memo sub-icon m-0"></i>
        <div className="sub-titulo sub-calificar">
          <div>{t("details")}</div>
        </div>
      </div>
      <div className="t-flex t-wrap gap-10 tags-detalles">
        <div className="badge-grey-border">
          {t("paymentMethod")}:{" "}
          {props.requirement &&
            paymentMethodData[props.requirement.paymentMethod]?.value}
        </div>
        <div className="badge-grey-border">
          {t("currency")}:{" "}
          {props.requirement?.coin &&
            currencyData[props.requirement?.coin]?.value}
        </div>
        <div className="badge-grey-border">
          {t("warranty")}: {props.requirement?.warranty}{" "}
          {props.requirement
            ? props.requirement?.warrantyTime == TimeMeasurement.DAYS
              ? t("days")
              : props.requirement.warrantyTime == TimeMeasurement.MONTHS
              ? t("months")
              : t("years")
            : ""}
        </div>
        <div className="badge-grey-border">
          {t("deliveryTime")}:{" "}
          {props.requirement &&
            deliveryTimeData[props.requirement.deliveryTime]?.value}
        </div>
        <div className="badge-default-border">
          {t("expires")}:{" "}
          {props.requirement
            ? dayjs(props.requirement?.expirationDate).format(dateFormat)
            : ""}
        </div>
      </div>
    </div>
  );
}
