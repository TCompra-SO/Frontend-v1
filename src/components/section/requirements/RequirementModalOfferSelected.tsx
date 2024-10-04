import TextAreaContainer from "../../containers/TextAreaContainer";
import { Col, Flex, Row } from "antd";
import { Offer, Requirement } from "../../../models/MainInterfaces";
import { SyntheticEvent, useContext } from "react";
import { requirementDetailContext } from "../../../contexts/requirementDetailContext";
import ButtonContainer from "../../containers/ButtonContainer";
import { useTranslation } from "react-i18next";
import { Lengths } from "../../../utilities/lengths";
import SelectContainer from "../../containers/SelectContainer";
import { filterLabels } from "../../../utilities/colors";

interface RequirementModalOfferSelectedProps {
  offer: Offer;
  requirement: Requirement;
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
          <Col xs={12} sm={12} md={6} lg={6} xl={6}>
            <Flex vertical align="center">
              <b style={{ color: "#92acbf" }}>{t("priceColumn")}</b>
              <SelectContainer
                options={[
                  {
                    value: filters.price,
                    label: t(filterLabels[filters.price]),
                  },
                ]}
                style={{ width: "100%" }}
                className="form-control"
                defaultValue={filters.price}
                disabled
              />
            </Flex>
          </Col>

          <Col xs={12} sm={12} md={6} lg={6} xl={6}>
            <Flex vertical align="center">
              <b style={{ color: "#92acbf" }}>{t("locationColumn")}</b>
              <SelectContainer
                options={[
                  {
                    value: filters.location,
                    label: filterNames.location,
                  },
                ]}
                style={{ width: "100%" }}
                className="form-control"
                defaultValue={filters.location}
                disabled
              />
            </Flex>
          </Col>

          <Col xs={12} sm={12} md={6} lg={6} xl={6}>
            <Flex vertical align="center">
              <b style={{ color: "#92acbf" }}>{t("delivery")}</b>
              <SelectContainer
                options={[
                  {
                    value: filters.deliveryTime,
                    label: filterNames.deliveryTime,
                  },
                ]}
                style={{ width: "100%" }}
                className="form-control"
                defaultValue={filters.deliveryTime}
                disabled
              />
            </Flex>
          </Col>

          <Col xs={12} sm={12} md={6} lg={6} xl={6}>
            <Flex vertical align="center">
              <b style={{ color: "#92acbf" }}>{t("warranty")}</b>
              <SelectContainer
                options={[
                  {
                    value: filters.warranty,
                    label: t(filterLabels[filters.warranty]),
                  },
                ]}
                style={{ width: "100%" }}
                className="form-control"
                defaultValue={filters.warranty}
                disabled
              />
            </Flex>
          </Col>
        </Row>
        <div className="t-flex wd-100">
          <TextAreaContainer
            className="form-control wd-100"
            autoSize
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
