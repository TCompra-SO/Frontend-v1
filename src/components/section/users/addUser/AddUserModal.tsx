import { useTranslation } from "react-i18next";
import ButtonContainer from "../../../containers/ButtonContainer";
import { App, Col, Form, Row } from "antd";
import DniAU from "./items/DniAU";
import LocationAU from "./items/LocationAU";
import AddressAU from "./items/AddressAU";
import FullNameAU from "./items/FullNameAU";
import PhoneAU from "./items/PhoneAU";
import EmailAU from "./items/EmailAU";
import UserTypeAU from "./items/UserTypeAU";
import { getNameReniecService } from "../../../../services/utilService";
import { useEffect, useState } from "react";
import {
  ChangeRoleSubUserRequest,
  GetNameReniecRequest,
  NewPasswordRequest,
  RegisterSubUserRequest,
  UpdateProfileSubUserRequest,
} from "../../../../models/Requests";
import { useApiParams } from "../../../../models/Interfaces";
import useApi from "../../../../hooks/useApi";
import showNotification from "../../../../utilities/notification/showNotification";
import {
  changeRoleSubUserService,
  registerSubUserService,
  updateProfileSubUserService,
} from "../../../../services/subUserService";
import { useSelector } from "react-redux";
import { MainState } from "../../../../models/Redux";
import { equalServices } from "../../../../utilities/globalFunctions";
import PasswordAU from "./items/PasswordAU";
import { SubUserProfile } from "../../../../models/Responses";
import { newPasswordService } from "../../../../services/authService";

interface AddUserModalProps {
  onClose: () => void;
  edit: boolean;
  userData?: SubUserProfile | null;
}

