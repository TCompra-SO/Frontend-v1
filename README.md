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

#### Modals

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

##### RequirementModalOfferSelected

Componente modal para selección y confirmación de una oferta en un requerimiento.

_Props_

| Nombre                   | Tipo                                     | Descripción                                        |
| ------------------------ | ---------------------------------------- | -------------------------------------------------- |
| `offer`                  | `Offer`                                  | Oferta seleccionada.                               |
| `requirement`            | `Requirement`                            | Requerimiento asociado.                            |
| `onClose`                | `() => any`                              | Función para cerrar el modal.                      |
| `onSuccess`              | `(offerId: string) => void`              | Callback al seleccionar oferta exitosamente.       |
| `filters`                | `OfferFilters`                           | Filtros aplicados a la lista de ofertas.           |
| `filterNames`            | `FilterNames`                            | Nombres de los filtros aplicados.                  |
| `useApiHook`             | `ReturnType<typeof useApi>`              | Hook para manejo de API.                           |
| `setAdditionalApiParams` | `(additionalParams: UseApiType) => void` | Configura parámetros adicionales para hook useApi. |
| `setApiParams`           | `(params: useApiParams) => void`         | Configura parámetros para soliciud HTTP.           |

##### RequirementModalRepublish

Componente modal para republicación de requerimiento con selección de nueva fecha.

_Props_

| Nombre                   | Tipo                                     | Descripción                                        |
| ------------------------ | ---------------------------------------- | -------------------------------------------------- |
| `requirementId`          | `string`                                 | ID del requerimiento a republicar.                 |
| `onClose`                | `() => any`                              | Función para cerrar el modal.                      |
| `type`                   | `RequirementType`                        | Tipo de requerimiento.                             |
| `useApiHook`             | `ReturnType<typeof useApi>`              | Hook para manejo de API.                           |
| `setAdditionalApiParams` | `(additionalParams: UseApiType) => void` | Configura parámetros adicionales para hook useApi. |
| `setApiParams`           | `(params: useApiParams) => void`         | Configura parámetros para soliciud HTTP.           |

##### RequirementOfferSummary

Componente modal que resume la información de una oferta y su ofertante.

_Props_

| Nombre  | Tipo    | Descripción                                    |
| ------- | ------- | ---------------------------------------------- |
| `offer` | `Offer` | Datos completos de la oferta.                  |
| `user`  | `User`  | Información del usuario que realizó la oferta. |

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

##### ValidateCode

Componente modal de flujo de validación por código para verificación de identidad o recuperación de contraseña.

_Props_

| Nombre              | Tipo                                   | Descripción                                          |
| ------------------- | -------------------------------------- | ---------------------------------------------------- |
| `isOpen?`           | `boolean`                              | Controla si el modal está abierto.                   |
| `onClose?`          | `(validationSuccess: boolean) => void` | Callback al cerrar el modal.                         |
| `isForgotPassword?` | `boolean`                              | Determina si es flujo de recuperación de contraseña. |

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

##### OfferDetailModal

###### OfferDetailModal

Componente modal para mostrar el detalle completo de una oferta, incluyendo información del producto, vendedor y estado.

_Props_

| Nombre          | Tipo                                  | Descripción                                  |
| --------------- | ------------------------------------- | -------------------------------------------- |
| `offer`         | `Offer`                               | Objeto con todos los datos de la oferta.     |
| `basicRateData` | `BasicRateData`                       | Datos básicos del creador del requerimiento. |
| `showActions`   | `boolean`                             | Controla si se muestran acciones.            |
| `orderData?`    | `{id: string, type: RequirementType}` | Datos de la orden de compra/venta asociada.  |

###### OfferDetailRequirementData

Componente que muestra los datos principales del requerimiento asociado a una oferta.

_Props_

| Nombre             | Tipo              | Descripción                                                  |
| ------------------ | ----------------- | ------------------------------------------------------------ |
| `requirementTitle` | `string`          | Título del requerimiento asociado.                           |
| `type`             | `RequirementType` | Tipo de requerimiento.                                       |
| `isOffer`          | `boolean`         | Indica si a quien se califica es creador de una oferta o no. |
| `basicRateData`    | `BasicRateData`   | Datos básicos del creador del requerimiento.                 |

##### RequirementDetail

###### RequirementDetail

Componente principal para visualización detallada de un requerimiento y sus ofertas asociadas.

_Props_

| Nombre                       | Tipo                          | Descripción                                                    |
| ---------------------------- | ----------------------------- | -------------------------------------------------------------- |
| `offerList`                  | `Offer[]`                     | Listado de ofertas asociadas al requerimiento.                 |
| `requirement`                | `Requirement`                 | Datos completos del requerimiento.                             |
| `forPurchaseOrder`           | `boolean`                     | Indica si el modal funciona como historial de orden de compra. |
| `filters?`                   | `OfferFilters`                | Filtros aplicados a las ofertas.                               |
| `orderId?`                   | `string`                      | ID de la orden de compra.                                      |
| `onClose`                    | `() => any`                   | Función para cerrar el modal.                                  |
| `setDataModalSelectOffer?`   | `(val: ModalContent) => void` | Maneja datos del modal de selección de oferta.                 |
| `setIsOpenModalSelectOffer?` | `(val: boolean) => void`      | Controla visibilidad del modal de selección de oferta.         |

###### RequirementInfo

Componente para mostrar información detallada de un requerimiento.

_Props_

| Nombre        | Tipo          | Descripción                                     |
| ------------- | ------------- | ----------------------------------------------- |
| `requirement` | `Requirement` | Datos completos del requerimiento.              |
| `forHome?`    | `boolean`     | Indica si es para vista en la página de inicio. |

###### RequirementInfoNoTags

