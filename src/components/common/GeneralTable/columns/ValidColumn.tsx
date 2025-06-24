import { ColumnType } from "antd/es/table";
import { BasicRequirement } from "../../../../models/MainInterfaces";
import {
  Filters,
  TableTypes,
  RequirementType,
} from "../../../../utilities/types";
import { validationColumnKey } from "../../../../utilities/globals";
import { StrictColumnFilterItem } from "../../../../models/Interfaces";
import CustomFilterDropdown from "../../utils/CustomFilterDropdown";
import { TFunction } from "i18next";
import { ReactNode } from "react";

export default function ValidColumn(
  type: TableTypes,
  subType: RequirementType,
  t: TFunction,
  hidden: boolean = false,
  filteredInfo?: Filters,
  noFilter?: boolean
) {
  const filters: StrictColumnFilterItem[] | undefined =
    (type == TableTypes.REQUIREMENT || type == TableTypes.ALL_REQUIREMENTS) &&
    subType == RequirementType.SALE
      ? [
          {
            text: t("validFem"),
            value: 1,
          },
          {
            text: t("invalidFem"),
            value: 0,
          },
        ]
      : undefined;

  const col: ColumnType<BasicRequirement> = {
    title: t("validationColumn"),
    key: validationColumnKey,
    align: "center",
    dataIndex: "state",
    showSorterTooltip: false,
    width: "113px",
    hidden,
    filteredValue: filteredInfo?.[validationColumnKey] ?? null,
    filters: noFilter ? undefined : filters,

    filterDropdown: noFilter
      ? undefined
      : ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
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
      let label: ReactNode = "";
      let className: string = "";

      try {
        if (
          (type == TableTypes.REQUIREMENT ||
            type == TableTypes.ALL_REQUIREMENTS) &&
          subType == RequirementType.SALE
        ) {
          const valid = record.valid;
          // label = t(valid ? "validFem" : "invalidFem");
          label = valid ? (
            <i className="fa-solid fa-check"></i>
          ) : (
            <i className="fa-solid fa-xmark"></i>
          );
          className = `cont-estado ${valid ? "es-atendido" : "es-cancelado"}`;
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
