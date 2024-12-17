import { useTranslation } from "react-i18next";
import ButtonContainer from "../../../../containers/ButtonContainer";
import { App, Checkbox, Form, UploadFile } from "antd";
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
import { ReactNode, useEffect, useState } from "react";
import showNotification from "../../../../../utilities/notification/showNotification";
import {
  CanOfferResponse,
  useApiParams,
} from "../../../../../models/Interfaces";
import useApi from "../../../../../hooks/useApi";
import {
  createOfferService,
  getValidationOfferService,
} from "../../../../../services/requests/offerService";
import {
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
  UserRoles,
} from "../../../../../utilities/types";
import { uploadDocsOfferService } from "../../../../../services/requests/documentService";
import { uploadImagesOfferService } from "../../../../../services/requests/imageService";
import React from "react";
import CantOfferMessage from "./CantOfferMessage";
import { Requirement } from "../../../../../models/MainInterfaces";
import makeRequest from "../../../../../utilities/globalFunctions";
import SimpleLoading from "../../../../../pages/utils/SimpleLoading";
import ModalContainer from "../../../../containers/ModalContainer";

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
  const email = useSelector((state: MainState) => state.user.email);
  const uid = useSelector((state: MainState) => state.user.uid);
  const entityType = useSelector((state: MainState) => state.user.typeEntity);
  const isLoggedIn = useSelector((state: MainState) => state.user.isLoggedIn);
  const role = useSelector((state: MainState) => state.user.typeID);
  const { notification } = App.useApp();
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
  const [isPremium] = useState(true); // r3v

  useEffect(() => {
    if (cantOfferMotive != CantOfferMotives.INI) setLoadingForm(false);
  }, [cantOfferMotive]);

  useEffect(() => {
    form.setFieldValue("currency", props.requirement?.coin);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.requirement]);

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
    useApi<CreateOfferRequest>({
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
      setReqSuccess(ProcessFlag.FIN_SUCCESS);
      console.log(responseData);
      setOfferId(responseData.data?.uid);
      uploadImgsAndDocs(responseData.data?.uid);
    } else if (error) {
      setReqSuccess(ProcessFlag.FIN_UNSUCCESS);
      showNotification(notification, "error", errorMsg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData, error]);

  /* Para imagenes */

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

  useEffect(() => {
    if (apiParamsImg.service) fetchDataImg(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiParamsImg]);

  useEffect(() => {
    if (responseDataImg) {
      setImgSuccess(ProcessFlag.FIN_SUCCESS);
    } else if (errorImg) {
      setImgSuccess(ProcessFlag.FIN_UNSUCCESS);
      showNotification(notification, "error", errorMsgImg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseDataImg, errorImg]);

  /* Para documentos */

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
    if (apiParamsDoc.service) fetchDataDoc(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiParamsDoc]);

  useEffect(() => {
    if (responseDataDoc) {
      setDocSuccess(ProcessFlag.FIN_SUCCESS);
    } else if (errorDoc) {
      setDocSuccess(ProcessFlag.FIN_UNSUCCESS);
      showNotification(notification, "error", errorMsgDoc);
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
        showNotification(
          notification,
          "success",
          t("offerCreatedSuccessfully")
        );
      } else {
        showNotification(
          notification,
          "warning",
          t("offerCreatedSuccessfullyNoDocOrImages")
        );
      }
      form.resetFields();
      form.setFieldValue("currency", props.requirement?.coin);
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
    } else if (
      props.requirement &&
      ((!props.requirement.subUser && props.requirement.user.uid == uid) || // requerimiento no fue creado por subusuario
        (props.requirement.subUser && props.requirement.subUser.uid == uid)) // requerimiento fue creado por subusuario
    ) {
      setCantOfferMotive(CantOfferMotives.IS_CREATOR);

      return;
    } else if (
      role == UserRoles.LEGAL ||
      role == UserRoles.NONE ||
      (role == UserRoles.BUYER &&
        props.requirement?.type != RequirementType.SALE) ||
      (role == UserRoles.SELLER &&
        props.requirement?.type == RequirementType.SALE) // r3v
    ) {
      setCantOfferMotive(CantOfferMotives.NO_ALLOWED_ROLE);

      return;
    } else if (
      props.requirement &&
      props.requirement.state != RequirementState.PUBLISHED
    ) {
      setCantOfferMotive(CantOfferMotives.CHANGED_STATE);

      return;
    } else if (
      props.requirement &&
      props.requirement.allowedBidder == CanOfferType.PREMIUM &&
      !isPremium
    ) {
      setCantOfferMotive(CantOfferMotives.ONLY_PREMIUM);

      return;
    } else {
      if (props.requirement) {
        const { responseData }: any = await makeRequest({
          service: getValidationOfferService(uid, props.requirement.key),
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
            // case CodeResponseCanOffer.NONE:
            // setCantOfferMotive(CantOfferMotives.NONE);
            // return;
          }
        }

        if (props.requirement.allowedBidder == CanOfferType.CERTIFIED_COMPANY) {
          setCantOfferMotive(CantOfferMotives.ONLY_CERTIFIED); //r3v verificar si el usuario está certificado con la empresa
          return;
        }
      }
    }
    console.log("aaaaaaa");
    setCantOfferMotive(CantOfferMotives.NONE);
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
        includesIGV: checkedIGV,
        includesDelivery: checkedDelivery,
        requerimentID: props.requirement.key,
        userID: uid,
      };

      if (values.warranty && values.duration !== undefined) {
        data.warranty = values.warranty;
        data.timeMeasurementID = values.duration;
      }

      if (values.support) data.support = values.support;

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

      submit(data);
    } else showNotification(notification, "error", t("errorOccurred"));
  }

  function submit(data: CreateOfferRequest) {
    setApiParams({
      service: createOfferService(),
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
          service: uploadDocsOfferService(),
          method: "post",
          dataToSend: data,
        });
      }
      if (formDataImg) {
        const data: FormData = formDataImg;
        data.append(ImageRequestLabels.UID, offerIdResponse);
        setApiParamsImg({
          service: uploadImagesOfferService(),
          method: "post",
          dataToSend: formDataImg,
        });
      }
    } else {
      setDocSuccess(ProcessFlag.FIN_UNSUCCESS);
      setImgSuccess(ProcessFlag.FIN_UNSUCCESS);
    }
  }

  function handleDeleteSuccess() {
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
              onDeleteSuccess={handleDeleteSuccess}
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
                <RowContainer>
                  <LocationField onlyItem />
                  <DeliveryTimeField onlyItem />
                  <CurrencyField onlyItem disabled />
                </RowContainer>
                <RowContainer>
                  <WarrantyField required={false} />
                  <DurationField required={false} name={"duration"} onlyItem />
                  <SupportField />
                  <BudgetField required greaterThanZero />
                </RowContainer>
                <div className="t-flex gap-15 archivos-up">
                  <AddImagesField forOffer />
                  <AddDocumentField forOffer />
                </div>

                <div className="t-flex t-wrap gap-15 up-footer">
                  <div className="t-flex gap-5 uf-1">
                    <Checkbox onChange={(e) => setCheckedIGV(e.target.checked)}>
                      <div className="footer-text">{t("priceIncludesIGV")}</div>
                    </Checkbox>
                    <Checkbox
                      onChange={(e) => setCheckedDelivery(e.target.checked)}
                    >
                      <div className="footer-text">{t("includeDelivery")}</div>
                    </Checkbox>
                  </div>
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
            isCertified={CertificationState.NONE} //r3v
            onDeleteSuccess={handleDeleteSuccess}
          />
        )}
      </div>
    </>
  );
}
