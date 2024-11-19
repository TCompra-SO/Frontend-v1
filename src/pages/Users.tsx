import { ChangeEvent, useEffect, useState } from "react";
import NoContentModalContainer from "../components/containers/NoContentModalContainer";
import TablePageContent from "../components/section/table-page/TablePageContent";
import AddUserModal from "../components/section/users/addUser/AddUserModal";
import { useTranslation } from "react-i18next";
import {
  Action,
  EntityType,
  OfferState,
  PurchaseOrderState,
  PurchaseOrderTableTypes,
  RequirementState,
  RequirementType,
  TableTypes,
  UserRoles,
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
import { transformToSubUserBase } from "../utilities/transform";

const users: SubUserProfile[] = [
  {
    uid: "user1",
    name: "Soluciones Online Soluciones Online Soluciones Online S. A. C.",
    email: "john.doejohn.doejohn.doejohn.doe@example.com",
    document: "123456789",
    // typeEntity: EntityType.COMPANY,
    // tenure: 2,
    // customerScore: 3.5,
    // sellerScore: 1.5,
    address: "Calle San Agustin 107 - Cercado - Arequipa",
    // userType: 0,
    phone: "90909090",
    cityID: 1,
    companyID: "xxxxxxxxxxxxx",
    createdAt: "2024-10-12T16:36:45.673Z",
    numGoods: 10,
    numServices: 2,
    numSales: 5,
    numOffers: 0,
    numPurchaseOrders: 0,
    customerScore: 0,
    sellerScore: 0,
    customerCount: 0,
    sellerCount: 0,
    typeEntity: EntityType.COMPANY,
    typeID: UserRoles.BUYER,
  },
  {
    uid: "user2",
    name: "Soluciones Online Soluciones Online Soluciones Online S. A. C.",
    email: "aaaaaaaaa@example.com",
    document: "123456789",
    // typeEntity: EntityType.COMPANY,
    // tenure: 2,
    // customerScore: 3.5,
    // sellerScore: 1.5,
    address: "Calle San Agustin 107 - Cercado - Arequipa",
    // userType: 0,
    phone: "90909090",
    cityID: 1,
    companyID: "xxxxxxxxxxxxx",
    createdAt: "2024-10-12T09:36:45.673Z",
    numGoods: 23,
    numServices: 90,
    numSales: 235,
    numOffers: 0,
    numPurchaseOrders: 0,
    customerScore: 0,
    sellerScore: 0,
    customerCount: 0,
    sellerCount: 0,
    typeEntity: EntityType.COMPANY,
    typeID: UserRoles.LEGAL,
  },
  {
    uid: "user3",
    name: "Soluciones Online Soluciones Online Soluciones Online S. A. C.",
    email: "mmmmmmmm@example.com",
    document: "123456789",
    // typeEntity: EntityType.COMPANY,
    // tenure: 2,
    // customerScore: 3.5,
    // sellerScore: 1.5,
    address: "Calle San Agustin 107 - Cercado - Arequipa",
    // userType: 0,
    phone: "90909090",
    cityID: 1,
    companyID: "xxxxxxxxxxxxx",
    createdAt: "2024-01-12T20:36:45.673Z",
    numGoods: 1,
    numServices: 0,
    numSales: 8,
    numOffers: 0,
    numPurchaseOrders: 0,
    customerScore: 0,
    sellerScore: 0,
    customerCount: 0,
    sellerCount: 0,
    typeEntity: EntityType.COMPANY,
    typeID: UserRoles.SELLER,
  },
  {
    uid: "user4",
    name: "aaaaaaaaaaaaaa S. A. C.",
    email: "ccccccccc@example.com",
    document: "123456789",
    // typeEntity: EntityType.COMPANY,
    // tenure: 2,
    // customerScore: 3.5,
    // sellerScore: 1.5,
    address: "Calle San Agustin 107 - Cercado - Arequipa",
    // userType: 0,
    phone: "90909090",
    cityID: 1,
    companyID: "xxxxxxxxxxxxx",
    createdAt: "2024-05-12T20:36:45.673Z",
    numGoods: 100,
    numServices: 35,
    numSales: 84,
    numOffers: 0,
    numPurchaseOrders: 0,
    customerScore: 0,
    sellerScore: 0,
    customerCount: 0,
    sellerCount: 0,
    typeEntity: EntityType.COMPANY,
    typeID: UserRoles.SELLER_BUYER,
  },
];

const reqs: RequirementItemSubUser[] = [
  {
    price: 0,
    publishDate: "2024-10-12T16:36:45.673Z",
    expirationDate: "2024-10-12T16:36:45.673Z",
    numberOffers: 2,
    state: RequirementState.PUBLISHED,
    key: "1",
    title: "Necesito xxx x x  x xx  xxxx xxx x x xxx x x x x xx x ",
    type: RequirementType.GOOD,
    coin: 1,
  },
  {
    price: 0,
    publishDate: "2024-10-12T16:36:45.673Z",
    expirationDate: "2024-10-12T16:36:45.673Z",
    numberOffers: 2,
    state: RequirementState.PUBLISHED,
    key: "2",
    title: "Necesito xxx x x  x xx  xxxx xxx x x xxx x x x x xx x ",
    type: RequirementType.GOOD,
    coin: 1,
  },
  {
    price: 0,
    publishDate: "2024-10-12T16:36:45.673Z",
    expirationDate: "2024-10-12T16:36:45.673Z",
    numberOffers: 2,
    state: RequirementState.PUBLISHED,
    key: "3",
    title: "Necesito xxx x x  x xx  xxxx xxx x x xxx x x x x xx x ",
    type: RequirementType.GOOD,
    coin: 1,
  },
  {
    price: 0,
    publishDate: "2024-10-12T16:36:45.673Z",
    expirationDate: "2024-10-12T16:36:45.673Z",
    numberOffers: 2,
    state: RequirementState.PUBLISHED,
    key: "4",
    title: "Necesito xxx x x  x xx  xxxx xxx x x xxx x x x x xx x ",
    type: RequirementType.GOOD,
    coin: 1,
  },
  {
    price: 0,
    publishDate: "2024-10-12T16:36:45.673Z",
    expirationDate: "2024-10-12T16:36:45.673Z",
    numberOffers: 2,
    state: RequirementState.PUBLISHED,
    key: "5",
    title: "Necesito xxx x x  x xx  xxxx xxx x x xxx x x x x xx x ",
    type: RequirementType.GOOD,
    coin: 1,
  },
  {
    price: 0,
    publishDate: "2024-10-12T16:36:45.673Z",
    expirationDate: "2024-10-12T16:36:45.673Z",
    numberOffers: 2,
    state: RequirementState.PUBLISHED,
    key: "6",
    title: "Necesito xxx x x  x xx  xxxx xxx x x xxx x x x x xx x ",
    type: RequirementType.GOOD,
    coin: 1,
  },
  {
    price: 123,
    publishDate: "2024-10-12T16:36:45.673Z",
    expirationDate: "2024-10-12T16:36:45.673Z",
    numberOffers: 2,
    state: RequirementState.PUBLISHED,
    key: "7",
    title: "Necesito xxx x x  x xx  xxxx xxx x x xxx x x x x xx x ",
    type: RequirementType.GOOD,
    coin: 1,
  },
];

const offers: OfferItemSubUser[] = [
  {
    requirementTitle: "Requirement title fdskfhjkshf js hfjksfh sjffhjs jsf",
    price: 23,
    publishDate: "2024-10-12T16:36:45.673Z",
    state: OfferState.ACTIVE,
    coin: 2,
    key: "1",
    title: "Offer title fjdfh jfhsjhf js",
    type: RequirementType.GOOD,
  },
  {
    requirementTitle: "Requirement title fdskfhjkshf js hfjksfh sjffhjs jsf",
    price: 23,
    publishDate: "2024-10-12T16:36:45.673Z",
    state: OfferState.ACTIVE,
    coin: 2,
    key: "1",
    title: "Offer title fjdfh jfhsjhf js",
    type: RequirementType.SALE,
  },
  {
    requirementTitle: "Requirement title fdskfhjkshf js hfjksfh sjffhjs jsf",
    price: 23,
    publishDate: "2024-10-12T16:36:45.673Z",
    state: OfferState.ACTIVE,
    coin: 2,
    key: "1",
    title: "Offer title fjdfh jfhsjhf js",
    type: RequirementType.GOOD,
  },
  {
    requirementTitle: "Requirement title fdskfhjkshf js hfjksfh sjffhjs jsf",
    price: 434343,
    publishDate: "2024-10-12T16:36:45.673Z",
    state: OfferState.ACTIVE,
    coin: 2,
    key: "1",
    title: "Offer title fjdfh jfhsjhf js",
    type: RequirementType.GOOD,
  },
];

const purc: PurchaseOrderItemSubUser[] = [
  {
    requirementTitle: "req title fdfsf fs f sf sf sfs",
    offerTitle: "Offer title fkjsfjsjk fjkfsfsfds",
    selectionDate: "2024-10-12T16:36:45.673Z",
    state: PurchaseOrderState.PENDING,
    key: "1",
    type: RequirementType.SERVICE,
    subType: PurchaseOrderTableTypes.ISSUED,
  },
  {
    requirementTitle: "req title fdfsf fs f sf sf sfs",
    offerTitle: "Offer title fkjsfjsjk fjkfsfsfds",
    selectionDate: "2024-10-12T16:36:45.673Z",
    state: PurchaseOrderState.PENDING,
    key: "1",
    type: RequirementType.SERVICE,
    subType: PurchaseOrderTableTypes.ISSUED,
  },
  {
    requirementTitle: "req title fdfsf fs f sf sf sfs",
    offerTitle: "Offer title fkjsfjsjk fjkfsfsfds",
    selectionDate: "2024-10-12T16:36:45.673Z",
    state: PurchaseOrderState.PENDING,
    key: "1",
    type: RequirementType.SERVICE,
    subType: PurchaseOrderTableTypes.ISSUED_SALES,
  },
  {
    requirementTitle: "req title fdfsf fs f sf sf sfs",
    offerTitle: "Offer title fkjsfjsjk fjkfsfsfds",
    selectionDate: "2024-10-12T16:36:45.673Z",
    state: PurchaseOrderState.PENDING,
    key: "1",
    type: RequirementType.GOOD,
    subType: PurchaseOrderTableTypes.RECEIVED,
  },
  {
    requirementTitle: "req title fdfsf fs f sf sf sfs",
    offerTitle: "Offer title fkjsfjsjk fjkfsfsfds",
    selectionDate: "2024-10-12T16:36:45.673Z",
    state: PurchaseOrderState.PENDING,
    key: "1",
    type: RequirementType.SALE,
    subType: PurchaseOrderTableTypes.RECEIVED_SALES,
  },
];

export default function Users() {
  const { t } = useTranslation();
  const { notification, message } = App.useApp();
  const token = useSelector((state: MainState) => state.user.token);
  const uid = useSelector((state: MainState) => state.user.uid);
  const [action, setAction] = useState<Action>(Action.ADD_USER);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [userData, setUserData] = useState<SubUserBase | null>(null);
  const [userDataEdit, setUserDataEdit] = useState<SubUserProfile | null>(null);

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
        setUserDataEdit(responseDataUser);
        console.log(responseDataUser, userDataEdit);
        handleOpenModal();
      }
    } else if (errorUser) {
      showNotification(notification, "error", errorMsgUser);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseDataUser, errorUser]);

  /** Funciones */

  async function setTableData() {
    try {
      let data: SubUserBase[] = [];
      if (responseData.data.length > 0) {
        data = responseData.data[0].auth_users.map((e: any) =>
          transformToSubUserBase(e)
        );
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
    console.log(action, user);
    setAction(action);
    switch (action) {
      case Action.EDIT_USER:
        setApiParamsUser({
          service: getSubUserService(user.uid),
          method: "get",
          token,
        });
        break;
      case Action.VIEW_REQUIREMENTS:
        setUserData(user);
        handleOpenModal();
        break;
      case Action.VIEW_OFFERS:
        setUserData(user);
        handleOpenModal();
        break;
      case Action.VIEW_PURCHASE_ORDERS:
        setUserData(user);
        handleOpenModal();
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
              tableContent: reqs,
            }}
            user={userData}
          />
        );
      case Action.VIEW_OFFERS:
        return (
          <SubUserTableModal
            content={{
              tableType: TableTypes.OFFER_SUBUSER,
              tableContent: offers,
            }}
            user={userData}
          />
        );
      case Action.VIEW_PURCHASE_ORDERS:
        return (
          <SubUserTableModal
            content={{
              tableType: TableTypes.PURCHASE_ORDER_SUBUSER,
              tableContent: purc,
            }}
            user={userData}
          />
        );
      default:
        return null;
    }
  }

  return (
    <>
      <NoContentModalContainer
        open={isOpenModal}
        width={
          action == Action.VIEW_REQUIREMENTS ||
          action == Action.VIEW_OFFERS ||
          action == Action.VIEW_PURCHASE_ORDERS
            ? 1100
            : 800
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
