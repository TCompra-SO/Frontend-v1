interface ContentHeaderProps {
  title: string;
  additionalContent?: React.ReactNode;
}

export default function ContentHeader(props: ContentHeaderProps) {
  return (
    <div className="t-flex t-wrap c-titulo">
      <div className="titulo">
        <i className="fa-regular fa-dolly c-default"></i> {props.title}
      </div>
      {props.additionalContent}
    </div>
  );
}
