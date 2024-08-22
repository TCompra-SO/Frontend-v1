import { faUser } from "@fortawesome/free-regular-svg-icons/faUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Flex } from "antd";
import { useTranslation } from "react-i18next";
import { darkerGray } from "../../../../utilities/colors";

export default function ProfileMenu() {
  const { t } = useTranslation();

  return (
    <Flex justify="flex-start" align="center">
      <FontAwesomeIcon
        style={{ fontSize: "1.2em", color: darkerGray }}
        icon={faUser}
      />
      <div style={{ marginLeft: "8px" }}> {t("myProfile")}</div>
    </Flex>
  );
}
