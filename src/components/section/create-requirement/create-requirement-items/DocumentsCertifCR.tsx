import { useTranslation } from "react-i18next";
import TextAreaContainer from "../../../containers/TextAreaContainer";

export default function DocumentsCertifCR() {
  const { t } = useTranslation();

  return (
    <>
      <div className="titulo-input">{t("documentListCertif")}</div>

      <TextAreaContainer className="form-control" disabled />
    </>
  );
}
