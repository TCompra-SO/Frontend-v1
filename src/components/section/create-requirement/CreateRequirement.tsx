import { Col, Form, Row } from "antd";
import CategoryCR from "./create-requirement-items/CategoryCR";
import TitleCR from "./create-requirement-items/TitleCR";
import { useTranslation } from "react-i18next";
import DescriptionCR from "./create-requirement-items/DescriptionCR";
import CanOfferCR from "./create-requirement-items/CanOfferCR";
import EmailCR from "./create-requirement-items/EmailCR";
import LocationCR from "./create-requirement-items/LocationCR";
import BudgetCR from "./create-requirement-items/BudgetCR";
import CurrencyCR from "./create-requirement-items/CurrencyCR";
import PaymentMethodCR from "./create-requirement-items/PaymentMethodCR";
import FinalDateCR from "./create-requirement-items/FinalDateCR";
import DeliveryTimeCR from "./create-requirement-items/DeliveryTimeCR";
import WarrantyCR from "./create-requirement-items/WarrantyCR";
import WarrantyTimeCR from "./create-requirement-items/WarrantyTimeCR";
import DocumentsCertifCR from "./create-requirement-items/DocumentsCertifCR";
import AddImagesRC from "./create-requirement-items/AddImagesRC";
import AddDocument from "./create-requirement-items/AddDocument";
import ButtonContainer from "../../containers/ButtonContainer";
import { ListsContext } from "../../../contexts/ListsContext";
import { useContext } from "react";

export default function CreateRequirement() {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  function createRequirement(values: any) {
    console.log(values);
  }

  return (
    <div
      className="modal-card img-bg scroll-y"
      style={{ maxHeight: "calc(100vh - 170px)" }}
    >
      <div className="t-flex t-wrap mr-sub">
        <div className="sub-titulo" style={{ fontSize: "26px" }}>
          <i
            className="fa-regular fa-paste sub-icon"
            style={{ fontSize: "24px" }}
          ></i>{" "}
          {t("newRequirement")}
        </div>
      </div>
      <div className="t-flex mr-sub">
        <ButtonContainer common className="btn btn-grey wd-25">
          <i className="fa-regular fa-dolly"></i>{" "}
          <span className="req-btn-info">{t("goods")}</span>
        </ButtonContainer>
        <ButtonContainer common className="btn btn-grey wd-25">
          <i className="fa-regular fa-hand-holding-magic"></i>{" "}
          <span className="req-btn-info">{t("services")}</span>
        </ButtonContainer>
        <ButtonContainer common className="btn btn-grey wd-25">
          <i className="fa-regular fa-basket-shopping"></i>{" "}
          <span className="req-btn-info">{t("sales")}</span>
        </ButtonContainer>
        <ButtonContainer common className="btn btn-grey wd-25">
          <i className="fa-regular fa-user-tie"></i>{" "}
          <span className="req-btn-info">{t("rrhh")}</span>
        </ButtonContainer>
      </div>

      <Form
        form={form}
        colon={false}
        requiredMark={false}
        onFinish={createRequirement}
      >
        <div className="t-flex form-tc">
          <div>
            <TitleCR />
          </div>
          <div>
            <DescriptionCR />
          </div>
          <div>
            <CanOfferCR />
          </div>
          <div>
            <DocumentsCertifCR />
          </div>
          <Row gutter={[15, 15]}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <CategoryCR></CategoryCR>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <EmailCR email={"aaaaa"} />
            </Col>
          </Row>

          <Row gutter={[15, 15]}>
            <Col xs={24} sm={24} md={6} lg={6} xl={6}>
              <LocationCR />
            </Col>
            <Col xs={24} sm={24} md={6} lg={6} xl={6}>
              <BudgetCR />
            </Col>
            <Col xs={24} sm={24} md={6} lg={6} xl={6}>
              <CurrencyCR />
            </Col>
            <Col xs={24} sm={24} md={6} lg={6} xl={6}>
              <PaymentMethodCR />
            </Col>
          </Row>

          <Row gutter={[15, 15]}>
            <Col xs={24} sm={24} md={6} lg={6} xl={6}>
              <FinalDateCR />
            </Col>
            <Col xs={24} sm={24} md={6} lg={6} xl={6}>
              <DeliveryTimeCR />
            </Col>
            <Col xs={24} sm={24} md={6} lg={6} xl={6}>
              <WarrantyCR />
            </Col>
            <Col xs={24} sm={24} md={6} lg={6} xl={6}>
              <WarrantyTimeCR />
            </Col>
          </Row>

          <Row gutter={[15, 15]}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <AddImagesRC />
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <AddDocument />
            </Col>
          </Row>
          <div className="t-flex t-wrap up-footer">
            <div className="footer-text">{t("allDataIsImportant")}</div>
            <div className="wd-25">
              <ButtonContainer
                htmlType="submit"
                className="btn btn-default wd-100"
              >
                {t("saveButton")}
              </ButtonContainer>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
}
