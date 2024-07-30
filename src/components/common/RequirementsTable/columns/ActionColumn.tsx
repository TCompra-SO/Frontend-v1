import { ColumnType } from "antd/es/table";
import { RequirementTableItem } from "../../../../models/MainInterfaces";
import { Dropdown, Space } from "antd";
import ButtonContainer from "../../../containers/ButtonContainer";
import { CaretDownOutlined } from "@ant-design/icons";
import {
  Action,
  ActionByState,
  ActionLabel,
} from "../../../../utilities/types";
import { useTranslation } from "react-i18next";

export default function ActionColumn(
  // title: string,
  onButtonClick: (action: Action, data: RequirementTableItem) => void,
  hidden: boolean = false
) {
  const { t } = useTranslation();

  const col: ColumnType<RequirementTableItem> = {
    title: t("actionColumn"),
    key: "action",
    align: "center",
    showSorterTooltip: false,
    width: "135px",
    hidden,
    render: (record: RequirementTableItem) => {
      return (
        <Space size="middle">
          <Dropdown
            trigger={["click"]}
            menu={{
              items: ActionByState[record.state].map((action: Action) => {
                return {
                  key: action,
                  label: ActionLabel[action],
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
            />
          </Dropdown>
        </Space>
      );
    },
  };
  return col;
}
