import { Divider, Flex } from "antd";
import DatePickerContainer from "../../containers/DatePickerContainer";
import { useState } from "react";
import dayjs from "dayjs";
import ButtonContainer from "../../containers/ButtonContainer";
import { useTranslation } from "react-i18next";

interface RequirementModalRepublishProps {
  requirementId: string;
  onClose: (e: React.SyntheticEvent<Element, Event>) => any;
}

export default function RequirementModalRepublish(
  props: RequirementModalRepublishProps
) {
  const { t } = useTranslation();
  const [newDate, setNewDate] = useState(dayjs());

  function handleDateChange(date: dayjs.Dayjs) {
    setNewDate(date);
  }

  function republishRequirement(e: React.SyntheticEvent<Element, Event>) {
    console.log(props.requirementId, newDate);
    props.onClose(e);
  }

  return (
    <>
      <Divider style={{ margin: "10px 0" }} />
      <Flex vertical align="center" gap="small">
        <b>{t("selectDate")}:</b>
        <DatePickerContainer
          value={newDate}
          onChange={handleDateChange}
          style={{ width: "100%" }}
        />
        <ButtonContainer
          children={t("acceptButton")}
          block
          type="primary"
          style={{ marginTop: "9px" }}
          onClick={republishRequirement}
        />
      </Flex>
    </>
  );
}
