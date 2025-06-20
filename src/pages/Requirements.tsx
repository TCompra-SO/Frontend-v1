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
} from "../components/common/utils/TablePageContent";
import {
  defaultErrorMsg,
  fieldNameSearchRequestRequirement,
  mainModalScrollStyle,
  noPaginationPageSize,
} from "../utilities/globals";
import useApi from "../hooks/useApi";
import { transformDataToRequirement } from "../utilities/transform";
import { useLocation } from "react-router-dom";
import {
  getDeleteRecordService,
  getInitialModalData,
  getLabelFromRequirementType,
  getRouteType,
} from "../utilities/globalFunctions";
import { useSelector } from "react-redux";
import { MainState } from "../models/Redux";
import {
  getBaseUserForUserSubUser,
  getFullUser,
  getOfferById,
} from "../services/general/generalServices";
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
import useSocketQueueHook, { useActionsForRow } from "../hooks/socketQueueHook";
import useSocket from "../socket/useSocket";
import { sectionIcons } from "../utilities/colors";

export default function Requirements() {
  const { t } = useTranslation();
  const location = useLocation();
  const { detailedRequirementModalData, resetDetailedRequirementModalData } =
    useContext(ModalsContext);
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
  const [dataModal, setDataModal] = useState<ModalContent>(
    getInitialModalData()
  );
  const [isOpenModalSelectOffer, setIsOpenModalSelectOffer] = useState(false);
  const [dataModalSelectOffer, setDataModalSelectOffer] =
    useState<ModalContent>(getInitialModalData());
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
  const { addNewRow, updateRow } = useActionsForRow(
    TableTypes.REQUIREMENT,
    (data: SocketDataPackType) =>
      transformDataToRequirement(data, type, dataUser, mainDataUser),
    requirementList,
    setRequirementList,
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
      TableTypes.REQUIREMENT,
      EntityType.SUBUSER,
      type,
      resetChangesQueue
    );
  useSocket(
    TableTypes.REQUIREMENT,
    type,
    currentPage,
    apiParams.dataToSend,
    updateChangesQueue
  );

  /** Actualiza el contenido de tabla */

  useEffect(() => {
    setTableContent((prev) => ({
      ...prev,
      subType: type,
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

  useEffect(() => {
    if (detailedRequirementModalData.requirementId) {
      const copy = { ...detailedRequirementModalData };
      getOffersByRequirementId(
        TableTypes.REQUIREMENT,
        copy.requirementId,
        copy.requirementType,
        false,
        1,
        noPaginationPageSize,
        Action.SHOW_OFFERS,
        copy.requirement
      );
      resetDetailedRequirementModalData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detailedRequirementModalData]);

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
    showLoadingMessage(loadingDelete);
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
      showNotification("error", t(defaultErrorMsg));
    } finally {
      setLoadingTable(false);
    }
  }

  async function handleOnButtonClick(action: Action, requirement: Requirement) {
    // console.log(requirement);
    switch (action) {
      case Action.VIEW: {
        getOffersByRequirementId(
          TableTypes.REQUIREMENT,
          requirement.key,
          requirement.type,
          true,
          1,
          noPaginationPageSize,
          action,
          requirement
        );
        break;
      }
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
              requirement.type,
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
              showNotification("error", t(defaultErrorMsg));
            }
          } else {
            showNotification("error", t(defaultErrorMsg));
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
            requirement.type,
            requirement.title
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
              type: requirement.type,
              requirementTitle: requirement.title,
              notificationTargetData: {
                receiverId:
                  requirement.offerSubUserId ?? requirement.offerUserId ?? "",
                targetId: requirement.offerId,
                targetType: requirement.type,
              },
            },
            action,
          });
          setIsOpenModal(true);
        } else if (requirement.state == RequirementState.PUBLISHED)
          cancelRequirement(requirement.key, action, requirement.type);
        break;
      }
    }
  }

  function deleteRequirement(requirementId: string) {
    setApiParamsDelete({
      service: getDeleteRecordService(type)?.(requirementId),
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
        titleIcon={<i className={`${sectionIcons[type]} c-default`}></i>}
        subtitle={`${t("listOf")} ${t(getLabelFromRequirementType(type))}`}
        subtitleIcon={
          <i className={`${sectionIcons["requirement"]} sub-icon`}></i>
        }
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
