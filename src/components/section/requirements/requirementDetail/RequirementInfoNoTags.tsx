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
}

export default function RequirementInfoNoTags(
  props: RequirementInfoNoTagsProps
) {
  const { t } = useTranslation();

  return (
    <>
      <h2 className="titulo-req">
        <Tooltip title={props.title}>{props.title}</Tooltip>
      </h2>

      <div className="t-flex tags-req">
        <Tooltip title={props.user.name}>
          <div className="badge-default text-truncate">{props.user.name}</div>
        </Tooltip>
        <SubUserName subUser={props.subUser} />
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
      </div>

      <DescriptionParagraph text={props.description} />
    </>
  );
}
