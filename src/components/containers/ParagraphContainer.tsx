import Paragraph from "antd/es/typography/Paragraph";
import { ParagraphProps } from "antd/lib/typography/Paragraph";

interface ParagraphContainerProps extends ParagraphProps {}

export default function ParagraphContainer(props: ParagraphContainerProps) {
  return <Paragraph {...props}>{props.children}</Paragraph>;
}
