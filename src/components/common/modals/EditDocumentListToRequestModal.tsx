import { useTranslation } from "react-i18next";
import TextAreaContainer from "../../containers/TextAreaContainer";
import { Lengths } from "../../../utilities/lengths";
import ButtonContainer from "../../containers/ButtonContainer";
import { Form } from "antd";
import { MainState } from "../../../models/Redux";
import { useSelector } from "react-redux";
import { useUpdateRequiredDocsCert } from "../../../hooks/certificateHook";
import { useEffect } from "react";

interface EditDocumentListToRequestModalProps {
  text: string;
  onClose: () => void;
}

export default function EditDocumentListToRequestModal(
  props: EditDocumentListToRequestModalProps
) {
  const { t } = useTranslation();
  const { updateRequiredDocsCert, loadingUpdateRequiredDocs } =
    useUpdateRequiredDocsCert();
  const [form] = Form.useForm();
  const mainUid = useSelector((state: MainState) => state.mainUser.uid);

  useEffect(() => {
    form.setFieldValue("list", props.text);
  }, [props.text]);

  useEffect(() => {
    if (loadingUpdateRequiredDocs === false) props.onClose();
  }, [loadingUpdateRequiredDocs]);

  function handleSubmit(values: any) {
    updateRequiredDocsCert(mainUid, values.list?.trim());
  }

  return (
    <div className="modal-card">
      <div className="t-flex alert-base">
        <i className="fa-regular fa-circle-exclamation sub-icon-cert"></i>
        <div className="alert-info">{t("editListOfDocumentsToRequest")}</div>
        <Form form={form} onFinish={handleSubmit} style={{ width: "100%" }}>
          <div className="t-flex wd-100">
            <Form.Item
              name={"list"}
              label={t("list")}
              labelCol={{ span: 0 }}
              rules={[
                { required: true },
                { min: Lengths.docListToRequest.min },
                { max: Lengths.docListToRequest.max },
              ]}
              style={{ width: "100%" }}
            >
              <TextAreaContainer
                className="form-control wd-100"
                autoSize
                placeholder={t("listOfDocumentsToRequest")}
                maxLength={Lengths.docListToRequest.max}
              />
            </Form.Item>
          </div>
          <div
            className="t-flex gap-15 wd-100 alert-btn"
            style={{ marginTop: "15px" }}
          >
            <ButtonContainer
              children={t("acceptButton")}
              className="btn btn-green"
              htmlType="submit"
            />
          </div>
        </Form>
      </div>
    </div>
  );
}
