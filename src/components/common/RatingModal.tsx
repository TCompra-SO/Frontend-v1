import { App, Flex } from "antd";
import { RequirementType, YesNo, UserClass } from "../../utilities/types";
import SelectContainer from "../containers/SelectContainer";
import { rowColor } from "../../utilities/colors";
import RatingContainer from "../containers/RatingContainer";
import { User } from "../../models/MainInterfaces";
import { getUserClass } from "../../utilities/globalFunctions";
import ButtonContainer from "../containers/ButtonContainer";
import { useState } from "react";
import showNotification from "../../utilities/notification/showNotification";
import { useTranslation } from "react-i18next";

interface RatingModalProps {
  user: User;
  requirementOffertitle: string;
  type: RequirementType;
  isOffer: boolean;
  onClose: (e: React.SyntheticEvent<Element, Event>) => any;
}

export default function RatingModal(props: RatingModalProps) {
  const { t } = useTranslation();
  const [answer, setAnswer] = useState<YesNo | null>(null);
  const [scores, setScores] = useState([0, 0, 0]);
  const { notification } = App.useApp();
  const userClass: UserClass = getUserClass(props.isOffer, props.type);

  const questions = {
    [UserClass.CUSTOMER]: [
      {
        [RequirementType.GOOD]: t("receivedGoodQuestion"),
        [RequirementType.SALE]: t("receivedGoodQuestion"),
        [RequirementType.SERVICE]: t("receivedServiceQuestion"),
        [RequirementType.JOB]: t("receivedServiceQuestion"),
      },
      {
        [RequirementType.SALE]: t("goodDescriptionQuestion"),
        [RequirementType.GOOD]: t("goodDescriptionQuestion"),
        [RequirementType.SERVICE]: t("serviceDescriptionQuestion"),
        [RequirementType.JOB]: t("serviceDescriptionQuestion"),
      },
      {
        [RequirementType.GOOD]: t("supplierCommunicationQuestion"),
        [RequirementType.SALE]: t("supplierCommunicationQuestion"),
        [RequirementType.SERVICE]: t("supplierCommunicationQuestion"),
        [RequirementType.JOB]: t("supplierCommunicationQuestion"),
      },
      {
        [RequirementType.GOOD]: t("deliverySpeedQuestion"),
        [RequirementType.SALE]: t("deliverySpeedQuestion"),
        [RequirementType.SERVICE]: t("deliverySpeedQuestion"),
        [RequirementType.JOB]: t("deliverySpeedQuestion"),
      },
    ],
    [UserClass.SELLER]: [
      {
        [RequirementType.SALE]: t("sendGoodQuestion"),
        [RequirementType.GOOD]: t("sendGoodQuestion"),
        [RequirementType.SERVICE]: t("provideServiceQuestion"),
        [RequirementType.JOB]: t("provideServiceQuestion"),
      },
      {
        [RequirementType.GOOD]: t("customerCommunicationQuestion"),
        [RequirementType.SALE]: t("customerCommunicationQuestion"),
        [RequirementType.SERVICE]: t("customerCommunicationQuestion"),
        [RequirementType.JOB]: t("customerCommunicationQuestion"),
      },
      {
        [RequirementType.GOOD]: t("paymentTimeQuestion"),
        [RequirementType.SALE]: t("paymentTimeQuestion"),
        [RequirementType.SERVICE]: t("paymentTimeQuestion"),
        [RequirementType.JOB]: t("paymentTimeQuestion"),
      },
      {
        [RequirementType.GOOD]: t("recommendCustomerQuestion"),
        [RequirementType.SALE]: t("recommendCustomerQuestion"),
        [RequirementType.SERVICE]: t("recommendCustomerQuestion"),
        [RequirementType.JOB]: t("recommendCustomerQuestion"),
      },
    ],
  };

  function onScoreChange(position: number, score: number) {
    const copy = scores;
    copy[position] = score;
    setScores(copy);
  }

  function onAnswerChange(answer: YesNo) {
    setAnswer(answer);
  }

  function closeModal(e: React.SyntheticEvent<Element, Event>) {
    props.onClose(e);
  }

  function rateUser(e: React.SyntheticEvent<Element, Event>) {
    if (answer === null) {
      showNotification(notification, "info", t("mustSelectAnswer"));
      return;
    }
    console.log(props.user.uid, "id de usuario logeado", scores, answer); // r3v
    props.onClose(e);
  }

  return (
    <>
      <Flex
        vertical
        style={{
          background: rowColor,
          borderRadius: "10px",
          padding: "15px",
          marginBottom: "15px",
        }}
        align="center"
      >
        <b>{questions[userClass][0][props.type]}</b>
        <SelectContainer
          style={{ width: "100%" }}
          options={[
            { label: t("yes"), value: YesNo.YES },
            { label: t("no"), value: YesNo.NO },
          ]}
          placeholder={t("select")}
          onChange={onAnswerChange}
        />
      </Flex>
      <Flex align="center" justify="center">
        <b style={{ fontSize: "1.2em" }}>{t("rate")}</b>
      </Flex>
      <Flex
        align="center"
        vertical
        gap="small"
        style={{
          background: rowColor,
          borderRadius: "10px",
          padding: "15px",
          marginBottom: "10px",
          marginTop: "15px",
        }}
      >
        <b>{questions[userClass][1][props.type]}</b>
        <RatingContainer score={0} onChange={(val) => onScoreChange(0, val)} />
        <b>{questions[userClass][2][props.type]}</b>
        <RatingContainer score={0} onChange={(val) => onScoreChange(1, val)} />
        <b>{questions[userClass][3][props.type]}</b>
        <RatingContainer score={0} onChange={(val) => onScoreChange(2, val)} />
      </Flex>
      <ButtonContainer
        children={t("submitRating")}
        block
        type="primary"
        style={{ marginBottom: "10px" }}
        onClick={rateUser}
      />
      <ButtonContainer
        children={t("cancelButton")}
        block
        type="primary"
        onClick={closeModal}
      />
    </>
  );
}
