import { useTranslation } from "react-i18next";
import TablePageContent from "../components/section/table-page/TablePageContent";
import { ChangeEvent, useEffect, useState } from "react";
import { TableTypeAllOffers, useApiParams } from "../models/Interfaces";
import { Action, TableTypes } from "../utilities/types";
import { BaseUser, BasicOffer } from "../models/MainInterfaces";
import makeRequest, {
  getLabelFromRequirementType,
  getRouteType,
} from "../utilities/globalFunctions";
import { useLocation } from "react-router-dom";
import useApi from "../hooks/useApi";
import { App } from "antd";
import showNotification from "../utilities/notification/showNotification";
import { getOffersByEntityService } from "../services/requests/offerService";
import { useSelector } from "react-redux";
import { MainState } from "../models/Redux";
import {
  transformToBaseUser,
  transformToOfferFromGetOffersByEntityOrSubUser,
} from "../utilities/transform";
import { getBaseDataUserService } from "../services/requests/authService";
import { pageSizeOptionsSt } from "../utilities/globals";

export default function AllOffers() {
  const { t } = useTranslation();
  const location = useLocation();
  const { notification } = App.useApp();
  const mainDataUser = useSelector((state: MainState) => state.mainUser);
  const dataUser = useSelector((state: MainState) => state.user);
  const [type, setType] = useState(getRouteType(location.pathname));
  const [loadingTable, setLoadingTable] = useState(true);
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
      ({
        type: TableTypes.ALL_OFFERS,
        data: [],
        hiddenColumns: [],
        nameColumnHeader: t("offers"),
        onButtonClick: handleOnButtonClick,
      });
      setLoadingTable(false);
      showNotification(notification, "error", errorMsg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData, error]);

  /******** */

  useEffect(() => {
    setType(getRouteType(location.pathname));
  }, [location]);

  useEffect(() => {
    setTableContent((prev) => {
      return {
        ...prev,
        total: 100, // r3v
        subType: type,
      };
    });
  }, [type]);

  /** Funciones */

  async function setData() {
    try {
      const subUsers: { [key: string]: BaseUser } = {};
      const pendingRequests: { [key: string]: Promise<any> } = {};

      const data = await Promise.all(
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
        total: 100, // r3v
      });
    } catch (error) {
      console.log(error);
      showNotification(notification, "error", t("errorOccurred"));
    } finally {
      setLoadingTable(false);
    }
  }

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    console.log(e.target.value);
  }

  function handleOnButtonClick(action: Action, offer: BasicOffer) {}

  function handleChangePageAndPageSize(page: number, pageSize: number) {
    setLoadingTable(true);
    setApiParams({
      service: getOffersByEntityService(dataUser.uid, page, pageSize),
      method: "get",
    });
  }

  return (
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
  );
}
