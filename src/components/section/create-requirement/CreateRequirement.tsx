import { Col, Flex, Form, Row, UploadFile } from "antd";
import { useTranslation } from "react-i18next";
import EmailCR from "./create-requirement-items/EmailCR";
import DocumentsCertifCR from "./create-requirement-items/DocumentsCertifCR";
import AddImagesField from "../../common/formFields/AddImagesField";
import AddDocumentField from "../../common/formFields/AddDocumentField";
import ButtonContainer from "../../containers/ButtonContainer";
import {
  Action,
  ErrorMsgRequestType,
  ErrorRequestType,
  ImageRequestLabels,
  ModalTypes,
  ProcessFlag,
  RequirementType,
  ResponseRequestType,
  Usage,
} from "../../../utilities/types";
import { useContext, useEffect, useRef, useState } from "react";
import {
  certifiedCompaniesOpt,
  mainModalScrollStyle,
} from "../../../utilities/globals";
import { CreateRequirementRequest } from "../../../models/Requests";
import { CommonModalProps, useApiParams } from "../../../models/Interfaces";
import useApi, { UseApiType } from "../../../hooks/useApi";
import {
  checkWarranty,
  getCreateRecordService,
  getUploadDocsRecordService,
  getUploadImagesRecordService,
  isDateEarlierThanTomorrow,
} from "../../../utilities/globalFunctions";
import { MainState } from "../../../models/Redux";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
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
import ModalContainer from "../../containers/ModalContainer";
import { useGetRequiredDocsCert } from "../../../hooks/certificateHooks";
import useShowNotification from "../../../hooks/utilHooks";
import { LoadingDataContext } from "../../../contexts/LoadingDataContext";
import SimpleLoading from "../../../pages/utils/SimpleLoading";

interface CreateRequirementProps extends CommonModalProps {
  closeModal: () => void;

  useApiHookImg: ReturnType<typeof useApi>;
  setApiParamsImg: (params: useApiParams) => void;
  setAdditionalApiParamsImg: (additionalParams: UseApiType) => void;
  apiParamsImg: useApiParams;

  useApiHookDoc: ReturnType<typeof useApi>;
  setApiParamsDoc: (params: useApiParams) => void;
  setAdditionalApiParamsDoc: (additionalParams: UseApiType) => void;
  apiParamsDoc: useApiParams;

  setReqSuccess: (val: ProcessFlag) => void;
  setDocSuccess: (val: ProcessFlag) => void;
  setImgSuccess: (val: ProcessFlag) => void;

  setType: (val: RequirementType) => void;
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
  const { createRequirementLoading, updateCreateRequirementLoading } =
    useContext(LoadingDataContext);
  const { getRequiredDocsCert, requiredDocs, errorRequiredDocs } =
    useGetRequiredDocsCert();
  const { showNotification } = useShowNotification();
  const uid = useSelector((state: MainState) => state.user.uid);
  const mainUid = useSelector((state: MainState) => state.mainUser.uid);
  const isPremium = useSelector((state: MainState) => state.mainUser.isPremium);
  const [form] = Form.useForm();
  const [type, setType] = useState<RequirementType>(RequirementType.GOOD);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [showDocListToCetificate, setShowDocListToCetificate] = useState(false);
  const [certificatesRequired, setCertificatesRequired] = useState("");
  const [formDataImg, setFormDataImg] = useState<FormData | null>(null);
  const [formDataDoc, setFormDataDoc] = useState<FormData | null>(null);
  const formDataImgRef = useRef(formDataImg);
  const formDataDocRef = useRef(formDataDoc);
  const [warrantyRequired, setWarrantyRequired] = useState(false);

  useEffect(() => {
    formDataDocRef.current = formDataDoc;
  }, [formDataDoc]);

  useEffect(() => {
    formDataImgRef.current = formDataImg;
  }, [formDataImg]);

  /** Para crear requerimiento */

  const { loading } = props.useApiHook;

  /** Para imagenes */

  const { loading: loadingImg } = props.useApiHookImg;

  /** Para documentos */

  const { loading: loadingDoc } = props.useApiHookDoc;

