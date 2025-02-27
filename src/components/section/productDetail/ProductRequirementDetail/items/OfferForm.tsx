import { useTranslation } from "react-i18next";
import ButtonContainer from "../../../../containers/ButtonContainer";
import { Checkbox, Form, UploadFile } from "antd";
import { MainState } from "../../../../../models/Redux";
import { useSelector } from "react-redux";
import TitleField from "../../../../common/formFields/TitleField";
import EmailField from "../../../../common/formFields/EmailField";
import OfferDescriptionField from "../../../../common/formFields/OfferDescriptionField";
import LocationField from "../../../../common/formFields/LocationField";
import DeliveryTimeField from "../../../../common/formFields/DeliveryTimeField";
import CurrencyField from "../../../../common/formFields/CurrencyField";
import WarrantyField from "../../../../common/formFields/WarrantyField";
import DurationField from "../../../../common/formFields/DurationField";
import SupportField from "../../../../common/formFields/SupportField";
import BudgetField from "../../../../common/formFields/BudgetField";
import AddImagesField from "../../../../common/formFields/AddImagesField";
import AddDocumentField from "../../../../common/formFields/AddDocumentField";
import { CreateOfferRequest } from "../../../../../models/Requests";
import { ReactNode, useContext, useEffect, useRef, useState } from "react";
import {
  CanOfferResponse,
  useApiParams,
} from "../../../../../models/Interfaces";
import useApi from "../../../../../hooks/useApi";
import {
  Action,
  CanOfferType,
  CantOfferMotives,
  CertificationState,
  CodeResponseCanOffer,
  EntityType,
  ImageRequestLabels,
  ModalTypes,
  ProcessFlag,
  RequirementState,
  RequirementType,
  SystemNotificationType,
  UserRoles,
} from "../../../../../utilities/types";
import React from "react";
import CantOfferMessage from "./CantOfferMessage";
import { Requirement } from "../../../../../models/MainInterfaces";
import makeRequest, {
  checkWarranty,
  getCreateOfferService,
  getGetValidationOfferService,
  getUploadDocsOfferService,
  getUploadImagesOfferService,
} from "../../../../../utilities/globalFunctions";
import SimpleLoading from "../../../../../pages/utils/SimpleLoading";
import ModalContainer from "../../../../containers/ModalContainer";
import { verifyCertificationByUserIdAndCompanyId } from "../../../../../services/general/generalServices";
import useShowNotification from "../../../../../hooks/utilHooks";
import { MainSocketsContext } from "../../../../../contexts/MainSocketsContext";
import useSystemNotification from "../../../../../hooks/useSystemNotification";
import dayjs from "dayjs";

function RowContainer({ children }: { children: ReactNode }) {
  return (
    <div className="t-flex t-wrap gap-15">
      {React.Children.map(children, (child) => (
        <div className="t-flex datos-input">{child}</div>
      ))}
    </div>
  );
}

interface OfferFormProps {
  requirement: Requirement | undefined;
}

