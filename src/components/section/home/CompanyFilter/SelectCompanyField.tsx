import { useTranslation } from "react-i18next";
import { useState } from "react";
import SelectContainer from "../../../containers/SelectContainer";
import { DocType } from "../../../../utilities/types";
import { Avatar, Spin } from "antd";
import { defaultUserImage } from "../../../../utilities/globals";
import { debounce } from "lodash";
import { useSearchCompanyByName } from "../../../../hooks/authHook";

interface SelectCompanyFieldProps {
  onCompanySelected: (companyId: string) => void;
}

export default function SelectCompanyField(props: SelectCompanyFieldProps) {
  const { t } = useTranslation();
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

  function onCompanySelected(companyId: string) {
    props.onCompanySelected(companyId);
  }

  function handleChange(companyId: string) {
    setValue(companyId);
    onCompanySelected(companyId);
  }

  return (
    <SelectContainer
      showSearch
      allowClear
      value={value}
      style={{ width: "100%" }}
      placeholder={t("companyName")}
      className="form-control form-filter"
      notFoundContent={loadingCompanyList ? <Spin size="small" /> : null}
      onChange={handleChange}
      onSearch={handleSearch}
      onClear={() => clearList()}
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
  );
}
