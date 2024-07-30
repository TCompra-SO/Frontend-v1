import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";

export default function Notification() {
  const { t } = useTranslation();

  return (
    <div className="icon">
      <FontAwesomeIcon icon={faBell} />
      <div className="item-label">{t("notifications")}</div>
    </div>
  );
}
