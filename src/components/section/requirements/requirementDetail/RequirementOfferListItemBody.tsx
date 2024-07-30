import {
  faCalendarCheck,
  faEnvelope,
  faHandHoldingDollar,
  faMapLocationDot,
  faStopwatch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Flex, Row, Space } from "antd";
import Title from "antd/es/typography/Title";
import {
  darkColor,
  lightColor,
  primaryColor,
  secondaryBackgroundColor,
} from "../../../../utilities/colors";
import {
  OfferListItem,
  RequirementTableItem,
} from "../../../../models/MainInterfaces";
import moment from "moment";
import { commonModalWidth, dateFormat } from "../../../../utilities/globals";
import ButtonContainer from "../../../containers/ButtonContainer";
import ModalContainer from "../../../containers/ModalContainer";
import {
  Action,
  ActionLabel,
  ModalTypes,
  OfferState,
  RequirementState,
} from "../../../../utilities/types";
import { useState } from "react";
import { ModalContent } from "../../../../models/Interfaces";
import { useTranslation } from "react-i18next";

interface RequirementOfferListItemBodyProps {
  offer: OfferListItem;
  requirement: RequirementTableItem;
}

export default function RequirementOfferListItemBody(
  props: RequirementOfferListItemBodyProps
) {
  const { t } = useTranslation();
  const [modalWidth, setModalWidth] = useState(commonModalWidth);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalTitle, setModalTitle] = useState<React.ReactNode>("");
  const [dataModal, setDataModal] = useState<ModalContent>({
    type: ModalTypes.NONE,
    data: {},
  });

  function onOpenModal(action: Action) {
    switch (action) {
      case Action.CANCEL_PURCHASE_ORDER:
        setIsOpenModal(true);
        setModalTitle(ActionLabel[action]);
        setDataModal({
          type: ModalTypes.CANCEL_PURCHASE_ORDER,
          data: {
            offerId: props.offer.key,
            requirementId: props.requirement.key,
          },
        });
        setModalWidth("750px");
        break;
      case Action.SELECT_OFFER:
        setIsOpenModal(true);
        setModalTitle("Aviso");
        setDataModal({
          type: ModalTypes.SELECT_OFFER,
          data: {
            offer: props.offer,
            requirement: props.requirement,
          },
        });
        break;
      case Action.RATE_CANCELED:
        setIsOpenModal(true);
        setModalTitle(ActionLabel[action]);
        setDataModal({
          type: ModalTypes.RATE_CANCELED,
          data: {
            user: props.offer.user,
            requirementOffertitle: props.requirement.title,
            type: props.requirement.type,
            isOffer: false, //r3v
          },
        });
        setModalWidth("600px");
    }
  }

  function handleOnCloseModal() {
    setIsOpenModal(false);
  }

  return (
    <>
      <Row
        gutter={[8, 8]}
        style={{
          borderRadius: "10px",
          padding: "10px",
          boxShadow: "0 2px 18px rgba(0, 0, 0, 0.1)",
          fontWeight: "600",
          marginBottom: "12px",
        }}
      >
        <Title
          style={{
            textAlign: "center",
            margin: "0",
            width: "100%",
            background: secondaryBackgroundColor,
            borderRadius: "10px",
          }}
          level={5}
        >
          {t("participantDetails")}
        </Title>
        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
          <Space direction="vertical">
            <Space align="start">
              <FontAwesomeIcon icon={faMapLocationDot} color={primaryColor} />
              <Space direction="vertical" size={0}>
                <div style={{ fontSize: "0.9em" }}>{t("locationColumn")}</div>
                {props.offer.location}
              </Space>
            </Space>
            <Space align="start">
              <FontAwesomeIcon
                icon={faHandHoldingDollar}
                color={primaryColor}
              />
              <Space direction="vertical" size={0}>
                <div style={{ fontSize: "0.9em" }}>{t("priceColumn")}</div>
                {`${props.offer.coin} ${props.offer.price}`}
              </Space>
            </Space>
          </Space>
        </Col>
        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
          <Space direction="vertical">
            <Space align="start">
              <FontAwesomeIcon icon={faEnvelope} color={primaryColor} />
              <Space direction="vertical" size={0}>
                <div style={{ fontSize: "0.9em" }}>{t("email")}</div>
                <div className="long-text-wrap">{props.offer.user.email}</div>
              </Space>
            </Space>
            <Space align="start">
              <FontAwesomeIcon icon={faStopwatch} color={primaryColor} />
              <Space direction="vertical" size={0}>
                <div style={{ fontSize: "0.9em" }}>{t("deliveryTime")}</div>
                {props.offer.deliveryTime}
              </Space>
            </Space>
          </Space>
        </Col>
        {props.offer.selectionDate && (
          <div
            style={{
              textAlign: "center",
              margin: "0",
              padding: "2px",
              width: "100%",
              background: lightColor,
              borderRadius: "10px",
              color: darkColor,
            }}
          >
            <Space>
              {t("selectionDate")}:
              <FontAwesomeIcon icon={faCalendarCheck} color={primaryColor} />
              {moment(props.offer.selectionDate).format(dateFormat)}
            </Space>
          </div>
        )}
        <Flex justify="center" gap="small" style={{ width: "100%" }}>
          {props.offer.state == OfferState.WINNER && (
            <ButtonContainer
              text={ActionLabel[Action.CANCEL_PURCHASE_ORDER]}
              type="primary"
              onClick={() => onOpenModal(Action.CANCEL_PURCHASE_ORDER)}
              upperCaseSmaller={true}
            />
          )}
          {props.offer.state == OfferState.ACTIVE &&
            props.requirement.state == RequirementState.PUBLISHED && (
              <ButtonContainer
                text={ActionLabel[Action.SELECT_OFFER]}
                type="primary"
                onClick={() => onOpenModal(Action.SELECT_OFFER)}
                upperCaseSmaller={true}
              />
            )}
          {props.offer.state == OfferState.CANCELED && ( // r3v creador de ofera canceló la oferta
            <ButtonContainer
              text={ActionLabel[Action.RATE_CANCELED]}
              type="primary"
              onClick={() => onOpenModal(Action.RATE_CANCELED)}
              upperCaseSmaller={true}
            />
          )}
          <ButtonContainer
            text={t("chat")}
            type="primary"
            upperCaseSmaller={true}
          />
        </Flex>
      </Row>
      <ModalContainer
        content={dataModal}
        isOpen={isOpenModal}
        onClose={handleOnCloseModal}
        title={modalTitle}
        width={modalWidth}
      />
    </>
  );
}
