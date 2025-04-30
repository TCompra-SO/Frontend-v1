# TCompra - Frontend

## Components

### Common

#### FormFields

Campos para usarse en diferentes formularios.

##### AboutMeField

Campo para el atributo Sobre mi de empresas.

_Props_

| Nombre        | Tipo      | Descripción                                                                                   |
| ------------- | --------- | --------------------------------------------------------------------------------------------- |
| edit?         | `boolean` | Indica si el campo está en modo edición.                                                      |
| value?        | `string`  | Valor del campo de texto.                                                                     |
| fromMyPerfil? | `boolean` | Determina si el campo es para el formulario de perfil personal (aparece un estilo diferente). |
| onlyItem?     | `boolean` | Si se establece como `true`, solo devuelve el componente `Form.Item` sin el contenedor extra. |

##### AddDocumentField

Campo de formulario para subir documentos. Admite múltiples configuraciones dependiendo del uso (subida directa, uso con botón personalizado, uso con formulario de oferta, etc.).

_Props_

| Nombre                 | Tipo                                                              | Descripción                                                                                                                             |
| ---------------------- | ----------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `forOffer?`            | `boolean`                                                         | Indica si el campo se usa en el formulario de una oferta. Ajusta los estilos del componente.                                            |
| `onlyUpload?`          | `{ child: ReactNode; onChange: (files: UploadFile[]) => void; }`  | Permite mostrar solo el componente de subida (sin `Form.Item`) con un elemento personalizado y un función que maneja el cambio.         |
| `multiple?`            | `boolean`                                                         | Permite subir múltiples archivos si se establece como `true`.                                                                           |
| `customChildToUpload?` | `{ child: ReactNode; handleChange: (fileName: string) => void; }` | Permite personalizar el botón o elemento que activa la subida, y una función que maneja el cambio usando el nombre del archivo cargado. |

_Ref_

| Nombre     | Tipo           | Descripción                             |
| ---------- | -------------- | --------------------------------------- |
| `reset()`  | `() => void`   | Limpia la lista de archivos cargados.   |
| `fileList` | `UploadFile[]` | Lista actual de archivos seleccionados. |

##### AddImagesField

Campo que permite subir imágenes con validaciones de tamaño y cantidad, y soporta personalización de la interfaz de carga y previsualización.

_Props_

| Nombre                 | Tipo                                                                                   | Descripción                                                                                                       |
| ---------------------- | -------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `forOffer?`            | `boolean`                                                                              | Aplica estilos específicos si el componente se utiliza en el formulario de una oferta.                            |
| `onlyUpload?`          | `{ child: ReactNode; onChange: (files: UploadFile[]) => void }`                        | Permite definir el componente como un área de carga personalizada con un contenido y función de manejo de cambio. |
| `customChildToUpload?` | `{ child: ReactNode; handlePreview: (previewFile: string, fileName: string) => void }` | Permite usar un nodo personalizado para el área de carga y una función que maneja la previsualización.            |

_Ref_

| Nombre     | Tipo           | Descripción                           |
| ---------- | -------------- | ------------------------------------- |
| `reset`    | `() => void`   | Limpia la lista de imágenes cargadas. |
| `fileList` | `UploadFile[]` | Lista actual de imágenes subidas.     |

##### AddressField

Campo para la dirección del usuario.

_Props_

| Nombre          | Tipo      | Descripción                                                                                   |
| --------------- | --------- | --------------------------------------------------------------------------------------------- |
| `value?`        | `string`  | Valor del campo de dirección.                                                                 |
| `edit?`         | `boolean` | Indica si el campo está en modo edición.                                                      |
| `fromMyPerfil?` | `boolean` | Determina si el campo es para el formulario de perfil personal (aparece un estilo diferente). |
| `onlyItem?`     | `boolean` | Si se establece como `true`, solo devuelve el componente `Form.Item` sin el contenedor extra. |

##### BudgetField

Campo numérico para capturar un presupuesto o precio.

_Props_

| Nombre             | Tipo      | Descripción                                                               |
| ------------------ | --------- | ------------------------------------------------------------------------- |
| `required`         | `boolean` | Indica si el campo es obligatorio.                                        |
| `greaterThanZero?` | `boolean` | Indica si el valor debe ser mayor a cero.                                 |
| `usePriceLabel?`   | `boolean` | Cambia el texto de etiqueta y placeholder a "price" en lugar de "budget". |

##### CanOfferField

Campo para seleccionar quién puede ofertar a un requerimiento.

_Props_

| Nombre                | Tipo                   | Descripción                                                                      |
| --------------------- | ---------------------- | -------------------------------------------------------------------------------- |
| `type`                | `RequirementType`      | Tipo de requerimiento (determina la lista de opciones disponibles).              |
| `handleOptionChange?` | `(value: any) => void` | Función que maneja el cambio de la opción seleccionada en el campo de selección. |
| `onBlur?`             | `() => void`           | Función que maneja el evento de perder el foco.                                  |

##### CategoryField

Campo para seleccionar el rubro.

_Props_

| Nombre                  | Tipo      | Descripción                                                                     |
| ----------------------- | --------- | ------------------------------------------------------------------------------- |
| `showLabelPlaceholder?` | `boolean` | Determina si se debe mostrar un placeholder con el texto "category" o "select". |
| `required?`             | `boolean` | Indica si el campo es obligatorio. Si no se pasa, por defecto es `true`.        |

##### CurrencyField

