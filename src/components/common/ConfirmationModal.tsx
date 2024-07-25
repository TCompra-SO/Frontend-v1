import { Flex } from "antd";
import ButtonContainer from "../containers/ButtonContainer";

interface ConfirmationModalProps {
  text: string;
  icon: React.ReactNode;
  onClose: (ok: boolean) => void;
}
export default function ConfirmationModal(props: ConfirmationModalProps) {
  return (
    <Flex vertical>
      {props.text}
      <ButtonContainer
        onClick={() => props.onClose(true)}
        type="primary"
        text="Aceptar"
      />
      <ButtonContainer onClick={() => props.onClose(false)} text="Cancelar" />
    </Flex>
  );
}
