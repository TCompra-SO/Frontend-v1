import { useTranslation } from "react-i18next";
import TablePageContent from "../components/section/table-page/TablePageContent";
import { ChangeEvent, useEffect, useState } from "react";
import { TableTypeAllRequirements, useApiParams } from "../models/Interfaces";
import {
  Action,
  OnChangePageAndPageSizeTypeParams,
  TableTypes,
} from "../utilities/types";
import { BaseUser, BasicRequirement } from "../models/MainInterfaces";
import makeRequest, {
  getLabelFromRequirementType,
  getRouteType,
} from "../utilities/globalFunctions";
import { useLocation, useNavigate } from "react-router-dom";
import useApi from "../hooks/useApi";
import { getRequirementsByEntityService } from "../services/requests/requirementService";
import { useSelector } from "react-redux";
import { MainState } from "../models/Redux";
import { getBaseDataUserService } from "../services/requests/authService";
import {
  transformDataToRequirement,
  transformToBaseUser,
} from "../utilities/transform";
import { pageRoutes } from "../utilities/routes";
import { pageSizeOptionsSt } from "../utilities/globals";
import useShowNotification from "../hooks/utilHook";

export default function AllRequirements() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { showNotification } = useShowNotification();
  const dataUser = useSelector((state: MainState) => state.user);
  const mainDataUser = useSelector((state: MainState) => state.mainUser);
  const [type, setType] = useState(getRouteType(location.pathname));
  const [loadingTable, setLoadingTable] = useState(true);
  const [tableContent, setTableContent] = useState<TableTypeAllRequirements>({
    type: TableTypes.ALL_REQUIREMENTS,
    data: [],
    hiddenColumns: [],
    nameColumnHeader: t(getLabelFromRequirementType(type)),
    onButtonClick: handleOnButtonClick,
    total: 0,
  });

  /** Obtener datos de tabla */

  const [apiParams, setApiParams] = useState<useApiParams>({
    service: getRequirementsByEntityService(
      dataUser.uid,
      1,
      pageSizeOptionsSt[0]
    ),
    method: "get",
  });

  const { responseData, error, errorMsg, fetchData } = useApi({
    service: apiParams.service,
    method: apiParams.method,
    dataToSend: apiParams.dataToSend,
  });

  useEffect(() => {
    if (apiParams.service) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiParams]);

  useEffect(() => {
    if (responseData) {
      setData();
    } else if (error) {
      setTableContent({
        type: TableTypes.ALL_REQUIREMENTS,
        data: [],
        hiddenColumns: [],
        nameColumnHeader: t(getLabelFromRequirementType(type)),
        onButtonClick: handleOnButtonClick,
        total: 0,
      });
      setLoadingTable(false);
      showNotification("error", errorMsg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData, error]);

  /* Actualizar tabla */

  useEffect(() => {
    setType(getRouteType(location.pathname));
  }, [location]);

  useEffect(() => {
    setTableContent((prev) => {
      return {
        ...prev,
        //total: 100, // r3v
        subType: type,
        nameColumnHeader: t(getLabelFromRequirementType(type)),
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  /** Funciones */

  async function setData() {
    try {
      const subUsers: { [key: string]: BaseUser } = {};
      const pendingRequests: { [key: string]: Promise<any> } = {};

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
            // If the subUser's data is not cached and there's no ongoing request for it
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
            return transformDataToRequirement(
              e,
              type,
              subUsers[e.subUser],
              dataUser
            );
          }
        })
      );

      setTableContent({
        type: TableTypes.ALL_REQUIREMENTS,
        data: data,
        hiddenColumns: [],
        nameColumnHeader: t(getLabelFromRequirementType(type)),
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

  function handleOnButtonClick(action: Action, requirement: BasicRequirement) {
    if (action == Action.VIEW_REQUIREMENT)
      navigate(`${pageRoutes.productDetail}/${requirement.key}`);
  }

  function handleChangePageAndPageSize({
    page,
    pageSize,
  }: OnChangePageAndPageSizeTypeParams) {
    setLoadingTable(true);
    setApiParams({
      service: getRequirementsByEntityService(dataUser.uid, page, pageSize),
      method: "get",
    });
  }

  return (
    <TablePageContent
      title={t("requirements")}
      titleIcon={<i className="fa-regular fa-dolly c-default"></i>}
      subtitle={`${t("listOf")} ${t(getLabelFromRequirementType(type))}`}
      subtitleIcon={<i className="fa-light fa-person-dolly sub-icon"></i>}
      table={tableContent}
      onSearch={handleSearch}
      loading={loadingTable}
      onChangePageAndPageSize={handleChangePageAndPageSize}
    />
  );
}
