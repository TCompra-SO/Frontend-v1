import { useTranslation } from "react-i18next";
import ButtonContainer from "../../containers/ButtonContainer";
import {
  ErrorMsgRequestType,
  ErrorRequestType,
  ModalTypes,
  ResponseRequestType,
} from "../../../utilities/types";
import { CertificateFile } from "../../../models/MainInterfaces";
import { useEffect, useState } from "react";
import TextAreaContainer from "../../containers/TextAreaContainer";
import {
  CommonModalProps,
  ModalContent,
  SelectDocsModalData,
} from "../../../models/Interfaces";
import { Checkbox, Flex, Pagination } from "antd";
import ModalContainer from "../../containers/ModalContainer";
import {
  mainModalScrollStyle,
  pageSizeOptionsSt,
} from "../../../utilities/globals";
import SimpleLoading from "../../../pages/utils/SimpleLoading";
import {
  useGetCertificatesList,
  useGetRequiredDocsCert,
} from "../../../hooks/certificateHook";
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
import useShowNotification from "../../../hooks/utilHook";

interface SelectDocumentsToSendCertificateModalProps extends CommonModalProps {
  data: SelectDocsModalData;
  onClose: () => any;
  certificationId?: string;
  onRequestSent?: () => void;
}

export default function SelectDocumentsToSendCertificateModal(
  props: SelectDocumentsToSendCertificateModalProps
) {
  const { t } = useTranslation();
  const { showNotification } = useShowNotification();
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
  });
  const [checked, setChecked] = useState<boolean[]>(
    Array(docs.length).fill(false)
  );
  const [certificateIds, setCertificateIds] = useState<string[]>([]);
  const { loading } = props.useApiHook;

  /** Obtener lista de documentos */

  useEffect(() => {
    getCertificatesList(currentPage, pageSizeOptionsSt[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (certificateList) {
      setDocs(certificateList);
      const indexes = certificateList.map((item, i) => {
        if (certificateIds.includes(item.uid)) return i;
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
    getCertificatesList(1, pageSizeOptionsSt[0]);
  }

  function onChangePageAndPageSize(page: number, pageSize: number) {
    setCurrentPage(page);
    getCertificatesList(page, pageSize);
  }

  function setCheckedDoc(value: boolean, index: number) {
    if (certificateList && certificateList[index]) {
      if (value)
        setCertificateIds((prev) => {
          return [...prev, certificateList[index].uid];
        });
      else
        setCertificateIds((prevList) =>
          prevList.filter((item) => item != certificateList[index].uid)
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

    const data: SendCertificationRequest | ResendCertificatesRequest =
      props.certificationId
        ? {
            certificateRequestID: props.certificationId,
            certificateIDs: certificateIds,
          }
        : {
            userID: mainUserUid,
            companyID: props.data.userId,
            certificateIDs: certificateIds,
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
          {!loadingCertList &&
            docs.map((obj, index) => (
              <div key={index} className="card-ofertas certificado-bloque">
                <div className="t-flex oferta-titulo gap-10">
                  <div className="icon-doc-estado">
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
                    onChange={(e) => setCheckedDoc(e.target.checked, index)}
                    checked={checked[index]}
                  ></Checkbox>
                </div>
              </div>
            ))}
          <Flex justify="center">
            <Pagination
              size="small"
              total={totalCertList}
              onChange={onChangePageAndPageSize}
              // showTotal={(total) => `${total}`}
              current={currentPage}
            />
          </Flex>
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
