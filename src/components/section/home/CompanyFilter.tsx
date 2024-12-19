import { useTranslation } from "react-i18next";
import { useContext, useEffect, useState } from "react";
import { HomeContext } from "../../../contexts/Homecontext";
import SelectContainer from "../../containers/SelectContainer";
import { DisplayUser } from "../../../models/MainInterfaces";
import { DocType } from "../../../utilities/types";
import { Avatar, Spin } from "antd";
import { defaultUserImage } from "../../../utilities/globals";
import { debounce } from "lodash";

const aaa: DisplayUser[] = [
  {
    uid: "5AM89Ku44FQ9S7qrmwol",
    name: "Soluciones",
    document: "22222",
  },
  {
    uid: "EOuyocZiTZVT91ZOo0rW",
    name: "unsa sas as a sa s a s",
    document: "3233232",
  },
];

export default function CompanyFilter() {
  const { t } = useTranslation();
  const { updateUserId } = useContext(HomeContext);
  const [value, setValue] = useState<string>();
  const [companyList, setCompanyList] = useState<DisplayUser[]>([]);

  function search(companyId: string) {
    updateUserId(companyId); // r3v
  }

  const handleSearch = debounce((newValue: string) => {
    if (newValue.trim().length >= 3) {
      setCompanyList(aaa); // r3v
      console.log(newValue);
    }
    // else {
    //   setCompanyList([]);
    // }
  }, 300);

  function handleChange(newValue: string) {
    setValue(newValue);
    search(newValue);
  }

  useEffect(() => {
    console.log(companyList);
  }, [companyList]);

  return (
    <div className="card-white back-filter">
      <div className="t-filtro">{t("companyFilter")}</div>
      <SelectContainer
        showSearch
        value={value}
        style={{ width: "100%" }}
        placeholder={t("companyName")}
        className="form-control form-filter"
        // notFoundContent={fetching ? <Spin size="small" /> : null}
        // notFoundContent={null}
        onChange={handleChange}
        onSearch={handleSearch}
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
