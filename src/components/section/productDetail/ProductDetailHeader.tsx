import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { pageRoutes } from "../../../utilities/routes";
import { RequirementType } from "../../../utilities/types";
import { useContext } from "react";
import { HomeContext } from "../../../contexts/Homecontext";

interface ProductDetailHeaderProps {
  reqTitle: string | undefined;
  type: RequirementType | undefined;
}

export default function ProductDetailHeader(props: ProductDetailHeaderProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { updateType } = useContext(HomeContext);

  return (
    <div className="section-guia t-flex j-items">
      <div className="t-flex f-column gap-10 header-requerimiento j-items">
        <div className="cont-prime wd-100">
          <h1 className="m-0 text-truncate" style={{ lineHeight: 1.2 }}>
            {props.reqTitle}
          </h1>
          <div className="t-flex breadcrumb-req">
            <a
              className="ruta-req"
              onClick={() => {
                navigate(pageRoutes.home);
              }}
            >
              {t("home")}
            </a>
            <div>/</div>
            <a
              className="ruta-req"
              onClick={() => {
                if (props.type) updateType(props.type);
                navigate(pageRoutes.home);
              }}
            >
              {t(
                props.type == RequirementType.GOOD
                  ? "goods"
                  : props.type == RequirementType.SERVICE
                  ? "services"
                  : props.type == RequirementType.SALE
                  ? "sales"
                  : ""
              )}
            </a>
            <div>/</div>
            <div className="text-truncate">{props.reqTitle}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
