import { useTranslation } from "react-i18next";
import DescriptionParagraph from "../../../../common/DescriptionParagraph";
import React from "react";

interface RequirementDescriptionProps {
  description: string | undefined;
}

export default function RequirementDescription(
  props: RequirementDescriptionProps
) {
  const { t } = useTranslation();

  return (
    <div className="card-white cbl-4">
      <div className="t-flex mr-sub-2">
        <i className="fa-regular fa-subtitles sub-icon m-0"></i>
        <div className="sub-titulo sub-calificar">
          <div>{t("description")}</div>
        </div>
      </div>
      <div className="c-descripcion">
        <DescriptionParagraph text={props.description} />
      </div>
    </div>
  );
}
