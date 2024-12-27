import { useTranslation } from "react-i18next";
import ButtonContainer from "../../containers/ButtonContainer";
import { ModalTypes } from "../../../utilities/types";
import { CertificateFile } from "../../../models/MainInterfaces";
import { useEffect, useState } from "react";
import TextAreaContainer from "../../containers/TextAreaContainer";
import {
  ModalContent,
  SelectDocsModalData,
  useApiParams,
} from "../../../models/Interfaces";
import { App, Checkbox } from "antd";
import ModalContainer from "../../containers/ModalContainer";
import {
  mainModalScrollStyle,
  pageSizeOptionsSt,
} from "../../../utilities/globals";
import showNotification from "../../../utilities/notification/showNotification";
import SimpleLoading from "../../../pages/utils/SimpleLoading";
import useApi from "../../../hooks/useApi";
import { useGetCertificatesList } from "../../../hooks/certificateHook";
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

interface SelectDocumentsToSendCertificateModalProps {
  data: SelectDocsModalData;
  onClose: () => any;
  certificationId?: string;
}

export default function SelectDocumentsToSendCertificateModal(
  props: SelectDocumentsToSendCertificateModalProps
) {
  const { t } = useTranslation();
  const { notification } = App.useApp();
  const mainUserUid = useSelector((state: MainState) => state.mainUser.uid);
  const { certificateList, getCertificatesList, loadingCertList } =
    useGetCertificatesList();
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

  /** Obtener lista de documentos */

  useEffect(() => {
    getCertificatesList(1, pageSizeOptionsSt[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (certificateList) {
      setDocs(certificateList);
    }
  }, [certificateList]);

  /** Para enviar documentos */

  const [apiParams, setApiParams] = useState<useApiParams>({
    service: null,
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
      showNotification(notification, "success", t("documentsSentSuccessfully"));
      props.onClose();
    } else if (error) {
      showNotification(notification, "error", errorMsg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData, error]);

  /* Funciones */

  function handleCloseModal() {
    setIsOpenModal(false);
  }

  function handleOnDocumentAdded() {
    getCertificatesList(1, pageSizeOptionsSt[0]);
  }

  function setCheckedDoc(value: boolean, index: number) {
    setChecked((prev) => {
      const newArray = [...prev];
      newArray[index] = value;
      return newArray;
    });
  }

  function submit() {
    if (checked.every((element) => element === false)) {
      showNotification(
        notification,
        "error",
        t("mustSelectAtLeastOneDocument")
      );
      return;
    }
    const certList: string[] = docs
      .map((obj, index) => (checked[index] ? obj.uid : null))
      .filter((xx) => xx !== null) as string[];
    // console.log(checked, mainUserUid, props.data.userId, result);

    const data: SendCertificationRequest | ResendCertificatesRequest =
      props.certificationId
        ? {
            certificateRequestID: props.certificationId,
            certificateIDs: certList,
          }
        : {
            userID: mainUserUid,
            companyID: props.data.userId,
            certificateIDs: certList,
          };

    setApiParams({
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
          <div className="t-flex gap-15">
            <div className="card-ofertas cert-datos">
              <div className="dato-empresa">
                <TextAreaContainer
                  className="form-control wd-100"
                  autoSize
                  readOnly
                  placeholder={`${t("notes")}...`}
                  value={props.data.text}
                />
              </div>
            </div>
          </div>

          {loadingCertList && <SimpleLoading style={{ width: "15vw" }} />}
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
