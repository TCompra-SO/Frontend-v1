import { useTranslation } from "react-i18next";
import ButtonContainer from "../../containers/ButtonContainer";
import { Col, Form, Modal, Row } from "antd";
import DniField from "../../common/formFields/DniField";
import LocationField from "../../common/formFields/LocationField";
import AddressField from "../../common/formFields/AddressField";
import FullNameField from "../../common/formFields/FullNameField";
import PhoneField from "../../common/formFields/PhoneField";
import EmailField from "../../common/formFields/EmailField";
import UserTypeField from "../../common/formFields/UserTypeField";
import { getNameReniecService } from "../../../services/requests/utilService";
import { useEffect, useState } from "react";
import {
  ChangeRoleSubUserRequest,
  GetNameReniecRequest,
  NewPasswordRequest,
  RegisterSubUserRequest,
  UpdateProfileSubUserRequest,
} from "../../../models/Requests";
import { useApiParams } from "../../../models/Interfaces";
import useApi from "../../../hooks/useApi";
import {
  changeRoleSubUserService,
  registerSubUserService,
  updateProfileSubUserService,
} from "../../../services/requests/subUserService";
import { useSelector } from "react-redux";
import { MainState } from "../../../models/Redux";
import { equalServices } from "../../../utilities/globalFunctions";
import PasswordField from "../../common/formFields/PasswordField";
import { newPasswordService } from "../../../services/requests/authService";
import { SubUserProfile } from "../../../models/MainInterfaces";
import useShowNotification from "../../../hooks/utilHooks";
import { UserRoles } from "../../../utilities/types";
import useWindowSize from "../../../hooks/useWindowSize";
import { windowSize } from "../../../utilities/globals";

interface AddUserModalProps {
  onClose: () => void;
  onSuccess?: () => void;
  edit: boolean;
  userData?: SubUserProfile | null;
}

