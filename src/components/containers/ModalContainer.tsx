import { Flex, Modal, Space } from "antd";
import { ModalTypes } from "../../utilities/types";
import RequirementDetail from "../section/requirements/requirementDetail/RequirementDetail";
import { ExclamationCircleFilled } from "@ant-design/icons";
import TextAreaContainer from "./TextAreaContainer";
import RequirementModalOfferSelected from "../section/requirements/RequirementModalOfferSelected";
import { ModalProps } from "antd/lib";
import RequirementOfferSummary from "../section/requirements/requirementOfferSummary/RequirementOfferSummary";
import RequirementModalRepublish from "../section/requirements/RequirementModalRepublish";
import { ModalData } from "../../models/Interfaces";

interface ModalContainerProps extends ModalProps {
  type: ModalTypes;
  data: ModalData;
  isOpen: boolean;
  // onClose?: (param: boolean) => void;
  showFooter?: boolean;
  className?: string;
  maskClosable?: boolean;
  // width?: string | number;
  // destroyOnClose?: boolean;
}

export default function ModalContainer(props: ModalContainerProps) {
  function getContent() {
    switch (props.type) {
      case ModalTypes.NONE: {
        return null;
      }
      case ModalTypes.DETAILED_REQUIREMENT: {
        return (
          props.data.offerList &&
          props.data.requirement && (
            <RequirementDetail
              offerList={props.data.offerList}
              requirement={props.data.requirement}
            />
          )
        );
      }
      case ModalTypes.CANCEL_PURCHASE_ORDER: {
        return (
          <Flex vertical gap={8}>
            <Space>
              <ExclamationCircleFilled />
              <b>Indique el motivo de la cancelación</b>
            </Space>
            <TextAreaContainer rows={4} placeholder="Motivo" maxLength={255} />
          </Flex>
        );
      }
      case ModalTypes.SELECT_OFFER: {
        return (
          props.data.offer &&
          props.data.requirement && (
            <RequirementModalOfferSelected
              offer={props.data.offer}
              requirement={props.data.requirement}
            />
          )
        );
      }
      case ModalTypes.OFFER_SUMMARY: {
        return (
          props.data.offer && (
            <RequirementOfferSummary offer={props.data.offer} />
          )
        );
      }
      case ModalTypes.REPUBLISH_REQUIREMENT: {
        return (
          props.data.requirement && (
            <RequirementModalRepublish requirement={props.data.requirement} />
          )
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
        {...props}
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
