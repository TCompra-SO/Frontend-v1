import { Button } from "antd";
import { ButtonHTMLType, ButtonShape, ButtonType } from "antd/es/button";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { MouseEventHandler } from "react";

interface ButtonContainerProps {
  text: React.ReactNode,
  size?: SizeType,
  type?: ButtonType,
  ghost?: boolean,
  key?: React.Key | null,
  onClick?: MouseEventHandler,
  htmlType?: ButtonHTMLType,
  block?: boolean,
  shape?: ButtonShape,
  disabled?: boolean,
  icon?: React.ReactNode,
  style?: React.CSSProperties,
  className?: string,
  upperCaseSmaller?: boolean,
  iconPosition?: 'start' | 'end'
}

export default function ButtonContainer(props: ButtonContainerProps) {
  let newStyle = props.style;
  if (props.upperCaseSmaller)
    newStyle = {...props.style, textTransform: 'uppercase', fontSize: '0.8em', fontWeight: '600'};

  return (
    <Button
      size={props.size}
      type={props.type}
      ghost={props.ghost}
      key={props.key}
      onClick={props.onClick}
      htmlType={props.htmlType}
      block={props.block}
      shape={props.shape}
      disabled={props.disabled}
      icon={props.icon}
      style={newStyle}
      className={props.className}
      iconPosition={props.iconPosition}
    >
      {props.text}
    </Button>
  )
}
