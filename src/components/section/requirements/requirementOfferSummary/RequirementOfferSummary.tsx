import { Divider } from "antd";
import { OfferListItem } from "../../../../models/MainInterfaces";
import RequirementOfferSummaryUserData from "./RequirementOfferSummaryUserData";
import RequirementOfferSummaryUser from "./RequirementOfferSummaryUser";
import RequirementOfferListItemHeader from "../requirementDetail/RequirementOfferListItemHeader";

interface RequirementOfferSummaryProps {
  offer: OfferListItem;
}

export default function RequirementOfferSummary(
  props: RequirementOfferSummaryProps
) {
  return (
    <>
      <Divider style={{ margin: "15px 0" }} />
      <RequirementOfferSummaryUser offer={props.offer} />
      <RequirementOfferSummaryUserData offer={props.offer} />
      <RequirementOfferListItemHeader offer={props.offer} />
    </>
  );
}
