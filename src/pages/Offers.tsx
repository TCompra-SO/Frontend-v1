import { useTranslation } from "react-i18next";
import { Offer } from "../models/MainInterfaces";
import {
  Action,
  EntityType,
  ModalTypes,
  OnChangePageAndPageSizeTypeParams,
  TableTypes,
} from "../utilities/types";
import ModalContainer from "../components/containers/ModalContainer";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import {
  ModalContent,
  TableTypeOffer,
  useApiParams,
} from "../models/Interfaces";
import TablePageContent from "../components/section/table-page/TablePageContent";
import {
  mainModalScrollStyle,
  pageSizeOptionsSt,
  tableSearchAfterMseconds,
} from "../utilities/globals";
import {
  getLabelFromRequirementType,
  getRouteType,
} from "../utilities/globalFunctions";
import { useLocation } from "react-router-dom";
import {
  deleteOfferService,
  getOffersBySubUserService,
} from "../services/requests/offerService";
import useApi from "../hooks/useApi";
import { useSelector } from "react-redux";
import { MainState } from "../models/Redux";
import { transformToOfferFromGetOffersByEntityOrSubUser } from "../utilities/transform";
import { ModalsContext } from "../contexts/ModalsContext";
import { useCulminate, useShowDetailOffer } from "../hooks/requirementHook";
import useShowNotification, { useShowLoadingMessage } from "../hooks/utilHook";
import useSearchTable from "../hooks/useSearchTable";
import { debounce } from "lodash";

