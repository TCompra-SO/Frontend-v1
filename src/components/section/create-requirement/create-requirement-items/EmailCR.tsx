import { useTranslation } from "react-i18next";
import InputContainer from "../../../containers/InputContainer";
import { useSelector } from "react-redux";
import { MainState } from "../../../../models/Redux";
import { useState } from "react";

export default function EmailCR() {
  const { t } = useTranslation();
  const [email] = useState(useSelector((state: MainState) => state.user.email));

  return (
    <>
      <div className="titulo-input">{t("email")}</div>
      <InputContainer className="form-control" defaultValue={email} disabled />
    </>
  );
}
