import { Tooltip } from "antd";
import SubUserName from "../../../common/SubUserName";
import {
  getLabelFromRequirementType,
  getScore,
} from "../../../../utilities/globalFunctions";
import { useTranslation } from "react-i18next";
import { User } from "../../../../models/MainInterfaces";
import { RequirementType } from "../../../../utilities/types";
import DescriptionParagraph from "../../../common/DescriptionParagraph";

interface RequirementInfoNoTagsProps {
  title: string;
  user: User;
  subUser?: User;
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
        <div className="puntuacion">
          <i className="fa-solid fa-star p-start"></i>
          <div className="valor-start">
            {getScore(
              props.type == RequirementType.SALE
                ? props.user.sellerScore
                : props.user.customerScore
            )}
          </div>
          <b className="p-cantidad">(41.5k)</b>
        </div>
      </div>

      <DescriptionParagraph text={props.description} />
    </>
  );
}