Componente para mostrar información básica de un requerimiento.

_Props_

| Nombre         | Tipo              | Descripción                                     |
| -------------- | ----------------- | ----------------------------------------------- |
| `title`        | `string`          | Título principal del requerimiento.             |
| `user`         | `BaseUser`        | Datos del usuario principal.                    |
| `subUser?`     | `BaseUser`        | Datos del subusuario (si aplica).               |
| `type`         | `RequirementType` | Tipo de requerimiento.                          |
| `description?` | `string`          | Descripción del requerimiento.                  |
| `forHome?`     | `boolean`         | Indica si es para vista en la página de inicio. |

###### RequirementOfferFilters

Componente de filtros interactivos para ofertas de requerimientos.

_Props_

| Nombre              | Tipo           | Descripción                                       |
| ------------------- | -------------- | ------------------------------------------------- |
| `fromPurchaseOrder` | `boolean`      | Desactiva filtros cuando es para orden de compra. |
| `filters?`          | `OfferFilters` | Valores iniciales de los filtros.                 |

###### RequirementOfferList

Componente para listado y gestión de ofertas asociadas a un requerimiento, con paginación y filtrado.

_Props_

| Nombre                       | Tipo                          | Descripción                                  |
| ---------------------------- | ----------------------------- | -------------------------------------------- |
| `offers`                     | `Offer[]`                     | Listado completo de ofertas.                 |
| `requirement`                | `Requirement`                 | Requerimiento asociado.                      |
| `forPurchaseOrder`           | `boolean`                     | Indica si es para flujo de orden de compra.  |
| `onClose`                    | `() => any`                   | Función para cerrar el modal padre.          |
| `setDataModalSelectOffer?`   | `(val: ModalContent) => void` | Maneja datos del modal de selección.         |
| `setIsOpenModalSelectOffer?` | `(val: boolean) => void`      | Controla visibilidad del modal de selección. |
| `orderId?`                   | `string`                      | ID de orden de compra asociada.              |

###### RequirementOfferListItemHeader

Componente de encabezado para ítems de ofertas en requerimientos, con acciones contextuales y estados visuales. Cuando el modal funciona como historial para órdenes de compra/venta, no se muestran las acciones para las ofertas (como seleccionar, cancelar, etc.).

_Props_

| Nombre                       | Tipo                                                                   | Descripción                                            |
| ---------------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------ |
| `requirementId`              | `string`                                                               | ID del requerimiento asociado.                         |
| `requirementTitle`           | `string`                                                               | Título del requerimiento.                              |
| `offer`                      | `Offer`                                                                | Datos completos de la oferta.                          |
| `style?`                     | `React.CSSProperties`                                                  | Estilos adicionales para el contenedor.                |
| `onClose`                    | `() => any`                                                            | Función para cerrar modales padres.                    |
| `showActions`                | `{ forPurchaseOrder: false, ... }` o `{ forPurchaseOrder: true, ... }` | Configuración de acciones disponibles según contexto.  |
| `setDataModalSelectOffer?`   | `(val: ModalContent) => void`                                          | Maneja datos del modal de selección de oferta.         |
| `setIsOpenModalSelectOffer?` | `(val: boolean) => void`                                               | Controla visibilidad del modal de selección de oferta. |

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

##### TablePageContent

Componente contenedor para páginas con tablas. Incluye cabecera, buscador y tabla general.

_Props_

| Nombre                     | Tipo                          | Descripción                                |
| -------------------------- | ----------------------------- | ------------------------------------------ |
| `title`                    | `string`                      | Título principal de la página.             |
| `subtitle?`                | `string`                      | Subtítulo de la página.                    |
| `titleIcon`                | `ReactNode`                   | Icono para el título.                      |
| `subtitleIcon?`            | `ReactNode`                   | Icono para el subtítulo.                   |
| `table?`                   | `TableType`                   | Configuración y datos de la tabla.         |
| `onSearch?`                | `(e: ChangeEvent) => void`    | Callback para búsqueda.                    |
| `additionalContentHeader?` | `ReactNode`                   | Contenido adicional en la cabecera.        |
| `hideSearch?`              | `boolean`                     | Oculta el campo de búsqueda.               |
| `loading?`                 | `boolean`                     | Estado de carga para la tabla.             |
| `onChangePageAndPageSize?` | `OnChangePageAndPageSizeType` | Callback para paginación, filtros y orden. |
| `total?`                   | `number`                      | Total de registros para paginación.        |

_Ref_

| Nombre             | Tipo         | Descripción                  |
| ------------------ | ------------ | ---------------------------- |
| `resetSearchValue` | `() => void` | Limpia el valor de búsqueda. |

### Containers

#### AvatarContainer

Contenedor para mostrar avatares. Soporta todas las propiedades de Avatar de Ant Design.

#### ButtonContainer

Contenedor para botones. Soporta todas las propiedades de Button de Ant Design.

_Props_

| Nombre              | Tipo      | Descripción                                                                   |
| ------------------- | --------- | ----------------------------------------------------------------------------- |
| `upperCaseSmaller?` | `boolean` | Convierte texto a mayúsculas y reduce tamaño de fuente.                       |
| `common?`           | `boolean` | Si es true, usa elemento HTML button nativo en lugar de Button de Ant Design. |

#### DatePickerContainer

Contenedor para selector de fecha. Soporta todas las propiedades de DatePicker de Ant Design.

#### ImagePreviewGroupContainer

Contenedor para previsualización de grupos de imágenes.

_Props_

| Nombre  | Tipo                    | Descripción                                                          |
| ------- | ----------------------- | -------------------------------------------------------------------- |
| `image` | `string[] \| undefined` | Array de URLs de imágenes a mostrar en el grupo de previsualización. |

