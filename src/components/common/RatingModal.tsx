import { Flex } from "antd";
import { RequirementType, SiNo, UserClass } from "../../utilities/types";
import SelectContainer from "../containers/SelectContainer";
import { rowColor } from "../../utilities/colors";
import RatingContainer from "../containers/RatingContainer";

const questions = {
  [UserClass.CUSTOMER]: [
    {
      [RequirementType.GOOD]: "¿Recibió el producto?",
      [RequirementType.SALE]: "¿Recibió el producto?",
      [RequirementType.SERVICE]: "¿Recibió el servicio?",
    },
    {
      [RequirementType.SALE]: "La descripción del producto fue exacta",
      [RequirementType.GOOD]: "La descripción del producto fue exacta",
      [RequirementType.SERVICE]: "La descripción del servicio fue exacta",
    },
    "La comunicación con el proveedor fue buena",
    "La rapidez de la entrega",
  ],
  [UserClass.SELLER]: [
    {
      [RequirementType.SALE]: "¿Envió el producto?",
      [RequirementType.GOOD]: "¿Envió el producto?",
      [RequirementType.SERVICE]: "¿Prestó el servicio?",
    },
    "¿Hubo buena comunicación con el cliente?",
    "¿Los pagos fueron rápidos?",
    "¿Recomendaría al cliente?",
  ],
};

interface RatingModalProps {
  userClass: UserClass;
  type: RequirementType.GOOD | RequirementType.SALE | RequirementType.SERVICE;
}

export default function RatingModal(props: RatingModalProps) {
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
      >
        <b>{questions[props.userClass][0][props.type]}</b>
        <SelectContainer
          options={[
            { label: "Seleccione", value: null },
            { label: "Sí", value: SiNo.SI },
            { label: "No", value: SiNo.NO },
          ]}
        />
      </Flex>
      <b style={{ fontSize: "1.1em" }}>Calificar</b>
      <Flex
        vertical
        gap="small"
        style={{
          background: rowColor,
          borderRadius: "10px",
          padding: "15px",
          marginBottom: "15px",
        }}
      >
        <b>
          {questions[props.userClass][1][props.type] ??
            questions[props.userClass][1]}
        </b>
        <RatingContainer score={0} />
        <b>
          {questions[props.userClass][2][props.type] ??
            questions[props.userClass][2]}
        </b>
        <RatingContainer score={0} />
        <b>
          {questions[props.userClass][3][props.type] ??
            questions[props.userClass][3]}
        </b>
        <RatingContainer score={0} />
      </Flex>
    </>
  );
}
