import { ChangeEvent, useState } from "react";
import NoContentModalContainer from "../components/containers/NoContentModalContainer";
import TablePageContent from "../components/section/table-page/TablePageContent";
import AddUserModal from "../components/section/users/addUser/AddUserModal";
import { useTranslation } from "react-i18next";
import { Action, TableTypes, UserTable } from "../utilities/types";
import { TableTypeUsers } from "../models/Interfaces";
import { User } from "../models/MainInterfaces";
import { mainModalScrollStyle } from "../utilities/globals";
import ButtonContainer from "../components/containers/ButtonContainer";

const users: User[] = [
  {
    uid: "user1",
    name: "Soluciones Online Soluciones Online Soluciones Online S. A. C.",
    email: "john.doejohn.doejohn.doejohn.doe@example.com",
    document: "123456789",
    userTable: UserTable.COMPANY,
    tenure: 2,
    customerScore: 3.5,
    sellerScore: 1.5,
    address: "Calle San Agustin 107 - Cercado - Arequipa",
    userType: 0,
    phone: "90909090",
  },
  {
    uid: "user2",
    name: "Soluciones Online Soluciones Online Soluciones Online S. A. C.",
    email: "john.doejohn.doejohn.doejohn.doe@example.com",
    document: "123456789",
    userTable: UserTable.COMPANY,
    tenure: 2,
    customerScore: 3.5,
    sellerScore: 1.5,
    address: "Calle San Agustin 107 - Cercado - Arequipa",
    userType: 0,
    phone: "90909090",
  },
  {
    uid: "user3",
    name: "Soluciones Online Soluciones Online Soluciones Online S. A. C.",
    email: "john.doejohn.doejohn.doejohn.doe@example.com",
    document: "123456789",
    userTable: UserTable.COMPANY,
    tenure: 2,
    customerScore: 3.5,
    sellerScore: 1.5,
    address: "Calle San Agustin 107 - Cercado - Arequipa",
    userType: 0,
    phone: "90909090",
  },
  {
    uid: "user4",
    name: "Soluciones Online Soluciones Online Soluciones Online S. A. C.",
    email: "john.doejohn.doejohn.doejohn.doe@example.com",
    document: "123456789",
    userTable: UserTable.COMPANY,
    tenure: 2,
    customerScore: 3.5,
    sellerScore: 1.5,
    address: "Calle San Agustin 107 - Cercado - Arequipa",
    userType: 0,
    phone: "90909090",
  },
];

export default function Users() {
  const { t } = useTranslation();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [tableContent] = useState<TableTypeUsers>({
    type: TableTypes.USERS,
    data: users,
    hiddenColumns: [],
    nameColumnHeader: t("user"),
    onButtonClick: handleOnActionClick,
  });

  function handleCloseModal() {
    setIsOpenModal(false);
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
        <AddUserModal onClose={handleCloseModal} edit={true} />
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
              onClick={() => setIsOpenModal(true)}
            >
              <i className="fa-regular fa-user-plus"></i> {t("addUser")}
            </ButtonContainer>
          </div>
        }
      />
    </>
  );
}
