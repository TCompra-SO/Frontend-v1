import { useTranslation } from "react-i18next";
import { BaseUser } from "../../../models/MainInterfaces";
import RateStarCount from "../../common/RateStarCount";
import { EntityType, RequirementType } from "../../../utilities/types";

interface UserDataRequirementProps {
  user: BaseUser | undefined;
  type: RequirementType | undefined;
  subUser?: BaseUser;
}
export default function UserDataRequirement(props: UserDataRequirementProps) {
  const { t } = useTranslation();
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
                props.type == RequirementType.SALE
                  ? props.user?.sellerScore
                  : props.user?.customerScore
              }
              count={
                props.type == RequirementType.SALE
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
          <div className="dato-detalle-2">11/10/2024</div>
        </div>
        <div className="t-flex gap-10">
          <div className="dato-detalle-1">
            <i className="fas fa-angle-right i-vi"></i> Ubicación:
          </div>
          <div className="dato-detalle-2">Lima</div>
        </div>
        <div className="t-flex gap-10">
          <div className="dato-detalle-1">
            <i className="fas fa-angle-right i-vi"></i> Tipo:
          </div>
          <div className="dato-detalle-2">Ambos</div>
        </div>
        <div className="t-flex gap-10">
          <div className="dato-detalle-1">
            <i className="fas fa-angle-right i-vi"></i> Rubro:
          </div>
          <div className="dato-detalle-2">Casa y Hogar</div>
        </div>
      </div>
    </div>
  );
}
