import { Modal, ModalProps } from "antd";

interface NoContentModalContainerProps extends ModalProps {
  showFooter?: boolean;
}

export default function NoContentModalContainer(
  props: NoContentModalContainerProps
) {
  const modalProps: ModalProps = {
    ...props,
    destroyOnClose: props.destroyOnClose ?? true,
    closable: props.closable ?? true,
    centered: true,
    maskClosable: props.maskClosable ?? true,
    onCancel: props.onClose,
  };

  if (props.showFooter) return <Modal {...modalProps}></Modal>;
  else return <Modal {...modalProps} footer={null}></Modal>;
}
