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
import { useEffect, useState } from "react";
import showNotification from "../../../utilities/notification/showNotification";
import { useApiParams } from "../../../models/Interfaces";
import useApi from "../../../hooks/useApi";
import { createOfferService } from "../../../services/requests/offerService";
import { ImageRequestLabels } from "../../../utilities/types";
import { uploadDocsOfferService } from "../../../services/requests/documentService";
import { uploadImagesOfferService } from "../../../services/requests/imageService";

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
  const [reqSuccess, setReqSuccess] = useState(false);
  const [docSuccess, setDocSuccess] = useState(false);
  const [imgSuccess, setImgSuccess] = useState(false);

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
    if (apiParams.service) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiParams]);

  useEffect(() => {
    if (responseData) {
      setReqSuccess(true);

      uploadImgsAndDocs();
    } else if (error) {
      setReqSuccess(false);
      showNotification(notification, "error", errorMsg);
    }
  }, [responseData, error]);

  useEffect(() => {
    if (responseDataImg) {
      setImgSuccess(true);
    } else if (errorImg) {
      setImgSuccess(false);
      showNotification(notification, "error", errorMsgImg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseDataImg, errorImg]);

  useEffect(() => {
    if (responseDataDoc) {
      setDocSuccess(true);
    } else if (errorDoc) {
      setDocSuccess(false);
      showNotification(notification, "error", errorMsgDoc);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseDataDoc, errorDoc]);

  useEffect(() => {
    if (
      (reqSuccess && !formDataDoc && !formDataImg) ||
      (reqSuccess && formDataDoc && docSuccess && !formDataImg) ||
      (reqSuccess && formDataImg && imgSuccess && !formDataDoc) ||
      (reqSuccess && formDataImg && imgSuccess && formDataDoc && docSuccess)
    ) {
      showNotification(notification, "success", t("offerCreatedSuccessfully"));
    } else if (
      (reqSuccess && formDataDoc && !docSuccess && !formDataImg) ||
      (reqSuccess && formDataImg && !imgSuccess && !formDataDoc) ||
      (reqSuccess && formDataImg && !imgSuccess && formDataDoc && !docSuccess)
    ) {
      showNotification(
        notification,
        "warning",
        t("offerCreatedSuccessfullyNoDocOrImages")
      );
    }
  }, [reqSuccess, imgSuccess, docSuccess]);

  useEffect(() => {
    if (!reqSuccess) {
      setFormDataDoc(null);
      setFormDataImg(null);
      setDocSuccess(false);
      setImgSuccess(false);
    }
  }, [reqSuccess]);

  function createOffer(values: any) {
    setReqSuccess(false);

    if (props.requirementId) {
      const data: CreateOfferRequest = {
        name: values.title.trim(),
        email: values.email,
        description: values.description.trim(),
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
            formDataDoc.append(ImageRequestLabels.IMAGES, file.originFileObj);
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

  function uploadImgsAndDocs() {
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
  }

  return (
    <Form form={form} colon={false} requiredMark={false} onFinish={createOffer}>
      <div className="card-white card-personal">
        <TitleField />
        <EmailField onlyItem edit value={email} />
        <OfferDescriptionField />
        <LocationField onlyItem />
        <DeliveryTimeField />
        <CurrencyField />
        <WarrantyField required={true} />
        <DurationField required={true} name={"duration"} />
        <SupportField />
        <BudgetField />

        <AddImagesField />
        <AddDocumentField />

        <Checkbox onChange={(e) => setCheckedIGV(e.target.checked)}>
          <a className="forgot-password text-left" style={{ width: "100%" }}>
            {t("priceIncludesIGV")}
          </a>
        </Checkbox>
        <Checkbox onChange={(e) => setCheckedDelivery(e.target.checked)}>
          <a className="forgot-password text-left" style={{ width: "100%" }}>
            {t("includeDelivery")}
          </a>
        </Checkbox>
      </div>
      <ButtonContainer htmlType="submit" loading={loading}>
        {t("saveButton")}
      </ButtonContainer>
    </Form>
  );
}
