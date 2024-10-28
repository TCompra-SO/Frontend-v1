import { App, Col, Form, Row, UploadFile } from "antd";
import { useTranslation } from "react-i18next";
import EmailCR from "./create-requirement-items/EmailCR";
import DocumentsCertifCR from "./create-requirement-items/DocumentsCertifCR";
import AddImagesRC from "./create-requirement-items/AddImagesRC";
import AddDocument from "./create-requirement-items/AddDocument";
import ButtonContainer from "../../containers/ButtonContainer";
import {
  ImageRequestLabels,
  RequirementType,
  Usage,
} from "../../../utilities/types";
import { useEffect, useState } from "react";
import { certifiedCompaniesOpt } from "../../../utilities/globals";
import { CreateRequirementRequest } from "../../../models/Requests";
import { useApiParams } from "../../../models/Interfaces";
import useApi from "../../../hooks/useApi";
import {
  equalServices,
  isDateEarlierThanToday,
} from "../../../utilities/globalFunctions";
import { createRequirementService } from "../../../services/requests/requirementService";
import showNotification from "../../../utilities/notification/showNotification";
import { MainState } from "../../../models/Redux";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { createSaleService } from "../../../services/requests/saleService";
import TitleField from "../../common/formFields/TitleField";
import DescriptionCRField from "../../common/formFields/DescriptionCRField";
import CategoryField from "../../common/formFields/CategoryField";
import LocationField from "../../common/formFields/LocationField";
import BudgetField from "../../common/formFields/BudgetField";
import CurrencyField from "../../common/formFields/CurrencyField";
import PaymentMethodField from "../../common/formFields/PaymentMethod";
import DateField from "../../common/formFields/DateField";
import DeliveryTimeField from "../../common/formFields/DeliveryTimeField";
import WarrantyField from "../../common/formFields/WarrantyField";
import DurationField from "../../common/formFields/DurationField";
import ItemConditionField from "../../common/formFields/ItemConditionField";
import CanOfferField from "../../common/formFields/CanOfferField";
import { uploadImagesRequirementService } from "../../../services/requests/imageService";
import { uploadDocsRequirementService } from "../../../services/requests/documentService";

interface CreateRequirementProps {
  closeModal: () => void;
}

interface LabelForCreateRequirementProps {
  label: string;
}

