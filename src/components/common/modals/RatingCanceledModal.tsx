import { Tooltip } from "antd";
import { BasicRateData } from "../../../models/MainInterfaces";
import {
  Action,
  ActionLabel,
  ErrorMsgRequestType,
  ErrorRequestType,
  RequirementType,
  ResponseRequestType,
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
import FrontImage from "../utils/FrontImage";
import SubUserName from "../utils/SubUserName";
import { CommonModalProps } from "../../../models/Interfaces";
import { RegisterScoreRequest } from "../../../models/Requests";
import { registerScoreService } from "../../../services/requests/scoreService";
import useShowNotification from "../../../hooks/utilHooks";

interface RatingCanceledModalProps extends CommonModalProps {
  basicRateData: BasicRateData;
  type: RequirementType;
  isOffer: boolean; // isOffer indica si a quien se califica es creador de una oferta o no
  requirementOrOfferId: string;
  onSuccess?: (id: string) => void;
  onExecute?: (id: string) => void;
  onError?: (id: string) => void;
  onClose: () => any;
}

export default function RatingCanceledModal(props: RatingCanceledModalProps) {
  const { t } = useTranslation();
  const { showNotification } = useShowNotification();
  const [score, setScore] = useState(0);
  const uid = useSelector((state: MainState) => state.user.uid);
  const userClass: UserClass = getUserClass(props.isOffer, props.type);
  const { loading } = props.useApiHook;

  useEffect(() => {
    props.setAdditionalApiParams({
      functionToExecute: function (
        responseData: ResponseRequestType,
        error: ErrorRequestType,
        errorMsg: ErrorMsgRequestType
      ) {
        if (responseData) {
          showNotification("success", t("scoreSavedSuccessfully"));
          props.onSuccess?.(props.basicRateData.uid);
          props.onClose();
        } else if (error) {
          props.onError?.(props.basicRateData.uid);
          showNotification("error", errorMsg);
        }
      },
    });

    return () => {
      props.setAdditionalApiParams({ functionToExecute: () => {} });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onScoreChange(score: number) {
    setScore(score);
  }

  function saveScore() {
    if (score == 0) {
      showNotification("info", t("mustAnswerQuestion"));
      return;
    }
    props.onExecute?.(props.basicRateData.uid);
    const data: RegisterScoreRequest = {
      typeScore: userClass == UserClass.CUSTOMER ? "Client" : "Provider",
      uidEntity: props.basicRateData.userId,
      uidUser: uid,
      score: calculateFinalScore([score]),
      offerId: props.isOffer
        ? props.basicRateData.uid
        : props.requirementOrOfferId,
      type: props.type,
    };
    props.setApiParams({
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
