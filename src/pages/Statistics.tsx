import { useTranslation } from "react-i18next";
import ContentHeader from "../components/common/ContentHeader";
import { StatisticsData } from "../models/MainInterfaces";
import { useEffect, useState } from "react";

const stat: StatisticsData = {
  customers: 9999,
  requirements: 9999,
  certifications: 9999,
  goods: 9999,
  services: 9999,
  sales: 9999,
  offers: 9999,
  issuedPurchaseOrders: 9999,
  receivedPurchaseOrders: 9999,
  employees: 9999,
};

export default function Statistics() {
  const { t } = useTranslation();
  const [data, setData] = useState<StatisticsData>();

  useEffect(() => {
    setData(stat);
  }, []);

  return (
    <>
      <ContentHeader
        title={t("statistics")}
        icon={<i className="fa-regular fa-chart-line c-default" />}
      />
      <div className="t-flex gap-30 f-column">
        <div className="t-flex gap-30 bloque-e1">
          <div className="card-white t-flex oferta-titulo doc-botones">
            <div className="icon-estadisticas">
              <i className="fa-regular fa-users-medical"></i>
            </div>
            <div className="oferta-usuario col-documento">
              <div className="text-truncate cantidad-estd">
                +{data?.customers}
              </div>
              <div className="text-truncate detalles-estd">
                {t("newCustomers")}
              </div>
            </div>
          </div>
          <div className="card-white t-flex oferta-titulo doc-botones">
            <div className="icon-estadisticas">
              <i className="fa-regular fa-clipboard-list-check"></i>
            </div>
            <div className="oferta-usuario col-documento">
              <div className="text-truncate cantidad-estd">
                +{data?.requirements}
              </div>
              <div className="text-truncate detalles-estd">
                {t("requirements")}
              </div>
            </div>
          </div>
          <div className="card-white t-flex oferta-titulo doc-botones">
            <div className="icon-estadisticas">
              <i className="fa-regular fa-diploma"></i>
            </div>
            <div className="oferta-usuario col-documento">
              <div className="text-truncate cantidad-estd">
                +{data?.certifications}
              </div>
              <div className="text-truncate detalles-estd">
                {t("certifications")}
              </div>
            </div>
          </div>
        </div>
        <div className="t-flex gap-30 bloque-e2">
          <div className="card-white t-flex f-column gap-10 bloque-estd">
            <i className="fa-light fa-dolly icon-chart-1"></i>
            <div className="chart-cantidad">{data?.goods}</div>
            <div className="chart-section">
              <div className="chart-text-1 text-truncate">{t("goods")}</div>
              <div className="chart-text-2 text-truncate">
                {t("requirement")}
              </div>
            </div>
          </div>
          <div className="card-white t-flex f-column gap-10 bloque-estd">
            <i className="fa-light fa-hand-holding-magic icon-chart-1"></i>
            <div className="chart-cantidad">{data?.services}</div>
            <div className="chart-section">
              <div className="chart-text-1 text-truncate">{t("services")}</div>
              <div className="chart-text-2 text-truncate">
                {t("requirement")}
              </div>
            </div>
          </div>
          <div className="card-white t-flex f-column gap-10 bloque-estd">
            <i className="fa-light fa-basket-shopping icon-chart-1"></i>
            <div className="chart-cantidad">{data?.sales}</div>
            <div className="chart-section">
              <div className="chart-text-1 text-truncate">{t("sales")}</div>
              <div className="chart-text-2 text-truncate">
                {t("requirement")}
              </div>
            </div>
          </div>
          {/* <div className="card-white t-flex f-column gap-10 bloque-estd">
            <i className="fa-light fa-user-tie icon-chart-1"></i>
            <div className="chart-cantidad">20</div>
            <div className="chart-section">
              <div className="chart-text-1 text-truncate">{t('rrhh')}</div>
              <div className="chart-text-2 text-truncate">{t('requirement')}</div>
            </div>
          </div> */}
        </div>
        <div className="t-flex gap-30 bloque-e3">
          <div className="card-white t-flex f-column gap-10 bloque-estd">
            <i className="fa-light fa-tags icon-chart-2"></i>
            <div className="chart-cantidad">{data?.offers}</div>
            <div className="chart-section">
              <div className="chart-text-1 text-truncate">{t("offers")}</div>
              <div className="chart-text-2 text-truncate">{t("logistics")}</div>
            </div>
          </div>
          <div className="card-white t-flex f-column gap-10 bloque-estd">
            <i className="fa-light fa-file-export icon-chart-3"></i>
            <div className="chart-cantidad">{data?.issuedPurchaseOrders}</div>
            <div className="chart-section">
              <div className="chart-text-1 text-truncate">
                {t("issuedOrders")}
              </div>
              <div className="chart-text-2 text-truncate">{t("logistics")}</div>
            </div>
          </div>
          <div className="card-white t-flex f-column gap-10 bloque-estd">
            <i className="fa-light fa-file-import icon-chart-4"></i>
            <div className="chart-cantidad">{data?.receivedPurchaseOrders}</div>
            <div className="chart-section">
              <div className="chart-text-1 text-truncate">
                {t("receivedOrders")}
              </div>
              <div className="chart-text-2 text-truncate">{t("logistics")}</div>
            </div>
          </div>
          <div className="card-white t-flex f-column gap-10 bloque-estd">
            <i className="fa-light fa-user-group icon-chart-1"></i>
            <div className="chart-cantidad">{data?.employees}</div>
            <div className="chart-section">
              <div className="chart-text-1 text-truncate">{t("employees")}</div>
              <div className="chart-text-2 text-truncate">{t("users")}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
