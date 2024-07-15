import { Modal, } from "antd"
import { ModalTypes } from "../../utilities/types";
import RequirementModalBody from "../section/requirements/RequirementModalBody";

interface ModalContainerProps {
  type: ModalTypes,
  data: any,
  isOpen: boolean,
  onClose: () => void,
}

export default function ModalContainer(props: ModalContainerProps) {
  function handleClose() {
    console.log(2222);
    props.onClose();
  }

  switch (props.type) {
    case ModalTypes.DETAILED_REQUIREMENT:
      return (
        <Modal 
          destroyOnClose
          title='ssss hfdjhdj fjdhfjdh jh'
          open={props.isOpen}
          closable={true}
          width='850px'
          footer={null}
          style={{ 
            maxHeight: '75vh', 
            overflowY: 'scroll', 
            paddingBottom: '0',
          }}
          className="custom-scroll"
          onClose={handleClose}
        >
          <RequirementModalBody
            offerList={props.data}
          />
        </Modal>
      )
    case ModalTypes.VALIDATE_CODE:
      return (
        <div>ModalContainer</div>
      )
  }
  
}
