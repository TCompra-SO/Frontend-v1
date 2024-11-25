import { useTranslation } from "react-i18next";
import InputContainer from "../../containers/InputContainer";

export default function CompanyFilter() {
  const { t } = useTranslation();

  return (
    <div className="card-white back-filter">
      <div className="t-filtro">{t("companyFilter")}</div>
      <InputContainer
        type="text"
        className="form-control form-filter"
        placeholder={t("companyName")}
      />
    </div>
  );
}
