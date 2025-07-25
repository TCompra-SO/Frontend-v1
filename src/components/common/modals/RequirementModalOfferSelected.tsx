import TextAreaContainer from "../../containers/TextAreaContainer";
import { Col, Flex, Row } from "antd";
import { Offer, Requirement } from "../../../models/MainInterfaces";
import { useContext, useEffect, useState } from "react";
import ButtonContainer from "../../containers/ButtonContainer";
import { useTranslation } from "react-i18next";
import { Lengths } from "../../../utilities/lengths";
import SelectContainer from "../../containers/SelectContainer";
import { SelectOfferRequest } from "../../../models/Requests";
import {
  CommonModalProps,
  FilterNames,
  OfferFilters,
} from "../../../models/Interfaces";
import useShowNotification from "../../../hooks/utilHooks";
import {
  ErrorMsgRequestType,
  ErrorRequestType,
  filterLabels,
  OrderTableType,
  RequirementType,
  ResponseRequestType,
  SystemNotificationType,
} from "../../../utilities/types";
import { getSelectOfferService } from "../../../utilities/globalFunctions";
import useSystemNotification from "../../../hooks/useSystemNotification";
import { MainSocketsContext } from "../../../contexts/MainSocketsContext";
import dayjs from "dayjs";

interface RequirementModalOfferSelectedProps extends CommonModalProps {
  offer: Offer;
  requirement: Requirement;
  onClose: () => any;
  onSuccess: (offerId: string) => void;
  filters: OfferFilters;
  filterNames: FilterNames;
}

export default function RequirementModalOfferSelected({
  filters,
  filterNames,
  ...props
}: RequirementModalOfferSelectedProps) {
  const { t } = useTranslation();
  const { getNotification } = useContext(MainSocketsContext);
  const { showNotification } = useShowNotification();
  const { getSystemNotification } = useSystemNotification();
  const [text, setText] = useState<string>("");
  const { loading } = props.useApiHook;

  useEffect(() => {
    props.setAdditionalApiParams({
      functionToExecute: function (
        responseData: ResponseRequestType,
        error: ErrorRequestType,
        errorMsg: ErrorMsgRequestType
      ) {
        if (responseData) {
          showNotification("success", t("offerSelectedSuccessfully"));
          props.onSuccess(props.offer.key);
          props.onClose();
        } else if (error) {
          showNotification("error", errorMsg);
        }
      },
    });

    return () => {
      props.setAdditionalApiParams({ functionToExecute: () => {} });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleTextChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setText(e.target.value);
  }

  function selectOffer() {
    const targetId = "";

    const notificationFn = getSystemNotification(
      SystemNotificationType.SELECT_OFFER
    );
    const basicNotification = notificationFn(props.requirement.type);
    const notification = getNotification({
      ...basicNotification,
      receiverId: props.offer.subUser
        ? props.offer.subUser.uid
        : props.offer.user.uid,
      timestamp: dayjs().toISOString(),
      targetId,
      extraTargetType: OrderTableType.RECEIVED,
      targetType: props.requirement.type,
    });

    const notes = text.trim();
    const data: SelectOfferRequest = {
      requerimentID: props.requirement.key,
      offerID: props.offer.key,
      price_Filter: filters.price,
      deliveryTime_Filter: filters.deliveryTime,
      location_Filter: filters.location,
      warranty_Filter: filters.warranty,
      notification,
    };
    if (notes) data.observation = notes;
    props.setApiParams({
      service: getSelectOfferService(props.requirement.type),
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
          {props.requirement.type == RequirementType.SALE && (
            <Col xs={0} sm={0} md={6} lg={6} xl={6}></Col>
          )}
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

          {props.requirement.type !== RequirementType.SALE && (
            <>
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
            </>
          )}
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
            common
            className="btn btn-second alert-boton"
            onClick={props.onClose}
          />
        </div>
      </div>
    </div>
  );
}
