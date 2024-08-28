import { Flex } from "antd";
import { OfferListItem } from "../../../../models/MainInterfaces";
import { rowColor } from "../../../../utilities/colors";
import RatingContainer from "../../../containers/RatingContainer";
import { RequirementType } from "../../../../utilities/types";

interface RequirementOfferSummaryUserProps {
  offer: OfferListItem;
}

export default function RequirementOfferSummaryUser(
  props: RequirementOfferSummaryUserProps
) {
  return (
    <Flex
      vertical
      align="center"
      style={{
        background: rowColor,
        padding: "15px",
        borderRadius: "10px",
        fontSize: "1.1em",
        fontWeight: "600",
        marginBottom: "10px",
        textAlign: "center",
      }}
    >
      {props.offer.user.name.toUpperCase()}
      {props.offer.subUser && (
        <div style={{ marginTop: "8px", fontSize: "1em" }}>
          {props.offer.subUser && props.offer.subUser.name}
        </div>
      )}

      <RatingContainer
        readOnly
        style={{ marginTop: "10px" }}
        score={
          props.offer.type != RequirementType.SALE
            ? props.offer.user.sellerScore
            : props.offer.user.customerScore
        }
      ></RatingContainer>
    </Flex>
  );
}
