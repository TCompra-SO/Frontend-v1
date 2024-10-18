import { useTranslation } from "react-i18next";
import InputContainer from "../../containers/InputContainer";

export default function NameMP() {
  const { t } = useTranslation();
  return (
    <div className="t-flex datos-input">
      <div className="titulo-input">{t("name")}</div>
      <InputContainer type="text" className="form-control" />
    </div>
  );
}
