import { faCalendarCheck, faEnvelope, faHandHoldingDollar, faMapMarkerAlt, faStopwatch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Flex, Row, Space } from "antd";
import Title from "antd/es/typography/Title";
import { darkColor, lightColor, primaryColor, secondaryBackgroundColor } from "../../../utilities/colors";
import { OfferListItem } from "../../../models/MainInterfaces";
import moment from "moment";
import { dateFormat } from "../../../utilities/globals";
import ButtonContainer from "../../containers/ButtonContainer";

interface RequirementOfferListItemBodyProps {
  offer: OfferListItem
}

export default function RequirementOfferListItemBody(props: RequirementOfferListItemBodyProps) {
  return (
    <Row
      gutter={[8, 8]}
      style={{
        borderRadius: '10px',
        padding: '10px',
        boxShadow: '0 2px 18px rgba(0, 0, 0, 0.1)',
        fontWeight: '600',
        marginBottom: '12px'
      }}
    >
      <Title 
        style={{
          textAlign: 'center', 
          margin: '0', 
          width: '100%', 
          background: secondaryBackgroundColor,
          borderRadius: '10px'
        }} 
        level={5}
      >
        Detalles del ofertante
      </Title>
      <Col xs={24} sm={12} md={12} lg={12} xl={12}>
        <Space direction="vertical">
          <Space align="start">
            <FontAwesomeIcon icon={faMapMarkerAlt} color={primaryColor}/> 
            <Space direction="vertical" size={0}>
              <div style={{fontSize: '0.9em'}}>Ubicación</div>
              {props.offer.location}
            </Space>
          </Space>
          <Space align="start">
            <FontAwesomeIcon icon={faHandHoldingDollar} color={primaryColor}/> 
            <Space direction="vertical" size={0}>
              <div style={{fontSize: '0.9em'}}>Precio de cotización</div>
              {`${props.offer.coin} ${props.offer.price}`}
            </Space>
          </Space>
        </Space>
      </Col>
      <Col xs={24} sm={12} md={12} lg={12} xl={12}>
        <Space direction="vertical" >
          <Space align="start">
            <FontAwesomeIcon icon={faEnvelope} color={primaryColor}/> 
            <Space direction="vertical" size={0}>
              <div style={{fontSize: '0.9em'}}>Correo</div>
              {props.offer.user.email}
            </Space>
          </Space>
          <Space align="start">
            <FontAwesomeIcon icon={faStopwatch} color={primaryColor}/> 
            <Space direction="vertical" size={0}>
              <div style={{fontSize: '0.9em'}}>Entrega</div>
              {props.offer.deliveryTime}
            </Space>
          </Space>
        </Space>
      </Col>
      { props.offer.selectionDate && (
        <div
          style={{
            textAlign: 'center', 
            margin: '0', 
            padding: '2px',
            width: '100%', 
            background: lightColor,
            borderRadius: '10px',
            color: darkColor,
          }}>
            <Space>
              Fecha de selección: 
              <FontAwesomeIcon icon={faCalendarCheck} color={primaryColor}/>
              { moment(props.offer.selectionDate).format(dateFormat) }
            </Space>
        </div>
      )}
      <Flex justify="center" gap='small' style={{width: '100%'}}>
        {
          props.offer.selectionDate && (
            <ButtonContainer 
              text='Cancelar orden de compra'
              type="primary"
              upperCaseSmaller
            />
          )
        }
        <ButtonContainer 
          text='Chat'
          type="primary"
          upperCaseSmaller
        />
      </Flex>
    </Row>
  )
}