export default function Offers() {
  const { t } = useTranslation();
  const location = useLocation();
  const dataUser = useSelector((state: MainState) => state.user);
  const mainDataUser = useSelector((state: MainState) => state.mainUser);
  const { detailedOfferModalData } = useContext(ModalsContext);
  const { showNotification } = useShowNotification();
  const { showLoadingMessage } = useShowLoadingMessage();
  const { getOfferDetail, modalDataOfferDetail } = useShowDetailOffer();
  const { getBasicRateData, modalDataRate } = useCulminate();
  const { searchTable, responseData, error, errorMsg, loading } =
    useSearchTable(dataUser.uid, TableTypes.OFFER, EntityType.SUBUSER);
  const [type, setType] = useState(getRouteType(location.pathname));
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [dataModal, setDataModal] = useState<ModalContent>({
    type: ModalTypes.NONE,
    data: {},
    action: Action.NONE,
  });
  const [tableContent, setTableContent] = useState<TableTypeOffer>({
    type: TableTypes.OFFER,
    data: [],
    subType: type,
    hiddenColumns: [],
    nameColumnHeader: t("offers"),
    onButtonClick: handleOnButtonClick,
    total: 0,
  });

  /** Verificar si hay una solicitud pendiente */

  useEffect(() => {
    if (detailedOfferModalData.offerId) {
      getOfferDetail(
        detailedOfferModalData.offerId,
        detailedOfferModalData.offerType,
        true,
        Action.OFFER_DETAIL,
        detailedOfferModalData.offer
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (modalDataOfferDetail.type !== ModalTypes.NONE) {
      setDataModal(modalDataOfferDetail);
      setIsOpenModal(true);
    }
  }, [modalDataOfferDetail]);

  /** Para mostrar modales */

  useEffect(() => {
    if (modalDataRate.type !== ModalTypes.NONE) {
      setDataModal(modalDataRate);
      setIsOpenModal(true);
    }
  }, [modalDataRate]);

  /** Cargar datos iniciales */

  useEffect(() => {
    searchTable(1, pageSizeOptionsSt[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (responseData) {
      setData();
    } else if (error) {
      setTableContent({
        type: TableTypes.OFFER,
        data: [],
        subType: type,
        hiddenColumns: [],
        nameColumnHeader: t("offers"),
        onButtonClick: handleOnButtonClick,
        total: 0,
      });
      showNotification("error", errorMsg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData, error]);

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
    } else if (errorDelete) {
      showNotification("error", errorMsgDelete);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseDataDelete, errorDelete]);

  /* Obtener tipo y mostrar datos */

  useEffect(() => {
    setType(getRouteType(location.pathname));
  }, [location]);

  useEffect(() => {
    setTableContent((prev) => {
      return {
        ...prev,
        //total: 80, // r3v
        subType: type,
      };
    });
  }, [type]);

  /** Funciones */

  async function setData() {
    try {
      const data = responseData.data.map((e: any) =>
        transformToOfferFromGetOffersByEntityOrSubUser(
          e,
          type,
          dataUser,
          mainDataUser
        )
      );

      setTableContent({
        type: TableTypes.OFFER,
        data: data,
        subType: type,
        hiddenColumns: [],
        nameColumnHeader: t("offers"),
        onButtonClick: handleOnButtonClick,
        total: responseData.res?.totalDocuments,
      });
    } catch (error) {
      console.log(error);
      showNotification("error", t("errorOccurred"));
    }
  }

  function handleCloseModal() {
    setIsOpenModal(false);
  }

  function deleteOffer(offerId: string) {
    setApiParamsDelete({
      service: deleteOfferService(offerId),
      method: "get",
    });
  }

  function goToChat(offer: Offer) {
    console.log("goToChat", offer.key, offer.requirementId);
  }

  function handleOnButtonClick(action: Action, offer: Offer) {
    console.log(offer);
    switch (action) {
      case Action.OFFER_DETAIL:
        getOfferDetail(offer.key, offer.type, true, action, offer);
        break;

      case Action.DELETE: {
        setDataModal({
          type: ModalTypes.CONFIRM,
          data: {
            loading: loadingDelete,
            onAnswer: (ok: boolean) => {
              if (!ok) return;
              deleteOffer(offer.key);
            },
            text: t("deleteOfferConfirmation"),
            id: offer.key,
          },
          action,
        });
        setIsOpenModal(true);
        break;
      }

      case Action.CHAT: {
        goToChat(offer); //r3v
        break;
      }

      case Action.RATE_CANCELED: {
        getBasicRateData(
          offer.key,
          offer.key,
          offer.requirementId,
          false,
          false,
          action,
          offer.type
        );
        break;
      }

      case Action.CANCEL_OFFER: {
        setDataModal({
          type: ModalTypes.CANCEL_PURCHASE_ORDER,
          data: {
            offerId: offer.key,
            requirementId: offer.requirementId,
            fromRequirementTable: false,
            canceledByCreator: true,
            rowId: offer.key,
          },
          action,
        });
        setIsOpenModal(true);
        break;
      }

      case Action.FINISH: {
        getBasicRateData(
          offer.key,
          offer.key,
          offer.requirementId,
          false,
          false,
          action,
          offer.type
        );
        break;
      }
    }
  }

  const handleSearch = debounce((e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    // setCurrentPage(1);
    searchTable(1, pageSizeOptionsSt[0], e.target.value);
  }, tableSearchAfterMseconds);

  function handleChangePageAndPageSize({
    page,
    pageSize,
  }: OnChangePageAndPageSizeTypeParams) {
    searchTable(page, pageSize, searchValue);
  }

  return (
    <>
      <ModalContainer
        destroyOnClose
        content={dataModal}
        isOpen={isOpenModal}
        onClose={handleCloseModal}
        style={mainModalScrollStyle}
        loadingConfirm={loadingDelete}
      />
      <TablePageContent
        title={t("myOffers")}
        titleIcon={<i className="fa-regular fa-dolly c-default"></i>}
        subtitle={`${t("listOf")} ${t(getLabelFromRequirementType(type))}`}
        subtitleIcon={<i className="fa-light fa-person-dolly sub-icon"></i>}
        table={tableContent}
        onSearch={handleSearch}
        loading={loading}
        onChangePageAndPageSize={handleChangePageAndPageSize}
      />
    </>
  );
}
