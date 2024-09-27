import { useTranslation } from "react-i18next";
import ButtonContainer from "../../../containers/ButtonContainer";
import { App, Col, Form, Row } from "antd";
import DniAU from "./DniAU";
import LocationAU from "./LocationAU";
import AddressAU from "./AddressAU";
import FullNameAU from "./FullNameAU";
import PhoneAU from "./PhoneAU";
import EmailAU from "./EmailAU";
import UserTypeAU from "./UserTypeAU";
import { getNameReniecService } from "../../../../services/utilService";
import { useEffect, useState } from "react";
import {
  GetNameReniecRequest,
  RegisterSubUserRequest,
} from "../../../../models/Requests";
import { useApiParams } from "../../../../models/Interfaces";
import useApi from "../../../../hooks/useApi";
import showNotification from "../../../../utilities/notification/showNotification";
import { registerSubUserService } from "../../../../services/subUserService";
import { useSelector } from "react-redux";
import { MainState } from "../../../../models/Redux";
import { equalServices } from "../../../../utilities/globalFunctions";

interface AddUserModalProps {
  onClose: () => void;
}

export default function AddUserModal(props: AddUserModalProps) {
  const { t } = useTranslation();
  const { notification } = App.useApp();
  const [form] = Form.useForm();
  const [validDoc, setValidDoc] = useState(false);
  const uid = useSelector((state: MainState) => state.user.uid);
  const [loadingRegisterUser, setLoadingRegisterUser] = useState(false);
  const [apiParams, setApiParams] = useState<
    useApiParams<GetNameReniecRequest | RegisterSubUserRequest>
  >({
    service: null,
    method: "get",
  });
  const { loading, responseData, error, errorMsg, fetchData } = useApi<
    GetNameReniecRequest | RegisterSubUserRequest
  >({
    service: apiParams.service,
    method: apiParams.method,
    dataToSend: apiParams.dataToSend,
  });

  useEffect(() => {
    if (apiParams.service) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiParams]);

  useEffect(() => {
    if (equalServices(apiParams.service, registerSubUserService())) {
      setLoadingRegisterUser(loading);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  useEffect(() => {
    if (responseData) {
      if (equalServices(apiParams.service, getNameReniecService(""))) {
        form.setFieldValue("fullname", responseData.data);
        setValidDoc(true);
      } else if (equalServices(apiParams.service, registerSubUserService())) {
        showNotification(
          notification,
          "success",
          `${t("registerUserSuccess")}. ${t("subUserPasswordIsDocument")}`
        );
        props.onClose();
      }
    } else if (error) {
      showNotification(notification, "error", errorMsg);
      if (equalServices(apiParams.service, getNameReniecService("")))
        setValidDoc(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData, error]);

  function resetFields(fields?: string[]) {
    if (fields) form.resetFields(fields);
    else form.resetFields();
  }

  function getUserName() {
    form
      .validateFields(["document"])
      .then((value) => {
        setApiParams({
          service: getNameReniecService(value["document"].trim()),
          method: "get",
        });
      })
      .catch(() => {});
  }

  function createUser(values: any) {
    if (!validDoc) {
      showNotification(notification, "error", t("mustProvideValidDoc"));
      return;
    }

    const subUser: RegisterSubUserRequest = {
      dni: values.document,
      phone: values.phone,
      address: values.address,
      cityID: values.location,
      email: values.email,
      typeID: values.userType,
      uid,
    };

    setApiParams({
      service: registerSubUserService(),
      method: "post",
      dataToSend: subUser,
    });
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
          <Row gutter={[15, 15]}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <DniAU getUserName={getUserName} resetFields={resetFields} />
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <FullNameAU />
            </Col>
          </Row>
          <Row gutter={[15, 15]}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <AddressAU />
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <EmailAU />
            </Col>
          </Row>
          <Row gutter={[15, 15]}>
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <LocationAU />
            </Col>
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <PhoneAU />
            </Col>
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <UserTypeAU />
            </Col>
          </Row>
          <div className="t-flex t-wrap up-footer">
            <div className="footer-text">{t("allDataIsImportant")}</div>
            <div className="wd-25">
              <ButtonContainer
                className="btn btn-default wd-100"
                htmlType="submit"
                loading={loadingRegisterUser}
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
