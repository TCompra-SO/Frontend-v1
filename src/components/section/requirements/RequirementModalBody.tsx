import { Divider } from "antd";
import RequirementInfo from "./RequirementInfo";
import RequirementOfferFilters from "./RequirementOfferFilters";
import RequirementOfferList from "./RequirementOfferList";
import Title from "antd/es/typography/Title";
import { OfferListItem } from "../../../models/MainInterfaces";

interface RequirementModalBodyProps {
  offerList: OfferListItem[]
}

export default function RequirementModalBody(props: RequirementModalBodyProps) {
  return (
    <>
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
      <RequirementOfferList offers={props.offerList}/>
    </>
  )
}
