import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { pageRoutes } from "../../../utilities/routes";

interface ProductDetailHeaderProps {
  reqTitle: string | undefined;
}

export default function ProductDetailHeader(props: ProductDetailHeaderProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  // r3v
  return (
    <div className="section-guia t-flex j-items">
      <div className="t-flex f-column gap-10 header-requerimiento">
        <h1 className="m-0 text-truncate">{props.reqTitle}</h1>
        <div className="t-flex breadcrumb-req">
          <a className="ruta-req" onClick={() => navigate(pageRoutes.home)}>
            {t("home")}
          </a>
          <div>/</div>
          <a className="ruta-req" href="#">
            Bienes
          </a>
          <div>/</div>
          <div className="text-truncate">{props.reqTitle}</div>
        </div>
      </div>
    </div>
  );
}
