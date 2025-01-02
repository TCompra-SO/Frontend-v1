import TextAreaContainer from "../../containers/TextAreaContainer";
import { Col, Flex, Row } from "antd";
import { Offer, Requirement } from "../../../models/MainInterfaces";
import { useContext, useEffect, useState } from "react";
import { requirementDetailContext } from "../../../contexts/RequirementDetailContext";
import ButtonContainer from "../../containers/ButtonContainer";
import { useTranslation } from "react-i18next";
import { Lengths } from "../../../utilities/lengths";
import SelectContainer from "../../containers/SelectContainer";
import { filterLabels } from "../../../utilities/colors";
import { SelectOfferRequest } from "../../../models/Requests";
import useApi from "../../../hooks/useApi";
import { useApiParams } from "../../../models/Interfaces";
import { selectOfferService } from "../../../services/requests/requirementService";
import useShowNotification from "../../../hooks/utilHook";

interface RequirementModalOfferSelectedProps {
  offer: Offer;
  requirement: Requirement;
  onClose: () => any;
  onSucces: (offerId: string) => void;
}

export default function RequirementModalOfferSelected(
  props: RequirementModalOfferSelectedProps
) {
  const { t } = useTranslation();
  const { showNotification } = useShowNotification();
  const { filters, filterNames } = useContext(requirementDetailContext);
  const [text, setText] = useState<string>("");
  const [apiParams, setApiParams] = useState<useApiParams<SelectOfferRequest>>({
    service: null,
    method: "get",
  });
  const { loading, responseData, error, errorMsg, fetchData } =
    useApi<SelectOfferRequest>({
      service: apiParams.service,
      method: apiParams.method,
      dataToSend: apiParams.dataToSend,
    });

  useEffect(() => {
    if (apiParams.service) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiParams]);

  useEffect(() => {
    if (responseData) {
      showNotification("success", t("offerSelectedSuccessfully"));
      props.onClose();
      if (apiParams.dataToSend?.offerID)
        props.onSucces(apiParams.dataToSend.offerID);
    } else if (error) {
      showNotification("error", errorMsg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData, error]);

  function handleTextChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setText(e.target.value);
  }

  function selectOffer() {
    const notes = text.trim();
    const data: SelectOfferRequest = {
      requerimentID: props.requirement.key,
      offerID: props.offer.key,
      price_Filter: filters.price,
      deliveryTime_Filter: filters.deliveryTime,
      location_Filter: filters.location,
      warranty_Filter: filters.warranty,
    };
    if (notes) data.observation = notes;
    console.log(data);
    setApiParams({
      service: selectOfferService(),
      method: "post",
      dataToSend: data,
    });
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
            onChange={handleTextChange}
          />
        </div>
        <div className="t-flex gap-15 wd-100 alert-btn">
          <ButtonContainer
            children={t("acceptButton")}
            className="btn btn-default alert-boton"
            onClick={selectOffer}
            loading={loading}
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
