import TextArea from "antd/es/input/TextArea";
import { TextAreaProps } from "antd/lib/input/TextArea";

interface TextAreaContainerProps extends TextAreaProps {}

export default function TextAreaContainer(props: TextAreaContainerProps) {
  return <TextArea {...props} />;
}
