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

export default function CreateRequirement() {
  const { t } = useTranslation();
  const [form] = Form.useForm();

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
        <button className="btn btn-grey wd-25">
          <i className="fa-regular fa-dolly"></i>{" "}
          <span className="req-btn-info">{t("goods")}</span>
        </button>
        <button className="btn btn-grey wd-25">
          <i className="fa-regular fa-hand-holding-magic"></i>{" "}
          <span className="req-btn-info">{t("services")}</span>
        </button>
        <button className="btn btn-grey wd-25">
          <i className="fa-regular fa-basket-shopping"></i>{" "}
          <span className="req-btn-info">{t("sales")}</span>
        </button>
        <button className="btn btn-grey wd-25">
          <i className="fa-regular fa-user-tie"></i>{" "}
          <span className="req-btn-info">{t("rrhh")}</span>
        </button>
      </div>

      <Form form={form} colon={false} requiredMark={false}>
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

          <div className="t-flex gap-15">
            <div className="wd-50">
              <div className="multimedia-subir">
                <i className="fa-regular fa-images"></i> Agregar Imagenes
              </div>
              <div className="t-flex galeria-min">
                <div>
                  <img src="img/avatar.jpg" className="img-min" />
                  <i className="fa-solid fa-circle-xmark img-trash"></i>
                </div>
                <div>
                  <img src="img/avatar.jpg" className="img-min" />
                  <i className="fa-solid fa-circle-xmark img-trash"></i>
                </div>
                <div>
                  <img src="img/avatar.jpg" className="img-min" />
                  <i className="fa-solid fa-circle-xmark img-trash"></i>
                </div>
                <div>
                  <img src="img/avatar.jpg" className="img-min" />
                  <i className="fa-solid fa-circle-xmark img-trash"></i>
                </div>
              </div>
            </div>
            <div className="wd-50">
              <div className="multimedia-subir">
                <i className="fa-regular fa-file-lines"></i> Agregar Documentos
              </div>
              <div className="t-flex galeria-min">
                <div>
                  <div className="file-min">
                    <i className="fa-regular fa-file-lines"></i>
                  </div>
                  <i className="fa-solid fa-circle-xmark img-trash"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="t-flex t-wrap up-footer">
            <div className="footer-text">Todos los datos son importantes</div>
            <div className="wd-25">
              <button className="btn btn-default wd-100">Guardar</button>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
}
