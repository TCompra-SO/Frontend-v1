import { Form } from "antd";
import SelectContainer from "../../../containers/SelectContainer";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { ListsContext } from "../../../../contexts/listsContext";
import { getListForSelectIdValueMap } from "../../../../utilities/globalFunctions";

export default function UserTypeAU() {
  const { t } = useTranslation();
  const context = useContext(ListsContext);
  const { userRolesData } = context;
  console.log(userRolesData);

  return (
    <div className="t-flex ad-user">
      <div className="titulo-input">{t("userType")}</div>

      <Form.Item
        label={t("userType")}
        name="userType"
        labelCol={{ span: 0 }}
        rules={[{ required: true }]}
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
