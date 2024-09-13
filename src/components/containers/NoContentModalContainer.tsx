import { Modal, ModalProps } from "antd";

interface NoContentModalContainerProps extends ModalProps {
  showFooter?: boolean;
}

export default function NoContentModalContainer(
  props: NoContentModalContainerProps
) {
  if (props.showFooter)
    return (
      <Modal
        {...props}
        destroyOnClose
        closable={false}
        centered
        maskClosable={
          props.maskClosable !== undefined ? props.maskClosable : true
        }
        onCancel={props.onClose}
      ></Modal>
    );
  else
    return (
      <Modal
        {...props}
        destroyOnClose
        centered
        closable={false}
        footer={null}
        maskClosable={
          props.maskClosable !== undefined ? props.maskClosable : true
        }
        onCancel={props.onClose}
      ></Modal>
    );
}
