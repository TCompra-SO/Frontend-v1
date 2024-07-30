import { Flex } from "antd";
import { User } from "../../models/MainInterfaces";
import { RequirementType, UserClass } from "../../utilities/types";
import { rowColor } from "../../utilities/colors";
import RatingContainer from "../containers/RatingContainer";
import { useState } from "react";
import ButtonContainer from "../containers/ButtonContainer";
import { getUserClass } from "../../utilities/globalFunctions";
import { useTranslation } from "react-i18next";

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
  const style: React.CSSProperties = {
    padding: "15px",
    borderRadius: "10px",
    background: rowColor,
    marginBottom: "10px",
    textAlign: "center",
  };

  const userClass: UserClass = getUserClass(props.isOffer, props.type);

  function onScoreChange(score: number) {
    setScore(score);
  }

  function saveScore(e: React.SyntheticEvent<Element, Event>) {
    console.log(score, props.user.uid, "uid de usuario logeado"); // r3v
    props.onClose(e);
  }

  return (
    <>
      <Flex align="center" style={style} justify="center">
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
        {props.requirementOffertitle}
      </Flex>
      <Flex
        vertical
        align="center"
        justify="center"
        style={{ fontSize: "0.9em", ...style }}
      >
        {`${
          t("rateCanceledQuestion") +
          (userClass == UserClass.CUSTOMER
            ? t("customer").toLowerCase()
            : t("seller").toLowerCase()) +
          "?"
        }`}
        <RatingContainer score={0} onChange={onScoreChange} />
      </Flex>
      <Flex justify="center">
        <ButtonContainer
          onClick={saveScore}
          text={t("submitRating")}
          block
          style={{ marginRight: "10px" }}
          type="primary"
        />
        <ButtonContainer
          onClick={props.onClose}
          text={t("cancelButton")}
          block
          type="primary"
        />
      </Flex>
    </>
  );
}
