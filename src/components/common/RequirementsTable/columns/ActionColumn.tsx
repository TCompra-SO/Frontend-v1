import { ColumnType } from "antd/es/table";
import { RequirementTableItem } from "../../../../models/MainInterfaces";
import { Dropdown, Space } from "antd";
import ButtonContainer from "../../../containers/ButtonContainer";
import { CaretDownOutlined } from "@ant-design/icons";

export default function ActionColumn(hidden: boolean = false) {
  const col: ColumnType<RequirementTableItem> = {
    title: "Action",
    key: "action",
    align: "center",
    showSorterTooltip: false,
    width: "135px",
    hidden,
    render: () => (
      <Space size="middle">
        <Dropdown
          trigger={["click"]}
          menu={{
            items: [
              {
                key: "profile",
                label: "perfil",
              },
              {
                key: "logout",
                label: "salir",
              },
            ],
          }}
        >
          <ButtonContainer
            size="small"
            type="primary"
            ghost
            text="Seleccione"
            upperCaseSmaller
            icon={<CaretDownOutlined />}
            iconPosition="end"
          />
        </Dropdown>
      </Space>
    ),
  };
  return col;
}
