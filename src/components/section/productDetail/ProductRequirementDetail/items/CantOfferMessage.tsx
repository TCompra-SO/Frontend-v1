import { useTranslation } from "react-i18next";
import ButtonContainer from "../../../../containers/ButtonContainer";
import {
  CantOfferMotives,
  ModalTypes,
  RequirementType,
} from "../../../../../utilities/types";
import { useEffect, useState } from "react";
import { Requirement } from "../../../../../models/MainInterfaces";
import { useNavigate } from "react-router-dom";
import { pageRoutes } from "../../../../../utilities/routes";
import ModalContainer from "../../../../containers/ModalContainer";
import { ModalContent } from "../../../../../models/Interfaces";
import { mainModalScrollStyle } from "../../../../../utilities/globals";

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
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [dataModal, setDataModal] = useState<ModalContent>({
    type: ModalTypes.NONE,
    data: {},
  });

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
              : `${t("yourRequirementHas")}  (${
                  props.requirement?.numberOffers
                }) ${t("offers")}`
          }`
        );
        setOptionalText("ss");
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

  function handleCloseModal() {
    setIsOpenModal(false);
  }

  function deleteOffer() {
    console.log("deleting", props.offerId);
  }

  function openGetCertifiedModal() {
    setDataModal({
      type: ModalTypes.SELECT_DOCS_CERT,
      data: {
        data: {
          userId: "2222222",
          userName: "Uiversidad nacional de san agustín",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        },
      },
    });
    setIsOpenModal(true);
  }

  return (
    <>
      <ModalContainer
        destroyOnClose
        content={dataModal}
        isOpen={isOpenModal}
        onClose={handleCloseModal}
        style={mainModalScrollStyle}
      />

      <div className="t-flex f-column j-conten j-items oferta-check gap-10">
        <i className="fa-regular fa-circle-exclamation fa-3x"></i>
        <div className="aviso-h">
          <div className="cantidad-estd">{mainText}</div>
          {optionalText && <div className="detalles-estd">{optionalText}</div>}
        </div>
        {props.motive == CantOfferMotives.ALREADY_MADE_OFFER && (
          <ButtonContainer
            style={{ height: "auto" }}
            className="btn btn-default btn-sm"
            icon={<i className="fa-regular fa-trash"></i>}
            onClick={deleteOffer}
          >
            {t("deleteOffer")}
          </ButtonContainer>
        )}
        {props.motive == CantOfferMotives.CHANGED_STATE && (
          <ButtonContainer
            style={{ height: "auto" }}
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
            style={{ height: "auto" }}
            className="btn btn-default btn-sm"
            icon={<i className="fa-regular fa-columns"></i>}
            onClick={() => navigate(pageRoutes.home)} // r3v
          >
            {t("goTo") + t("controlPanel")}
          </ButtonContainer>
        )}
        {props.motive == CantOfferMotives.ONLY_CERTIFIED && (
          <ButtonContainer
            style={{ height: "auto" }}
            className="btn btn-green btn-sm"
            icon={<i className="fa-regular fa-star"></i>}
            onClick={openGetCertifiedModal} // r3v
          >
            {t("getCertified")}
          </ButtonContainer>
        )}
      </div>
    </>
  );
}
