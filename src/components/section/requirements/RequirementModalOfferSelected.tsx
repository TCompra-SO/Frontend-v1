import TextAreaContainer from "../../containers/TextAreaContainer";
import { Col, Flex, Row } from "antd";
import {
  OfferListItem,
  RequirementTableItem,
} from "../../../models/MainInterfaces";
import { SyntheticEvent, useContext } from "react";
import { requirementDetailContext } from "../../../contexts/requirementDetailContext";
import ButtonContainer from "../../containers/ButtonContainer";
import { useTranslation } from "react-i18next";
import { PriceFilter, WarrantyFilter } from "../../../utilities/types";
import { Lengths } from "../../../utilities/lengths";

interface RequirementModalOfferSelectedProps {
  offer: OfferListItem;
  requirement: RequirementTableItem;
  onClose: (e: SyntheticEvent<Element, Event>) => any;
}

export default function RequirementModalOfferSelected(
  props: RequirementModalOfferSelectedProps
) {
  const { t } = useTranslation();
  const { filters, filterNames } = useContext(requirementDetailContext);

  function selectOffer(e: SyntheticEvent<Element, Event>) {
    console.log(props.offer.key, props.requirement.key);
    console.log(filters);
    props.onClose(e);
  }

  return (
    <div className="modal-card">
      <div className="t-flex alert-base">
        <i className="fa-regular fa-circle-exclamation sub-icon"></i>
        <div className="alert-info">{t("selectOfferConfirmation")}</div>
        <Row gutter={8} style={{ width: "100%" }}>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Flex>
              <div className="titulo-input">
                {t("sortedBy")} {t("priceColumn")}:{" "}
                {filters.price == PriceFilter.ALL
                  ? t("all")
                  : filters.price == PriceFilter.ASC
                  ? t("ascending")
                  : t("descending")}
              </div>
            </Flex>
            <Flex>
              <div className="titulo-input">
                {t("sortedBy")} {t("deliveryTime")}: {filterNames.deliveryTime}
              </div>
            </Flex>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Flex>
              <div className="titulo-input">
                {t("sortedBy")} {t("locationColumn")}: {filterNames.location}
              </div>
            </Flex>
            <Flex>
              <div className="titulo-input">
                {t("sortedBy")} {t("warranty")}:{" "}
                {filters.warranty == WarrantyFilter.ALL
                  ? t("all")
                  : filters.warranty == WarrantyFilter.ASC
                  ? t("ascending")
                  : t("descending")}
              </div>
            </Flex>
          </Col>
        </Row>
        <div className="t-flex wd-100">
          <TextAreaContainer
            className="form-control wd-100"
            rows={4}
            placeholder={t("notes")}
            maxLength={Lengths.selectOfferObs.max}
          />
        </div>
        <div className="t-flex gap-15 wd-100 alert-btn">
          <ButtonContainer
            children={t("acceptButton")}
            className="btn btn-default alert-boton"
            onClick={selectOffer}
          />
          <ButtonContainer
            children={t("cancelButton")}
            className="btn btn-second alert-boton"
            onClick={props.onClose}
          />
        </div>
      </div>
    </div>
  );
}
