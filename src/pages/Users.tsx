import { ChangeEvent, useEffect, useState } from "react";
import NoContentModalContainer from "../components/containers/NoContentModalContainer";
import TablePageContent from "../components/section/table-page/TablePageContent";
import AddUserModal from "../components/section/users/addUser/AddUserModal";
import { useTranslation } from "react-i18next";
import {
  Action,
  PurchaseOrderTableTypes,
  RequirementType,
  TableTypes,
} from "../utilities/types";
import { TableTypeUsers, useApiParams } from "../models/Interfaces";
import { mainModalScrollStyle } from "../utilities/globals";
import ButtonContainer from "../components/containers/ButtonContainer";
import useApi from "../hooks/useApi";
import {
  getSubUsersByEntityService,
  getSubUserService,
} from "../services/requests/subUserService";
import { MainState } from "../models/Redux";
import { useSelector } from "react-redux";
import { equalServices } from "../utilities/globalFunctions";
import showNotification, {
  showLoadingMessage,
} from "../utilities/notification/showNotification";
import { App } from "antd";
import { SubUserBase, SubUserProfile } from "../models/Responses";
import SubUserTableModal from "../components/section/users/subUserTables/SubUserTableModal";
import {
  OfferItemSubUser,
  PurchaseOrderItemSubUser,
  RequirementItemSubUser,
} from "../models/MainInterfaces";
import {
  transformDataToOfferItemSubUser,
  transformDataToRequirementItemSubUser,
  transformToPurchaseOrderItemSubUser,
  transformToSubUserBase,
} from "../utilities/transform";
import { getRequirementsBySubUserService } from "../services/requests/requirementService";
import { getOffersBySubUserService } from "../services/requests/offerService";
import { getPurchaseOrdersByClientEntityService } from "../services/requests/purchaseOrderService";

