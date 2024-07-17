import { Col, Flex, Row } from "antd";
import SelectContainer from "../../containers/SelectContainer";
import { Form } from "antd";
import { allSelect } from "../../../utilities/globals";
import { useState } from "react";

interface Filters {
  price: string;
  location: string;
  deliveryTime: string;
  warranty: string;
}

export default function RequirementOfferFilters() {
  const [form] = Form.useForm<Filters>();
  const [initialValues] = useState({
    price: allSelect,
    location: allSelect,
    deliveryTime: allSelect,
    warranty: allSelect,
  });

  function onChangeFilters(changedValues: any, allValues: Filters) {
    console.log(allValues);
    if (changedValues.price) console.log("change price");
    if (changedValues.location) console.log("change location");
    if (changedValues.deliveryTime) console.log("change deliveryTime");
    if (changedValues.warranty) console.log("change warranty");
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
            <b>Precio</b>
            <Form.Item name="price" style={{ width: "100%" }}>
              <SelectContainer
                options={[
                  { value: allSelect, label: "Todos" },
                  { value: "2", label: "Ascendente" },
                ]}
                style={{ marginTop: "5px" }}
              />
            </Form.Item>
          </Flex>
        </Col>

        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
          <Flex vertical align="center">
            <b>Ubicación</b>
            <Form.Item name="location" style={{ width: "100%" }}>
              <SelectContainer
                options={[
                  { value: allSelect, label: "Todos" },
                  { value: "2", label: "Ascendente Ascendente" },
                ]}
                style={{ marginTop: "5px" }}
              />
            </Form.Item>
          </Flex>
        </Col>

        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
          <Flex vertical align="center">
            <b>Tiempo de entrega</b>
            <Form.Item name="deliveryTime" style={{ width: "100%" }}>
              <SelectContainer
                options={[
                  { value: allSelect, label: "Todos" },
                  { value: "2", label: "Ascendente" },
                ]}
                style={{ marginTop: "5px" }}
              />
            </Form.Item>
          </Flex>
        </Col>

        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
          <Flex vertical align="center">
            <b>Garantía</b>
            <Form.Item name="warranty" style={{ width: "100%" }}>
              <SelectContainer
                options={[
                  { value: allSelect, label: "Todos" },
                  { value: "2", label: "Ascendente" },
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
