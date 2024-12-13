import { PurchaseOrder } from "../models/MainInterfaces";
import {
  Action,
  ModalTypes,
  PurchaseOrderTableTypes,
  RequirementType,
  TableTypes,
  UserRoles,
} from "../utilities/types";
import { useTranslation } from "react-i18next";
import {
  ModalContent,
  TableTypePurchaseOrder,
  useApiParams,
} from "../models/Interfaces";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import ModalContainer from "../components/containers/ModalContainer";
import TablePageContent from "../components/section/table-page/TablePageContent";
import useApi from "../hooks/useApi";
import { getUserService } from "../services/requests/authService";
import { App } from "antd";
import showNotification, {
  showLoadingMessage,
} from "../utilities/notification/showNotification";
import {
  getLabelFromPurchaseOrderType,
  getPurchaseOrderType,
  openPurchaseOrderPdf,
} from "../utilities/globalFunctions";
import {
  transformToFullUser,
  transformToPurchaseOrder,
} from "../utilities/transform";
import { mainModalScrollStyle } from "../utilities/globals";
import { useLocation } from "react-router-dom";
import {
  getPurchaseOrderPDFService,
  getPurchaseOrdersByClientEntityService,
  getPurchaseOrdersByProviderEntityService,
} from "../services/requests/purchaseOrderService";
import { MainState } from "../models/Redux";
import { useSelector } from "react-redux";
import { LoadingDataContext } from "../contexts/LoadingDataContext";
import { ModalsContext } from "../contexts/ModalsContext";
import {
  useCulminate,
  useGetOffersByRequirementId,
} from "../hooks/requirementHook";

