import { Tooltip } from "antd";
import {
  RequirementType,
  YesNo,
  UserClass,
  ResponseRequestType,
  ErrorRequestType,
  ErrorMsgRequestType,
  SystemNotificationType,
} from "../../../utilities/types";
import SelectContainer from "../../containers/SelectContainer";
import RatingContainer from "../../containers/RatingContainer";
import { BasicRateData } from "../../../models/MainInterfaces";
import {
  calculateFinalScore,
  getCulminateOfferService,
  getCulminateRecordService,
  getUserClass,
} from "../../../utilities/globalFunctions";
import ButtonContainer from "../../containers/ButtonContainer";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import FrontImage from "../utils/FrontImage";
import SubUserName from "../utils/SubUserName";
import { CommonModalProps } from "../../../models/Interfaces";
import { CulminateRequest } from "../../../models/Requests";
import useShowNotification from "../../../hooks/utilHooks";
import { MainSocketsContext } from "../../../contexts/MainSocketsContext";
import useSystemNotification from "../../../hooks/useSystemNotification";
import dayjs from "dayjs";

interface RatingModalProps extends CommonModalProps {
  basicRateData: BasicRateData;
  type: RequirementType;
  isOffer: boolean; // indica si a quien se califica es creador de una oferta o no
  onClose: () => any;
  requirementOrOfferId: string; // Id de oferta o requerimiento que se está culminando
}

