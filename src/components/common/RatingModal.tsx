import { App, Flex } from "antd";
import { RequirementType, SiNo, UserClass } from "../../utilities/types";
import SelectContainer from "../containers/SelectContainer";
import { rowColor } from "../../utilities/colors";
import RatingContainer from "../containers/RatingContainer";
import { User } from "../../models/MainInterfaces";
import { getUserClass } from "../../utilities/globalFunctions";
import ButtonContainer from "../containers/ButtonContainer";
import { useState } from "react";
import showNotification from "../../utilities/notification/showNotification";

const questions = {
  [UserClass.CUSTOMER]: [
    {
      [RequirementType.GOOD]: "¿Recibió el producto?",
      [RequirementType.SALE]: "¿Recibió el producto?",
      [RequirementType.SERVICE]: "¿Recibió el servicio?",
      [RequirementType.JOB]: "¿Recibió el servicio?",
    },
    {
      [RequirementType.SALE]: "La descripción del producto fue exacta",
      [RequirementType.GOOD]: "La descripción del producto fue exacta",
      [RequirementType.SERVICE]: "La descripción del servicio fue exacta",
      [RequirementType.JOB]: "La descripción del servicio fue exacta",
    },
    {
      [RequirementType.GOOD]: "La comunicación con el proveedor fue buena",
      [RequirementType.SALE]: "La comunicación con el proveedor fue buena",
      [RequirementType.SERVICE]: "La comunicación con el proveedor fue buena",
      [RequirementType.JOB]: "La comunicación con el proveedor fue buena",
    },
    {
      [RequirementType.GOOD]: "La rapidez de la entrega",
      [RequirementType.SALE]: "La rapidez de la entrega",
      [RequirementType.SERVICE]: "La rapidez de la entrega",
      [RequirementType.JOB]: "La rapidez de la entrega",
    },
  ],
  [UserClass.SELLER]: [
    {
      [RequirementType.SALE]: "¿Envió el producto?",
      [RequirementType.GOOD]: "¿Envió el producto?",
      [RequirementType.SERVICE]: "¿Prestó el servicio?",
      [RequirementType.JOB]: "¿Prestó el servicio?",
    },
    {
      [RequirementType.GOOD]: "¿Hubo buena comunicación con el cliente?",
      [RequirementType.SALE]: "¿Hubo buena comunicación con el cliente?",
      [RequirementType.SERVICE]: "¿Hubo buena comunicación con el cliente?",
      [RequirementType.JOB]: "¿Hubo buena comunicación con el cliente?",
    },
    {
      [RequirementType.GOOD]: "¿Los pagos fueron rápidos?",
      [RequirementType.SALE]: "¿Los pagos fueron rápidos?",
      [RequirementType.SERVICE]: "¿Los pagos fueron rápidos?",
      [RequirementType.JOB]: "¿Los pagos fueron rápidos?",
    },
    {
      [RequirementType.GOOD]: "¿Recomendaría al cliente?",
      [RequirementType.SALE]: "¿Recomendaría al cliente?",
      [RequirementType.SERVICE]: "¿Recomendaría al cliente?",
      [RequirementType.JOB]: "¿Recomendaría al cliente?",
    },
  ],
};

interface RatingModalProps {
  user: User;
  requirementOffertitle: string;
  type: RequirementType;
  isOffer: boolean;
  onClose: (e: React.SyntheticEvent<Element, Event>) => any;
}

export default function RatingModal(props: RatingModalProps) {
  const [answer, setAnswer] = useState<SiNo | null>(null);
  const [scores, setScores] = useState([0, 0, 0]);
  const { notification } = App.useApp();
  const userClass: UserClass = getUserClass(props.isOffer, props.type);

  function onScoreChange(position: number, score: number) {
    const copy = scores;
    copy[position] = score;
    setScores(copy);
  }

  function onAnswerChange(answer: SiNo) {
    setAnswer(answer);
  }

  function closeModal(e: React.SyntheticEvent<Element, Event>) {
    props.onClose(e);
  }

  function rateUser(e: React.SyntheticEvent<Element, Event>) {
    if (answer === null) {
      showNotification(notification, "info", "Debe seleccionar una respuesta");
      return;
    }
    console.log(props.user.uid, "id de usuario logeado", scores, answer); // r3v
    props.onClose(e);
  }

  return (
    <>
      <Flex
        vertical
        style={{
          background: rowColor,
          borderRadius: "10px",
          padding: "15px",
          marginBottom: "15px",
        }}
        align="center"
      >
        <b>{questions[userClass][0][props.type]}</b>
        <SelectContainer
          style={{ width: "100%" }}
          options={[
            { label: "Sí", value: SiNo.SI },
            { label: "No", value: SiNo.NO },
          ]}
          placeholder="Seleccione"
          onChange={onAnswerChange}
        />
      </Flex>
      <Flex align="center" justify="center">
        <b style={{ fontSize: "1.2em" }}>Calificar</b>
      </Flex>
      <Flex
        align="center"
        vertical
        gap="small"
        style={{
          background: rowColor,
          borderRadius: "10px",
          padding: "15px",
          marginBottom: "10px",
          marginTop: "15px",
        }}
      >
        <b>{questions[userClass][1][props.type]}</b>
        <RatingContainer score={0} onChange={(val) => onScoreChange(0, val)} />
        <b>{questions[userClass][2][props.type]}</b>
        <RatingContainer score={0} onChange={(val) => onScoreChange(1, val)} />
        <b>{questions[userClass][3][props.type]}</b>
        <RatingContainer score={0} onChange={(val) => onScoreChange(2, val)} />
      </Flex>
      <ButtonContainer
        text="Enviar calificación"
        block
        type="primary"
        style={{ marginBottom: "10px" }}
        onClick={rateUser}
      />
      <ButtonContainer
        text="Cancelar"
        block
        type="primary"
        onClick={closeModal}
      />
    </>
  );
}
