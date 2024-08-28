import { faComments } from "@fortawesome/free-regular-svg-icons/faComments";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import { darkerGray } from "../../../../utilities/colors";

export default function Chat() {
  const { t } = useTranslation();

  return (
    <div className="icon">
      <FontAwesomeIcon
        style={{ fontSize: "1.2em", color: darkerGray }}
        icon={faComments}
      />
      <div className="item-label">{t("chat")}</div>
    </div>
  );
}
