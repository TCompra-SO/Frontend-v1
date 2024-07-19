import Paragraph from "antd/es/typography/Paragraph";
import { ParagraphProps } from "antd/lib/typography/Paragraph";

interface ParagraphContainerProps extends ParagraphProps {
  text: string;
  rows: number;
  expandable?: boolean;
  symbol?: React.ReactNode;
}

export default function ParagraphContainer(props: ParagraphContainerProps) {
  return (
    <Paragraph
      {...props}
      ellipsis={{
        rows: props.rows,
        expandable: props.expandable ? true : false,
        symbol: props.symbol,
      }}
    >
      {props.text}
    </Paragraph>
  );
}
