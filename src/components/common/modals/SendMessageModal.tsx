import { Flex } from "antd";
import ButtonContainer from "../../containers/ButtonContainer";
import { useTranslation } from "react-i18next";
import TextAreaContainer from "../../containers/TextAreaContainer";
import { useState } from "react";

interface SendMessageModalProps {
  onClose: () => any;
  requirementId: string;
  userId: string;
}

export default function SendMessageModal(props: SendMessageModalProps) {
  const { t } = useTranslation();
  const [msg, setMsg] = useState("");

  function handleTextChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setMsg(e.target.value.trim());
  }

  function sendMessage() {
    if (msg) {
      console.log(msg, props.requirementId, props.userId); //r3v y gotochat
      props.onClose();
    }
  }

  function goToChat() {
    console.log(props.requirementId, props.userId);
    props.onClose();
  }

  return (
    <>
      <div className="modal-card">
        <div className="t-flex t-wrap mr-sub">
          <div className="sub-titulo" style={{ fontSize: "26px" }}>
            <i
              className="fa-regular fa-envelope sub-icon"
              style={{ fontSize: "24px" }}
            ></i>{" "}
            {t("sendMessage")}
          </div>
        </div>

        <Flex vertical>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "15px" }}
          >
            <TextAreaContainer
              className="form-control"
              style={{ flexGrow: 1 }}
              onChange={handleTextChange}
            />
            <div className="t-flex gap-15 wd-100 alert-btn">
              <ButtonContainer
                className="btn btn-default wd-100"
                children={t("send")}
                disabled={msg == ""}
                onClick={sendMessage}
              />
              <ButtonContainer
                className="btn btn-green wd-100"
                children={t("goToChat")}
                onClick={goToChat}
              />
            </div>
          </div>
        </Flex>
      </div>
    </>
  );
}
