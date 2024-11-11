import { useTranslation } from "react-i18next";
import { Offer } from "../models/MainInterfaces";
import { Action, ModalTypes, TableTypes } from "../utilities/types";
import ModalContainer from "../components/containers/ModalContainer";
import { ChangeEvent, useEffect, useState } from "react";
import {
  ModalContent,
  TableTypeOffer,
  useApiParams,
} from "../models/Interfaces";
import TablePageContent from "../components/section/table-page/TablePageContent";
import { mainModalScrollStyle } from "../utilities/globals";
import {
  equalServices,
  getLabelFromRequirementType,
  getRouteType,
} from "../utilities/globalFunctions";
import { useLocation } from "react-router-dom";
import { getOffersService } from "../services/requests/offerService";
import useApi from "../hooks/useApi";
import { useSelector } from "react-redux";
import { MainState } from "../models/Redux";
import {
  transformToBasicRateData,
  transformToOffer,
} from "../utilities/transform";
import showNotification, {
  showLoadingMessage,
} from "../utilities/notification/showNotification";
import { App } from "antd";
import { getBasicRateDataReqService } from "../services/requests/requirementService";

export default function Offers() {
  const { t } = useTranslation();
  const location = useLocation();
  const { notification, message } = App.useApp();
  const dataUser = useSelector((state: MainState) => state.user);
  const mainDataUser = useSelector((state: MainState) => state.mainUser);
  const [type, setType] = useState(getRouteType(location.pathname));
  const [currentAction, setCurrentAction] = useState<Action>(Action.CANCEL);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const [dataModal, setDataModal] = useState<ModalContent>({
    type: ModalTypes.NONE,
    data: {},
  });
  const [tableContent, setTableContent] = useState<TableTypeOffer>({
    type: TableTypes.OFFER,
    data: [], //offerList,
    subType: type,
    hiddenColumns: [],
    nameColumnHeader: t("offers"),
    onButtonClick: handleOnButtonClick,
  });

  const [apiParams, setApiParams] = useState<useApiParams>({
    service: getOffersService(),
    method: "get",
  });

  const { loading, responseData, error, errorMsg, fetchData } = useApi({
    service: apiParams.service,
    method: apiParams.method,
    dataToSend: apiParams.dataToSend,
  });

  useEffect(() => {
    if (apiParams.service) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiParams]);

  useEffect(() => {
    if (responseData) {
      if (equalServices(apiParams.service, getOffersService())) setData();
    } else if (error) {
      if (equalServices(apiParams.service, getOffersService()))
        showNotification(notification, "error", errorMsg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData, error]);

  useEffect(() => {
    setType(getRouteType(location.pathname));
  }, [location]);

  useEffect(() => {
    setTableContent((prev) => {
      return {
        ...prev,
        subType: type,
      };
    });
  }, [type]);

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

  async function setData() {
    if (responseData) {
      const data = responseData.data.map((e: any) =>
        dataUser.uid == mainDataUser.uid
          ? transformToOffer(e, type, dataUser)
          : transformToOffer(e, type, dataUser, mainDataUser)
      );

      setTableContent({
        type: TableTypes.OFFER,
        data: data,
        subType: type,
        hiddenColumns: [],
        nameColumnHeader: t("offers"),
        onButtonClick: handleOnButtonClick,
      });
    } else if (error) {
      console.log(error);
    }
  }

  function handleCloseModal() {
    setIsOpenModal(false);
  }

  function deleteOffer(offerId: string) {
    console.log("deleteOffer", offerId);
  }

  function goToChat(offer: Offer) {
    console.log("goToChat", offer.key, offer.requirementId);
  }

  function openRateModal(responseData: any) {
    const data = transformToBasicRateData(responseData.data[0]);
    setDataModal({
      type:
        currentAction == Action.FINISH
          ? ModalTypes.RATE_USER
          : ModalTypes.RATE_CANCELED,
      data: {
        basicRateData: data,
        type,
        isOffer: false,
      },
    });
    setIsOpenModal(true);
  }

  function handleOnButtonClick(action: Action, offer: Offer) {
    setCurrentAction(action);
    switch (action) {
      case Action.OFFER_DETAIL:
        setDataModal({
          type: ModalTypes.OFFER_DETAIL,
          data: {
            offer,
          },
        });
        setIsOpenModal(true);
        break;

      case Action.DELETE: {
        // r3v
        setDataModal({
          type: ModalTypes.CONFIRM,
          data: {
            onAnswer: (ok: boolean) => {
              if (!ok) return;
              deleteOffer(offer.key);
            },
            text: t("deleteOfferConfirmation"),
          },
        });
        setIsOpenModal(true);
        break;
      }

      case Action.CHAT: {
        goToChat(offer);
        break;
      }

      case Action.RATE_CANCELED: {
        setApiParamsRate({
          service: getBasicRateDataReqService(offer.requirementId),
          method: "get",
        });
        break;
      }

      case Action.CANCEL_OFFER: {
        // r3v
        setDataModal({
          type: ModalTypes.CANCEL_PURCHASE_ORDER,
          data: {
            offerId: offer.key,
            requirementId: offer.requirementId,
            fromRequirementTable: false,
          },
        });
        setIsOpenModal(true);
        break;
      }

      case Action.FINISH: {
        setApiParamsRate({
          service: getBasicRateDataReqService(offer.requirementId),
          method: "get",
        });
        break;
      }
    }
  }

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    console.log(e.target.value);
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
        title={t("myOffers")}
        titleIcon={<i className="fa-regular fa-dolly c-default"></i>}
        subtitle={`${t("listOf")} ${t(getLabelFromRequirementType(type))}`}
        subtitleIcon={<i className="fa-light fa-person-dolly sub-icon"></i>}
        table={tableContent}
        onSearch={handleSearch}
        loading={
          equalServices(apiParams.service, getOffersService())
            ? loading
            : undefined
        }
      />
    </>
  );
}
