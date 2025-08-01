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
import { DisplayUser } from "../../../../models/MainInterfaces";

interface SelectCompanyFieldProps {
  forHomeFilter?: boolean;
  onCompanySelected?: (user: DisplayUser) => void;
  customList?: DisplayUser[];
}

export default function SelectCompanyField(props: SelectCompanyFieldProps) {
  const { t } = useTranslation();
  const { loadingCompanyList, searchCompanyByName, clearList, companyList } =
    useSearchCompanyByName();
  const [value, setValue] = useState<string>();
  const [customList, setCustomList] = useState<DisplayUser[] | undefined>(
    undefined
  );

  useEffect(() => {
    setCustomList(props.customList);
    if (props.customList?.length) {
      setValue(props.customList[0].uid);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.customList]);

  useEffect(() => {
    return () => {
      searchCompany.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const searchCompany = useMemo(
    () =>
      debounce((newValue: string) => {
        setCustomList(undefined);
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
    const ind = companyList.findIndex((x) => x.uid == companyId);
    setValue(companyId);
    if (ind != -1) {
      props.onCompanySelected?.(companyList[ind]);
    } else {
      props.onCompanySelected?.({
        uid: "",
        name: "",
        document: "",
      });
    }
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
      options={(customList ?? companyList).map((comp) => ({
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
