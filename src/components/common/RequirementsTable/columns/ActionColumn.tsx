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

export default function ActionColumn(
  onButtonClick: (action: Action, data: any) => void,
  hidden: boolean = false
) {
  const col: ColumnType<RequirementTableItem> = {
    title: "Acciones",
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
              text="Seleccione"
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
