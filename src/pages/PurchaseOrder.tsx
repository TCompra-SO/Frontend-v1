import { Col, Row } from "antd";
import { PurchaseOrder } from "../models/MainInterfaces";
import {
  Action,
  PurchaseOrderState,
  RequirementType,
  TableTypes,
  UserTable,
} from "../utilities/types";
import InputContainer from "../components/containers/InputContainer";
import { SearchOutlined } from "@ant-design/icons";
import GeneralTable from "../components/common/GeneralTable/GeneralTable";
import { useTranslation } from "react-i18next";
import { TableTypePurchaseOrder } from "../models/Interfaces";
import { ChangeEvent, useState } from "react";
import ContentHeader from "../components/common/ContentHeader";
import ModalContainer from "../components/containers/ModalContainer";
import TablePageContent from "../components/section/table-page/TablePageContent";

const purchaseOrderList: PurchaseOrder[] = [
  {
    requirementTitle:
      "Liquido 10 Unidades de Teléfono inteligente Samsung Galaxy S20 Liquido 10 Unidades de Teléfono inteligente Samsung Galaxy S20",
    purchaseDate: "2024-10-12T16:36:45.673Z",
    state: PurchaseOrderState.PENDING,
    type: RequirementType.GOOD,
    user: {
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
    subUser: {
      uid: "subuser1",
      name: "Javier Req Solís Calcina Javier Alberto Solís Calcina",
      email: "javiersolis@example.com",
      document: "123456789",
      userTable: UserTable.COMPANY,
      customerScore: 0,
      sellerScore: 0,
      address: "Calle San Agustin 107 - Cercado - Arequipa",
      phone: "998989898",
      userType: 0,
    },
    key: "111",
  },
  {
    requirementTitle:
      "Liquido 10 Unidades de Teléfono inteligente Samsung Galaxy S20 Liquido 10 Unidades de Teléfono inteligente Samsung Galaxy S20",
    purchaseDate: "2024-10-12T16:36:45.673Z",
    state: PurchaseOrderState.CANCELED,
    type: RequirementType.GOOD,
    user: {
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
    key: "ssssssssss",
  },
];

export default function PurchaseOrder() {
  const { t } = useTranslation();
  const [tableContent] = useState<TableTypePurchaseOrder>({
    type: TableTypes.PURCHASE_ORDER,
    data: purchaseOrderList,
    hiddenColumns: [],
    nameColumnHeader: t("offer") + "s",
    onButtonClick: handleOnButtonClick,
  });

  function handleOnButtonClick(_: Action, purchaseOrder: PurchaseOrder) {
    console.log(purchaseOrder);
  }

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    console.log(e.target.value);
  }

  return (
    <>
      {/* <ModalContainer
        destroyOnClose
        content={dataModal}
        isOpen={isOpenModal}
        onClose={handleCloseModal}
        style={mainModalScrollStyle}
      /> */}
      <TablePageContent
        title={t("myPurchaseOrders")}
        titleIcon={<i className="fa-regular fa-dolly c-default"></i>}
        subtitle={`${t("listOf")} ${t("purchaseOrders")}`}
        subtitleIcon={<i className="fa-light fa-person-dolly sub-icon"></i>}
        table={tableContent}
        onSearch={handleSearch}
      />
    </>
  );
}
