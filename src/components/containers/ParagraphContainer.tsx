import Paragraph from "antd/es/typography/Paragraph"

interface ParagraphContainerProps {
  text: string,
  rows: number,
  style?: React.CSSProperties
}

export default function ParagraphContainer(props: ParagraphContainerProps) {
  return (
    <Paragraph 
      ellipsis={{ rows: props.rows, expandable: true, symbol: 'Ver más' }}
      style={props.style}
    >
      {props.text}
    </Paragraph>
  )
}
