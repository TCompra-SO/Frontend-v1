import { useContext, useEffect, useState } from "react";
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
  escapeHTML,
  getGetRecordByIdService,
  isRequirementType,
} from "../utilities/globalFunctions";
import { RequirementType } from "../utilities/types";
import { ListsContext } from "../contexts/ListsContext";
import { Helmet } from "react-helmet-async";

export default function ProductDetail() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { requirementId } = useParams<Params>();
  const { type } = useParams<Params>();
  const [requirement, setRequirement] = useState<Requirement>();
  const { categoryData } = useContext(ListsContext);
  const [seo, setSeo] = useState<any>(null);

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

  useEffect(() => {
    if (requirement) {
      setSeo(generateSEOTags(requirement));
      console.log(generateSEOTags(requirement));
    }
  }, [requirement]);

  /**
   * Funciones
   */

  async function setRequirementData(response: any) {
    const { result, val } = isRequirementType(Number(type));
    if (requirementId && result && val) {
      const req = await transformFromGetRequirementByIdToRequirement(
        response.data[0],
        val
      );
      if (
        req &&
        (req.type != RequirementType.SALE ||
          (req.type == RequirementType.SALE && req.valid))
      )
        setRequirement(req);
      else navigate(pageRoutes.home);
    } else navigate(pageRoutes.home);
  }

  function generateSEOTags(requirement: Requirement) {
    const safeTitle = escapeHTML(requirement.title.trim());
    const safeDescription = escapeHTML(requirement.description.trim());
    const categoryName = categoryData?.[requirement?.category]?.value ?? "";

    const seoTitle = `${safeTitle} | ${categoryName}`;
    const seoDescription = safeDescription.slice(0, 160); // Google usually shows up to 160 chars

    const schema = {
      "@context": "https://schema.org/",
      "@type": "Product",
      name: safeTitle,
      description: safeDescription,
      category: categoryName,
    };

    return {
      titleTag: `<title>${seoTitle}</title>`,
      metaDescription: `<meta name="description" content="${seoDescription}">`,
      schemaJSONLD: `<script type="application/ld+json">${JSON.stringify(
        schema
      )}</script>`,
    };
  }

  return (
    <>
      {seo && (
        <Helmet>
          <title>{seo.seoTitle}</title>
          <meta name="description" content={seo.seoDescription} />
          <script type="application/ld+json">
            {JSON.stringify(seo.schema)}
          </script>
        </Helmet>
      )}
      <ProductDetailHeader
        reqTitle={requirement?.title}
        type={requirement?.type}
      />
      <ProductRequirementDetail requirement={requirement} />
      <Footer />
    </>
  );
}
