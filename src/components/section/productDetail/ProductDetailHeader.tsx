interface ProductDetailHeaderProps {
  reqTitle: string | undefined;
}

export default function ProductDetailHeader(props: ProductDetailHeaderProps) {
  // r3v
  return (
    <div className="section-guia t-flex j-items">
      <div className="t-flex f-column gap-10 header-requerimiento">
        <h1 className="m-0 text-truncate">{props.reqTitle}</h1>
        <div className="t-flex breadcrumb-req">
          <a className="ruta-req" href="#">
            Inicio
          </a>
          <div>/</div>
          <a className="ruta-req" href="#">
            Bienes
          </a>
          <div>/</div>
          <div className="text-truncate">{props.reqTitle}</div>
        </div>
      </div>
    </div>
  );
}
