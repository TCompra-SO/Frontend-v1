import { ExclamationCircleFilled } from "@ant-design/icons";
import { Flex, Space } from "antd";
import TextAreaContainer from "../containers/TextAreaContainer";
import { SyntheticEvent, useState } from "react";
import ButtonContainer from "../containers/ButtonContainer";
import { useTranslation } from "react-i18next";

interface CancelPurchaseOrderModalProps {
  onClose: (e: SyntheticEvent<Element, Event>) => any;
  offerId: string;
  requirementId: string;
}

export default function CancelPurchaseOrderModal(
  props: CancelPurchaseOrderModalProps
) {
  const { t } = useTranslation();
  const [text, setText] = useState<string>("");

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  function cancelPurchaseOrder(e: SyntheticEvent<Element, Event>) {
    console.log(props.offerId, props.requirementId, text);
    props.onClose(e);
  }

  return (
    <>
      <Flex vertical gap={8} style={{ marginBottom: "10px" }}>
        <Space>
          <ExclamationCircleFilled />
          <b>Indique el motivo de la cancelación</b>
        </Space>
        <TextAreaContainer
          rows={4}
          placeholder={t("reason")}
          maxLength={255}
          onChange={handleTextChange}
        />
      </Flex>
      <Flex justify="flex-end" gap="small">
        <ButtonContainer
          children={t("acceptButton")}
          type="primary"
          onClick={cancelPurchaseOrder}
        />
        <ButtonContainer
          children={t("cancelButton")}
          onClick={props.onClose}
          type="primary"
        />
      </Flex>
    </>
  );
}
