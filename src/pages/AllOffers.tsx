import { useTranslation } from "react-i18next";
import TablePageContent from "../components/section/table-page/TablePageContent";
import { ChangeEvent, useEffect, useState } from "react";
import {
  ModalContent,
  TableTypeAllOffers,
  useApiParams,
} from "../models/Interfaces";
import {
  Action,
  ModalTypes,
  OnChangePageAndPageSizeTypeParams,
  TableTypes,
} from "../utilities/types";
import { BaseUser, Offer } from "../models/MainInterfaces";
import makeRequest, {
  getLabelFromRequirementType,
  getRouteType,
} from "../utilities/globalFunctions";
import { useLocation } from "react-router-dom";
import useApi from "../hooks/useApi";
import { getOffersByEntityService } from "../services/requests/offerService";
import { useSelector } from "react-redux";
import { MainState } from "../models/Redux";
import {
  transformToBaseUser,
  transformToOfferFromGetOffersByEntityOrSubUser,
} from "../utilities/transform";
import { getBaseDataUserService } from "../services/requests/authService";
import { mainModalScrollStyle, pageSizeOptionsSt } from "../utilities/globals";
import { useShowDetailOffer } from "../hooks/requirementHook";
import ModalContainer from "../components/containers/ModalContainer";
import useShowNotification from "../hooks/utilHook";

export default function AllOffers() {
  const { t } = useTranslation();
  const location = useLocation();
  const { showNotification } = useShowNotification();
  const mainDataUser = useSelector((state: MainState) => state.mainUser);
  const dataUser = useSelector((state: MainState) => state.user);
  const { getOfferDetail, modalDataOfferDetail } = useShowDetailOffer();
  const [type, setType] = useState(getRouteType(location.pathname));
  const [loadingTable, setLoadingTable] = useState(true);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [dataModal, setDataModal] = useState<ModalContent>({
    type: ModalTypes.NONE,
    data: {},
  });
  const [tableContent, setTableContent] = useState<TableTypeAllOffers>({
    type: TableTypes.ALL_OFFERS,
    data: [],
    hiddenColumns: [],
    nameColumnHeader: t("offers"),
    onButtonClick: handleOnButtonClick,
    total: 0,
  });

  /** Obtener datos de tabla */

  const [apiParams, setApiParams] = useState<useApiParams>({
    service: getOffersByEntityService(dataUser.uid, 1, pageSizeOptionsSt[0]),
    method: "get",
  });

  const { responseData, error, errorMsg, fetchData } = useApi({
    service: apiParams.service,
    method: apiParams.method,
    dataToSend: apiParams.dataToSend,
  });

  useEffect(() => {
    if (apiParams.service) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiParams]);

  useEffect(() => {
    if (responseData) {
      setData();
    } else if (error) {
      setTableContent({
        type: TableTypes.ALL_OFFERS,
        data: [],
        hiddenColumns: [],
        nameColumnHeader: t("offers"),
        onButtonClick: handleOnButtonClick,
        total: 0,
      });
      setLoadingTable(false);
      showNotification("error", errorMsg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData, error]);

  /** Cambio de tipo */

  useEffect(() => {
    setType(getRouteType(location.pathname));
  }, [location]);

  useEffect(() => {
    setTableContent((prev) => {
      return {
        ...prev,
        // total: 100, // r3v
        subType: type,
        nameColumnHeader: t(getLabelFromRequirementType(type)),
      };
    });
  }, [type]);

  /** Abrir detalle de oferta */

  useEffect(() => {
    if (modalDataOfferDetail.type !== ModalTypes.NONE) {
      setDataModal(modalDataOfferDetail);
      setIsOpenModal(true);
    }
  }, [modalDataOfferDetail]);

  /** Funciones */

  async function setData() {
    try {
      const subUsers: { [key: string]: BaseUser } = {};
      const pendingRequests: { [key: string]: Promise<any> } = {};

      const data: Offer[] = await Promise.all(
        responseData.data.map(async (e: any) => {
          if (e.subUser == dataUser.uid) {
            return transformToOfferFromGetOffersByEntityOrSubUser(
              e,
              type,
              dataUser,
              mainDataUser,
              true
            );
          } else {
            // Check if we already have data for the subUser in cache
            if (!Object.prototype.hasOwnProperty.call(subUsers, e.subUser)) {
              // If there's no request in progress for this subUser, initiate one
              if (!pendingRequests[e.subUser]) {
                pendingRequests[e.subUser] = makeRequest({
                  service: getBaseDataUserService(e.subUser),
                  method: "get",
                }).then(({ responseData }: any) => {
                  const { subUser } = transformToBaseUser(responseData.data[0]);
                  subUsers[e.subUser] = subUser;
                  // Clean up the pending request after it resolves
                  delete pendingRequests[e.subUser];
                });
              }
              // Wait for the request to resolve if it's already in progress
              await pendingRequests[e.subUser];
            }
            return transformToOfferFromGetOffersByEntityOrSubUser(
              e,
              type,
              subUsers[e.subUser],
              dataUser
            );
          }
        })
      );

      setTableContent({
        type: TableTypes.ALL_OFFERS,
        data: data,
        hiddenColumns: [],
        nameColumnHeader: t("offers"),
        onButtonClick: handleOnButtonClick,
        total: responseData.res?.totalDocuments,
      });
    } catch (error) {
      console.log(error);
      showNotification("error", t("errorOccurred"));
    } finally {
      setLoadingTable(false);
    }
  }

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    console.log(e.target.value);
  }

  function handleOnButtonClick(action: Action, offer: Offer) {
    if (action == Action.VIEW_OFFER)
      getOfferDetail(offer.key, offer.type, true, offer);
  }

  function handleChangePageAndPageSize({
    page,
    pageSize,
  }: OnChangePageAndPageSizeTypeParams) {
    setLoadingTable(true);
    setApiParams({
      service: getOffersByEntityService(dataUser.uid, page, pageSize),
      method: "get",
    });
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
      <TablePageContent
        title={t("offers")}
        titleIcon={<i className="fa-regular fa-dolly c-default"></i>}
        subtitle={`${t("listOf")}  ${t(getLabelFromRequirementType(type))}`}
        subtitleIcon={<i className="fa-light fa-person-dolly sub-icon"></i>}
        table={tableContent}
        onSearch={handleSearch}
        loading={loadingTable}
        onChangePageAndPageSize={handleChangePageAndPageSize}
      />
    </>
  );
}
