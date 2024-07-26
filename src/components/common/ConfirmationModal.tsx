import { Flex, Space } from "antd";
import ButtonContainer from "../containers/ButtonContainer";
import { ExclamationCircleFilled } from "@ant-design/icons";

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
          text="Aceptar"
        />
        <ButtonContainer
          onClick={(e) => closeModal(e, false)}
          text="Cancelar"
          type="primary"
        />
      </Flex>
    </Flex>
  );
}
