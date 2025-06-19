import { ColumnType } from "antd/es/table";
import { Requirement } from "../../../../models/MainInterfaces";
import { RequirementStateMeta } from "../../../../utilities/colors";
import { useTranslation } from "react-i18next";
import {
  Filters,
  TableTypes,
  RequirementType,
} from "../../../../utilities/types";
import { validationColumnKey } from "../../../../utilities/globals";
import { StrictColumnFilterItem } from "../../../../models/Interfaces";
import CustomFilterDropdown from "../../utils/CustomFilterDropdown";

export default function ValidColumn(
  type: TableTypes,
  subType: RequirementType,
  hidden: boolean = false,
  filteredInfo?: Filters
) {
  const { t } = useTranslation();
  const filters: StrictColumnFilterItem[] | undefined =
    type == TableTypes.REQUIREMENT && subType == RequirementType.SALE
      ? [
          {
            text: t("valid"),
            value: 1,
          },
          {
            text: t("invalid"),
            value: 0,
          },
        ]
      : undefined;

  const col: ColumnType<Requirement> = {
    title: t("validationColumn"),
    key: validationColumnKey,
    align: "center",
    dataIndex: "state",
    showSorterTooltip: false,
    width: "113px",
    hidden,
    filteredValue: filteredInfo?.[validationColumnKey] ?? null,
    filters,

    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <CustomFilterDropdown
        setSelectedKeys={setSelectedKeys}
        selectedKeys={selectedKeys}
        confirm={confirm}
        clearFilters={clearFilters}
        filters={filters}
        filteredInfo={filteredInfo}
      />
    ),

    render: (_, record) => {
      let label: string = "";
      let className: string = "";

      try {
        if (type == TableTypes.REQUIREMENT && subType == RequirementType.SALE) {
          const state = record.state;
          label = t(RequirementStateMeta[state]?.label);
          className = `cont-estado ${RequirementStateMeta[state]?.class}`;
        }
      } catch (e) {
        console.log(e);
      }
      return (
        <div className="t-flex c-estados">
          <div className={className}>{label}</div>
        </div>
      );
    },
  };
  return col;
}