_Ref_

| Nombre        | Tipo         | Descripción                                    |
| ------------- | ------------ | ---------------------------------------------- |
| `openPreview` | `() => void` | Abre el modal de previsualización de imágenes. |

#### InputContainer

Contenedor para inputs con soporte para campos de contraseña. Soporta todas las propiedades de Input de Ant Design.

_Props_

| Nombre      | Tipo      | Descripción                                                    |
| ----------- | --------- | -------------------------------------------------------------- |
| `password?` | `boolean` | Si es true, renderiza un Input.Password (campo de contraseña). |

#### InputNumberContainer

Contenedor para ingreso de valores numéricos. Soporta todas las propiedades de InputNumber de Ant Design.

#### ModalContainer

Contenedor principal para modales. Usa `NoContentModalContainer`. Soporta solo los tipos definidos en `ModalTypes`.

_Props_

| Nombre            | Tipo           | Descripción                                                                      |
| ----------------- | -------------- | -------------------------------------------------------------------------------- |
| `content`         | `ModalContent` | Configuración del contenido y tipo de modal a mostrar.                           |
| `isOpen`          | `boolean`      | Controla la visibilidad del modal.                                               |
| `showFooter?`     | `boolean`      | Determina si se muestra el footer (barra de botones) del modal (default: false). |
| `className?`      | `string`       | Clases CSS adicionales.                                                          |
| `maskClosable?`   | `boolean`      | Permite cerrar el modal haciendo clic fuera (default: true).                     |
| `onClose`         | `function`     | Función que se ejecuta al cerrar el modal.                                       |
| `loadingConfirm?` | `boolean`      | Indica si el modal de confirmación está en estado de carga.                      |

#### NoContentModalContainer

Contenedor para modales con configuraciones predeterminadas. Soporta todas las propiedades de Modal de Ant Design.

_Props_

| Nombre            | Tipo       | Descripción                                                                  |
| ----------------- | ---------- | ---------------------------------------------------------------------------- |
| `showFooter?`     | `boolean`  | Si es true, muestra el footer (barra de botones) del modal (default: false). |
| `destroyOnClose?` | `boolean`  | Si es true, destruye el contenido al cerrar (default: true).                 |
| `closable?`       | `boolean`  | Muestra el botón de cerrar en la esquina (default: true).                    |
| `maskClosable?`   | `boolean`  | Permite cerrar haciendo clic fuera del modal (default: true).                |
| `onClose`         | `function` | Función que se ejecuta al cerrar el modal (requerido).                       |

#### OTPInputContainer

Contenedor para inputs de OTP (One-Time Password). Soporta todas las propiedades de Input.OTP de Ant Design.

#### ParagraphContainer

Contenedor para párrafos de texto. Soporta todas las propiedades de Paragraph de Ant Design.

#### RangeDatePickerContainer

Contenedor para selector de rangos de fecha. Soporta todas las propiedades de DatePicker.RangePicker de Ant Design.

#### RatingContainer

Componente para mostrar y capturar valoraciones con estrellas. Soporta todas las propiedades de Rate de Ant Design.

_Props_

| Nombre      | Tipo      | Descripción                                                             |
| ----------- | --------- | ----------------------------------------------------------------------- |
| `score`     | `number`  | Valoración actual.                                                      |
| `readOnly?` | `boolean` | Si es true, deshabilita la interacción (solo lectura) (default: false). |

#### SelectContainer

Contenedor para selector. Soporta todas las propiedades de Select de Ant Design.

#### TextAreaContainer

Contenedor para área de texto. Soporta todas las propiedades de TextArea de Ant Design.

### Guards

#### AuthRoleGuard

Componente que protege las rutas basado en roles de usuario. Si el usuario no tiene permisos, es redirigido a página de home.

_Props_

| Nombre         | Tipo                                                                       | Descripción                                            |
| -------------- | -------------------------------------------------------------------------- | ------------------------------------------------------ |
| `children`     | `ReactNode`                                                                | Contenido a renderizar si el usuario tiene permisos.   |
| `allowedRoles` | `Record<UserRoles, boolean> \| Record<string, Record<UserRoles, boolean>>` | Objeto que define los roles permitidos y sus permisos. |

### Section

#### Chat

##### ChatBody

###### ChatBody

Componente principal para visualizar y gestionar conversaciones de chat.

_Props_

| Nombre                        | Tipo                                          | Descripción                                         |
| ----------------------------- | --------------------------------------------- | --------------------------------------------------- |
| `chatData`                    | `BasicChatListData`                           | Datos básicos del chat (usuario, título, etc.).     |
| `messages`                    | `ChatMessage[]`                               | Lista de mensajes del chat.                         |
| `onCloseChat`                 | `() => void`                                  | Función para cerrar el chat.                        |
| `getMoreChatMessages`         | `(chatId: string) => void`                    | Función para cargar más mensajes (scroll infinito). |
| `hasMore`                     | `boolean`                                     | Indica si hay más mensajes por cargar.              |
| `loading`                     | `boolean \| undefined`                        | Estado de carga de los mensajes.                    |
| `addMessageToChatMessageList` | `(message: ChatMessage) => void`              | Añade un nuevo mensaje a la lista.                  |
| `updateMsg`                   | `(uid: string, message: ChatMessage) => void` | Actualiza un mensaje existente.                     |
| `markMsgAsError`              | `(messageId: string) => void`                 | Marca un mensaje como fallido.                      |

###### ChatBodyMessage

Componente para renderizar mensajes individuales en un chat.

_Props_

