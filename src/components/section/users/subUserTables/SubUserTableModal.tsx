import { useTranslation } from "react-i18next";
import {
  Action,
  Filters,
  ModalTypes,
  OnChangePageAndPageSizeType,
  OrderTableTypes,
  RequirementType,
  TableTypes,
} from "../../../../utilities/types";
import {
  OfferItemSubUser,
  PurchaseOrderItemSubUser,
  RequirementItemSubUser,
  SubUserBase,
} from "../../../../models/MainInterfaces";
import GeneralTable from "../../../common/GeneralTable/GeneralTable";
import { useContext, useEffect, useState } from "react";
import { LoadingDataContext } from "../../../../contexts/LoadingDataContext";
import { ModalContent, useApiParams } from "../../../../models/Interfaces";
import useApi from "../../../../hooks/useApi";
import {
  getGetOrderPDFService,
  getProductDetailRoute,
  openPurchaseOrderPdf,
} from "../../../../utilities/globalFunctions";
import ModalContainer from "../../../containers/ModalContainer";
import {
  mainModalScrollStyle,
  noPaginationPageSize,
} from "../../../../utilities/globals";
import { useNavigate } from "react-router-dom";
import ButtonContainer from "../../../containers/ButtonContainer";
import { useGetOffersByRequirementId } from "../../../../hooks/requirementHooks";
import useShowNotification, {
  useShowLoadingMessage,
} from "../../../../hooks/utilHooks";
import { FieldSort } from "../../../../models/Requests";

interface SubUserTableModalProps {
  user: SubUserBase | null;
  content:
    | {
        tableType: TableTypes.REQUIREMENT_SUBUSER;
        tableContent: RequirementItemSubUser[];
        total?: number;
      }
    | {
        tableType: TableTypes.OFFER_SUBUSER;
        tableContent: OfferItemSubUser[];
        total?: number;
      }
    | {
        tableType: TableTypes.PURCHASE_ORDER_SUBUSER;
        tableContent: PurchaseOrderItemSubUser[];
        subType: OrderTableTypes;
        total?: number;
      }
    | {
        tableType: TableTypes.SALES_ORDER_SUBUSER;
        tableContent: PurchaseOrderItemSubUser[];
        subType: OrderTableTypes;
        total?: number;
      };
  onTabChange: (tabId: RequirementType | OrderTableTypes) => void;
  loading: boolean | undefined;
  tableType: TableTypes;
  onChangePageAndPageSize?: OnChangePageAndPageSizeType;
  currentPage: number;
  currentPageSize: number;
  fieldSort: FieldSort | undefined;
  filteredInfo: Filters | undefined;
}

