import { Form } from "antd";
import SelectContainer from "../../containers/SelectContainer";
import { useTranslation } from "react-i18next";
import { ReactNode, useContext } from "react";
import { ListsContext } from "../../../contexts/listsContext";
import { getListForSelectIdValueMap } from "../../../utilities/globalFunctions";
import { UserRoles } from "../../../utilities/types";

interface UserTypeFieldProps {
  edit?: boolean;
  value?: UserRoles;
  onlyItem?: boolean;
}

export default function UserTypeField(props: UserTypeFieldProps) {
  const { t } = useTranslation();
  const context = useContext(ListsContext);
  const { userRolesData } = context;
  const item: ReactNode = (
    <Form.Item
      label={t("userType")}
      name="userType"
      labelCol={{ span: 0 }}
      rules={[{ required: true }]}
      initialValue={props.value}
    >
      <SelectContainer
        placeholder={t("select")}
        options={getListForSelectIdValueMap(userRolesData)}
        className="form-control"
      />
    </Form.Item>
  );
  if (props.onlyItem) return item;
  return (
    <div className="t-flex ad-user">
      <div className="titulo-input">{t("userType")}</div>
      {item}
    </div>
  );
}