| Nombre       | Tipo          | Descripción                                                               |
| ------------ | ------------- | ------------------------------------------------------------------------- |
| `message`    | `ChatMessage` | Objeto con los datos del mensaje (contenido, imágenes, documentos, etc.). |
| `userImage?` | `string`      | URL de la imagen del usuario remitente.                                   |
| `userName?`  | `string`      | Nombre del usuario remitente.                                             |

###### ChatGallery

Componente para adjuntar y previsualizar imágenes/documentos en el chat.

_Props_

| Nombre      | Tipo         | Descripción                                                              |
| ----------- | ------------ | ------------------------------------------------------------------------ |
| `forImages` | `boolean`    | Determina si el componente es para imágenes (true) o documentos (false). |
| `onClose`   | `() => void` | Función para cerrar la galería.                                          |

##### ChatList

###### ChatList

Componente para mostrar la lista de chats con funcionalidades de búsqueda y filtrado.

_Props_

| Nombre                 | Tipo                                           | Descripción                                           |
| ---------------------- | ---------------------------------------------- | ----------------------------------------------------- |
| `chatList`             | `ChatListData[]`                               | Lista de chats a mostrar.                             |
| `onClickOnItem`        | `(item: ChatListData) => void`                 | Callback al seleccionar un chat.                      |
| `loadMoreChats`        | `(archived: boolean, chatId?: string) => void` | Función para cargar más chats (scroll infinito).      |
| `currentChat`          | `ChatListData \| null`                         | Chat actualmente seleccionado.                        |
| `hasMore`              | `boolean`                                      | Indica si hay más chats por cargar.                   |
| `loadingList`          | `boolean \| undefined`                         | Estado de carga de la lista principal.                |
| `loadingSearch`        | `boolean \| undefined`                         | Estado de carga durante búsquedas.                    |
| `showArchivedChats`    | `boolean`                                      | Controla si se muestran chats archivados.             |
| `setShowArchivedChats` | `(val: boolean) => void`                       | Función para alternar entre chats archivados/activos. |
| `handleSearch`         | `DebouncedFunc<(val: string) => void>`         | Función debounced para manejar búsquedas.             |
| `usingSearch`          | `boolean`                                      | Indica si se está realizando una búsqueda.            |
| `removeChatFromList`   | `(chatId: string) => void`                     | Elimina un chat de la lista.                          |
| `closeChat`            | `() => void`                                   | Cierra el chat actual.                                |
| `loadingAll`           | `boolean`                                      | Estado de carga general.                              |

###### ChatListItem

Componente para renderizar un elemento individual de la lista de chats.

_Props_

| Nombre               | Tipo                           | Descripción                                      |
| -------------------- | ------------------------------ | ------------------------------------------------ |
| `data`               | `ChatListData`                 | Datos del chat a mostrar.                        |
| `onClickOnItem`      | `(item: ChatListData) => void` | Callback al hacer clic en el item.               |
| `active?`            | `boolean`                      | Indica si el chat está actualmente seleccionado. |
| `removeChatFromList` | `(chatId: string) => void`     | Función para eliminar el chat de la lista.       |

#### Create-requirement

##### CreateRequirement

Componente de formulario para crear nuevos requerimientos.

_Props_

| Nombre                      | Tipo                                     | Descripción                                                      |
| --------------------------- | ---------------------------------------- | ---------------------------------------------------------------- |
| `closeModal`                | `() => void`                             | Función para cerrar el modal.                                    |
| `useApiHookImg`             | `ReturnType<typeof useApi>`              | Hook para manejar subida de imágenes.                            |
| `setApiParamsImg`           | `(params: useApiParams) => void`         | Configura parámetros de la solicitud HTTP para subir imágenes.   |
| `setAdditionalApiParamsImg` | `(additionalParams: UseApiType) => void` | Configura parámetros adicionales de hook para subir imágenes.    |
| `apiParamsImg`              | `useApiParams`                           | Parámetros actuales de solicitud HTTP para subir imágenes.       |
| `useApiHookDoc`             | `ReturnType<typeof useApi>`              | Hook para manejar subida de documentos.                          |
| `setApiParamsDoc`           | `(params: useApiParams) => void`         | Configura parámetros de la solicitud HTTP para subir documentos. |
| `setAdditionalApiParamsDoc` | `(additionalParams: UseApiType) => void` | Configura parámetros adicionales de hook para subir documentos.  |
| `apiParamsDoc`              | `useApiParams`                           | Parámetros actuales de solicitud HTTP para subir documentos.     |
| `setReqSuccess`             | `(val: ProcessFlag) => void`             | Actualiza estado de éxito para creación de requerimiento.        |
| `setDocSuccess`             | `(val: ProcessFlag) => void`             | Actualiza estado de éxito para subida de documentos.             |
| `setImgSuccess`             | `(val: ProcessFlag) => void`             | Actualiza estado de éxito para subida de imágenes.               |
| `setType`                   | `(val: RequirementType) => void`         | Actualiza el tipo de requerimiento.                              |

##### CreateRequirementFloatButton

Componente para mostrar una lista de botones flotantes. Además del botón para abrir formulario para crear requerimiento, se muestra condicionalmente botones para ir a home y a la sección de chat.

#### Footer

##### Footer

Componente que muestra footer de la aplicación.

#### Header

##### MainHeader

Componente principal de encabezado con gestión de modales.

_Props_

| Nombre        | Tipo                      | Descripción                                              |
| ------------- | ------------------------- | -------------------------------------------------------- |
| `onShowMenu?` | `(show: boolean) => void` | Callback para controlar la visibilidad del menú lateral. |

##### MainHeaderNoModals

Componente de encabezado con gestión de menú y renderizado de diferentes ítems, sin modales. Ejecuta diversas acciones al hacer click en los ítems.

_Props_

