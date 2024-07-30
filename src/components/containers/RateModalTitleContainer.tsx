import { useTranslation } from "react-i18next";
import { getUserClass } from "../../utilities/globalFunctions";
import { RequirementType, UserClass } from "../../utilities/types";

interface RateModalTitleContainerProps {
  isOffer: boolean;
  type: RequirementType;
}

export default function RateModalTitleContainer(
  props: RateModalTitleContainerProps
) {
  const { t } = useTranslation();
  const userClass: UserClass = getUserClass(props.isOffer, props.type);

  return (
    <>
      <div style={{ fontSize: "1.3em" }}>
        <b>{t("finish")}</b>
      </div>
      <div style={{ fontSize: "1em", fontWeight: "normal" }}>
        {t("rateYour")}
        {userClass == UserClass.CUSTOMER ? t("customer") : t("seller")}
      </div>
    </>
  );
}
