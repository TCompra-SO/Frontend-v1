import { useTranslation } from "react-i18next";
import ButtonContainer from "../../../../containers/ButtonContainer";
import {
  Action,
  CantOfferMotives,
  CertificationState,
  EntityType,
  ModalTypes,
  RequirementType,
} from "../../../../../utilities/types";
import { useContext, useEffect, useState } from "react";
import { Requirement } from "../../../../../models/MainInterfaces";
import { useNavigate } from "react-router-dom";
import { pageRoutes, pageSubRoutes } from "../../../../../utilities/routes";
import ModalContainer from "../../../../containers/ModalContainer";
import { ModalContent, useApiParams } from "../../../../../models/Interfaces";
import { mainModalScrollStyle } from "../../../../../utilities/globals";
import { MainState } from "../../../../../models/Redux";
import { useSelector } from "react-redux";
import SimpleLoading from "../../../../../pages/utils/SimpleLoading";
import useApi from "../../../../../hooks/useApi";
import { ModalsContext } from "../../../../../contexts/ModalsContext";
import useShowNotification, {
  useShowLoadingMessage,
} from "../../../../../hooks/utilHooks";
import {
  getDeleteOfferService,
  getInitialModalData,
} from "../../../../../utilities/globalFunctions";

interface CantOfferMessageProps {
  offerId: string;
  motive: CantOfferMotives;
  requirement: Requirement | undefined;
  isPremium?: boolean;
  isCertified?: CertificationState;
  loading?: boolean;
  onDeleteSuccess: () => void;
  onSentDocsToGetCertifiedSuccess: () => void;
  setIsCertified: (state: CertificationState) => void;
}

