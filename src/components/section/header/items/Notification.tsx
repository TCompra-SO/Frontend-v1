import { faBell } from "@fortawesome/free-regular-svg-icons/faBell";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import { darkerGray } from "../../../../utilities/colors";

export default function Notification() {
  const { t } = useTranslation();

  return (
    <div className="icon">
      <FontAwesomeIcon
        style={{ fontSize: "1.2em", color: darkerGray }}
        icon={faBell}
      />
      <div className="item-label">{t("notifications")}</div>
    </div>
  );
}
