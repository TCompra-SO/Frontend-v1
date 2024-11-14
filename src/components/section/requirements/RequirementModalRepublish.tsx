import DatePickerContainer from "../../containers/DatePickerContainer";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import ButtonContainer from "../../containers/ButtonContainer";
import { useTranslation } from "react-i18next";
import { isDateEarlierThanTomorrow } from "../../../utilities/globalFunctions";
import { App } from "antd";
import showNotification from "../../../utilities/notification/showNotification";
import { useApiParams } from "../../../models/Interfaces";
import { RepublishRequest } from "../../../models/Requests";
import useApi from "../../../hooks/useApi";
import { republishRequirementService } from "../../../services/requests/requirementService";
import { RequirementType } from "../../../utilities/types";

interface RequirementModalRepublishProps {
  requirementId: string;
  onClose: () => any;
  type: RequirementType;
}

export default function RequirementModalRepublish(
  props: RequirementModalRepublishProps
) {
  const { t } = useTranslation();
  const [newDate, setNewDate] = useState(dayjs().add(1, "day"));
  const { notification } = App.useApp();
  const [apiParamsRep, setApiParamsRep] = useState<
    useApiParams<RepublishRequest>
  >({
    service: null,
    method: "get",
  });

  const {
    loading: loadingRep,
    responseData: responseDataRep,
    error: errorRep,
    errorMsg: errorMsgRep,
    fetchData: fetchDataRep,
  } = useApi({
    service: apiParamsRep.service,
    method: apiParamsRep.method,
    dataToSend: apiParamsRep.dataToSend,
  });

  useEffect(() => {
    if (apiParamsRep.service) fetchDataRep();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiParamsRep]);

  useEffect(() => {
    if (responseDataRep) {
      showNotification(
        notification,
        "success",
        t(
          props.type == RequirementType.SALE
            ? "saleRepublishedSuccessfully"
            : "requirementRepublishedSuccessfully"
        )
      );
      props.onClose();
    } else if (errorRep) {
      showNotification(notification, "error", errorMsgRep);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseDataRep, errorRep]);

  function handleDateChange(date: dayjs.Dayjs) {
    setNewDate(date);
  }

  function republishRequirement(e: React.SyntheticEvent<Element, Event>) {
    if (!newDate) {
      showNotification(notification, "error", t("enterAValidDate"));
      return;
    }
    setApiParamsRep({
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
            loading={loadingRep}
            onClick={republishRequirement}
            className="btn btn-default wd-100"
          />
        </div>
      </div>
    </>
  );
}
