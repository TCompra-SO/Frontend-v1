import { LockOutlined } from "@ant-design/icons";
import { ProFormText } from "@ant-design/pro-components";
import { Lengths } from "../../../utilities/lengths";
import { useTranslation } from "react-i18next";

export default function Password() {
  const { t } = useTranslation();

  return (
    <ProFormText.Password
      name="password"
      label={t("password")}
      labelCol={{ span: 0 }}
      fieldProps={{
        size: "large",
        prefix: <LockOutlined className={"prefixIcon"} />,
      }}
      placeholder={t("password")}
      rules={[
        {
          required: true,
        },
        {
          min: Lengths.password.min,
        },
        {
          max: Lengths.password.max,
        },
      ]}
    />
  );
}
