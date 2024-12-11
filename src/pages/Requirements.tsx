import ModalContainer from "../components/containers/ModalContainer";
import {
  Action,
  ModalTypes,
  RequirementState,
  TableColumns,
  RequirementType,
  TableTypes,
} from "../utilities/types";
import { Requirement } from "../models/MainInterfaces";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import {
  ModalContent,
  TableTypeRequirement,
  useApiParams,
} from "../models/Interfaces";
import { useTranslation } from "react-i18next";
import TablePageContent from "../components/section/table-page/TablePageContent";
import { mainModalScrollStyle } from "../utilities/globals";
import useApi from "../hooks/useApi";
import {
  deleteRequirementService,
  getRequirementsBySubUserService,
} from "../services/requests/requirementService";
import {
  transformDataToRequirement,
  transformToBasicRateData,
} from "../utilities/transform";
import { useLocation } from "react-router-dom";
import {
  equalServices,
  getLabelFromRequirementType,
  getRouteType,
} from "../utilities/globalFunctions";
import { useSelector } from "react-redux";
import { MainState } from "../models/Redux";
import { getFullUser, getOfferById } from "../services/complete/general";
import showNotification, {
  showLoadingMessage,
} from "../utilities/notification/showNotification";
import { App } from "antd";
import { getBasicRateDataOfferService } from "../services/requests/offerService";
import {
  useCancelRequirement,
  useGetOffersByRequirementId,
} from "../hooks/requirementHook";
import { ModalsContext } from "../contexts/ModalsContext";

