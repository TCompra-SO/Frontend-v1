import { useTranslation } from "react-i18next";
import {
  Action,
  ModalTypes,
  PurchaseOrderTableTypes,
  RequirementType,
  TableTypes,
} from "../../../../utilities/types";
import { SubUserBase } from "../../../../models/Responses";
import {
  Offer,
  OfferItemSubUser,
  PurchaseOrderItemSubUser,
  RequirementItemSubUser,
} from "../../../../models/MainInterfaces";
import GeneralTable from "../../../common/GeneralTable/GeneralTable";
import { useContext, useEffect, useState } from "react";
import { LoadingDataContext } from "../../../../contexts/loadingDataContext";
import { ModalContent, useApiParams } from "../../../../models/Interfaces";
import useApi from "../../../../hooks/useApi";
import showNotification, {
  showLoadingMessage,
} from "../../../../utilities/notification/showNotification";
import { App, Tabs } from "antd";
import makeRequest, {
  openPurchaseOrderPdf,
} from "../../../../utilities/globalFunctions";
import { getPurchaseOrderPDFService } from "../../../../services/requests/purchaseOrderService";
import { getOffersByRequirementIdService } from "../../../../services/requests/offerService";
import ModalContainer from "../../../containers/ModalContainer";
import { getRequirementById } from "../../../../services/complete/general";
import { getBaseDataUserService } from "../../../../services/requests/authService";
import {
  transformToBaseUser,
  transformToOffer,
} from "../../../../utilities/transform";
import { mainModalScrollStyle } from "../../../../utilities/globals";
import { useNavigate } from "react-router-dom";
import { pageRoutes } from "../../../../utilities/routes";

interface SubUserTableModalProps {
  user: SubUserBase | null;
  content:
    | {
        tableType: TableTypes.REQUIREMENT_SUBUSER;
        tableContent: RequirementItemSubUser[];
      }
    | {
        tableType: TableTypes.OFFER_SUBUSER;
        tableContent: OfferItemSubUser[];
      }
    | {
        tableType: TableTypes.PURCHASE_ORDER_SUBUSER;
        tableContent: PurchaseOrderItemSubUser[];
      };
  onTabChange: (tabId: string) => void;
  loading: boolean;
  tableType: TableTypes;
}