Campo para seleccionar la moneda.

_Props_

| Nombre                      | Tipo      | Descripción                                                               |
| --------------------------- | --------- | ------------------------------------------------------------------------- |
| `disabled?`                 | `boolean` | Indica si el campo de selección está deshabilitado.                       |
| `showDifferentPlaceholder?` | `boolean` | Si se establece como `true`, se usa un placeholder diferente de "select". |

##### DateField

Campo para seleccionar una fecha.

_Props_

| Nombre         | Tipo                             | Descripción                                                                      |
| -------------- | -------------------------------- | -------------------------------------------------------------------------------- |
| `disabledDate` | `(date: dayjs.Dayjs) => boolean` | Función para deshabilitar fechas específicas en el selector de fechas.           |
| `name`         | `string`                         | Nombre del campo, utilizado para el `label` y `name` del campo en el formulario. |

##### DeliveryTimeField

Campo para seleccionar el tiempo de entrega.

_Props_

| Nombre                      | Tipo      | Descripción                                                                                        |
| --------------------------- | --------- | -------------------------------------------------------------------------------------------------- |
| `showDifferentPlaceholder?` | `boolean` | Si se establece como `true`, se usa un placeholder diferente de "select" en el campo de selección. |

##### DescriptionCRField

Campo para la descripción al crear un requerimiento.

##### DniField

Campo para el DNI o RUC. Puede incluir un ícono para obtener el nombre de la persona.

_Props_

| Nombre           | Tipo         | Descripción                                                                                                        |
| ---------------- | ------------ | ------------------------------------------------------------------------------------------------------------------ | --- |
| `getUserName?`   | `() => void` | Función que obtiene el nombre de la persona.                                                                       |
| `onChange?`      | `() => void` | Función que maneja los cambios en el campo de entrada.                                                             |
| `edit?`          | `boolean`    | Indica si el campo está en modo edición. Si es `true`, el campo se deshabilita y no se puede ejecutar getUserName. |
| `value?`         | `string`     | Valor del campo.                                                                                                   |
| `onlyItem?`      | `boolean`    | Si se establece como `true`, solo devuelve el componente `Form.Item` sin el contenedor extra.                      |
| isDni            | `boolean`    | Determina si el campo es para un DNI (`true`) o un RUC (`false`).                                                  |
| `fromMyPerfil?`  | `boolean`    | Si es `true`, aplica un estilo diferente para el formulario de perfil personal.                                    |
| `includeSearch?` | `boolean`    | Si es `true`, incluye un ícono de búsqueda junto al campo de entrada.                                              |     |

##### DocumentsCertifCR

Campo para mostrar la lista de documentos/certificados requeridos para la certificación al crear un requerimiento. Deshabilitado (solo lectura).

##### DurationField

Campo de selección para elegir una unidad de duración (años, meses, o días) con la opción de asociarlo a una garantía si es necesario.

_Props_

| Nombre                      | Tipo                                          | Descripción                                                                                       |
| --------------------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `required`                  | `boolean`                                     | Indica si el campo es obligatorio.                                                                |
| `name`                      | `string`                                      | El nombre del campo en el formulario.                                                             |
| `showDifferentPlaceholder?` | `boolean`                                     | Si se establece como true, se usa un placeholder diferente de "select" en el campo de selección.  |
| `onChange?`                 | `(val: TimeMeasurement \| undefined) => void` | Función que se ejecuta cuando el valor de la selección cambia.                                    |
| `forWarranty?`              | `boolean`                                     | Determina si el campo está asociado con una garantía, lo que modificará el texto del placeholder. |

##### EmailCR

Input de solo lectura usado para mostrar email de usuario en formulario para crear requerimiento.

##### EmailField

Campo para ingresar una dirección de correo electrónico, con validación para asegurarse de que el formato sea correcto.

_Props_

| Nombre          | Tipo      | Descripción                                                                  |
| --------------- | --------- | ---------------------------------------------------------------------------- |
| `edit?`         | `boolean` | Determina si el campo está deshabilitado para edición.                       |
| `value?`        | `string`  | Valor inicial del campo.                                                     |
| `fromMyPerfil?` | `boolean` | Si se establece, aplica estilos específicos para un perfil de usuario.       |
| `onlyItem?`     | `boolean` | Si se establece, solo se muestra el `Form.Item` sin envoltorios adicionales. |

##### FullNameField

Campo de solo lectura para el nombre completo.

_Props_

| Nombre      | Tipo      | Descripción                                                           |
| ----------- | --------- | --------------------------------------------------------------------- |
| `edit?`     | `boolean` | Determina si el campo está deshabilitado para edición.                |
| `value?`    | `string`  | Valor inicial que se muestra en el campo.                             |
| `onlyItem?` | `boolean` | Si se establece, muestra solo el `Form.Item` sin estilos envolventes. |

##### ItemConditionField

Campo para mostrar el estado (usado o nuevo) de un ítem.

##### KeywordsField

Renderiza un campo de entrada para palabras clave con contador de caracteres y longitud máxima definida.

_Props_

| Nombre   | Tipo     | Descripción              |
| -------- | -------- | ------------------------ |
| `value?` | `string` | Valor inicial del campo. |

##### LocationField

Campo de selección para elegir una ciudad según los datos de país disponibles en el contexto global.

_Props_

