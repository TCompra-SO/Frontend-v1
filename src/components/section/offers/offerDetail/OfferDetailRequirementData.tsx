import { useTranslation } from "react-i18next";
import FrontImage from "../../../common/FrontImage";
import SubUserName from "../../../common/SubUserName";
import { BaseUser } from "../../../../models/MainInterfaces";
import { Tooltip } from "antd";
import { RequirementType, UserClass } from "../../../../utilities/types";
import { getUserClass } from "../../../../utilities/globalFunctions";

interface OfferDetailRequirementDataProps {
  requirementTitle: string;
  user: BaseUser;
  subUser: BaseUser | undefined;
  type: RequirementType;
  isOffer: boolean;
}

export default function OfferDetailRequirementData(
  props: OfferDetailRequirementDataProps
) {
  const { t } = useTranslation();
  const userClass: UserClass = getUserClass(props.isOffer, props.type);

  return (
    <div className="t-flex oferta-titulo">
      <FrontImage small image={props.user.image} isUser={true} />
      <div className="oferta-usuario" style={{ marginRight: "5px" }}>
        <div className="oferta-datos t-wrap m-0">
          <div
            className="text-truncate usuario-name"
            style={{ marginRight: "10px" }}
          >
            <Tooltip title={props.requirementTitle} placement="topLeft">
              {t(
                props.type == RequirementType.SALE
                  ? "sale"
                  : props.type == RequirementType.JOB
                  ? "job"
                  : "requirement"
              )}
              : {props.requirementTitle}
            </Tooltip>
          </div>
        </div>
        <div className="t-flex oferta-descripcion">
          <div className="text-truncate detalles-oferta">
            <Tooltip title={props.user.name} placement="topLeft">
              {userClass == UserClass.CUSTOMER ? t("customer") : t("seller")}:{" "}
              {props.user.name}{" "}
            </Tooltip>
            <SubUserName subUser={props.subUser} />
          </div>
        </div>
      </div>
    </div>
  );
}
