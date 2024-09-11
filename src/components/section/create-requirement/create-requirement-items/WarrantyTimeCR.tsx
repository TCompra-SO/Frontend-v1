import { useTranslation } from "react-i18next";
import SelectContainer from "../../../containers/SelectContainer";
import { TimeMeasurement } from "../../../../utilities/types";
import { Form } from "antd";

export default function WarrantyTimeCR() {
  const { t } = useTranslation();

  return (
    <>
      <div className="titulo-input">{t("duration")}</div>
      <Form.Item label={t("duration")} name="duration" labelCol={{ span: 0 }}>
        <SelectContainer
          placeholder={t("select")}
          className="form-control"
          style={{ width: "100%" }}
          options={[
            { label: t("years"), value: TimeMeasurement.YEARS },
            { label: t("months"), value: TimeMeasurement.MONTHS },
            { label: t("days"), value: TimeMeasurement.DAYS },
          ]}
        />
      </Form.Item>
    </>
  );
}
