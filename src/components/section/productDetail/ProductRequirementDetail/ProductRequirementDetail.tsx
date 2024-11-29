import { Requirement } from "../../../../models/MainInterfaces";
import OfferForm from "./items/OfferForm";
import BasicDataRequirement from "./items/BasicDataRequirement";
import UserDataRequirement from "./items/UserDataRequirement";
import MoreDetailedRequirement from "./items/MoreDetailedRequirement";
import RequirementDescription from "./items/RequirementDescription";
import RequirementFilesAndImages from "./items/RequirementFilesAndImages";

interface RequirementDetailProps {
  requirement: Requirement | undefined;
}

export default function ProductRequirementDetail(
  props: RequirementDetailProps
) {
  return (
    <div className="t-flex f-column gap-20 section-detalles">
      <h1 className="titulo-requ m-0 text-truncate">
        {props.requirement?.title}
      </h1>
      <div className="requ-oferta gap-20 bl-1">
        <BasicDataRequirement requirement={props.requirement} />
        <UserDataRequirement
          user={props.requirement?.user}
          requirement={props.requirement}
          subUser={props.requirement?.subUser}
        />
        <MoreDetailedRequirement requirement={props.requirement} />
        <RequirementDescription description={props.requirement?.description} />
        <RequirementFilesAndImages
          images={props.requirement?.image}
          docs={props.requirement?.document}
        />
        <OfferForm requirement={props.requirement} />
      </div>
    </div>
  );
}
