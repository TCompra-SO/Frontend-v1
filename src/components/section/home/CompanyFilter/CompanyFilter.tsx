import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { HomeContext } from "../../../../contexts/Homecontext";
import SelectCompanyField from "./SelectCompanyField";

export default function CompanyFilter() {
  const { t } = useTranslation();
  const { updateUserId } = useContext(HomeContext);

  return (
    <div className="card-white back-filter">
      <div className="t-filtro">{t("companyFilter")}</div>
      <SelectCompanyField onCompanySelected={updateUserId} />
    </div>
  );
}
