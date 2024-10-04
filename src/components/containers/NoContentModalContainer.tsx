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
        // closable={props.closable !== undefined ? props.closable : false}
        closable={true}
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
        // closable={props.closable !== undefined ? props.closable : false}
        closable={true}
        footer={null}
        maskClosable={
          props.maskClosable !== undefined ? props.maskClosable : true
        }
        onCancel={props.onClose}
      ></Modal>
    );
}
