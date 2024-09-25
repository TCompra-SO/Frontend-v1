import { useState } from "react";
import ParagraphContainer from "../containers/ParagraphContainer";
import { useTranslation } from "react-i18next";

interface DescriptionParagraphProps {
  text: string | undefined;
}

export default function DescriptionParagraph(props: DescriptionParagraphProps) {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      {props.text && (
        <ParagraphContainer
          children={props.text}
          className="info-req-no-clamp"
          ellipsis={{
            rows: 2,
            expandable: "collapsible",
            expanded,
            onExpand: (_, info) => setExpanded(info.expanded),
            symbol: (expanded: boolean) => {
              return expanded
                ? t("paragraphSymbolLess")
                : t("paragraphSymbolMore");
            },
          }}
        />
      )}
    </>
  );
}
