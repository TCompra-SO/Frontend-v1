import { ChangeEvent, useState } from "react";
import NoContentModalContainer from "../components/containers/NoContentModalContainer";
import TablePageContent from "../components/section/table-page/TablePageContent";
import AddUserModal from "../components/section/users/addUser/AddUserModal";
import { useTranslation } from "react-i18next";
import { Action, TableTypes } from "../utilities/types";
import { TableTypeUsers } from "../models/Interfaces";
import { User } from "../models/MainInterfaces";
import { mainModalScrollStyle } from "../utilities/globals";
import ButtonContainer from "../components/containers/ButtonContainer";

export default function Users() {
  const { t } = useTranslation();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [tableContent] = useState<TableTypeUsers>({
    type: TableTypes.USERS,
    data: [],
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
        <AddUserModal />
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
