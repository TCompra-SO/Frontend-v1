import { Offer, User } from "../../../../models/MainInterfaces";
import RequirementOfferListItemBody from "../requirementDetail/RequirementOfferListItemBody";
import { useTranslation } from "react-i18next";
import FrontImage from "../../../common/FrontImage";
import RequirementInfoNoTags from "../requirementDetail/RequirementInfoNoTags";
import { DocType, EntityType } from "../../../../utilities/types";

interface RequirementOfferSummaryProps {
  offer: Offer;
  user: User;
}

export default function RequirementOfferSummary(
  props: RequirementOfferSummaryProps
) {
  const { t } = useTranslation();

  return (
    <div className="modal-card">
      <div className="detalle-oferta">
        <div className="t-flex gap-15 requerimiento-o">
          <FrontImage image={props.user.image} isUser={true} />
          <div className="t-flex detalle-req">
            <RequirementInfoNoTags
              title={props.offer.title}
              user={props.user}
              type={props.offer.type}
              subUser={props.offer.subUser}
              description={props.offer.description}
            />
            <div className="t-flex tags-req t-wrap">
              <div className="badge-grey-border">
                {props.offer.user.typeEntity == EntityType.COMPANY
                  ? DocType.RUC
                  : DocType.DNI}
                : {props.offer.user.document}
              </div>

              {props.user.typeEntity == EntityType.COMPANY && (
                <div className="badge-grey-border">
                  {t("tenure")}: {props.user.tenure} {t("years")}
                </div>
              )}
              <div className="badge-grey-border">
                {t("phone")}: {props.user.phone}
              </div>
              <div className="badge-grey-border">
                {t("email")}:{" "}
                {props.offer.subUser
                  ? props.offer.subUser.email
                  : props.user.email}
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
