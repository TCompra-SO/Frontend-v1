import { FloatButton } from "antd";
import { useTranslation } from "react-i18next";
import NoContentModalContainer from "../../containers/NoContentModalContainer";
import { lazy, useState } from "react";
import useIsLoggedIn from "../../../hooks/useIsLoggedIn";

const CreateRequirement = lazy(
  () => import("../create-requirement/CreateRequirement")
);

export default function CreateRequirementFloatButton() {
  const { t } = useTranslation();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const isLoggedIn = useIsLoggedIn();

  return (
    <>
      {isLoggedIn ? (
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
          >
            <CreateRequirement closeModal={() => setIsOpenModal(false)} />
          </NoContentModalContainer>
        </>
      ) : null}
    </>
  );
}
