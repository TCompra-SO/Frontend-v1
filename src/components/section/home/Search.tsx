import { useTranslation } from "react-i18next";
import InputContainer from "../../containers/InputContainer";
import ButtonContainer from "../../containers/ButtonContainer";
import { Lengths } from "../../../utilities/lengths";
import { useContext, useEffect, useState } from "react";
import { HomeContext } from "../../../contexts/Homecontext";
import { useApiParams } from "../../../models/Interfaces";
import { getStatisticsService } from "../../../services/requests/reportsService";
import useApi from "../../../hooks/useApi";
import { masterUid } from "../../../utilities/globals";
import { transformToStatistics } from "../../../utilities/transform";
import { StatisticsData } from "../../../models/MainInterfaces";

export default function Search() {
  const { t } = useTranslation();
  const { updateKeywordSearch } = useContext(HomeContext);
  const [keyword, setKeyword] = useState("");
  const [data, setData] = useState<StatisticsData>();
  const [apiParams] = useState<useApiParams>({
    service: getStatisticsService(masterUid),
    method: "get",
  });
  const { responseData, fetchData } = useApi(apiParams);

  useEffect(() => {
    if (apiParams.service) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiParams]);

  useEffect(() => {
    try {
      if (responseData) setData(transformToStatistics(responseData.data));
    } catch (e) {
      console.log(e);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData]);

  function handleKeyUp(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      search();
    }
  }

  function search() {
    updateKeywordSearch(keyword);
  }

  return (
    <>
      <div className="text-center t-flex f-column gap-20 slider-desc">
        <div className="home-t ht-s1">
          <h2 className="m-0">{t("homeTitle")}</h2>
          <h3 className="m-0">{t("homeSubtitle")}</h3>
        </div>
        <div className="t-flex gap-10 ht-s2" style={{ width: "50%" }}>
          <InputContainer
            type="text"
            className="form-control form-buscar"
            placeholder={t("search")}
            count={{
              max: Lengths.keywords.max,
              exceedFormatter: (txt, { max }) => txt.slice(0, max),
            }}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyUp={handleKeyUp}
          />
          <ButtonContainer className="btn btn-default" onClick={search}>
            <i className="fa-regular fa-search"></i>
          </ButtonContainer>
        </div>
        {data && (
          <div className="t-flex gap-5 f-column j-items">
            <div
              className="text-left t-flex gap-10 ht-s3"
              style={{ fontWeight: 600, fontSize: "1.17em" }}
            >
              Publicados en total: 📈
            </div>
            <div className="text-left t-flex gap-10 ht-s3">
              <div className="t-flex count-req gap-10">
                <div className="icon-home">
                  <i className="fa-regular fa-dolly"></i>
                </div>
                <div className="oferta-usuario col-documento-2">
                  <div className="text-truncate ti-1">{data.numProducts}</div>
                  <div className="text-truncate ti-2">{t("goods")}</div>
                </div>
              </div>
              <div className="t-flex count-req gap-10">
                <div className="icon-home">
                  <i className="fa-regular fa-hand-holding-magic"></i>
                </div>
                <div className="oferta-usuario col-documento-2">
                  <div className="text-truncate ti-1" style={{ color: "#fff" }}>
                    {data.numServices}
                  </div>
                  <div className="text-truncate ti-2" style={{ color: "#fff" }}>
                    {t("services")}
                  </div>
                </div>
              </div>
              <div className="t-flex count-req gap-10">
                <div className="icon-home">
                  <i className="fa-regular fa-basket-shopping"></i>
                </div>
                <div className="oferta-usuario col-documento-2">
                  <div className="text-truncate ti-1" style={{ color: "#fff" }}>
                    {data.numLiquidations}
                  </div>
                  <div className="text-truncate ti-2" style={{ color: "#fff" }}>
                    {t("sales")}
                  </div>
                </div>
              </div>
              {/* <div className="t-flex count-req gap-10">
            <div className="icon-home">
              <i className="fa-regular fa-user-tie"></i>
            </div>
            <div className="oferta-usuario col-documento-2">
              <div className="text-truncate ti-1" style={{ color: "#fff" }}>
                100
              </div>
              <div className="text-truncate ti-2" style={{ color: "#fff" }}>
                RR.HH
              </div>
            </div>
          </div> */}
            </div>
          </div>
        )}
      </div>
      <div className="section-slider t-flex j-conten j-items"></div>
    </>
  );
}
