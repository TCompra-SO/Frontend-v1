import ModalContainer from "../components/containers/ModalContainer";
import {
  Action,
  ModalTypes,
  RequirementState,
  TableColumns,
  RequirementType,
  TableTypes,
  OnChangePageAndPageSizeTypeParams,
  EntityType,
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
import {
  mainModalScrollStyle,
  noPaginationPageSize,
  pageSizeOptionsSt,
  tableSearchAfterMseconds,
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
} from "../hooks/requirementHook";
import { ModalsContext } from "../contexts/ModalsContext";
import useShowNotification, { useShowLoadingMessage } from "../hooks/utilHook";
import { debounce } from "lodash";
import useSearchTable from "../hooks/useSearchTable";

export default function Requirements() {
  const { t } = useTranslation();
  const location = useLocation();
  const { detailedRequirementModalData } = useContext(ModalsContext);
  const dataUser = useSelector((state: MainState) => state.user);
  const mainDataUser = useSelector((state: MainState) => state.mainUser);
  const { showLoadingMessage } = useShowLoadingMessage();
  const { showNotification } = useShowNotification();
  const { getOffersByRequirementId, modalDataOffersByRequirementId } =
    useGetOffersByRequirementId();
  const { cancelRequirement } = useCancelRequirement();
  const { getBasicRateData, modalDataRate } = useCulminate();
  const { searchTable, responseData, error, errorMsg } = useSearchTable(
    dataUser.uid,
    TableTypes.REQUIREMENT,
    EntityType.SUBUSER
  );
  const [loadingTable, setLoadingTable] = useState(true);
  const [type, setType] = useState(getRouteType(location.pathname));
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [total, setTotal] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(pageSizeOptionsSt[0]);
  const [dataModal, setDataModal] = useState<ModalContent>({
    type: ModalTypes.NONE,
    data: {},
    action: Action.NONE,
  });
  const [tableContent, setTableContent] = useState<TableTypeRequirement>({
    type: TableTypes.REQUIREMENT,
    data: [],
    subType: type,
    hiddenColumns: [TableColumns.CATEGORY],
    nameColumnHeader: t(getLabelFromRequirementType(type)),
    onButtonClick: handleOnButtonClick,
    total,
    page: currentPage,
    pageSize: currentPageSize,
  });

  /** Verificar si hay una solicitud pendiente */

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
    if (modalDataOffersByRequirementId.type !== ModalTypes.NONE) {
      setDataModal(modalDataOffersByRequirementId);
      setIsOpenModal(true);
    }
  }, [modalDataOffersByRequirementId]);

  useEffect(() => {
    if (modalDataRate.type !== ModalTypes.NONE) {
      setDataModal(modalDataRate);
      setIsOpenModal(true);
    }
  }, [modalDataRate]);

  /* Obtener lista inicialmente */

  useEffect(() => {
    searchTable(currentPage, currentPageSize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setType(getRouteType(location.pathname));
  }, [location]);

  useEffect(() => {
    setTableContent((prev) => {
      return {
        ...prev,
        //total: 100, // r3v
        page: currentPage,
        pageSize: currentPageSize,
        subType: type,
        nameColumnHeader: t(getLabelFromRequirementType(type)),
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  useEffect(() => {
    if (responseData) {
      setTableData();
    } else if (error) {
      setCurrentPage(1);
      setTotal(0);
      setTableContent({
        type: TableTypes.REQUIREMENT,
        data: [],
        subType: type,
        hiddenColumns: [TableColumns.CATEGORY],
        nameColumnHeader: t(getLabelFromRequirementType(type)),
        onButtonClick: handleOnButtonClick,
        total,
        page: currentPage,
        pageSize: currentPageSize,
      });
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

  async function setTableData() {
    console.log("got data");
    try {
      const data: Requirement[] = responseData.data.map((e: any) =>
        transformDataToRequirement(
          e,
          RequirementType.GOOD,
          dataUser,
          mainDataUser
        )
      );
      setTotal(responseData.res?.total);
      setTableContent({
        type: TableTypes.REQUIREMENT,
        data,
        subType: RequirementType.GOOD,
        hiddenColumns: [TableColumns.CATEGORY],
        nameColumnHeader: t("goods"),
        onButtonClick: handleOnButtonClick,
        total,
        page: currentPage,
        pageSize: currentPageSize,
      });
    } catch (error) {
      console.log(error);
      showNotification("error", t("errorOccurred"));
    } finally {
      setLoadingTable(false);
    }
  }

  async function handleOnButtonClick(action: Action, requirement: Requirement) {
    console.log(requirement);
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

  const handleSearch = debounce((e: ChangeEvent<HTMLInputElement>) => {
    // setLoadingTable(true);
    setSearchValue(e.target.value);
    setCurrentPage(1);
    searchTable(currentPage, currentPageSize, e.target.value);
  }, tableSearchAfterMseconds);

  function handleCloseModal() {
    setIsOpenModal(false);
  }

  function handleChangePageAndPageSize({
    page,
    pageSize,
  }: OnChangePageAndPageSizeTypeParams) {
    setCurrentPage(page);
    setCurrentPageSize(pageSize);
    setLoadingTable(true);
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
        title={t("myRequirements")}
        titleIcon={<i className="fa-regular fa-dolly c-default"></i>}
        subtitle={`${t("listOf")} ${t(getLabelFromRequirementType(type))}`}
        subtitleIcon={<i className="fa-light fa-person-dolly sub-icon"></i>}
        table={tableContent}
        onSearch={handleSearch}
        loading={loadingTable}
        onChangePageAndPageSize={handleChangePageAndPageSize}
        total={total}
      />
    </>
  );
}
