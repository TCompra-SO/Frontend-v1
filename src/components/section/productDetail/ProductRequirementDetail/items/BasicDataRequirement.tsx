import { useTranslation } from "react-i18next";
import { Requirement } from "../../../../../models/MainInterfaces";
import { ListsContext } from "../../../../../contexts/ListsContext";
import { useContext, useEffect, useRef, useState } from "react";
import { defaultCountry } from "../../../../../utilities/globals";
import {
  ImagePreviewGroupContainer,
  ImagePreviewGroupContainerRef,
} from "../../../../containers/ImagePreviewGroupContainer";
import { getCityObj } from "../../../../../utilities/globalFunctions";
import { IdValueMap } from "../../../../../models/Interfaces";

interface BasicDataRequirementProps {
  requirement: Requirement | undefined;
}

export default function BasicDataRequirement(props: BasicDataRequirementProps) {
  const { t } = useTranslation();
  const context = useContext(ListsContext);
  const { countryData, currencyData } = context;
  const childRef = useRef<ImagePreviewGroupContainerRef>(null);
  const [cities, setCities] = useState<IdValueMap>({});

  useEffect(() => {
    setCities(getCityObj(countryData, defaultCountry));
  }, [countryData]);

  function handleOpenPreview() {
    if (
      props.requirement &&
      props.requirement.image &&
      props.requirement.image.length > 0
    )
      if (childRef.current) {
        childRef.current.openPreview();
      }
  }

  function stopPropagation(event: any) {
    event.stopPropagation();
  }

  return (
    <div
      className="section-galeria cbl-1"
      onClick={handleOpenPreview}
      style={{
        cursor:
          props.requirement?.image && props.requirement?.image.length > 0
            ? "pointer"
            : "default",
      }}
    >
      <ImagePreviewGroupContainer
        ref={childRef}
        image={props.requirement?.image}
      />
      <img
        src={
          props.requirement?.image && props.requirement.image.length > 0
            ? props.requirement.image[0]
            : "/src/assets/images/header-01.svg"
        }
        alt=""
        className="img-slider-req"
      />
      <div className="galeria-detalles">
        <div className="t-flex f-column gap-15 detalles-requ">
          <div className="t-flex gap-15 det-c">
            <div
              className="det-1"
              onClick={stopPropagation}
              style={{ cursor: "default" }}
            >
              <div className="ub-1">
                {props.requirement && cities[props.requirement.location]?.value}
                , {countryData[defaultCountry]?.value}
              </div>
              <div className="ub-2">{props.requirement?.title}</div>
            </div>
            <div
              className="det-2"
              onClick={stopPropagation}
              style={{ cursor: "default", whiteSpace: "nowrap" }}
            >
              {props.requirement?.coin &&
                currencyData[props.requirement?.coin]?.alias}{" "}
              {props.requirement?.price}
              <span>/{t("priceColumn")}</span>
            </div>
          </div>
          <div className="t-flex">
            <div
              className="det-3 text-truncate"
              onClick={stopPropagation}
              style={{ cursor: "default" }}
            >
              {props.requirement?.user.name}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
