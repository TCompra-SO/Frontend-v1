import { useEffect, useState } from "react";

import { TableTypeRequirement } from "../models/Interfaces.ts";
import {
  RequirementType,
  TableColumns,
  TableTypes,
} from "../utilities/types.ts";
import GeneralTable from "../components/common/GeneralTable/GeneralTable.tsx";
import useSocket from "../socket/useSocket.tsx";
import { useTranslation } from "react-i18next";
import Search from "../components/section/home/Search.tsx";
import Footer from "../components/section/footer/Footer.tsx";
import Ads from "../components/section/home/Ads.tsx";

export default function Home() {
  const { t } = useTranslation();

  const { requirements: tableData, loading: loadingTable } = useSocket();
  const [tableContent, setTableContent] = useState<TableTypeRequirement>({
    type: TableTypes.REQUIREMENT,
    data: tableData,
    subType: RequirementType.GOOD,
    hiddenColumns: [
      TableColumns.CATEGORY,
      TableColumns.OFFERS,
      TableColumns.ACTION,
      TableColumns.STATE,
    ],
    nameColumnHeader: t("goods"),
    onButtonClick: () => {},
  });

  useEffect(() => {
    setTableContent((prevContent) => ({
      ...prevContent,
      data: tableData,
    }));
  }, [tableData]);

  return (
    <>
      <Search />
      <div className="t-flex f-column gap-20 section-detalles home-det">
        <div className="t-flex f-column gap-20 home-1">
          <div className="table-responsive">
            <GeneralTable
              content={tableContent}
              loading={loadingTable}
              onRowAction
            />
          </div>
        </div>
        <Ads />
      </div>
      <Footer />
    </>
  );
}
