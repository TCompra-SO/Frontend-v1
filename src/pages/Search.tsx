import { Col, Flex, Form, Row } from "antd";
import DateSearch from "../components/section/search/DateSearch";
import CitySearch from "../components/section/search/CitySearch";
import RequirementType from "../components/section/search/RequirementType";
import Company from "../components/section/search/Company";
import Keyword from "../components/section/search/Keyword";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { Category, RequirementSearchItem } from "../models/Interfaces";
import MoreOptionsSearch from "../components/section/search/MoreOptionsSearch";
import { darkColor } from "../utilities/colors";
import ButtonContainer from "../components/containers/ButtonContainer";
import { useTranslation } from "react-i18next";

const categories: Category[] = [
  {
    id: "1",
    name: "Hardware",
  },
  {
    id: "2",
    name: "Casa y hogar",
  },
];

const requirements: RequirementSearchItem[] = [
  {
    id: "10",
    title: "Se requiere ...",
  },
  {
    id: "11",
    title: "Requerimos...",
  },
];

export default function Search() {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [showMoreOptions, setShowMoreOptions] = useState(false);

  function handleShowMoreOptions() {
    form.resetFields(["reqTypeSearch", "citySearch", "startDate", "endDate"]);
    setShowMoreOptions(!showMoreOptions);
  }

  const handleCloseModal = () => {
    setShowMoreOptions(false);
  };

  return (
    <>
      <Flex
        align="center"
        style={{
          height: "700px",
          backgroundColor: "bisque",
        }}
      >
        <Flex
          vertical
          justify="center"
          align="center"
          style={{
            width: "100%",
            backgroundColor: darkColor,
            padding: "20px",
          }}
        >
          <Form form={form} className="search-form">
            <Row>
              <Col
                xs={24}
                sm={24}
                md={24}
                lg={20}
                xl={20}
                style={{
                  padding: "15px",
                }}
              >
                <Row style={{ marginBottom: "20px" }}>
                  <Company></Company>
                </Row>
                <Keyword
                  categories={categories}
                  requirements={requirements}
                ></Keyword>
                <Col
                  xs={0}
                  sm={0}
                  md={0}
                  lg={24}
                  xl={24}
                  style={{ height: "20px" }}
                ></Col>
                <Row gutter={[10, 10]}>
                  <Col xs={0} sm={0} md={0} lg={6} xl={6}>
                    <CitySearch></CitySearch>
                  </Col>
                  <Col xs={0} sm={0} md={0} lg={6} xl={6}>
                    <RequirementType></RequirementType>
                  </Col>
                  <Col xs={0} sm={0} md={0} lg={6} xl={6}>
                    <DateSearch placeholder={t("startDate")} name="startDate" />
                  </Col>
                  <Col xs={0} sm={0} md={0} lg={6} xl={6}>
                    <DateSearch placeholder={t("endDate")} name="endDate" />
                  </Col>
                </Row>
              </Col>

              <Col
                xs={24}
                sm={24}
                md={24}
                lg={4}
                xl={4}
                style={{
                  padding: "15px",
                }}
              >
                <Row
                  align="middle"
                  justify="center"
                  style={{ height: "100%" }}
                  gutter={10}
                >
                  <Col lg={0} xl={0}>
                    <ButtonContainer
                      ghost
                      style={{ height: "80px", borderRadius: "25px" }}
                      onClick={handleShowMoreOptions}
                      children={
                        !showMoreOptions ? (
                          <MenuFoldOutlined />
                        ) : (
                          <MenuUnfoldOutlined />
                        )
                      }
                    />
                  </Col>
                  <Col flex="auto" lg={24} xl={24}>
                    <ButtonContainer
                      icon={<SearchOutlined />}
                      type="primary"
                      block={true}
                      style={{
                        height: "80px",
                        borderRadius: "25px",
                        fontSize: "20px",
                      }}
                      children={t("search")}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
            {
              <MoreOptionsSearch
                visible={showMoreOptions}
                onClose={handleCloseModal}
              ></MoreOptionsSearch>
            }
          </Form>
        </Flex>
      </Flex>
    </>
  );
}
