import { Button } from "antd";
import { ButtonProps } from "antd/lib";

interface ButtonContainerProps extends ButtonProps {
  text: React.ReactNode;
  upperCaseSmaller?: boolean;
}

export default function ButtonContainer(props: ButtonContainerProps) {
  let newStyle = props.style;
  if (props.upperCaseSmaller)
    newStyle = {
      ...props.style,
      textTransform: "uppercase",
      fontSize: "0.8em",
      fontWeight: "600",
    };

  return (
    <Button {...props} style={newStyle}>
      {props.text}
    </Button>
  );
}
