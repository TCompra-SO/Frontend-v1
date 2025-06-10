import { Col, Flex, Popover, Row } from "antd";
import SelectContainer from "../../../containers/SelectContainer";
import { Form } from "antd";
import {
  allSelect,
  commonModalWidth,
  defaultCountry,
} from "../../../../utilities/globals";
import { useContext, useEffect, useState } from "react";
import { CommonFilter, filterLabels } from "../../../../utilities/types";
import { OfferFilters } from "../../../../models/Interfaces";
import { requirementDetailContext } from "../../../../contexts/RequirementDetailContext";
import { useTranslation } from "react-i18next";
import { ListsContext } from "../../../../contexts/ListsContext";
import {
  getCityListForSelect,
  getListForSelectIdValueMap,
} from "../../../../utilities/globalFunctions";

interface RequirementOfferFiltersProps {
  fromPurchaseOrder: boolean;
  filters?: OfferFilters;
}

export default function RequirementOfferFilters(
  props: RequirementOfferFiltersProps
) {
  const { t } = useTranslation();
  const { updateFilters, filterNames } = useContext(requirementDetailContext);
  const [form] = Form.useForm<OfferFilters>();
  const context = useContext(ListsContext);
  const { countryData, deliveryTimeData } = context;
  const showCountry = countryData[defaultCountry]
    ? defaultCountry
    : Object.keys(countryData)[0];
  const [commonList] = useState(
    Object.keys(CommonFilter)
      .filter((key) => isNaN(Number(key)))
      .map((enumKey) => ({
        value: CommonFilter[enumKey as keyof typeof CommonFilter],
        label: t(
          filterLabels[CommonFilter[enumKey as keyof typeof CommonFilter]]
        ),
      }))
  );

  const [initialValues] = useState<OfferFilters>(
    props.filters ?? {
      price: allSelect,
      location: allSelect,
      deliveryTime: allSelect,
      warranty: allSelect,
    }
  );

  useEffect(() => {
    updateFilters(initialValues, {
      location: t("all"),
      deliveryTime: t("all"),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues]);

  function onChangeFilters(changedValues: any, allValues: OfferFilters) {
    let location: string = filterNames.location;
    let deliveryTime: string = filterNames.deliveryTime;

    if (changedValues.location) {
      location =
        countryData[showCountry].cities.find(
          (city) => city.id == changedValues.location
        )?.value ?? t("all");
    }
    if (changedValues.deliveryTime) {
      deliveryTime =
        deliveryTimeData[changedValues.deliveryTime]?.value ?? t("all");
    }
    if (changedValues.price && changedValues.price != CommonFilter.ALL) {
      allValues.warranty = CommonFilter.ALL;
      form.setFieldValue("warranty", allValues.warranty);
    } else if (
      changedValues.warranty &&
      changedValues.warranty != CommonFilter.ALL
    ) {
      allValues.price = CommonFilter.ALL;
      form.setFieldValue("price", allValues.price);
    }

    updateFilters(allValues, {
      location,
      deliveryTime,
    });
  }

  return (
    <div className="card-gray">
      <div className="ofertas-recib">{t("receivedOffers")}</div>
      <Popover
        placement="bottomRight"
        trigger="click"
        content={
          <Form
            form={form}
            onValuesChange={onChangeFilters}
            initialValues={initialValues}
          >
            <Row
              gutter={[10, 10]}
              style={{
                maxWidth: commonModalWidth * 0.85,
                width: "85vw",
              }}
            >
              <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                <Flex vertical align="center">
                  <b style={{ color: "#92acbf" }}>{t("price")}</b>
                  <Form.Item
                    name="price"
                    style={{
                      width: "100%",
                    }}
                  >
                    <SelectContainer
                      options={commonList}
                      style={{ marginTop: "5px" }}
                      className="form-control"
                      disabled={props.fromPurchaseOrder}
                    />
                  </Form.Item>
                </Flex>
              </Col>

              <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                <Flex vertical align="center">
                  <b style={{ color: "#92acbf" }}>{t("locationColumn")}</b>
                  <Form.Item name="location" style={{ width: "100%" }}>
                    <SelectContainer
                      disabled={props.fromPurchaseOrder}
                      options={[{ label: t("all"), value: allSelect }].concat(
                        getCityListForSelect(countryData, showCountry)
                      )}
                      className="form-control"
                      style={{ marginTop: "5px" }}
                    />
                  </Form.Item>
                </Flex>
              </Col>

              <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                <Flex vertical align="center">
                  <b style={{ color: "#92acbf" }}>{t("delivery")}</b>
                  <Form.Item name="deliveryTime" style={{ width: "100%" }}>
                    <SelectContainer
                      disabled={props.fromPurchaseOrder}
                      options={[{ label: t("all"), value: allSelect }].concat(
                        getListForSelectIdValueMap(deliveryTimeData)
                      )}
                      style={{ marginTop: "5px" }}
                      className="form-control"
                    />
                  </Form.Item>
                </Flex>
              </Col>

              <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                <Flex vertical align="center">
                  <b style={{ color: "#92acbf" }}>{t("warranty")}</b>
                  <Form.Item name="warranty" style={{ width: "100%" }}>
                    <SelectContainer
                      disabled={props.fromPurchaseOrder}
                      options={commonList}
                      style={{ marginTop: "5px" }}
                      className="form-control"
                    />
                  </Form.Item>
                </Flex>
              </Col>
            </Row>
          </Form>
        }
      >
        <div className="bnt-filter">
          <span className="req-btn-info">{t("filter")}</span>{" "}
          <i className="fa-regular fa-filter"></i>
        </div>
      </Popover>
    </div>
  );
}
