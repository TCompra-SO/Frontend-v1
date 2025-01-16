import { ColumnType } from "antd/es/table";
import { FieldSort } from "../../../../models/Requests";
import { getSortOrderFromFieldSort } from "../../../../utilities/globalFunctions";

export default function GeneralColumnNumber(
  nameColumn: string,
  dataIndex: string,
  hidden: boolean = false,
  width?: number,
  fieldSort?: FieldSort,
  noSorter?: boolean
) {
  const col: ColumnType<any> = {
    title: nameColumn,
    dataIndex,
    key: dataIndex,
    align: "center",
    sorter: noSorter ? undefined : true,
    showSorterTooltip: false,
    sortOrder: getSortOrderFromFieldSort(dataIndex, fieldSort),
    width: width ?? 75,
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
