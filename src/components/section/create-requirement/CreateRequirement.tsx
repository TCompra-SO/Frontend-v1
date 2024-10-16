import { App, Col, Form, Row } from "antd";
import CategoryCR from "./create-requirement-items/CategoryCR";
import TitleCR from "./create-requirement-items/TitleCR";
import { useTranslation } from "react-i18next";
import DescriptionCR from "./create-requirement-items/DescriptionCR";
import CanOfferCR from "./create-requirement-items/CanOfferCR";
import EmailCR from "./create-requirement-items/EmailCR";
import LocationCR from "./create-requirement-items/LocationCR";
import BudgetCR from "./create-requirement-items/BudgetCR";
import CurrencyCR from "./create-requirement-items/CurrencyCR";
import PaymentMethodCR from "./create-requirement-items/PaymentMethodCR";
import FinalDateCR from "./create-requirement-items/FinalDateCR";
import DeliveryTimeCR from "./create-requirement-items/DeliveryTimeCR";
import WarrantyCR from "./create-requirement-items/WarrantyCR";
import WarrantyTimeCR from "./create-requirement-items/WarrantyTimeCR";
import DocumentsCertifCR from "./create-requirement-items/DocumentsCertifCR";
import AddImagesRC from "./create-requirement-items/AddImagesRC";
import AddDocument from "./create-requirement-items/AddDocument";
import ButtonContainer from "../../containers/ButtonContainer";
import { RequirementType, Usage } from "../../../utilities/types";
import { useEffect, useState } from "react";
import ItemCondition from "./create-requirement-items/ItemCondition";
import { certifiedCompaniesOpt } from "../../../utilities/globals";
import { CreateRequirementRequest } from "../../../models/Requests";
import { useApiParams } from "../../../models/Interfaces";
import useApi from "../../../hooks/useApi";
import { equalServices } from "../../../utilities/globalFunctions";
import { createRequirementService } from "../../../services/requests/requirementService";
import showNotification from "../../../utilities/notification/showNotification";
import { MainState } from "../../../models/Redux";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { createSaleService } from "../../../services/requests/saleService";

interface CreateRequirementProps {
  closeModal: () => void;
}

