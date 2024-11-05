import { useTranslation } from "react-i18next";
import { BaseUser, Requirement } from "../../../../../models/MainInterfaces";
import RateStarCount from "../../../../common/RateStarCount";
import { EntityType, RequirementType } from "../../../../../utilities/types";
import { useContext } from "react";
import dayjs from "dayjs";
import { dateFormat, defaultCountry } from "../../../../../utilities/globals";
import { ListsContext } from "../../../../../contexts/listsContext";

interface UserDataRequirementProps {
  user: BaseUser | undefined;
  requirement: Requirement | undefined;
  subUser?: BaseUser;
}
export default function UserDataRequirement(props: UserDataRequirementProps) {
  const { t } = useTranslation();
  const context = useContext(ListsContext);
  const { countryData, categoryData } = context;

  return (
    <div className="card-white cbl-2">
      <div className="t-flex mr-sub-2">
        <i className="fa-regular fa-id-card-clip sub-icon m-0"></i>
        <div className="sub-titulo sub-calificar">
          <div>{t("data")}</div>
        </div>
      </div>
      <div className="t-flex f-column gap-5 datos-req">
        <div className="t-flex gap-10">
          <div className="dato-detalle-1">
            <i className="fas fa-angle-right i-vi"></i> {t("score")}:
          </div>
          <div className="dato-detalle-2">
            <RateStarCount
              score={
                props.requirement?.type == RequirementType.SALE
                  ? props.user?.sellerScore
                  : props.user?.customerScore
              }
              count={
                props.requirement?.type == RequirementType.SALE
                  ? props.user?.sellerCount
                  : props.user?.customerCount
              }
            />
          </div>
        </div>
        <div className="t-flex gap-10">
          <div className="dato-detalle-1">
            <i className="fas fa-angle-right i-vi"></i>{" "}
            {t(
              props.user?.typeEntity == EntityType.COMPANY
                ? "company"
                : "person"
            )}
            :
          </div>
          <div className="dato-detalle-2 text-truncate">{props.user?.name}</div>
        </div>
        {props.subUser && (
          <div className="t-flex gap-10">
            <div className="dato-detalle-1">
              <i className="fas fa-angle-right i-vi"></i> {t("sellerRole")}:
            </div>
            <div className="dato-detalle-2 text-truncate">
              {props.user?.name}
            </div>
          </div>
        )}
        <div className="t-flex gap-10">
          <div className="dato-detalle-1">
            <i className="fas fa-angle-right i-vi"></i> {t("created")}:
          </div>
          <div className="dato-detalle-2">
            {props.requirement
              ? dayjs(props.requirement?.publishDate).format(dateFormat)
              : ""}
          </div>
        </div>
        <div className="t-flex gap-10">
          <div className="dato-detalle-1">
            <i className="fas fa-angle-right i-vi"></i> {t("location")}:
          </div>
          <div className="dato-detalle-2">
            {props.requirement &&
              countryData &&
              countryData[defaultCountry] &&
              countryData[defaultCountry].cities[props.requirement?.location]
                ?.value}
          </div>
        </div>
        {/* <div className="t-flex gap-10">
          <div className="dato-detalle-1">
            <i className="fas fa-angle-right i-vi"></i> Tipo:
          </div>
          <div className="dato-detalle-2">Ambos</div>
        </div> */}
        <div className="t-flex gap-10">
          <div className="dato-detalle-1">
            <i className="fas fa-angle-right i-vi"></i> {t("category")}:
          </div>
          <div className="dato-detalle-2">
            {props.requirement &&
              categoryData &&
              categoryData[props.requirement?.category]?.value}
          </div>
        </div>
      </div>
    </div>
  );
}