| Nombre              | Tipo                      | Descripción                                              |
| ------------------- | ------------------------- | -------------------------------------------------------- |
| `onShowMenu?`       | `(show: boolean) => void` | Callback para controlar la visibilidad del menú lateral. |
| `onOpenLoginModal?` | `() => void`              | Callback para abrir el modal de login/registro.          |

##### Items

###### Chat

Componente de ícono de chat con indicador de mensajes no leídos. Al hacer click en él, redirecciona a sección de chat.

_Props_

| Nombre         | Tipo      | Descripción                                                   |
| -------------- | --------- | ------------------------------------------------------------- |
| `forDropdown?` | `boolean` | Indica si el componente se usa dentro de un menú desplegable. |

###### ControlPanel

Componente de ícono de panel de control. Panel de control se refiere a alguna de las secciones en el menú lateral.

###### Logout

Componente de ícono para cerrar sesión.

###### Notification

Componente de notificaciones con scroll infinito y marcador de no leídas. Al hacer click en él, abre bandeja de notificaciones y permite marcar notificaciones como leídas al hacer click en ellas.

_Props_

| Nombre         | Tipo      | Descripción                                                      |
| -------------- | --------- | ---------------------------------------------------------------- |
| `forDropdown?` | `boolean` | Indica si el componente se usa en un menú desplegable.           |
| `includeText?` | `boolean` | Determina si se muestra el texto "notifications" junto al ícono. |

###### Premium

Componente que indica si el usuario tiene el estado Premium.

###### ProfileMenu

Componente de ícono de perfil de usuario.

###### UserName

Componente que muestra la imagen de perfil y nombre del usuario.

#### Home

##### Ads

Componente que muestra elementos de publicidad.

##### Search

Componente que muestra un buscador general usando keywords.

##### CompanyData

###### CompanyData

Componente para mostrar información de una empresa y el estado de la certificación del usuario con dicha empresa.

###### BasicCompanyData

Componente para mostrar información básica de una empresa con datos de contacto y valoraciones.

_Props_

| Nombre | Tipo       | Descripción                                       |
| ------ | ---------- | ------------------------------------------------- |
| `user` | `FullUser` | Objeto con la información completa de la empresa. |

###### CertificationData

Componente para manejar el estado de certificación del usuario con una empresa.

_Props_

| Nombre          | Tipo                 | Descripción                                                       |
| --------------- | -------------------- | ----------------------------------------------------------------- |
| `state`         | `CertificationState` | Estado actual de certificación.                                   |
| `user`          | `FullUser`           | Objeto con información de la empresa.                             |
| `onRequestSent` | `() => void`         | Callback que se ejecuta al enviar una solicitud de certificación. |

###### DetailedCompanyData

Componente para mostrar información detallada de una empresa incluyendo categorías, ubicación y otros datos.

_Props_

| Nombre | Tipo       | Descripción                                       |
| ------ | ---------- | ------------------------------------------------- |
| `user` | `FullUser` | Objeto con la información completa de la empresa. |

##### CompanyFilter

###### CompanyFilter

Componente para mostrar un filtro/buscador de empresas. Limpia la Id de de la empresa sleccionada al desmontarse.

###### SelectCompanyField

Componente de selección de empresas con búsqueda en tiempo real.

_Props_

| Nombre              | Tipo                   | Descripción                                                                 |
| ------------------- | ---------------------- | --------------------------------------------------------------------------- |
| `onCompanySelected` | `(id: string) => void` | Función que se ejecuta al seleccionar una empresa.                          |
| `forHomeFilter?`    | `boolean`              | Indica si el selector es para el formulario de filtros de la tabla en home. |

##### HomeTable

###### HomeTable

Componente contenedor para la tabla principal de la página de inicio con filtros.

_Props_

| Nombre                     | Tipo                          | Descripción                                  |
| -------------------------- | ----------------------------- | -------------------------------------------- |
| `loadingTable?`            | `boolean`                     | Indica si la tabla está cargando datos.      |
| `content`                  | `TableType`                   | Datos y configuración de la tabla.           |
| `onChangePageAndPageSize?` | `OnChangePageAndPageSizeType` | Callback para manejar cambios de paginación. |

###### HomeFilters

Componente del formulario de filtros aplicables a la tabla para la página de inicio. También incluye botones para cambiar el contenido de la tabla según el tipo de requerimiento.

###### HomeMainTable

Componente principal de tabla para la página de inicio, envuelto en contenedor estilizado.

_Props_

| Nombre                     | Tipo                          | Descripción                                  |
| -------------------------- | ----------------------------- | -------------------------------------------- |
| `loadingTable?`            | `boolean`                     | Indica si la tabla está cargando datos.      |
| `content`                  | `TableType`                   | Datos y configuración de la tabla.           |
| `onChangePageAndPageSize?` | `OnChangePageAndPageSizeType` | Callback para manejar cambios de paginación. |

#### ProductDetail

##### ProductDetailHeader

Componente de encabezado para páginas de detalle de requerimiento con breadcrumb de navegación.

_Props_

| Nombre     | Tipo                           | Descripción               |
| ---------- | ------------------------------ | ------------------------- |
| `reqTitle` | `string \| undefined`          | Título del requerimiento. |
| `type`     | `RequirementType \| undefined` | Tipo de requerimiento.    |

##### ProductRequirementDetail

###### ProductRequirementDetail

Component para mostrar datos de un requerimiento, creador del requerimiento, imágenes y documentos asociados al requerimiento y un formulario para ofertar.

_Props_

| Nombre        | Tipo                       | Descripción              |
| ------------- | -------------------------- | ------------------------ |
| `requirement` | `Requirement \| undefined` | Datos del requerimiento. |

###### BasicDataRequirement

Component para mostrar datos básicos de un requerimiento.

