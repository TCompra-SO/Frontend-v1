import { useTranslation } from "react-i18next";
import InputContainer from "../../containers/InputContainer";
import ButtonContainer from "../../containers/ButtonContainer";
import { useContext, useState } from "react";
import { HomeContext } from "../../../contexts/Homecontext";

export default function CompanyFilter() {
  const { t } = useTranslation();
  const [companyName, setCompanyName] = useState("");
  const { updateUserId } = useContext(HomeContext);

  function onChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
    setCompanyName(e.target.value);
  }

  function search() {
    console.log(companyName);
    updateUserId("5AM89Ku44FQ9S7qrmwol"); // r3v
  }

  return (
    <div className="card-white back-filter">
      <div className="t-filtro">{t("companyFilter")}</div>
      <InputContainer
        type="text"
        className="form-control form-filter"
        placeholder={t("companyName")}
        onChange={onChangeInput}
      />
      <ButtonContainer className="btn btn-default" onClick={search}>
        <i className="fa-regular fa-search"></i>
      </ButtonContainer>
    </div>
  );
}
