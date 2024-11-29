import { useTranslation } from "react-i18next";
import { defaultUserImage } from "../../../../../utilities/globals";
import { FullUser } from "../../../../../models/MainInterfaces";
import RateStarCount from "../../../../common/RateStarCount";
import { RateStartCountType } from "../../../../../utilities/types";
import { Tooltip } from "antd";

interface BasicCompanyDataProps {
  user: FullUser;
}

export default function BasicCompanyData(props: BasicCompanyDataProps) {
  const { t } = useTranslation();

  return (
    <div className="card-white card-d1 t-flex gap-10 card-empresa">
      <div className="t-flex f-column j-items gap-10">
        <img
          src={props.user.image ?? defaultUserImage}
          className="img-empresa"
        />
        <div className="premium-empresa">
          <i className="fa-regular fa-crown"></i> {t("premium")}
        </div>
      </div>
      <div className="t-flex f-column gap-10 empresa-about">
        <div>
          <div className="about-1">{props.user.name}</div>
          <div className="about-2">
            {t("specialty")}: {props.user.specialty}
          </div>
        </div>
        <div className="t-flex gap-10 datos-conacto">
          <div className="t-flex oferta-titulo d-contacto">
            <div className="icon-empresa-d i-datos">
              <i className="fa-regular fa-location-dot"></i>
            </div>
            <div className="oferta-usuario col-documento">
              <div className="text-truncate dato-contact1">{t("address")}</div>
              <Tooltip title={props.user.address}>
                <div className="text-truncate dato-contact2">
                  {props.user.address}
                </div>
              </Tooltip>
            </div>
          </div>
          <div className="t-flex oferta-titulo d-contacto">
            <div className="icon-empresa-d i-datos">
              <i className="fa-regular fa-mobile"></i>
            </div>
            <div className="oferta-usuario col-documento">
              <div className="text-truncate dato-contact1">{t("phone")}</div>
              <Tooltip title={props.user.phone}>
                <div className="text-truncate dato-contact2">
                  {props.user.phone}
                </div>
              </Tooltip>
            </div>
          </div>
          <div className="t-flex oferta-titulo d-contacto">
            <div className="icon-empresa-d i-datos">
              <i className="fa-regular fa-envelope"></i>
            </div>
            <div className="oferta-usuario col-documento">
              <div className="text-truncate dato-contact1">{t("email")}</div>
              <Tooltip title={props.user.email}>
                <div className="text-truncate dato-contact2">
                  {props.user.email}
                </div>
              </Tooltip>
            </div>
          </div>
        </div>
        <div className="t-flex gap-10 datos-conacto-2">
          <div className="t-flex oferta-titulo j-conten calificacion-emp">
            {t("customerScore")}:
            <RateStarCount
              score={props.user.customerScore}
              count={props.user.customerCount}
              type={RateStartCountType.COMPANY_DATA_HOME}
            />
          </div>
          <div className="t-flex oferta-titulo j-conten calificacion-emp">
            {t("supplierScore")}:
            <RateStarCount
              score={props.user.sellerScore}
              count={props.user.sellerCount}
              type={RateStartCountType.COMPANY_DATA_HOME}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
