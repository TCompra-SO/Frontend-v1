import { useContext, useEffect, useState } from "react";

import { TableTypeHome } from "../models/Interfaces.ts";
import {
  Action,
  OnChangePageAndPageSizeTypeParams,
  RequirementType,
  TableColumns,
  TableTypes,
} from "../utilities/types.ts";
import { useTranslation } from "react-i18next";
import Search from "../components/section/home/Search.tsx";
import Footer from "../components/section/footer/Footer.tsx";
import Ads from "../components/section/home/Ads.tsx";
import CompanyFilter from "../components/section/home/CompanyFilter/CompanyFilter.tsx";
import CompanyData from "../components/section/home/CompanyData/CompanyData.tsx";
import { HomeContext } from "../contexts/Homecontext.tsx";
import HomeTable from "../components/section/home/HomeTable/HomeTable.tsx";
import { Requirement } from "../models/MainInterfaces.ts";
import { useNavigate } from "react-router-dom";
import { MainState } from "../models/Redux.ts";
import { useSelector } from "react-redux";
import useHomeSocket from "../socket/useHomeSocket.tsx";
import { getProductDetailRoute } from "../utilities/globalFunctions.ts";
import { pageSizeOptionsSt } from "../utilities/globals.ts";

export default function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  useHomeSocket();
  const isPremium = useSelector((state: MainState) => state.mainUser.isPremium);
  const {
    updateType,
    page,
    updatePage,
    requirementList,
    loadingRequirementList,
    totalRequirementList,
    retrieveLastSearchRequeriments,
  } = useContext(HomeContext);
  const [tableContent, setTableContent] = useState<TableTypeHome>({
    type: TableTypes.HOME,
    data: requirementList,
    total: totalRequirementList,
    page: page,
    subType: RequirementType.GOOD,
    hiddenColumns: [TableColumns.CATEGORY],
    nameColumnHeader: t("goods"),
    onButtonClick: (action: Action, req: Requirement) => {
      if (action == Action.VIEW_REQUIREMENT)
        navigate(getProductDetailRoute(req.key, req.type));
    },
  });

  /** Mostrar datos iniciales */

  useEffect(() => {
    // if (
    //   requirementList.length <= pageSizeOptionsSt[0] / 2 &&
    //   totalRequirementList > pageSizeOptionsSt[0]
    // )
    //   retrieveLastSearchRequeriments();
    setTableContent((prevContent) => ({
      ...prevContent,
      page,
      data: requirementList,
      total: totalRequirementList,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requirementList]);

  /** Reset tabla actual */

  useEffect(() => {
    return () => updateType(RequirementType.GOOD);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** Funciones */

  function handleChangePageAndPageSize({
    page,
  }: OnChangePageAndPageSizeTypeParams) {
    updatePage(page);
  }

  return (
    <>
      <Search />
      <div className="t-flex f-column gap-20 section-detalles home-det">
        <div className="t-flex f-column gap-20 home-1">
          {isPremium && (
            <>
              <CompanyFilter />
              <CompanyData />
              <div className="titulo req-t">
                {t("homeTableFirstHalf")}{" "}
                <span>{t("homeTableSecondHalf")}</span>
              </div>
            </>
          )}
          <HomeTable
            content={tableContent}
            loadingTable={loadingRequirementList}
            onChangePageAndPageSize={handleChangePageAndPageSize}
          />
        </div>
        <Ads />
      </div>
      <Footer />
    </>
  );
}
