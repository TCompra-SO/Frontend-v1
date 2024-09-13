import { useTranslation } from "react-i18next";

export default function Premium() {
  const { t } = useTranslation();

  return (
    <div className="user-premium">
      <i className="fa-regular fa-crown"></i> {t("premium")}
    </div>
  );
}
