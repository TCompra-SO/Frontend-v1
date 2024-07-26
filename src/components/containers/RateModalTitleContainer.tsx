import { getUserClass } from "../../utilities/globalFunctions";
import { RequirementType, UserClass } from "../../utilities/types";

interface RateModalTitleContainerProps {
  isOffer: boolean;
  type: RequirementType;
}

export default function RateModalTitleContainer(
  props: RateModalTitleContainerProps
) {
  const userClass: UserClass = getUserClass(props.isOffer, props.type);

  return (
    <>
      <div style={{ fontSize: "1.3em" }}>
        <b>Culminar</b>
      </div>
      <div style={{ fontSize: "1em", fontWeight: "normal" }}>
        Califica a tu{" "}
        {userClass == UserClass.CUSTOMER ? "Cliente" : "Proveedor"}
      </div>
    </>
  );
}
