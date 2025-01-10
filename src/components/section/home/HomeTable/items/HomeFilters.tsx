import { useTranslation } from "react-i18next";
import ButtonContainer from "../../../../containers/ButtonContainer";
import { useContext, useEffect, useState } from "react";
import { RequirementType } from "../../../../../utilities/types";
import { getLabelFromRequirementType } from "../../../../../utilities/globalFunctions";
import LocationField from "../../../../common/formFields/LocationField";
import CategoryField from "../../../../common/formFields/CategoryField";
import { Form } from "antd";
import KeywordsField from "../../../../common/formFields/KeywordsField";
import { MainState } from "../../../../../models/Redux";
import { useSelector } from "react-redux";
import SelectCompanyField from "../../CompanyFilter/SelectCompanyField";
import RangeDateField from "../../../../common/formFields/RangeDateField";
import {
  dateFormatHomeSearch,
  pageSizeOptionsSt,
} from "../../../../../utilities/globals";
import dayjs from "dayjs";
import { HomeContext } from "../../../../../contexts/Homecontext";
import { HomeFilterRequest } from "../../../../../models/Requests";

export default function HomeFilters() {
  const { t } = useTranslation();
  const isPremium = useSelector((state: MainState) => state.mainUser.isPremium);
  const [form] = Form.useForm();
  const [type, setType] = useState<RequirementType>(RequirementType.GOOD);
  const [hideFilters, setHideFilters] = useState(true);
  const {
    updateUseFilter,
    retrieveRequirements,
    loadingRequirementList,
    useFilter,
    updatePage,
    page,
  } = useContext(HomeContext);
  const [homeFilter, setHomeFilter] = useState<HomeFilterRequest>({
    page: 1,
    pageSize: pageSizeOptionsSt[0],
  });

  /** Paginación */

  useEffect(() => {
    if (useFilter) {
      const newPageFilter = homeFilter;
      newPageFilter.page = page;
      retrieveRequirements(page, pageSizeOptionsSt[0], newPageFilter);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [homeFilter, page]);

  /**
   * Funciones
   */

  function search(values: any) {
    updateUseFilter(true);
    const list = Object.values(values).map((val) => {
      if (typeof val === "string" && val.trim() === "") return undefined;
      else return val;
    });
    const temp = list.some((value) => value !== undefined);

    if (temp) {
      const filter: HomeFilterRequest = {
        keyWords: values.keywords?.trim(),
        location: values.location,
        category: values.category,
        startDate:
          values.rangeDate && values.rangeDate[0]
            ? dayjs(values.rangeDate[0]).format(dateFormatHomeSearch)
            : undefined,
        endDate:
          values.rangeDate && values.rangeDate[1]
            ? dayjs(values.rangeDate[1]).format(dateFormatHomeSearch)
            : undefined,
        companyId: values.companyId,
        page: 1,
        pageSize: pageSizeOptionsSt[0],
      };
      updatePage(1);
      setHomeFilter(filter);
    }
  }

  function resetFilters() {
    form.resetFields();
    updateUseFilter(false);
  }

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
        <Form form={form} colon={false} requiredMark={false} onFinish={search}>
          <div
            className="card-gray back-white t-flex f-column gap-10"
            style={hideFilters ? { display: "none" } : {}}
          >
            <div className="filter-in">
              <KeywordsField />
              <LocationField onlyItem required={false} />
              <CategoryField showLabelPlaceholder required={false} />
              <RangeDateField
                name={"rangeDate"}
                placeholder={[t("rangeStart"), t("rangeEnd")]}
                allowEmpty
              />
            </div>
            <div className="filter-in">
              {isPremium ? (
                <Form.Item name="companyId" className="f-empresa">
                  <SelectCompanyField
                    onCompanySelected={(companyId) => {
                      form.setFieldValue("companyId", companyId);
                    }}
                    forHomeFilter
                  />
                </Form.Item>
              ) : (
                <div className="f-empresa"></div>
              )}
              <ButtonContainer
                className="btn btn-green-o alert-boton"
                icon={<i className="fa-solid fa-search"></i>}
                htmlType="submit"
                loading={loadingRequirementList}
              >
                {t("search")}
              </ButtonContainer>
              <ButtonContainer
                className="btn btn-second alert-boton"
                icon={
                  <i className="fa-solid fa-magnifying-glass-arrows-rotate"></i>
                }
                onClick={resetFilters}
              >
                {t("resetFilters")}
              </ButtonContainer>
            </div>
          </div>
        </Form>
      </div>
    </>
  );
}