export default function CantOfferMessage(props: CantOfferMessageProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { showLoadingMessage } = useShowLoadingMessage();
  const { showNotification } = useShowNotification();
  const entityType = useSelector((state: MainState) => state.user.typeEntity);
  const { updateDetailedRequirementModalData } = useContext(ModalsContext);
  const [mainText, setMainText] = useState("");
  const [optionalText, setOptionalText] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [dataModal, setDataModal] = useState<ModalContent>(
    getInitialModalData()
  );

  /* Para eliminar */

  const [apiParamsDelete, setApiParamsDelete] = useState<useApiParams>({
    service: null,
    method: "get",
  });

  const {
    loading: loadingDelete,
    responseData: responseDataDelete,
    error: errorDelete,
    errorMsg: errorMsgDelete,
    fetchData: fetchDataDelete,
  } = useApi({
    service: apiParamsDelete.service,
    method: apiParamsDelete.method,
    dataToSend: apiParamsDelete.dataToSend,
  });

  useEffect(() => {
    showLoadingMessage(loadingDelete);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingDelete]);

  useEffect(() => {
    if (apiParamsDelete.service) fetchDataDelete();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiParamsDelete]);

  useEffect(() => {
    if (responseDataDelete) {
      showNotification("success", t("offerDeletedSuccessfully"));
      handleCloseModal();
      props.onDeleteSuccess();
    } else if (errorDelete) {
      showNotification("error", errorMsgDelete);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseDataDelete, errorDelete]);

  /** Texto a mostrar */

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
          `${t("itHad")} (${props.requirement?.numberOffers}) ${t(
            "offers"
          ).toLowerCase()}`
        );
        break;
      case CantOfferMotives.MAIN_ACCOUNT_MADE_OFFER:
        setMainText(t("companyHasAlreadyMadeAnOffer"));
        setOptionalText("");
        break;
      case CantOfferMotives.OTHER_USER_IN_COMPANY_MADE_OFFER:
        setMainText(t("otherEmployeeHasAlreadyMadeAnOffer"));
        setOptionalText("");
        break;
      case CantOfferMotives.SUBUSER_MADE_OFFER:
        setMainText(t("aSubUserHasAlreadyMadeAnOffer"));
        setOptionalText("");
        break;
      case CantOfferMotives.SUBUSER_IS_CREATOR:
        setMainText(
          t(
            props.requirement?.type == RequirementType.SALE
              ? "saleBelongsToSubUser"
              : "requirementBelongsToSubUser"
          )
        );
        setOptionalText(
          `${t("itHad")} (${props.requirement?.numberOffers}) ${t(
            "offers"
          ).toLowerCase()}`
        );
        break;
      case CantOfferMotives.ONLY_PREMIUM:
        setMainText(t("onlyPremiumUserCanMakeAnOffer"));
        setOptionalText("");
        break;
      case CantOfferMotives.ONLY_CERTIFIED:
        setMainText(t("onlyCertifiedCompaniesCanMakeAnOffer"));
        switch (props.isCertified) {
          case CertificationState.PENDING:
            setOptionalText(t("pendingCertificationMsg"));
            break;
          case CertificationState.REJECTED:
            setOptionalText(t("rejectedCertificationMsg"));
            break;
          default:
            setOptionalText("");
        }
        break;
      case CantOfferMotives.NO_ALLOWED_ROLE:
        setMainText(t("noPermissionToMakeOffer"));
        setOptionalText("");
        break;
      case CantOfferMotives.OTHER_USER_IN_COMPANY_IS_CREATOR:
        setMainText(
          t(
            props.requirement?.type == RequirementType.SALE
              ? "saleBelongsToEmployee"
              : "requirementBelongsToEmployee"
          )
        );
        setOptionalText("");
        break;
      case CantOfferMotives.MAIN_ACCOUNT_IS_CREATOR:
        setMainText(
          t(
            props.requirement?.type == RequirementType.SALE
              ? "saleBelongsToCompany"
              : "requirementBelongsToCompany"
          )
        );
        setOptionalText("");
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.motive]);

  function handleCloseModal() {
    setIsOpenModal(false);
  }

  function deleteOffer() {
    setDataModal({
      type: ModalTypes.CONFIRM,
      data: {
        loading: loadingDelete,
        onAnswer: (ok: boolean) => {
          if (!ok) return;
          setApiParamsDelete({
            service: props.requirement
              ? getDeleteOfferService(props.requirement.type)?.(props.offerId)
              : null,
            method: "get",
          });
        },
        text: t("deleteOfferConfirmation"),
        id: props.offerId,
      },
      action: Action.DELETE,
    });
    setIsOpenModal(true);
  }

  function openGetCertifiedModal() {
    if (props.requirement)
      setDataModal({
        type: ModalTypes.SELECT_DOCS_CERT,
        data: {
          onRequestSent: () => props.setIsCertified(CertificationState.PENDING),
          data: {
            userId: props.requirement.user.uid,
            userName: props.requirement.user.name,
          },
        },
        action: Action.SELECT_CERT_TO_SEND,
      });
    setIsOpenModal(true);
  }

  function seeRequirementDetails() {
    if (props.requirement) {
      if (props.motive == CantOfferMotives.IS_CREATOR) {
        updateDetailedRequirementModalData({
          requirement: props.requirement,
          requirementId: props.requirement.key,
          requirementType: props.requirement.type,
          actionIsFinish: false,
        });
        navigate(
          pageRoutes.myRequirements +
            "/" +
            (props.requirement.type == RequirementType.GOOD
              ? pageSubRoutes.goods
              : props.requirement.type == RequirementType.SERVICE
              ? pageSubRoutes.services
              : pageSubRoutes.sales)
        );
      } else if (props.motive == CantOfferMotives.SUBUSER_IS_CREATOR) {
        navigate(pageRoutes.users);
      }
    }
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
      <div className="t-flex gap-15 f-column form-oferta">
        <div className="t-flex f-column j-conten j-items oferta-check gap-10">
          {props.loading ? (
            <SimpleLoading style={{ width: "15vw" }} />
          ) : (
            <>
              <i className="fa-regular fa-circle-exclamation fa-3x"></i>
              <div className="aviso-h">
                <div className="cantidad-estd">{mainText}</div>
                {optionalText && (
                  <div className="detalles-estd">{optionalText}</div>
                )}
              </div>
              {props.motive == CantOfferMotives.ALREADY_MADE_OFFER && (
                <ButtonContainer
                  style={{ height: "auto" }}
                  className="btn btn-default btn-sm"
                  icon={<i className="fa-regular fa-trash"></i>}
                  onClick={deleteOffer}
                  loading={loadingDelete}
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
                props.motive == CantOfferMotives.SUBUSER_IS_CREATOR) && (
                <ButtonContainer
                  style={{ height: "auto" }}
                  className="btn btn-default btn-sm"
                  icon={<i className="fa-regular fa-columns"></i>}
                  onClick={() => seeRequirementDetails()}
                >
                  {t("goTo") + t("controlPanel")}
                </ButtonContainer>
              )}
              {props.motive == CantOfferMotives.SUBUSER_MADE_OFFER && (
                <ButtonContainer
                  style={{ height: "auto" }}
                  className="btn btn-default btn-sm"
                  icon={<i className="fa-regular fa-columns"></i>}
                  onClick={() => navigate(pageRoutes.users)}
                >
                  {t("goTo") + t("controlPanel")}
                </ButtonContainer>
              )}
              {props.motive == CantOfferMotives.ONLY_CERTIFIED &&
                entityType == EntityType.COMPANY &&
                props.isPremium &&
                props.isCertified == CertificationState.NONE && (
                  <ButtonContainer
                    style={{ height: "auto" }}
                    className="btn btn-green btn-sm"
                    icon={<i className="fa-regular fa-star"></i>}
                    onClick={openGetCertifiedModal}
                  >
                    {t("getCertified")}
                  </ButtonContainer>
                )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