function LabelForCreateRequirement({ label }: LabelForCreateRequirementProps) {
  const { t } = useTranslation();
  return <div className="titulo-input">{t(label)}</div>;
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

  // Para imagenes
  const [apiParamsImg, setApiParamsImg] = useState<useApiParams<FormData>>({
    service: null,
    method: "get",
  });
  const {
    loading: loadingImg,
    responseData: responseDataImg,
    error: errorImg,
    errorMsg: errorMsgImg,
    fetchData: fetchDataImg,
  } = useApi<FormData>({
    service: apiParamsImg.service,
    method: apiParamsImg.method,
    dataToSend: apiParamsImg.dataToSend,
    token: apiParamsImg.token,
  });

  // Para documentos
  const [apiParamsDoc, setApiParamsDoc] = useState<useApiParams<FormData>>({
    service: null,
    method: "get",
  });
  const {
    loading: loadingDoc,
    responseData: responseDataDoc,
    error: errorDoc,
    errorMsg: errorMsgDoc,
    fetchData: fetchDataDoc,
  } = useApi<FormData>({
    service: apiParamsDoc.service,
    method: apiParamsDoc.method,
    dataToSend: apiParamsDoc.dataToSend,
    token: apiParamsDoc.token,
  });

  useEffect(() => {
    if (apiParamsImg.service) fetchDataImg();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiParamsImg]);

  useEffect(() => {
    if (apiParamsDoc.service) fetchDataDoc();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiParamsDoc]);

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

  useEffect(() => {
    if (responseDataImg) {
      console.log("responseDataImg");
    } else if (errorImg) {
      showNotification(notification, "error", errorMsgImg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseDataImg, errorImg]);

  useEffect(() => {
    if (responseDataDoc) {
      console.log("responseDataDoc");
    } else if (errorDoc) {
      showNotification(notification, "error", errorMsgDoc);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseDataDoc, errorDoc]);

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
      name: values.title.trim(),
      description: values.description.trim(),
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
      data.durationID = values.duration;
    }

    if (type == RequirementType.SALE)
      data.used = values.itemCondition == Usage.USED;

    console.log(data);
    setApiParams({
      service:
        type == RequirementType.SALE
          ? createSaleService()
          : createRequirementService(),
      method: "post",
      dataToSend: data,
    });

    if (values.images && values.images.fileList.length > 0) {
      const formData = new FormData();
      formData.append(
        ImageRequestLabels.IMAGES,
        values.images.fileList.map((f: UploadFile) => f.originFileObj)
      );
      formData.append(ImageRequestLabels.UID, uid);
      setApiParamsImg({
        service: uploadImagesRequirementService(),
        method: "post",
        dataToSend: formData,
      });
    }

    if (values.doc && values.doc.fileList.length > 0) {
      const formDataDoc = new FormData();
      formDataDoc.append(
        ImageRequestLabels.DOCUMENTS,
        values.doc.fileList.map((f: UploadFile) => f.originFileObj)
      );
      formDataDoc.append(ImageRequestLabels.UID, uid);
      setApiParamsImg({
        service: uploadDocsRequirementService(),
        method: "post",
        dataToSend: formDataDoc,
      });
    }
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
            <LabelForCreateRequirement label={"title"} />
            <TitleField></TitleField>
          </div>
          <div>
            <LabelForCreateRequirement label={"description"} />
            <DescriptionCRField></DescriptionCRField>
          </div>
          {isPremium && (
            <>
              <div>
                <LabelForCreateRequirement label={"whoCanMakeOffers"} />
                <CanOfferField
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
              <LabelForCreateRequirement label={"category"} />
              <CategoryField />
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <EmailCR />
            </Col>
          </Row>

          <Row gutter={[15, 15]}>
            <Col xs={24} sm={24} md={6} lg={6} xl={6}>
              <LabelForCreateRequirement label={"location"} />
              <LocationField onlyItem />
            </Col>
            <Col xs={24} sm={24} md={6} lg={6} xl={6}>
              <LabelForCreateRequirement label={"budget"} />
              <BudgetField />
            </Col>
            <Col xs={24} sm={24} md={6} lg={6} xl={6}>
              <LabelForCreateRequirement label={"currency"} />
              <CurrencyField />
            </Col>
            <Col xs={24} sm={24} md={6} lg={6} xl={6}>
              <LabelForCreateRequirement label={"paymentMethod"} />
              <PaymentMethodField />
            </Col>
          </Row>

          <Row gutter={[15, 15]}>
            <Col xs={24} sm={24} md={6} lg={6} xl={6}>
              <LabelForCreateRequirement label={"expirationDate"} />
              <DateField
                name={"expirationDate"}
                disabledDate={isDateEarlierThanToday}
              />
            </Col>
            <Col xs={24} sm={24} md={6} lg={6} xl={6}>
              <LabelForCreateRequirement label={"deliveryTime"} />
              <DeliveryTimeField />
            </Col>
            {(type == RequirementType.GOOD ||
              type == RequirementType.SERVICE) && (
              <>
                <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                  <LabelForCreateRequirement label={"warranty"} />
                  <WarrantyField required={type == RequirementType.GOOD} />
                </Col>
                <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                  <LabelForCreateRequirement label={"duration"} />
                  <DurationField
                    required={type == RequirementType.GOOD}
                    name="duration"
                  />
                </Col>
              </>
            )}
            {type == RequirementType.SALE && (
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <LabelForCreateRequirement label={"itemCondition"} />
                <ItemConditionField />
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
                    : undefined
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
