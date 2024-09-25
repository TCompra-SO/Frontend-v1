import { useTranslation } from "react-i18next";
import FrontImage from "../../../common/FrontImage";
import SubUserName from "../../../common/SubUserName";

interface OfferDetailRequirementDataProps {
  requirementTitle: string;
  userName: string;
  subUser: string | undefined;
  userImage: string | undefined;
}

export default function OfferDetailRequirementData(
  props: OfferDetailRequirementDataProps
) {
  const { t } = useTranslation();

  return (
    <div className="t-flex oferta-titulo">
      <FrontImage small image={props.userImage} isUser={true} />
      <div className="oferta-usuario">
        <div className="oferta-datos t-wrap m-0">
          <div
            className="text-truncate usuario-name"
            style={{ marginRight: "10px" }}
          >
            {t("requirement")}: {props.requirementTitle}
          </div>
        </div>
        <div className="t-flex oferta-descripcion">
          <div className="text-truncate detalles-oferta">
            {t("customer")}: {props.userName}{" "}
            <SubUserName subUser={undefined} />
          </div>
        </div>
      </div>
    </div>
  );
}
