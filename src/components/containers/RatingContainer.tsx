import { Rate } from "antd";

interface RatingContainerProps {
  score: number,
  readOnly?: boolean
}

export default function RatingContainer(props: RatingContainerProps) {
  return (
    <Rate 
      disabled={props.readOnly} 
      defaultValue={props.score} />
  )
}
