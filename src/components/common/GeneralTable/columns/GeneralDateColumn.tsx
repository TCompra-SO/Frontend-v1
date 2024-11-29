import { ColumnType } from "antd/es/table";
import dayjs from "dayjs";
import { dateFormat } from "../../../../utilities/globals";

export default function GeneralDateColumn(
  nameColumn: string,
  dataIndex: string,
  hidden: boolean = false,
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
    sorter: noSorter
      ? undefined
      : (a, b) => (dayjs(a[dataIndex]).isBefore(dayjs(b[dataIndex])) ? -1 : 1),

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
