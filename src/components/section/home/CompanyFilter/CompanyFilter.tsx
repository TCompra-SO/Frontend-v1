import { useTranslation } from "react-i18next";
import { useContext, useEffect } from "react";
import { HomeContext } from "../../../../contexts/Homecontext";
import SelectCompanyField from "./SelectCompanyField";
import { useParams } from "react-router-dom";
import { useSearchCompanyByName } from "../../../../hooks/utilHooks";
import { rucFormat } from "../../../../utilities/globals";

export default function CompanyFilter() {
  const { t } = useTranslation();
  const { updateUserId } = useContext(HomeContext);
  const { searchCompanyByName, companyList } = useSearchCompanyByName();
  const { companyId } = useParams();

  useEffect(() => {
    if (companyId && rucFormat.test(companyId)) {
      searchCompanyByName(companyId);
    }
    return () => updateUserId("", "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (companyList.length)
      updateUserId(companyList[0].uid, companyList[0].name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyList]);

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
