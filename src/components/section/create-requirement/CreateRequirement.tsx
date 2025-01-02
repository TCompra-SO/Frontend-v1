import { Col, Form, Row, UploadFile } from "antd";
import { useTranslation } from "react-i18next";
import EmailCR from "./create-requirement-items/EmailCR";
import DocumentsCertifCR from "./create-requirement-items/DocumentsCertifCR";
import AddImagesField from "../../common/formFields/AddImagesField";
import AddDocumentField from "../../common/formFields/AddDocumentField";
import ButtonContainer from "../../containers/ButtonContainer";
import {
  ImageRequestLabels,
  ModalTypes,
  ProcessFlag,
  RequirementType,
  Usage,
} from "../../../utilities/types";
import { useEffect, useState } from "react";
import {
  certifiedCompaniesOpt,
  mainModalScrollStyle,
} from "../../../utilities/globals";
import { CreateRequirementRequest } from "../../../models/Requests";
import { useApiParams } from "../../../models/Interfaces";
import useApi from "../../../hooks/useApi";
import {
  equalServices,
  isDateEarlierThanTomorrow,
} from "../../../utilities/globalFunctions";
import { createRequirementService } from "../../../services/requests/requirementService";
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
import ModalContainer from "../../containers/ModalContainer";
import { useGetRequiredDocsCert } from "../../../hooks/certificateHook";
import useShowNotification from "../../../hooks/utilHook";

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
  const mainUid = useSelector((state: MainState) => state.mainUser.uid);
  const isPremium = useSelector((state: MainState) => state.mainUser.isPremium);
  const { showNotification } = useShowNotification();
  const [form] = Form.useForm();
  const [type, setType] = useState<RequirementType>(RequirementType.GOOD);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [showDocListToCetificate, setShowDocListToCetificate] = useState(false);
  const [certificatesRequired, setCertificatesRequired] = useState("");
  const { getRequiredDocsCert, requiredDocs, errorRequiredDocs } =
    useGetRequiredDocsCert();
  const [formDataImg, setFormDataImg] = useState<FormData | null>(null);
  const [formDataDoc, setFormDataDoc] = useState<FormData | null>(null);
  const [reqSuccess, setReqSuccess] = useState(ProcessFlag.NOT_INI);
  const [docSuccess, setDocSuccess] = useState(ProcessFlag.NOT_INI);
  const [imgSuccess, setImgSuccess] = useState(ProcessFlag.NOT_INI);

  /** Para crear requerimiento */

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

  /** Para imagenes */

  const [apiParamsImg, setApiParamsImg] = useState<useApiParams<FormData>>({
    service: null,
    method: "get",
    includeHeader: false,
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

  /** Para documentos */

  const [apiParamsDoc, setApiParamsDoc] = useState<useApiParams<FormData>>({
    service: null,
    method: "get",
    includeHeader: false,
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
        setReqSuccess(ProcessFlag.FIN_SUCCESS);
        uploadImgsAndDocs(responseData.data?.uid);
      }
    } else if (error) {
      setReqSuccess(ProcessFlag.FIN_UNSUCCESS);
      showNotification("error", errorMsg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData, error]);

  useEffect(() => {
    if (responseDataImg) {
      setImgSuccess(ProcessFlag.FIN_SUCCESS);
    } else if (errorImg) {
      setImgSuccess(ProcessFlag.FIN_UNSUCCESS);
      showNotification("error", errorMsgImg);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseDataImg, errorImg]);

  useEffect(() => {
    if (responseDataDoc) {
      setDocSuccess(ProcessFlag.FIN_SUCCESS);
    } else if (errorDoc) {
      setDocSuccess(ProcessFlag.FIN_UNSUCCESS);
      showNotification("error", errorMsgDoc);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseDataDoc, errorDoc]);

  /** Crear requerimiento */

  useEffect(() => {
    if (
      reqSuccess != ProcessFlag.NOT_INI &&
      docSuccess != ProcessFlag.NOT_INI &&
      imgSuccess != ProcessFlag.NOT_INI
    ) {
      if (
        reqSuccess == ProcessFlag.FIN_SUCCESS &&
        docSuccess == ProcessFlag.FIN_SUCCESS &&
        imgSuccess == ProcessFlag.FIN_SUCCESS
      ) {
        showNotification(
          "success",
          t(
            type == RequirementType.GOOD || type == RequirementType.SERVICE
              ? "createRequirementSuccess"
              : "createSaleSuccess"
          )
        );
        props.closeModal();
      } else {
        showNotification(
          "warning",
          t(
            type == RequirementType.GOOD || type == RequirementType.SERVICE
              ? "createRequirementSuccessNoDocOrImages"
              : "createSaleSuccessNoDocOrImages"
          )
        );
        props.closeModal();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reqSuccess, imgSuccess, docSuccess]);

  /** Establecer valores iniciales */

  useEffect(() => {
    form.setFieldsValue({ budget: 0 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form]);

  /** Mostrar lista de documentos requeridos */

  useEffect(() => {
    if (requiredDocs !== null) {
      setCertificatesRequired(requiredDocs);
      if (!requiredDocs && showDocListToCetificate) setIsOpenModal(true);
    }
  }, [requiredDocs]);

  useEffect(() => {
    form.setFieldsValue({ docList: certificatesRequired });
  }, [certificatesRequired]);

  useEffect(() => {
    if (errorRequiredDocs) setCertificatesRequired("");
  }, [errorRequiredDocs]);

  /** Funciones */

  function changeTab(newtype: RequirementType) {
    if (newtype != type) {
      setType(newtype);
      form.resetFields();
    }
  }

  function checkWhoCanOffer() {
    const val: number[] = form.getFieldValue("canOffer");
    const show: boolean = val.includes(certifiedCompaniesOpt);
    if (!showDocListToCetificate && show) getRequiredDocsCert(mainUid);
    setShowDocListToCetificate(show);
  }

  function createRequirement(values: any) {
    form.setFieldsValue({ budget: 0 });

    setReqSuccess(ProcessFlag.NOT_INI);
    setFormDataDoc(null);
    setFormDataImg(null);
    setDocSuccess(ProcessFlag.NOT_INI);
    setImgSuccess(ProcessFlag.NOT_INI);

    const data: CreateRequirementRequest = {
      name: values.title.trim(),
      description: values.description.trim(),
      categoryID: values.category,
      cityID: values.location,
      budget: values.budget ?? 0,
      currencyID: values.currency,
      payment_methodID: values.paymentMethod,
      completion_date: dayjs(values.expirationDate).toISOString(),
      submission_dateID: values.deliveryTime,
      allowed_bidersID: values.canOffer,
      userID: uid,
    };

    if (type == RequirementType.GOOD || type == RequirementType.SERVICE) {
      if (values.warranty && values.duration !== undefined) {
        data.warranty = values.warranty;
        data.durationID = values.duration;
      }
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

    if (values.images && values.images.fileList.length > 0) {
      const formData = new FormData();
      values.images.fileList.forEach((file: UploadFile) => {
        if (file.originFileObj) {
          formData.append(ImageRequestLabels.IMAGES, file.originFileObj);
        }
      });
      setFormDataImg(formData);
    }

    if (values.doc && values.doc.fileList.length > 0) {
      const formDataDoc = new FormData();
      values.doc.fileList.forEach((file: UploadFile) => {
        if (file.originFileObj) {
          formDataDoc.append(ImageRequestLabels.DOCUMENTS, file.originFileObj);
        }
      });
      setFormDataDoc(formDataDoc);
    }
  }

  function uploadImgsAndDocs(reqId: string | undefined) {
    if (reqId) {
      if (!formDataDoc) setDocSuccess(ProcessFlag.FIN_SUCCESS);
      if (!formDataImg) setImgSuccess(ProcessFlag.FIN_SUCCESS);
      if (!formDataDoc && !formDataImg) {
        return;
      }
      if (formDataDoc) {
        const data: FormData = formDataDoc;
        data.append(ImageRequestLabels.UID, reqId);
        setApiParamsDoc({
          service: uploadDocsRequirementService(),
          method: "post",
          dataToSend: data,
        });
      }
      if (formDataImg) {
        const data: FormData = formDataImg;
        data.append(ImageRequestLabels.UID, reqId);
        setApiParamsImg({
          service: uploadImagesRequirementService(),
          method: "post",
          dataToSend: data,
        });
      }
    } else {
      setDocSuccess(ProcessFlag.FIN_UNSUCCESS);
      setImgSuccess(ProcessFlag.FIN_UNSUCCESS);
    }
  }

  return (
    <>
      <ModalContainer
        destroyOnClose
        content={{
          type: ModalTypes.CONFIRM,
          data: {
            onAnswer: () => {},
            text: t("noSavedRequiredDocListCertification"),
            showOnlyAcceptButton: true,
          },
        }}
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        style={mainModalScrollStyle}
      />

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
                  <CanOfferField type={type} onBlur={checkWhoCanOffer} />
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
                <BudgetField required={false} />
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
                  disabledDate={isDateEarlierThanTomorrow}
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
                    <WarrantyField required={false} />
                  </Col>
                  <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                    <LabelForCreateRequirement label={"duration"} />
                    <DurationField required={false} name="duration" />
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
                <AddImagesField />
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <AddDocumentField />
              </Col>
            </Row>
            <div className="t-flex t-wrap up-footer">
              <div className="footer-text">{t("allDataIsImportant")}</div>
              <div className="wd-25">
                <ButtonContainer
                  loading={loading || loadingDoc || loadingImg}
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
    </>
  );
}