export default function CreateRequirement(props: CreateRequirementProps) {
  const { t } = useTranslation();
  const uid = useSelector((state: MainState) => state.user.uid);
  const { notification } = App.useApp();
  const [form] = Form.useForm();
  const [type, setType] = useState<RequirementType>(RequirementType.GOOD);
  const [showDocListToCetificate, setShowDocListToCetificate] = useState(false);
  const [isPremium] = useState<boolean>(true); // r3v
  const [apiParams, setApiParams] = useState<
    useApiParams<CreateRequirementRequest>
  >({
    service: null,
    method: "get",
  });
  const { loading, responseData, error, errorMsg, fetchData } =
    useApi<CreateRequirementRequest>({
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
      if (
        equalServices(apiParams.service, createRequirementService()) ||
        equalServices(apiParams.service, createSaleService())
      ) {
        showNotification(
          notification,
          "success",
          t(
            type == RequirementType.GOOD || type == RequirementType.SERVICE
              ? "createRequirementSuccess"
              : "createSaleSuccess"
          )
        );
        props.closeModal();
      }
    } else if (error) {
      showNotification(notification, "error", errorMsg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData, error]);

  function changeTab(newtype: RequirementType) {
    if (newtype != type) {
      setType(newtype);
      form.resetFields();
    }
  }

  function getDocListCertification(val: number | string) {
    setShowDocListToCetificate(val == certifiedCompaniesOpt);
    if (val == certifiedCompaniesOpt)
      form.setFieldsValue({ docList: "Lista de documentos" });
    else form.setFieldsValue({ docList: null });
  }

  function createRequirement(values: any) {
    const data: CreateRequirementRequest = {
      name: values.title,
      description: values.description,
      categoryID: values.category,
      cityID: values.location,
      budget: values.budget,
      currencyID: values.currency,
      payment_methodID: values.paymentMethod,
      completion_date: dayjs(values.expirationDate).toISOString(),
      submission_dateID: values.deliveryTime,
      allowed_bidersID: values.canOffer,
      userID: uid,
    };

    if (type == RequirementType.GOOD || type == RequirementType.SERVICE) {
      data.warranty = values.warranty;
      data.duration = values.duration;
    }

    if (type == RequirementType.SALE)
      data.used = values.itemCondition == Usage.USED;

    console.log(values, data);
    setApiParams({
      service:
        type == RequirementType.SALE
          ? createSaleService()
          : createRequirementService(),
      method: "post",
      dataToSend: data,
    });
  }

  return (
    <div
      className="modal-card img-bg scroll-y"
      style={{ maxHeight: "calc(100vh - 170px)" }}
    >
      <div className="t-flex t-wrap mr-sub">
        <div className="sub-titulo" style={{ fontSize: "26px" }}>
          <i
            className="fa-regular fa-paste sub-icon"
            style={{ fontSize: "24px" }}
          ></i>{" "}
          {t("newRequirement")}
        </div>
      </div>
      <div className="t-flex mr-sub">
        <ButtonContainer
          common
          className={`btn btn-grey wd-33 ${
            type == RequirementType.GOOD ? "active" : ""
          }`}
          onClick={() => {
            changeTab(RequirementType.GOOD);
          }}
        >
          <i className="fa-regular fa-dolly"></i>{" "}
          <span className="req-btn-info">{t("goods")}</span>
        </ButtonContainer>
        <ButtonContainer
          common
          className={`btn btn-grey wd-33 ${
            type == RequirementType.SERVICE ? "active" : ""
          }`}
          onClick={() => {
            changeTab(RequirementType.SERVICE);
          }}
        >
          <i className="fa-regular fa-hand-holding-magic"></i>{" "}
          <span className="req-btn-info">{t("services")}</span>
        </ButtonContainer>
        <ButtonContainer
          common
          className={`btn btn-grey wd-33 ${
            type == RequirementType.SALE ? "active" : ""
          }`}
          onClick={() => {
            changeTab(RequirementType.SALE);
          }}
        >
          <i className="fa-regular fa-basket-shopping"></i>{" "}
          <span className="req-btn-info">{t("sales")}</span>
        </ButtonContainer>
      </div>

      <Form
        form={form}
        colon={false}
        requiredMark={false}
        onFinish={createRequirement}
      >
        <div className="t-flex form-tc">
          <div>
            <TitleCR />
          </div>
          <div>
            <DescriptionCR />
          </div>
          {isPremium && (
            <>
              <div>
                <CanOfferCR
                  type={type}
                  handleOptionChange={getDocListCertification}
                />
              </div>
              {showDocListToCetificate && (
                <div>
                  <DocumentsCertifCR />
                </div>
              )}
            </>
          )}
          <Row gutter={[15, 15]}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <CategoryCR></CategoryCR>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <EmailCR />
            </Col>
          </Row>

          <Row gutter={[15, 15]}>
            <Col xs={24} sm={24} md={6} lg={6} xl={6}>
              <LocationCR />
            </Col>
            <Col xs={24} sm={24} md={6} lg={6} xl={6}>
              <BudgetCR />
            </Col>
            <Col xs={24} sm={24} md={6} lg={6} xl={6}>
              <CurrencyCR />
            </Col>
            <Col xs={24} sm={24} md={6} lg={6} xl={6}>
              <PaymentMethodCR />
            </Col>
          </Row>

          <Row gutter={[15, 15]}>
            <Col xs={24} sm={24} md={6} lg={6} xl={6}>
              <FinalDateCR />
            </Col>
            <Col xs={24} sm={24} md={6} lg={6} xl={6}>
              <DeliveryTimeCR />
            </Col>
            {(type == RequirementType.GOOD ||
              type == RequirementType.SERVICE) && (
              <>
                <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                  <WarrantyCR required={type == RequirementType.GOOD} />
                </Col>
                <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                  <WarrantyTimeCR required={type == RequirementType.GOOD} />
                </Col>
              </>
            )}
            {type == RequirementType.SALE && (
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <ItemCondition />
              </Col>
            )}
          </Row>

          <Row gutter={[15, 15]}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <AddImagesRC />
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <AddDocument />
            </Col>
          </Row>
          <div className="t-flex t-wrap up-footer">
            <div className="footer-text">{t("allDataIsImportant")}</div>
            <div className="wd-25">
              <ButtonContainer
                loading={
                  equalServices(apiParams.service, createRequirementService())
                    ? loading
                    : false
                }
                htmlType="submit"
                className="btn btn-default wd-100"
              >
                {t("saveButton")}
              </ButtonContainer>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
}
