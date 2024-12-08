import { App, Tooltip } from "antd";
import { BasicRateData } from "../../../models/MainInterfaces";
import {
  Action,
  ActionLabel,
  RequirementType,
  UserClass,
} from "../../../utilities/types";
import RatingContainer from "../../containers/RatingContainer";
import { useEffect, useState } from "react";
import ButtonContainer from "../../containers/ButtonContainer";
import {
  calculateFinalScore,
  getUserClass,
} from "../../../utilities/globalFunctions";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { MainState } from "../../../models/Redux";
import showNotification from "../../../utilities/notification/showNotification";
import FrontImage from "../FrontImage";
import SubUserName from "../SubUserName";
import { useApiParams } from "../../../models/Interfaces";
import { RegisterScoreRequest } from "../../../models/Requests";
import useApi from "../../../hooks/useApi";
import { registerScoreService } from "../../../services/requests/scoreService";

interface RatingCanceledModalProps {
  basicRateData: BasicRateData;
  type: RequirementType;
  isOffer: boolean;
  onClose: () => any;
}

export default function RatingCanceledModal(props: RatingCanceledModalProps) {
  const { t } = useTranslation();
  const [score, setScore] = useState(0);
  const { notification } = App.useApp();
  const uid = useSelector((state: MainState) => state.user.uid);
  const userClass: UserClass = getUserClass(props.isOffer, props.type);

  const [apiParams, setApiParams] = useState<
    useApiParams<RegisterScoreRequest>
  >({
    service: null,
    method: "get",
  });
  const { loading, responseData, error, errorMsg, fetchData } =
    useApi<RegisterScoreRequest>({
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
      showNotification(notification, "success", t("scoreSavedSuccessfully"));
      props.onClose();
    } else if (error) {
      showNotification(notification, "error", errorMsg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData, error]);

  function onScoreChange(score: number) {
    setScore(score);
  }

  function saveScore() {
    if (score == 0) {
      showNotification(notification, "info", t("mustAnswerQuestion"));
      return;
    }

    const data: RegisterScoreRequest = {
      typeScore: userClass == UserClass.CUSTOMER ? "Client" : "Provider",
      uidEntity: props.basicRateData.userId,
      uidUser: uid,
      score: calculateFinalScore([score]),
    };

    setApiParams({
      service: registerScoreService(),
      method: "post",
      dataToSend: data,
    });
  }

  return (
    <div className="modal-card">
      <div className="t-flex t-wrap mr-sub">
        <div className="sub-titulo">
          <i className="fa-regular fa-stars sub-icon"></i>{" "}
          {t(ActionLabel[Action.RATE_CANCELED])}
        </div>
      </div>
      <div className="t-flex gap-15 preguntas">
        <div className="card-ofertas">
          <div className="t-flex">
            <div className="t-flex oferta-titulo">
              <FrontImage
                small
                image={props.basicRateData.userImage}
                isUser={true}
              />
              <div className="oferta-usuario">
                <div className="oferta-datos m-0">
                  <Tooltip title={props.basicRateData.userName}>
                    <div className="usuario-name text-truncate">
                      {props.basicRateData.userName}
                    </div>
                  </Tooltip>
                  <SubUserName
                    small
                    subUserName={props.basicRateData.subUserName}
                  />
                </div>
                <div className="t-flex oferta-descripcion">
                  <Tooltip title={props.basicRateData.title}>
                    <div className="text-truncate detalles-oferta">
                      {props.basicRateData.title}
                    </div>
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card-ofertas text-center">
          <div className="cuestion-p">{`${
            t("rateCanceledQuestion") +
            (userClass == UserClass.CUSTOMER
              ? t("customer").toLowerCase()
              : t("seller").toLowerCase()) +
            "?"
          }`}</div>
          <RatingContainer score={0} onChange={onScoreChange} />
        </div>
        <div className="t-flex gap-15">
          <ButtonContainer
            onClick={saveScore}
            loading={loading}
            children={t("submit")}
            className="btn btn-default wd-100"
          />
          <ButtonContainer
            onClick={props.onClose}
            children={t("cancelButton")}
            className="btn btn-second wd-100"
          />
        </div>
      </div>
    </div>
  );
}
