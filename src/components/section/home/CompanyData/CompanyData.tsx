import { useContext, useEffect, useState } from "react";
import BasicCompanyData from "./items/BasicCompanyData";
import CertificationData from "./items/CertificationData";
import DetailedCompanyData from "./items/DetailedCompanyData";
import { HomeContext } from "../../../../contexts/Homecontext";
import { FullUser } from "../../../../models/MainInterfaces";
import SimpleLoading from "../../../../pages/utils/SimpleLoading";
import { App, Flex } from "antd/lib";
import showNotification from "../../../../utilities/notification/showNotification";
import { CertificationState } from "../../../../utilities/types";
import { useSelector } from "react-redux";
import { MainState } from "../../../../models/Redux";
import {
  getFullUser,
  verifyCertificationByUserIdAndCompanyId,
} from "../../../../services/complete/general";
import { useTranslation } from "react-i18next";

export default function CompanyData() {
  const { t } = useTranslation();
  const { notification } = App.useApp();
  const { userId } = useContext(HomeContext);
  const mainUid = useSelector((state: MainState) => state.mainUser.uid);
  const [loadingUser, setLoadingUser] = useState<boolean | undefined>(
    undefined
  );
  const [user, setUser] = useState<FullUser | null>(null);
  const [certifState, setCertifState] = useState<CertificationState | null>(
    null
  );

  /** Obtener datos de usuario buscado */

  useEffect(() => {
    if (userId) {
      getUserData();
      if (userId != mainUid) {
        verifyCertificationState(userId);
      }
    }
  }, [userId]);

  /** Funciones */

  async function getUserData() {
    try {
      setLoadingUser(true);
      setUser(null);
      const { user, error, errorMsg } = await getFullUser(userId);
      if (user) setUser(user);
      else if (error) showNotification(notification, "error", errorMsg);
    } catch (err) {
      console.log(err);
      showNotification(notification, "error", t("errorOccurred"));
    } finally {
      setLoadingUser(false);
    }
  }

  async function verifyCertificationState(userId: string) {
    setCertifState(null);
    const {
      certState: certResult,
      error: errorCert,
      errorMsg: errorMsgCert,
    } = await verifyCertificationByUserIdAndCompanyId(mainUid, userId);
    if (certResult) setCertifState(certResult);
    else if (errorCert) showNotification(notification, "error", errorMsgCert);
  }

  return (
    <>
      {userId ? (
        <div className="t-flex f-column gap-15">
          {!loadingUser ? (
            user && (
              <>
                <BasicCompanyData user={user} />
                <DetailedCompanyData user={user} />
                {userId != mainUid && certifState && (
                  <CertificationData state={certifState} user={user} />
                )}
              </>
            )
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
