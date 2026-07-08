import { useTranslation } from "react-i18next";
import { Form } from "antd";
import { useContext } from "react";
import { EntityType, RequirementType } from "../../../utilities/types";
import { ListsContext } from "../../../contexts/ListsContext";
import SelectContainer from "../../containers/SelectContainer";
import { getListForSelectIdValueMap } from "../../../utilities/globalFunctions";
import { certifiedCompaniesOpt } from "../../../utilities/globals";
import { useSelector } from "react-redux";
import { MainState } from "../../../models/Redux";


interface CanOfferFieldProps {
  type: RequirementType;
  handleOptionChange?: (value: any) => void;
  onBlur?: () => void;
}

export default function CanOfferField(props: CanOfferFieldProps) {
  const { t } = useTranslation();
  const context = useContext(ListsContext);
  const { whoCanOfferData } = context;
  const userType = useSelector((state: MainState) => state.user.typeEntity);
  console.log(userType)
  return (
    <Form.Item
      label={t("field")}
      name="canOffer"
      labelCol={{ span: 0 }}
      rules={[{ required: true }]}
    >
      <SelectContainer
        onBlur={props.onBlur}
        mode="multiple"
        showSearch={false}
        placeholder={t("select")}
        className="form-control"
        onChange={props.handleOptionChange}
        style={{ width: "100%" }}
        options={
          props.type == RequirementType.SALE || userType !== EntityType.COMPANY
            ? getListForSelectIdValueMap(whoCanOfferData).filter((item) => {
              if (item.value != certifiedCompaniesOpt) return item;
            })
            : getListForSelectIdValueMap(whoCanOfferData)
        }
      />
    </Form.Item>
  );
}