| Nombre          | Tipo      | Descripción                                                                |
| --------------- | --------- | -------------------------------------------------------------------------- |
| `value?`        | `number`  | Valor inicial de la ciudad seleccionada.                                   |
| `edit?`         | `boolean` | Si está activado, el campo se muestra deshabilitado.                       |
| `fromMyPerfil?` | `boolean` | Si proviene del perfil del usuario, cambia la clase envolvente del diseño. |
| `onlyItem?`     | `boolean` | Si es `true`, se devuelve solo el componente `Form.Item` sin envoltorio.   |
| `required?`     | `boolean` | Determina si el campo es obligatorio. Por defecto, `true`.                 |

##### NameField

Campo de entrada para el nombre del usuario.

_Props_

| Nombre          | Tipo      | Descripción                                                              |
| --------------- | --------- | ------------------------------------------------------------------------ |
| `edit?`         | `boolean` | Si está activado, el campo se muestra deshabilitado.                     |
| `value?`        | `string`  | Valor inicial del campo.                                                 |
| `fromMyPerfil?` | `boolean` | Si proviene del perfil del usuario, aplica una clase específica.         |
| `onlyItem?`     | `boolean` | Si es `true`, solo se renderiza el `Form.Item` sin envoltorio adicional. |

##### OfferDescriptionField

Campo para la descripción de la oferta.

##### PasswordField

Campo de entrada para contraseña.

_Props_

| Nombre             | Tipo      | Descripción                                                              |
| ------------------ | --------- | ------------------------------------------------------------------------ |
| `name`             | `string`  | Nombre del campo en el formulario.                                       |
| `confirmPassword?` | `boolean` | Si es `true`, cambia el texto que se muestra a "confirmPassword".        |
| `onlyItem?`        | `boolean` | Si es `true`, solo se renderiza el `Form.Item` sin envoltorio adicional. |
| `fromMyPerfil?`    | `boolean` | Si proviene del perfil del usuario, aplica una clase específica.         |

##### PaymentMethodField

Campo para seleccionar el tipo de pago.

##### PhoneField

Campo de teléfono con un prefijo de código de país (predefinido).

_Props_

| Nombre          | Tipo      | Descripción                                                         |
| --------------- | --------- | ------------------------------------------------------------------- |
| `edit?`         | `boolean` | Si es `true`, desactiva la edición del número telefónico.           |
| `value?`        | `string`  | Valor inicial del campo.                                            |
| `fromMyPerfil?` | `boolean` | Si se usa desde el perfil, aplica una clase específica para estilo. |
| `onlyItem?`     | `boolean` | Si es `true`, renderiza solo el `Form.Item` sin contenedor externo. |

##### RangeDateField

Campo de selección de rango de fechas.

_Props_

| Nombre         | Tipo               | Descripción                                                |
| -------------- | ------------------ | ---------------------------------------------------------- |
| `name`         | `string`           | Nombre del campo en el formulario.                         |
| `placeholder?` | `[string, string]` | Placeholder para las fechas de inicio y fin.               |
| `allowEmpty?`  | `boolean`          | Si es `true`, permite que una o ambas fechas estén vacías. |

##### SpecialtyField

Campo de texto para ingresar la especialidad de una empresa.

_Props_

| Nombre          | Tipo      | Descripción                                                            |
| --------------- | --------- | ---------------------------------------------------------------------- |
| `fromMyPerfil?` | `boolean` | Si es `true`, se aplica un estilo diferente.                           |
| `onlyItem?`     | `boolean` | Si es `true`, se retorna solo el `Form.Item` sin envoltorio adicional. |

##### SupportField

Campo numérico para ingresar la cantidad de tiempo de soporte en meses.

##### TenureField

Campo numérico para ingresar la antigüedad en años.

_Props_

| Nombre          | Tipo      | Descripción                                                            |
| --------------- | --------- | ---------------------------------------------------------------------- |
| `fromMyPerfil?` | `boolean` | Si proviene del perfil del usuario, aplica una clase específica.       |
| `onlyItem?`     | `boolean` | Si es `true`, se retorna solo el `Form.Item` sin envoltorio adicional. |

##### TitleField

Campo de entrada para el título del requerimiento ode la oferta.

##### UserTypeField

Campo de selección para elegir el tipo de usuario.

_Props_

| Nombre      | Tipo        | Descripción                                                            |
| ----------- | ----------- | ---------------------------------------------------------------------- |
| `edit?`     | `boolean`   | Indica si el campo está en modo edición. No utilizado directamente.    |
| `value?`    | `UserRoles` | Valor inicial del campo. Se usa como `initialValue` en el `Form.Item`. |
| `onlyItem?` | `boolean`   | Si es `true`, se retorna solo el `Form.Item` sin envoltorio adicional. |

##### WarrantyField

Campo numérico para ingresar el período de garantía.

_Props_

| Nombre      | Tipo                 | Descripción                                           |
| ----------- | -------------------- | ----------------------------------------------------- |
| `required`  | `boolean`            | Define si el campo es obligatorio o no.               |
| `onChange?` | `(val: any) => void` | Función que se ejecuta al cambiar el valor del campo. |

#### GeneralTable

Componente para mostrar diferentes tipos de tablas.

_Props_