_Props_

| Nombre        | Tipo                       | Descripción              |
| ------------- | -------------------------- | ------------------------ |
| `requirement` | `Requirement \| undefined` | Datos del requerimiento. |

###### MoreDetailedRequirement

Component para mostrar datos más detallados de un requerimiento.

_Props_

| Nombre        | Tipo                       | Descripción              |
| ------------- | -------------------------- | ------------------------ |
| `requirement` | `Requirement \| undefined` | Datos del requerimiento. |

###### RequirementDescription

Component para mostrar descripción de un requerimiento.

_Props_

| Nombre        | Tipo                  | Descripción                    |
| ------------- | --------------------- | ------------------------------ |
| `description` | `string \| undefined` | Descripción del requerimiento. |

###### RequirementFilesAndImages

Componente para visualización de archivos e imágenes asociados a un requerimiento.

_Props_

| Nombre   | Tipo                    | Descripción                  |
| -------- | ----------------------- | ---------------------------- |
| `images` | `string[] \| undefined` | Array de URLs de imágenes.   |
| `docs`   | `string[] \| undefined` | Array de URLs de documentos. |

###### UserDataRequirement

Componente para mostrar información detallada del usuario asociado a un requerimiento.

_Props_

| Nombre        | Tipo          | Descripción                             |
| ------------- | ------------- | --------------------------------------- |
| `user`        | `BaseUser`    | Datos principales del usuario.          |
| `requirement` | `Requirement` | Información del requerimiento asociado. |
| `subUser?`    | `BaseUser`    | Datos del subusuario.                   |

###### OfferForm

Component de formulario para ofertar. Verifica si el usuario puede ofertar al requerimiento. Si la respuesta es positiva, se muestra el formulario. De lo contrario, muestra el componente `CantOfferMessage`.

_Props_

| Nombre        | Tipo                       | Descripción              |
| ------------- | -------------------------- | ------------------------ |
| `requirement` | `Requirement \| undefined` | Datos del requerimiento. |

###### CantOfferMessage

Componente que muestra mensajes y acciones cuando un usuario no puede realizar una oferta.

_Props_

| Nombre                            | Tipo                                  | Descripción                                         |
| --------------------------------- | ------------------------------------- | --------------------------------------------------- |
| `offerId`                         | `string`                              | ID de la oferta existente (si aplica).              |
| `motive`                          | `CantOfferMotives`                    | Razón por la que no se puede ofertar.               |
| `requirement`                     | `Requirement \| undefined`            | Datos del requerimiento relacionado.                |
| `isPremium?`                      | `boolean`                             | Indica si el usuario es premium.                    |
| `isCertified?`                    | `CertificationState`                  | Estado de certificación del usuario.                |
| `loading?`                        | `boolean`                             | Estado de carga del componente.                     |
| `onDeleteSuccess`                 | `() => void`                          | Callback al eliminar una oferta exitosamente.       |
| `onSentDocsToGetCertifiedSuccess` | `() => void`                          | Callback al enviar documentos para certificación.   |
| `setIsCertified`                  | `(state: CertificationState) => void` | Función para actualizar el estado de certificación. |

#### Sidebar

##### Sidebar

Menú principal de la aplicación. Muestra secciones y subsecciones de acuerdo al rol del usuario.

_Props_

| Nombre           | Tipo                      | Descripción                              |
| ---------------- | ------------------------- | ---------------------------------------- |
| `showMenu`       | `boolean`                 | Indica si el menú es visible.            |
| `changeShowMenu` | `(show: boolean) => void` | Callback al cambiar visibilidad de menú. |

#### Users

##### AddUserModal

Modal para creación y edición de subusuarios con validación de datos y múltiples flujos. Permite crear y editar subusuarios, y cambiar sus contraseñas y roles. Los documentos de identidad son validados con la RENIEC.

_Props_

| Nombre      | Tipo             | Descripción                                             |
| ----------- | ---------------- | ------------------------------------------------------- |
| `onClose`   | `() => void`     | Función para cerrar el modal.                           |
| `edit`      | `boolean`        | Modo edición (true) o creación (false).                 |
| `userData?` | `SubUserProfile` | Datos del usuario a editar (requerido en modo edición). |

##### SubUserTableModal

Componente modal para visualización de tablas de subusuarios con múltiples tipos de contenido y acciones.

_Props_

| Nombre                     | Tipo                                                 | Descripción                                 |
| -------------------------- | ---------------------------------------------------- | ------------------------------------------- |
| `user`                     | `SubUserBase \| null`                                | Datos del subusuario.                       |
| `content`                  | Varios tipos según `tableType`                       | Contenido específico de cada tipo de tabla. |
| `onTabChange`              | `(tabId: RequirementType \| OrderTableType) => void` | Callback para cambio de pestaña.            |
| `loading`                  | `boolean \| undefined`                               | Estado de carga.                            |
| `tableType`                | `TableTypes`                                         | Tipo de tabla a mostrar.                    |
| `onChangePageAndPageSize?` | `OnChangePageAndPageSizeType`                        | Callback para paginación.                   |
| `currentPage`              | `number`                                             | Página actual.                              |
| `currentPageSize`          | `number`                                             | Tamaño de página actual.                    |
| `fieldSort?`               | `FieldSort \| undefined`                             | Configuración de ordenamiento de tabla.     |
| `filteredInfo?`            | `Filters \| undefined`                               | Filtros aplicados a la tabla.               |

## Contexts

### HomeContext

Contexto global para manejar el estado y las operaciones relacionadas con la página principal (home) y la tabla que contiene.

