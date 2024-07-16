import { ExclamationCircleFilled } from "@ant-design/icons";
import TextAreaContainer from "../../containers/TextAreaContainer";
import { Col, Flex, Row, Space } from "antd";
import { OfferListItem, RequirementTableItem } from "../../../models/MainInterfaces";
import { OfferFilters } from "../../../models/Interfaces";

interface RequirementModalOfferSelectedProps {
  offer: OfferListItem,
  requirement: RequirementTableItem,
  offerFilters: OfferFilters
}

export default function RequirementModalOfferSelected(props: RequirementModalOfferSelectedProps) {
  return (
    <>
      <Space><ExclamationCircleFilled/> <b>¿Está seguro de elegir la oferta?</b></Space>
      <Row gutter={8}>  
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Flex>Ordenado por precio: {props.offerFilters.price}</Flex>
          <Flex>Ordenado por tiempo de entrega: {props.offerFilters.deliveryTime}</Flex>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Flex>Ordenado por ubicación: {props.offerFilters.location}</Flex>
          <Flex>Ordenado por garantía: {props.offerFilters.warranty}</Flex>
        </Col>
      </Row>
      <TextAreaContainer 
        rows={4} 
        placeholder="Observaciones" 
        maxLength={255}
        style={{marginTop: '8px'}}
      />
    </>
  )
}
