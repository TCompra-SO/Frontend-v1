import { App, Tooltip } from "antd";
import { BaseUser } from "../../models/MainInterfaces";
import {
  Action,
  ActionLabel,
  RequirementType,
  UserClass,
} from "../../utilities/types";
import RatingContainer from "../containers/RatingContainer";
import { useState } from "react";
import ButtonContainer from "../containers/ButtonContainer";
import { getUserClass } from "../../utilities/globalFunctions";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { MainState } from "../../models/Redux";
import showNotification from "../../utilities/notification/showNotification";
import FrontImage from "./FrontImage";
import SubUserName from "./SubUserName";

interface RatingCanceledModalProps {
  user: BaseUser;
  subUser: BaseUser | undefined;
  requirementOfferTitle: string;
  type: RequirementType;
  isOffer: boolean;
  onClose: (e: React.SyntheticEvent<Element, Event>) => any;
}

export default function RatingCanceledModal(props: RatingCanceledModalProps) {
  const { t } = useTranslation();
  const [score, setScore] = useState(0);
  const { notification } = App.useApp();
  const uid = useSelector((state: MainState) => state.user.uid);

  const userClass: UserClass = getUserClass(props.isOffer, props.type);

  function onScoreChange(score: number) {
    setScore(score);
  }

  function saveScore(e: React.SyntheticEvent<Element, Event>) {
    if (score == 0) {
      showNotification(notification, "info", t("mustAnswerQuestion"));
      return;
    }
    console.log(score, props.user.uid, "uid", uid);
    props.onClose(e);
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
              <FrontImage small image={props.user.image} isUser={true} />
              <div className="oferta-usuario">
                <div className="oferta-datos m-0">
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
      {/* <Flex align="center" style={style} justify="center">
        <b>
          {`${
            userClass == UserClass.CUSTOMER
              ? `${t("customer").toUpperCase()}:`
              : `${t("seller").toUpperCase()}:`
          } ${props.user.name}`}
        </b>
      </Flex>
      <Flex align="center" justify="center" style={style}>
        {props.isOffer
          ? `${t("offer").toUpperCase()}: `
          : props.type == RequirementType.SALE
          ? `${t("sale").toUpperCase()}: `
          : `${t("requirement").toUpperCase()}: `}
        {props.requirementOfferTitle}
      </Flex> */}
    </div>
  );
}
