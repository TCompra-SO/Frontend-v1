import { Offer } from "../../../../models/MainInterfaces";
import RequirementOfferListItemBody from "../requirementDetail/RequirementOfferListItemBody";
import { useTranslation } from "react-i18next";
import FrontImage from "../../../common/FrontImage";
import RequirementInfoNoTags from "../requirementDetail/RequirementInfoNoTags";
import { DocType, EntityType } from "../../../../utilities/types";

interface RequirementOfferSummaryProps {
  offer: Offer;
}

export default function RequirementOfferSummary(
  props: RequirementOfferSummaryProps
) {
  const { t } = useTranslation();

  return (
    <div className="modal-card">
      <div className="detalle-oferta">
        <div className="t-flex gap-15 requerimiento-o">
          <FrontImage image={props.offer.user.image} isUser={true} />
          <div className="t-flex detalle-req">
            <RequirementInfoNoTags
              title={props.offer.title}
              user={props.offer.user}
              type={props.offer.type}
              subUser={props.offer.subUser}
              description={props.offer.description}
            />
            <div className="t-flex tags-req t-wrap">
              <div className="badge-grey-border">
                {DocType.RUC}: 23568745214
              </div>
              {/* r3v dni ruc */}
              {props.offer.user.typeEntity == EntityType.COMPANY && (
                <div className="badge-grey-border">
                  {t("tenure")}: {props.offer.user.tenure} {t("years")}
                </div>
              )}
              <div className="badge-grey-border">
                {t("phone")}: {props.offer.user.phone}
              </div>
              <div className="badge-grey-border">
                {t("email")}:{" "}
                {props.offer.subUser
                  ? props.offer.subUser.email
                  : props.offer.user.email}
              </div>
            </div>
          </div>
        </div>
        <div className="t-flex gap-15" style={{ flexDirection: "column" }}>
          <div className="card-ofertas">
            <RequirementOfferListItemBody
              offer={props.offer}
              showUserData={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
