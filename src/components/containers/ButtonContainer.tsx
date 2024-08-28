import { Button } from "antd";
import { ButtonProps } from "antd/lib";

interface ButtonContainerProps extends ButtonProps {
  upperCaseSmaller?: boolean;
  common?: boolean;
}

export default function ButtonContainer({
  upperCaseSmaller,
  common,
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

  if (!common)
    return (
      <Button {...rest} style={newStyle}>
        {rest.children}
      </Button>
    );

  return (
    <button
      className={rest.className}
      onClick={rest.onClick}
      style={newStyle}
      children={rest.children}
    ></button>
  );
}