| Nombre                     | Tipo                          | Descripción                                                                                                                                                                                                                |
| -------------------------- | ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `content`                  | `TableType`                   | Contenido de la tabla. Incluye, entre otros datos: tipo de tabla, arreglo de datos para mostrar en la tabla, datos de paginación, de filtro y de orden, y función a llamarse para ciertas columnas que contienen acciones. |
| `loading?`                 | `boolean`                     | Estado de carga de la tabla. Muestra spinner si es `true`.                                                                                                                                                                 |
| `onRowAction?`             | `boolean`                     | Si es `true`, se habilita la función al hacer click en las filas de la tabla de tipo HOME.                                                                                                                                 |
| `onChangePageAndPageSize?` | `OnChangePageAndPageSizeType` | Función ejecutada cuando se produce un cambio en la tabla. Utiliza como parámetros los datos de paginación, filtros, orden y los datos fuente actuales de la tabla.                                                        |

##### Columns

###### ActionColumn

Muestra acciones condicionales para cada fila usando un menú Dropdown.

_Parámetros_

| Nombre          | Tipo                                                      | Descripción                                                                       |
| --------------- | --------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `type`          | `TableTypes`                                              | Tipo de tabla.                                                                    |
| `onButtonClick` | `(action: Action, data: any, subAction?: Action) => void` | Función de callback llamada al hacer click en una opción de la lista desplegable. |
| hidden          | `boolean`                                                 | Indica si la columna debe estar oculta (por defecto es `false`).                  |
| `extraParam?`   | `any`                                                     | Parámetro adicional que afecta el renderizado en ciertos tipos de tabla.          |

###### CategoryColumn

Muestra el rubro de los elementos en una tabla.

_Parámetros_

| Nombre | Tipo      | Descripción                                                            |
| ------ | --------- | ---------------------------------------------------------------------- |
| hidden | `boolean` | Indicador de si la columna debe estar oculta (por defecto es `false`). |

###### DocumentColumn

Muestra un botón para descargar una orden de compra/venta.

_Parámetros_

| Nombre          | Tipo                                   | Descripción                                                      |
| --------------- | -------------------------------------- | ---------------------------------------------------------------- |
| `type`          | `TableTypes`                           | Tipo de tabla.                                                   |
| `onButtonClick` | `(action: Action, data: any) => void,` | Función a ejecutarse al hacer click en el botón.                 |
| hidden          | `boolean`                              | Indica si la columna debe estar oculta (por defecto es `false`). |

###### GeneralColumnNumber

Muestra valores numéricos en general.

_Props_

| Nombre       | Tipo        | Descripción                                                                |
| ------------ | ----------- | -------------------------------------------------------------------------- |
| `nameColumn` | `string`    | Título que se mostrará en el encabezado de la columna.                     |
| `dataIndex`  | `string`    | Clave que identifica el campo de datos en los registros de la tabla.       |
| `hidden?`    | `boolean`   | Si es `true`, la columna estará oculta (valor por defecto: `false`).       |
| `width?`     | `number`    | Ancho personalizado para la columna (en píxeles). Valor por defecto: `75`. |
| `fieldSort?` | `FieldSort` | Configuración para el indicador visual de ordenamiento.                    |
| `noSorter?`  | `boolean`   | Si es `true`, deshabilita la capacidad de ordenar por esta columna.        |

###### GeneralColumnString

Muestra texto en general.

_Props_

| Nombre              | Tipo                    | Descripción                                                                |
| ------------------- | ----------------------- | -------------------------------------------------------------------------- |
| `nameColumn`        | `string`                | Título que se mostrará en el encabezado de la columna.                     |
| `dataIndex`         | `string`                | Clave que identifica el campo de datos en los registros de la tabla.       |
| `truncate`          | `boolean`               | Si es `true`, el texto se truncará con puntos suspensivos si es muy largo. |
| `width`             | `number`                | Ancho de la columna en píxeles (valor por defecto: `130`).                 |
| `hidden`            | `boolean`               | Si es `true`, la columna estará oculta (valor por defecto: `false`).       |
| `fieldSort?`        | `FieldSort`             | Configuración para el indicador visual de ordenamiento.                    |
| `noSorter?`         | `boolean`               | Si es `true`, deshabilita la capacidad de ordenar por esta columna.        |
| `getLabelFunction?` | `(type: any) => string` | Función opcional para obtener etiquetas traducidas del valor.              |

###### GeneralDateColumn

Muestra fechas en general.

_Props_

| Nombre       | Tipo        | Descripción                                                          |
| ------------ | ----------- | -------------------------------------------------------------------- |
| `nameColumn` | `string`    | Título que se mostrará en el encabezado de la columna.               |
| `dataIndex`  | `string`    | Clave que identifica el campo de fecha en los registros de la tabla. |
| `hidden`     | `boolean`   | Si es `true`, la columna estará oculta (valor por defecto: `false`). |
| `fieldSort?` | `FieldSort` | Configuración para el indicador visual de ordenamiento.              |
| `noSorter?`  | `boolean`   | Si es `true`, deshabilita la capacidad de ordenar por esta columna.  |

###### ImageColumn

Muestra una imagen del requerimiento o del usuario.

_Props_

| Nombre   | Tipo      | Descripción                                                      |
| -------- | --------- | ---------------------------------------------------------------- |
| `isUser` | `boolean` | Indica si la imagen es de un usuario.                            |
| `hidden` | `boolean` | Indica si la columna debe estar oculta (por defecto es `false`). |

###### LocationColumn

Muestra la ubicación.

_Props_

