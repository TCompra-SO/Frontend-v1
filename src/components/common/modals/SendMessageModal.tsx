import { Flex } from "antd";
import ButtonContainer from "../../containers/ButtonContainer";
import { useTranslation } from "react-i18next";
import TextAreaContainer from "../../containers/TextAreaContainer";
import { useEffect, useRef, useState } from "react";
import { CommonModalProps } from "../../../models/Interfaces";
import { RequirementType } from "../../../utilities/types";
import { useChatFunctions } from "../../../hooks/chatHooks";
import { useSelector } from "react-redux";
import { MainState } from "../../../models/Redux";
import { BasicChatListData } from "../../../models/MainInterfaces";
import { useRedirectToChat } from "../../../hooks/utilHooks";

interface SendMessageModalProps extends CommonModalProps {
  onClose: () => any;
  requirementId: string;
  title: string;
  type: RequirementType;
  receiverImage?: string;
  receiverName: string;
  receiverId: string;
}

export default function SendMessageModal(props: SendMessageModalProps) {
  const { t } = useTranslation();
  const { createChatAndSendMessage, loadingCreateChatAndSendMessage } =
    useChatFunctions(true);
  const { redirectToChat } = useRedirectToChat();
  const uid = useSelector((state: MainState) => state.user.uid);
  const [msg, setMsg] = useState("");
  const prevLoadingRef = useRef<boolean | null>(null);

  useEffect(() => {
    if (prevLoadingRef.current && !loadingCreateChatAndSendMessage) {
      props.onClose();
    }
    prevLoadingRef.current = loadingCreateChatAndSendMessage;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingCreateChatAndSendMessage]);

  function handleTextChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setMsg(e.target.value.trim());
  }

  function sendMessage() {
    if (msg) {
      createChatAndSendMessage(
        {
          userId: uid,
          requerimentId: props.requirementId,
          title: props.title,
          type: props.type,
        },
        msg
      );
    }
  }

  function goToChat() {
    props.onClose();
    const data: BasicChatListData = {
      userName: props.receiverName,
      title: props.title,
      requirementId: props.requirementId,
      userImage: props.receiverImage,
      type: props.type,
      userId: props.receiverId,
    };
    redirectToChat(data);
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
                loading={loadingCreateChatAndSendMessage}
              />
              <ButtonContainer
                className="btn btn-green wd-100"
                children={t("goToChat")}
                onClick={goToChat}
                loading={loadingCreateChatAndSendMessage}
              />
            </div>
          </div>
        </Flex>
      </div>
    </>
  );
}
