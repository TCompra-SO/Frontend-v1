import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useApiParams } from "../models/Interfaces";
import useApi from "../hooks/useApi";
import { Params, useNavigate, useParams } from "react-router-dom";
import { pageRoutes } from "../utilities/routes";
import { setIsLoading } from "../redux/loadingSlice";
import { Requirement } from "../models/MainInterfaces";
import { transformFromGetRequirementByIdToRequirement } from "../utilities/transform";
import ProductRequirementDetail from "../components/section/productDetail/ProductRequirementDetail/ProductRequirementDetail";
import ProductDetailHeader from "../components/section/productDetail/ProductDetailHeader";
import Footer from "../components/section/footer/Footer";
import {
  getGetRecordByIdService,
  isRequirementType,
} from "../utilities/globalFunctions";

export default function ProductDetail() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { requirementId } = useParams<Params>();
  const { type } = useParams<Params>();
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
    setIsLoading(true);
  }, []);

  useEffect(() => {
    dispatch(setIsLoading(loading));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  useEffect(() => {
    const { result, val } = isRequirementType(Number(type));
    if (requirementId && result && val) {
      setApiParams({
        service: getGetRecordByIdService(val)?.(requirementId, false),
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
      setRequirementData(responseData);
    } else if (error) {
      navigate(pageRoutes.home);
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData, error]);

  async function setRequirementData(response: any) {
    const { result, val } = isRequirementType(Number(type));
    if (requirementId && result && val) {
      const req = await transformFromGetRequirementByIdToRequirement(
        response.data[0],
        val
      );
      if (req) setRequirement(req);
      else navigate(pageRoutes.home);
    } else navigate(pageRoutes.home);
  }

  return (
    <>
      <ProductDetailHeader
        reqTitle={requirement?.title}
        type={requirement?.type}
      />
      <ProductRequirementDetail requirement={requirement} />
      <Footer />
    </>
  );
}
