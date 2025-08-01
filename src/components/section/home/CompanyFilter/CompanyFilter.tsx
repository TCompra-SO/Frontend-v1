import { useTranslation } from "react-i18next";
import { useContext, useEffect } from "react";
import { HomeContext } from "../../../../contexts/Homecontext";
import SelectCompanyField from "./SelectCompanyField";
import { useParams } from "react-router-dom";
import { useSearchCompanyByName } from "../../../../hooks/utilHooks";
import { rucFormat } from "../../../../utilities/globals";
import SelectContainer from "../../../containers/SelectContainer";

interface CompanyFilterProps {
  openLoginModal?: () => void;
}

export default function CompanyFilter(props: CompanyFilterProps) {
  const { t } = useTranslation();
  const { updateUserId } = useContext(HomeContext);
  const { searchCompanyByName, companyList } = useSearchCompanyByName();
  const { companyId } = useParams();

  useEffect(() => {
    if (companyId && rucFormat.test(companyId)) {
      searchCompanyByName(companyId);
    }
    return () =>
      updateUserId({
        uid: "",
        name: "",
        document: "",
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (companyList.length) updateUserId(companyList[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyList]);

  return (
    <div className="card-white back-filter">
      <div className="t-filtro">
        <i className="fa-solid fa-building-magnifying-glass"></i>{" "}
        {t("companyFilter")}
      </div>
      {props.openLoginModal ? (
        <SelectContainer
          showSearch
          allowClear
          placeholder={`${t("companyName")} ${t("or")} ${t("RUC")}`}
          className={`form-control form-filter`}
          style={{ width: "100%" }}
          onSearch={() => props.openLoginModal?.()}
          styles={{
            popup: {
              root: {
                display: "none",
              },
            },
          }}
          onInputKeyDown={(e) => {
            e.stopPropagation(); // Stops dropdown from appearing
          }}
        ></SelectContainer>
      ) : (
        <SelectCompanyField onCompanySelected={updateUserId} />
      )}
    </div>
  );
}
