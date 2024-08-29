import { UserOutlined } from "@ant-design/icons";
import { ProFormText } from "@ant-design/pro-components";
import { Lengths } from "../../../utilities/lengths";
import { RuleObject } from "antd/es/form";
import { useTranslation } from "react-i18next";

interface EmailProps {
  tlds: string[];
}

export default function Email({ tlds }: EmailProps) {
  const { t } = useTranslation();

  function validateDomain(_: RuleObject, value: string) {
    if (value && tlds.length > 0) {
      const lastDotIndex: number = value.lastIndexOf(".");
      if (lastDotIndex !== -1) {
        const segment = value.substring(lastDotIndex + 1).toUpperCase();
        if (!tlds.includes(segment))
          return Promise.reject(new Error(t("enterValidEmail")));
      }
    }
    return Promise.resolve();
  }

  return (
    <ProFormText
      name="email"
      label={t("email")}
      labelCol={{ span: 0 }}
      fieldProps={{
        size: "large",
        prefix: <UserOutlined className={"prefixIcon"} />,
      }}
      placeholder={t("email")}
      rules={[
        {
          required: true,
          type: "email",
        },
        {
          min: Lengths.email.min,
        },
        {
          max: Lengths.email.max,
        },
        {
          validator: validateDomain,
        },
      ]}
    />
  );
}
