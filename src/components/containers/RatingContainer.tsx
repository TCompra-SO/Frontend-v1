import { Rate } from "antd";
import { RateProps } from "antd/lib";
import { useTranslation } from "react-i18next";

interface RatingContainerProps extends RateProps {
  score: number;
  readOnly?: boolean;
}

export default function RatingContainer(props: RatingContainerProps) {
  const { t } = useTranslation();

  return (
    <Rate
      {...props}
      disabled={props.readOnly}
      defaultValue={props.score}
      className=" stars-p p-start"
      character={<i className="fa-solid fa-star"></i>}
      tooltips={[
        t("veryPoorRate"),
        t("poorRate"),
        t("neutralRate"),
        t("goodRate"),
        t("excellentRate"),
      ]}
    />
  );
}
