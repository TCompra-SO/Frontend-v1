import { useTranslation } from "react-i18next";
import SelectContainer from "../../../containers/SelectContainer";
import { Form } from "antd";
import { useContext } from "react";
import { ListsContext } from "../../../../contexts/listsContext";
import { RequirementType } from "../../../../utilities/types";
import { certifiedCompaniesOpt } from "../../../../utilities/globals";

interface CanOfferCRProps {
  type: RequirementType;
  handleOptionChange: (value: any) => void;
}

export default function CanOfferCR(props: CanOfferCRProps) {
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
          onChange={props.handleOptionChange}
          style={{ width: "100%" }}
          options={
            props.type == RequirementType.SALE
              ? Object.entries(whoCanOfferList)
                  .map(([id, { value }]) => ({
                    label: value,
                    value: Number(id),
                  }))
                  .filter((item) => {
                    if (item.value != certifiedCompaniesOpt) return item;
                  })
              : Object.entries(whoCanOfferList).map(([id, { value }]) => ({
                  label: value,
                  value: Number(id),
                }))
          }
        />
      </Form.Item>
    </>
  );
}
