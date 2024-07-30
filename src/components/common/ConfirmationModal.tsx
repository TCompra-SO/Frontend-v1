import { Flex, Space } from "antd";
import ButtonContainer from "../containers/ButtonContainer";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

interface ConfirmationModalProps {
  text: string;
  icon?: React.ReactNode;
  onClose: (e: React.SyntheticEvent<Element, Event>) => any;
  onAnswer: (ok: boolean) => any;
}
export default function ConfirmationModal(props: ConfirmationModalProps) {
  function closeModal(e: React.SyntheticEvent<Element, Event>, ok: boolean) {
    props.onAnswer(ok);
    props.onClose(e);
  }

  const { t } = useTranslation();

  return (
    <Flex vertical>
      <Space>
        {props.icon ?? <ExclamationCircleFilled />}
        {props.text}
      </Space>
      <Flex justify="end" gap="small" style={{ marginTop: "10px" }}>
        <ButtonContainer
          onClick={(e) => closeModal(e, true)}
          type="primary"
          text={t("acceptButton")}
        />
        <ButtonContainer
          onClick={(e) => closeModal(e, false)}
          text={t("cancelButton")}
          type="primary"
        />
      </Flex>
    </Flex>
  );
}
