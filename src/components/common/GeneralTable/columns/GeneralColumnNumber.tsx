import { ColumnType } from "antd/es/table";
import { RequirementTableItem } from "../../../../models/MainInterfaces";
import { Action, TableTypes } from "../../../../utilities/types";
import { useTranslation } from "react-i18next";

export default function GeneralColumnNumber(
  nameColumn: string,
  dataIndex: string,
  hidden: boolean = false
) {
  const { t } = useTranslation();

  const col: ColumnType<any> = {
    title: nameColumn,
    dataIndex,
    key: dataIndex,
    align: "center",
    sorter: (a, b) => a[dataIndex] - b[dataIndex],
    showSorterTooltip: false,
    width: "75px",
    hidden,
    render: (_, record) => {
      return (
        <div className="t-flex c-ofertas">
          <div
            className="oferta-cant"
            // style={{ cursor: "pointer" }}
          >
            {record[dataIndex] ?? 0}
          </div>
        </div>
      );
    },
  };
  return col;
}
