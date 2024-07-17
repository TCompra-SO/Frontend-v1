import Paragraph from "antd/es/typography/Paragraph";
import { ParagraphProps } from "antd/lib/typography/Paragraph";

interface ParagraphContainerProps extends ParagraphProps {
  text: string;
  rows: number;
  style?: React.CSSProperties;
}

export default function ParagraphContainer(props: ParagraphContainerProps) {
  return (
    <Paragraph
      {...props}
      ellipsis={{ rows: props.rows, expandable: true, symbol: "Ver más" }}
      style={props.style}
    >
      {props.text}
    </Paragraph>
  );
}
