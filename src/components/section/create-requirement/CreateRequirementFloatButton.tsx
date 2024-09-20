import { FloatButton } from "antd";
import { useTranslation } from "react-i18next";
import NoContentModalContainer from "../../containers/NoContentModalContainer";
import { lazy, useState } from "react";

const CreateRequirement = lazy(
  () => import("../create-requirement/CreateRequirement")
);

export default function CreateRequirementFloatButton() {
  const { t } = useTranslation();
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <>
      <FloatButton
        icon={<i className="fa-solid fa-plus" />}
        type="primary"
        tooltip={t("createRequirement")}
        onClick={() => setIsOpenModal(true)}
      />
      <NoContentModalContainer
        open={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        width={850}
        closable={true}
        maskClosable={false}
        // style={{ background: "transparent" }}
      >
        <CreateRequirement />
      </NoContentModalContainer>
    </>
  );
}
