import { useTranslation } from "react-i18next";
import SelectContainer from "../../../containers/SelectContainer";
import { Form } from "antd";
import { useContext } from "react";
import { ListsContext } from "../../../../contexts/ListsContext";
import { IdValueObj } from "../../../../models/Interfaces";

export default function CanOfferCR() {
  const { t } = useTranslation();
  const context = useContext(ListsContext);
  const { whoCanOfferList } = context;

  return (
    <>
      <div className="titulo-input">{t("whoCanMakeOffers")}</div>
      <Form.Item
        label={t("field")}
        name="canOffer"
        labelCol={{ span: 0 }}
        rules={[{ required: true }]}
      >
        <SelectContainer
          placeholder={t("select")}
          className="form-control"
          style={{ width: "100%" }}
          // options={[
          //   { label: t("anyUser"), value: CanOfferType.ALL },
          //   { label: t("premiumUsers"), value: CanOfferType.PREMIUM },
          //   {
          //     label: t("certifiedCompanies"),
          //     value: CanOfferType.CERTIFIED_COMPANY,
          //   },
          // ]}
          options={whoCanOfferList.map((item: IdValueObj) => {
            return { label: item.value, value: item.id };
          })}
        />
      </Form.Item>
    </>
  );
}
