import { Flex, Tooltip } from "antd";
import { User } from "../../models/MainInterfaces";
import {
  Action,
  ActionLabel,
  RequirementType,
  UserClass,
} from "../../utilities/types";
import { rowColor } from "../../utilities/colors";
import RatingContainer from "../containers/RatingContainer";
import { useState } from "react";
import ButtonContainer from "../containers/ButtonContainer";
import { getUserClass } from "../../utilities/globalFunctions";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { MainState } from "../../models/Redux";

interface RatingCanceledModalProps {
  user: User;
  requirementOffertitle: string;
  type: RequirementType;
  isOffer: boolean;
  onClose: (e: React.SyntheticEvent<Element, Event>) => any;
}

export default function RatingCanceledModal(props: RatingCanceledModalProps) {
  const { t } = useTranslation();
  const [score, setScore] = useState(0);
  const uid = useSelector((state: MainState) => state.user.uid);

  const userClass: UserClass = getUserClass(props.isOffer, props.type);

  function onScoreChange(score: number) {
    setScore(score);
  }

  function saveScore(e: React.SyntheticEvent<Element, Event>) {
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
              <img
                src={props.user.image ?? "/src/assets/images/img-prod.svg"}
                className="img-oferta"
              />
              <div className="oferta-usuario">
                <div className="oferta-datos t-wrap m-0">
                  <div className="usuario-name">{props.user.name}</div>
                  {/* <div className="user-empresa-2">U</div> */}
                </div>
                <div className="t-flex oferta-descripcion">
                  <Tooltip title={props.requirementOffertitle}>
                    <div className="text-truncate detalles-oferta">
                      {props.requirementOffertitle}
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
              : t("supplier").toLowerCase()) +
            "?"
          }`}</div>
          <RatingContainer score={0} onChange={onScoreChange} />
        </div>
        <div className="t-flex gap-15">
          <ButtonContainer
            onClick={saveScore}
            children={t("submitRating")}
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
              : `${t("supplier").toUpperCase()}:`
          } ${props.user.name}`}
        </b>
      </Flex>
      <Flex align="center" justify="center" style={style}>
        {props.isOffer
          ? `${t("offer").toUpperCase()}: `
          : props.type == RequirementType.SALE
          ? `${t("sale").toUpperCase()}: `
          : `${t("requirement").toUpperCase()}: `}
        {props.requirementOffertitle}
      </Flex> */}
    </div>
  );
}
