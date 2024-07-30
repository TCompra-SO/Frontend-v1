import { Button } from "antd";
import { ButtonProps } from "antd/lib";

interface ButtonContainerProps extends ButtonProps {
  text: React.ReactNode;
  upperCaseSmaller?: boolean;
}

export default function ButtonContainer({
  upperCaseSmaller,
  text,
  ...rest
}: ButtonContainerProps) {
  let newStyle = rest.style;
  if (upperCaseSmaller)
    newStyle = {
      ...rest.style,
      textTransform: "uppercase",
      fontSize: "0.7em",
      fontWeight: "600",
    };

  return (
    <Button {...rest} style={newStyle}>
      {text}
    </Button>
  );
}
