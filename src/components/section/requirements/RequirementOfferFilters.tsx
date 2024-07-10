import { Col, Flex, Row } from "antd";
import SelectContainer from "../../containers/SelectContainer";

export default function RequirementOfferFilters() {
  return (
    <Row gutter={[10,10]}>
      <Col xs={12} sm={12} md={6} lg={6} xl={6}>
        <Flex vertical align="center">
          <b>Precio</b>
          <SelectContainer 
            options={[{value: '1', label: 'Todos'}, {value: '2', label: 'Ascendente'}]} 
            defaultValue="1"
            style={{width: '100%', marginTop: '5px'}}
          />
        </Flex>
      </Col>
      <Col xs={12} sm={12} md={6} lg={6} xl={6}>
        <Flex vertical align="center">
          <b>Ubicación</b>
          <SelectContainer 
            options={[{value: '1', label: 'Todos'}, {value: '2', label: 'Ascendente Ascendente'}]} 
            defaultValue="1"
            style={{width: '100%', marginTop: '5px'}}
          />
        </Flex>
      </Col>
      <Col xs={12} sm={12} md={6} lg={6} xl={6}>
        <Flex vertical align="center">
          <b>Tiempo de entrega</b>
          <SelectContainer 
            options={[{value: '1', label: 'Todos'}, {value: '2', label: 'Ascendente'}]} 
            defaultValue="1"
            style={{width: '100%', marginTop: '5px'}}
          />
        </Flex>
      </Col>
      <Col xs={12} sm={12} md={6} lg={6} xl={6}>
        <Flex vertical align="center">
          <b>Garantía</b>
          <SelectContainer 
            options={[{value: '1', label: 'Todos'}, {value: '2', label: 'Ascendente'}]} 
            defaultValue="1"
            style={{width: '100%', marginTop: '5px'}}
          />
        </Flex>
      </Col>
    </Row>
  )
}
