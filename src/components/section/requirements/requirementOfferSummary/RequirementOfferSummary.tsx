import { Divider } from "antd";
import {
  OfferListItem,
  RequirementTableItem,
} from "../../../../models/MainInterfaces";
import RequirementOfferSummaryUserData from "./RequirementOfferSummaryUserData";
import RequirementOfferSummaryUser from "./RequirementOfferSummaryUser";
import RequirementOfferListItemHeader from "../requirementDetail/RequirementOfferListItemHeader";
import RequirementOfferListItemBody from "../requirementDetail/RequirementOfferListItemBody";
import { useTranslation } from "react-i18next";

interface RequirementOfferSummaryProps {
  offer: OfferListItem;
  requirement: RequirementTableItem;
}

export default function RequirementOfferSummary(
  props: RequirementOfferSummaryProps
) {
  const { t } = useTranslation();

  return (
    <div className="modal-card">
      <div className="detalle-oferta">
        <Divider style={{ margin: "15px 0" }} />
        <RequirementOfferSummaryUser offer={props.offer} />
        <RequirementOfferSummaryUserData offer={props.offer} />
        <div className="card-gray">
          <div className="ofertas-recib">{t("winningOffer")}</div>
        </div>
        <div className="t-flex gap-15" style={{ flexDirection: "column" }}>
          <div className="card-ofertas">
            <RequirementOfferListItemHeader
              offer={props.offer}
              requirement={props.requirement}
              showStateAndActions={false}
            />
            <RequirementOfferListItemBody offer={props.offer} />
          </div>
        </div>
      </div>
    </div>
  );
}
