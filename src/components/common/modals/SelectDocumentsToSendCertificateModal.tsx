import { useTranslation } from "react-i18next";
import ButtonContainer from "../../containers/ButtonContainer";
import {
  Action,
  CertificationTableType,
  ErrorMsgRequestType,
  ErrorRequestType,
  ModalTypes,
  ResponseRequestType,
  SystemNotificationType,
} from "../../../utilities/types";
import { CertificateFile } from "../../../models/MainInterfaces";
import { useContext, useEffect, useState } from "react";
import TextAreaContainer from "../../containers/TextAreaContainer";
import {
  CommonModalProps,
  ModalContent,
  SelectDocsModalData,
} from "../../../models/Interfaces";
import { Checkbox, Flex, Pagination } from "antd";
import ModalContainer from "../../containers/ModalContainer";
import {
  certificatesToSendPageSize,
  mainModalScrollStyle,
} from "../../../utilities/globals";
import SimpleLoading from "../../../pages/utils/SimpleLoading";
import {
  useGetCertificatesList,
  useGetRequiredDocsCert,
} from "../../../hooks/certificateHooks";
import {
  resendCertificatesService,
  sendCertificationRequestService,
} from "../../../services/requests/certificateService";
import {
  ResendCertificatesRequest,
  SendCertificationRequest,
} from "../../../models/Requests";
import { MainState } from "../../../models/Redux";
import { useSelector } from "react-redux";
import useShowNotification from "../../../hooks/utilHooks";
import useSystemNotification from "../../../hooks/useSystemNotification";
import { MainSocketsContext } from "../../../contexts/MainSocketsContext";
import dayjs from "dayjs";
import { openDocument } from "../../../utilities/globalFunctions";

interface SelectDocumentsToSendCertificateModalProps extends CommonModalProps {
  data: SelectDocsModalData;
  onClose: () => any;
  certificationId?: string;
  onRequestSent?: () => void;
  setLoading?: (val: boolean) => void;
}

