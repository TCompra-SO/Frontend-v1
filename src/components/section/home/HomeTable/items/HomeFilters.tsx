import { useTranslation } from "react-i18next";
import InputContainer from "../../../../containers/InputContainer";
import ButtonContainer from "../../../../containers/ButtonContainer";
import { useState } from "react";
import { RequirementType } from "../../../../../utilities/types";
import { getLabelFromRequirementType } from "../../../../../utilities/globalFunctions";
import RangeDatePickerContainer from "../../../../containers/RangeDatePicker";
import LocationField from "../../../../common/formFields/LocationField";
import CategoryField from "../../../../common/formFields/CategoryField";
import { Form } from "antd";
import KeywordsField from "../../../../common/formFields/KeywordsField";

export default function HomeFilters() {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [type, setType] = useState<RequirementType>(RequirementType.GOOD);
  const [hideFilters, setHideFilters] = useState(true);

  /**
   * Funciones
   */

  return (
    <>
      <div className="t-flex mr-sub m-0">
        <ButtonContainer
          common
          className="btn btn-pink wd-33 t-flex f-column j-items gap-10 btn-pd"
          onClick={() => setType(RequirementType.GOOD)}
        >
          <i className="fa-duotone fa-dolly"></i>{" "}
          <span className="req-btn-info">{t("goods")}</span>
        </ButtonContainer>
        <ButtonContainer
          common
          className="btn btn-pink wd-33 t-flex f-column j-items gap-10 btn-pd"
          onClick={() => setType(RequirementType.SERVICE)}
        >
          <i className="fa-duotone fa-hand-holding-magic"></i>{" "}
          <span className="req-btn-info">{t("services")}</span>
        </ButtonContainer>
        <ButtonContainer
          common
          className="btn btn-pink wd-33 t-flex f-column j-items gap-10 btn-pd"
          onClick={() => setType(RequirementType.SALE)}
        >
          <i className="fa-duotone fa-basket-shopping"></i>{" "}
          <span className="req-btn-info">{t("sales")}</span>
        </ButtonContainer>
        {/* <button className="btn btn-pink wd-25 t-flex f-column j-items gap-10 btn-pd"><i className="fa-duotone fa-user-tie"></i> <span className="req-btn-info">RR.HH</span></button> */}
      </div>
      <div className="t-flex gap-10 f-column">
        <div className="card-gray back-white">
          <div className="list-requ">
            <i className="fa-duotone fa-stream"></i> {t("listOf")}{" "}
            {t(getLabelFromRequirementType(type, true))}
          </div>
          <div
            className="bnt-filter filtro-e"
            onClick={() => setHideFilters(!hideFilters)}
          >
            <span className="req-btn-info">{t("filters")}</span>{" "}
            <i className="fa-regular fa-filter"></i>
          </div>
        </div>
        <Form
          form={form}
          colon={false}
          requiredMark={false}
          // onFinish={createRequirement}
        >
          <div
            className="card-gray back-white t-flex f-column gap-10"
            style={hideFilters ? { display: "none" } : {}}
          >
            <div className="filter-in">
              <KeywordsField />
              <LocationField onlyItem />
              <CategoryField showLabelPlaceholder />
              <RangeDatePickerContainer
                className="form-control"
                placeholder={[t("rangeStart"), t("rangeEnd")]}
              />
            </div>
            <div className="filter-in">
              <InputContainer
                type="text"
                className="form-control f-empresa"
                placeholder={t("companyName")}
              />
              <ButtonContainer
                className="btn btn-second alert-boton"
                icon={
                  <i className="fa-solid fa-magnifying-glass-arrows-rotate"></i>
                }
              >
                {t("resetFilters")}{" "}
              </ButtonContainer>
            </div>
          </div>
        </Form>
      </div>
    </>
  );
}
