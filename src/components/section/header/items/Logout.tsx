import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Flex } from "antd";
import { useTranslation } from "react-i18next";
import { darkerGray } from "../../../../utilities/colors";

export default function Logout() {
  const { t } = useTranslation();

  return (
    <Flex justify="flex-start" align="center">
      <FontAwesomeIcon
        style={{ fontSize: "1.2em", color: darkerGray }}
        icon={faDoorOpen}
      />
      <div style={{ marginLeft: "8px" }}> {t("logout")}</div>
    </Flex>
  );
}
