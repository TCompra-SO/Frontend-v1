import { faUserEdit } from "@fortawesome/free-solid-svg-icons/faUserEdit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Flex } from "antd";
import { useTranslation } from "react-i18next";

export default function ProfileMenu() {
  const { t } = useTranslation();

  return (
    <Flex justify="flex-start" align="center">
      <FontAwesomeIcon icon={faUserEdit} />
      <div style={{ marginLeft: "8px" }}> {t("myProfile")}</div>
    </Flex>
  );
}
