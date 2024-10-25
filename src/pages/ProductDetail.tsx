import { App, Checkbox, Form } from "antd";
import TitleField from "../components/common/formFields/TitleField";
import OfferDescriptionField from "../components/common/formFields/OfferDescriptionField";
import EmailField from "../components/common/formFields/EmailField";
import LocationField from "../components/common/formFields/LocationField";
import DeliveryTimeField from "../components/common/formFields/DeliveryTimeField";
import CurrencyField from "../components/common/formFields/CurrencyField";
import WarrantyField from "../components/common/formFields/WarrantyField";
import DurationField from "../components/common/formFields/DurationField";
import SupportField from "../components/common/formFields/SupportField";
import BudgetField from "../components/common/formFields/BudgetField";
import ButtonContainer from "../components/containers/ButtonContainer";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { CreateOfferRequest } from "../models/Requests";
import { MainState } from "../models/Redux";
import { useDispatch, useSelector } from "react-redux";
import { useApiParams } from "../models/Interfaces";
import useApi from "../hooks/useApi";
import { Params, useNavigate, useParams } from "react-router-dom";
import { createOfferService } from "../services/requests/offerService";
import showNotification from "../utilities/notification/showNotification";
import { equalServices } from "../utilities/globalFunctions";
import { getRequirementByIdService } from "../services/requests/requirementService";
import { pageRoutes } from "../utilities/routes";
import { setIsLoading } from "../redux/loadingSlice";
import { Requirement } from "../models/MainInterfaces";
import { transformFromGetRequirementByIdToRequirement } from "../utilities/transform";
import { RequirementType } from "../utilities/types";

export default function ProductDetail() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { notification } = App.useApp();
  const { requirementId } = useParams<Params>();
  const [requirement, setRequirement] = useState<Requirement>();
  const uid = useSelector((state: MainState) => state.user.uid);
  const email = useSelector((state: MainState) => state.user.email);
  const [checkedIGV, setCheckedIGV] = useState(false);
  const [checkedDelivery, setCheckedDelivery] = useState(false);
  const [form] = Form.useForm();
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
    if (equalServices(apiParams.service, getRequirementByIdService("", false)))
      dispatch(setIsLoading(loading));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  useEffect(() => {
    if (requirementId) {
      setApiParams({
        service: getRequirementByIdService(requirementId, false),
        method: "get",
      });
    } else navigate(pageRoutes.home);
  }, [requirementId]);

  useEffect(() => {
    if (apiParams.service) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiParams]);

  useEffect(() => {
    if (responseData) {
      if (equalServices(apiParams.service, createOfferService())) {
        showNotification(
          notification,
          "success",
          t("offerCreatedSuccessfully")
        );
      } else if (
        equalServices(apiParams.service, getRequirementByIdService("", false))
      ) {
        setRequirementData(responseData);
      }
    } else if (error) {
      if (
        equalServices(apiParams.service, getRequirementByIdService("", false))
      ) {
        navigate(pageRoutes.home);
        return;
      }
      showNotification(notification, "error", errorMsg);
    }
  }, [responseData, error]);

  async function setRequirementData(response: any) {
    console.log(response);
    const s = await transformFromGetRequirementByIdToRequirement(
      response.data,
      RequirementType.GOOD
    );
    console.log(s);
  }

  function createOffer(values: any) {
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
      requerimentID: requirementId!,
      userID: uid,
    };

    console.log(data);
    setApiParams({
      service: createOfferService(),
      method: "post",
      dataToSend: data,
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
      <ButtonContainer
        htmlType="submit"
        loading={
          equalServices(apiParams.service, createOfferService())
            ? loading
            : undefined
        }
      >
        {t("saveButton")}
      </ButtonContainer>
    </Form>
  );
}
