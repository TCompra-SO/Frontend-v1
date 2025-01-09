import { useTranslation } from "react-i18next";
import ContentHeader from "../components/common/utils/ContentHeader";
import { StatisticsData } from "../models/MainInterfaces";
import { useEffect, useState } from "react";
import { useApiParams } from "../models/Interfaces";
import useApi from "../hooks/useApi";
import { getStatisticsService } from "../services/requests/reportsService";
import { useSelector } from "react-redux";
import { MainState } from "../models/Redux";
import useShowNotification, { useShowLoadingMessage } from "../hooks/utilHook";
import { transformToStatistics } from "../utilities/transform";

export default function Statistics() {
  const { t } = useTranslation();
  const { showNotification } = useShowNotification();
  const { showLoadingMessage } = useShowLoadingMessage();
  const mainUid = useSelector((state: MainState) => state.mainUser.uid);
  const [data, setData] = useState<StatisticsData>();
  const [apiParams] = useState<useApiParams>({
    service: getStatisticsService(mainUid),
    method: "get",
  });
  const { loading, responseData, error, errorMsg, fetchData } = useApi({
    service: apiParams.service,
    method: apiParams.method,
    dataToSend: apiParams.dataToSend,
    token: apiParams.token,
    includeHeader: apiParams.includeHeader,
  });

  useEffect(() => {
    showLoadingMessage(loading);
  }, [loading]);

  useEffect(() => {
    if (apiParams.service) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiParams]);

  useEffect(() => {
    if (responseData) {
      setData(transformToStatistics(responseData.data));
    } else if (error) showNotification("error", errorMsg);
  }, [responseData, error]);

  return (
    <>
      <ContentHeader
        title={t("statistics")}
        icon={<i className="fa-regular fa-chart-line c-default" />}
      />
      <div className="t-flex gap-30 f-column">
        {/* <div className="t-flex gap-30 bloque-e1">
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
              <div className="text-truncate cantidad-estd">+{data?.numre}</div>
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
        </div> */}
        <div className="t-flex gap-30 bloque-e2">
          <div className="card-white t-flex f-column gap-10 bloque-estd">
            <i className="fa-light fa-dolly icon-chart-1"></i>
            <div className="chart-cantidad">{data?.numProducts}</div>
            <div className="chart-section">
              <div className="chart-text-1 text-truncate">{t("goods")}</div>
              <div className="chart-text-2 text-truncate">
                {t("requirement")}
              </div>
            </div>
          </div>
          <div className="card-white t-flex f-column gap-10 bloque-estd">
            <i className="fa-light fa-hand-holding-magic icon-chart-1"></i>
            <div className="chart-cantidad">{data?.numServices}</div>
            <div className="chart-section">
              <div className="chart-text-1 text-truncate">{t("services")}</div>
              <div className="chart-text-2 text-truncate">
                {t("requirement")}
              </div>
            </div>
          </div>
          <div className="card-white t-flex f-column gap-10 bloque-estd">
            <i className="fa-light fa-basket-shopping icon-chart-1"></i>
            <div className="chart-cantidad">{data?.numLiquidations}</div>
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
            <div className="chart-cantidad">
              {(data?.numOffersProducts ?? 0) +
                (data?.numOffersServices ?? 0) +
                (data?.numOffersLiquidations ?? 0)}
            </div>
            <div className="chart-section">
              <div className="chart-text-1 text-truncate">{t("offers")}</div>
              <div className="chart-text-2 text-truncate">{t("total")}</div>
            </div>
          </div>
          <div className="card-white t-flex f-column gap-10 bloque-estd">
            <i className="fa-light  fa-diploma icon-chart-3"></i>
            <div className="chart-cantidad">
              {data?.numSentApprovedCertifications}
            </div>
            <div className="chart-section">
              <div className="chart-text-1 text-truncate">
                {t("approvedCertifications")}
              </div>
              <div className="chart-text-2 text-truncate">{t("sentPlFem")}</div>
            </div>
          </div>
          <div className="card-white t-flex f-column gap-10 bloque-estd">
            <i className="fa-light fa-file-certificate icon-chart-4"></i>
            <div className="chart-cantidad">
              {data?.numReceivedApprovedCertifications}
            </div>
            <div className="chart-section">
              <div className="chart-text-1 text-truncate">
                {t("approvedCertifications")}
              </div>
              <div className="chart-text-2 text-truncate">
                {t("receivedPl")}
              </div>
            </div>
          </div>
          <div className="card-white t-flex f-column gap-10 bloque-estd">
            <i className="fa-light fa-user-group icon-chart-1"></i>
            <div className="chart-cantidad">{data?.numSubUsers}</div>
            <div className="chart-section">
              <div className="chart-text-1 text-truncate">{t("employees")}</div>
              <div className="chart-text-2 text-truncate">{t("users")}</div>
            </div>
          </div>
        </div>
        <div className="t-flex gap-30 bloque-e3">
          <div className="card-white t-flex f-column gap-10 bloque-estd">
            <i className="fa-light fa-file-export icon-chart-3"></i>
            <div className="chart-cantidad">
              {data?.numPurchaseOrdersClient}
            </div>
            <div className="chart-section">
              <div className="chart-text-1 text-truncate">
                {t("purchaseOrders")}
              </div>
              <div className="chart-text-2 text-truncate">{t("issuedPl")}</div>
            </div>
          </div>
          <div className="card-white t-flex f-column gap-10 bloque-estd">
            <i className="fa-light fa-file-import icon-chart-4"></i>
            <div className="chart-cantidad">
              {data?.numPurchaseOrdersProvider}
            </div>
            <div className="chart-section">
              <div className="chart-text-1 text-truncate">
                {t("purchaseOrders")}
              </div>
              <div className="chart-text-2 text-truncate">
                {t("receivedPl")}
              </div>
            </div>
          </div>
          <div className="card-white t-flex f-column gap-10 bloque-estd">
            <i className="fa-duotone fa-file-export icon-chart-3"></i>
            <div className="chart-cantidad">
              {data?.numSellingOrdersProvider}
            </div>
            <div className="chart-section">
              <div className="chart-text-1 text-truncate">
                {t("salesOrders")}
              </div>
              <div className="chart-text-2 text-truncate">{t("issuedPl")}</div>
            </div>
          </div>
          <div className="card-white t-flex f-column gap-10 bloque-estd">
            <i className="fa-duotone fa-file-import icon-chart-4"></i>
            <div className="chart-cantidad">{data?.numSellingOrdersClient}</div>
            <div className="chart-section">
              <div className="chart-text-1 text-truncate">
                {t("salesOrders")}
              </div>
              <div className="chart-text-2 text-truncate">
                {t("receivedPl")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