- La tabla contiene un formulario para realizar búsquedas usando filtros y palabras clave.
- Maneja cola de actualizaciones de requerimientos en tiempo real.
- Permite hacer un filtrado por rubros directamente desde notificación.
- Actualiza interfaz con datos de empresa seleccionada en filtro especial para empresas.

| Nombre                           | Tipo                                                                           | Descripción                                                            |
| -------------------------------- | ------------------------------------------------------------------------------ | ---------------------------------------------------------------------- |
| **Propiedades**                  |
| `type`                           | `RequirementType`                                                              | Tipo de requerimiento activo en la tabla.                              |
| `userId`                         | `string`                                                                       | ID del usuario/empresa para filtrado, seleccionado en `CompanyFilter`. |
| `useFilter`                      | `boolean \| null`                                                              | Estado de uso de los filtros de la tabla (null=sin aplicar).           |
| `requirementList`                | `Requirement[]`                                                                | Lista actual de requerimientos.                                        |
| `totalRequirementList`           | `number`                                                                       | Total de requerimientos disponibles.                                   |
| `loadingRequirementList?`        | `boolean`                                                                      | Estado de carga de requerimientos.                                     |
| `page`                           | `number`                                                                       | Página actual de resultados de tabla.                                  |
| `keywordSearch`                  | `string`                                                                       | Término de búsqueda textual.                                           |
| `notificationSearchData`         | `NotificationSearchData` (`{categoryId: number, targetType: RequirementType}`) | Datos para búsqueda desde notificaciones.                              |
| **Métodos**                      |
| `updateType`                     | `(val: RequirementType) => void`                                               | Cambia el tipo de requerimiento activo.                                |
| `updateUserId`                   | `(id: string) => void`                                                         | Actualiza el ID de usuario para filtrado.                              |
| `updateUseFilter`                | `(val: boolean) => void`                                                       | Habilita/deshabilita el uso de filtros.                                |
| `updatePage`                     | `(val: number) => void`                                                        | Cambia la página actual.                                               |
| `retrieveRequirements`           | `(page: number, pageSize?: number, params?: HomeFilterRequest) => void`        | Obtiene requerimientos con paginación y filtros.                       |
| `updateChangesQueue`             | `(payload: SocketResponse, canAddRowUpdate: boolean) => void`                  | Maneja actualizaciones en tiempo real desde sockets.                   |
| `resetChangesQueue`              | `() => void`                                                                   | Limpia la cola de cambios pendientes.                                  |
| `retrieveLastSearchRequeriments` | `() => void`                                                                   | Repite la última búsqueda realizada.                                   |
| `updateKeywordSearch`            | `(val: string) => void`                                                        | Actualiza el término de búsqueda textual.                              |
| `updateNotificationSearchData`   | `(data: NotificationSearchData) => void`                                       | Configura búsqueda desde notificación.                                 |
| `resetNotificationSearchData`    | `() => void`                                                                   | Restablece los datos de búsqueda por notificación.                     |

### ListsContext

Contexto para cargar datos generales para los formularios y componentes de la aplicación. Incluye la funcionalidad para censurar palabras dada una lista local de palabras prohibidas.

| Nombre              | Tipo                       | Descripción                                           |
| ------------------- | -------------------------- | ----------------------------------------------------- |
| **Propiedades**     |
| `countryList`       | `IdValueObj[]`             | Lista de países.                                      |
| `countryData`       | `CountryCities`            | Datos de países con sus ciudades.                     |
| `tlds`              | `string[]`                 | Lista de dominios de nivel superior (ej: .com, .net). |
| `categoryData`      | `IdValueMap`               | Categorías disponibles.                               |
| `currencyData`      | `IdValueAliasMap`          | Monedas con alias.                                    |
| `paymentMethodData` | `IdValueMap`               | Métodos de pago.                                      |
| `deliveryTimeData`  | `IdValueMap`               | Tiempos de entrega.                                   |
| `whoCanOfferData`   | `IdValueMap`               | Roles que pueden ofertar.                             |
| `planTypeData`      | `PlanData[]`               | Lista de planes disponibles con detalles completos.   |
| `userRolesData`     | `IdValueMap`               | Roles de usuario disponibles.                         |
| `defaultPlanId`     | `string`                   | ID del plan por defecto.                              |
| **Métodos**         |
| `censorText`        | `(text: string) => string` | Filtra palabras prohibidas en textos.                 |

### LoadingDataContext

Contexto para manejar estados de carga de diversas acciones en la aplicación. Cuando un estado de carga es `true`, otras acciones del mismo tipo son deshabilitadas en la interfaz.

