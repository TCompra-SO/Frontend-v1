import ModalContainer from "../components/containers/ModalContainer";
import {
  Action,
  ModalTypes,
  RequirementState,
  TableColumns,
  RequirementType,
  TableTypes,
  EntityType,
} from "../utilities/types";
import { Requirement } from "../models/MainInterfaces";
import { useContext, useEffect, useRef, useState } from "react";
import {
  ModalContent,
  SocketDataPackType,
  TableTypeRequirement,
  useApiParams,
} from "../models/Interfaces";
import { useTranslation } from "react-i18next";
import TablePageContent, {
  TablePageContentRef,
} from "../components/section/table-page/TablePageContent";
import {
  fieldNameSearchRequestRequirement,
  mainModalScrollStyle,
  noPaginationPageSize,
} from "../utilities/globals";
import useApi from "../hooks/useApi";
import { deleteRequirementService } from "../services/requests/requirementService";
import { transformDataToRequirement } from "../utilities/transform";
import { useLocation } from "react-router-dom";
import {
  getLabelFromRequirementType,
  getRouteType,
} from "../utilities/globalFunctions";
import { useSelector } from "react-redux";
import { MainState } from "../models/Redux";
import {
  getBaseUserForUserSubUser,
  getFullUser,
  getOfferById,
} from "../services/complete/generalServices";
import {
  useCancelRequirement,
  useCulminate,
  useGetOffersByRequirementId,
} from "../hooks/requirementHooks";
import { ModalsContext } from "../contexts/ModalsContext";
import useShowNotification, { useShowLoadingMessage } from "../hooks/utilHooks";
import useSearchTable, {
  useFilterSortPaginationForTable,
} from "../hooks/searchTableHooks";
import useSocketQueueHook, { useAddNewRow } from "../hooks/socketQueueHook";

