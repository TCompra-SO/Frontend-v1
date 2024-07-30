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
import { useTranslation } from "react-i18next";

interface RequirementModalOfferSelectedProps {
  offer: OfferListItem;
  requirement: RequirementTableItem;
  onClose: (e: SyntheticEvent<Element, Event>) => any;
}

export default function RequirementModalOfferSelected(
  props: RequirementModalOfferSelectedProps
) {
  const { t } = useTranslation();
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
        <b>{t("selectOfferConfirmation")}</b>
      </Space>
      <Row gutter={8}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Flex>
            {t("sortedBy")} {t("priceColumn")}: {filters.price}
          </Flex>
          <Flex>
            {t("sortedBy")} {t("deliveryTime")}: {filters.deliveryTime}
          </Flex>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Flex>
            {t("sortedBy")} {t("locationColumn")}: {filters.location}
          </Flex>
          <Flex>
            {t("sortedBy")} {t("warranty")}: {filters.warranty}
          </Flex>
        </Col>
      </Row>
      <TextAreaContainer
        rows={4}
        placeholder={t("notes")}
        maxLength={255}
        style={{ marginTop: "8px", marginBottom: "10px" }}
      />
      <Flex gap="small" justify="flex-end">
        <ButtonContainer
          text={t("acceptButton")}
          type="primary"
          onClick={selectOffer}
        />
        <ButtonContainer
          text={t("cancelButton")}
          type="primary"
          onClick={props.onClose}
        />
      </Flex>
    </>
  );
}
