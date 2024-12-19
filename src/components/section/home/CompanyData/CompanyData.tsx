import { useContext, useEffect, useState } from "react";
import BasicCompanyData from "./items/BasicCompanyData";
import CertificationData from "./items/CertificationData";
import DetailedCompanyData from "./items/DetailedCompanyData";
import { HomeContext } from "../../../../contexts/Homecontext";
import { FullUser } from "../../../../models/MainInterfaces";
import SimpleLoading from "../../../../pages/utils/SimpleLoading";
import { App, Flex } from "antd/lib";
import { useApiParams } from "../../../../models/Interfaces";
import useApi from "../../../../hooks/useApi";
import showNotification from "../../../../utilities/notification/showNotification";
import { getUserService } from "../../../../services/requests/authService";
import { transformToFullUser } from "../../../../utilities/transform";
import { CertificationState } from "../../../../utilities/types";

export default function CompanyData() {
  const { notification } = App.useApp();
  const { userId } = useContext(HomeContext);
  const [user, setUser] = useState<FullUser | null>(null);

  useEffect(() => {
    if (userId)
      setApiParamsUser({
        service: getUserService(userId),
        method: "get",
      });
  }, [userId]);

  /** Obtener datos de usuario buscado */

  const [apiParamsUser, setApiParamsUser] = useState<useApiParams>({
    service: null,
    method: "get",
  });

  const {
    loading: loadingUser,
    responseData: responseDataUser,
    error: errorUser,
    errorMsg: errorMsgUser,
    fetchData: fetchDataUser,
  } = useApi({
    service: apiParamsUser.service,
    method: apiParamsUser.method,
    dataToSend: apiParamsUser.dataToSend,
  });

  useEffect(() => {
    if (apiParamsUser.service) fetchDataUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiParamsUser]);

  useEffect(() => {
    if (responseDataUser) {
      setData();
    } else if (errorUser) {
      showNotification(notification, "error", errorMsgUser);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseDataUser, errorUser]);

  /** Funciones */

  function setData() {
    const user = transformToFullUser(responseDataUser.data);
    setUser(user);
  }

  return (
    <>
      {userId ? (
        <div className="t-flex f-column gap-15">
          {!loadingUser && user ? (
            <>
              <BasicCompanyData user={user} />
              <DetailedCompanyData user={user} />
              <CertificationData state={CertificationState.NONE} user={user} />
            </>
          ) : (
            <Flex justify="center" align="center">
              <SimpleLoading style={{ width: "15vw" }} />
            </Flex>
          )}
        </div>
      ) : null}
    </>
  );
}