export default function RatingModal(props: RatingModalProps) {
  const { t } = useTranslation();
  const { sendNotification } = useContext(MainSocketsContext);
  const { getSystemNotification } = useSystemNotification();
  const [answer, setAnswer] = useState<YesNo | null>(null);
  const [scores, setScores] = useState([0, 0, 0]);
  const { showNotification } = useShowNotification();
  const userClass: UserClass = getUserClass(props.isOffer, props.type);
  const { loading } = props.useApiHook;

  const questions = {
    [UserClass.SELLER]: [
      {
        [RequirementType.GOOD]: t("receivedGoodQuestion"),
        [RequirementType.SALE]: t("receivedGoodQuestion"),
        [RequirementType.SERVICE]: t("receivedServiceQuestion"),
        [RequirementType.JOB]: t("receivedServiceQuestion"),
      },
      {
        [RequirementType.SALE]: t("goodDescriptionQuestion"),
        [RequirementType.GOOD]: t("goodDescriptionQuestion"),
        [RequirementType.SERVICE]: t("serviceDescriptionQuestion"),
        [RequirementType.JOB]: t("serviceDescriptionQuestion"),
      },
      {
        [RequirementType.GOOD]: t("supplierCommunicationQuestion"),
        [RequirementType.SALE]: t("supplierCommunicationQuestion"),
        [RequirementType.SERVICE]: t("supplierCommunicationQuestion"),
        [RequirementType.JOB]: t("supplierCommunicationQuestion"),
      },
      {
        [RequirementType.GOOD]: t("deliverySpeedQuestion"),
        [RequirementType.SALE]: t("deliverySpeedQuestion"),
        [RequirementType.SERVICE]: t("deliverySpeedQuestion"),
        [RequirementType.JOB]: t("deliverySpeedQuestion"),
      },
    ],
    [UserClass.CUSTOMER]: [
      {
        [RequirementType.SALE]: t("sendGoodQuestion"),
        [RequirementType.GOOD]: t("sendGoodQuestion"),
        [RequirementType.SERVICE]: t("provideServiceQuestion"),
        [RequirementType.JOB]: t("provideServiceQuestion"),
      },
      {
        [RequirementType.GOOD]: t("customerCommunicationQuestion"),
        [RequirementType.SALE]: t("customerCommunicationQuestion"),
        [RequirementType.SERVICE]: t("customerCommunicationQuestion"),
        [RequirementType.JOB]: t("customerCommunicationQuestion"),
      },
      {
        [RequirementType.GOOD]: t("paymentTimeQuestion"),
        [RequirementType.SALE]: t("paymentTimeQuestion"),
        [RequirementType.SERVICE]: t("paymentTimeQuestion"),
        [RequirementType.JOB]: t("paymentTimeQuestion"),
      },
      {
        [RequirementType.GOOD]: t("recommendCustomerQuestion"),
        [RequirementType.SALE]: t("recommendCustomerQuestion"),
        [RequirementType.SERVICE]: t("recommendCustomerQuestion"),
        [RequirementType.JOB]: t("recommendCustomerQuestion"),
      },
    ],
  };

  useEffect(() => {
    props.setAdditionalApiParams({
      functionToExecute: function (
        responseData: ResponseRequestType,
        error: ErrorRequestType,
        errorMsg: ErrorMsgRequestType
      ) {
        if (responseData) {
          showNotification("success", t("scoreSavedSuccessfully"));
          props.onClose();
          const notificationFn = getSystemNotification(
            props.isOffer
              ? SystemNotificationType.FINISH_REQUIREMENT
              : SystemNotificationType.FINISH_OFFER
          );
          const notification = notificationFn(answer == YesNo.YES, props.type);
          sendNotification({
            ...notification,
            receiverId:
              props.basicRateData.subUserId ?? props.basicRateData.userId,
            timestamp: dayjs().toISOString(),
            targetId: props.basicRateData.uid,
            targetType: props.type,
          });
        } else if (error) {
          showNotification("error", errorMsg);
        }
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onScoreChange(position: number, score: number) {
    const copy = scores;
    copy[position] = score;
    setScores(copy);
  }

  function onAnswerChange(answer: YesNo) {
    setAnswer(answer);
  }

  function rateUser() {
    if (answer === null || scores[0] == 0 || scores[1] == 0 || scores[2] == 0) {
      showNotification("info", t("mustAnswerAllQuestions"));
      return;
    }
    const data: CulminateRequest = {
      delivered: answer == YesNo.YES,
      score: calculateFinalScore(scores),
    };
    if (props.isOffer) data.requerimentID = props.requirementOrOfferId;
    else data.offerID = props.requirementOrOfferId;
    props.setApiParams({
      service: props.isOffer
        ? getCulminateRecordService(props.type)
        : getCulminateOfferService(props.type),
      method: "post",
      dataToSend: data,
    });
  }

  return (
    <div className="modal-card">
      <div className="t-flex t-wrap mr-sub-2">
        <i className="fa-regular fa-stars sub-icon m-0"></i>
        <div className="sub-titulo sub-calificar">
          <div>{t("finish")}</div>
          <div className="calificar-detalle">
            {t("rateYour")}
            {userClass == UserClass.CUSTOMER ? t("customer") : t("seller")}
          </div>
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
                <div className="oferta-datos  m-0">
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
        <div className="t-flex estado-envio">
          <div className="wd-100 envio-info">
            {questions[userClass][0][props.type]}
          </div>
          <div className="wd-100">
            <SelectContainer
              style={{ width: "100%" }}
              options={[
                { label: t("yes"), value: YesNo.YES },
                { label: t("no"), value: YesNo.NO },
              ]}
              placeholder={t("select")}
              onChange={onAnswerChange}
              className="form-control"
            />
          </div>
        </div>
        <div className="card-ofertas text-center">
          <div className="cuestion-p">
            <b>{questions[userClass][1][props.type]}</b>
          </div>
          <RatingContainer
            score={0}
            onChange={(val) => onScoreChange(0, val)}
          />
        </div>
        <div className="card-ofertas text-center">
          <div className="cuestion-p">
            <b>{questions[userClass][2][props.type]}</b>
          </div>
          <RatingContainer
            score={0}
            onChange={(val) => onScoreChange(1, val)}
          />
        </div>
        <div className="card-ofertas text-center">
          <div className="cuestion-p">
            <b>{questions[userClass][3][props.type]}</b>
          </div>
          <RatingContainer
            score={0}
            onChange={(val) => onScoreChange(2, val)}
          />
        </div>
        <div className="t-flex gap-15">
          <ButtonContainer
            children={t("submit")}
            className="btn btn-default wd-100"
            onClick={rateUser}
            loading={loading}
          />
          <ButtonContainer
            children={t("cancelButton")}
            className="btn btn-second wd-100"
            onClick={props.onClose}
          />
        </div>
      </div>
    </div>
  );
}