| Propiedad/Método                             | Tipo                       | Descripción                                                                                         |
| -------------------------------------------- | -------------------------- | --------------------------------------------------------------------------------------------------- |
| **Estados de Carga PDF**                     |
| `myPurchaseOrdersLoadingPdf`                 | `boolean`                  | Estado de carga para generación de PDF de orden en tabla Mis órdenes de compra/venta.               |
| `subUserPurchaseOrdersLoadingPdf`            | `boolean`                  | Estado de carga para generación de PDF de orden en tabla de órdenes de compra/venta de subusuarios. |
| `allPurchaseOrdersLoadingPdf`                | `boolean`                  | Estado de carga para generación de PDF de orden en tabla de todas las órdenes de compra.            |
| `allSalesOrdersLoadingPdf`                   | `boolean`                  | Estado de carga para generación de PDF de orden en tabla de todas las órdenes de venta.             |
| `updateMyPurchaseOrdersLoadingPdf(val)`      | `(boolean) => void`        | Actualiza estado de carga correspondiente.                                                          |
| `updateSubUserPurchaseOrdersLoadingPdf(val)` | `(boolean) => void`        | Actualiza estado de carga correspondiente.                                                          |
| `updateAllPurchaseOrdersLoadingPdf(val)`     | `(boolean) => void`        | Actualiza estado de carga correspondiente.                                                          |
| `updateAllSalesOrdersLoadingPdf(val)`        | `(boolean) => void`        | Actualiza estado de carga correspondiente.                                                          |
| **Estados Ver Ofertas**                      |
| `myRequirementsLoadingViewOffers`            | `boolean`                  | Estado de carga para ver ofertas de requerimiento en tabla de Mis requerimientos.                   |
| `subUserRequirementsViewOffers`              | `boolean`                  | Estado de carga para ver ofertas de requerimiento en tabla de subusuarios.                          |
| `allPurchaseOrdersViewOffers`                | `boolean`                  | Estado de carga para ver ofertas de requerimiento en tabla de todas las órdenes de compra.          |
| `allSalesOrdersViewOffers`                   | `boolean`                  | Estado de carga para ver ofertas de requerimientos en tabla de todas las órdenes de venta.          |
| `updateMyRequirementsLoadingViewOffers(val)` | `(boolean) => void`        | Actualiza estado de carga correspondiente.                                                          |
| `updateSubUserRequirementsViewOffers(val)`   | `(boolean) => void`        | Actualiza estado de carga correspondiente.                                                          |
| `updateAllPurchaseOrdersViewOffers(val)`     | `(boolean) => void`        | Actualiza estado de carga correspondiente.                                                          |
| `updateAllSalesOrdersViewOffers(val)`        | `(boolean) => void`        | Actualiza estado de carga correspondiente.                                                          |
| **Otros Estados y Métodos**                  |
| `createRequirementLoading`                   | `boolean`                  | Estado de carga para creación de requerimiento.                                                     |
| `changeCertificationStateLoading`            | `boolean`                  | Estado de carga para cambio de estado de certificación.                                             |
| `idAndActionQueue`                           | `Record<string, Action>`   | Cola de acciones para desactivar otras acciones de fila en tablas.                                  |
| `updateCreateRequirementLoading(val)`        | `(boolean) => void`        | Actualiza estado de creación de requerimiento.                                                      |
| `updateChangeCertificationStateLoading(val)` | `(boolean) => void`        | Actualiza estado de carga de cambio de certificación.                                               |
| `updateIdAndActionQueue(id, action)`         | `(string, Action) => void` | Añade acción a la cola usando ID de fila y acción.                                                  |
| `deleteFromIdAndActionQueue(id)`             | `(string) => void`         | Elimina acción de la cola usando ID.                                                                |

### MainSocketsContext

Contexto que administra sockets principales y acciones al iniciar/cerrar sesión.

- Conecta/desconecta sockets cuando el usuario inicia/cierra sesión.
- Obtiene datos iniciales de notificaciones y mensajes de chat no leídos.
- Redirige a home y actualiza tiempos de expiración de tokens al cerrar sesión.
- Carga datos de usuario en pestaña cuando usuario ha iniciado sesión en otra pestaña.

Los propiedades/métodos que maneja son la unión de los de `useUserSocket`, `useTCNotification` y `useChatSocket`.

### ModalsContext

Contexto para almacenar datos de acciones pendientes. Usado principalmente para ejecutar acciones después de hacer click en una notificación.

| Nombre                               | Tipo                                              | Descripción                                                           |
| ------------------------------------ | ------------------------------------------------- | --------------------------------------------------------------------- |
| **Propiedades**                      |
| `detailedRequirementModalData`       | `DetailedRequirementModalDataType`                | Almacena datos para mostrar un modal detallado de requisito           |
| `detailedOfferModalData`             | `DetailedOfferModalDataType`                      | Almacena datos para mostrar un modal detallado de oferta              |
| `viewHistoryModalData`               | `ViewHistoryModalDataType`                        | Almacena datos para mostrar historial de órden de compra              |
| `viewHistorySalesModalData`          | `ViewHistoryModalDataType`                        | Almacena datos para mostrar historial de orden de venta               |
| `downloadPdfOrderData`               | `DownloadPdfOrderType`                            | Almacena datos necesarios para descargar PDF de orden de compra/venta |
| `viewCertificationData`              | `ViewCertificationDataType`                       | Almacena datos para mostrar detalles de solicitud de certificación    |
| **Métodos**                          |
| `updateDetailedRequirementModalData` | `(val: DetailedRequirementModalDataType) => void` | Actualiza variable correspondiente                                    |
| `updateDetailedOfferModalData`       | `(val: DetailedOfferModalDataType) => void`       | Actualiza variable correspondiente                                    |
| `updateViewHistoryModalData`         | `(val: ViewHistoryModalDataType) => void`         | Actualiza variable correspondiente                                    |
| `updateViewHistorySalesModalData`    | `(val: ViewHistoryModalDataType) => void`         | Actualiza variable correspondiente                                    |
| `updateDownloadPdfOrderData`         | `(val: DownloadPdfOrderType) => void`             | Actualiza variable correspondiente                                    |
| `updateViewCertificationData`        | `(val: ViewCertificationDataType) => void`        | Actualiza variable correspondiente                                    |
| `resetDetailedRequirementModalData`  | `() => void`                                      | Reinicia datos de variable correspondiente                            |
| `resetDetailedOfferModalData`        | `() => void`                                      | Reinicia datos de variable correspondiente                            |
| `resetViewHistoryModalData`          | `() => void`                                      | Reinicia datos de variable correspondiente                            |
| `resetViewHistorySalesModalData`     | `() => void`                                      | Reinicia datos de variable correspondiente                            |
| `resetDownloadPdfOrderData`          | `() => void`                                      | Reinicia datos de variable correspondiente                            |
| `resetViewCertificationData`         | `() => void`                                      | Reinicia datos de variable correspondiente                            |
