import { useRef } from "react";
import { Requirement } from "../../../models/MainInterfaces";
import {
  ImagePreviewGroupContainer,
  ImagePreviewGroupContainerRef,
} from "../../containers/ImagePreviewGroupContainer";
import { defaultRequirementImage } from "../../../utilities/globals";
import OfferForm from "./OfferForm";
import BasicDataRequirement from "./BasicDataRequirement";
import UserDataRequirement from "./UserDataRequirement";

interface RequirementDetailProps {
  requirement: Requirement | undefined;
}

export default function ProductRequirementDetail(
  props: RequirementDetailProps
) {
  const childRef = useRef<ImagePreviewGroupContainerRef>(null);

  function handleOpenPreview() {
    if (props.requirement?.image && props.requirement.image.length > 0)
      if (childRef.current) {
        childRef.current.openPreview();
      }
  }

  return (
    <div className="t-flex f-column gap-20 section-detalles">
      <h1 className="titulo-requ m-0 text-truncate">
        {props.requirement?.title}
      </h1>
      <div className="requ-oferta gap-20 bl-1">
        <BasicDataRequirement requirement={props.requirement} />
        <UserDataRequirement
          user={props.requirement?.user}
          type={props.requirement?.type}
        />
        <ImagePreviewGroupContainer
          ref={childRef}
          image={props.requirement?.image}
        />
        <img
          src={
            props.requirement?.image
              ? props.requirement.image[0] ?? defaultRequirementImage
              : defaultRequirementImage
          }
          width={100}
          onClick={handleOpenPreview}
        />
        <OfferForm requirementId={props.requirement?.key} />
      </div>
    </div>
  );
}
