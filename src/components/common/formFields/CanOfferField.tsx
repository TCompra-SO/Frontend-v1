import { useTranslation } from "react-i18next";
import { Form } from "antd";
import { useContext } from "react";
import { RequirementType } from "../../../utilities/types";
import { ListsContext } from "../../../contexts/listsContext";
import SelectContainer from "../../containers/SelectContainer";
import { getListForSelectIdValueMap } from "../../../utilities/globalFunctions";
import { certifiedCompaniesOpt } from "../../../utilities/globals";

interface CanOfferFieldProps {
  type: RequirementType;
  handleOptionChange: (value: any) => void;
}

export default function CanOfferField(props: CanOfferFieldProps) {
  const { t } = useTranslation();
  const context = useContext(ListsContext);
  const { whoCanOfferData } = context;

  return (
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
            ? getListForSelectIdValueMap(whoCanOfferData).filter((item) => {
                if (item.value != certifiedCompaniesOpt) return item;
              })
            : getListForSelectIdValueMap(whoCanOfferData)
        }
      />
    </Form.Item>
  );
}