export default function SubUserTableModal(props: SubUserTableModalProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { notification, message } = App.useApp();
  const [currentPurchaseOrder, setCurrentPurchaseOrder] =
    useState<PurchaseOrderItemSubUser | null>(null);
  const {
    updateSubUserPurchaseOrdersLoadingPdf,
    updateSubUserRequirementsViewOffers,
  } = useContext(LoadingDataContext);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [dataModal, setDataModal] = useState<ModalContent>({
    type: ModalTypes.NONE,
    data: {},
  });

  /** Tabs */

  const reqOfferTabs = [
    { key: RequirementType.GOOD.toString(), label: t("goods") },
    { key: RequirementType.SERVICE.toString(), label: t("services") },
    { key: RequirementType.SALE.toString(), label: t("sales") },
  ];

  const purchaseOrderTabs = [
    { key: PurchaseOrderTableTypes.ISSUED.toString(), label: t("issuedPl") },
    {
      key: PurchaseOrderTableTypes.RECEIVED.toString(),
      label: t("receivedPl"),
    },
    {
      key: PurchaseOrderTableTypes.ISSUED_SALES.toString(),
      label: `${t("issuedPl")} - ${t("salesAbbrev")}`,
    },
    {
      key: PurchaseOrderTableTypes.RECEIVED_SALES.toString(),
      label: `${t("receivedPl")} - ${t("salesAbbrev")}`,
    },
  ];

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
    updateSubUserPurchaseOrdersLoadingPdf(loadingPdf);
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

  /* Para ver historial */

  const [apiParamsHist, setApiParamsHist] = useState<useApiParams>({
    service: null,
    method: "get",
  });

  const {
    loading: loadingHist,
    responseData: responseDataHist,
    error: errorHist,
    errorMsg: errorMsgHist,
    fetchData: fetchDataHist,
  } = useApi({
    service: apiParamsHist.service,
    method: apiParamsHist.method,
    dataToSend: apiParamsHist.dataToSend,
  });

  useEffect(() => {
    updateSubUserRequirementsViewOffers(loadingHist);
    showLoadingMessage(message, loadingHist);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingHist]);

  useEffect(() => {
    if (apiParamsHist.service) fetchDataHist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiParamsHist]);

  useEffect(() => {
    if (responseDataHist) {
      openDetailedRequirement(responseDataHist);
    } else if (errorHist) {
      showNotification(notification, "error", errorMsgHist);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseDataHist, errorHist]);

  /** Funciones */

  async function openDetailedRequirement(responseData: any) {
    showLoadingMessage(message, true);
    updateSubUserRequirementsViewOffers(true);
    if (
      currentPurchaseOrder &&
      responseData.data &&
      Array.isArray(responseData.data)
    ) {
      const { requirement } = await getRequirementById(
        currentPurchaseOrder.requirementId,
        currentPurchaseOrder.type
      );
      if (requirement) {
        const offerArray: Offer[] = await Promise.all(
          responseData.data.map(async (item: any) => {
            const { responseData }: any = await makeRequest({
              service: getBaseDataUserService(item.userID),
              method: "get",
            });
            const { user, subUser } = transformToBaseUser(responseData.data[0]);
            return subUser
              ? transformToOffer(item, currentPurchaseOrder.type, subUser, user)
              : transformToOffer(item, currentPurchaseOrder.type, user);
          })
        );
        setDataModal({
          type: ModalTypes.DETAILED_REQUIREMENT,
          data: {
            offerList: offerArray,
            requirement: requirement,
            forPurchaseOrder: true,
            filters: currentPurchaseOrder.filters,
          },
        });
        setIsOpenModal(true);
      } else showNotification(notification, "error", t("errorOccurred"));
    } else showNotification(notification, "error", t("errorOccurred"));
    showLoadingMessage(message, false);
    updateSubUserRequirementsViewOffers(false);
  }

  function handleOnButtonClick(action: Action, data: any) {
    switch (action) {
      case Action.DOWNLOAD_PURCHASE_ORDER: {
        const po = data as PurchaseOrderItemSubUser;
        if (!loadingPdf)
          setApiParamsPdf({
            service: getPurchaseOrderPDFService(po.key),
            method: "get",
          });
        break;
      }
      case Action.VIEW_PURCHASE_ORDER: {
        const po = data as PurchaseOrderItemSubUser;
        setCurrentPurchaseOrder(po);
        setApiParamsHist({
          service: getOffersByRequirementIdService(po.requirementId),
          method: "get",
        });
        break;
      }
      case Action.VIEW_REQUIREMENT: {
        navigate(
          `${pageRoutes.productDetail}/${(data as RequirementItemSubUser).key}`
        );
      }
    }
  }

  return (
    <>
      <ModalContainer
        destroyOnClose
        content={dataModal}
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        style={mainModalScrollStyle}
      />
      <div className="modal-card">
        <div className="t-flex t-wrap mr-sub-2">
          <i className="fa-regular fa-dolly sub-icon m-0"></i>
          <div className="sub-titulo sub-calificar">
            <div>
              {props.content.tableType == TableTypes.REQUIREMENT_SUBUSER && (
                <>{t("requirements")}</>
              )}
              {props.content.tableType == TableTypes.OFFER_SUBUSER && (
                <>{t("offers")}</>
              )}
              {props.content.tableType == TableTypes.PURCHASE_ORDER_SUBUSER && (
                <>{t("purchaseOrders")}</>
              )}
            </div>
            <div className="calificar-detalle">{props.user?.name}</div>
            <div className="calificar-detalle">
              {t("quantity")}: {props.user?.numGoods}
            </div>
          </div>
        </div>
        <Tabs
          defaultActiveKey={
            props.tableType == TableTypes.REQUIREMENT_SUBUSER ||
            props.tableType == TableTypes.OFFER_SUBUSER
              ? RequirementType.GOOD.toString()
              : PurchaseOrderTableTypes.ISSUED.toString()
          }
          onChange={props.onTabChange}
          type="card"
          items={
            props.tableType == TableTypes.REQUIREMENT_SUBUSER ||
            props.tableType == TableTypes.OFFER_SUBUSER
              ? reqOfferTabs
              : purchaseOrderTabs
          }
        />
        <div className="detalle-oferta">
          {props.content.tableType == TableTypes.REQUIREMENT_SUBUSER && (
            <div className="card-white" style={{ padding: 0 }}>
              <div className="table-responsive">
                <GeneralTable
                  content={{
                    type: props.content.tableType,
                    data: props.content.tableContent,
                    hiddenColumns: [],
                    nameColumnHeader: t("requirements"),
                    onButtonClick: handleOnButtonClick,
                  }}
                />
              </div>
            </div>
          )}
          {props.content.tableType == TableTypes.OFFER_SUBUSER && (
            <div className="card-white" style={{ padding: 0 }}>
              <div className="table-responsive">
                <GeneralTable
                  content={{
                    type: props.content.tableType,
                    data: props.content.tableContent,
                    hiddenColumns: [],
                    nameColumnHeader: t("offers"),
                    onButtonClick: handleOnButtonClick,
                  }}
                />
              </div>
            </div>
          )}
          {props.content.tableType == TableTypes.PURCHASE_ORDER_SUBUSER && (
            <div className="card-white" style={{ padding: 0 }}>
              <div className="table-responsive">
                <GeneralTable
                  content={{
                    type: props.content.tableType,
                    data: props.content.tableContent,
                    hiddenColumns: [],
                    nameColumnHeader: t("purchaseOrders"),
                    onButtonClick: handleOnButtonClick,
                  }}
                  loading={props.loading}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
