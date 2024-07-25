import { Flex } from "antd";
import { User } from "../../models/MainInterfaces";
import { RequirementType, UserClass } from "../../utilities/types";
import { rowColor } from "../../utilities/colors";
import RatingContainer from "../containers/RatingContainer";
import { useState } from "react";
import ButtonContainer from "../containers/ButtonContainer";

interface RatingCanceledModalProps {
  user: User;
  requirementOffertitle: string;
  type: RequirementType;
  userClass: UserClass;
  isOffer: boolean;
  onClose: (e: React.SyntheticEvent<Element, Event>) => any;
}

export default function RatingCanceledModal(props: RatingCanceledModalProps) {
  const [score, setScore] = useState(0);
  const style: React.CSSProperties = {
    padding: "15px",
    borderRadius: "10px",
    background: rowColor,
    marginBottom: "10px",
    textAlign: "center",
  };

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
            props.userClass == UserClass.CUSTOMER ? "CLIENTE:" : "PROVEEDOR:"
          } ${props.user.name}`}
        </b>
      </Flex>
      <Flex align="center" justify="center" style={style}>
        {props.isOffer
          ? "Oferta: "
          : props.type == RequirementType.SALE
          ? "Liquidación: "
          : "Requerimiento: "}
        {props.requirementOffertitle}
      </Flex>
      <Flex
        vertical
        align="center"
        justify="center"
        style={{ fontSize: "0.9em", ...style }}
      >
        ¿Cómo fue tu comunicación con el
        {props.userClass == UserClass.CUSTOMER ? "cliente?" : "proveedor?"}
        <RatingContainer score={0} onChange={onScoreChange} />
      </Flex>
      <Flex justify="center">
        <ButtonContainer
          onClick={saveScore}
          text="Enviar calificación"
          block
          style={{ marginRight: "10px" }}
          type="primary"
        />
        <ButtonContainer
          onClick={props.onClose}
          text="Cancelar"
          block
          type="primary"
        />
      </Flex>
    </>
  );
}
