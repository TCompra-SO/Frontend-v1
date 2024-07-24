import { Divider, Flex } from "antd";
import DatePickerContainer from "../../containers/DatePickerContainer";
import { useState } from "react";
import dayjs from "dayjs";
import ButtonContainer from "../../containers/ButtonContainer";
import { RequirementTableItem } from "../../../models/MainInterfaces";

interface RequirementModalRepublishProps {
  requirement: RequirementTableItem;
}

export default function RequirementModalRepublish(
  props: RequirementModalRepublishProps
) {
  const [newDate, setNewDate] = useState(dayjs());

  function handleDateChange(date: dayjs.Dayjs) {
    setNewDate(date);
  }

  function republishRequirement() {
    console.log(props.requirement, newDate);
  }

  return (
    <>
      <Divider style={{ margin: "10px 0" }} />
      <Flex vertical align="center" gap="small">
        <b>Seleccione una fecha:</b>
        <DatePickerContainer
          value={newDate}
          onChange={handleDateChange}
          style={{ width: "100%" }}
        />
        <ButtonContainer
          text="Aceptar"
          block
          type="primary"
          style={{ marginTop: "9px" }}
          onClick={republishRequirement}
        />
      </Flex>
    </>
  );
}
