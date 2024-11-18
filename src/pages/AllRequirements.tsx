import { useTranslation } from "react-i18next";
import TablePageContent from "../components/section/table-page/TablePageContent";
import { ChangeEvent, useEffect, useState } from "react";
import { TableTypeAllRequirements, useApiParams } from "../models/Interfaces";
import { Action, TableTypes } from "../utilities/types";
import { BaseUser, BasicRequirement } from "../models/MainInterfaces";
import makeRequest, {
  equalServices,
  getLabelFromRequirementType,
  getRouteType,
} from "../utilities/globalFunctions";
import { useLocation } from "react-router-dom";
import useApi from "../hooks/useApi";
import showNotification from "../utilities/notification/showNotification";
import { App } from "antd";
import { getRequirementsByEntityService } from "../services/requests/requirementService";
import { useSelector } from "react-redux";
import { MainState } from "../models/Redux";
import { getBaseDataUserService } from "../services/requests/authService";
import {
  transformDataToRequirement,
  transformToBaseUser,
} from "../utilities/transform";

export default function AllRequirements() {
  const { t } = useTranslation();
  const location = useLocation();
  const { notification } = App.useApp();
  const dataUser = useSelector((state: MainState) => state.user);
  const mainDataUser = useSelector((state: MainState) => state.mainUser);
  const [type, setType] = useState(getRouteType(location.pathname));
  const [tableContent, setTableContent] = useState<TableTypeAllRequirements>({
    type: TableTypes.ALL_REQUIREMENTS,
    data: [],
    hiddenColumns: [],
    nameColumnHeader: t(getLabelFromRequirementType(type)),
    onButtonClick: handleOnButtonClick,
  });

  /** Obtener datos de tabla */

  const [apiParams] = useState<useApiParams>({
    service: getRequirementsByEntityService(dataUser.uid),
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
      if (equalServices(apiParams.service, getRequirementsByEntityService("")))
        setData();
    } else if (error) {
      if (equalServices(apiParams.service, getRequirementsByEntityService("")))
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
        nameColumnHeader: t(getLabelFromRequirementType(type)),
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  /** Funciones */

  async function setData() {
    if (responseData) {
      const subUsers: { [key: string]: BaseUser } = {};
      const data = await Promise.all(
        responseData.data.map(async (e: any) => {
          if (e.subUser == dataUser.uid) {
            return transformDataToRequirement(
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
            return transformDataToRequirement(
              e,
              type,
              subUsers[e.subUser],
              dataUser
            );
          }
        })
      );
      console.log(data);

      setTableContent({
        type: TableTypes.ALL_REQUIREMENTS,
        data: data,
        hiddenColumns: [],
        nameColumnHeader: t(getLabelFromRequirementType(type)),
        onButtonClick: handleOnButtonClick,
      });
    } else if (error) {
      console.log(error);
    }
  }

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    console.log(e.target.value);
  }

  function handleOnButtonClick(action: Action, requirement: BasicRequirement) {
    console.log(action, requirement);
  }

  return (
    <TablePageContent
      title={t("requirements")}
      titleIcon={<i className="fa-regular fa-dolly c-default"></i>}
      subtitle={`${t("listOf")} ${t(getLabelFromRequirementType(type))}`}
      subtitleIcon={<i className="fa-light fa-person-dolly sub-icon"></i>}
      table={tableContent}
      onSearch={handleSearch}
      loading={
        equalServices(apiParams.service, getRequirementsByEntityService(""))
          ? loading
          : undefined
      }
    />
  );
}
