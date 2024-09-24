import { Divider, Flex } from "antd";
import DatePickerContainer from "../../containers/DatePickerContainer";
import { useState } from "react";
import dayjs from "dayjs";
import ButtonContainer from "../../containers/ButtonContainer";
import { useTranslation } from "react-i18next";
import { isDateEarlierThanToday } from "../../../utilities/globalFunctions";

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
      <div className="modal-card">
        <div className="t-flex t-wrap mr-sub">
          <div className="sub-titulo">
            <i className="fa-regular fa-calendar sub-icon"></i> {t("republish")}
          </div>
        </div>
        <div className="t-flex req-col gap-15">
          <div className="t-flex" style={{ flexDirection: "column" }}>
            <div className="titulo-input">{t("selectDate")}</div>
            <DatePickerContainer
              value={newDate}
              onChange={handleDateChange}
              style={{ width: "100%" }}
              className="form-control"
              disabledDate={isDateEarlierThanToday}
            />
          </div>
          <ButtonContainer
            children={t("saveButton")}
            onClick={republishRequirement}
            className="btn btn-default wd-100"
          />
        </div>
      </div>
    </>
  );
}
