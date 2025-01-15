import DatePickerContainer from "../../containers/DatePickerContainer";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import ButtonContainer from "../../containers/ButtonContainer";
import { useTranslation } from "react-i18next";
import { isDateEarlierThanTomorrow } from "../../../utilities/globalFunctions";
import { CommonModalProps } from "../../../models/Interfaces";
import { republishRequirementService } from "../../../services/requests/requirementService";
import {
  ErrorMsgRequestType,
  ErrorRequestType,
  RequirementType,
  ResponseRequestType,
} from "../../../utilities/types";
import useShowNotification from "../../../hooks/utilHooks";

interface RequirementModalRepublishProps extends CommonModalProps {
  requirementId: string;
  onClose: () => any;
  type: RequirementType;
}

export default function RequirementModalRepublish(
  props: RequirementModalRepublishProps
) {
  const { t } = useTranslation();
  const [newDate, setNewDate] = useState(dayjs().add(1, "day"));
  const { showNotification } = useShowNotification();
  const { loading } = props.useApiHook;

  useEffect(() => {
    props.setAdditionalApiParams({
      functionToExecute: function (
        responseData: ResponseRequestType,
        error: ErrorRequestType,
        errorMsg: ErrorMsgRequestType
      ) {
        if (responseData) {
          showNotification(
            "success",
            t(
              props.type == RequirementType.SALE
                ? "saleRepublishedSuccessfully"
                : "requirementRepublishedSuccessfully"
            )
          );
          props.onClose();
        } else if (error) {
          showNotification("error", errorMsg);
        }
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleDateChange(date: dayjs.Dayjs) {
    setNewDate(date);
  }

  function republishRequirement() {
    if (!newDate) {
      showNotification("error", t("enterAValidDate"));
      return;
    }
    props.setApiParams({
      service: republishRequirementService(),
      method: "post",
      dataToSend: {
        uid: props.requirementId,
        completion_date: dayjs(newDate).toISOString(),
      },
    });
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
            <div className="titulo-input">
              {t("selectNewDateForRepublishment")}
            </div>
            <DatePickerContainer
              value={newDate}
              onChange={handleDateChange}
              style={{ width: "100%" }}
              className="form-control"
              disabledDate={isDateEarlierThanTomorrow}
            />
          </div>
          <ButtonContainer
            children={t("saveButton")}
            loading={loading}
            onClick={republishRequirement}
            className="btn btn-default wd-100"
          />
        </div>
      </div>
    </>
  );
}
