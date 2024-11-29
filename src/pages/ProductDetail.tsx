// import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useApiParams } from "../models/Interfaces";
import useApi from "../hooks/useApi";
import { Params, useNavigate, useParams } from "react-router-dom";
import { equalServices } from "../utilities/globalFunctions";
import { getRequirementByIdService } from "../services/requests/requirementService";
import { pageRoutes } from "../utilities/routes";
import { setIsLoading } from "../redux/loadingSlice";
import { Requirement } from "../models/MainInterfaces";
import { transformFromGetRequirementByIdToRequirement } from "../utilities/transform";
import { RequirementType } from "../utilities/types";
import ProductRequirementDetail from "../components/section/productDetail/ProductRequirementDetail/ProductRequirementDetail";
import ProductDetailHeader from "../components/section/productDetail/ProductDetailHeader";
import Footer from "../components/section/footer/Footer";

export default function ProductDetail() {
  // const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { requirementId } = useParams<Params>();
  const [requirement, setRequirement] = useState<Requirement>();

  const [apiParams, setApiParams] = useState<useApiParams>({
    service: null,
    method: "get",
  });
  const { loading, responseData, error, fetchData } = useApi({
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requirementId]);

  useEffect(() => {
    if (apiParams.service) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiParams]);

  useEffect(() => {
    if (responseData) {
      if (
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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData, error]);

  async function setRequirementData(response: any) {
    const req = await transformFromGetRequirementByIdToRequirement(
      response.data[0],
      RequirementType.GOOD
    );
    if (req) setRequirement(req);
    else navigate(pageRoutes.home);
  }

  return (
    <>
      <ProductDetailHeader reqTitle={requirement?.title} />
      <ProductRequirementDetail requirement={requirement} />
      <Footer />
    </>
  );
}
