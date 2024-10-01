import { ChangeEvent, useEffect, useState } from "react";
import NoContentModalContainer from "../components/containers/NoContentModalContainer";
import TablePageContent from "../components/section/table-page/TablePageContent";
import AddUserModal from "../components/section/users/addUser/AddUserModal";
import { useTranslation } from "react-i18next";
import { Action, TableTypes, UserTable } from "../utilities/types";
import { TableTypeUsers, useApiParams } from "../models/Interfaces";
import { User } from "../models/MainInterfaces";
import { mainModalScrollStyle } from "../utilities/globals";
import ButtonContainer from "../components/containers/ButtonContainer";
import useApi from "../hooks/useApi";
import { getSubUserService } from "../services/subUserService";
import { MainState } from "../models/Redux";
import { useSelector } from "react-redux";
import { equalServices } from "../utilities/globalFunctions";
import showNotification from "../utilities/notification/showNotification";
import { App } from "antd";
import { SubUserProfile } from "../models/Responses";

const users: SubUserProfile[] = [
  {
    uid: "user1",
    name: "Soluciones Online Soluciones Online Soluciones Online S. A. C.",
    email: "john.doejohn.doejohn.doejohn.doe@example.com",
    document: "123456789",
    // userTable: UserTable.COMPANY,
    // tenure: 2,
    // customerScore: 3.5,
    // sellerScore: 1.5,
    address: "Calle San Agustin 107 - Cercado - Arequipa",
    // userType: 0,
    phone: "90909090",
    cityID: 1,
    companyID: "xxxxxxxxxxxxx",
    createdAt: "2024-09-12T20:36:45.673Z",
    numGoods: 10,
    numServices: 2,
    numSales: 5,
  },
  {
    uid: "user2",
    name: "Soluciones Online Soluciones Online Soluciones Online S. A. C.",
    email: "aaaaaaaaa@example.com",
    document: "123456789",
    // userTable: UserTable.COMPANY,
    // tenure: 2,
    // customerScore: 3.5,
    // sellerScore: 1.5,
    address: "Calle San Agustin 107 - Cercado - Arequipa",
    // userType: 0,
    phone: "90909090",
    cityID: 1,
    companyID: "xxxxxxxxxxxxx",
    createdAt: "2024-10-12T20:36:45.673Z",
    numGoods: 23,
    numServices: 90,
    numSales: 235,
  },
  {
    uid: "user3",
    name: "Soluciones Online Soluciones Online Soluciones Online S. A. C.",
    email: "mmmmmmmm@example.com",
    document: "123456789",
    // userTable: UserTable.COMPANY,
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
  },
  {
    uid: "user4",
    name: "aaaaaaaaaaaaaa S. A. C.",
    email: "ccccccccc@example.com",
    document: "123456789",
    // userTable: UserTable.COMPANY,
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
  },
];

export default function Users() {
  const { t } = useTranslation();
  const { notification } = App.useApp();
  const token = useSelector((state: MainState) => state.user.token);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [userData, setUserData] = useState<SubUserProfile | null>(null);
  const [tableContent] = useState<TableTypeUsers>({
    type: TableTypes.USERS,
    data: users,
    hiddenColumns: [],
    nameColumnHeader: t("user"),
    onButtonClick: handleOnActionClick,
  });
  const [apiParams, setApiParams] = useState<useApiParams>({
    service: null,
    method: "get",
    // token,
  });
  const { responseData, error, errorMsg, fetchData, loading } = useApi({
    service: apiParams.service,
    method: apiParams.method,
    token: apiParams.token,
  });

  useEffect(() => {
    if (apiParams.service) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiParams]);

  useEffect(() => {
    if (responseData) {
      if (equalServices(apiParams.service, getSubUserService(""))) {
        setUserData(responseData.res.profile);
        console.log(responseData, userData);
        setIsOpenModal(true);
      }
    } else if (error) {
      showNotification(notification, "error", errorMsg);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData, error]);

  function handleCloseModal() {
    setIsOpenModal(false);
  }

  function handleOpenModal() {
    // setIsOpenModal(true);

    setApiParams({
      service: getSubUserService("kMHAU9G3GFpDreBIZz67"),
      method: "get",
      token,
    });
  }

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    console.log(e.target.value);
  }

  function handleOnActionClick(action: Action, user: User) {
    console.log(action, user);
  }

  return (
    <>
      <NoContentModalContainer
        open={isOpenModal}
        width={800}
        style={mainModalScrollStyle}
        onClose={handleCloseModal}
      >
        <AddUserModal
          onClose={handleCloseModal}
          edit={true}
          userData={userData}
        />
      </NoContentModalContainer>
      <TablePageContent
        title={t("users")}
        titleIcon={<i className="fa-regular fa-users c-default"></i>}
        table={tableContent}
        onSearch={handleSearch}
        additionalContentHeader={
          <div>
            <ButtonContainer
              common
              className="btn btn-default"
              onClick={handleOpenModal}
            >
              <i className="fa-regular fa-user-plus"></i> {t("addUser")}
            </ButtonContainer>
          </div>
        }
      />
    </>
  );
}