| Nombre       | Tipo        | Descripción                                                          |
| ------------ | ----------- | -------------------------------------------------------------------- |
| `hidden`     | `boolean`   | Si es `true`, la columna estará oculta (valor por defecto: `false`). |
| `fieldSort?` | `FieldSort` | Configuración para el indicador visual de ordenamiento.              |
| `noSorter?`  | `boolean`   | Si es `true`, deshabilita la capacidad de ordenar por esta columna.  |

###### NameColumn

Muestra texto con renderizado condicional basado en el tipo de tabla.

_Props_

| Nombre             | Tipo         | Descripción                                                              |
| ------------------ | ------------ | ------------------------------------------------------------------------ |
| `type`             | `TableTypes` | Tipo de tabla.                                                           |
| `nameColumnHeader` | `string`     | Título que se mostrará en el encabezado de la columna.                   |
| `hidden`           | `boolean`    | Si es `true`, la columna estará oculta (valor por defecto: `false`).     |
| `fieldSort?`       | `FieldSort`  | Configuración para el indicador visual de ordenamiento.                  |
| `extraParam?`      | `any`        | Parámetro adicional que afecta el renderizado en ciertos tipos de tabla. |
| `noSorter?`        | `boolean`    | Si es `true`, deshabilita la capacidad de ordenar por esta columna.      |

###### OffersColumn

Muestra la cantidad de ofertas hechas a un requerimiento.

_Props_

| Nombre          | Tipo                                  | Descripción                                                          |
| --------------- | ------------------------------------- | -------------------------------------------------------------------- |
| `type`          | `TableTypes`                          | Tipo de tabla.                                                       |
| `onButtonClick` | `(action: Action, data: any) => void` | Función callback que se ejecuta al hacer click en el botón.          |
| `hidden`        | `boolean`                             | Si es `true`, la columna estará oculta (valor por defecto: `false`). |
| `fieldSort?`    | `FieldSort`                           | Configuración para el indicador visual de ordenamiento.              |
| `noSorter?`     | `boolean`                             | Si es `true`, deshabilita la capacidad de ordenar por esta columna.  |

###### PriceColumn

Muestra un valor monetario.

_Props_

| Nombre       | Tipo        | Descripción                                                          |
| ------------ | ----------- | -------------------------------------------------------------------- |
| `hidden`     | `boolean`   | Si es `true`, la columna estará oculta (valor por defecto: `false`). |
| `fieldSort?` | `FieldSort` | Configuración para el indicador visual de ordenamiento.              |
| `noSorter?`  | `boolean`   | Si es `true`, deshabilita la capacidad de ordenar por esta columna.  |

###### RequirementColumn

Muestra el título del requerimiento para tablas de ofertas y de órdenes de compra/venta.

_Props_

| Nombre          | Tipo        | Descripción                                                                                        |
| --------------- | ----------- | -------------------------------------------------------------------------------------------------- |
| `isRequirement` | `boolean`   | Determina qué título que se mostrará en el encabezado de la columna (Requerimiento o Liquidación). |
| `hidden`        | `boolean`   | Si es `true`, la columna estará oculta (valor por defecto: `false`).                               |
| `fieldSort?`    | `FieldSort` | Configuración para el indicador visual de ordenamiento.                                            |

###### StateColumn

Muestra el estado de los elementos de la tabla.

_Props_

| Nombre          | Tipo         | Descripción                                                            |
| --------------- | ------------ | ---------------------------------------------------------------------- |
| `type`          | `TableTypes` | Tipo de tabla.                                                         |
| `hidden`        | `boolean`    | Si es `true`, la columna estará oculta (valor por defecto: `false`).   |
| `filteredInfo?` | `Filters`    | Información de filtros aplicados a la columna.                         |
| `extraParam?`   | `any`        | Parámetro adicional para modificar el comportamiento en ciertos casos. |

###### TypeColumn

Muestra el nombre del tipo de requerimiento (bien, servicio, liquidación, etc.).

_Props_

| Nombre   | Tipo      | Descripción                                                          |
| -------- | --------- | -------------------------------------------------------------------- |
| `hidden` | `boolean` | Si es `true`, la columna estará oculta (valor por defecto: `false`). |

###### ViewColumn

Muestra un botón para visualizar datos relacionados a la fila.

_Props_

| Nombre          | Tipo                                  | Descripción                                                          |
| --------------- | ------------------------------------- | -------------------------------------------------------------------- |
| `type`          | `TableTypes`                          | Tipo de tabla.                                                       |
| `onButtonClick` | `(action: Action, data: any) => void` | Función a ejecutarse cuando se hace click en el botón.               |
| `hidden`        | `boolean`                             | Si es `true`, la columna estará oculta (valor por defecto: `false`). |

#### modals

##### AddCertificatesModal

Componente modal para subir certificados/documentos que serán enviados al momento de certificarse con un una empresa.

_Props_

| Nombre                   | Tipo                                     | Descripción                                                                                       |
| ------------------------ | ---------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `onDocumentAdded?`       | `() => void`                             | Callback que se ejecuta después de subir documentos exitosamente.                                 |
| `onClose`                | `() => any`                              | Función para cerrar el modal.                                                                     |
| `useApiHook`             | `ReturnType<typeof useApi>`              | Hook para manejar la respuesta, error, estado de carga y función para ejecutar la solicitud HTTP. |
| `setApiParams`           | `(params: useApiParams) => void`         | Función para configurar parámetros de la solicitud HTTP.                                          |
| `setAdditionalApiParams` | `(additionalParams: UseApiType) => void` | Función para configurar parámetros adicionales del hook useApi.                                   |

