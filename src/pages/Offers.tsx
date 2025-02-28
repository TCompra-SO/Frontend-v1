import { useTranslation } from "react-i18next";
import { Offer } from "../models/MainInterfaces";
import {
  Action,
  EntityType,
  ModalTypes,
  OfferState,
  RequirementType,
  TableTypes,
} from "../utilities/types";
import ModalContainer from "../components/containers/ModalContainer";
import { useContext, useEffect, useRef, useState } from "react";
import {
  ModalContent,
  SocketDataPackType,
  TableTypeOffer,
  useApiParams,
} from "../models/Interfaces";
import TablePageContent, {
  TablePageContentRef,
} from "../components/section/table-page/TablePageContent";
import {
  fieldNameSearchRequestOffer,
  mainModalScrollStyle,
} from "../utilities/globals";
import {
  getDeleteOfferService,
  getInitialModalData,
  getLabelFromRequirementType,
  getRouteType,
} from "../utilities/globalFunctions";
import { useLocation } from "react-router-dom";
import useApi from "../hooks/useApi";
import { useSelector } from "react-redux";
import { MainState } from "../models/Redux";
import { transformToOfferFromGetOffersByEntityOrSubUser } from "../utilities/transform";
import { ModalsContext } from "../contexts/ModalsContext";
import { useCulminate, useShowDetailOffer } from "../hooks/requirementHooks";
import useShowNotification, { useShowLoadingMessage } from "../hooks/utilHooks";
import useSearchTable, {
  useFilterSortPaginationForTable,
} from "../hooks/searchTableHooks";
import useSocketQueueHook, {
  useAddOrUpdateRow,
} from "../hooks/socketQueueHook";
import useSocket from "../socket/useSocket";

export default function Offers() {
  const { t } = useTranslation();
  const location = useLocation();
  const dataUser = useSelector((state: MainState) => state.user);
  const mainDataUser = useSelector((state: MainState) => state.mainUser);
  const searchValueRef = useRef<TablePageContentRef>(null);
  const { detailedOfferModalData, resetDetailedOfferModalData } =
    useContext(ModalsContext);
  const { showNotification } = useShowNotification();
  const { showLoadingMessage } = useShowLoadingMessage();
  const { getOfferDetail, modalDataOfferDetail } = useShowDetailOffer();
  const { getBasicRateData, modalDataRate } = useCulminate();
  const [type, setType] = useState(getRouteType(location.pathname));
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [offerList, setOfferList] = useState<Offer[]>([]);
  const [total, setTotal] = useState(0);
  const [dataModal, setDataModal] = useState<ModalContent>(
    getInitialModalData()
  );
  const {
    currentPage,
    currentPageSize,
    setCurrentPage,
    handleChangePageAndPageSize,
    handleSearch,
    fieldSort,
    filteredInfo,
    reset,
  } = useFilterSortPaginationForTable();
  const [tableContent, setTableContent] = useState<TableTypeOffer>({
    type: TableTypes.OFFER,
    data: offerList,
    subType: type,
    hiddenColumns: [],
    nameColumnHeader: t("offers"),
    onButtonClick: handleOnButtonClick,
    total,
    page: currentPage,
    pageSize: currentPageSize,
    fieldSort,
    filteredInfo,
  });
  const { addNewRow, updateRow } = useAddOrUpdateRow(
    TableTypes.OFFER,
    (data: SocketDataPackType) =>
      transformToOfferFromGetOffersByEntityOrSubUser(
        data,
        type,
        dataUser,
        mainDataUser
      ),
    offerList,
    setOfferList,
    total,
    setTotal,
    currentPageSize
  );
  const { updateChangesQueue, resetChangesQueue } = useSocketQueueHook(
    addNewRow,
    updateRow
  );
  const { searchTable, responseData, error, errorMsg, loading, apiParams } =
    useSearchTable(
      dataUser.uid,
      TableTypes.OFFER,
      EntityType.SUBUSER,
      type,
      resetChangesQueue
    );
  useSocket(
    TableTypes.OFFER,
    type,
    currentPage,
    apiParams.dataToSend,
    updateChangesQueue
  );

  /** Actualiza el contenido de tabla */

  useEffect(() => {
    setTableContent((prev) => ({
      ...prev,
      data: offerList,
      total,
      page: currentPage,
      pageSize: currentPageSize,
      fieldSort,
      filteredInfo,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offerList]);

  /** Cargar datos iniciales */

  useEffect(() => {
    clearSearchValue();
    reset();
    searchTable({ page: 1, pageSize: currentPageSize });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  useEffect(() => {
    if (responseData) {
      setData();
    } else if (error) {
      setCurrentPage(1);
      setTotal(0);
      setOfferList([]);
      showNotification("error", errorMsg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData, error]);

  /** Verificar si hay una solicitud pendiente */

  useEffect(() => {
    if (detailedOfferModalData.offerId) {
      const copy = { ...detailedOfferModalData };
      getOfferDetail(
        copy.offerId,
        copy.offerType,
        true,
        Action.OFFER_DETAIL,
        true,
        copy.offer
      );
      resetDetailedOfferModalData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detailedOfferModalData]);

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

  /** Funciones */

  function clearSearchValue() {
    if (searchValueRef.current) {
      searchValueRef.current.resetSearchValue();
    }
  }

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
      setTotal(responseData.res?.totalDocuments);
      setOfferList(data);
    } catch (error) {
      console.log(error);
      showNotification("error", t("errorOccurred"));
    }
  }

  function handleCloseModal() {
    setIsOpenModal(false);
  }

  function deleteOffer(offerId: string, type: RequirementType) {
    setApiParamsDelete({
      service: getDeleteOfferService(type)?.(offerId),
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
        getOfferDetail(
          offer.key,
          offer.type,
          true,
          action,
          offer.state != OfferState.ELIMINATED,
          offer
        );
        break;
      case Action.DELETE: {
        setDataModal({
          type: ModalTypes.CONFIRM,
          data: {
            loading: loadingDelete,
            onAnswer: (ok: boolean) => {
              if (!ok) return;
              deleteOffer(offer.key, offer.type);
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
        console.log("======>", offer.key);
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
            type: offer.type,
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
        subtitle={`${t("listOf")} ${t("offers")} - ${t(
          getLabelFromRequirementType(type)
        )}`}
        subtitleIcon={<i className="fa-light fa-person-dolly sub-icon"></i>}
        table={tableContent}
        onSearch={(e) => handleSearch(e, searchTable)}
        loading={loading}
        onChangePageAndPageSize={(params) =>
          handleChangePageAndPageSize(
            params,
            fieldNameSearchRequestOffer,
            searchTable
          )
        }
        ref={searchValueRef}
      />
    </>
  );
}