export default function Requirements() {
  const { t } = useTranslation();
  const { notification, message } = App.useApp();
  const location = useLocation();
  const { detailedRequirementModalData } = useContext(ModalsContext);
  const [type, setType] = useState(getRouteType(location.pathname));
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [requirement, setRequirement] = useState<Requirement | null>(null);
  const dataUser = useSelector((state: MainState) => state.user);
  const mainDataUser = useSelector((state: MainState) => state.mainUser);
  const { getOffersByRequirementId, modalDataOffersByRequirementId } =
    useGetOffersByRequirementId();
  const { cancelRequirement } = useCancelRequirement();

  const [dataModal, setDataModal] = useState<ModalContent>({
    type: ModalTypes.NONE,
    data: {},
  });
  const [tableContent, setTableContent] = useState<TableTypeRequirement>({
    type: TableTypes.REQUIREMENT,
    data: [],
    subType: type,
    hiddenColumns: [TableColumns.CATEGORY],
    nameColumnHeader: t(getLabelFromRequirementType(type)),
    onButtonClick: handleOnButtonClick,
  });

  /** Verificar si hay una solicitud pendiente */

  useEffect(() => {
    if (detailedRequirementModalData.requirementId) {
      getOffersByRequirementId(
        detailedRequirementModalData.requirementId,
        detailedRequirementModalData.requirementType,
        false,
        detailedRequirementModalData.requirement
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (modalDataOffersByRequirementId.type !== ModalTypes.NONE) {
      setDataModal(modalDataOffersByRequirementId);
      setIsOpenModal(true);
    }
  }, [modalDataOffersByRequirementId]);

  /* Obtener lista inicialmente */

  const [apiParams] = useState<useApiParams>({
    service: getRequirementsBySubUserService(dataUser.uid),
    method: "get",
  });

  const { loading, responseData, error, errorMsg, fetchData } = useApi({
    service: apiParams.service,
    method: apiParams.method,
    dataToSend: apiParams.dataToSend,
  });

  useEffect(() => {
    setType(getRouteType(location.pathname));
  }, [location]);

  useEffect(() => {
    setTableContent((prev) => {
      return {
        ...prev,
        subType: type,
        nameColumnHeader: t(getLabelFromRequirementType(type)),
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  useEffect(() => {
    if (apiParams.service) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiParams]);

  useEffect(() => {
    if (responseData) {
      if (equalServices(apiParams.service, getRequirementsBySubUserService("")))
        setTableData();
    } else if (error) {
      if (equalServices(apiParams.service, getRequirementsBySubUserService("")))
        showNotification(notification, "error", errorMsg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData, error]);

  /* Obtener datos para culminar */

  const [apiParamsRate, setApiParamsRate] = useState<useApiParams>({
    service: null,
    method: "get",
  });

  const {
    loading: loadingRate,
    responseData: responseDataRate,
    error: errorRate,
    errorMsg: errorMsgRate,
    fetchData: fetchDataRate,
  } = useApi({
    service: apiParamsRate.service,
    method: apiParamsRate.method,
    dataToSend: apiParamsRate.dataToSend,
  });

  useEffect(() => {
    showLoadingMessage(message, loadingRate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingRate]);

  useEffect(() => {
    if (apiParamsRate.service) fetchDataRate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiParamsRate]);

  useEffect(() => {
    if (responseDataRate) {
      openRateModal(responseDataRate);
    } else if (errorRate) {
      showNotification(notification, "error", errorMsgRate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseDataRate, errorRate]);

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
    showLoadingMessage(message, loadingDelete);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingDelete]);

  useEffect(() => {
    if (apiParamsDelete.service) fetchDataDelete();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiParamsDelete]);

  useEffect(() => {
    if (responseDataDelete) {
      showNotification(
        notification,
        "success",
        t(
          type == RequirementType.SALE
            ? "saleDeletedSuccessfully"
            : "requirementDeletedSuccessfully"
        )
      );
      handleCloseModal();
    } else if (errorDelete) {
      showNotification(notification, "error", errorMsgDelete);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseDataDelete, errorDelete]);

  /** Funciones */

  async function setTableData() {
    try {
      const data = responseData.data.map((e: any) =>
        transformDataToRequirement(
          e,
          RequirementType.GOOD,
          dataUser,
          mainDataUser
        )
      );
      setTableContent({
        type: TableTypes.REQUIREMENT,
        data,
        subType: RequirementType.GOOD,
        hiddenColumns: [TableColumns.CATEGORY],
        nameColumnHeader: t("goods"),
        onButtonClick: handleOnButtonClick,
      });
    } catch (error) {
      showNotification(notification, "error", t("errorOccurred"));
    }
  }

  function openRateModal(responseData: any) {
    const data = transformToBasicRateData(responseData.data[0]);
    if (requirement) {
      setDataModal({
        type: ModalTypes.RATE_USER,
        data: {
          basicRateData: data,
          type: requirement.type,
          isOffer: true,
          requirementOrOfferId: requirement.key,
        },
      });
      setIsOpenModal(true);
    }
  }

  async function handleOnButtonClick(action: Action, requirement: Requirement) {
    console.log(requirement);
    setRequirement(requirement);

    switch (action) {
      case Action.SHOW_OFFERS: {
        getOffersByRequirementId(
          requirement.key,
          requirement.type,
          false,
          requirement
        );
        break;
      }
      case Action.SHOW_SUMMARY: {
        if (requirement.offerUserId && requirement.offerId) {
          showLoadingMessage(message, true);
          const { user } = await getFullUser(requirement.offerUserId);
          if (user) {
            const { offer } = await getOfferById(
              requirement.offerId,
              type,
              user
            );
            if (offer) {
              setDataModal({
                type: ModalTypes.OFFER_SUMMARY,
                data: { offer, requirement: requirement, user },
              });
              setIsOpenModal(true);
            } else {
              showNotification(notification, "error", t("errorOccurred"));
            }
          } else {
            showNotification(notification, "error", t("errorOccurred"));
          }
          showLoadingMessage(message, false);
        }
        break;
      }
      case Action.REPUBLISH: {
        setDataModal({
          type: ModalTypes.REPUBLISH_REQUIREMENT,
          data: { requirementId: requirement.key, type: requirement.type },
        });
        setIsOpenModal(true);
        break;
      }
      case Action.FINISH: {
        if (requirement.offerId)
          setApiParamsRate({
            service: getBasicRateDataOfferService(requirement.offerId),
            method: "get",
          });
        break;
      }
      case Action.DELETE: {
        setDataModal({
          type: ModalTypes.CONFIRM,
          data: {
            loading: loadingDelete,
            onAnswer: (ok: boolean) => {
              if (!ok) return;
              deleteRequirement(requirement.key);
            },
            text: t("deleteRequirementConfirmation"),
          },
        });
        setIsOpenModal(true);
        break;
      }
      case Action.CANCEL_REQUIREMENT: {
        if (
          requirement.state == RequirementState.SELECTED &&
          requirement.offerId
        ) {
          setDataModal({
            type: ModalTypes.CANCEL_PURCHASE_ORDER,
            data: {
              offerId: requirement.offerId,
              requirementId: requirement.key,
              fromRequirementTable: true,
              canceledByCreator: false,
            },
          });
          setIsOpenModal(true);
        } else if (requirement.state == RequirementState.PUBLISHED)
          cancelRequirement(requirement.key);
        break;
      }
    }
  }

  function deleteRequirement(requirementId: string) {
    setApiParamsDelete({
      service: deleteRequirementService(requirementId),
      method: "get",
    });
  }

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    console.log(e.target.value);
  }

  function handleCloseModal() {
    setIsOpenModal(false);
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
      <TablePageContent
        title={t("myRequirements")}
        titleIcon={<i className="fa-regular fa-dolly c-default"></i>}
        subtitle={`${t("listOf")} ${t(getLabelFromRequirementType(type))}`}
        subtitleIcon={<i className="fa-light fa-person-dolly sub-icon"></i>}
        table={tableContent}
        onSearch={handleSearch}
        loading={
          equalServices(apiParams.service, getRequirementsBySubUserService(""))
            ? loading
            : undefined
        }
      />
    </>
  );
}
