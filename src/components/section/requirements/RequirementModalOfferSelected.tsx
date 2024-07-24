import { ExclamationCircleFilled } from "@ant-design/icons";
import TextAreaContainer from "../../containers/TextAreaContainer";
import { Col, Flex, Row, Space } from "antd";
import {
  OfferListItem,
  RequirementTableItem,
} from "../../../models/MainInterfaces";
import { useContext } from "react";
import { requirementDetailContext } from "../../../contexts/requirementDetailContext";

interface RequirementModalOfferSelectedProps {
  offer: OfferListItem;
  requirement: RequirementTableItem;
}

export default function RequirementModalOfferSelected(
  props: RequirementModalOfferSelectedProps
) {
  const { filters } = useContext(requirementDetailContext);
  console.log(filters);

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
        style={{ marginTop: "8px" }}
      />
    </>
  );
}
