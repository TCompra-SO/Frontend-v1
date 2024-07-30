import { Col, Flex, Row } from "antd";
import SelectContainer from "../../../containers/SelectContainer";
import { Form } from "antd";
import { allSelect } from "../../../../utilities/globals";
import { useContext, useState } from "react";
import {
  OfferFilterTypes,
  PriceFilter,
  WarrantyFilter,
} from "../../../../utilities/types";
import { OfferFilters } from "../../../../models/Interfaces";
import { requirementDetailContext } from "../../../../contexts/requirementDetailContext";
import { useTranslation } from "react-i18next";

interface RequirementOfferFiltersProps {
  onFilterChange: (filterType: OfferFilterTypes, value: any) => void;
}

export default function RequirementOfferFilters(
  props: RequirementOfferFiltersProps
) {
  const { t } = useTranslation();
  const { updateFilters } = useContext(requirementDetailContext);
  const [form] = Form.useForm<OfferFilters>();
  const [initialValues] = useState({
    price: allSelect,
    location: allSelect,
    deliveryTime: allSelect,
    warranty: allSelect,
  });

  function onChangeFilters(changedValues: any, allValues: OfferFilters) {
    console.log(allValues);
    updateFilters(allValues);
    if (changedValues.price) {
      console.log("change price");
      props.onFilterChange(OfferFilterTypes.PRICE, changedValues.price);
    } else if (changedValues.location) {
      console.log("change location");
      props.onFilterChange(OfferFilterTypes.LOCATION, changedValues.location);
    } else if (changedValues.deliveryTime) {
      console.log("change deliveryTime");
      props.onFilterChange(
        OfferFilterTypes.DELIVERY,
        changedValues.deliveryTime
      );
    } else if (changedValues.warranty) {
      props.onFilterChange(OfferFilterTypes.WARRANTY, changedValues.warranty);
    }
  }

  return (
    <Form
      form={form}
      onValuesChange={onChangeFilters}
      initialValues={initialValues}
    >
      <Row gutter={[10, 10]}>
        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
          <Flex vertical align="center">
            <b>{t("priceColumn")}</b>
            <Form.Item
              name="price"
              style={{ width: "100%", marginBottom: "10px" }}
            >
              <SelectContainer
                options={[
                  { value: allSelect, label: t("all") },
                  { value: PriceFilter.ASC, label: t("ascending") },
                  { value: PriceFilter.DESC, label: t("descending") },
                ]}
                style={{ marginTop: "5px" }}
              />
            </Form.Item>
          </Flex>
        </Col>

        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
          <Flex vertical align="center">
            <b>{t("locationColumn")}</b>
            <Form.Item
              name="location"
              style={{ width: "100%", marginBottom: "10px" }}
            >
              <SelectContainer
                options={[
                  { value: allSelect, label: t("all") },
                  { value: "2", label: "Ascendente Ascendente" },
                ]}
                style={{ marginTop: "5px" }}
              />
            </Form.Item>
          </Flex>
        </Col>

        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
          <Flex vertical align="center">
            <b>{t("deliveryTime")}</b>
            <Form.Item
              name="deliveryTime"
              style={{ width: "100%", marginBottom: "10px" }}
            >
              <SelectContainer
                options={[
                  { value: allSelect, label: t("all") },
                  { value: "2", label: "Ascendente" },
                ]}
                style={{ marginTop: "5px" }}
              />
            </Form.Item>
          </Flex>
        </Col>

        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
          <Flex vertical align="center">
            <b>{t("warranty")}</b>
            <Form.Item
              name="warranty"
              style={{ width: "100%", marginBottom: "10px" }}
            >
              <SelectContainer
                options={[
                  { value: allSelect, label: t("all") },
                  { value: WarrantyFilter.ASC, label: t("ascending") },
                  { value: WarrantyFilter.DESC, label: t("descending") },
                ]}
                style={{ marginTop: "5px" }}
              />
            </Form.Item>
          </Flex>
        </Col>
      </Row>
    </Form>
  );
}
