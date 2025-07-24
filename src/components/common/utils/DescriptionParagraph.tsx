import { useState } from "react";
import { useTranslation } from "react-i18next";
import ParagraphContainer from "../../containers/ParagraphContainer";

interface DescriptionParagraphProps {
  text: string | undefined;
  className?: string;
  rows?: number;
}

export default function DescriptionParagraph(props: DescriptionParagraphProps) {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);

  function changeAndStopPropagation(event: any) {
    event.stopPropagation();
    setExpanded(!expanded);
  }

  return (
    <>
      {props.text && (
        <ParagraphContainer
          children={props.text}
          style={{ whiteSpace: "pre-wrap" }}
          className={props.className}
          ellipsis={{
            rows: props.rows ?? 3,
            expandable: "collapsible",
            expanded,
            onExpand: (_, info) => setExpanded(info.expanded),
            symbol: (expanded: boolean) => {
              return expanded ? (
                <span onClick={changeAndStopPropagation}>
                  {t("paragraphSymbolLess")}
                </span>
              ) : (
                <span onClick={changeAndStopPropagation}>
                  {t("paragraphSymbolMore")}
                </span>
              );
            },
          }}
        />
      )}
    </>
  );
}
