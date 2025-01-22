import { ColumnType } from "antd/es/table";
import dayjs from "dayjs";
import { dateFormat } from "../../../../utilities/globals";
import { FieldSort } from "../../../../models/Requests";
import { getSortOrderFromFieldSort } from "../../../../utilities/globalFunctions";

export default function GeneralDateColumn(
  nameColumn: string,
  dataIndex: string,
  hidden: boolean = false,
  fieldSort?: FieldSort,
  noSorter?: boolean
) {
  const col: ColumnType<any> = {
    title: nameColumn,
    dataIndex: dataIndex,
    key: dataIndex,
    align: "center",
    showSorterTooltip: false,
    ellipsis: true,
    width: "110px",
    hidden,
    sorter: noSorter ? undefined : true,
    sortOrder: getSortOrderFromFieldSort(dataIndex, fieldSort),
    render: (_, record) => {
      const value: dayjs.Dayjs = dayjs(record[dataIndex]);

      return (
        <div style={{ textAlign: "left" }} className="t-flex dato-table">
          {value.format(dateFormat)}
        </div>
      );
    },
  };
  return col;
}
