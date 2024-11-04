import { useTranslation } from "react-i18next";
import ButtonContainer from "../../containers/ButtonContainer";
import { App, Checkbox, Form, UploadFile } from "antd";
import { MainState } from "../../../models/Redux";
import { useSelector } from "react-redux";
import TitleField from "../../common/formFields/TitleField";
import EmailField from "../../common/formFields/EmailField";
import OfferDescriptionField from "../../common/formFields/OfferDescriptionField";
import LocationField from "../../common/formFields/LocationField";
import DeliveryTimeField from "../../common/formFields/DeliveryTimeField";
import CurrencyField from "../../common/formFields/CurrencyField";
import WarrantyField from "../../common/formFields/WarrantyField";
import DurationField from "../../common/formFields/DurationField";
import SupportField from "../../common/formFields/SupportField";
import BudgetField from "../../common/formFields/BudgetField";
import AddImagesField from "../../common/formFields/AddImagesField";
import AddDocumentField from "../../common/formFields/AddDocumentField";
import { CreateOfferRequest } from "../../../models/Requests";
import { ReactNode, useEffect, useState } from "react";
import showNotification from "../../../utilities/notification/showNotification";
import { useApiParams } from "../../../models/Interfaces";
import useApi from "../../../hooks/useApi";
import { createOfferService } from "../../../services/requests/offerService";
import { ImageRequestLabels, ProcessFlag } from "../../../utilities/types";
import { uploadDocsOfferService } from "../../../services/requests/documentService";
import { uploadImagesOfferService } from "../../../services/requests/imageService";
import React from "react";

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
  requirementId: string | undefined;
}

