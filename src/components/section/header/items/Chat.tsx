import { faComments } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";

export default function Chat() {
  const { t } = useTranslation();

  return (
    <div className="icon">
      <FontAwesomeIcon icon={faComments} />
      <div className="item-label">{t("chat")}</div>
    </div>
  );
}