export default function Requirements() {
  const { t } = useTranslation();
  const location = useLocation();
  const { detailedRequirementModalData } = useContext(ModalsContext);
  const dataUser = useSelector((state: MainState) => state.user);
  const mainDataUser = useSelector((state: MainState) => state.mainUser);
  const searchValueRef = useRef<TablePageContentRef>(null);
  const { showLoadingMessage } = useShowLoadingMessage();
  const { showNotification } = useShowNotification();
  const { getOffersByRequirementId, modalDataOffersByRequirementId } =
    useGetOffersByRequirementId();
  const { cancelRequirement } = useCancelRequirement();
  const { getBasicRateData, modalDataRate } = useCulminate();
  const [type, setType] = useState(getRouteType(location.pathname));
  const [requirementList, setRequirementList] = useState<Requirement[]>([]);
  const { searchTable, responseData, error, errorMsg } = useSearchTable(
    dataUser.uid,
    TableTypes.REQUIREMENT,
    EntityType.SUBUSER,
    type
  );
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
  const [loadingTable, setLoadingTable] = useState(true);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [total, setTotal] = useState(0);
  const [dataModal, setDataModal] = useState<ModalContent>({
    type: ModalTypes.NONE,
    data: {},
    action: Action.NONE,
  });
  const [isOpenModalSelectOffer, setIsOpenModalSelectOffer] = useState(false);
  const [dataModalSelectOffer, setDataModalSelectOffer] =
    useState<ModalContent>({
      type: ModalTypes.NONE,
      data: {},
      action: Action.NONE,
    });
  const [tableContent, setTableContent] = useState<TableTypeRequirement>({
    type: TableTypes.REQUIREMENT,
    data: requirementList,
    subType: type,
    hiddenColumns: [TableColumns.CATEGORY],
    nameColumnHeader: t(getLabelFromRequirementType(type)),
    onButtonClick: handleOnButtonClick,
    total,
    page: currentPage,
    pageSize: currentPageSize,
    fieldSort,
    filteredInfo,
  });
  const { addNewRow, updateRow } = useAddNewRow(
    (data: SocketDataPackType) =>
      transformDataToRequirement(data, type, dataUser, mainDataUser),
    requirementList,
    setRequirementList,
    total,
    setTotal
  );
  const { updateChangesQueue } = useSocketQueueHook(addNewRow, updateRow);

  /** Actualiza el contenido de tabla */

  useEffect(() => {
    setTableContent((prev) => ({
      ...prev,
      data: requirementList,
      nameColumnHeader: t(getLabelFromRequirementType(type)),
      total,
      page: currentPage,
      pageSize: currentPageSize,
      fieldSort,
      filteredInfo,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requirementList]);

  /** Verificar si hay una solicitud pendiente */

  // useEffect(() => {
  //   showLoadingMessage(loadingGetOffersByRequirementId);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [loadingGetOffersByRequirementId]);

  useEffect(() => {
    if (detailedRequirementModalData.requirementId) {
      console.log(detailedRequirementModalData.requirementId);
      getOffersByRequirementId(
        TableTypes.REQUIREMENT,
        detailedRequirementModalData.requirementId,
        detailedRequirementModalData.requirementType,
        false,
        1,
        noPaginationPageSize,
        Action.SHOW_OFFERS,
        detailedRequirementModalData.requirement
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** Para mostrar modales */

  useEffect(() => {
    if (
      modalDataOffersByRequirementId.type === ModalTypes.DETAILED_REQUIREMENT
    ) {
      setDataModal({
        ...modalDataOffersByRequirementId,
        selectOffer: { setDataModalSelectOffer, setIsOpenModalSelectOffer },
      });
      setIsOpenModal(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalDataOffersByRequirementId]);

  useEffect(() => {
    if (modalDataRate.type !== ModalTypes.NONE) {
      setDataModal(modalDataRate);
      setIsOpenModal(true);
    }
  }, [modalDataRate]);

  /* Obtener lista inicialmente */

  useEffect(() => {
    clearSearchValue();
    reset();
    searchTable({ page: 1, pageSize: currentPageSize }, setLoadingTable);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  useEffect(() => {
    setType(getRouteType(location.pathname));
  }, [location]);

  useEffect(() => {
    if (responseData) {
      setTableData();
    } else if (error) {
      setCurrentPage(1);
      setTotal(0);
      setRequirementList([]);
      setLoadingTable(false);
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
    showLoadingMessage(loadingDelete, "aaaaaaaaa");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingDelete]);

  useEffect(() => {
    if (apiParamsDelete.service) fetchDataDelete();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiParamsDelete]);

  useEffect(() => {
    if (responseDataDelete) {
      showNotification(
        "success",
        t(
          type == RequirementType.SALE
            ? "saleDeletedSuccessfully"
            : "requirementDeletedSuccessfully"
        )
      );
      handleCloseModal();
    } else if (errorDelete) {
      showNotification("error", errorMsgDelete);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseDataDelete, errorDelete]);

  /** Funciones */

  function clearSearchValue() {
    if (searchValueRef.current) {
      searchValueRef.current.resetSearchValue();
    }
  }

  async function setTableData() {
    try {
      const data: Requirement[] = responseData.data.map((e: any) =>
        transformDataToRequirement(e, type, dataUser, mainDataUser)
      );
      setTotal(responseData.res?.totalDocuments);
      setRequirementList(data);
    } catch (error) {
      console.log(error);
      showNotification("error", t("errorOccurred"));
    } finally {
      setLoadingTable(false);
    }
  }

  async function handleOnButtonClick(action: Action, requirement: Requirement) {
    // console.log(requirement);
    switch (action) {
      case Action.SHOW_OFFERS: {
        getOffersByRequirementId(
          TableTypes.REQUIREMENT,
          requirement.key,
          requirement.type,
          false,
          1,
          noPaginationPageSize,
          action,
          requirement
        );
        break;
      }
      case Action.SHOW_SUMMARY: {
        if (requirement.offerUserId && requirement.offerId) {
          showLoadingMessage(true);
          const { user: fullUser } = await getFullUser(requirement.offerUserId);
          const { user, subUser } = await getBaseUserForUserSubUser(
            requirement.offerSubUserId ?? requirement.offerUserId
          );
          if (user && fullUser) {
            const { offer } = await getOfferById(
              requirement.offerId,
              type,
              subUser ?? user,
              subUser ? user : undefined
            );
            if (offer) {
              setDataModal({
                type: ModalTypes.OFFER_SUMMARY,
                data: { offer, requirement: requirement, user: fullUser },
                action,
              });
              setIsOpenModal(true);
            } else {
              showNotification("error", t("errorOccurred"));
            }
          } else {
            showNotification("error", t("errorOccurred"));
          }
          showLoadingMessage(false);
        }
        break;
      }
      case Action.REPUBLISH: {
        setDataModal({
          type: ModalTypes.REPUBLISH_REQUIREMENT,
          data: { requirementId: requirement.key, type: requirement.type },
          action,
        });
        setIsOpenModal(true);
        break;
      }
      case Action.FINISH: {
        if (requirement.offerId)
          getBasicRateData(
            requirement.key,
            requirement.key,
            requirement.offerId,
            true,
            true,
            action,
            requirement.type
          );
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
            id: requirement.key,
          },
          action,
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
              rowId: requirement.key,
            },
            action,
          });
          setIsOpenModal(true);
        } else if (requirement.state == RequirementState.PUBLISHED)
          cancelRequirement(requirement.key, action);
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
        loadingConfirm={loadingDelete}
      />
      <ModalContainer // para seleccionar oferta
        content={dataModalSelectOffer}
        isOpen={isOpenModalSelectOffer}
        onClose={() => setIsOpenModalSelectOffer(false)}
      />
      <TablePageContent
        title={t("myRequirements")}
        titleIcon={<i className="fa-regular fa-dolly c-default"></i>}
        subtitle={`${t("listOf")} ${t(getLabelFromRequirementType(type))}`}
        subtitleIcon={<i className="fa-light fa-person-dolly sub-icon"></i>}
        table={tableContent}
        onSearch={(e) => handleSearch(e, searchTable)}
        loading={loadingTable}
        onChangePageAndPageSize={(params) =>
          handleChangePageAndPageSize(
            params,
            fieldNameSearchRequestRequirement,
            searchTable,
            setLoadingTable
          )
        }
        total={total}
        ref={searchValueRef}
      />
    </>
  );
}
