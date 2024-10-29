import { Flex } from "antd";
import { ColumnType } from "antd/es/table";
import { getNestedValue } from "../../../../utilities/globalFunctions";
import { useTranslation } from "react-i18next";

export default function GeneralColumnString(
  nameColumn: string,
  dataIndex: string,
  truncate: boolean,
  width: number = 130,
  hidden: boolean = false,
  sorter: boolean = true,
  getLabelFunction?: (type: any) => string
) {
  const { t } = useTranslation();

  const col: ColumnType<any> = {
    title: nameColumn,
    dataIndex,
    align: "center",
    ellipsis: truncate,
    key: dataIndex,
    hidden,
    render: (_, record) => (
      <>
        {!truncate && (
          <div style={{ textAlign: "left" }} className={`t-flex dato-table`}>
            {getLabelFunction
              ? t(getLabelFunction(getNestedValue(dataIndex, record)))
              : getNestedValue(dataIndex, record)}
          </div>
        )}
        {truncate && (
          <Flex vertical>
            <div
              className="text-truncate dato-table"
              style={{ textAlign: "left" }}
            >
              {getLabelFunction
                ? t(getLabelFunction(getNestedValue(dataIndex, record)))
                : getNestedValue(dataIndex, record)}
            </div>
          </Flex>
        )}
      </>
    ),
    sorter: sorter
      ? (a, b) =>
          getNestedValue(dataIndex, a)?.localeCompare(
            getNestedValue(dataIndex, b)
          )
      : false,
    showSorterTooltip: false,
  };
  if (!truncate) col.width = width;
  return col;
}
