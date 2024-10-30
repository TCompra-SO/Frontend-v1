import { useRef } from "react";
import { Requirement } from "../../../models/MainInterfaces";
import {
  ImagePreviewGroupContainer,
  ImagePreviewGroupContainerRef,
} from "../../containers/ImagePreviewGroupContainer";
import { defaultRequirementImage } from "../../../utilities/globals";

interface RequirementDetailProps {
  requirement: Requirement | undefined;
}

export default function ProductRequirementDetail(
  props: RequirementDetailProps
) {
  console.log(props.requirement);
  const childRef = useRef<ImagePreviewGroupContainerRef>(null);

  function handleOpenPreview() {
    if (props.requirement?.image && props.requirement.image.length > 0)
      if (childRef.current) {
        childRef.current.openPreview();
      }
  }

  return (
    <div>
      RequirementDetail<br></br>
      {props.requirement?.title}
      <br></br>
      {props.requirement?.description}
      <br></br>
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
    </div>
  );
}
