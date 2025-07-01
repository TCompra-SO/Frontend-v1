import { useTranslation } from "react-i18next";
import ButtonContainer from "../../containers/ButtonContainer";
import NoContentModalContainer from "../../containers/NoContentModalContainer";
import {
  mainModalScrollStyle,
  mediumPlusModalWidth,
} from "../../../utilities/globals";

interface TermsAndConditionsModalProps {
  onClose: () => void;
  isOpen: boolean;
}

export default function TermsAndConditionsModal(
  props: TermsAndConditionsModalProps
) {
  const { t } = useTranslation();

  return (
    <NoContentModalContainer
      destroyOnHidden={true}
      width={mediumPlusModalWidth}
      open={props.isOpen}
      style={mainModalScrollStyle}
      closable={true}
      maskClosable={true}
      onClose={props.onClose}
    >
      <div className="modal-card">
        <div className="t-flex alert-base">
          <h1>{t("termsAndConditions")}</h1>
          <div>
            <div className="tc-seccion">
              <span className="tc-subtitulo">
                📄 Términos y Condiciones de Uso
              </span>
              <ol className="tc-lista-condiciones">
                <li>
                  <span className="tc-item-titulo">
                    Aceptación de términos:
                  </span>{" "}
                  Al registrarse en Tcompra.com, el usuario acepta estos
                  términos.
                </li>
                <li>
                  <span className="tc-item-titulo">
                    Descripción del servicio:
                  </span>{" "}
                  Tcompra.com permite publicar requerimientos, recibir
                  cotizaciones, emitir órdenes de compra, publicar liquidaciones
                  y usar chat interno.
                </li>
                <li>
                  <span className="tc-item-titulo">Registro y cuentas:</span> El
                  usuario debe proporcionar datos reales. Las empresas pueden
                  crear subusuarios con permisos diferenciados.
                </li>
                <li>
                  <span className="tc-item-titulo">Obligaciones:</span> Usar la
                  plataforma de buena fe. No publicaciones fraudulentas ni
                  requerimientos ilegales.
                </li>
                <li>
                  <span className="tc-item-titulo">
                    Publicación de contenido:
                  </span>{" "}
                  El contenido no debe infringir derechos de terceros ni ser
                  inapropiado.
                </li>
                <li>
                  <span className="tc-item-titulo">
                    Penalidades por mal uso:
                  </span>{" "}
                  Más de 5 anulaciones injustificadas de OC o cancelaciones de
                  requerimientos en una semana pueden derivar en suspensión.
                  Malas prácticas (espionaje comercial, lenguaje ofensivo)
                  conllevan suspensión o bloqueo.
                </li>
                <li>
                  <span className="tc-item-titulo">Moderación:</span>{" "}
                  Tcompra.com se reserva el derecho de auditar publicaciones y
                  chats.
                </li>
                <li>
                  <span className="tc-item-titulo">
                    Relación entre usuarios:
                  </span>{" "}
                  Tcompra.com no es parte del contrato final entre comprador y
                  proveedor.
                </li>
                <li>
                  <span className="tc-item-titulo">
                    Limitación de responsabilidad:
                  </span>{" "}
                  No se responsabiliza por pérdidas indirectas o interrupciones
                  de servicio.
                </li>
                <li>
                  <span className="tc-item-titulo">Modificaciones:</span> Los
                  términos pueden actualizarse.
                </li>
                <li>
                  <span className="tc-item-titulo">Ley aplicable:</span> Según
                  la jurisdicción de Tcompra.com.
                </li>
              </ol>
            </div>

            <div className="tc-seccion">
              <span className="tc-subtitulo">🔐 Política de Privacidad</span>
              <ol className="tc-lista-condiciones">
                <li>
                  <span className="tc-item-titulo">Responsable:</span>{" "}
                  Tcompra.com.
                </li>
                <li>
                  <span className="tc-item-titulo">Datos:</span> Registro
                  (empresa, contacto), datos transaccionales, IP y cookies.
                </li>
                <li>
                  <span className="tc-item-titulo">Finalidad:</span> Gestionar
                  cuentas, operaciones y analítica.
                </li>
                <li>
                  <span className="tc-item-titulo">Compartir datos:</span> Solo
                  con usuarios para la transacción y autoridades si es
                  obligatorio.
                </li>
                <li>
                  <span className="tc-item-titulo">Derechos:</span> Acceso,
                  rectificación o eliminación escribiendo a soporte@tcompra.com.
                </li>
                <li>
                  <span className="tc-item-titulo">Seguridad:</span> Medidas
                  técnicas y organizativas.
                </li>
                <li>
                  <span className="tc-item-titulo">Conservación:</span> Mientras
                  dure la relación o por obligación legal.
                </li>
                <li>
                  <span className="tc-item-titulo">Cambios:</span> Se
                  comunicarán oportunamente.
                </li>
                <li>
                  <span className="tc-item-titulo">Contacto:</span>{" "}
                  soporte@tcompra.com
                </li>
              </ol>
            </div>

            <div className="tc-seccion">
              <span className="tc-subtitulo">🍪 Política de Cookies</span>
              <ol className="tc-lista-condiciones">
                <li>
                  <span className="tc-item-titulo">Uso:</span> Cookies propias y
                  de terceros para optimizar navegación y recordar preferencias.
                </li>
                <li>
                  <span className="tc-item-titulo">Qué son:</span> Archivos que
                  almacenan información de la visita.
                </li>
                <li>
                  <span className="tc-item-titulo">Tipos:</span> Técnicas,
                  personalización, analíticas, de terceros.
                </li>
                <li>
                  <span className="tc-item-titulo">Consentimiento:</span> Al
                  usar la web, aceptas cookies. Puedes deshabilitarlas desde el
                  navegador.
                </li>
                <li>
                  <span className="tc-item-titulo">Cambios:</span> Se informarán
                  cambios.
                </li>
                <li>
                  <span className="tc-item-titulo">Contacto:</span>{" "}
                  soporte@tcompra.com
                </li>
              </ol>
            </div>

            <div className="tc-seccion">
              <span className="tc-subtitulo">🤖 Aviso de Uso de IA</span>
              <ol className="tc-lista-condiciones">
                <li>
                  <span className="tc-item-titulo">Uso de IA:</span> Sugerencias
                  automáticas de proveedores, filtros inteligentes,
                  recomendaciones.
                </li>
                <li>
                  <span className="tc-item-titulo">Limitación:</span> El usuario
                  decide. La IA no sustituye criterio humano.
                </li>
                <li>
                  <span className="tc-item-titulo">Privacidad:</span> Datos
                  procesados según la política vigente. Datos para IA pueden
                  anonimizarse.
                </li>
                <li>
                  <span className="tc-item-titulo">Actualizaciones:</span> Se
                  comunicará cualquier nuevo uso de IA.
                </li>
                <li>
                  <span className="tc-item-titulo">Contacto:</span>{" "}
                  soporte@tcompra.com
                </li>
              </ol>
            </div>
          </div>
          <div className="t-flex gap-15 wd-100 alert-btn">
            <ButtonContainer
              onClick={() => props.onClose()}
              children={t("acceptButton")}
              className="btn btn-default alert-boton"
            />
          </div>
        </div>
      </div>
    </NoContentModalContainer>
  );
}