export default function PurchaseOrders() {
  const { notification, message } = App.useApp();
  const { t } = useTranslation();
  const location = useLocation();
  const uid = useSelector((state: MainState) => state.user.uid);
  const role = useSelector((state: MainState) => state.user.typeID);
  const [type, setType] = useState(getPurchaseOrderType(location.pathname));
  const { updateMyPurchaseOrdersLoadingPdf } = useContext(LoadingDataContext);
  const { viewHistoryModalData } = useContext(ModalsContext);
  const { getOffersByRequirementId, modalDataOffersByRequirementId } =
    useGetOffersByRequirementId();
  const { getBasicRateData, modalDataRate } = useCulminate();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [dataModal, setDataModal] = useState<ModalContent>({
    type: ModalTypes.NONE,
    data: {},
  });
  const [tableContent, setTableContent] = useState<TableTypePurchaseOrder>({
    type: TableTypes.PURCHASE_ORDER,
    data: [],
    subType: type,
    hiddenColumns: [],
    nameColumnHeader: t("user"),
    onButtonClick: handleOnButtonClick,
  });

  /** Obtener subsección */

  useEffect(() => {
    setType(getPurchaseOrderType(location.pathname));
  }, [location]);

  /** Verificar si hay una solicitud pendiente */

  useEffect(() => {
    if (viewHistoryModalData.requirementId) {
      getOffersByRequirementId(
        TableTypes.PURCHASE_ORDER,
        viewHistoryModalData.requirementId,
        viewHistoryModalData.requirementType,
        true,
        viewHistoryModalData.requirement,
        viewHistoryModalData.filters
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** Para mostrar modales */

  useEffect(() => {
    if (modalDataRate.type !== ModalTypes.NONE) {
      setDataModal(modalDataRate);
      setIsOpenModal(true);
    }
  }, [modalDataRate]);

  useEffect(() => {
    if (modalDataOffersByRequirementId.type !== ModalTypes.NONE) {
      setDataModal(modalDataOffersByRequirementId);
      setIsOpenModal(true);
    }
  }, [modalDataOffersByRequirementId]);

  /** Para obtener datos iniciales y datos de proveedor/cliente */

  const [apiParams, setApiParams] = useState<useApiParams>({
    service: null,
    method: "get",
  });
  const { loading, responseData, error, errorMsg, fetchData } = useApi({
    service: apiParams.service,
    method: apiParams.method,
    dataToSend: apiParams.dataToSend,
  });

  useEffect(() => {
    switch (type) {
      case PurchaseOrderTableTypes.ISSUED:
        setApiParams({
          service: getPurchaseOrdersByClientEntityService(
            uid,
            role == UserRoles.ADMIN ? UserRoles.BUYER : role
          ),
          method: "get",
        });
        break;
      case PurchaseOrderTableTypes.RECEIVED:
        setApiParams({
          service: getPurchaseOrdersByProviderEntityService(
            uid,
            role == UserRoles.ADMIN ? UserRoles.BUYER : role
          ),
          method: "get",
        });
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  useEffect(() => {
    if (apiParams.service) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiParams]);

  useEffect(() => {
    if (responseData) {
      setTableData();
    } else if (error) {
      showNotification(notification, "error", errorMsg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData, error]);

  /* Obtener datos para user */

  const [apiParamsUser, setApiParamsUser] = useState<useApiParams>({
    service: null,
    method: "get",
  });

  const {
    loading: loadingUser,
    responseData: responseDataUser,
    error: errorUser,
    errorMsg: errorMsgUser,
    fetchData: fetchDataUser,
  } = useApi({
    service: apiParamsUser.service,
    method: apiParamsUser.method,
    dataToSend: apiParamsUser.dataToSend,
  });

  useEffect(() => {
    showLoadingMessage(message, loadingUser);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingUser]);

  useEffect(() => {
    if (apiParamsUser.service) fetchDataUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiParamsUser]);

  useEffect(() => {
    if (responseDataUser) {
      showUserInfo();
    } else if (errorUser) {
      showNotification(notification, "error", errorMsgUser);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseDataUser, errorUser]);

  /* Para descargar pdf de orden de compra */

  const [apiParamsPdf, setApiParamsPdf] = useState<useApiParams>({
    service: null,
    method: "get",
  });

  const {
    loading: loadingPdf,
    responseData: responseDataPdf,
    error: errorPdf,
    errorMsg: errorMsgPdf,
    fetchData: fetchDataPdf,
  } = useApi({
    service: apiParamsPdf.service,
    method: apiParamsPdf.method,
    dataToSend: apiParamsPdf.dataToSend,
  });

  useEffect(() => {
    updateMyPurchaseOrdersLoadingPdf(loadingPdf);
    showLoadingMessage(message, loadingPdf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingPdf]);

  useEffect(() => {
    if (apiParamsPdf.service) fetchDataPdf();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiParamsPdf]);

  useEffect(() => {
    if (responseDataPdf) {
      openPurchaseOrderPdf(responseDataPdf);
    } else if (errorPdf) {
      showNotification(notification, "error", errorMsgPdf);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseDataPdf, errorPdf]);

  /** Funciones */

  async function setTableData() {
    try {
      const data = responseData.data.map((po: any) =>
        transformToPurchaseOrder(po)
      );

      setTableContent({
        type: TableTypes.PURCHASE_ORDER,
        data,
        subType: type,
        hiddenColumns: [],
        nameColumnHeader: t("user"),
        onButtonClick: handleOnButtonClick,
      });
    } catch (error) {
      console.log(error);
      showNotification(notification, "error", t("errorOccurred"));
    }
  }

  function handleCloseModal() {
    setIsOpenModal(false);
  }

  function showUserInfo() {
    const user = transformToFullUser(responseDataUser.data);
    setDataModal({
      type: ModalTypes.USER_INFO,
      data: {
        user,
      },
    });
    setIsOpenModal(true);
  }

  function handleOnButtonClick(action: Action, purchaseOrder: PurchaseOrder) {
    switch (action) {
      case Action.VIEW_CUSTOMER:
        setApiParamsUser({
          service: getUserService(purchaseOrder.userClientId),
          method: "get",
        });
        break;
      case Action.VIEW_SUPPLIER:
        setApiParamsUser({
          service: getUserService(purchaseOrder.userProviderId),
          method: "get",
        });
        break;
      case Action.DOWNLOAD_PURCHASE_ORDER:
        setApiParamsPdf({
          service: getPurchaseOrderPDFService(purchaseOrder.key),
          method: "get",
        });
        break;
      case Action.FINISH:
        if (type == PurchaseOrderTableTypes.ISSUED) {
          // Buscar en oferta de requerimiento
          if (purchaseOrder.type == RequirementType.GOOD)
            // r3v falta servicios
            getBasicRateData(
              purchaseOrder.requirementId,
              purchaseOrder.offerId,
              true,
              true,
              action,
              purchaseOrder.type
            );
          break;
        } else if (type == PurchaseOrderTableTypes.RECEIVED)
          if (purchaseOrder.type == RequirementType.GOOD)
            // Buscar en requerimiento
            getBasicRateData(
              purchaseOrder.offerId,
              purchaseOrder.requirementId,
              false,
              false,
              action,
              purchaseOrder.type
            );
        break;
      case Action.VIEW_HISTORY:
        getOffersByRequirementId(
          TableTypes.PURCHASE_ORDER,
          purchaseOrder.requirementId,
          purchaseOrder.type,
          true,
          undefined,
          purchaseOrder.filters
        );
        break;
      case Action.CANCEL: //r3v
        setDataModal({
          type: ModalTypes.CANCEL_PURCHASE_ORDER,
          data: {
            offerId: purchaseOrder.offerId,
            requirementId: purchaseOrder.requirementId,
            fromRequirementTable: false,
            canceledByCreator: type == PurchaseOrderTableTypes.RECEIVED,
          },
        });
        setIsOpenModal(true);
        break;
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
        title={t("myPurchaseOrders")}
        titleIcon={<i className="fa-regular fa-dolly c-default"></i>}
        subtitle={`${t("listOf")} ${t(
          getLabelFromPurchaseOrderType(type, true)
        )}`}
        subtitleIcon={<i className="fa-light fa-person-dolly sub-icon"></i>}
        table={tableContent}
        onSearch={handleSearch}
        loading={loading}
      />
    </>
  );
}
