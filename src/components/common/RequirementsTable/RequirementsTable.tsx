import { Table, TableProps } from "antd";
import { RequirementTableItem } from "../../../models/MainInterfaces";
import {
  Action,
  RequirementTableColumns,
  RequirementType,
} from "../../../utilities/types";
import { pageSizeOptionsSt } from "../../../utilities/globals";
import ImageColumn from "./columns/ImageColumn";
import NameColumn from "./columns/NameColumn";
import LocationColumn from "./columns/LocationColumn";
import DateColumn from "./columns/DateColumn";
import PriceColumn from "./columns/PriceColumn";
import OffersColumn from "./columns/OffersColumn";
import StateColumn from "./columns/StateColumn";
import ActionColumn from "./columns/ActionColumn";
import CategoryColumn from "./columns/CategoryColumn";

interface RequirementsTableProps {
  type: RequirementType;
  data: RequirementTableItem[];
  onButtonClick: (action: Action, data: RequirementTableItem) => void;
  hiddenColumns: RequirementTableColumns[];
}

export default function RequirementsTable(props: RequirementsTableProps) {
  const pageSizeOptions = pageSizeOptionsSt;
  const visibility: { [key in RequirementTableColumns]: boolean } = {
    [RequirementTableColumns.IMAGE]: false,
    [RequirementTableColumns.NAME]: false,
    [RequirementTableColumns.CATEGORY]: false,
    [RequirementTableColumns.LOCATION]: false,
    [RequirementTableColumns.DATE]: false,
    [RequirementTableColumns.PRICE]: false,
    [RequirementTableColumns.OFFERS]: false,
    [RequirementTableColumns.STATE]: false,
    [RequirementTableColumns.ACTION]: false,
  };

  props.hiddenColumns.map((hiddenCol) => {
    visibility[hiddenCol] = true;
  });

  const columns: TableProps<RequirementTableItem>["columns"] = [
    ImageColumn(visibility[RequirementTableColumns.IMAGE]),
    NameColumn(props.type, visibility[RequirementTableColumns.NAME]),
    CategoryColumn(visibility[RequirementTableColumns.CATEGORY]),
    LocationColumn(visibility[RequirementTableColumns.LOCATION]),
    DateColumn(visibility[RequirementTableColumns.DATE]),
    PriceColumn(visibility[RequirementTableColumns.PRICE]),
    OffersColumn(
      props.onButtonClick,
      visibility[RequirementTableColumns.OFFERS]
    ),
    StateColumn(visibility[RequirementTableColumns.STATE]),
    ActionColumn(
      props.onButtonClick,
      visibility[RequirementTableColumns.ACTION]
    ),
  ];

  return (
    <Table
      dataSource={props.data}
      columns={columns}
      scroll={{ x: 1000 }}
      style={{ width: "100%" }}
      bordered={false}
      pagination={{
        pageSizeOptions,
        showSizeChanger: true,
        // hideOnSinglePage: true,<
        // locale: {
        //   items_per_page: `/ ${
        //     props.type == RequirementType.GOOD
        //       ? t("goods")
        //       : props.type == RequirementType.SERVICE
        //       ? t("services")
        //       : props.type == RequirementType.SALE
        //       ? t("sales")
        //       : t("jobs")
        //   } por página`,
        // },
      }}
    ></Table>
  );
}
