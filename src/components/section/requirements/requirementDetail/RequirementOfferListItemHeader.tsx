import { Avatar, Badge, Col, Flex, Row, Space } from "antd";
import { OfferListItem } from "../../../../models/MainInterfaces";
import TagContainer from "../../../containers/TagContainer";
import {
  darkColor,
  lightColor,
  primaryColor,
} from "../../../../utilities/colors";
import DotContainer from "../../../containers/DotContainer";
import {
  OfferState,
  RequirementType,
  UserTable,
} from "../../../../utilities/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUniversity } from "@fortawesome/free-solid-svg-icons/faUniversity";
import RatingContainer from "../../../containers/RatingContainer";
import {
  faFile,
  faImage,
  faMapMarkerAlt,
  faShieldAlt,
  faStopwatch,
} from "@fortawesome/free-solid-svg-icons";
import PriceContainer from "../../../containers/PriceContainer";
import { useState } from "react";
import useScreenSize from "../../../../hooks/useScreenSize";

interface RequirementOfferListItemProps {
  offer: OfferListItem;
  style?: React.CSSProperties;
  showOfferState?: boolean;
  showUserData?: boolean;
}

export default function RequirementOfferListItemHeader({
  showOfferState = true,
  showUserData = true,
  ...props
}: RequirementOfferListItemProps) {
  const [isSmallScreen] = useState(useScreenSize());

  return (
    <>
      <Row
        style={{
          ...props.style,
          borderRadius:
            props.offer.state == OfferState.WINNER ||
            props.offer.state == OfferState.CANCELED
              ? "10px 10px 0 0"
              : "10px",
          padding: "10px",
          boxShadow: "0 2px 18px rgba(0, 0, 0, 0.1)",
          fontWeight: "600",
        }}
      >
        <Col xs={24} sm={24} md={16} lg={17} xl={17}>
          <Space direction="vertical" size={4}>
            {showUserData && (
              <>
                <Flex wrap align="center" gap="small">
                  <TagContainer
                    text={props.offer.user.name}
                    color={lightColor}
                    truncateText
                    style={{ color: darkColor }}
                  />
                  {props.offer.subUser && (
                    <>
                      <DotContainer></DotContainer>
                      <TagContainer
                        text={props.offer.subUser.name}
                        color={lightColor}
                        truncateText
                        style={{ color: darkColor }}
                      />
                    </>
                  )}
                  <DotContainer />

                  {props.offer.location}

                  <DotContainer />
                  {props.offer.user.userTable == UserTable.COMPANY
                    ? "EMPRESA"
                    : "PERSONA"}
                </Flex>

                {props.offer.user.userTable == UserTable.COMPANY && (
                  <Space>
                    <FontAwesomeIcon icon={faUniversity} color={primaryColor} />
                    Antigüedad: {props.offer.user.tenure}
                  </Space>
                )}
              </>
            )}
            <div style={{ fontSize: "1.3em" }}>{props.offer.title}</div>

            {props.offer.description ?? null}

            <Flex wrap gap="3px 10px" align="center">
              {!showUserData && (
                <Space>
                  <FontAwesomeIcon
                    icon={faMapMarkerAlt}
                    color={primaryColor}
                  ></FontAwesomeIcon>
                  Ubicación: {props.offer.location}
                </Space>
              )}
              <Space>
                <FontAwesomeIcon
                  icon={faStopwatch}
                  color={primaryColor}
                ></FontAwesomeIcon>
                Entrega: {props.offer.deliveryTime}
              </Space>
              <Space>
                <FontAwesomeIcon
                  icon={faShieldAlt}
                  color={primaryColor}
                ></FontAwesomeIcon>
                Garantía: {props.offer.warranty}
              </Space>
            </Flex>
          </Space>
        </Col>
        <Col xs={24} sm={24} md={8} lg={7} xl={7}>
          {isSmallScreen && (
            <Flex
              justify="space-between"
              align="center"
              style={{ marginTop: "7px" }}
            >
              <Space direction="vertical" size={0}>
                {showUserData && (
                  <RatingContainer
                    score={
                      props.offer.type == RequirementType.SALE
                        ? props.offer.user.customerScore
                        : props.offer.user.sellerScore
                    }
                    readOnly
                  />
                )}
                <Space size={0}>
                  <PriceContainer
                    price={props.offer.price}
                    coin={props.offer.coin}
                  />
                  / Con IGV
                </Space>
              </Space>
              <Space
                style={{ margin: showUserData ? "10px 5px 0 0" : "0 5px 0 0" }}
              >
                <Badge count={5} offset={[-5, 5]}>
                  <Avatar
                    shape="square"
                    size="large"
                    icon={<FontAwesomeIcon icon={faFile}></FontAwesomeIcon>}
                  />
                </Badge>
                <Badge count={5} offset={[-5, 5]}>
                  <Avatar
                    shape="square"
                    size="large"
                    icon={<FontAwesomeIcon icon={faImage}></FontAwesomeIcon>}
                  />
                </Badge>
              </Space>
            </Flex>
          )}
          {!isSmallScreen && (
            <Flex vertical align="flex-end">
              {showUserData && (
                <RatingContainer
                  score={
                    props.offer.type == RequirementType.SALE
                      ? props.offer.user.customerScore
                      : props.offer.user.sellerScore
                  }
                  readOnly
                />
              )}

              <Space style={{ margin: "10px 5px 0 0" }}>
                <Badge count={5} offset={[-5, 5]}>
                  <Avatar
                    shape="square"
                    size="large"
                    icon={<FontAwesomeIcon icon={faFile}></FontAwesomeIcon>}
                  />
                </Badge>
                <Badge count={5} offset={[-5, 5]}>
                  <Avatar
                    shape="square"
                    size="large"
                    icon={<FontAwesomeIcon icon={faImage}></FontAwesomeIcon>}
                  />
                </Badge>
              </Space>
              <Space size={0}>
                <PriceContainer
                  price={props.offer.price}
                  coin={props.offer.coin}
                />
                / Con IGV
              </Space>
            </Flex>
          )}
        </Col>
      </Row>
      {showOfferState &&
        (props.offer.state == OfferState.WINNER ||
          props.offer.state == OfferState.CANCELED) && (
          <Flex
            justify="center"
            style={{
              borderRadius: "0 0 10px 10px",
              background:
                props.offer.state == OfferState.WINNER ? "green" : "red",
              padding: "10px",
              boxShadow: "0 2px 18px rgba(0, 0, 0, 0.1)",
              fontWeight: "600",
              color: "#ffffff",
              fontSize: "1.2em",
            }}
          >
            Oferta
            {props.offer.state == OfferState.WINNER ? " elegida" : " cancelada"}
          </Flex>
        )}
    </>
  );
}
