import { useTranslation } from "react-i18next";
import TablePageContent from "../components/section/table-page/TablePageContent";
import { ChangeEvent, useEffect, useState } from "react";
import { TableTypeAllOffers, useApiParams } from "../models/Interfaces";
import { Action, TableTypes } from "../utilities/types";
import { BaseUser, BasicOffer } from "../models/MainInterfaces";
import makeRequest, {
  equalServices,
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

export default function AllOffers() {
  const { t } = useTranslation();
  const location = useLocation();
  const { notification } = App.useApp();
  const mainDataUser = useSelector((state: MainState) => state.mainUser);
  const dataUser = useSelector((state: MainState) => state.user);
  const [type, setType] = useState(getRouteType(location.pathname));
  const [tableContent, setTableContent] = useState<TableTypeAllOffers>({
    type: TableTypes.ALL_OFFERS,
    data: [],
    hiddenColumns: [],
    nameColumnHeader: t("offers"),
    onButtonClick: handleOnButtonClick,
  });

  /** Obtener datos de tabla */

  const [apiParams] = useState<useApiParams>({
    service: getOffersByEntityService(dataUser.uid),
    method: "get",
  });

  const { loading, responseData, error, errorMsg, fetchData } = useApi({
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
      if (equalServices(apiParams.service, getOffersByEntityService("")))
        setData();
    } else if (error) {
      if (equalServices(apiParams.service, getOffersByEntityService("")))
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
        subType: type,
      };
    });
  }, [type]);

  /** Funciones */

  async function setData() {
    if (responseData) {
      const subUsers: { [key: string]: BaseUser } = {};
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
            if (!Object.prototype.hasOwnProperty.call(subUsers, e.subUser)) {
              const { responseData }: any = await makeRequest({
                service: getBaseDataUserService(e.subUser),
                method: "get",
              });
              const { subUser } = transformToBaseUser(responseData.data[0]);
              subUsers[e.subUser] = subUser;
            }
            return transformToOfferFromGetOffersByEntityOrSubUser(
              e,
              type,
              subUsers[e.subUser],
              dataUser
            );
          }
          // if (!Object.prototype.hasOwnProperty.call(subUsers, e.user)) {
          //   const { responseData }: any = await makeRequest({
          //     service: getBaseDataUserService(e.user),
          //     method: "get",
          //   });
          //   const { subUser } = transformToBaseUser(responseData.data[0]);
          //   subUsers[e.user] = subUser;
          // }
          // return transformToOfferFromGetOffersByEntityOrSubUser(
          //   e,
          //   type,
          //   subUsers[e.user],
          //   dataUser
          // );
        })
      );
      console.log(data);
      setTableContent({
        type: TableTypes.ALL_OFFERS,
        data: data,
        hiddenColumns: [],
        nameColumnHeader: t("offers"),
        onButtonClick: handleOnButtonClick,
      });
    } else if (error) {
      console.log(error);
    }
  }

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    console.log(e.target.value);
  }

  function handleOnButtonClick(action: Action, offer: BasicOffer) {}

  return (
    <TablePageContent
      title={t("offers")}
      titleIcon={<i className="fa-regular fa-dolly c-default"></i>}
      subtitle={`${t("listOf")}  ${t(getLabelFromRequirementType(type))}`}
      subtitleIcon={<i className="fa-light fa-person-dolly sub-icon"></i>}
      table={tableContent}
      onSearch={handleSearch}
      loading={
        equalServices(apiParams.service, getOffersByEntityService(""))
          ? loading
          : undefined
      }
    />
  );
}