##### CancelPurchaseOrderModal

Componente modal para cancelar órdenes de compra o requerimientos después de ingresar un motivo.

_Props_

| Nombre                     | Tipo                                      | Descripción                                                      |
| -------------------------- | ----------------------------------------- | ---------------------------------------------------------------- |
| `onClose`                  | `() => any`                               | Función para cerrar el modal.                                    |
| `offerId`                  | `string`                                  | ID de la oferta a cancelar.                                      |
| `requirementId`            | `string`                                  | ID del requerimiento a cancelar.                                 |
| `fromRequirementTable`     | `boolean`                                 | Indica si la cancelación viene desde la tabla de requerimientos. |
| `canceledByCreator`        | `boolean`                                 | Indica si la oferta es cancelada por su creador.                 |
| `onCancelSuccess?`         | `(offerId: string) => void`               | Callback al cancelar exitosamente.                               |
| `useCancelRequirementHook` | `ReturnType<typeof useCancelRequirement>` | Hook para cancelar requerimientos.                               |
| `useCancelOfferHook`       | `ReturnType<typeof useCancelOffer>`       | Hook para cancelar ofertas.                                      |
| `type`                     | `RequirementType`                         | Tipo de requerimiento.                                           |
| `additionalApiParams`      | `UseApiType`                              | Parámetros adicionales del hook useApi.                          |
| `setAdditionalApiParams`   | `(additionalParams: UseApiType) => void`  | Función para configurar parámetros adicionales del hook useApi.  |
| `notificationTargetData`   | `NotificationTargetData`                  | Datos del receptor y objetivo de la notificación.                |
| `requirementTitle`         | `string`                                  | Título del requerimiento.                                        |

##### ConfirmationModal

Componente modal genérico para confirmaciones con opción de personalización.

_Props_

| Nombre                  | Tipo                   | Descripción                                                           |
| ----------------------- | ---------------------- | --------------------------------------------------------------------- |
| `text`                  | `React.ReactNode`      | Contenido principal del modal (texto o componente).                   |
| `icon?`                 | `React.ReactNode`      | Ícono personalizado.                                                  |
| `onClose`               | `() => any`            | Función para cerrar el modal.                                         |
| `onAnswer`              | `(ok: boolean) => any` | Callback que recibe la respuesta del usuario (true/false).            |
| `loading?`              | `boolean`              | Indica si debe mostrarse un estado de carga en el botón aceptar.      |
| `showOnlyAcceptButton?` | `boolean`              | Si es true, oculta el botón de cancelar y solo muestra el de aceptar. |

##### EditDocumentListToRequestModal

Componente modal para editar la lista de documentos requeridos a otras empresas para certificarlas.

_Props_

| Nombre    | Tipo         | Descripción                                |
| --------- | ------------ | ------------------------------------------ |
| `text`    | `string`     | Texto inicial para la lista de documentos. |
| `onClose` | `() => void` | Función para cerrar el modal.              |

##### InputEmailModal

Componente modal para ingreso de email.

_Props_

| Nombre        | Tipo                     | Descripción                                        |
| ------------- | ------------------------ | -------------------------------------------------- |
| `title?`      | `React.ReactNode`        | Título del modal.                                  |
| `text?`       | `React.ReactNode`        | Contenido adicional a mostrarse.                   |
| `buttonText?` | `ReactNode`              | Texto personalizado para el botón de aceptar.      |
| `onAnswer`    | `(email: string) => any` | Callback que recibe el email ingresado al aceptar. |
| `onClose`     | `() => any`              | Función para cerrar el modal.                      |

##### RatingCanceledModal

Componente modal para calificar a usuario que ha cancelado una oferta seleccionada.

_Props_

| Nombre                   | Tipo                                     | Descripción                                                                                                                                                  |
| ------------------------ | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `basicRateData`          | `BasicRateData`                          | Datos básicos del usuario a calificar. Incluye la uid del requerimiento u oferta dependiendo de si este usuario es creador del requerimiento o de la oferta. |
| `type`                   | `RequirementType`                        | Tipo de requerimiento.                                                                                                                                       |
| `isOffer`                | `boolean`                                | Indica si se está calificando al creador de una oferta.                                                                                                      |
| `requirementOrOfferId`   | `string`                                 | ID del requerimiento (si isOffer es `true`) u oferta (si isOffer es `false`) relacionada.                                                                    |
| `onSuccess?`             | `(id: string) => void`                   | Callback ejecutado con la uid del requerimiento/oferta de `basicRateData` al guardar la calificación exitosamente.                                           |
| `onExecute?`             | `(id: string) => void`                   | Callback ejecutado con la uid del requerimiento/oferta de `basicRateData` al iniciar el proceso de calificación.                                             |
| `onError?`               | `(id: string) => void`                   | Callback ejecutado con la uid del requerimiento/oferta de `basicRateData` si ocurre un error al calificar.                                                   |
| `onClose`                | `() => any`                              | Función para cerrar el modal.                                                                                                                                |
| `useApiHook`             | `ReturnType<typeof useApi>`              | Hook para manejar la respuesta, error, estado de carga y función para ejecutar la solicitud HTTP.                                                            |
| `setApiParams`           | `(params: useApiParams) => void`         | Función para configurar parámetros de la solicitud HTTP.                                                                                                     |
| `setAdditionalApiParams` | `(additionalParams: UseApiType) => void` | Función para configurar parámetros adicionales del hook useApi.                                                                                              |

