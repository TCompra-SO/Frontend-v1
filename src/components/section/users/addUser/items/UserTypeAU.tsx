import { Form } from "antd";
import SelectContainer from "../../../../containers/SelectContainer";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { ListsContext } from "../../../../../contexts/listsContext";
import { getListForSelectIdValueMap } from "../../../../../utilities/globalFunctions";
import { UserRoles } from "../../../../../utilities/types";

interface UserTypeAUProps {
  edit?: boolean;
  value?: UserRoles;
}

export default function UserTypeAU(props: UserTypeAUProps) {
  const { t } = useTranslation();
  const context = useContext(ListsContext);
  const { userRolesData } = context;

  return (
    <div className="t-flex ad-user">
      <div className="titulo-input">{t("userType")}</div>

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
    </div>
  );
}
