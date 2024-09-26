import { useTranslation } from "react-i18next";
import InputContainer from "../../../containers/InputContainer";

import ButtonContainer from "../../../containers/ButtonContainer";
import { Form } from "antd";
import FullNameAU from "./fullNameAU";
import DniAU from "./DniAU";
import LocationAU from "./LocationAU";
import AddressAU from "./AddressAU";
import PhoneAU from "./PhoneAu";

export default function AddUserModal() {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  function createUser(values: any) {
    console.log(values);
  }

  return (
    <div className="modal-card img-bg">
      <div className="t-flex t-wrap mr-sub">
        <div className="sub-titulo">
          <i className="fa-regular fa-users sub-icon"></i> {t("newEmployee")}
        </div>
      </div>
      <Form
        form={form}
        colon={false}
        requiredMark={false}
        onFinish={createUser}
      >
        <div className="t-flex form-tc">
          <div className="t-flex gap-15">
            <FullNameAU />
            <DniAU />
            <LocationAU />
          </div>
          <div className="t-flex gap-15">
            <AddressAU />
            <PhoneAU />
          </div>
          <div className="t-flex gap-15">
            <div className="t-flex ad-user">
              <div className="titulo-input">{t("email")}</div>
              <InputContainer type="text" className="form-control" />
            </div>
            <div className="t-flex ad-user">
              <div className="titulo-input">{t("userType")}</div>
              <InputContainer type="text" className="form-control" />
            </div>
          </div>
          <div className="t-flex t-wrap up-footer">
            <div className="footer-text">{t("allDataIsImportant")}</div>
            <div className="wd-25">
              <ButtonContainer
                className="btn btn-default wd-100"
                htmlType="submit"
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