export default function OfferForm(props: OfferFormProps) {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const email = useSelector((state: MainState) => state.user.email);
  const uid = useSelector((state: MainState) => state.user.uid);
  const { notification } = App.useApp();
  const [checkedIGV, setCheckedIGV] = useState(false);
  const [checkedDelivery, setCheckedDelivery] = useState(false);
  const [formDataImg, setFormDataImg] = useState<FormData | null>(null);
  const [formDataDoc, setFormDataDoc] = useState<FormData | null>(null);
  const [reqSuccess, setReqSuccess] = useState(ProcessFlag.NOT_INI);
  const [docSuccess, setDocSuccess] = useState(ProcessFlag.NOT_INI);
  const [imgSuccess, setImgSuccess] = useState(ProcessFlag.NOT_INI);

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
    if (apiParams.service) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiParams]);

  useEffect(() => {
    if (responseData) {
      setReqSuccess(ProcessFlag.FIN_SUCCESS);
      console.log(responseData);
      uploadImgsAndDocs(responseData.data?.uid);
    } else if (error) {
      setReqSuccess(ProcessFlag.FIN_UNSUCCESS);
      showNotification(notification, "error", errorMsg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData, error]);

  useEffect(() => {
    if (responseDataImg) {
      setImgSuccess(ProcessFlag.FIN_SUCCESS);
    } else if (errorImg) {
      setImgSuccess(ProcessFlag.FIN_UNSUCCESS);
      showNotification(notification, "error", errorMsgImg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseDataImg, errorImg]);

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
    console.log(reqSuccess, docSuccess, imgSuccess);
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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reqSuccess, imgSuccess, docSuccess]);

  function createOffer(values: any) {
    setReqSuccess(ProcessFlag.NOT_INI);
    setFormDataDoc(null);
    setFormDataImg(null);
    setDocSuccess(ProcessFlag.NOT_INI);
    setImgSuccess(ProcessFlag.NOT_INI);

    if (props.requirementId) {
      const data: CreateOfferRequest = {
        name: values.title.trim(),
        email: values.email,
        description: values.description?.trim(),
        cityID: values.location,
        deliveryTimeID: values.deliveryTime,
        currencyID: values.currency,
        warranty: values.warranty,
        timeMeasurementID: values.duration,
        support: values.support,
        budget: values.budget,
        includesIGV: checkedIGV,
        includesDelivery: checkedDelivery,
        requerimentID: props.requirementId,
        userID: uid,
      };

      if (values.images && values.images.fileList.length > 0) {
        const formData = new FormData();
        values.images.fileList.forEach((file: UploadFile) => {
          if (file.originFileObj) {
            formData.append(ImageRequestLabels.IMAGES, file.originFileObj);
          }
        });
        formData.append(ImageRequestLabels.UID, uid);

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
        formDataDoc.append(ImageRequestLabels.UID, uid);
        setFormDataDoc(formDataDoc);
      }

      submit(data);
    } else showNotification(notification, "error", t("errorOccurred"));
  }

  function submit(data: CreateOfferRequest) {
    console.log(data);
    setApiParams({
      service: createOfferService(),
      method: "post",
      dataToSend: data,
    });
  }

  function uploadImgsAndDocs(offerId: string | undefined) {
    if (offerId) {
      if (!formDataDoc) setDocSuccess(ProcessFlag.FIN_SUCCESS);
      if (!formDataImg) setImgSuccess(ProcessFlag.FIN_SUCCESS);
      if (!formDataDoc && !formDataImg) {
        return;
      }
      if (formDataDoc)
        setApiParamsDoc({
          service: uploadDocsOfferService(),
          method: "post",
          dataToSend: formDataDoc,
        });
      if (formDataImg)
        setApiParamsImg({
          service: uploadImagesOfferService(),
          method: "post",
          dataToSend: formDataImg,
        });
    } else {
      setDocSuccess(ProcessFlag.FIN_UNSUCCESS);
      setImgSuccess(ProcessFlag.FIN_UNSUCCESS);
    }
  }

  return (
    <div className="card-white cbl-6">
      <div className="t-flex mr-sub-2">
        <i className="fa-regular fa-tags sub-icon m-0"></i>
        <div className="sub-titulo sub-calificar">
          <div>{t("offerFormTitle")}</div>
        </div>
      </div>
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
            <DeliveryTimeField />
            <CurrencyField />
          </RowContainer>
          <RowContainer>
            <WarrantyField required={true} />
            <DurationField required={true} name={"duration"} />
            <SupportField />
            <BudgetField />
          </RowContainer>

          <AddImagesField />
          <AddDocumentField />

          <div className="t-flex t-wrap gap-15 up-footer">
            <div className="t-flex gap-5 uf-1">
              <div className="footer-text">
                <input
                  type="checkbox"
                  onChange={(e) => setCheckedIGV(e.target.checked)}
                />{" "}
                {t("priceIncludesIGV")}
              </div>
              <div className="footer-text">
                <input
                  type="checkbox"
                  onChange={(e) => setCheckedDelivery(e.target.checked)}
                />{" "}
                {t("includeDelivery")}
              </div>
            </div>
            <div className="t-flex gap-10 uf-2">
              <button className="btn btn-default">
                <i className="fa-regular fa-tag"></i> Ofertar
              </button>
              <button className="btn btn-green">
                <i className="fa-regular fa-comment"></i> Enviar Mensaje
              </button>
            </div>
          </div>

          {/* <Checkbox onChange={(e) => setCheckedIGV(e.target.checked)}>
            <a className="forgot-password text-left" style={{ width: "100%" }}>
              {t("priceIncludesIGV")}
            </a>
          </Checkbox>
          <Checkbox onChange={(e) => setCheckedDelivery(e.target.checked)}>
            <a className="forgot-password text-left" style={{ width: "100%" }}>
              {t("includeDelivery")}
            </a>
          </Checkbox> */}

          <ButtonContainer
            htmlType="submit"
            loading={loading || loadingDoc || loadingImg}
          >
            {t("saveButton")}
          </ButtonContainer>
        </div>
      </Form>
      <div className="t-flex f-column j-conten j-items oferta-check gap-10">
        <i className="fa-regular fa-clipboard-check fa-3x"></i>
        <div className="aviso-h">
          <div className="cantidad-estd">{t("alreadyMadeOffer")}</div>
          <div className="detalles-estd">
            {t("ifYouWantToEliminateYourOfferClickOnDelete")}
          </div>
        </div>
        <button className="btn btn-default btn-sm">
          <i className="fa-regular fa-trash"></i> {t("deleteOffer")}
        </button>
      </div>
    </div>
  );
}
