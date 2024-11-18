import { useTranslation } from "react-i18next";
import TablePageContent from "../components/section/table-page/TablePageContent";
import { ChangeEvent, useEffect, useState } from "react";
import { TableTypeAllPurchaseOrders, useApiParams } from "../models/Interfaces";
import {
  Action,
  PurchaseOrderTableTypes,
  TableTypes,
} from "../utilities/types";
import { BasicPurchaseOrder } from "../models/MainInterfaces";
import {
  getLabelFromPurchaseOrderType,
  getPurchaseOrderType,
} from "../utilities/globalFunctions";
import { useLocation } from "react-router-dom";
import { App } from "antd";
import useApi from "../hooks/useApi";
import { MainState } from "../models/Redux";
import { useSelector } from "react-redux";
import {
  getPurchaseOrdersByClientEntityService,
  getPurchaseOrdersByProviderEntityService,
} from "../services/requests/purchaseOrderService";
import showNotification from "../utilities/notification/showNotification";
import { transformToPurchaseOrder } from "../utilities/transform";

export default function AllOffers() {
  const { t } = useTranslation();
  const location = useLocation();
  const uid = useSelector((state: MainState) => state.user.uid);
  const role = useSelector((state: MainState) => state.user.typeID);
  const { notification } = App.useApp();
  const [type, setType] = useState(getPurchaseOrderType(location.pathname));
  const [tableContent, setTableContent] = useState<TableTypeAllPurchaseOrders>({
    type: TableTypes.ALL_PURCHASE_ORDERS,
    data: [],
    subType: PurchaseOrderTableTypes.ISSUED,
    hiddenColumns: [],
    nameColumnHeader: t("user"),
    onButtonClick: handleOnButtonClick,
  });

  useEffect(() => {
    setType(getPurchaseOrderType(location.pathname));
  }, [location]);

  /** Obtener datos de tabla */

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
          service: getPurchaseOrdersByClientEntityService(uid, role),
          method: "get",
        });
        break;
      case PurchaseOrderTableTypes.RECEIVED:
        setApiParams({
          service: getPurchaseOrdersByProviderEntityService(uid, role),
          method: "get",
        });
        break;
      case PurchaseOrderTableTypes.ISSUED_SALES:
        setApiParams({
          service: null,
          method: "get",
        });
        break;
      case PurchaseOrderTableTypes.RECEIVED_SALES:
        setApiParams({
          service: null,
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

  /** Funciones */

  async function setTableData() {
    if (responseData) {
      const data = responseData.data.map((po: any) =>
        transformToPurchaseOrder(po)
      );
      console.log(data);
      setTableContent({
        type: TableTypes.ALL_PURCHASE_ORDERS,
        data,
        subType: type,
        hiddenColumns: [],
        nameColumnHeader: t("user"),
        onButtonClick: handleOnButtonClick,
      });
    } else if (error) {
      showNotification(notification, "error", errorMsg);
    }
  }

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    console.log(e.target.value);
  }

  function handleOnButtonClick(
    action: Action,
    purchaseOrder: BasicPurchaseOrder
  ) {}

  return (
    <TablePageContent
      title={t("purchaseOrders")}
      titleIcon={<i className="fa-regular fa-dolly c-default"></i>}
      subtitle={`${t("listOf")} ${t(
        getLabelFromPurchaseOrderType(type, true, false)
      )}`}
      subtitleIcon={<i className="fa-light fa-person-dolly sub-icon"></i>}
      table={tableContent}
      onSearch={handleSearch}
      loading={loading}
    />
  );
}
