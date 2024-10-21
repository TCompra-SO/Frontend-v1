import { useTranslation } from "react-i18next";
import { FullUser, PlanData } from "../models/MainInterfaces";
import { EntityType, UserRoles } from "../utilities/types";
import { useContext, useEffect, useState } from "react";
import { ListsContext } from "../contexts/listsContext";
import PhoneField from "../components/common/formFields/PhoneField";
import LocationField from "../components/common/formFields/LocationField";
import AddressField from "../components/common/formFields/AddressField";
import EmailField from "../components/common/formFields/EmailField";
import { Col, Form, Row } from "antd";
import NameField from "../components/common/formFields/NameField";
import DniField from "../components/common/formFields/DniField";
import TenureField from "../components/common/formFields/TenureField";
import SpecialtyField from "../components/common/formFields/SpecialtyField";
import AboutMeField from "../components/common/formFields/AboutMeField";

const user1: FullUser = {
  uid: "user1",
  name: "Soluciones Online  S. A. C.",
  email: "john.doe@example.com",
  document: "123456789",
  typeEntity: EntityType.COMPANY,
  tenure: 6,
  customerScore: 4.5,
  sellerScore: 2.3,
  address: "Calle San Agustin 107 - Cercado - Arequipa",
  image:
    "https://imgv3.fotor.com/images/cover-photo-image/AI-illustration-of-a-dragon-by-Fotor-AI-text-to-image-generator.jpg",
  phone: "894859430",
  specialty:
    "especialty especialty especialty especialty especialty especialty especialty",
  aboutMe:
    "about me about me about me about me about me about me about me about me about me ",
  categories: [1, 2, 3],
  typeID: UserRoles.ADMIN,
  activeAccount: false,
  cityID: 1,
  countryID: 1,
  planID: 0,
  customerCount: 234,
  sellerCount: 12,
};

const planData1: PlanData = {
  goods: 9982,
  services: 1213,
  sales: 34,
  offers: 1394,
};

