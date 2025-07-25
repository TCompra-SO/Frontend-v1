import { useTranslation } from "react-i18next";
import { useContext, useEffect } from "react";
import { HomeContext } from "../../../../contexts/Homecontext";
import SelectCompanyField from "./SelectCompanyField";

export default function CompanyFilter() {
  const { t } = useTranslation();
  const { updateUserId } = useContext(HomeContext);

  useEffect(() => {
    return () => updateUserId("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="card-white back-filter">
      <div className="t-filtro" style={{ marginBottom: "10px" }}>
        {t("companyFilter")}
      </div>
      <SelectCompanyField onCompanySelected={updateUserId} />
    </div>
  );
}