##### RatingModal

Componente modal para calificar a un usuario y culminar transacciones con múltiples preguntas de evaluación.

_Props_

| Nombre                    | Tipo                                     | Descripción                                                                                   |
| ------------------------- | ---------------------------------------- | --------------------------------------------------------------------------------------------- |
| `basicRateData`           | `BasicRateData`                          | Datos del usuario a calificar.                                                                |
| `type`                    | `RequirementType`                        | Tipo de requerimiento.                                                                        |
| `isOffer`                 | `boolean`                                | Indica si se está calificando una oferta (true) o requerimiento (false).                      |
| `onClose`                 | `() => any`                              | Función para cerrar el modal.                                                                 |
| `requirementOrOfferId`    | `string`                                 | ID del requerimiento (si isOffer es `true`) u oferta (si isOffer es `false`) relacionada.     |
| `requirementOrOfferTitle` | `string`                                 | Título del requerimiento (si isOffer es `true`) u oferta (si isOffer es `false`) relacionada. |
| `useApiHook`              | `ReturnType<typeof useApi>`              | Hook para manejar la respuesta, error y estado de carga de la solicitud HTTP.                 |
| `setApiParams`            | `(params: useApiParams) => void`         | Función para configurar parámetros de la solicitud HTTP.                                      |
| `setAdditionalApiParams`  | `(additionalParams: UseApiType) => void` | Función para configurar parámetros adicionales del hook useApi.                               |

##### SelectDocumentsToSendCertificateModal

Componente modal para seleccionar y enviar documentos para certificación.

_Props_

| Nombre                   | Tipo                                     | Descripción                                                                   |
| ------------------------ | ---------------------------------------- | ----------------------------------------------------------------------------- |
| `data`                   | `SelectDocsModalData`                    | Datos de la empresa a certificar.                                             |
| `onClose`                | `() => any`                              | Función para cerrar el modal.                                                 |
| `certificationId?`       | `string`                                 | ID de certificación existente (para reenvío).                                 |
| `onRequestSent?`         | `() => void`                             | Callback al enviar documentos exitosamente.                                   |
| `setLoading?`            | `(val: boolean) => void`                 | Función para controlar estado de carga.                                       |
| `useApiHook`             | `ReturnType<typeof useApi>`              | Hook para manejar la respuesta, error y estado de carga de la solicitud HTTP. |
| `setApiParams`           | `(params: useApiParams) => void`         | Función para configurar parámetros de la solicitud HTTP.                      |
| `setAdditionalApiParams` | `(additionalParams: UseApiType) => void` | Función para configurar parámetros adicionales del hook useApi.               |

##### SendMessageModal

Componente modal para enviar mensajes e iniciar chats con otros usuarios.

_Props_

| Nombre           | Tipo              | Descripción                               |
| ---------------- | ----------------- | ----------------------------------------- |
| `onClose`        | `() => any`       | Función para cerrar el modal.             |
| `requirementId`  | `string`          | ID del requerimiento relacionado al chat. |
| `title`          | `string`          | Título del requerimiento.                 |
| `type`           | `RequirementType` | Tipo de requerimiento.                    |
| `receiverImage?` | `string`          | URL de la imagen del receptor.            |
| `receiverName`   | `string`          | Nombre del usuario receptor.              |
| `receiverId`     | `string`          | ID del usuario receptor.                  |

##### TermsAndConditionsModal

Modal para visualización de términos y condiciones con opción de aceptación.

_Props_

| Nombre    | Tipo         | Descripción                                      |
| --------- | ------------ | ------------------------------------------------ |
| `onClose` | `() => void` | Función para cerrar el modal y aceptar términos. |
| `isOpen`  | `boolean`    | Controla la visibilidad del modal.               |

##### UserInfoModal

Componente modal para visualizar información detallada de un usuario.

_Props_

| Nombre | Tipo       | Descripción                                           |
| ------ | ---------- | ----------------------------------------------------- |
| `user` | `FullUser` | Objeto con toda la información del usuario a mostrar. |

##### ViewDocsReceivedCertificate

Componente modal para visualizar y gestionar documentos recibidos para certificación.

_Props_

| Nombre                   | Tipo                                     | Descripción                                                                   |
| ------------------------ | ---------------------------------------- | ----------------------------------------------------------------------------- |
| `data`                   | `CertificationItem`                      | Datos de la certificación.                                                    |
| `docs`                   | `CertificateFile[]`                      | Lista de documentos asociados.                                                |
| `readOnly?`              | `boolean`                                | Si es true, muestra el modal en modo solo lectura.                            |
| `onClose`                | `() => any`                              | Función para cerrar el modal.                                                 |
| `useApiHook`             | `ReturnType<typeof useApi>`              | Hook para manejar la respuesta, error y estado de carga de la solicitud HTTP. |
| `setApiParams`           | `(params: useApiParams) => void`         | Función para configurar parámetros de la solicitud HTTP.                      |
| `setAdditionalApiParams` | `(additionalParams: UseApiType) => void` | Función para configurar parámetros adicionales del hook useApi.               |

#### Utils

##### AvatarImage

Componente para mostrar una imagen de avatar con valores por defecto.

_Props_

| Nombre   | Tipo                              | Descripción                                                                 |
| -------- | --------------------------------- | --------------------------------------------------------------------------- |
| `image`  | `string \| string[] \| undefined` | URL(s) de la imagen a mostrar. Puede ser string, array o undefined.         |
| `isUser` | `boolean`                         | Determina la imagen por defecto a usar (true=usuario, false=requerimiento). |