export default function MyProfile() {
  const { t } = useTranslation();
  const [user, setUser] = useState<FullUser>();
  const [plan, setPlan] = useState<PlanData>();
  const context = useContext(ListsContext);
  const { categoryData } = context;
  const [form] = Form.useForm();

  useEffect(() => {
    setUser(user1);
    setPlan(planData1);
  }, []);

  useEffect(() => {
    if (user)
      form.setFieldsValue({
        address: user.address,
        name: user.name,
        location: user.cityID,
        phone: user.phone,
        email: user.email,
        document: user.document,
        tenure: user.tenure,
        specialty: user.specialty,
        aboutMe: user.aboutMe,
      });
  }, [user]);

  return (
    <>
      <div className="t-flex t-wrap c-titulo">
        <div className="titulo">{t("myProfile")}</div>
      </div>
      <div className="t-flex gap-15 f-column">
        <div className="t-flex gap-15 perfil-user">
          {/* <Row>
            <Col xs={24} sm={24} md={12} lg={4} xl={4}> */}
          <div className="card-white imagen-perfil">
            <img src="img/avatar.jpg" className="imagen-p" />
            <div className="bnt-filter">
              {t("uploadImage")} <i className="fa-regular fa-images"></i>
            </div>
          </div>
          {/* </Col>
            <Col xs={24} sm={24} md={12} lg={20} xl={20}> */}
          <div className="t-flex gap-15 card-datos">
            <div className="card-white card-d1">
              <div className="user-name">{user?.name}</div>
              <div className="t-flex gap-10 datos-conacto">
                <div className="t-flex oferta-titulo d-contacto">
                  <div className="icon-doc-estado i-datos">
                    <i className="fa-regular fa-location-dot"></i>
                  </div>
                  <div className="oferta-usuario col-documento">
                    <div className="text-truncate dato-contact1">
                      {t("address")}
                    </div>
                    <div className="text-truncate dato-contact2">
                      {user?.address}
                    </div>
                  </div>
                </div>
                <div className="t-flex oferta-titulo d-contacto">
                  <div className="icon-doc-estado i-datos">
                    <i className="fa-regular fa-mobile"></i>
                  </div>
                  <div className="oferta-usuario col-documento">
                    <div className="text-truncate dato-contact1">
                      {t("phone")}
                    </div>
                    <div className="text-truncate dato-contact2">
                      {user?.phone}
                    </div>
                  </div>
                </div>
                <div className="t-flex oferta-titulo d-contacto">
                  <div className="icon-doc-estado i-datos">
                    <i className="fa-regular fa-envelope"></i>
                  </div>
                  <div className="oferta-usuario col-documento">
                    <div className="text-truncate dato-contact1">
                      {t("email")}
                    </div>
                    <div className="text-truncate dato-contact2">
                      {user?.email}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="t-flex gap-15 card-d2">
              <div className="card-rubros t-flex oferta-titulo doc-botones">
                <div className="icon-doc-estado i-rubro">
                  <i className="fa-regular fa-layer-group"></i>
                </div>
                <div className="oferta-usuario col-documento">
                  <div className="text-truncate doc-name">
                    {t("category")} 1
                  </div>
                  <div className="text-truncate detalles-oferta">
                    {user && categoryData[user?.categories[0]]?.value}
                  </div>
                </div>
              </div>
              <div className="card-rubros t-flex oferta-titulo doc-botones">
                <div className="icon-doc-estado i-rubro">
                  <i className="fa-regular fa-layer-group"></i>
                </div>
                <div className="oferta-usuario col-documento">
                  <div className="text-truncate doc-name">
                    {t("category")} 2
                  </div>
                  <div className="text-truncate detalles-oferta">
                    {user && categoryData[user?.categories[1]]?.value}
                  </div>
                </div>
              </div>
              <div className="card-rubros t-flex oferta-titulo doc-botones">
                <div className="icon-doc-estado i-rubro">
                  <i className="fa-regular fa-layer-group"></i>
                </div>
                <div className="oferta-usuario col-documento">
                  <div className="text-truncate doc-name">
                    {t("category")} 3
                  </div>
                  <div className="text-truncate detalles-oferta">
                    {user && categoryData[user?.categories[2]]?.value}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* </Col>
          </Row> */}
        </div>
        <div className="t-flex t-wrap gap-15 card-d3">
          {/* <Row>
            <Col xs={24} sm={24} md={12} lg={6} xl={6}> */}
          <div className="card-cantidad t-flex oferta-titulo doc-botones">
            <div className="icon-doc-estado i-cantidad">
              <i className="fa-regular fa-dolly"></i>
            </div>
            <div className="oferta-usuario col-documento">
              <div className="text-truncate doc-name dato-cantidad1">
                {plan?.goods}
              </div>
              <div className="text-truncate detalles-oferta dato-cantidad2">
                {t("goods")}
              </div>
            </div>
          </div>
          {/* </Col>
            <Col xs={24} sm={24} md={12} lg={6} xl={6}> */}
          <div className="card-cantidad t-flex oferta-titulo doc-botones">
            <div className="icon-doc-estado i-cantidad">
              <i className="fa-regular fa-hand-holding-magic"></i>
            </div>
            <div className="oferta-usuario col-documento">
              <div className="text-truncate doc-name dato-cantidad1">
                {plan?.services}
              </div>
              <div className="text-truncate detalles-oferta dato-cantidad2">
                {t("services")}
              </div>
            </div>
          </div>
          {/* </Col>
            <Col xs={24} sm={24} md={12} lg={6} xl={6}> */}
          <div className="card-cantidad t-flex oferta-titulo doc-botones">
            <div className="icon-doc-estado i-cantidad">
              <i className="fa-regular fa-basket-shopping"></i>
            </div>
            <div className="oferta-usuario col-documento">
              <div className="text-truncate doc-name dato-cantidad1">
                {plan?.sales}
              </div>
              <div className="text-truncate detalles-oferta dato-cantidad2">
                {t("sales")}
              </div>
            </div>
          </div>
          {/* </Col>
            <Col xs={24} sm={24} md={12} lg={6} xl={6}> */}
          <div className="card-cantidad t-flex oferta-titulo doc-botones">
            <div className="icon-doc-estado i-cantidad">
              <i className="fa-regular fa-tags"></i>
            </div>
            <div className="oferta-usuario col-documento">
              <div className="text-truncate doc-name dato-cantidad1">
                {plan?.offers}
              </div>
              <div className="text-truncate detalles-oferta dato-cantidad2">
                {t("offers")}
              </div>
            </div>
          </div>
          {/* </Col>
          </Row> */}
        </div>
        <div className="t-flex gap-15 card-d4">
          <div className="card-white card-personal">
            <div className="t-flex mr-sub-2">
              <i className="fa-regular fa-id-card-clip sub-icon m-0"></i>
              <div className="sub-titulo sub-calificar">
                <div>{t("personalData")}</div>
              </div>
            </div>
            <Form form={form} colon={false} requiredMark={false}>
              <div className="t-flex gap-15 f-column">
                <div className="t-flex t-wrap gap-15">
                  <NameField fromMyPerfil edit />
                  <AddressField fromMyPerfil />
                  <LocationField fromMyPerfil />
                </div>
                <div className="t-flex t-wrap gap-15">
                  <PhoneField fromMyPerfil />
                  <EmailField fromMyPerfil edit />
                  <DniField
                    isDni={user?.typeEntity != EntityType.COMPANY}
                    edit
                  />
                  {user?.typeEntity == EntityType.COMPANY && (
                    <TenureField fromMyPerfil />
                  )}
                </div>
                {user?.typeEntity == EntityType.COMPANY && (
                  <div className="t-flex t-wrap gap-15">
                    <SpecialtyField fromMyPerfil />
                    <AboutMeField fromMyPerfil />
                  </div>
                )}
                <div className="t-flex t-wrap up-footer">
                  <div className="footer-text">{t("allDataIsImportant")}</div>
                  <button className="btn btn-default">{t("saveButton")}</button>
                </div>
              </div>
            </Form>
          </div>
          <div className="card-white card-pass">
            <div className="t-flex mr-sub-2">
              <i className="fa-regular fa-user-lock sub-icon m-0"></i>
              <div className="sub-titulo sub-calificar">
                <div>{t("password")}</div>
              </div>
            </div>
            <div className="t-flex gap-15 f-column">
              <div className="t-flex f-column">
                <div className="titulo-input">{t("newPassword")}</div>
                <input type="text" className="form-control" />
              </div>
              <div className="t-flex f-column">
                <div className="titulo-input">{t("confirmPassword")}</div>
                <input type="text" className="form-control" />
              </div>
              <button className="btn btn-default wd-100">
                {t("saveButton")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
