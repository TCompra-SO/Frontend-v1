import { useContext, useEffect, useState } from "react";
import BasicCompanyData from "./items/BasicCompanyData";
import CertificationData from "./items/CertificationData";
import DetailedCompanyData from "./items/DetailedCompanyData";
import { HomeContext } from "../../../../contexts/Homecontext";
import { FullUser } from "../../../../models/MainInterfaces";
import SimpleLoading from "../../../../pages/utils/SimpleLoading";
import { Flex } from "antd/lib";
import { CertificationState } from "../../../../utilities/types";
import { useSelector } from "react-redux";
import { MainState } from "../../../../models/Redux";
import {
  getFullUser,
  verifyCertificationByUserIdAndCompanyId,
} from "../../../../services/general/generalServices";
import { useTranslation } from "react-i18next";
import useShowNotification from "../../../../hooks/utilHooks";
import { defaultErrorMsg } from "../../../../utilities/globals";

export default function CompanyData() {
  const { t } = useTranslation();
  const { showNotification } = useShowNotification();
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
    if (userId.uid) {
      getUserData();
      if (userId.uid != mainUid) {
        verifyCertificationState(userId.uid);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  /** Funciones */

  async function getUserData() {
    try {
      setLoadingUser(true);
      setUser(null);
      const { user, error, errorMsg } = await getFullUser(userId.uid);
      if (user) setUser(user);
      else if (error) showNotification("error", errorMsg);
    } catch (err) {
      console.log(err);
      showNotification("error", t(defaultErrorMsg));
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
    if (certResult !== null) setCertifState(certResult);
    else if (errorCert) showNotification("error", errorMsgCert);
  }

  return (
    <>
      {userId.uid ? (
        <div className="t-flex f-column gap-15">
          {!loadingUser ? (
            user && (
              <>
                <BasicCompanyData user={user} />
                <DetailedCompanyData user={user} />
                {userId.uid != mainUid && certifState !== null && (
                  <CertificationData
                    state={certifState}
                    user={user}
                    onRequestSent={() =>
                      setCertifState(CertificationState.PENDING)
                    }
                  />
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
