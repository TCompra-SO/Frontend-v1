import { Col, Divider, Flex, Row, Space } from "antd";
import { OfferListItem } from "../../../models/MainInterfaces";
import { RequirementType, UserTable } from "../../../utilities/types";
import RatingContainer from "../../containers/RatingContainer";
import {
  darkColor,
  lighterColor,
  primaryColor,
  rowColor,
} from "../../../utilities/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faIdCard,
  faPhoneAlt,
  faUniversity,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import useScreenSize from "../../../hooks/useScreenSize";

interface RequirementOfferSummaryProps {
  offer: OfferListItem;
}

export default function RequirementOfferSummary(
  props: RequirementOfferSummaryProps
) {
  const [isSmallScreen] = useState(useScreenSize());

  return (
    <>
      <Divider style={{ margin: "15px 0" }} />
      <Flex
        vertical
        align="center"
        style={{
          background: rowColor,
          padding: "15px",
          borderRadius: "10px",
          fontSize: "1.1em",
          fontWeight: "600",
          marginBottom: "10px",
        }}
      >
        {props.offer.user.name.toUpperCase()}
        <div style={{ fontSize: "1em !imortant" }}>
          {props.offer.subUser && props.offer.subUser.name}
        </div>
        <RatingContainer
          score={
            props.offer.type == RequirementType.GOOD ||
            props.offer.type == RequirementType.SERVICE
              ? props.offer.user.sellerScore
              : props.offer.user.customerScore
          }
        ></RatingContainer>
      </Flex>
      {isSmallScreen && (
        <Flex
          style={{
            padding: "15px",
            background: lighterColor,
            borderRadius: "10px",
          }}
        >
          Antiguedad
        </Flex>
      )}
      {!isSmallScreen && (
        <Row
          gutter={[10, 10]}
          style={{
            padding: "15px",
            background: lighterColor,
            borderRadius: "10px",
          }}
        >
          <Col xs={12} sm={12} md={6} lg={6} xl={6}>
            <Space
              direction="vertical"
              size={0}
              align="center"
              style={{ color: darkColor, width: "100%", textAlign: "center" }}
            >
              <FontAwesomeIcon
                color={primaryColor}
                icon={faUniversity}
                style={{ fontSize: "2em" }}
              />

              {props.offer.user.userTable == UserTable.COMPANY && (
                <>
                  <b>Antigüedad:</b>
                  <b>{props.offer.user.tenure}</b>
                </>
              )}
              {props.offer.user.userTable == UserTable.PERSON && (
                <>
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
              <b>Correo:</b>{" "}
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
