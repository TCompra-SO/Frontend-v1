import { useTranslation } from "react-i18next";
import { useContext, useEffect } from "react";
import { HomeContext } from "../../../../contexts/Homecontext";
import SelectCompanyField from "./SelectCompanyField";

export default function CompanyFilter() {
  const { t } = useTranslation();
  const { updateUserId } = useContext(HomeContext);

  useEffect(() => {
    return () => updateUserId("", "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="card-white back-filter">
      <div className="t-filtro">
        <i className="fa-solid fa-building-magnifying-glass"></i>{" "}
        {t("companyFilter")}
      </div>
      <SelectCompanyField onCompanySelected={updateUserId} />
    </div>
  );
}
