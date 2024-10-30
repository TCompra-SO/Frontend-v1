import { Requirement } from "../../../models/MainInterfaces";

interface RequirementDetailProps {
  requirement: Requirement | undefined;
}

export default function ProductRequirementDetail(
  props: RequirementDetailProps
) {
  return (
    <div>
      RequirementDetail<br></br>
      {props.requirement?.title}
      <br></br>
      {props.requirement?.description}
      <br></br>
    </div>
  );
}
