import { Avatar, Badge, Col, Flex, Row, Space } from "antd"
import { OfferListItem } from "../../../models/MainInterfaces"
import TagContainer from "../../containers/TagContainer"
import { darkColor, lightColor, primaryColor } from "../../../utilities/colors"
import DotContainer from "../../containers/DotContainer"
import { UserTable } from "../../../utilities/types"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUniversity } from "@fortawesome/free-solid-svg-icons/faUniversity"
import RatingContainer from "../../containers/RatingContainer"
import { faFile, faImage, faShieldAlt, faStopwatch } from "@fortawesome/free-solid-svg-icons"
import PriceContainer from "../../containers/PriceContainer";
import { useState } from "react"
import useScreenSize from "../../../hooks/useScreenSize"

interface RequirementOfferListItemProps {
  offer: OfferListItem,
  style?: React.CSSProperties
}

export default function RequirementOfferListItemHeader(props: RequirementOfferListItemProps) {
  const [isSmallScreen] = useState(useScreenSize());

  return (
    <Row style={{
      ...props.style,
      borderRadius: '10px',
      padding: '10px',
      boxShadow: '0 2px 18px rgba(0, 0, 0, 0.1)',
      fontWeight: '600'
    }}>
      <Col xs={24} sm={24} md={16} lg={17} xl={17}>
        <Space direction="vertical" size={4}>
          <Flex wrap align="center" gap='small'>
            <TagContainer
              text={props.offer.user.name}
              color={lightColor}
              style={{color: darkColor,}}              
            />
            {
              props.offer.subUser && (
                <>
                  <DotContainer></DotContainer>
                  <TagContainer
                    text={props.offer.subUser.name}
                    color={lightColor}
                    style={{color: darkColor}}
                  />
                </>
              )
            }
            <DotContainer/>
            
            {props.offer.location}
                        
            <DotContainer/>
            {props.offer.user.userTable == UserTable.COMPANY ? 'EMPRESA' : 'PERSONA'}
          </Flex>

          {
            props.offer.user.userTable == UserTable.COMPANY && (
              <Space>
                <FontAwesomeIcon icon={faUniversity} color={primaryColor}/> Antigüedad: {props.offer.user.tenure}
              </Space>
            )
          }
          <div style={{fontSize: '1.3em'}}>
            {props.offer.title}
          </div>
          
          {props.offer.description ?? null}

          <Space>
            <FontAwesomeIcon icon={faStopwatch} color={primaryColor}></FontAwesomeIcon> Entrega: {props.offer.deliveryTime}
            <FontAwesomeIcon icon={faShieldAlt} color={primaryColor}></FontAwesomeIcon> Garantía: {props.offer.warranty}
          </Space>
        </Space>
      </Col>
      <Col xs={24} sm={24} md={8} lg={7} xl={7}>
        {
          isSmallScreen && (
            <Flex justify="space-between" align="center" style={{marginTop: '7px'}}>
              <Space direction="vertical" size={0}>
                <RatingContainer score={5} />
                <Space size={0}>
                  <PriceContainer price={props.offer.price} coin={props.offer.coin}/>/ Con IGV
                </Space>
              </Space>
              <Space style={{margin: '10px 5px 0 0'}}>
                <Badge count={5} offset={[-5, 5]}>
                  <Avatar shape="square" size="large" icon={<FontAwesomeIcon icon={faFile}></FontAwesomeIcon>}/>
                </Badge>
                <Badge count={5} offset={[-5, 5]}>
                  <Avatar shape="square" size="large" icon={<FontAwesomeIcon icon={faImage}></FontAwesomeIcon>}/>
                </Badge>
              </Space>
              
            </Flex>
          )
        }
        {
          !isSmallScreen && (
            <Flex vertical  align="flex-end">
              <RatingContainer score={5} />
              <Space style={{margin: '10px 5px 0 0'}}>
                <Badge count={5} offset={[-5, 5]}>
                  <Avatar shape="square" size="large" icon={<FontAwesomeIcon icon={faFile}></FontAwesomeIcon>}/>
                </Badge>
                <Badge count={5} offset={[-5, 5]}>
                  <Avatar shape="square" size="large" icon={<FontAwesomeIcon icon={faImage}></FontAwesomeIcon>}/>
                </Badge>
              </Space>
              <Space size={0}>
                <PriceContainer price={props.offer.price} coin={props.offer.coin}/>/ Con IGV
              </Space>
            </Flex>
          )
        }        
      </Col>
    </Row>
  )
}
