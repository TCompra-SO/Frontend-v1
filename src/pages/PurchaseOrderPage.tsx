import { Col, Flex, Row } from "antd";
import { PurchaseOrder, TableRecordType } from "../models/MainInterfaces";
import {
  Action,
  PurchaseOrderState,
  RequirementType,
  TableTypes,
  UserTable,
} from "../utilities/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { lightColor, primaryColor, rowColor } from "../utilities/colors";
import { faPeopleCarryBox } from "@fortawesome/free-solid-svg-icons";
import Title from "antd/es/typography/Title";
import InputContainer from "../components/containers/InputContainer";
import { SearchOutlined } from "@ant-design/icons";
import GeneralTable from "../components/common/GeneralTable/GeneralTable";
import { useTranslation } from "react-i18next";
import { TableTypePurchaseOrder } from "../models/Interfaces";
import { useState } from "react";

const purchaseOrderList: PurchaseOrder[] = [
  {
    requirementTitle:
      "Liquido 10 Unidades de Teléfono inteligente Samsung Galaxy S20 Liquido 10 Unidades de Teléfono inteligente Samsung Galaxy S20",
    purchaseDate: new Date(),
    state: PurchaseOrderState.PENDING,
    type: RequirementType.GOOD,
    user: {
      uid: "user1",
      name: "Soluciones Online Soluciones Online Soluciones Online S. A. C.",
      email: "john.doejohn.doejohn.doejohn.doe@example.com",
      password: "password123",
      document: "123456789",
      userTable: UserTable.COMPANY,
      tenure: "Más de 10 años",
      customerScore: 3.5,
      sellerScore: 1.5,
      address: "Calle San Agustin 107 - Cercado - Arequipa",
    },
    subUser: {
      uid: "user1",
      name: "Javier Alberto Solís Calcina Javier Alberto Solís Calcina",
      email: "javiersolis@example.com",
      password: "password123",
      document: "123456789",
      userTable: UserTable.COMPANY,
      customerScore: 0,
      sellerScore: 0,
      address: "Calle San Agustin 107 - Cercado - Arequipa",
    },
  },
  {
    requirementTitle:
      "Liquido 10 Unidades de Teléfono inteligente Samsung Galaxy S20 Liquido 10 Unidades de Teléfono inteligente Samsung Galaxy S20",
    purchaseDate: new Date(),
    state: PurchaseOrderState.CANCELED,
    type: RequirementType.GOOD,
    user: {
      uid: "user1",
      name: "Soluciones Online Soluciones Online Soluciones Online S. A. C.",
      email: "john.doejohn.doejohn.doejohn.doe@example.com",
      password: "password123",
      document: "123456789",
      userTable: UserTable.COMPANY,
      tenure: "Más de 10 años",
      customerScore: 3.5,
      sellerScore: 1.5,
      address: "Calle San Agustin 107 - Cercado - Arequipa",
    },
  },
];
export default function PurchaseOrderPage() {
  const { t } = useTranslation();
  const [tableContent, setTableContent] = useState<TableTypePurchaseOrder>({
    type: TableTypes.PURCHASE_ORDER,
    data: purchaseOrderList,
    hiddenColumns: [],
    nameColumnHeader: t("offer") + "s",
    onButtonClick: handleOnButtonClick,
  });

  function handleOnButtonClick(action: Action, purchaseOrder: PurchaseOrder) {
    console.log(purchaseOrder);
  }

  return (
    <>
      <div className="table-container-page">
        <Flex
          vertical
          justify="center"
          align="center"
          className="table-container"
          gap="30px"
        >
          <Row style={{ width: "100%" }} gutter={[10, 18]}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Flex align="center">
                <FontAwesomeIcon
                  color={primaryColor}
                  style={{
                    borderRadius: "20px",
                    backgroundColor: lightColor,
                    padding: "10px",
                    marginRight: "8px",
                    fontSize: "1.2em",
                  }}
                  icon={faPeopleCarryBox}
                ></FontAwesomeIcon>
                <Title level={3} style={{ margin: "0" }}>
                  {`${t("listOf")} ${t("goods")}`}
                  {/* r3v */}
                </Title>
              </Flex>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <InputContainer
                placeholder={`${t("search")}...`}
                prefix={<SearchOutlined />}
                style={{
                  background: rowColor,
                  border: "0",
                }}
              />
            </Col>
          </Row>
          <GeneralTable content={tableContent} />
        </Flex>
      </div>
    </>
  );
}
