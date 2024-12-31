import { useTranslation } from "react-i18next";
import { useContext, useState } from "react";
import { HomeContext } from "../../../contexts/Homecontext";
import SelectContainer from "../../containers/SelectContainer";
import { DocType } from "../../../utilities/types";
import { Avatar, Spin } from "antd";
import { defaultUserImage } from "../../../utilities/globals";
import { debounce } from "lodash";
import { useSearchCompanyByName } from "../../../hooks/authHook";

export default function CompanyFilter() {
  const { t } = useTranslation();
  const { updateUserId } = useContext(HomeContext);
  const { loadingCompanyList, searchCompanyByName, clearList, companyList } =
    useSearchCompanyByName();
  const [value, setValue] = useState<string>();

  const handleSearch = debounce((newValue: string) => {
    if (newValue.trim().length >= 3) {
      searchCompanyByName(newValue);
    } else {
      clearList();
    }
  }, 400);

  function search(companyId: string) {
    updateUserId(companyId);
  }

  function handleChange(newValue: string) {
    setValue(newValue);
    search(newValue);
  }

  return (
    <div className="card-white back-filter">
      <div className="t-filtro">{t("companyFilter")}</div>
      <SelectContainer
        showSearch
        value={value}
        style={{ width: "100%" }}
        placeholder={t("companyName")}
        className="form-control form-filter"
        notFoundContent={loadingCompanyList ? <Spin size="small" /> : null}
        onChange={handleChange}
        onSearch={handleSearch}
        filterOption={false}
        options={companyList.map((comp) => ({
          value: comp.uid,
          label: (
            <>
              <Avatar size={18} src={comp.image ?? defaultUserImage} /> |{" "}
              {comp.name} {DocType.RUC}: {comp.document}
            </>
          ),
        }))}
      />
    </div>
  );
}
