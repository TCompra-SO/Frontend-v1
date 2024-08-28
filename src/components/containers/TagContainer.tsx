import { Tag } from "antd";
import { RequirementType } from "../../utilities/types";
import { primaryColor } from "../../utilities/colors";
import { TagProps } from "antd/lib";
import { useTranslation } from "react-i18next";

interface TagContainerProps extends TagProps {
  isRequirementTag?: boolean;
  type?: RequirementType;
  text?: React.ReactNode;
  label?: string;
  includeMarginRight?: boolean;
  truncateText?: boolean;
}

export default function TagContainer(props: TagContainerProps) {
  const { t } = useTranslation();
  let newStyle;
  if (props.includeMarginRight) {
    if (props.style) newStyle = props.style;
  } else {
    if (props.style) newStyle = { ...props.style, marginRight: "0" };
    else newStyle = { marginRight: "0" };
  }

  if (props.truncateText) newStyle = { ...newStyle, maxWidth: "74vw" };

  if (props.isRequirementTag)
    return (
      <Tag color={primaryColor} style={newStyle}>
        {props.type == RequirementType.GOOD
          ? t("good")
          : props.type == RequirementType.SERVICE
          ? t("service")
          : props.type == RequirementType.SALE
          ? t("sale")
          : t("job")}
      </Tag>
    );
  else
    return (
      <Tag
        {...props}
        style={newStyle}
        className={props.truncateText ? "text-truncate" : ""}
      >
        {props.label ? props.label + ": " : ""} {props.text}
      </Tag>
    );
}
