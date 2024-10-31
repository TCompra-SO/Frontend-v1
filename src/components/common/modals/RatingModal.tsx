import { App, Tooltip } from "antd";
import { RequirementType, YesNo, UserClass } from "../../../utilities/types";
import SelectContainer from "../../containers/SelectContainer";
import RatingContainer from "../../containers/RatingContainer";
import { BaseUser, BasicRateData } from "../../../models/MainInterfaces";
import {
  calculateFinalScore,
  getUserClass,
} from "../../../utilities/globalFunctions";
import ButtonContainer from "../../containers/ButtonContainer";
import { useEffect, useState } from "react";
import showNotification from "../../../utilities/notification/showNotification";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { MainState } from "../../../models/Redux";
import FrontImage from "../FrontImage";
import SubUserName from "../SubUserName";
import { useApiParams } from "../../../models/Interfaces";
import { RegisterScoreRequest } from "../../../models/Requests";
import useApi from "../../../hooks/useApi";
import { registerScoreService } from "../../../services/requests/scoreService";

interface RatingModalProps {
  user: BaseUser;
  subUser: BaseUser | undefined;
  requirementOfferTitle: string;
  basicRateData?: BasicRateData;
  type: RequirementType;
  isOffer: boolean;
  onClose: () => any;
}

export default function RatingModal(props: RatingModalProps) {
  const { t } = useTranslation();
  const [answer, setAnswer] = useState<YesNo | null>(null);
  const [scores, setScores] = useState([0, 0, 0]);
  const { notification } = App.useApp();
  const uid = useSelector((state: MainState) => state.mainUser.uid);
  const userClass: UserClass = getUserClass(props.isOffer, props.type);

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
      showNotification(notification, "info", t("mustAnswerAllQuestions"));
      return;
    }

    const data: RegisterScoreRequest = {
      typeScore: userClass == UserClass.CUSTOMER ? "Client" : "Provider",
      uidEntity: props.user.uid,
      uidUser: uid,
      score: calculateFinalScore(scores),
    };
    console.log(data);
    setApiParams({
      service: registerScoreService(),
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
              <FrontImage small image={props.user.image} isUser={true} />
              <div className="oferta-usuario">
                <div className="oferta-datos  m-0">
                  <Tooltip title={props.user.name}>
                    <div className="usuario-name text-truncate">
                      {props.user.name}
                    </div>
                  </Tooltip>
                  <SubUserName small subUser={props.subUser} />
                </div>
                <div className="t-flex oferta-descripcion">
                  <Tooltip title={props.requirementOfferTitle}>
                    <div className="text-truncate detalles-oferta">
                      {props.requirementOfferTitle}
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
