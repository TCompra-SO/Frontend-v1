import { FloatButton } from "antd";
import { useTranslation } from "react-i18next";
import NoContentModalContainer from "../../containers/NoContentModalContainer";
import { lazy, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { isChat, isHome } from "../../../utilities/globalFunctions";
import { pageRoutes } from "../../../utilities/routes";
import { MainState } from "../../../models/Redux";
import { useSelector } from "react-redux";
import useWindowSize from "../../../hooks/useWindowSize";
import { windowSize } from "../../../utilities/globals";
import { CommonModalProps, useApiParams } from "../../../models/Interfaces";
import useApi, { UseApiType } from "../../../hooks/useApi";
import { CreateRequirementRequest } from "../../../models/Requests";
import useShowNotification, {
  useShowLoadingMessage,
} from "../../../hooks/utilHooks";
import { ProcessFlag, RequirementType } from "../../../utilities/types";
import { LoadingDataContext } from "../../../contexts/LoadingDataContext";

const CreateRequirement = lazy(
  () => import("../create-requirement/CreateRequirement")
);

export default function CreateRequirementFloatButton() {
  const { t } = useTranslation();
  const { updateCreateRequirementLoading, createRequirementLoading } =
    useContext(LoadingDataContext);
  const location = useLocation();
  const navigate = useNavigate();
  const { width } = useWindowSize();
  const { showLoadingMessage } = useShowLoadingMessage();
  const { showNotification } = useShowNotification();
  const isLoading = useSelector((state: MainState) => state.loading.isLoading);
  const isLoggedIn = useSelector((state: MainState) => state.user.isLoggedIn);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isHomePage, setIsHomePage] = useState(true);
  const [isChatPage, setIsChatPage] = useState(false);

  const [reqSuccess, setReqSuccess] = useState(ProcessFlag.NOT_INI);
  const [docSuccess, setDocSuccess] = useState(ProcessFlag.NOT_INI);
  const [imgSuccess, setImgSuccess] = useState(ProcessFlag.NOT_INI);
  const [type, setType] = useState<RequirementType>(RequirementType.GOOD);

  const [avoidClosingModal, setAvoidClosingModal] = useState(false);

  useEffect(() => {
    return () => {
      updateCreateRequirementLoading(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setIsHomePage(isHome(location.pathname));
    setIsChatPage(isChat(location.pathname));
  }, [location]);

  /** Determinar si se debe cerrar el modal o no*/

  useEffect(() => {
    if (createRequirementLoading && !isOpenModal) {
      setAvoidClosingModal(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenModal]);

  /** Variables para crear requerimiento */

  const [additionalApiParams, setAdditionalApiParams] = useState<UseApiType>({
    functionToExecute: () => {},
  });

  const [apiParams, setApiParams] = useState<
    useApiParams<CreateRequirementRequest>
  >({
    service: null,
    method: "get",
  });

  const useApiHook = useApi<CreateRequirementRequest>(
    apiParams,
    additionalApiParams
  );

  const [commonModalProps] = useState<CommonModalProps>({
    useApiHook: useApiHook,
    setApiParams: setApiParams,
    setAdditionalApiParams: setAdditionalApiParams,
    apiParams,
  });

  /** Variables para subir imágenes */

  const [additionalApiParamsImg, setAdditionalApiParamsImg] =
    useState<UseApiType>({
      functionToExecute: () => {},
    });

  const [apiParamsImg, setApiParamsImg] = useState<useApiParams<FormData>>({
    service: null,
    method: "get",
  });

  const useApiHookImg = useApi<FormData>(apiParamsImg, additionalApiParamsImg);

  /** Variables para subir documentos */

  const [additionalApiParamsDoc, setAdditionalApiParamsDoc] =
    useState<UseApiType>({
      functionToExecute: () => {},
    });

  const [apiParamsDoc, setApiParamsDoc] = useState<useApiParams<FormData>>({
    service: null,
    method: "get",
  });

  const useApiHookDoc = useApi<FormData>(apiParamsDoc, additionalApiParamsDoc);

  /** Acciones para solicitud */

  useEffect(() => {
    showLoadingMessage(useApiHook.loading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useApiHook.loading]);

  useEffect(() => {
    showLoadingMessage(useApiHookImg.loading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useApiHookImg.loading]);

  useEffect(() => {
    showLoadingMessage(useApiHookDoc.loading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useApiHookDoc.loading]);

  useEffect(() => {
    if (apiParams.service) useApiHook.fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiParams]);

  useEffect(() => {
    if (apiParamsImg.service) useApiHookImg.fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiParamsImg]);

  useEffect(() => {
    if (apiParamsDoc.service) useApiHookDoc.fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiParamsDoc]);

  /** Notificaciones */
  useEffect(() => {
    if (reqSuccess != ProcessFlag.NOT_INI) {
      if (
        docSuccess != ProcessFlag.NOT_INI &&
        imgSuccess != ProcessFlag.NOT_INI
      ) {
        if (
          reqSuccess == ProcessFlag.FIN_SUCCESS &&
          docSuccess == ProcessFlag.FIN_SUCCESS &&
          imgSuccess == ProcessFlag.FIN_SUCCESS
        ) {
          showNotification(
            "success",
            t(
              type == RequirementType.GOOD || type == RequirementType.SERVICE
                ? "createRequirementSuccess"
                : "createSaleSuccess"
            )
          );
        } else {
          showNotification(
            "warning",
            t(
              type == RequirementType.GOOD || type == RequirementType.SERVICE
                ? "createRequirementSuccessNoDocOrImages"
                : "createSaleSuccessNoDocOrImages"
            )
          );
        }
        if (!avoidClosingModal) setIsOpenModal(false);
      }
      updateCreateRequirementLoading(false);
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reqSuccess, imgSuccess, docSuccess]);

  function reset() {
    setApiParams({
      service: null,
      method: "get",
    });
    setApiParamsDoc({
      service: null,
      method: "get",
    });
    setApiParamsImg({
      service: null,
      method: "get",
    });
    setReqSuccess(ProcessFlag.NOT_INI);
    setDocSuccess(ProcessFlag.NOT_INI);
    setImgSuccess(ProcessFlag.NOT_INI);
    setType(RequirementType.GOOD);
    setAvoidClosingModal(false);
  }

  return (
    <>
      {!isLoading &&
      (width > windowSize.sm || (width <= windowSize.sm && !isChatPage)) ? (
        <>
          <FloatButton.Group shape="circle" style={{ insetInlineEnd: 24 }}>
            {!isHomePage && (
              <FloatButton
                icon={
                  <i
                    className="fa-regular fa-house"
                    style={{ marginLeft: "-1px" }}
                  ></i>
                }
                tooltip={t("home")}
                type="primary"
                onClick={() => navigate(pageRoutes.home)}
              />
            )}
            {isLoggedIn && (
              <>
                {!isChatPage && (
                  <FloatButton
                    icon={<i className="fa-regular fa-comment" />}
                    type="primary"
                    tooltip={t("chat")}
                    onClick={() => navigate(pageRoutes.chat)}
                  />
                )}

                <FloatButton
                  icon={<i className="fa-solid fa-plus" />}
                  type="primary"
                  tooltip={t("createRequirement")}
                  onClick={() => setIsOpenModal(true)}
                />
              </>
            )}
          </FloatButton.Group>

          {isLoggedIn && (
            <NoContentModalContainer
              open={isOpenModal}
              width={850}
              closable={true}
              maskClosable={false}
              onClose={() => setIsOpenModal(false)}
            >
              <CreateRequirement
                closeModal={() => setIsOpenModal(false)}
                useApiHookImg={useApiHookImg}
                setApiParamsImg={setApiParamsImg}
                setAdditionalApiParamsImg={setAdditionalApiParamsImg}
                apiParamsImg={apiParamsImg}
                useApiHookDoc={useApiHookDoc}
                setApiParamsDoc={setApiParamsDoc}
                setAdditionalApiParamsDoc={setAdditionalApiParamsDoc}
                apiParamsDoc={apiParamsDoc}
                setReqSuccess={setReqSuccess}
                setDocSuccess={setDocSuccess}
                setImgSuccess={setImgSuccess}
                setType={setType}
                {...commonModalProps}
              />
            </NoContentModalContainer>
          )}
        </>
      ) : null}
    </>
  );
}
