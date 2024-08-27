import { ColumnType } from "antd/es/table";
import { Dropdown } from "antd";
import ButtonContainer from "../../../containers/ButtonContainer";
import { CaretDownOutlined } from "@ant-design/icons";
import {
  Action,
  ActionByStateOffer,
  ActionByStateRequirement,
  ActionLabel,
  TableTypes,
} from "../../../../utilities/types";
import { useTranslation } from "react-i18next";

export default function ActionColumn(
  type: TableTypes,
  onButtonClick: (action: Action, data: any) => void,
  hidden: boolean = false
) {
  const { t } = useTranslation();

  const col: ColumnType<any> = {
    title: t("actionColumn"),
    key: "action",
    align: "center",
    showSorterTooltip: false,
    width: "115px",
    hidden,
    render: (record) => {
      const ActionByState: { [key: number]: Action[] } =
        type == TableTypes.REQUIREMENT
          ? ActionByStateRequirement
          : ActionByStateOffer;

      return (
        <Dropdown
          trigger={["click"]}
          menu={{
            items: ActionByState[record.state].map((action: Action) => {
              return {
                key: action,
                label: t(ActionLabel[action]),
                onClick: () => onButtonClick(action, record),
              };
            }),
          }}
        >
          <ButtonContainer
            size="small"
            type="primary"
            ghost
            text={t("select")}
            upperCaseSmaller={true}
            icon={<CaretDownOutlined />}
            iconPosition="end"
            style={{
              paddingTop: "15px",
              paddingBottom: "15px",
              borderRadius: "10px",
            }}
          />
        </Dropdown>
      );
    },
  };
  return col;
}