  useEffect(() => {
    props.setAdditionalApiParams({
      functionToExecute: function (
        responseData: ResponseRequestType,
        error: ErrorRequestType,
        errorMsg: ErrorMsgRequestType
      ) {
        if (responseData) {
          props.setReqSuccess(ProcessFlag.FIN_SUCCESS);
          uploadImgsAndDocs(
            responseData.data?.[0]?.key,
            type,
            formDataImgRef.current,
            formDataDocRef.current
          );
        } else if (error) {
          props.setReqSuccess(ProcessFlag.FIN_UNSUCCESS);
          showNotification("error", errorMsg);
        }
      },
    });

    props.setAdditionalApiParamsImg({
      functionToExecute: function (
        responseDataImg: ResponseRequestType,
        errorImg: ErrorRequestType,
        errorMsgImg: ErrorMsgRequestType
      ) {
        if (responseDataImg) {
          props.setImgSuccess(ProcessFlag.FIN_SUCCESS);
        } else if (errorImg) {
          props.setImgSuccess(ProcessFlag.FIN_UNSUCCESS);
          showNotification("error", errorMsgImg);
        }
      },
    });

    props.setAdditionalApiParamsDoc({
      functionToExecute: function (
        responseDataDoc: ResponseRequestType,
        errorDoc: ErrorRequestType,
        errorMsgDoc: ErrorMsgRequestType
      ) {
        if (responseDataDoc) {
          props.setDocSuccess(ProcessFlag.FIN_SUCCESS);
        } else if (errorDoc) {
          props.setDocSuccess(ProcessFlag.FIN_UNSUCCESS);
          showNotification("error", errorMsgDoc);
        }
      },
    });

    // return () => {
    //   formDataImgRef.current = null;
    //   formDataDocRef.current = null;
    // };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requiredDocs]);

  useEffect(() => {
    form.setFieldsValue({ docList: certificatesRequired });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [certificatesRequired]);

  useEffect(() => {
    if (errorRequiredDocs) setCertificatesRequired("");
  }, [errorRequiredDocs]);

  /** Funciones */

  function changeTab(newtype: RequirementType) {
    if (newtype != type) {
      setType(newtype);
      props.setType(newtype);
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
    updateCreateRequirementLoading(true);
    form.setFieldsValue({ budget: 0 });

    props.setReqSuccess(ProcessFlag.NOT_INI);
    setFormDataDoc(null);
    setFormDataImg(null);
    props.setDocSuccess(ProcessFlag.NOT_INI);
    props.setImgSuccess(ProcessFlag.NOT_INI);

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
    props.setApiParams({
      service: getCreateRecordService(type),
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

  function uploadImgsAndDocs(
    reqId: string | undefined,
    type: RequirementType,
    formDataImg: FormData | null,
    formDataDoc: FormData | null
  ) {
    if (reqId) {
      if (!formDataDoc) props.setDocSuccess(ProcessFlag.FIN_SUCCESS);
      if (!formDataImg) props.setImgSuccess(ProcessFlag.FIN_SUCCESS);
      if (!formDataDoc && !formDataImg) {
        return;
      }
      if (formDataDoc) {
        const data: FormData = formDataDoc;
        data.append(ImageRequestLabels.UID, reqId);
        props.setApiParamsDoc({
          service: getUploadDocsRecordService(type),
          method: "post",
          dataToSend: data,
          includeHeader: false,
        });
      }
      if (formDataImg) {
        const data: FormData = formDataImg;
        data.append(ImageRequestLabels.UID, reqId);
        props.setApiParamsImg({
          service: getUploadImagesRecordService(type),
          method: "post",
          dataToSend: data,
          includeHeader: false,
        });
      }
    } else {
      props.setDocSuccess(ProcessFlag.FIN_UNSUCCESS);
      props.setImgSuccess(ProcessFlag.FIN_UNSUCCESS);
    }
  }

  function checkWarrantyField() {
    setWarrantyRequired(
      checkWarranty(
        form.getFieldValue("duration"),
        form.getFieldValue("warranty")
      )
    );
  }

  function handleWhoCanOfferField(val: any) {
    if (Array.isArray(val) && !val.includes(certifiedCompaniesOpt))
      setShowDocListToCetificate(false);
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
          action: Action.NONE,
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

        {createRequirementLoading ? (
          <Flex justify="center">
            <SimpleLoading style={{ width: "15vw" }} />
          </Flex>
        ) : (
          <>
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
                        onBlur={checkWhoCanOffer}
                        handleOptionChange={handleWhoCanOfferField}
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
                    <LabelForCreateRequirement
                      label={type == RequirementType.SALE ? "price" : "budget"}
                    />
                    <BudgetField
                      required={false}
                      usePriceLabel={type == RequirementType.SALE}
                    />
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
                        <WarrantyField
                          required={warrantyRequired}
                          onChange={() => checkWarrantyField()}
                        />
                      </Col>
                      <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                        <LabelForCreateRequirement label={"warrantyDuration"} />
                        <DurationField
                          required={warrantyRequired}
                          name="duration"
                          onChange={() => checkWarrantyField()}
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
          </>
        )}
      </div>
    </>
  );
}