export default function OfferForm(props: OfferFormProps) {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { showNotification } = useShowNotification();
  const { sendNotification } = useContext(MainSocketsContext);
  const { getSystemNotification } = useSystemNotification();
  const email = useSelector((state: MainState) => state.user.email);
  const uid = useSelector((state: MainState) => state.user.uid);
  const mainUid = useSelector((state: MainState) => state.mainUser.uid);
  const entityType = useSelector((state: MainState) => state.user.typeEntity);
  const isLoggedIn = useSelector((state: MainState) => state.user.isLoggedIn);
  const role = useSelector((state: MainState) => state.user.typeID);
  const isPremium = useSelector((state: MainState) => state.mainUser.isPremium);
  const [isCertified, setIsCertified] = useState<CertificationState>(
    CertificationState.NONE
  );
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [cantOfferMotive, setCantOfferMotive] = useState<CantOfferMotives>(
    CantOfferMotives.INI
  );
  const [checkedIGV, setCheckedIGV] = useState(false);
  const [checkedDelivery, setCheckedDelivery] = useState(false);
  const [formDataImg, setFormDataImg] = useState<FormData | null>(null);
  const [formDataDoc, setFormDataDoc] = useState<FormData | null>(null);
  const [reqSuccess, setReqSuccess] = useState(ProcessFlag.NOT_INI);
  const [docSuccess, setDocSuccess] = useState(ProcessFlag.NOT_INI);
  const [imgSuccess, setImgSuccess] = useState(ProcessFlag.NOT_INI);
  const [offerId, setOfferId] = useState<string>("");
  const [loadingForm, setLoadingForm] = useState(true);
  const [warrantyRequired, setWarrantyRequired] = useState(false);
  const formDataImgRef = useRef(formDataImg);
  const formDataDocRef = useRef(formDataDoc);

  useEffect(() => {
    if (cantOfferMotive != CantOfferMotives.INI) setLoadingForm(false);
  }, [cantOfferMotive]);

  useEffect(() => {
    form.setFieldValue("currency", props.requirement?.coin);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.requirement]);

  /** Guardar imágenes y documentos */

  useEffect(() => {
    formDataDocRef.current = formDataDoc;
  }, [formDataDoc]);

  useEffect(() => {
    formDataImgRef.current = formDataImg;
  }, [formDataImg]);

  /** Verificar si el usuario puede ofertar */

  useEffect(() => {
    if (props.requirement) checkIfUserCanOffer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, props.requirement]);

  /* Para crear oferta */

  const [apiParams, setApiParams] = useState<useApiParams<CreateOfferRequest>>({
    service: null,
    method: "get",
  });
  const { loading, responseData, error, errorMsg, fetchData } =
    useApi<CreateOfferRequest>(apiParams);

  useEffect(() => {
    if (apiParams.service) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiParams]);

  useEffect(() => {
    if (responseData) {
      setReqSuccess(ProcessFlag.FIN_SUCCESS);
      console.log(responseData);
      setOfferId(responseData.data?.uid);
      uploadImgsAndDocs(responseData.data?.uid);
    } else if (error) {
      setReqSuccess(ProcessFlag.FIN_UNSUCCESS);
      showNotification("error", errorMsg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData, error]);

  /* Para imagenes */

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
  } = useApi<FormData>(apiParamsImg);

  useEffect(() => {
    if (apiParamsImg.service) fetchDataImg();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiParamsImg]);

  useEffect(() => {
    if (responseDataImg) {
      setImgSuccess(ProcessFlag.FIN_SUCCESS);
    } else if (errorImg) {
      setImgSuccess(ProcessFlag.FIN_UNSUCCESS);
      showNotification("error", errorMsgImg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseDataImg, errorImg]);

  /* Para documentos */

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
  } = useApi<FormData>(apiParamsDoc);

  useEffect(() => {
    if (apiParamsDoc.service) fetchDataDoc();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiParamsDoc]);

  useEffect(() => {
    if (responseDataDoc) {
      setDocSuccess(ProcessFlag.FIN_SUCCESS);
    } else if (errorDoc) {
      setDocSuccess(ProcessFlag.FIN_UNSUCCESS);
      showNotification("error", errorMsgDoc);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseDataDoc, errorDoc]);

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
        showNotification("success", t("offerCreatedSuccessfully"));
      } else {
        showNotification("warning", t("offerCreatedSuccessfullyNoDocOrImages"));
      }
      form.resetFields();
      form.setFieldValue("currency", props.requirement?.coin);
      if (props.requirement) {
        const notificationFn = getSystemNotification(
          SystemNotificationType.MAKE_OFFER
        );
        const notification = notificationFn(props.requirement.title);
        sendNotification({
          ...notification,
          receiverId:
            props.requirement.subUser?.uid ?? props.requirement.user.uid,
          targetId: props.requirement.key,
          targetType: props.requirement.type,
          timestamp: dayjs().toISOString(),
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reqSuccess, imgSuccess, docSuccess]);

  /** Funciones */

  async function checkIfUserCanOffer() {
    setCantOfferMotive(CantOfferMotives.INI);
    setLoadingForm(true);

    if (!isLoggedIn) {
      setCantOfferMotive(CantOfferMotives.NOT_LOGGED_IN);
      return;
    } else if (props.requirement) {
      if (
        (!props.requirement.subUser && props.requirement.user.uid == uid) || // requerimiento no fue creado por subusuario
        (props.requirement.subUser && props.requirement.subUser.uid == uid) // requerimiento fue creado por subusuario
      ) {
        setCantOfferMotive(CantOfferMotives.IS_CREATOR);
        return;
      } else if (
        role == UserRoles.LEGAL ||
        role == UserRoles.NONE ||
        (role == UserRoles.BUYER &&
          props.requirement.type != RequirementType.SALE) ||
        (role == UserRoles.SELLER &&
          props.requirement.type == RequirementType.SALE)
      ) {
        setCantOfferMotive(CantOfferMotives.NO_ALLOWED_ROLE);
        return;
      } else if (props.requirement.state != RequirementState.PUBLISHED) {
        setCantOfferMotive(CantOfferMotives.CHANGED_STATE);
        return;
      } else {
        const { responseData }: any = await makeRequest({
          service: getGetValidationOfferService(props.requirement.type)?.(
            uid,
            props.requirement.key
          ),
          method: "get",
        });

        if (responseData) {
          const car: CanOfferResponse = responseData.data;
          setOfferId(car.offerID ?? "");
          switch (car.codeResponse) {
            case CodeResponseCanOffer.ALREADY_MADE_OFFER:
              setCantOfferMotive(CantOfferMotives.ALREADY_MADE_OFFER);
              return;
            case CodeResponseCanOffer.MAIN_ACCOUNT_MADE_OFFER:
              setCantOfferMotive(CantOfferMotives.MAIN_ACCOUNT_MADE_OFFER);
              return;
            case CodeResponseCanOffer.OTHER_USER_IN_COMPANY_MADE_OFFER:
              setCantOfferMotive(
                entityType == EntityType.SUBUSER
                  ? CantOfferMotives.OTHER_USER_IN_COMPANY_MADE_OFFER
                  : CantOfferMotives.SUBUSER_MADE_OFFER
              );
              return;
            case CodeResponseCanOffer.OTHER_USER_IN_COMPANY_IS_CREATOR:
              setCantOfferMotive(
                entityType == EntityType.SUBUSER
                  ? CantOfferMotives.OTHER_USER_IN_COMPANY_IS_CREATOR
                  : CantOfferMotives.SUBUSER_IS_CREATOR
              );
              return;
            case CodeResponseCanOffer.IS_CREATOR:
              setCantOfferMotive(CantOfferMotives.IS_CREATOR);
              return;
            case CodeResponseCanOffer.MAIN_ACCOUNT_IS_CREATOR:
              setCantOfferMotive(CantOfferMotives.MAIN_ACCOUNT_IS_CREATOR);
              return;
          }
        }
        if (!(await verifyAllowedBidders(props.requirement))) return;
      }
    }
    setCantOfferMotive(CantOfferMotives.NONE);
  }

  async function verifyAllowedBidders(requirement: Requirement) {
    const verifyAllowedBidder: boolean[] = [];
    for (const ab of requirement.allowedBidder) {
      if (ab == CanOfferType.ALL) {
        setCantOfferMotive(CantOfferMotives.NONE);
        return true;
      }
      if (ab == CanOfferType.PREMIUM) {
        if (!isPremium) {
          setCantOfferMotive(CantOfferMotives.ONLY_PREMIUM);
          verifyAllowedBidder.push(false);
        } else verifyAllowedBidder.push(true);
      } else if (ab == CanOfferType.CERTIFIED_COMPANY) {
        const { certState: certResult, error: errorCert } =
          await verifyCertificationByUserIdAndCompanyId(
            mainUid,
            requirement.user.uid
          );
        if (errorCert)
          showNotification("error", t("certificationVerificationError"));
        setIsCertified(certResult ?? CertificationState.NONE);
        if (certResult != CertificationState.CERTIFIED) {
          setCantOfferMotive(CantOfferMotives.ONLY_CERTIFIED);
          verifyAllowedBidder.push(false);
        } else verifyAllowedBidder.push(true);
      }
    }
    return verifyAllowedBidder.includes(true);
  }

  function createOffer(values: any) {
    setReqSuccess(ProcessFlag.NOT_INI);
    setFormDataDoc(null);
    setFormDataImg(null);
    setDocSuccess(ProcessFlag.NOT_INI);
    setImgSuccess(ProcessFlag.NOT_INI);
    console.log(values);
    if (props.requirement) {
      const data: CreateOfferRequest = {
        name: values.title.trim(),
        email: values.email,
        description: values.description?.trim(),
        cityID: values.location,
        deliveryTimeID: values.deliveryTime,
        currencyID: values.currency,
        budget: values.budget,
        requerimentID: props.requirement.key,
        userID: uid,
      };

      if (
        props.requirement.type == RequirementType.GOOD ||
        props.requirement.type == RequirementType.SERVICE
      ) {
        data.includesIGV = checkedIGV;
        data.includesDelivery = checkedDelivery;
        if (values.warranty && values.duration !== undefined) {
          data.warranty = values.warranty;
          data.timeMeasurementID = values.duration;
        }
        if (values.support) data.support = values.support;
      }

      if (props.requirement.type != RequirementType.SALE) {
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
              formDataDoc.append(
                ImageRequestLabels.DOCUMENTS,
                file.originFileObj
              );
            }
          });
          setFormDataDoc(formDataDoc);
        }
      }

      submit(data);
    } else showNotification("error", t("errorOccurred"));
  }

  function submit(data: CreateOfferRequest) {
    setApiParams({
      service: props.requirement
        ? getCreateOfferService(props.requirement?.type)
        : null,
      method: "post",
      dataToSend: data,
    });
  }

  function uploadImgsAndDocs(offerIdResponse: string | undefined) {
    if (offerIdResponse) {
      if (!formDataDoc) setDocSuccess(ProcessFlag.FIN_SUCCESS);
      if (!formDataImg) setImgSuccess(ProcessFlag.FIN_SUCCESS);
      if (!formDataDoc && !formDataImg) {
        return;
      }
      if (formDataDoc) {
        const data: FormData = formDataDoc;
        data.append(ImageRequestLabels.UID, offerIdResponse);
        setApiParamsDoc({
          service: props.requirement
            ? getUploadDocsOfferService(props.requirement.type)
            : null,
          method: "post",
          dataToSend: data,
          includeHeader: false,
        });
      }
      if (formDataImg) {
        const data: FormData = formDataImg;
        data.append(ImageRequestLabels.UID, offerIdResponse);
        setApiParamsImg({
          service: props.requirement
            ? getUploadImagesOfferService(props.requirement.type)
            : null,
          method: "post",
          dataToSend: formDataImg,
          includeHeader: false,
        });
      }
    } else {
      setDocSuccess(ProcessFlag.FIN_UNSUCCESS);
      setImgSuccess(ProcessFlag.FIN_UNSUCCESS);
    }
  }

  function recheck() {
    setFormDataImg(null);
    setFormDataDoc(null);
    setReqSuccess(ProcessFlag.NOT_INI);
    setDocSuccess(ProcessFlag.NOT_INI);
    setImgSuccess(ProcessFlag.NOT_INI);
    setOfferId("");
    setCheckedIGV(false);
    setCheckedDelivery(false);
    checkIfUserCanOffer();
  }

  function checkWarrantyField() {
    setWarrantyRequired(
      checkWarranty(
        form.getFieldValue("duration"),
        form.getFieldValue("warranty")
      )
    );
  }

  return (
    <>
      {props.requirement && (
        <ModalContainer
          className=""
          content={{
            type: ModalTypes.SEND_MESSAGE,
            data: {
              requirementId: props.requirement.key,
              userId:
                props.requirement.subUser?.uid ?? props.requirement?.user.uid,
            },
            action: Action.SEND_MESSAGE,
          }}
          isOpen={isOpenModal}
          onClose={() => setIsOpenModal(false)}
        />
      )}

      <div className="card-white cbl-6">
        <div className="t-flex mr-sub-2">
          <i className="fa-regular fa-tags sub-icon m-0"></i>
          <div className="sub-titulo sub-calificar">
            <div>{t("offerFormTitle")}</div>
          </div>
        </div>
        {loadingForm || !props.requirement ? (
          <div className="t-flex f-column j-conten j-items oferta-check gap-10">
            <SimpleLoading style={{ width: "15vw" }} />
          </div>
        ) : cantOfferMotive == CantOfferMotives.NONE ? (
          reqSuccess != ProcessFlag.NOT_INI &&
          docSuccess != ProcessFlag.NOT_INI &&
          imgSuccess != ProcessFlag.NOT_INI ? (
            <CantOfferMessage
              offerId={offerId}
              motive={CantOfferMotives.ALREADY_MADE_OFFER}
              requirement={props.requirement}
              onDeleteSuccess={recheck}
              onSentDocsToGetCertifiedSuccess={recheck}
              setIsCertified={setIsCertified}
            />
          ) : (
            <Form
              form={form}
              colon={false}
              requiredMark={false}
              onFinish={createOffer}
            >
              <div className="t-flex gap-15 f-column form-oferta">
                <RowContainer>
                  <TitleField />
                  <EmailField onlyItem edit value={email} />
                </RowContainer>
                <RowContainer>
                  <OfferDescriptionField />
                </RowContainer>
                {props.requirement.type == RequirementType.SALE ? (
                  <RowContainer>
                    <LocationField onlyItem />
                    <DeliveryTimeField onlyItem />
                    <CurrencyField onlyItem disabled />
                    <BudgetField required greaterThanZero />
                  </RowContainer>
                ) : (
                  <RowContainer>
                    <LocationField onlyItem />
                    <DeliveryTimeField onlyItem />
                    <CurrencyField onlyItem disabled />
                  </RowContainer>
                )}
                {props.requirement.type != RequirementType.SALE && (
                  <>
                    <RowContainer>
                      <WarrantyField
                        required={warrantyRequired}
                        onChange={() => checkWarrantyField()}
                      />
                      <DurationField
                        required={warrantyRequired}
                        name={"duration"}
                        onlyItem
                        onChange={() => checkWarrantyField()}
                        forWarranty
                      />
                      <SupportField />
                      <BudgetField required greaterThanZero usePriceLabel />
                    </RowContainer>

                    <div className="t-flex gap-15 archivos-up">
                      <AddImagesField forOffer />
                      <AddDocumentField forOffer />
                    </div>
                  </>
                )}

                <div className="t-flex t-wrap gap-15 up-footer">
                  {props.requirement.type == RequirementType.GOOD ||
                  props.requirement.type == RequirementType.SERVICE ? (
                    <div className="t-flex gap-5 uf-1">
                      <Checkbox
                        onChange={(e) => setCheckedIGV(e.target.checked)}
                      >
                        <div className="footer-text">
                          {t("priceIncludesIGV")}
                        </div>
                      </Checkbox>
                      <Checkbox
                        onChange={(e) => setCheckedDelivery(e.target.checked)}
                      >
                        <div className="footer-text">
                          {t("includeDelivery")}
                        </div>
                      </Checkbox>
                    </div>
                  ) : (
                    <>
                      <div></div>
                      <div></div>
                    </>
                  )}
                  <div className="t-flex gap-10 uf-2">
                    <ButtonContainer
                      htmlType="submit"
                      className="btn btn-default"
                      icon={<i className="fa-regular fa-tag"></i>}
                      loading={loading || loadingDoc || loadingImg}
                    >
                      {`${t("offerButton")}`}
                    </ButtonContainer>
                    <ButtonContainer
                      className="btn btn-green"
                      icon={<i className="fa-regular fa-comment"></i>}
                      onClick={() => setIsOpenModal(true)}
                    >
                      {`${t("sendMessage")}`}
                    </ButtonContainer>
                  </div>
                </div>
              </div>
            </Form>
          )
        ) : (
          <CantOfferMessage
            offerId={offerId}
            motive={cantOfferMotive}
            requirement={props.requirement}
            isPremium={isPremium}
            isCertified={isCertified}
            onDeleteSuccess={recheck}
            onSentDocsToGetCertifiedSuccess={recheck}
            setIsCertified={setIsCertified}
          />
        )}
      </div>
    </>
  );
}
