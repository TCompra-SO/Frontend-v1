import { useTranslation } from "react-i18next";
import SelectContainer from "../../../containers/SelectContainer";
import { CanOfferType } from "../../../../utilities/types";
import { Form } from "antd";

export default function CanOfferCR() {
  const { t } = useTranslation();

  return (
    <>
      <div className="titulo-input">{t("whoCanMakeOffers")}</div>
      <Form.Item
        label={t("whoCanMakeOffers")}
        name="canOffer"
        labelCol={{ span: 0 }}
      >
        <SelectContainer
          placeholder={t("select")}
          className="form-control"
          style={{ width: "100%" }}
          options={[
            { label: t("anyUser"), value: CanOfferType.ALL },
            { label: t("premiumUsers"), value: CanOfferType.PREMIUM },
            {
              label: t("certifiedCompanies"),
              value: CanOfferType.CERTIFIED_COMPANY,
            },
          ]}
        />
      </Form.Item>
    </>
  );
}