export default function AddUserModal(props: AddUserModalProps) {
  const { t } = useTranslation();
  const { notification } = App.useApp();
  const [form] = Form.useForm();
  const [passSuccess, setPassSuccess] = useState(false);
  const [roleSuccess, setRoleSuccess] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [token] = useState(useSelector((state: MainState) => state.user.token));
  const [validDoc, setValidDoc] = useState(false);
  const uid = useSelector((state: MainState) => state.user.uid);

  const [loadingRegisterUser, setLoadingRegisterUser] = useState(false);
  const [apiParams, setApiParams] = useState<
    useApiParams<
      | GetNameReniecRequest
      | RegisterSubUserRequest
      | UpdateProfileSubUserRequest
    >
  >({
    service: null,
    method: "get",
  });
  const [apiParamsNewPass, setApiParamsNewPass] = useState<
    useApiParams<NewPasswordRequest>
  >({
    service: null,
    method: "get",
    token,
  });
  const [apiParamsChangeRole, setApiParamsChangeRole] = useState<
    useApiParams<ChangeRoleSubUserRequest>
  >({
    service: null,
    method: "get",
  });
  const { loading, responseData, error, errorMsg, fetchData } = useApi<
    GetNameReniecRequest | RegisterSubUserRequest | UpdateProfileSubUserRequest
  >({
    service: apiParams.service,
    method: apiParams.method,
    dataToSend: apiParams.dataToSend,
  });

  const {
    loading: loadingNewPass,
    responseData: responseDataNewPass,
    error: errorNewPass,
    errorMsg: errorMsgNewPass,
    fetchData: fetchDataNewPass,
  } = useApi<NewPasswordRequest>({
    service: apiParamsNewPass.service,
    method: apiParamsNewPass.method,
    dataToSend: apiParamsNewPass.dataToSend,
    token: apiParamsNewPass.token,
  });

  const {
    loading: loadingChangeRole,
    responseData: responseDataChangeRole,
    error: errorChangeRole,
    errorMsg: errorMsgChangeRole,
    fetchData: fetchDataChangeRole,
  } = useApi<ChangeRoleSubUserRequest>({
    service: apiParamsChangeRole.service,
    method: apiParamsChangeRole.method,
    dataToSend: apiParamsChangeRole.dataToSend,
  });

  useEffect(() => {
    if (apiParams.service) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiParams]);

  useEffect(() => {
    if (apiParamsChangeRole.service) fetchDataChangeRole();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiParamsChangeRole]);

  useEffect(() => {
    if (apiParamsNewPass.service) {
      console.log(apiParamsNewPass);
      fetchDataNewPass();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiParamsNewPass]);

  useEffect(() => {
    if (!equalServices(apiParams.service, getNameReniecService(""))) {
      setLoadingRegisterUser(loading);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  useEffect(() => {
    setLoadingRegisterUser(loadingChangeRole);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingChangeRole]);

  useEffect(() => {
    setLoadingRegisterUser(loadingNewPass);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingNewPass]);

  useEffect(() => {
    if (responseData) {
      if (equalServices(apiParams.service, getNameReniecService(""))) {
        getNameReniecSuccess();
      } else if (equalServices(apiParams.service, registerSubUserService())) {
        registerSubUserSuccess();
      } else if (
        equalServices(apiParams.service, updateProfileSubUserService())
      ) {
        updateSubUserSuccess(1);
      }
    } else if (error) {
      showNotification(notification, "error", errorMsg);
      if (equalServices(apiParams.service, getNameReniecService("")))
        setValidDoc(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData, error]);

  useEffect(() => {
    if (responseDataNewPass) {
      updateSubUserSuccess(3);
    } else if (errorNewPass) {
      showNotification(notification, "error", errorMsgNewPass);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseDataNewPass, errorNewPass]);

  useEffect(() => {
    if (responseDataChangeRole) {
      updateSubUserSuccess(2);
    } else if (errorChangeRole) {
      showNotification(notification, "error", errorMsgChangeRole);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseDataChangeRole, errorChangeRole]);

  useEffect(() => {
    checkUpdates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [passSuccess, roleSuccess, profileSuccess]);

  function getNameReniecSuccess() {
    form.setFieldValue("fullname", responseData.data);
    setValidDoc(true);
  }

  function registerSubUserSuccess() {
    showNotification(
      notification,
      "success",
      `${t("registerUserSuccess")}. ${t("subUserPasswordIsDocument")}`
    );
    props.onClose();
  }

  function updateSubUserSuccess(type: number) {
    if (type == 1) setProfileSuccess(true);
    else if (type == 2) setRoleSuccess(true);
    else if (type == 3) setPassSuccess(true);
  }

  function checkUpdates() {
    console.log(changePassword, passSuccess);
    if (
      ((changePassword && passSuccess) || !changePassword) &&
      roleSuccess &&
      profileSuccess
    ) {
      showNotification(
        notification,
        "success",
        `${t("userUpdatedSuccessfully")}`
      );
      props.onClose();
    }
  }

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

  function submitData(values: any) {
    if (props.edit) editUser(values);
    else createUser(values);
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

  function editUser(values: any) {
    if (values.password1 !== values.password2) {
      showNotification(notification, "error", t("passwordsMusMatch"));
      return;
    }

    setPassSuccess(false);
    setRoleSuccess(false);
    setProfileSuccess(false);
    setChangePassword(false);

    const password: NewPasswordRequest = {
      email: values.email,
      password: values.password1,
    };

    if (values.password1) {
      setChangePassword(true);
      setApiParamsNewPass({
        service: newPasswordService(),
        method: "post",
        dataToSend: password,
        token: token,
      });
    }

    if (props.userData && props.edit) {
      const profile: UpdateProfileSubUserRequest = {
        uid: props.userData.uid,
        phone: values.phone,
        address: values.address,
        cityID: values.location,
      };
      setApiParams({
        service: updateProfileSubUserService(),
        method: "post",
        dataToSend: profile,
      });
      const role: ChangeRoleSubUserRequest = {
        uid: props.userData.uid,
        typeID: values.userType,
      };
      setApiParamsChangeRole({
        service: changeRoleSubUserService(),
        method: "post",
        dataToSend: role,
      });

      console.log(profile, password, role);
    }
  }

  return (
    <div className="modal-card img-bg">
      <div className="t-flex t-wrap mr-sub">
        <div className="sub-titulo">
          <i className="fa-regular fa-users sub-icon"></i>{" "}
          {t(props.edit ? "editEmployee" : "newEmployee")}
        </div>
      </div>
      <Form
        form={form}
        colon={false}
        requiredMark={false}
        onFinish={submitData}
      >
        <div className="t-flex form-tc">
          <Row gutter={[15, 15]}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <DniAU
                getUserName={getUserName}
                resetFields={resetFields}
                edit={props.edit}
                value={props.userData?.document}
              />
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <FullNameAU edit={props.edit} value={props.userData?.name} />
            </Col>
          </Row>
          <Row gutter={[15, 15]}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <AddressAU edit={props.edit} value={props.userData?.address} />
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <EmailAU edit={props.edit} value={props.userData?.email} />
            </Col>
          </Row>
          <Row gutter={[15, 15]}>
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <LocationAU edit={props.edit} value={props.userData?.cityID} />
            </Col>
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <PhoneAU edit={props.edit} value={props.userData?.phone} />
            </Col>
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <UserTypeAU edit={props.edit} value={props.userData?.typeID} />
            </Col>
          </Row>
          {props.edit && (
            <Row gutter={[15, 15]}>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <PasswordAU name={"password1"} />
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <PasswordAU name={"password2"} confirmPassword />
              </Col>
            </Row>
          )}
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
