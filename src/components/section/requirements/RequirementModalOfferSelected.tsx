import { ExclamationCircleFilled } from "@ant-design/icons";
import TextAreaContainer from "../../containers/TextAreaContainer";
import { Col, Flex, Row, Space } from "antd";
import {
  OfferListItem,
  RequirementTableItem,
} from "../../../models/MainInterfaces";
import { SyntheticEvent, useContext } from "react";
import { requirementDetailContext } from "../../../contexts/requirementDetailContext";
import ButtonContainer from "../../containers/ButtonContainer";

interface RequirementModalOfferSelectedProps {
  offer: OfferListItem;
  requirement: RequirementTableItem;
  onClose: (e: SyntheticEvent<Element, Event>) => any;
}

export default function RequirementModalOfferSelected(
  props: RequirementModalOfferSelectedProps
) {
  const { filters } = useContext(requirementDetailContext);

  function selectOffer(e: SyntheticEvent<Element, Event>) {
    console.log(props.offer.key, props.requirement.key);
    console.log(filters);
    props.onClose(e);
  }

  return (
    <>
      <Space>
        <ExclamationCircleFilled />
        <b>¿Está seguro de elegir la oferta?</b>
      </Space>
      <Row gutter={8}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Flex>Ordenado por precio: {filters.price}</Flex>
          <Flex>Ordenado por tiempo de entrega: {filters.deliveryTime}</Flex>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Flex>Ordenado por ubicación: {filters.location}</Flex>
          <Flex>Ordenado por garantía: {filters.warranty}</Flex>
        </Col>
      </Row>
      <TextAreaContainer
        rows={4}
        placeholder="Observaciones"
        maxLength={255}
        style={{ marginTop: "8px", marginBottom: "10px" }}
      />
      <Flex gap="small" justify="flex-end">
        <ButtonContainer text="Aceptar" type="primary" onClick={selectOffer} />
        <ButtonContainer
          text="Cancelar"
          type="primary"
          onClick={props.onClose}
        />
      </Flex>
    </>
  );
}
