import { useTranslation } from "react-i18next";
import { useState } from "react";
import SelectContainer from "../../../containers/SelectContainer";
import { DocType } from "../../../../utilities/types";
import { Avatar, Spin } from "antd";
import {
  companySearchAfterMseconds,
  defaultUserImage,
  searchSinceLength,
} from "../../../../utilities/globals";
import { debounce } from "lodash";
import { useSearchCompanyByName } from "../../../../hooks/authHooks";
import { getSearchString } from "../../../../utilities/globalFunctions";
import SimpleLoading from "../../../../pages/utils/SimpleLoading";

interface SelectCompanyFieldProps {
  forHomeFilter?: boolean;
  onCompanySelected: (companyId: string) => void;
}

export default function SelectCompanyField(props: SelectCompanyFieldProps) {
  const { t } = useTranslation();
  const { loadingCompanyList, searchCompanyByName, clearList, companyList } =
    useSearchCompanyByName();
  const [value, setValue] = useState<string>();
  const [lastSearchValue, setLastSearchValue] = useState("");

  const searchCompany = debounce((newValue: string) => {
    const temp = getSearchString(newValue);
    if (lastSearchValue != temp && temp.length >= searchSinceLength) {
      searchCompanyByName(temp);
      setLastSearchValue(temp);
    } else {
      clearList();
    }
  }, companySearchAfterMseconds);

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
      className={`form-control ${
        props.forHomeFilter ? "f-empresa" : "form-filter"
      }`}
      notFoundContent={
        loadingCompanyList ? (
          <SimpleLoading style={{ marginLeft: "-10px" }} size="large" />
        ) : null
      }
      onChange={handleChange}
      onSearch={searchCompany}
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
      // searchValue={selectValue}
      // onInputKeyDown={onInputKeyDown}
    />
  );
}
