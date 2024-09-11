import { useTranslation } from "react-i18next";
import InputContainer from "../../../containers/InputContainer";

interface EmailCRProps {
  email: string;
}

export default function EmailCR(props: EmailCRProps) {
  const { t } = useTranslation();

  return (
    <>
      <div className="titulo-input">{t("email")}</div>
      <InputContainer
        className="form-control"
        defaultValue={props.email}
        disabled
      />
    </>
  );
}
