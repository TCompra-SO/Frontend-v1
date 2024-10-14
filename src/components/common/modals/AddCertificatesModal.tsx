export default function AddCertificatesModal() {
  return (
    <div className="modal-card img-bg-certificado">
      <div className="t-flex mr-sub-2">
        <i className="fa-regular fa-file-certificate sub-icon-cert"></i>
        <div className="sub-titulo sub-calificar">
          <div>Certifica tu Empresa</div>
          <div className="calificar-detalle">
            Mejora notablemente la imagen de tu empresa.
          </div>
        </div>
      </div>
      <div className="t-flex gap-15 preguntas">
        <div className="t-flex gap-15 datos-empresa">
          <div className="card-ofertas cert-datos dato-empresa">
            Muebles M&M
          </div>
          <div className="card-ofertas cert-datos dato-empresa">
            RUC:12346598779
          </div>
        </div>
        <div className="t-flex t-wrap up-footer">
          <div className="t-flex cert-documentos">
            <div className="footer-text">Documentos</div>
            <div className="oferta-cant-doc">5</div>
          </div>
          <div className="">
            <button className="btn btn-green wd-100">Agregar Documento</button>
          </div>
        </div>
        <div className="card-ofertas t-flex doc-upload">
          <div>
            <i className="fa-regular fa-file-lines icon-doc"></i>
          </div>
          <div className="t-flex wd-100 doc-datos">
            <input
              type="text"
              className="form-control f-white"
              placeholder="Nombre del Documento"
            />
            <div className="t-flex doc-botones">
              <button className="btn btn-opaco btn-sm wd-100">
                <i className="fa-regular fa-images"></i> Agregar Imagenes
              </button>
              <button className="btn btn-black btn-sm wd-100">Eliminar</button>
            </div>
          </div>
        </div>
        <div className="text-right">
          <button className="btn btn-green">Adjuntar Documento</button>
        </div>
      </div>
    </div>
  );
}