export default function SubUserTableModal(props: SubUserTableModalProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { showLoadingMessage } = useShowLoadingMessage();
  const { showNotification } = useShowNotification();
  const [subType, setSubType] = useState<RequirementType | OrderTableTypes>(
    RequirementType.GOOD
  );
  const { getOffersByRequirementId, modalDataOffersByRequirementId } =
    useGetOffersByRequirementId();
  const { updateSubUserPurchaseOrdersLoadingPdf } =
    useContext(LoadingDataContext);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [dataModal, setDataModal] = useState<ModalContent>({
    type: ModalTypes.NONE,
    data: {},
    action: Action.NONE,
  });

  useEffect(() => {
    return () => {
      updateSubUserPurchaseOrdersLoadingPdf(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** Determinar subType */

  useEffect(() => {
    if (
      props.tableType == TableTypes.SALES_ORDER_SUBUSER ||
      props.tableType == TableTypes.PURCHASE_ORDER_SUBUSER
    )
      setSubType(OrderTableTypes.ISSUED);
    else setSubType(RequirementType.GOOD);
  }, [props.tableType]);

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
    showLoadingMessage(loadingPdf);
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
      showNotification("error", errorMsgPdf);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseDataPdf, errorPdf]);

  /** Para mostrar modales */

  useEffect(() => {
    if (modalDataOffersByRequirementId.type !== ModalTypes.NONE) {
      setDataModal(modalDataOffersByRequirementId);
      setIsOpenModal(true);
    }
  }, [modalDataOffersByRequirementId]);

  /** Funciones */

  function handleOnButtonClick(action: Action, data: any) {
    switch (action) {
      case Action.DOWNLOAD_PURCHASE_ORDER: {
        const po = data as PurchaseOrderItemSubUser;
        if (!loadingPdf)
          setApiParamsPdf({
            service: getGetOrderPDFService(po.type)?.(po.key),
            method: "get",
          });
        break;
      }
      case Action.VIEW_PURCHASE_ORDER: {
        const po = data as PurchaseOrderItemSubUser;
        getOffersByRequirementId(
          TableTypes.PURCHASE_ORDER_SUBUSER,
          po.requirementId,
          po.type,
          true,
          1,
          noPaginationPageSize,
          action,
          undefined,
          po.filters
        );
        break;
      }
      case Action.VIEW_REQUIREMENT: {
        const dataReq = data as RequirementItemSubUser;
        navigate(getProductDetailRoute(dataReq.key, dataReq.type));
      }
    }
  }

  function changeSubType(newSubType: RequirementType | OrderTableTypes) {
    if (subType != newSubType) {
      setSubType(newSubType);
      props.onTabChange(newSubType);
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
              {props.tableType == TableTypes.REQUIREMENT_SUBUSER && (
                <>{t("requirements")}</>
              )}
              {props.tableType == TableTypes.OFFER_SUBUSER && (
                <>{t("offers")}</>
              )}
              {props.tableType == TableTypes.PURCHASE_ORDER_SUBUSER && (
                <>{t("purchaseOrders")}</>
              )}
              {props.tableType == TableTypes.SALES_ORDER_SUBUSER && (
                <>{t("salesOrders")}</>
              )}
            </div>
            <div className="calificar-detalle">{props.user?.name}</div>
            <div className="calificar-detalle">
              {t("quantity")}: {props.user?.numGoods}
            </div>
          </div>
        </div>
        <div className="t-flex mr-sub">
          {props.tableType == TableTypes.OFFER_SUBUSER ||
          props.tableType == TableTypes.REQUIREMENT_SUBUSER ? (
            <>
              <ButtonContainer
                common
                className={`btn btn-grey wd-33 ${
                  subType == RequirementType.GOOD ? "active" : ""
                }`}
                onClick={() => {
                  changeSubType(RequirementType.GOOD);
                }}
              >
                <i className="fa-regular fa-dolly"></i>{" "}
                <span className="req-btn-info">{t("goods")}</span>
              </ButtonContainer>
              <ButtonContainer
                common
                className={`btn btn-grey wd-33 ${
                  subType == RequirementType.SERVICE ? "active" : ""
                }`}
                onClick={() => {
                  changeSubType(RequirementType.SERVICE);
                }}
              >
                <i className="fa-regular fa-hand-holding-magic"></i>{" "}
                <span className="req-btn-info">{t("services")}</span>
              </ButtonContainer>
              <ButtonContainer
                common
                className={`btn btn-grey wd-33 ${
                  subType == RequirementType.SALE ? "active" : ""
                }`}
                onClick={() => {
                  changeSubType(RequirementType.SALE);
                }}
              >
                <i className="fa-regular fa-basket-shopping"></i>{" "}
                <span className="req-btn-info">{t("sales")}</span>
              </ButtonContainer>
            </>
          ) : (
            <>
              <ButtonContainer
                common
                className={`btn btn-grey wd-50 ${
                  subType == OrderTableTypes.ISSUED ? "active" : ""
                }`}
                onClick={() => {
                  changeSubType(OrderTableTypes.ISSUED);
                }}
              >
                <i className="fa-regular fa-hand-holding-magic"></i>{" "}
                <span className="req-btn-info">{t("issuedPl")}</span>
              </ButtonContainer>
              <ButtonContainer
                common
                className={`btn btn-grey wd-50 ${
                  subType == OrderTableTypes.RECEIVED ? "active" : ""
                }`}
                onClick={() => {
                  changeSubType(OrderTableTypes.RECEIVED);
                }}
              >
                <i className="fa-regular fa-basket-shopping"></i>{" "}
                <span className="req-btn-info">{t("receivedPl")}</span>
              </ButtonContainer>
            </>
          )}
        </div>
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
                    total: props.content.total,
                    page: props.currentPage,
                    pageSize: props.currentPageSize,
                    fieldSort: props.fieldSort,
                    filteredInfo: props.filteredInfo,
                  }}
                  onChangePageAndPageSize={props.onChangePageAndPageSize}
                  loading={props.loading}
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
                    total: props.content.total,
                    page: props.currentPage,
                    pageSize: props.currentPageSize,
                    fieldSort: props.fieldSort,
                    filteredInfo: props.filteredInfo,
                  }}
                  onChangePageAndPageSize={props.onChangePageAndPageSize}
                  loading={props.loading}
                />
              </div>
            </div>
          )}
          {(props.content.tableType == TableTypes.PURCHASE_ORDER_SUBUSER ||
            props.content.tableType == TableTypes.SALES_ORDER_SUBUSER) && (
            <div className="card-white" style={{ padding: 0 }}>
              <div className="table-responsive">
                <GeneralTable
                  content={{
                    type: props.content.tableType,
                    data: props.content.tableContent,
                    hiddenColumns: [],
                    nameColumnHeader: t("purchaseOrders"),
                    onButtonClick: handleOnButtonClick,
                    subType: props.content.subType,
                    total: props.content.total,
                    page: props.currentPage,
                    pageSize: props.currentPageSize,
                    fieldSort: props.fieldSort,
                    filteredInfo: props.filteredInfo,
                  }}
                  onChangePageAndPageSize={props.onChangePageAndPageSize}
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
