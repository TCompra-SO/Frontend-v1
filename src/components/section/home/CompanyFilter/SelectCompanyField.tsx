import { useTranslation } from "react-i18next";
import { useEffect, useMemo, useState } from "react";
import SelectContainer from "../../../containers/SelectContainer";
import { DocType } from "../../../../utilities/types";
import { Avatar } from "antd";
import {
  inputSearchAfterMseconds,
  defaultUserImage,
  searchSinceLength,
} from "../../../../utilities/globals";
import { debounce } from "lodash";
import { getSearchString } from "../../../../utilities/globalFunctions";
import SimpleLoading from "../../../../pages/utils/SimpleLoading";
import { useSearchCompanyByName } from "../../../../hooks/utilHooks";

interface SelectCompanyFieldProps {
  forHomeFilter?: boolean;
  onCompanySelected: (companyId: string, companyName: string) => void;
}

export default function SelectCompanyField(props: SelectCompanyFieldProps) {
  const { t } = useTranslation();
  const { loadingCompanyList, searchCompanyByName, clearList, companyList } =
    useSearchCompanyByName();
  const [value, setValue] = useState<string>();

  useEffect(() => {
    return () => {
      searchCompany.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const searchCompany = useMemo(
    () =>
      debounce((newValue: string) => {
        const temp = getSearchString(newValue);
        if (typeof temp === "string" && temp.length >= searchSinceLength) {
          searchCompanyByName(temp);
        } else {
          clearList();
        }
      }, inputSearchAfterMseconds),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  function handleChange(companyId: string) {
    const companyName = companyList.find((x) => x.uid == companyId)?.name ?? "";
    setValue(companyId);
    props.onCompanySelected(companyId, companyName);
  }

  return (
    <SelectContainer
      showSearch
      allowClear
      value={value}
      style={{ width: "100%" }}
      placeholder={`${t("companyName")} ${t("or")} ${t("RUC")}`}
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
