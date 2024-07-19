import { Flex, Modal } from "antd";
import { ModalTypes } from "../../utilities/types";
import RequirementModal from "../section/requirements/RequirementModal";
import { ExclamationCircleFilled } from "@ant-design/icons";
import TextAreaContainer from "./TextAreaContainer";
import RequirementModalOfferSelected from "../section/requirements/RequirementModalOfferSelected";
import { ModalProps } from "antd/lib";

interface ModalContainerProps extends ModalProps {
  type: ModalTypes;
  data: any;
  isOpen: boolean;
  // onClose: (param: boolean?) => void;
  showFooter?: boolean;
  className?: string;
  maskClosable?: boolean;
}

export default function ModalContainer(props: ModalContainerProps) {
  function getContent() {
    switch (props.type) {
      case ModalTypes.DETAILED_REQUIREMENT: {
        return (
          <RequirementModal
            offerList={props.data.offerList}
            requirement={props.data.requirement}
          />
        );
      }
      case ModalTypes.CANCEL_PURCHASE_ORDER: {
        return (
          <Flex vertical gap={8}>
            <span>
              <ExclamationCircleFilled />{" "}
              <b>Indique el motivo de la cancelación</b>
            </span>
            <TextAreaContainer rows={4} placeholder="Motivo" maxLength={255} />
          </Flex>
        );
      }
      case ModalTypes.SELECT_OFFER: {
        return (
          <RequirementModalOfferSelected
            offer={props.data.offer}
            requirement={props.data.requirement}
            offerFilters={props.data.offerFilters}
          />
        );
      }
    }
  }

  if (props.showFooter)
    return (
      <Modal
        {...props}
        centered
        open={props.isOpen}
        maskClosable={
          props.maskClosable !== undefined ? props.maskClosable : true
        }
        onCancel={props.onClose}
      >
        {getContent()}
      </Modal>
    );
  else
    return (
      <Modal
        centered
        open={props.isOpen}
        footer={null}
        maskClosable={
          props.maskClosable !== undefined ? props.maskClosable : true
        }
        onCancel={props.onClose}
      >
        {getContent()}
      </Modal>
    );
}