export default function AddUserModal(props: AddUserModalProps) {
  const { t } = useTranslation();
  const { showNotification } = useShowNotification();
  const [form] = Form.useForm();
  const { width } = useWindowSize();
  const [passSuccess, setPassSuccess] = useState(false);
  const [roleSuccess, setRoleSuccess] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [validDoc, setValidDoc] = useState(false);
  const [infoText, setInfoText] = useState("allDataIsImportant");
  const [buttonWidth, setButtonWidth] = useState("wd-25");
  const uid = useSelector((state: MainState) => state.user.uid);

  /** Estados para el modal de confirmación de rol */
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingValues, setPendingValues] = useState<any>(null);
  const [pendingUserType, setPendingUserType] = useState<UserRoles | null>(null);

  const [loadingRegisterUser, setLoadingRegisterUser] = useState<
    boolean | undefined
  >(false);
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

  /** useEffects */

  useEffect(() => {
    setButtonWidth(width < windowSize.xs ? "wd-100" : "wd-25");
  }, [width]);

  useEffect(() => {
    if (props.edit && props.userData?.document) {
      form.setFieldsValue({ document: props.userData?.document });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.userData?.document, form]);

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
      showNotification("error", errorMsg);
      if (equalServices(apiParams.service, getNameReniecService("")))
        setValidDoc(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseData, error]);

  useEffect(() => {
    if (responseDataNewPass) {
      updateSubUserSuccess(3);
    } else if (errorNewPass) {
      showNotification("error", errorMsgNewPass);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseDataNewPass, errorNewPass]);

  useEffect(() => {
    if (responseDataChangeRole) {
      updateSubUserSuccess(2);
    } else if (errorChangeRole) {
      showNotification("error", errorMsgChangeRole);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseDataChangeRole, errorChangeRole]);

  useEffect(() => {
    checkUpdates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [passSuccess, roleSuccess, profileSuccess]);

  /** Funciones */

  function getNameReniecSuccess() {
    form.setFieldValue("fullname", responseData.data);
    setValidDoc(true);
  }

  function registerSubUserSuccess() {
    showNotification(
      "success",
      `${t("registerUserSuccess")}. ${t("subUserPasswordIsDocument")}`
    );
    props.onSuccess?.();
    props.onClose();
  }

  function updateSubUserSuccess(type: number) {
    if (type == 1) setProfileSuccess(true);
    else if (type == 2) setRoleSuccess(true);
    else if (type == 3) setPassSuccess(true);
  }

  function checkUpdates() {
    if (
      ((changePassword && passSuccess) || !changePassword) &&
      roleSuccess &&
      profileSuccess
    ) {
      showNotification("success", `${t("userUpdatedSuccessfully")}`);
      props.onSuccess?.();
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
      .catch(() => { });
  }

  /**
   * Intercepta el submit: valida y abre el modal de confirmación
   * antes de crear o actualizar el subusuario.
   */
  function submitData(values: any) {
    if (props.edit) {
      // Validar contraseñas antes de mostrar la confirmación
      if (values.password1 && values.password1 !== values.password2) {
        showNotification("error", t("passwordsMusMatch"));
        return;
      }
      setPendingValues(values);
      setPendingUserType(values.userType);
      setShowConfirmModal(true);
    } else {
      if (!validDoc) {
        showNotification("error", t("mustProvideValidDoc"));
        return;
      }
      setPendingValues(values);
      setPendingUserType(values.userType);
      setShowConfirmModal(true);
    }
  }

  /** Ejecuta el guardado real una vez confirmado */
  function confirmSave() {
    const values = pendingValues;
    setShowConfirmModal(false);
    setPendingValues(null);
    setPendingUserType(null);
    if (!values) return;
    if (props.edit) editUser(values);
    else createUser(values);
  }

  /** Cancela el guardado y limpia el estado */
  function cancelSave() {
    setShowConfirmModal(false);
    setPendingValues(null);
    setPendingUserType(null);
  }

  /** Devuelve las listas de "puede crear" / "puede ofertar" por rol */
  function getRolePermissions(role: UserRoles | null | undefined) {
    const goods = t("goods");
    const services = t("services");
    const sales = t("sales");

    switch (role) {
      case UserRoles.BUYER:
        return {
          roleLabel: t("buyer"),
          roleDesc: t("buyerRoleInfo"),
          canCreate: [goods, services],
          canOffer: [sales],
        };
      case UserRoles.SELLER:
        return {
          roleLabel: t("sellerRole"),
          roleDesc: t("sellerRoleInfo"),
          canCreate: [sales],
          canOffer: [goods, services],
        };
      case UserRoles.SELLER_BUYER:
        return {
          roleLabel: t("sellerBuyer"),
          roleDesc: t("sellerBuyerRoleInfo"),
          canCreate: [goods, services, sales],
          canOffer: [goods, services, sales],
        };
      default:
        return {
          roleLabel: "",
          roleDesc: "",
          canCreate: [] as string[],
          canOffer: [] as string[],
        };
    }
  }

  function createUser(values: any) {
    if (!validDoc) {
      showNotification("error", t("mustProvideValidDoc"));
      return;
    }

    const subUser: RegisterSubUserRequest = {
      dni: values.document,
      phone: values.phone.trim(),
      address: values.address.trim(),
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
      showNotification("error", t("passwordsMusMatch"));
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
      });
    }

    if (props.userData && props.edit) {
      const profile: UpdateProfileSubUserRequest = {
        uid: props.userData.uid,
        phone: values.phone.trim(),
        address: values.address.trim(),
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
    }
  }

  function handleOnTypeUserChange(val: any) {
    switch (val) {
      case UserRoles.BUYER:
        setInfoText("buyerRoleInfo");
        break;
      case UserRoles.SELLER:
        setInfoText("sellerRoleInfo");
        break;
      case UserRoles.SELLER_BUYER:
        setInfoText("sellerBuyerRoleInfo");
        break;
      default:
        setInfoText("allDataIsImportant");
    }
  }

  /** Permisos del rol pendiente de guardar (para el modal) */
  const permissions = getRolePermissions(pendingUserType);

  return (
    <>
      {/* Modal de confirmación de rol antes de guardar */}
      <Modal
        open={showConfirmModal}
        onCancel={cancelSave}
        footer={null}
        centered
        width={520}
        destroyOnClose
        maskClosable={false}
      >
        <div className="modal-card">
          <div className="t-flex t-wrap mr-sub">
            <div className="sub-titulo">
              <i className="fa-regular fa-shield-check sub-icon"></i>{" "}
              {t("confirmRoleAndPermissions")}
            </div>
          </div>

          <div style={{ padding: "10px 0 20px" }}>
            <div style={{ marginBottom: 12 }}>
              {t("theUserWillHaveTheRole")}:{" "}
              <strong style={{ color: "#bc1373" }}>
                {permissions.roleLabel}
              </strong>
            </div>
            <div
              className="footer-text"
              style={{ marginBottom: 20, fontStyle: "italic" }}
            >
              {permissions.roleDesc}
            </div>

            {/* Puede crear */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontWeight: 600, marginBottom: 8 }}>
                <i
                  className="fa-regular fa-circle-check"
                  style={{ color: "#22c55e", marginRight: 6 }}
                ></i>
                {t("canCreateRequirements")}:
              </div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 6,
                  paddingLeft: 22,
                }}
              >
                {permissions.canCreate.map((item, i) => (
                  <span
                    key={i}
                    style={{
                      background: "#ecfdf5",
                      color: "#166534",
                      padding: "3px 12px",
                      borderRadius: 12,
                      fontSize: "0.85rem",
                      border: "1px solid #22c55e",
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Puede ofertar */}
            <div style={{ marginBottom: 10 }}>
              <div style={{ fontWeight: 600, marginBottom: 8 }}>
                <i
                  className="fa-regular fa-gavel"
                  style={{ color: "#8b5cf6", marginRight: 6 }}
                ></i>
                {t("canOfferIn")}:
              </div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 6,
                  paddingLeft: 22,
                }}
              >
                {permissions.canOffer.map((item, i) => (
                  <span
                    key={i}
                    style={{
                      background: "#f5f3ff",
                      color: "#6d28d9",
                      padding: "3px 12px",
                      borderRadius: 12,
                      fontSize: "0.85rem",
                      border: "1px solid #8b5cf6",
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="t-flex t-wrap up-footer gap-15">
            <div className={buttonWidth}>
              <ButtonContainer
                className="btn btn-default wd-100"
                onClick={confirmSave}
              >
                {t("confirm")}
              </ButtonContainer>
            </div>
            <div className={buttonWidth}>
              <ButtonContainer
                className="btn btn-default-o wd-100"
                onClick={cancelSave}
              >
                {t("cancel")}
              </ButtonContainer>
            </div>
          </div>
        </div>
      </Modal>

      {/* Formulario principal */}
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
                <DniField
                  getUserName={getUserName}
                  onChange={() => resetFields(["fullname"])}
                  edit={props.edit}
                  value={props.userData?.document}
                  isDni={true}
                  includeSearch
                />
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <FullNameField edit={props.edit} value={props.userData?.name} />
              </Col>
            </Row>
            <Row gutter={[15, 15]}>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <AddressField
                  edit={props.edit}
                  value={props.userData?.address}
                />
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <EmailField edit={props.edit} value={props.userData?.email} />
              </Col>
            </Row>
            <Row gutter={[15, 15]}>
              <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                <LocationField
                  edit={props.edit}
                  value={props.userData?.cityID}
                />
              </Col>
              <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                <PhoneField edit={props.edit} value={props.userData?.phone} />
              </Col>
              <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                <UserTypeField
                  edit={props.edit}
                  value={props.userData?.typeID}
                  onChange={handleOnTypeUserChange}
                />
              </Col>
            </Row>
            {props.edit && (
              <Row gutter={[15, 15]}>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <PasswordField name={"password1"} />
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <PasswordField name={"password2"} confirmPassword />
                </Col>
              </Row>
            )}
            <div className="t-flex t-wrap up-footer gap-15">
              <div
                className="footer-text"
                style={{ flex: "1 1 0", minWidth: 0 }}
              >
                {t(infoText)}
              </div>
              <div className={buttonWidth}>
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
    </>
  );
}