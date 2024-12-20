import { useEffect, useState } from "react";

import { TableTypeHome } from "../models/Interfaces.ts";
import {
  Action,
  RequirementType,
  TableColumns,
  TableTypes,
} from "../utilities/types.ts";
import useSocket from "../socket/useSocket.tsx";
import { useTranslation } from "react-i18next";
import Search from "../components/section/home/Search.tsx";
import Footer from "../components/section/footer/Footer.tsx";
import Ads from "../components/section/home/Ads.tsx";
import CompanyFilter from "../components/section/home/CompanyFilter.tsx";
import CompanyData from "../components/section/home/CompanyData/CompanyData.tsx";
import { HomeProvider } from "../contexts/Homecontext.tsx";
import HomeTable from "../components/section/home/HomeTable/HomeTable.tsx";
import { Requirement } from "../models/MainInterfaces.ts";
import { useNavigate } from "react-router-dom";
import { pageRoutes } from "../utilities/routes.ts";

export default function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { requirements: tableData, loading: loadingTable } = useSocket();
  const [tableContent, setTableContent] = useState<TableTypeHome>({
    type: TableTypes.HOME,
    data: tableData,
    total: 50, // r3v
    subType: RequirementType.GOOD,
    hiddenColumns: [TableColumns.CATEGORY],
    nameColumnHeader: t("goods"),
    onButtonClick: (action: Action, req: Requirement) => {
      if (action == Action.VIEW_REQUIREMENT)
        navigate(`${pageRoutes.productDetail}/${req.key}`);
    },
  });

  /** Mostrar datos iniciales */

  useEffect(() => {
    setTableContent((prevContent) => ({
      ...prevContent,
      total: 50, // r3v
      data: tableData,
    }));
  }, [tableData]);

  /** Funciones */

  function handleChangePageAndPageSize(page: number, pageSize: number) {
    console.log(page, pageSize);
  }

  return (
    <HomeProvider>
      <Search />
      <div className="t-flex f-column gap-20 section-detalles home-det">
        <div className="t-flex f-column gap-20 home-1">
          <CompanyFilter />
          <CompanyData />
          <div className="titulo req-t">
            {t("homeTableFirstHalf")} <span>{t("homeTableSecondHalf")}</span>
          </div>
          <HomeTable
            content={tableContent}
            loadingTable={loadingTable}
            onChangePageAndPageSize={handleChangePageAndPageSize}
          />
        </div>
        <Ads />
      </div>
      <Footer />
    </HomeProvider>
  );
}