##### ContentHeader

Componente para encabezados de sección con título y contenido adicional.

_Props_

| Nombre               | Tipo              | Descripción                                             |
| -------------------- | ----------------- | ------------------------------------------------------- |
| `title`              | `string`          | Texto principal del encabezado.                         |
| `additionalContent?` | `React.ReactNode` | Contenido opcional adicional a mostrar junto al título. |
| `icon`               | `ReactNode`       | Componente/ícono a mostrar junto al título.             |

##### CustomFilterDropdown

Componente personalizado para dropdown de filtros en tablas de Ant Design. Permite aplicar filtros otra vez cuando no han cambiado.

_Props_

| Nombre            | Tipo                                  | Descripción                                                  |
| ----------------- | ------------------------------------- | ------------------------------------------------------------ |
| `setSelectedKeys` | `(keys: React.Key[]) => void`         | Función para actualizar las claves de filtros seleccionados. |
| `selectedKeys`    | `React.Key[]`                         | Claves de filtros actualmente seleccionadas.                 |
| `confirm`         | `() => void`                          | Función para confirmar la selección.                         |
| `clearFilters`    | `() => void`                          | Función para limpiar los filtros.                            |
| `filters`         | `StrictColumnFilterItem[]`            | Lista de opciones de filtro disponibles.                     |
| `filteredInfo`    | `Record<string, FilterValue \| null>` | Información sobre los filtros actualmente aplicados.         |

##### DescriptionParagraph

Componente para mostrar texto con funcionalidad de expandir/colapsar.

_Props_

| Nombre       | Tipo                  | Descripción                                                          |
| ------------ | --------------------- | -------------------------------------------------------------------- |
| `text`       | `string \| undefined` | Texto a mostrar. Si es `undefined`, no se renderiza el componente.   |
| `className?` | `string`              | Clases CSS adicionales para personalizar el estilo.                  |
| `rows?`      | `number`              | Número máximo de filas a mostrar cuando está colapsado (default: 3). |

##### FrontImage

Componente para mostrar imágenes con funcionalidad de previsualización.

_Props_

| Nombre     | Tipo                              | Descripción                                                          |
| ---------- | --------------------------------- | -------------------------------------------------------------------- |
| `image`    | `string \| string[] \| undefined` | URL(s) de la imagen a mostrar.                                       |
| `isUser`   | `boolean`                         | Determina la imagen por defecto (true=usuario, false=requerimiento). |
| `small?`   | `boolean`                         | Si es true, aplica estilo pequeño.                                   |
| `forHome?` | `boolean`                         | Si es true, aplica estilo especial para home.                        |

##### ImagesAndDocs

Componente para mostrar y gestionar imágenes, documentos y otras acciones.

_Props_

| Nombre       | Tipo                                    | Descripción                                                     |
| ------------ | --------------------------------------- | --------------------------------------------------------------- |
| `image`      | `string[] \| undefined`                 | Array de URLs de imágenes.                                      |
| `document`   | `string[] \| undefined`                 | Array de URLs de documentos.                                    |
| `showChat?`  | `boolean`                               | Si es true, muestra el ícono de chat.                           |
| `goToChat?`  | `() => void`                            | Función para navegar al chat.                                   |
| `orderData?` | `{ id: string; type: RequirementType }` | Datos para descargar PDF de orden (id y tipo de requerimiento). |

##### NotificationUserAvatar

Componente para mostrar avatar de usuario en notificaciones.

_Props_

| Nombre        | Tipo                  | Descripción                                                                        |
| ------------- | --------------------- | ---------------------------------------------------------------------------------- |
| `senderImage` | `string \| undefined` | URL de la imagen del usuario. Si es undefined, muestra letra inicial de su nombre. |
| `senderName`  | `string`              | Nombre del usuario para generar inicial cuando no hay imagen.                      |
| `size?`       | `AvatarSize`          | Tamaño del avatar.                                                                 |

##### PriceInHeader

Componente para mostrar precios con formato de moneda en encabezados.

_Props_

| Nombre          | Tipo      | Descripción                                                              |
| --------------- | --------- | ------------------------------------------------------------------------ |
| `coin`          | `number`  | ID de la moneda para mostrar su símbolo.                                 |
| `price`         | `number`  | Valor numérico del precio a mostrar.                                     |
| `useOfferClass` | `boolean` | Determina la clase CSS a aplicar dependiendo si es para una oferta o no. |

##### RateStarCount

Componente para mostrar puntuaciones con estrellas y conteo de valoraciones.

_Props_

| Nombre  | Tipo                  | Descripción                                 |
| ------- | --------------------- | ------------------------------------------- |
| `score` | `number \| undefined` | Puntuación numérica a mostrar (0-5).        |
| `count` | `number \| undefined` | Cantidad de valoraciones recibidas.         |
| `type?` | `RateStartCountType`  | Tipo de visualización, afecta a clases CSS. |

##### SubUserName

Componente para mostrar inicial de subusuario con tooltip.

_Props_

| Nombre        | Tipo                  | Descripción                              |
| ------------- | --------------------- | ---------------------------------------- |
| `subUserName` | `string \| undefined` | Nombre del subusuario (muestra inicial). |
| `small?`      | `boolean`             | Si es true, aplica estilo pequeño.       |