export default function SelectDocumentsToSendCertificateModal(
  props: SelectDocumentsToSendCertificateModalProps
) {
  const { t } = useTranslation();
  const { getNotification } = useContext(MainSocketsContext);
  const { showNotification } = useShowNotification();
  const { getSystemNotification } = useSystemNotification();
  const { getRequiredDocsCert, requiredDocs, loadingRequiredDocs } =
    useGetRequiredDocsCert();
  const mainUserUid = useSelector((state: MainState) => state.mainUser.uid);
  const [currentPage, setCurrentPage] = useState(1);
  const {
    certificateList,
    getCertificatesList,
    loadingCertList,
    totalCertList,
  } = useGetCertificatesList();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [docs, setDocs] = useState<CertificateFile[]>([]);
  const [dataModal] = useState<ModalContent>({
    type: ModalTypes.ADD_CERTIFICATES,
    data: {
      onDocumentAdded: handleOnDocumentAdded,
    },
    action: Action.ADD_CERTIFICATES,
  });
  const [checked, setChecked] = useState<boolean[]>(
    Array(docs.length).fill(false)
  );
  const [certificateIds, setCertificateIds] = useState<string[]>([]);
  const { loading } = props.useApiHook;

  /** Obtener lista de documentos */

  useEffect(() => {
    getCertificatesList(currentPage, certificatesToSendPageSize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (certificateList) {
      setDocs(certificateList);
      const indexes = certificateList.map((item, i) => {
        if (certificateIds.includes(item.key)) return i;
        return -1;
      });
      const temp: boolean[] = Array(certificateList.length).fill(false);
      indexes.forEach((ind) => {
        if (ind != -1) temp[ind] = true;
      });
      setChecked(temp);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [certificateList]);

  /** Obtener texto de documentos requeridos */

  useEffect(() => {
    getRequiredDocsCert(props.data.userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.data]);

  /** Para enviar documentos */

  useEffect(() => {
    props.setAdditionalApiParams({
      functionToExecute: function (
        responseData: ResponseRequestType,
        error: ErrorRequestType,
        errorMsg: ErrorMsgRequestType
      ) {
        props.setLoading?.(false);
        if (responseData) {
          showNotification("success", t("documentsSentSuccessfully"));
          if (props.onRequestSent) props.onRequestSent();
          props.onClose();
        } else if (error) {
          showNotification("error", errorMsg);
        }
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Funciones */

  function handleCloseModal() {
    setIsOpenModal(false);
  }

  function handleOnDocumentAdded() {
    setCurrentPage(1);
    getCertificatesList(1, certificatesToSendPageSize);
  }

  function onChangePageAndPageSize(page: number, pageSize: number) {
    setCurrentPage(page);
    getCertificatesList(page, pageSize);
  }

  function setCheckedDoc(value: boolean, index: number) {
    if (certificateList && certificateList[index]) {
      if (value)
        setCertificateIds((prev) => {
          return [...prev, certificateList[index].key];
        });
      else
        setCertificateIds((prevList) =>
          prevList.filter((item) => item != certificateList[index].key)
        );
      setChecked((prev) => {
        const newArray = [...prev];
        newArray[index] = value;
        return newArray;
      });
    }
  }

  function submit() {
    if (certificateIds.length == 0) {
      showNotification("error", t("mustSelectAtLeastOneDocument"));
      return;
    }
    props.setLoading?.(true);

    const notificationFn = getSystemNotification(
      SystemNotificationType.RECEIVED_DOCS_FOR_CERT
    );
    const basicNotification = notificationFn();
    const notification = getNotification({
      ...basicNotification,
      timestamp: dayjs().toISOString(),
      receiverId: props.data.userId,
      targetId: props.certificationId ?? "",
      targetType: CertificationTableType.RECEIVED,
    });

    const data: SendCertificationRequest | ResendCertificatesRequest =
      props.certificationId
        ? {
            certificateRequestID: props.certificationId,
            certificateIDs: certificateIds,
            notification,
          }
        : {
            userID: mainUserUid,
            companyID: props.data.userId,
            certificateIDs: certificateIds,
            notification,
          };

    props.setApiParams({
      service: props.certificationId
        ? resendCertificatesService()
        : sendCertificationRequestService(),
      method: "post",
      dataToSend: data,
    });
  }

  return (
    <>
      <ModalContainer
        destroyOnClose
        content={dataModal}
        isOpen={isOpenModal}
        onClose={handleCloseModal}
        style={mainModalScrollStyle}
      />

      <div className="modal-card img-bg-certificado">
        <div className="t-flex mr-sub-2">
          <i className="fa-regular fa-file-certificate sub-icon-cert"></i>
          <div className="sub-titulo sub-calificar">
            <div>{t("certifyYourCompany")}</div>
            <div className="calificar-detalle">
              {t("GetYourCertificationFrom")} {props.data.userName}
            </div>
          </div>
        </div>
        <div className="t-flex gap-15 preguntas">
          {loadingRequiredDocs ? (
            <Flex justify="center">
              <SimpleLoading style={{ width: "15vw" }} />
            </Flex>
          ) : (
            <div className="t-flex gap-15">
              <div className="card-ofertas cert-datos">
                <div className="dato-empresa">
                  <TextAreaContainer
                    className="form-control wd-100"
                    autoSize
                    readOnly
                    placeholder={`${t("notes")}...`}
                    value={requiredDocs ?? ""}
                  />
                </div>
              </div>
            </div>
          )}

          {loadingCertList && (
            <Flex justify="center">
              <SimpleLoading style={{ width: "15vw" }} />
            </Flex>
          )}
          {!loadingCertList && docs.length > 0 ? (
            docs.map((obj, index) => (
              <div
                key={index}
                className="card-ofertas certificado-bloque"
                style={{ cursor: "pointer" }}
                onClick={() => setCheckedDoc(!checked[index], index)}
              >
                <div className="t-flex oferta-titulo gap-10">
                  <div
                    className="icon-doc-estado"
                    onClick={() => openDocument(obj.url)}
                  >
                    <i className="fa-regular fa-file-lines"></i>
                  </div>
                  <div className="oferta-usuario col-documento">
                    <div className="oferta-datos t-wrap m-0">
                      <div className="text-truncate doc-name">
                        {obj.documentName}
                      </div>
                    </div>
                    <div className="t-flex oferta-descripcion">
                      <div className="text-truncate detalles-oferta">
                        {obj.name}
                      </div>
                    </div>
                  </div>

                  <Checkbox
                    // onClick={(e) => e.stopPropagation()}
                    onChange={(e) => {
                      setCheckedDoc(e.target.checked, index);
                    }}
                    checked={checked[index]}
                  ></Checkbox>
                </div>
              </div>
            ))
          ) : (
            <div className="card-ofertas certificado-bloque no-pointer-events">
              <div className="t-flex oferta-descripcion">
                <div className="detalles-oferta">
                  {t("noDocumentsForCertification")}
                </div>
              </div>
            </div>
          )}
          {docs.length > 0 && (
            <Flex justify="center">
              <Pagination
                size="small"
                total={totalCertList}
                onChange={onChangePageAndPageSize}
                // showTotal={(total) => `${total}`}
                pageSize={certificatesToSendPageSize}
                current={currentPage}
                hideOnSinglePage={true}
              />
            </Flex>
          )}
          <div className="t-flex gap-15 wd-100 alert-btn">
            <ButtonContainer
              className="btn alert-boton btn-green"
              onClick={() => submit()}
              loading={loading}
            >
              {t("send")}
            </ButtonContainer>
            <ButtonContainer
              className="btn alert-boton btn-green-o"
              onClick={() => setIsOpenModal(true)}
            >
              {t("addCertificates")}
            </ButtonContainer>
          </div>
        </div>
      </div>
    </>
  );
}
