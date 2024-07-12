import { Divider, Modal, } from "antd"
import { ModalTypes } from "../../utilities/types";
import Title from "antd/es/typography/Title"
import RequirementInfo from "../section/requirements/RequirementInfo"
import RequirementOfferFilters from "../section/requirements/RequirementOfferFilters";
import RequirementOfferList from "../section/requirements/RequirementOfferList";
import { OfferListItem } from "../../models/MainInterfaces";

interface ModalContainerProps {
  type: ModalTypes,
  data: OfferListItem[]
}

export default function ModalContainer(props: ModalContainerProps) {
  switch (props.type) {
    case ModalTypes.DETAILED_REQUIREMENT:
      return (
        <Modal 
          title='ssss hfdjhdj fjdhfjdh jh'
          open={true}
          closable={false}
          width='850px'
          footer={null}
          style={{ 
            maxHeight: '75vh', 
            overflowY: 'scroll', 
            paddingBottom: '0',
          }}
          className="custom-scroll"
        >
          <Divider style={{margin: '10px 0'}}/>
          <RequirementInfo></RequirementInfo>
          <div
            style={{
              textAlign: 'center', 
              margin: '15px 0', 
              padding: '10px',
              boxShadow: '0 2px 18px rgba(0, 0, 0, 0.1)',
              borderRadius: '10px'
            }}
          >
            <b>Filtros de búsqueda: </b> Puede seleccionar opciones para ordenar y filtrar ofertas
          </div>
          <RequirementOfferFilters></RequirementOfferFilters>
          <Divider style={{margin: '15px 0'}}/>
          <Title style={{textAlign: 'center', marginTop: '0'}} level={4}>Ofertas recibidas</Title>
          <RequirementOfferList offers={props.data}/>
        </Modal>
      )
    case ModalTypes.VALIDATE_CODE:
      return (
        <div>ModalContainer</div>
      )
  }
  
}
