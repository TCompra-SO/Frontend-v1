import { useTranslation } from "react-i18next";
import ButtonContainer from "../../../../containers/ButtonContainer";
import {
  CantOfferMotives,
  RequirementType,
} from "../../../../../utilities/types";
import { useEffect, useState } from "react";
import { Requirement } from "../../../../../models/MainInterfaces";
import { useNavigate } from "react-router-dom";
import { pageRoutes } from "../../../../../utilities/routes";

interface CantOfferMessageProps {
  offerId: string;
  motive: CantOfferMotives;
  requirement: Requirement | undefined;
}

export default function CantOfferMessage(props: CantOfferMessageProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [mainText, setMainText] = useState("");
  const [optionalText, setOptionalText] = useState("");

  useEffect(() => {
    switch (props.motive) {
      case CantOfferMotives.ALREADY_MADE_OFFER:
        setMainText(t("alreadyMadeOffer"));
        setOptionalText(t("ifYouWantToEliminateYourOfferClickOnDelete"));
        break;
      case CantOfferMotives.NOT_LOGGED_IN:
        setMainText(t("mustLoginToOffer"));
        setOptionalText("");
        break;
      case CantOfferMotives.IS_CREATOR:
        setMainText(
          `${
            props.requirement?.type &&
            props.requirement.type == RequirementType.SALE
              ? `${t("yourSaleHas")} (${props.requirement?.numberOffers}) ${t(
                  "offers"
                )}`
              : `${t("yourSaleHas")}  (${props.requirement?.numberOffers}) ${t(
                  "offers"
                )}`
          }`
        );
        setOptionalText("");
        break;
      case CantOfferMotives.CHANGED_STATE:
        setMainText(
          `${
            props.requirement?.type &&
            props.requirement.type == RequirementType.SALE
              ? `${t("thisSaleIsNoLongerAvailable")}`
              : `${t("thisRequirementIsNoLongerAvailable")} `
          }`
        );
        setOptionalText(
          `${t("itHad")} (${props.requirement?.numberOffers}) ${t("offers")}`
        );
        break;
      case CantOfferMotives.OTHER_USER_IN_COMPANY_MADE_OFFER:
        setMainText(t("otherEmployeeHasAlreadyMadeAnOffer"));
        setOptionalText("");
        break;
      case CantOfferMotives.IS_MAIN_CREATOR:
        setMainText(t("aSubUserHasAlreadyMadeAnOffer"));
        setOptionalText(
          `${t("itHad")} (${props.requirement?.numberOffers}) ${t("offers")}`
        );
        break;
      case CantOfferMotives.ONLY_PREMIUM:
        setMainText(t("onlyPremiumUserCanMakeAnOffer"));
        setOptionalText("");
        break;
      case CantOfferMotives.ONLY_CERTIFIED:
        setMainText(t("onlyCertifiedCompaniesCanMakeAnOffer")); // r3v
        setOptionalText("");
        break;
      case CantOfferMotives.NO_ALLOWED_ROLE:
        setMainText(t("noPermissionToMakeOffer"));
        setOptionalText("");
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.motive]);

  function deleteOffer() {
    console.log("deleting", props.offerId);
  }

  return (
    <div className="t-flex f-column j-conten j-items oferta-check gap-10">
      <i className="fa-regular fa-circle-exclamation fa-3x"></i>
      <div className="aviso-h">
        <div className="cantidad-estd">{mainText}</div>
        {optionalText && <div className="detalles-estd">{optionalText}</div>}
      </div>
      {props.motive == CantOfferMotives.ALREADY_MADE_OFFER && (
        <ButtonContainer
          className="btn btn-default btn-sm"
          icon={<i className="fa-regular fa-trash"></i>}
          onClick={deleteOffer}
        >
          {t("deleteOffer")}
        </ButtonContainer>
      )}
      {props.motive == CantOfferMotives.CHANGED_STATE && (
        <ButtonContainer
          className="btn btn-default btn-sm"
          icon={<i className="fa-regular fa-house"></i>}
          onClick={() => navigate(pageRoutes.home)}
        >
          {t("goTo") + t("home")}
        </ButtonContainer>
      )}
      {(props.motive == CantOfferMotives.IS_CREATOR ||
        props.motive == CantOfferMotives.IS_MAIN_CREATOR) && (
        <ButtonContainer
          className="btn btn-default btn-sm"
          icon={<i className="fa-regular fa-columns"></i>}
          onClick={() => navigate(pageRoutes.home)} // r3v
        >
          {t("goTo") + t("controlPanel")}
        </ButtonContainer>
      )}
      {props.motive == CantOfferMotives.ONLY_CERTIFIED && (
        <ButtonContainer
          className="btn btn-default btn-sm"
          icon={<i className="fa-regular fa-star"></i>}
          onClick={() => {}} // r3v
        >
          {t("getCertified")}
        </ButtonContainer>
      )}
    </div>
  );
}