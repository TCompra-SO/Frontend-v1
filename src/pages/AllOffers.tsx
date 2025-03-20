import { useTranslation } from "react-i18next";
import TablePageContent, {
  TablePageContentRef,
} from "../components/section/table-page/TablePageContent";
import { useEffect, useRef, useState } from "react";
import {
  ModalContent,
  SocketDataPackType,
  TableTypeAllOffers,
} from "../models/Interfaces";
import { Action, ModalTypes, OfferState, TableTypes } from "../utilities/types";
import { BaseUser, Offer } from "../models/MainInterfaces";
import makeRequest, {
  getLabelFromRequirementType,
  getRouteType,
} from "../utilities/globalFunctions";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { MainState } from "../models/Redux";
import {
  transformToBaseUser,
  transformToOfferFromGetOffersByEntityOrSubUser,
} from "../utilities/transform";
import { getBaseDataUserService } from "../services/requests/authService";
import {
  fieldNameSearchRequestOffer,
  mainModalScrollStyle,
} from "../utilities/globals";
import { useShowDetailOffer } from "../hooks/requirementHooks";
import ModalContainer from "../components/containers/ModalContainer";
import useShowNotification from "../hooks/utilHooks";
import useSearchTable, {
  useFilterSortPaginationForTable,
} from "../hooks/searchTableHooks";
import useSocketQueueHook, { useActionsForRow } from "../hooks/socketQueueHook";
import useSocket from "../socket/useSocket";

export default function AllOffers() {
  const { t } = useTranslation();
  const location = useLocation();
  const mainDataUser = useSelector((state: MainState) => state.mainUser);
  const dataUser = useSelector((state: MainState) => state.user);
  const searchValueRef = useRef<TablePageContentRef>(null);
  const { getOfferDetail, modalDataOfferDetail } = useShowDetailOffer();
  const { showNotification } = useShowNotification();
  const [type, setType] = useState(getRouteType(location.pathname));
  const {
    currentPage,
    currentPageSize,
    setCurrentPage,
    fieldSort,
    filteredInfo,
    handleChangePageAndPageSize,
    handleSearch,
    reset,
  } = useFilterSortPaginationForTable();
  const [offerList, setOfferList] = useState<Offer[]>([]);
  const [total, setTotal] = useState(0);
  const [loadingTable, setLoadingTable] = useState(true);
  const [subUsersCache, setSubUsersCache] = useState<{
    [key: string]: BaseUser;
  }>({});
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [dataModal, setDataModal] = useState<ModalContent>({
    type: ModalTypes.NONE,
    data: {},
    action: Action.NONE,
  });
  const [tableContent, setTableContent] = useState<TableTypeAllOffers>({
    type: TableTypes.ALL_OFFERS,
    data: offerList,
    hiddenColumns: [],
    nameColumnHeader: t("offers"),
    onButtonClick: handleOnButtonClick,
    total,
    page: currentPage,
    pageSize: currentPageSize,
    fieldSort,
    filteredInfo,
  });
  const { addNewRow, updateRow } = useActionsForRow(
    TableTypes.ALL_OFFERS,
    (data: SocketDataPackType) => {
      // console.log(subUsersCache, data.subUser);
      if (data.subUser == dataUser.uid)
        return transformToOfferFromGetOffersByEntityOrSubUser(
          data,
          type,
          dataUser,
          mainDataUser
        );
      else
        return transformToOfferFromGetOffersByEntityOrSubUser(
          data,
          type,
          subUsersCache[data.subUser],
          dataUser
        );
    },
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
  const { searchTable, responseData, error, errorMsg, apiParams } =
    useSearchTable(
      dataUser.uid,
      TableTypes.ALL_OFFERS,
      dataUser.typeEntity,
      type,
      resetChangesQueue
    );
  useSocket(
    TableTypes.ALL_OFFERS,
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

  /** Obtener datos de tabla */

  useEffect(() => {
    clearSearchValue();
    reset();
    searchTable({ page: 1, pageSize: currentPageSize }, setLoadingTable);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  useEffect(() => {
    if (responseData) {
      setData();
    } else if (error) {
      setCurrentPage(1);
      setTotal(0);
      setOfferList([]);
      setLoadingTable(false);
      showNotification("error", errorMsg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData, error]);

  /** Cambio de tipo */

  useEffect(() => {
    setType(getRouteType(location.pathname));
  }, [location]);

  /** Abrir detalle de oferta */

  useEffect(() => {
    if (modalDataOfferDetail.type !== ModalTypes.NONE) {
      setDataModal(modalDataOfferDetail);
      setIsOpenModal(true);
    }
  }, [modalDataOfferDetail]);

  /** Funciones */

  function clearSearchValue() {
    if (searchValueRef.current) {
      searchValueRef.current.resetSearchValue();
    }
  }

  async function setData() {
    try {
      const subUsers: { [key: string]: BaseUser } = {};
      const pendingRequests: { [key: string]: Promise<any> } = {};

      const data: Offer[] = await Promise.all(
        responseData.data.map(async (e: any) => {
          if (e.subUser == dataUser.uid) {
            return transformToOfferFromGetOffersByEntityOrSubUser(
              e,
              type,
              dataUser,
              mainDataUser
            );
          } else {
            // Check if we already have data for the subUser in cache
            if (!Object.prototype.hasOwnProperty.call(subUsers, e.subUser)) {
              // If there's no request in progress for this subUser, initiate one
              if (!pendingRequests[e.subUser]) {
                pendingRequests[e.subUser] = makeRequest({
                  service: getBaseDataUserService(e.subUser),
                  method: "get",
                }).then(({ responseData }: any) => {
                  const { subUser } = transformToBaseUser(responseData.data[0]);
                  subUsers[e.subUser] = subUser;
                  // Clean up the pending request after it resolves
                  delete pendingRequests[e.subUser];
                });
              }
              // Wait for the request to resolve if it's already in progress
              await pendingRequests[e.subUser];
            }
            return transformToOfferFromGetOffersByEntityOrSubUser(
              e,
              type,
              subUsers[e.subUser],
              dataUser
            );
          }
        })
      );
      setSubUsersCache(subUsers);
      setTotal(responseData.res?.totalDocuments);
      setOfferList(data);
    } catch (error) {
      console.log(error);
      showNotification("error", t("errorOccurred"));
    } finally {
      setLoadingTable(false);
    }
  }

  function handleOnButtonClick(action: Action, offer: Offer) {
    console.log(offer);
    if (action == Action.VIEW_OFFER)
      getOfferDetail(
        offer.key,
        offer.type,
        true,
        action,
        offer.state != OfferState.ELIMINATED
          ? (offer.subUser && dataUser.uid == offer.subUser.uid) ||
              (!offer.subUser && dataUser.uid == offer.user.uid)
          : false,
        offer
      );
  }

  return (
    <>
      <ModalContainer
        destroyOnClose
        content={dataModal}
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        style={mainModalScrollStyle}
      />
      <TablePageContent
        title={t("offers")}
        titleIcon={<i className="fa-regular fa-dolly c-default"></i>}
        subtitle={`${t("listOf")} ${t("offers")} - ${t(
          getLabelFromRequirementType(type)
        )}`}
        subtitleIcon={<i className="fa-light fa-person-dolly sub-icon"></i>}
        table={tableContent}
        onSearch={(e) => handleSearch(e, searchTable)}
        loading={loadingTable}
        onChangePageAndPageSize={(params) =>
          handleChangePageAndPageSize(
            params,
            fieldNameSearchRequestOffer,
            searchTable,
            setLoadingTable
          )
        }
        ref={searchValueRef}
      />
    </>
  );
}
