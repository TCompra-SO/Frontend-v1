import { faDoorOpen } from "@fortawesome/free-solid-svg-icons/faDoorOpen";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Flex } from "antd";
import { useTranslation } from "react-i18next";

export default function Logout() {
  const { t } = useTranslation();

  return (
    <Flex justify="flex-start" align="center">
      <FontAwesomeIcon icon={faDoorOpen} />
      <div style={{ marginLeft: "8px" }}> {t("logout")}</div>
    </Flex>
  );
}
