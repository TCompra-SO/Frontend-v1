import { ColumnType } from "antd/es/table";
import { Dropdown } from "antd";
import ButtonContainer from "../../../containers/ButtonContainer";
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
    width: "130px",
    hidden,
    render: (record) => {
      const ActionByState: { [key: number]: Action[] } =
        type == TableTypes.REQUIREMENT
          ? ActionByStateRequirement
          : ActionByStateOffer; // r3v determinar si se debe mostrar calificar en oferta cancelada

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
          <div className="t-flex c-ofertas" style={{ padding: "7px 0" }}>
            <ButtonContainer
              className="btn btn-border-default btn-sm t-flex seleccionar-tb"
              children={
                <>
                  {t("select")} <i className="fa-solid fa-chevron-down"></i>
                </>
              }
            />
          </div>
        </Dropdown>
      );
    },
  };
  return col;
}
