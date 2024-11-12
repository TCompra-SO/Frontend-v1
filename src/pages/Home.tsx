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
      <div className="table-responsive">
        <GeneralTable
          content={tableContent}
          loading={loadingTable}
          onRowAction
        />
      </div>
    </>
  );
}
