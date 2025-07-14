import { useTranslation } from "react-i18next";
import ButtonContainer from "../../containers/ButtonContainer";
import NoContentModalContainer from "../../containers/NoContentModalContainer";
import {
  mainModalScrollStyle,
  mediumPlusModalWidth,
} from "../../../utilities/globals";
import { TermsAndConditionsType } from "../../../utilities/types";

interface TermsAndConditionsModalProps {
  onClose: () => void;
  isOpen: boolean;
  type: TermsAndConditionsType;
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
        <div className="t-flex tc-alert-base">
          {props.type == TermsAndConditionsType.GENERAL ? (
            <>
              <h3 style={{ textAlign: "center" }}>{t("termsAndConditions")}</h3>
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
                      cotizaciones, emitir órdenes de compra, publicar
                      liquidaciones y usar chat interno.
                    </li>
                    <li>
                      <span className="tc-item-titulo">
                        Registro y cuentas:
                      </span>{" "}
                      El usuario debe proporcionar datos reales. Las empresas
                      pueden crear subusuarios con permisos diferenciados.
                    </li>
                    <li>
                      <span className="tc-item-titulo">Obligaciones:</span> Usar
                      la plataforma de buena fe. No publicaciones fraudulentas
                      ni requerimientos ilegales.
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
                      Más de 5 anulaciones injustificadas de OC o cancelaciones
                      de requerimientos en una semana pueden derivar en
                      suspensión. Malas prácticas (espionaje comercial, lenguaje
                      ofensivo) conllevan suspensión o bloqueo.
                    </li>
                    <li>
                      <span className="tc-item-titulo">Moderación:</span>{" "}
                      Tcompra.com se reserva el derecho de auditar publicaciones
                      y chats.
                    </li>
                    <li>
                      <span className="tc-item-titulo">
                        Relación entre usuarios:
                      </span>{" "}
                      Tcompra.com no es parte del contrato final entre comprador
                      y proveedor.
                    </li>
                    <li>
                      <span className="tc-item-titulo">
                        Limitación de responsabilidad:
                      </span>{" "}
                      No se responsabiliza por pérdidas indirectas o
                      interrupciones de servicio.
                    </li>
                    <li>
                      <span className="tc-item-titulo">Modificaciones:</span>{" "}
                      Los términos pueden actualizarse.
                    </li>
                    <li>
                      <span className="tc-item-titulo">Ley aplicable:</span>{" "}
                      Según la jurisdicción de Tcompra.com.
                    </li>
                  </ol>
                </div>

                <div className="tc-seccion">
                  <span className="tc-subtitulo">
                    🔐 Política de Privacidad
                  </span>
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
                      <span className="tc-item-titulo">Finalidad:</span>{" "}
                      Gestionar cuentas, operaciones y analítica.
                    </li>
                    <li>
                      <span className="tc-item-titulo">Compartir datos:</span>{" "}
                      Solo con usuarios para la transacción y autoridades si es
                      obligatorio.
                    </li>
                    <li>
                      <span className="tc-item-titulo">Derechos:</span> Acceso,
                      rectificación o eliminación escribiendo a
                      soporte@tcompra.com.
                    </li>
                    <li>
                      <span className="tc-item-titulo">Seguridad:</span> Medidas
                      técnicas y organizativas.
                    </li>
                    <li>
                      <span className="tc-item-titulo">Conservación:</span>{" "}
                      Mientras dure la relación o por obligación legal.
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
                      <span className="tc-item-titulo">Uso:</span> Cookies
                      propias y de terceros para optimizar navegación y recordar
                      preferencias.
                    </li>
                    <li>
                      <span className="tc-item-titulo">Qué son:</span> Archivos
                      que almacenan información de la visita.
                    </li>
                    <li>
                      <span className="tc-item-titulo">Tipos:</span> Técnicas,
                      personalización, analíticas, de terceros.
                    </li>
                    <li>
                      <span className="tc-item-titulo">Consentimiento:</span> Al
                      usar la web, aceptas cookies. Puedes deshabilitarlas desde
                      el navegador.
                    </li>
                    <li>
                      <span className="tc-item-titulo">Cambios:</span> Se
                      informarán cambios.
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
                      <span className="tc-item-titulo">Uso de IA:</span>{" "}
                      Sugerencias automáticas de proveedores, filtros
                      inteligentes, recomendaciones.
                    </li>
                    <li>
                      <span className="tc-item-titulo">Limitación:</span> El
                      usuario decide. La IA no sustituye criterio humano.
                    </li>
                    <li>
                      <span className="tc-item-titulo">Privacidad:</span> Datos
                      procesados según la política vigente. Datos para IA pueden
                      anonimizarse.
                    </li>
                    <li>
                      <span className="tc-item-titulo">Actualizaciones:</span>{" "}
                      Se comunicará cualquier nuevo uso de IA.
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
            </>
          ) : props.type == TermsAndConditionsType.SALES ? (
            <>
              <h3 style={{ textAlign: "center" }}>{`${t(
                "termsAndConditions"
              )} - ${t("sales")}`}</h3>
              <div>
                <div className="tc-seccion">
                  <span className="tc-subtitulo">
                    1. Definición de Liquidación
                  </span>
                  <p>
                    Una liquidación es la venta de bienes que constituyen
                    excedentes de stock, productos fuera de rotación, productos
                    próximos a vencimiento, discontinuados o bienes con
                    obsolescencia comercial, ofrecidos a precios
                    significativamente menores al valor de mercado,
                    preferentemente en volúmenes atractivos para compradores
                    empresariales.
                  </p>
                </div>
                <div className="tc-seccion">
                  <span className="tc-subtitulo">
                    2. Publicación Sujeta a Validación
                  </span>
                  <p>
                    Toda liquidación publicada deberá pasar por un proceso de
                    revisión manual por parte del equipo de Tcompra.com, quien
                    determinará si cumple con los criterios de cantidad, precio,
                    categoría y condición del bien. Tcompra.com se reserva el
                    derecho de rechazar, pausar o eliminar publicaciones que no
                    se ajusten a estos términos.
                  </p>
                </div>
                <div className="tc-seccion">
                  <span className="tc-subtitulo">
                    3. Unidades Mínimas Aceptadas
                  </span>
                  <p>
                    El usuario acepta respetar los criterios mínimos por
                    categoría, entre ellos:
                    <ul>
                      <li>
                        Maquinaria pesada y vehículos: permitido 1 unidad por su
                        valor unitario.
                      </li>
                      <li>
                        Bienes de consumo masivo (textiles, alimentos, insumos):
                        mínimo media docena, docena, cajas, pallets o lotes.
                      </li>
                      <li>
                        Muebles, equipos tecnológicos, herramientas y
                        materiales: permitido solo en packs o lotes.
                      </li>
                      <li>
                        Servicios: no se consideran liquidaciones. El detalle
                        completo se encuentra en la Guía de Publicación de
                        Liquidaciones, la cual forma parte de estos términos.
                      </li>
                    </ul>
                  </p>
                  <table border={1}>
                    <thead>
                      <tr>
                        <th>Categoría</th>
                        <th>Cantidad mínima aceptada</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Maquinaria pesada y equipos industriales</td>
                        <td>Por unidad (individual), por lote</td>
                      </tr>
                      <tr>
                        <td>Electrónica y tecnología</td>
                        <td>
                          A partir de 1 unidad, media docena, docena, pack, lote
                        </td>
                      </tr>
                      <tr>
                        <td>Alimentos y bebidas</td>
                        <td>Por caja, por lata</td>
                      </tr>
                      <tr>
                        <td>Ropa, calzado y accesorios</td>
                        <td>A partir de 1 docena, por lote</td>
                      </tr>
                      <tr>
                        <td>Productos para el hogar</td>
                        <td>A partir de 1 docena, por lote</td>
                      </tr>
                      <tr>
                        <td>Muebles</td>
                        <td>A partir media docena, por lote</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="tc-seccion">
                  <span className="tc-subtitulo">4. Precio de Liquidación</span>
                  <p>
                    Cada publicación debe reflejar de forma clara y verificable
                    el descuento real aplicado, especificar el precio unitario y
                    el valor total del lote. No se admitirán publicaciones con
                    precios engañosos o que simulen una liquidación sin ofrecer
                    descuentos significativos.
                  </p>
                </div>
                <div className="tc-seccion">
                  <span className="tc-subtitulo">
                    5. Penalidades por Incumplimiento
                  </span>
                  <p>
                    El mal uso reiterado de la categoría de liquidaciones,
                    incluidas:
                    <ul>
                      <li>
                        Publicaciones reiteradas de bienes que no cumplen
                        criterios mínimos
                      </li>
                      <li>
                        Manipulación de cantidad o precios para aparentar una
                        liquidación
                      </li>
                      <li>
                        Generar publicaciones spam o irreales, será motivo de
                        bloqueo temporal, restricción de privilegios de
                        publicación o suspensión definitiva de la cuenta, según
                        la severidad y recurrencia detectada.
                      </li>
                    </ul>
                  </p>
                </div>
                <div className="tc-seccion">
                  <span className="tc-subtitulo">
                    6. Responsabilidad del Usuario
                  </span>
                  <p>
                    El usuario es responsable de garantizar que los bienes
                    liquidados cumplen las leyes aplicables (condiciones
                    sanitarias, permisos de comercialización, fecha de
                    vencimiento visible cuando corresponda). Tcompra.com no se
                    hace responsable por disputas derivadas de información falsa
                    o incompleta en la publicación.
                  </p>
                </div>
                <div className="tc-seccion">
                  <span className="tc-subtitulo">
                    7. Aceptación Obligatoria
                  </span>
                  <p>
                    Al momento de crear una liquidación, el usuario deberá
                    aceptar expresamente estos Términos y Condiciones de
                    Liquidaciones, así como los Términos Generales de Uso de
                    Tcompra.com.
                  </p>
                </div>
              </div>
              <div className="t-flex gap-15 wd-100 alert-btn">
                <ButtonContainer
                  onClick={() => props.onClose()}
                  children={t("acceptButton")}
                  className="btn btn-default alert-boton"
                />
              </div>
            </>
          ) : null}
        </div>
      </div>
    </NoContentModalContainer>
  );
}
