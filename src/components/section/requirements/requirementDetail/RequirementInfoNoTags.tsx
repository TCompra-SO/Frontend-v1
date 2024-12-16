import { Tooltip } from "antd";
import SubUserName from "../../../common/SubUserName";
import { getLabelFromRequirementType } from "../../../../utilities/globalFunctions";
import { useTranslation } from "react-i18next";
import { BaseUser } from "../../../../models/MainInterfaces";
import { RequirementType } from "../../../../utilities/types";
import DescriptionParagraph from "../../../common/DescriptionParagraph";
import RateStarCount from "../../../common/RateStarCount";

interface RequirementInfoNoTagsProps {
  title: string;
  user: BaseUser;
  subUser?: BaseUser;
  type: RequirementType;
  description?: string;
  forHome?: boolean;
}

export default function RequirementInfoNoTags(
  props: RequirementInfoNoTagsProps
) {
  const { t } = useTranslation();

  return (
    <>
      {!props.forHome && (
        <h2 className={"titulo-req"}>
          <Tooltip title={props.title}>{props.title}</Tooltip>
        </h2>
      )}

      <div className="t-flex tags-req">
        <Tooltip title={props.user.name}>
          <div
            className={`${props.forHome ? "" : "badge-default "}text-truncate`}
            style={
              props.forHome ? { fontSize: "25px", fontWeight: "bold" } : {}
            }
          >
            {props.user.name}
          </div>
        </Tooltip>
        <SubUserName subUserName={props.subUser?.name} />
        {!props.forHome && (
          <>
            <div className="badge-second">
              {t(getLabelFromRequirementType(props.type))}
            </div>
            <RateStarCount
              score={
                props.type == RequirementType.SALE
                  ? props.user.sellerScore
                  : props.user.customerScore
              }
              count={
                props.type == RequirementType.SALE
                  ? props.user.sellerCount
                  : props.user.customerCount
              }
            />
          </>
        )}
      </div>

      <DescriptionParagraph
        text={props.description}
        className={props.forHome ? "ofer-req-2-no-clamp" : "info-req-no-clamp"}
      />
    </>
  );
}
