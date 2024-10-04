import { Rate } from "antd";
import { RateProps } from "antd/lib";

interface RatingContainerProps extends RateProps {
  score: number;
  readOnly?: boolean;
}

export default function RatingContainer(props: RatingContainerProps) {
  return (
    <Rate
      {...props}
      disabled={props.readOnly}
      defaultValue={props.score}
      className=" stars-p p-start"
      character={<i className="fa-solid fa-star"></i>}
    />
  );
}
