import { Col, Flex, Row, Space } from "antd";
import { OfferListItem } from "../../../../models/MainInterfaces";
import {
  darkColor,
  lighterColor,
  primaryColor,
} from "../../../../utilities/colors";
import { UserTable } from "../../../../utilities/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faIdCard,
  faMapLocationDot,
  faMapMarkerAlt,
  faPhoneAlt,
  faUniversity,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import useScreenSize from "../../../../hooks/useScreenSize";

interface RequirementOfferSummaryUserDataProps {
  offer: OfferListItem;
}

export default function RequirementOfferSummaryUserData(
  props: RequirementOfferSummaryUserDataProps
) {
  const [isSmallScreen] = useState(useScreenSize());
  const styles: React.CSSProperties = {
    padding: "15px",
    background: lighterColor,
    borderRadius: "10px",
    marginBottom: "10px",
    marginLeft: "0",
    marginRight: "0",
  };

  return (
    <>
      {isSmallScreen && (
        <Flex vertical style={styles} gap="small">
          {props.offer.user.userTable == UserTable.COMPANY && (
            <Space style={{ color: darkColor }} align="start">
              <FontAwesomeIcon color={primaryColor} icon={faUniversity} />
              <b>Antigüedad:</b>
              <b>{props.offer.user.tenure}</b>
            </Space>
          )}
          {props.offer.user.userTable == UserTable.PERSON && (
            <Space style={{ color: darkColor }} align="start">
              <FontAwesomeIcon color={primaryColor} icon={faMapMarkerAlt} />
              <b>Dirección:</b>

              <b>{props.offer.user.address}</b>
            </Space>
          )}
          <Space style={{ color: darkColor }} align="start">
            <FontAwesomeIcon color={primaryColor} icon={faIdCard} />
            <b>
              {props.offer.user.userTable == UserTable.COMPANY
                ? "RUC:"
                : "DNI:"}
            </b>
            <b>{props.offer.user.document}</b>
          </Space>
          <Space style={{ color: darkColor }} align="start">
            <FontAwesomeIcon color={primaryColor} icon={faPhoneAlt} />
            <b>Teléfono:</b> <b>{props.offer.user.phone}</b>
          </Space>
          <Space style={{ color: darkColor }} align="start">
            <FontAwesomeIcon color={primaryColor} icon={faEnvelope} />
            <b>Correo:</b>
            <div className="long-text-wrap">
              <b>{props.offer.user.email}</b>
            </div>
          </Space>
        </Flex>
      )}
      {!isSmallScreen && (
        <Row gutter={[10, 10]} style={styles}>
          <Col xs={12} sm={12} md={6} lg={6} xl={6}>
            <Space
              direction="vertical"
              size={0}
              align="center"
              style={{ color: darkColor, width: "100%", textAlign: "center" }}
            >
              {props.offer.user.userTable == UserTable.COMPANY && (
                <>
                  <FontAwesomeIcon
                    color={primaryColor}
                    icon={faUniversity}
                    style={{ fontSize: "2em" }}
                  />
                  <b>Antigüedad:</b>
                  <b>{props.offer.user.tenure}</b>
                </>
              )}
              {props.offer.user.userTable == UserTable.PERSON && (
                <>
                  <FontAwesomeIcon
                    color={primaryColor}
                    icon={faMapLocationDot}
                    style={{ fontSize: "2em" }}
                  />
                  <b>Dirección:</b>
                  <b>{props.offer.user.address}</b>
                </>
              )}
            </Space>
          </Col>
          <Col xs={12} sm={12} md={6} lg={6} xl={6}>
            <Space
              direction="vertical"
              size={0}
              align="center"
              style={{ color: darkColor, width: "100%", textAlign: "center" }}
            >
              <FontAwesomeIcon
                color={primaryColor}
                icon={faIdCard}
                style={{ fontSize: "2em" }}
              />
              <b>
                {props.offer.user.userTable == UserTable.COMPANY
                  ? "RUC:"
                  : "DNI:"}
              </b>
              <b>{props.offer.user.document}</b>
            </Space>
          </Col>
          <Col xs={12} sm={12} md={6} lg={6} xl={6}>
            <Space
              direction="vertical"
              size={0}
              align="center"
              style={{ color: darkColor, width: "100%", textAlign: "center" }}
            >
              <FontAwesomeIcon
                color={primaryColor}
                icon={faPhoneAlt}
                style={{ fontSize: "2em" }}
              />
              <b>Teléfono:</b> <b>{props.offer.user.phone}</b>
            </Space>
          </Col>
          <Col xs={12} sm={12} md={6} lg={6} xl={6}>
            <Space
              direction="vertical"
              size={0}
              align="center"
              style={{ color: darkColor, width: "100%", textAlign: "center" }}
            >
              <FontAwesomeIcon
                color={primaryColor}
                icon={faEnvelope}
                style={{ fontSize: "2em" }}
              />
              <b>Correo:</b>
              <div className="long-text-wrap">
                <b>{props.offer.user.email}</b>
              </div>
            </Space>
          </Col>
        </Row>
      )}
    </>
  );
}
