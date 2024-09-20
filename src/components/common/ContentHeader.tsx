import { ReactNode } from "react";

interface ContentHeaderProps {
  title: string;
  additionalContent?: React.ReactNode;
  icon: ReactNode;
}

export default function ContentHeader(props: ContentHeaderProps) {
  return (
    <div className="t-flex t-wrap c-titulo">
      <div className="titulo">
        {props.icon} {props.title}
      </div>
      {props.additionalContent}
    </div>
  );
}
