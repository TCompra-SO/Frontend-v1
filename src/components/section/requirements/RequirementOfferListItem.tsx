import { Col, Row } from "antd"
import { OfferListItem } from "../../../models/MainInterfaces"
import TagContainer from "../../containers/TagContainer"
import { darkColor, lightColor, primaryColor } from "../../../utilities/colors"
import DotContainer from "../../containers/DotContainer"
import { UserTable } from "../../../utilities/types"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUniversity } from "@fortawesome/free-solid-svg-icons/faUniversity"

interface RequirementOfferListItemProps {
  offer: OfferListItem,
  style?: React.CSSProperties
}

export default function RequirementOfferListItem(props: RequirementOfferListItemProps) {
  return (
    <Row style={{
      ...props.style,
      borderRadius: '10px',
      padding: '10px',
      boxShadow: '0 2px 18px rgba(0, 0, 0, 0.1)',
      fontWeight: '600'
    }}>
      <Col xs={12} sm={12} md={18} lg={18} xl={18}>
        <TagContainer
          text={props.offer.user.name}
          color={lightColor}
          style={{color: darkColor}}
        />
        <DotContainer marginRight/>
        {props.offer.location}
        <DotContainer marginRight marginLeft/>
        {props.offer.user.userTable == UserTable.COMPANY ? 'EMPRESA' : 'PERSONA'}
        <br></br>

        {
          props.offer.user.userTable == UserTable.COMPANY && (
            <>
              <FontAwesomeIcon icon={faUniversity} color={primaryColor}/> Antigüedad: {props.offer.user.tenure}
            </>
          )
        }
        
      </Col>
      <Col xs={12} sm={12} md={6} lg={6} xl={6}>
      </Col>
    </Row>
  )
}