export default function Users() {
  const { t } = useTranslation();
  const { notification, message } = App.useApp();
  const token = useSelector((state: MainState) => state.user.token);
  const uid = useSelector((state: MainState) => state.user.uid);
  const [action, setAction] = useState<Action>(Action.ADD_USER);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [userData, setUserData] = useState<SubUserBase | null>(null);
  const [userDataEdit, setUserDataEdit] = useState<SubUserProfile | null>(null);
  const [reqList, setReqList] = useState<RequirementItemSubUser[]>([]);
  const [offerList, setOfferList] = useState<OfferItemSubUser[]>([]);
  const [orderList, setOrderList] = useState<PurchaseOrderItemSubUser[]>([]);
  const [tableContent, setTableContent] = useState<TableTypeUsers>({
    type: TableTypes.USERS,
    data: [],
    hiddenColumns: [],
    nameColumnHeader: t("user"),
    onButtonClick: handleOnActionClick,
  });

  /** Obtener lista de subusuarios */

  const [apiParams] = useState<useApiParams>({
    service: getSubUsersByEntityService(uid),
    method: "get",
  });

  const { loading, responseData, error, errorMsg, fetchData } = useApi({
    service: apiParams.service,
    method: apiParams.method,
    dataToSend: apiParams.dataToSend,
  });

  useEffect(() => {
    if (responseData) {
      setTableData();
    } else if (error) {
      showNotification(notification, "error", errorMsg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData, error]);

  useEffect(() => {
    if (apiParams.service) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiParams]);

  /** Obtener datos de subusuario */

  const [apiParamsUser, setApiParamsUser] = useState<useApiParams>({
    service: null,
    method: "get",
    // token,
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
    token: apiParamsUser.token,
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
      if (equalServices(apiParamsUser.service, getSubUserService(""))) {
        setUserDataEdit({
          // email: userData?.email,
          // typeID: userData?.typeID,
          ...responseDataUser,
        });
        handleOpenModal();
      }
    } else if (errorUser) {
      showNotification(notification, "error", errorMsgUser);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseDataUser, errorUser]);

  /** Obtener lista de requerimientos */

  const [apiParamsReq, setApiParamsReq] = useState<useApiParams>({
    service: null,
    method: "get",
  });

  const {
    loading: loadingReq,
    responseData: responseDataReq,
    error: errorReq,
    errorMsg: errorMsgReq,
    fetchData: fetchDataReq,
  } = useApi({
    service: apiParamsReq.service,
    method: apiParamsReq.method,
    dataToSend: apiParamsReq.dataToSend,
  });

  useEffect(() => {
    showLoadingMessage(message, loadingReq);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingReq]);

  useEffect(() => {
    if (apiParamsReq.service) fetchDataReq();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiParamsReq]);

  useEffect(() => {
    if (responseDataReq) {
      setModalTableDataReq();
    } else if (errorReq) {
      showNotification(notification, "error", errorMsgReq);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseDataReq, errorReq]);

  const [apiParamsOffer, setApiParamsOffer] = useState<useApiParams>({
    service: null,
    method: "get",
  });

  /** Obtener lista de ofertas */

  const {
    loading: loadingOffer,
    responseData: responseDataOffer,
    error: errorOffer,
    errorMsg: errorMsgOffer,
    fetchData: fetchDataOffer,
  } = useApi({
    service: apiParamsOffer.service,
    method: apiParamsOffer.method,
    dataToSend: apiParamsOffer.dataToSend,
  });

  useEffect(() => {
    showLoadingMessage(message, loadingOffer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingOffer]);

  useEffect(() => {
    if (apiParamsOffer.service) fetchDataOffer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiParamsOffer]);

  useEffect(() => {
    if (responseDataOffer) {
      setModalTableDataOffer();
    } else if (errorOffer) {
      showNotification(notification, "error", errorMsgOffer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseDataOffer, errorOffer]);

  /** Obtener lista de órdenes de compra */

  const [apiParamsOrder, setApiParamsOrder] = useState<useApiParams>({
    service: null,
    method: "get",
  });

  const {
    loading: loadingOrder,
    responseData: responseDataOrder,
    error: errorOrder,
    errorMsg: errorMsgOrder,
    fetchData: fetchDataOrder,
  } = useApi({
    service: apiParamsOrder.service,
    method: apiParamsOrder.method,
    dataToSend: apiParamsOrder.dataToSend,
  });

  useEffect(() => {
    showLoadingMessage(message, loadingOrder);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingOrder]);

  useEffect(() => {
    if (apiParamsOrder.service) fetchDataOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiParamsOrder]);

  useEffect(() => {
    if (responseDataOrder) {
      setModalTableDataOrder();
    } else if (errorOrder) {
      showNotification(notification, "error", errorMsgOrder);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseDataOrder, errorOrder]);

  /** Obtener lista de órdenes de venta */

  const [apiParamsSales, setApiParamsSales] = useState<useApiParams>({
    service: null,
    method: "get",
  });

  const {
    loading: loadingSales,
    responseData: responseDataSales,
    error: errorSales,
    errorMsg: errorMsgSales,
    fetchData: fetchDataSales,
  } = useApi({
    service: apiParamsSales.service,
    method: apiParamsSales.method,
    dataToSend: apiParamsSales.dataToSend,
  });

  useEffect(() => {
    showLoadingMessage(message, loadingSales);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingSales]);

  useEffect(() => {
    if (apiParamsSales.service) fetchDataSales();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiParamsSales]);

  useEffect(() => {
    if (responseDataSales) {
      setModalTableDataOrder();
    } else if (errorSales) {
      showNotification(notification, "error", errorMsgSales);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseDataSales, errorSales]);

  /** Funciones */

  async function setTableData() {
    try {
      let data: SubUserBase[] = [];
      if (responseData.data.length > 0) {
        data = responseData.data.map((e: any) => transformToSubUserBase(e));
      }
      setTableContent({
        type: TableTypes.USERS,
        data,
        hiddenColumns: [],
        nameColumnHeader: t("user"),
        onButtonClick: handleOnActionClick,
      });
    } catch (error) {
      showNotification(notification, "error", t("errorOccurred"));
      console.log(error);
    }
  }

  function setModalTableDataReq() {
    try {
      const data: RequirementItemSubUser[] = responseDataReq.data.map(
        (e: any) =>
          transformDataToRequirementItemSubUser(e, RequirementType.GOOD) // r3v
      );
      setReqList(data);
      handleOpenModal();
    } catch (error) {
      showNotification(notification, "error", t("errorOccurred"));
    }
  }

  function setModalTableDataOffer() {
    try {
      const data: OfferItemSubUser[] = responseDataOffer.data.map(
        (e: any) => transformDataToOfferItemSubUser(e, RequirementType.GOOD) // r3v
      );
      setOfferList(data);
      handleOpenModal();
    } catch (error) {
      showNotification(notification, "error", t("errorOccurred"));
    }
  }

  function setModalTableDataOrder() {
    try {
      const data: PurchaseOrderItemSubUser[] = responseDataOrder.data.map(
        (e: any) =>
          transformToPurchaseOrderItemSubUser(e, PurchaseOrderTableTypes.ISSUED) // r3v
      );
      setOrderList(data);
      handleOpenModal();
    } catch (error) {
      showNotification(notification, "error", t("errorOccurred"));
    }
  }

  function openModalAddUser() {
    setAction(Action.ADD_USER);
    handleOpenModal();
  }

  function handleCloseModal() {
    setIsOpenModal(false);
  }

  function handleOpenModal() {
    setIsOpenModal(true);
  }

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    console.log(e.target.value);
  }

  function handleOnActionClick(action: Action, user: SubUserBase) {
    setAction(action);
    setUserData(user);
    console.log(user);
    switch (action) {
      case Action.EDIT_USER:
        setApiParamsUser({
          service: getSubUserService(user.uid),
          method: "get",
          token,
        });
        break;
      case Action.VIEW_REQUIREMENTS:
        setApiParamsReq({
          service: getRequirementsBySubUserService(user.uid),
          method: "get",
        });
        break;
      case Action.VIEW_OFFERS:
        setApiParamsOffer({
          service: getOffersBySubUserService(user.uid),
          method: "get",
        });
        break;
      case Action.VIEW_PURCHASE_ORDERS:
        setApiParamsOrder({
          service: getPurchaseOrdersByClientEntityService(
            user.uid,
            user.typeID
          ),
          method: "get",
        });
        break;
      case Action.VIEw_SALES_ORDERS:
        setApiParamsSales({
          service: getPurchaseOrdersByClientEntityService(
            // r3v
            user.uid,
            user.typeID
          ),
          method: "get",
        });
        break;
    }
  }

  function getContent() {
    switch (action) {
      case Action.ADD_USER:
        return <AddUserModal onClose={handleCloseModal} edit={false} />;
      case Action.EDIT_USER:
        return (
          <AddUserModal
            onClose={handleCloseModal}
            edit={true}
            userData={userDataEdit}
          />
        );
      case Action.VIEW_REQUIREMENTS:
        return (
          <SubUserTableModal
            content={{
              tableType: TableTypes.REQUIREMENT_SUBUSER,
              tableContent: reqList,
            }}
            user={userData}
            onTabChange={handleTabChange}
            loading={loadingReq}
            tableType={TableTypes.REQUIREMENT_SUBUSER}
          />
        );
      case Action.VIEW_OFFERS:
        return (
          <SubUserTableModal
            content={{
              tableType: TableTypes.OFFER_SUBUSER,
              tableContent: offerList,
            }}
            user={userData}
            onTabChange={handleTabChange}
            loading={loadingOffer}
            tableType={TableTypes.OFFER_SUBUSER}
          />
        );
      case Action.VIEW_PURCHASE_ORDERS:
        return (
          <SubUserTableModal
            content={{
              tableType: TableTypes.PURCHASE_ORDER_SUBUSER,
              tableContent: orderList,
            }}
            user={userData}
            onTabChange={handleTabChange}
            loading={loadingOrder}
            tableType={TableTypes.PURCHASE_ORDER_SUBUSER}
          />
        );
      case Action.VIEw_SALES_ORDERS:
        return (
          <SubUserTableModal
            content={{
              tableType: TableTypes.PURCHASE_ORDER_SUBUSER,
              tableContent: orderList,
            }}
            user={userData}
            onTabChange={handleTabChange}
            loading={loadingOrder}
            tableType={TableTypes.SALES_ORDER_SUBUSER}
          />
        );
      default:
        return null;
    }
  }

  function handleTabChange(tabId: RequirementType | PurchaseOrderTableTypes) {
    if (userData) {
      if (action == Action.VIEW_REQUIREMENTS) {
        switch (tabId) {
          case RequirementType.GOOD:
            setApiParamsReq({
              service: getRequirementsBySubUserService(userData.uid), // r3v para servicios y liquidaciones
              method: "get",
            });
            break;
          case RequirementType.SERVICE:
            setApiParamsReq({
              service: getRequirementsBySubUserService(userData.uid),
              method: "get",
            });
            break;
          case RequirementType.SALE:
            setApiParamsReq({
              service: getRequirementsBySubUserService(userData.uid),
              method: "get",
            });
            break;
        }
      }
    }
  }

  return (
    <>
      <NoContentModalContainer
        open={isOpenModal}
        width={
          action == Action.ADD_USER || action == Action.EDIT_USER ? 800 : 1100
        }
        style={mainModalScrollStyle}
        onClose={handleCloseModal}
      >
        {getContent()}
      </NoContentModalContainer>
      <TablePageContent
        title={t("users")}
        titleIcon={<i className="fa-regular fa-users c-default"></i>}
        subtitle={`${t("listOf")} ${t("users")}`}
        subtitleIcon={<i className="fa-regular fa-user-group sub-icon"></i>}
        table={tableContent}
        onSearch={handleSearch}
        additionalContentHeader={
          <div>
            <ButtonContainer
              common
              className="btn btn-default"
              onClick={openModalAddUser}
            >
              <i className="fa-regular fa-user-plus"></i> {t("addUser")}
            </ButtonContainer>
          </div>
        }
        loading={loading}
      />
    </>
  );
}
