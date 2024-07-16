import { Flex, Modal, } from "antd"
import { ModalTypes } from "../../utilities/types";
import RequirementModal from "../section/requirements/RequirementModal";
import React from "react";
import { ClosableType } from "antd/es/_util/hooks/useClosable";
import { ExclamationCircleFilled } from "@ant-design/icons";
import TextAreaContainer from "./TextAreaContainer";
import RequirementModalOfferSelected from "../section/requirements/RequirementModalOfferSelected";

interface ModalContainerProps {
  type: ModalTypes,
  data: any,
  isOpen: boolean,
  onClose: () => void,
  destroyOnClose?: boolean,
  title?: React.ReactNode,
  closable?: ClosableType,
  width?: string | number,
  showFooter?: boolean,
  style?: React.CSSProperties,
  className?: string,
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
        )
      }
      case ModalTypes.CANCEL_PURCHASE_ORDER: {
        return (
          <Flex vertical gap={8}>
            <span><ExclamationCircleFilled/> <b>Indique el motivo de la cancelación</b></span>
            <TextAreaContainer rows={4} placeholder="Motivo" maxLength={255}/>
          </Flex>
        )
      }
      case ModalTypes.SELECT_OFFER: {
        return (
          <RequirementModalOfferSelected 
            offer={props.data.offer} 
            requirement={props.data.requirement} 
            offerFilters={props.data.offerFilters}     
          />
        )
      }
    }
}

  function handleClose() {
    console.log(2222);
    props.onClose();
  }

  if (props.showFooter)
    return (
      <Modal 
        centered
        destroyOnClose={props.destroyOnClose}
        title={props.title}
        open={props.isOpen}
        closable={props.closable}
        width={props.width}
        style={props.style}
        className={props.className}
        onClose={handleClose}
      >
        {getContent()}
      </Modal>
    )
  else
    return (
      <Modal 
        centered
        destroyOnClose={props.destroyOnClose}
        title={props.title}
        open={props.isOpen}
        closable={props.closable}
        width={props.width}
        style={props.style}
        className={props.className}
        onClose={handleClose}
        footer={null}
      >
        {getContent()}
      </Modal>
    )  
}
