# TCompra frontend

## Components

### Common

#### RequirementsTable

Tabla para mostrar datos de requerimientos de diferentes tipos, incluyendo liquidaciones.

_Props_

| Nombre        | Tipo                                          | Descripción                                                                  |
| ------------- | --------------------------------------------- | ---------------------------------------------------------------------------- |
| type          | `RequirementType`                             | Tipo de requisito (`GOOD`, `SERVICE`, `SALE`, etc.).                         |
| data          | `Requirement[]`                               | Arreglo de datos para mostrar en la tabla.                                   |
| onButtonClick | `(action: Action, data: Requirement) => void` | Función de callback llamada al hacer clic en un botón de acción en la tabla. |
| hiddenColumns | `TableColumns[]`                              | Columnas de la tabla que se deben ocultar.                                   |

##### columns

###### ActionColumn

Genera una columna de acciones para una tabla, permitiendo realizar acciones basadas en el estado del elemento de la tabla.

_Parámetros_

| Nombre        | Tipo                                          | Descripción                                                                      |
| ------------- | --------------------------------------------- | -------------------------------------------------------------------------------- |
| onButtonClick | `(action: Action, data: Requirement) => void` | Función de callback llamada al hacer clic en una opción de la lista desplegable. |
| hidden        | `boolean`                                     | Indicador de si la columna debe estar oculta (por defecto es `false`).           |

###### CategoryColumn

Genera una columna que muestra el rubro de los elementos en una tabla.

_Parámetros_

| Nombre | Tipo      | Descripción                                                            |
| ------ | --------- | ---------------------------------------------------------------------- |
| hidden | `boolean` | Indicador de si la columna debe estar oculta (por defecto es `false`). |

###### DateColumn

Genera una columna que muestra la fecha de los elementos en una tabla.

_Parámetros_

| Nombre | Tipo      | Descripción                                                            |
| ------ | --------- | ---------------------------------------------------------------------- |
| hidden | `boolean` | Indicador de si la columna debe estar oculta (por defecto es `false`). |

###### ImageColumn

Genera una columna que muestra una imagen de los elementos en una tabla.

_Parámetros_

| Nombre | Tipo      | Descripción                                                            |
| ------ | --------- | ---------------------------------------------------------------------- |
| hidden | `boolean` | Indicador de si la columna debe estar oculta (por defecto es `false`). |

###### LocationColumn

Genera una columna que muestra la ubicación o departamento de los elementos en una tabla.

_Parámetros_

| Nombre | Tipo      | Descripción                                                            |
| ------ | --------- | ---------------------------------------------------------------------- |
| hidden | `boolean` | Indicador de si la columna debe estar oculta (por defecto es `false`). |

###### NameColumn

Genera una columna que muestra el nombre y el rubro de los elementos en una tabla.

_Parámetros_

| Nombre | Tipo      | Descripción                                                            |
| ------ | --------- | ---------------------------------------------------------------------- |
| hidden | `boolean` | Indicador de si la columna debe estar oculta (por defecto es `false`). |

###### OffersColumn

Genera una columna que muestra el número de ofertas y un botón que abre un modal que muestra la lista de ofertas.

_Parámetros_

| Nombre        | Tipo                                          | Descripción                                                            |
| ------------- | --------------------------------------------- | ---------------------------------------------------------------------- |
| onButtonClick | `(action: Action, data: Requirement) => void` | Función de callback llamada al hacer clic en el botón de ofertas.      |
| hidden        | `boolean`                                     | Indicador de si la columna debe estar oculta (por defecto es `false`). |

###### PriceColumn

Genera una columna que muestra el precio de cotización de los elementos en una tabla.

_Parámetros_

| Nombre | Tipo      | Descripción                                                            |
| ------ | --------- | ---------------------------------------------------------------------- |
| hidden | `boolean` | Indicador de si la columna debe estar oculta (por defecto es `false`). |

###### StateColumn

Genera una columna que muestra el estado de los elementos en una tabla.

_Parámetros_

| Nombre | Tipo      | Descripción                                                            |
| ------ | --------- | ---------------------------------------------------------------------- |
| hidden | `boolean` | Indicador de si la columna debe estar oculta (por defecto es `false`). |

#### CancelPurchaseOrderModal

Un componente modal para cancelar una orden de compra, solicitando al usuario que indique el motivo de la cancelación.

_Props_

| Nombre        | Tipo                                         | Descripción                                     |
| ------------- | -------------------------------------------- | ----------------------------------------------- |
| onClose       | `(e: SyntheticEvent<Element, Event>) => any` | Función de callback llamada al cerrar el modal. |
| offerId       | `string`                                     | ID de la oferta que se está cancelando.         |
| requirementId | `string`                                     | ID del requerimiento asociado a la oferta.      |

#### ConfirmationModal

Un componente modal que solicita una confirmación al usuario.

_Props_

| Nombre   | Tipo                                               | Descripción                                                                                            |
| -------- | -------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| text     | `string`                                           | Texto que se muestra en el modal.                                                                      |
| icon     | `React.ReactNode`                                  | Ícono opcional que se muestra en el modal.                                                             |
| onClose  | `(e: React.SyntheticEvent<Element, Event>) => any` | Función de callback llamada al cerrar el modal.                                                        |
| onAnswer | `(ok: boolean) => any`                             | Función de callback llamada con la respuesta del usuario (`true` para aceptar, `false` para cancelar). |

#### RatingCanceledModal

Un componente modal que permite calificar a un usuario que ha cancelado una oferta o requerimiento.

_Props_

| Nombre                | Tipo                                               | Descripción                                                          |
| --------------------- | -------------------------------------------------- | -------------------------------------------------------------------- |
| user                  | `User`                                             | Información del usuario que está siendo calificado.                  |
| requirementOfferTitle | `string`                                           | Título de la oferta o requerimiento relacionado.                     |
| type                  | `RequirementType`                                  | Tipo de requerimiento (`GOOD`, `SERVICE`, `SALE`, etc.).             |
| isOffer               | `boolean`                                          | Indicador de si es una oferta (`true`) o un requerimiento (`false`). |
| onClose               | `(e: React.SyntheticEvent<Element, Event>) => any` | Función de callback llamada al cerrar el modal.                      |

#### RatingModal

Un componente modal que permite calificar a un usuario, con preguntas sobre la comunicación y otros aspectos relevantes.

_Props_

| Nombre                | Tipo                                               | Descripción                                                          |
| --------------------- | -------------------------------------------------- | -------------------------------------------------------------------- |
| user                  | `User`                                             | Información del usuario que está siendo calificado.                  |
| requirementOfferTitle | `string`                                           | Título de la oferta o requerimiento relacionado.                     |
| type                  | `RequirementType`                                  | Tipo de requerimiento (`GOOD`, `SERVICE`, `SALE`, etc.).             |
| isOffer               | `boolean`                                          | Indicador de si es una oferta (`true`) o un requerimiento (`false`). |
| onClose               | `(e: React.SyntheticEvent<Element, Event>) => any` | Función de callback llamada al cerrar el modal.                      |

### Containers

#### AvatarContainer

Contenedor de Avatar de Antd.

_Props_

| Nombre | Tipo | Descripción |
| ------ | ---- | ----------- |

#### ButtonContainer

Contenedor de Button de Antd.

_Props_

| Nombre           | Tipo        | Descripción                                                                                               |
| ---------------- | ----------- | --------------------------------------------------------------------------------------------------------- |
| text             | `ReactNode` | El texto que se mostrará en el botón.                                                                     |
| upperCaseSmaller | `boolean`   | (Opcional) Indica si el texto del botón debe estar en mayúsculas y tener un tamaño de fuente más pequeño. |

#### DatePickerContainer

Contenedor de DatePicker de Antd.
_Props_

| Nombre | Tipo | Descripción |
| ------ | ---- | ----------- |

#### DotContainer

Contenedor para mostrar un punto que funciona como separador entre palabras.

_Props_

| Nombre      | Tipo      | Descripción                                                     |
| ----------- | --------- | --------------------------------------------------------------- |
| fontSize    | `number`  | (Opcional) Tamaño de la fuente del ícono.                       |
| color       | `string`  | (Opcional) Color del ícono.                                     |
| marginLeft  | `boolean` | (Opcional) Indica si se debe agregar margen izquierdo al ícono. |
| marginRight | `boolean` | (Opcional) Indica si se debe agregar margen derecho al ícono.   |

#### ImageContainer

Contanedor para mostrar una imagen.

_Props_

| Nombre | Tipo                  | Descripción                                        |
| ------ | --------------------- | -------------------------------------------------- |
| alt    | `string`              | Texto alternativo para la imagen (atributo `alt`). |
| src    | `string`              | URL de la fuente de la imagen (atributo `src`).    |
| style  | `React.CSSProperties` | (Opcional) Estilos CSS para aplicar a la imagen.   |

#### InputContainer

Contenedor de Input de Antd.

_Props_

| Nombre       | Tipo                  | Descripción                                                             |
| ------------ | --------------------- | ----------------------------------------------------------------------- |
| style        | `React.CSSProperties` | (Opcional) Estilos CSS para aplicar al input.                           |
| defaultValue | `string`              | (Opcional) Valor predeterminado para el input.                          |
| otp          | `boolean`             | (Opcional) Indica si se trata de un input para OTP (One-Time Password). |
| length       | `number`              | (Opcional) Longitud esperada del input para OTP.                        |
| prefix       | `React.ReactNode`     | (Opcional) Prefijo para el input. Puede ser un nodo React.              |

#### ModalContainer

Contenedor de Modal de Antd.

_Props_

| Nombre       | Tipo         | Descripción                                                              |
| ------------ | ------------ | ------------------------------------------------------------------------ |
| type         | `ModalTypes` | Tipo de modal que determina el contenido a mostrar.                      |
| data         | `any`        | Datos necesarios para el contenido del modal.                            |
| isOpen       | `boolean`    | Indica si el modal está abierto o cerrado.                               |
| showFooter   | `boolean`    | (Opcional) Indica si se muestra el footer del modal.                     |
| className    | `string`     | (Opcional) Clase CSS adicional para el modal.                            |
| maskClosable | `boolean`    | (Opcional) Indica si se puede cerrar el modal haciendo clic fuera de él. |

#### ParagraphContainer

Contenedor de Paragraph de Antd.

_Props_

| Nombre     | Tipo              | Descripción                                                                  |
| ---------- | ----------------- | ---------------------------------------------------------------------------- |
| text       | `string`          | Texto que se mostrará dentro del párrafo.                                    |
| rows       | `number`          | Número de filas antes de aplicar el truncamiento (`ellipsis`).               |
| expandable | `boolean`         | (Opcional) Indica si el párrafo es expandible cuando se aplica truncamiento. |
| symbol     | `React.ReactNode` | (Opcional) Símbolo adicional a mostrar cuando el párrafo es truncado.        |

#### PriceContainer

Contenedor para mostrar el valor de cotización y su moneda usando un formato específico.

_Props_

| Nombre | Tipo     | Descripción                         |
| ------ | -------- | ----------------------------------- |
| price  | `number` | El precio a mostrar.                |
| coin   | `string` | La moneda utilizada para el precio. |

#### RateModalTitleContainer

Contenedor para el título del modal para calificar a tu cliente o proveedor.

_Props_

| Nombre  | Tipo              | Descripción                                                        |
| ------- | ----------------- | ------------------------------------------------------------------ |
| isOffer | `boolean`         | Indica si se está calificando a la persona/empresa por una oferta. |
| type    | `RequirementType` | Tipo de requerimiento.                                             |

#### RatingContainer

Contenedor para Rate de Antd.

_Props_

| Nombre   | Tipo      | Descripción                                              |
| -------- | --------- | -------------------------------------------------------- |
| score    | `number`  | El puntaje inicial para la calificación.                 |
| readOnly | `boolean` | (Opcional) Indica si la calificación es de solo lectura. |

### SelectContainer

Contenedor para Select de Antd.

_Props_

| Nombre | Tipo | Descripción |
| ------ | ---- | ----------- |

### TagContainer

Contenedor para Tag de Antd. Muestra el tag con un formato específico si isRequirementTag es `true`.

_Props_

| Nombre             | Tipo              | Descripción                                                                                                |
| ------------------ | ----------------- | ---------------------------------------------------------------------------------------------------------- |
| isRequirementTag   | `boolean`         | (Opcional) Indica si es una etiqueta de requerimiento.                                                     |
| type               | `RequirementType` | (Opcional) Tipo de requisito (`GOOD`, `SERVICE`, `SALE`, etc.). Requerido si `isRequirementTag` es `true`. |
| text               | `React.ReactNode` | (Opcional) Texto a mostrar en la etiqueta.                                                                 |
| label              | `string`          | (Opcional) Etiqueta adicional antes del texto.                                                             |
| includeMarginRight | `boolean`         | (Opcional) Indica si se debe incluir un margen derecho en el estilo de la etiqueta.                        |
| truncateText       | `boolean`         | (Opcional) Indica si se debe truncar el texto si es demasiado largo.                                       |

### TextAreaContainer

Contenedor de TextArea de Antd.

_Props_

| Nombre | Tipo | Descripción |
| ------ | ---- | ----------- |

### Section

#### Header

Muestra la imagen y nombre del usuario, su tipo (si es Premium), así como íconos y otras opciones dependiendo de la ruta actual.

##### Items

###### Chat

Muestra el ícono de chat y redirecciona a dicha página.

<!-- ###### Logo

Muestra el logo de TCompra y redirecciona a home. -->

###### Logout

Muestra la opción de Salir para cerrar sesión y redirigir a home.

###### Notification

Muestra el ícono de notificación y despliega la lista de notificaciones.

###### Premium

Muestra el label de Premium si el usuario es de ese tipo.

###### ProfileMenu

Muestra la opción para ver el perfil del usuario.

###### UserName

Muestra la imagen de perfil y el nombre de usuario.

#### Login

##### Dni

Permite cambiar el tipo de documento entre DNI y RUC, y muestra un input para ingresar el número de documento. `onChangeTypeDoc` es una función que cambia las reglas de validación y el placeholder del input según el tipo de documento seleccionado.

_Props_

| Nombre          | Tipo                     | Descripción                                                     |
| --------------- | ------------------------ | --------------------------------------------------------------- |
| onChangeTypeDoc | `(type: string) => void` | Función de callback llamada cuando cambia el tipo de documento. |

##### Email

Input para ingresar un correo electrónico. Con el fin de que la validación en frontend sea igual a la validación en backend, se ha definido un validador que toma el último segmento del dominio del email y lo busca en una lista de dominios de nivel superior. Si no se encuentra, se muestra un error de validación. De lo contrario, o si la lista está vacía, pasa la validación.

_Props_

| Nombre | Tipo       | Descripción                                                                                                  |
| ------ | ---------- | ------------------------------------------------------------------------------------------------------------ |
| tlds   | `string[]` | Lista de dominios de nivel superior (TLDs) permitidos para la validación del dominio del correo electrónico. |

##### Password

Input para ingresar una contraseña.

#### Profile

##### ValidateCode

Muestra el email al que se envió el código de validación y permite la validación del código a través de un input OTP. También permite reenviar el código con un timeout de 60s. Si la validación fue exitosa, muestra un mensaje indicando que su cuenta fue validada. Si hubo algún error, muestra una notificación.

_Props_

| Nombre  | Tipo                                   | Descripción                                                                                                |
| ------- | -------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| isOpen  | `boolean`                              | Indica si el modal está abierto o cerrado.                                                                 |
| onClose | `(validationSuccess: boolean) => void` | Función de callback llamada cuando se cierra el modal, proporcionando el estado de éxito de la validación. |
| email   | `string`                               | Dirección de correo electrónico al que se enviará el código de validación.                                 |

#### Requirements

##### RequirementDetail

######

##### RequirementOfferSummary

## Hooks

### useGet

Hook que retorna una promesa con la respuesta de solicitudes _get_.

_Parámetros_

| Nombre           | Tipo                        | Descripción                                                                               |
| ---------------- | --------------------------- | ----------------------------------------------------------------------------------------- |
| CallbackFunction | `() => Promise<HttpObject>` | Función de callback que debe devolver una promesa que resuelva en un objeto `HttpObject`. |

### usePost

Hook que retorna una promesa con la respuesta de solicitudes _post_, donde los datos a ser enviado deben ser de tipo T.

_Parámetros_

| Nombre           | Tipo                               | Descripción                                                                                                                  |
| ---------------- | ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| CallbackFunction | `(data: T) => Promise<HttpObject>` | Función de callback que debe aceptar un parámetro de tipo `T` y devolver una promesa que resuelva en un objeto `HttpObject`. |
| dataToSend       | `T`                                | Datos de tipo `T` que se enviarán como parámetro a `CallbackFunction`.                                                       |

## Interceptors

### httpErrorInterceptor

Función que recibe el error de una solicitud HTTP y retorna un string según el tipo de solicitud y el código de error. Si `type` es '' (string vacío), el mensaje de error también será un string vacío.

_Parámetros_

| Nombre | Tipo     | Descripción                                                        |
| ------ | -------- | ------------------------------------------------------------------ |
| error  | `any`    | Objeto que representa el error recibido de una solicitud HTTP.     |
| type   | `string` | Tipo de ruta o contexto en el cual se está interceptando el error. |

## Models

### Auth

#### LoginRequest

Interfaz para realizar login.

| Nombre   | Tipo     | Descripción                    |
| -------- | -------- | ------------------------------ |
| email    | `string` | Correo electrónico del usuario |
| password | `string` | Contraseña del usuario         |

#### RegisterRequest

Interfaz para registrar un usuario. Nótese que `profileType` y `userType` son requeridos por el backend para realizar el registro, y debe enviarse `dni` o `ruc` con el número de documento del usuario.

| Nombre       | Tipo     | Descripción                    |
| ------------ | -------- | ------------------------------ |
| email        | `string` | Correo electrónico del usuario |
| password     | `string` | Contraseña del usuario         |
| profileType? | `string` | Tipo de perfil (opcional)      |
| userType?    | `string` | Tipo de usuario (opcional)     |
| dni?         | `string` | Número de DNI (opcional)       |
| ruc?         | `string` | Número de RUC (opcional)       |

#### ProfileRequest

Interfaz para crear un perfil.

| Nombre         | Tipo     | Descripción                     |
| -------------- | -------- | ------------------------------- |
| uid            | `string` | Identificador único del usuario |
| gender?        | `string` | Género del usuario (opcional)   |
| birthdate      | `string` | Fecha de nacimiento del usuario |
| phone          | `string` | Número de teléfono del usuario  |
| country        | `string` | País del usuario                |
| city           | `string` | Ciudad del usuario              |
| type_learning? | `string` | Tipo de aprendizaje (opcional)  |

#### SendCodeRequest

Interfaz para enviar el código de validación al email del usuario o para recuperar su contraseña.

| Nombre | Tipo                                  | Descripción                    |
| ------ | ------------------------------------- | ------------------------------ |
| email  | `string`                              | Correo electrónico del usuario |
| type   | `"repassword" \| "identity_verified"` | Tipo de solicitud de código    |

#### ValidateCodeRequest

Interfaz para validar el código de validación o para recuperar contraseña.

| Nombre | Tipo                                  | Descripción                    |
| ------ | ------------------------------------- | ------------------------------ |
| email  | `string`                              | Correo electrónico del usuario |
| code   | `string`                              | Código de verificación         |
| type   | `"repassword" \| "identity_verified"` | Tipo de validación             |

#### HttpObject

Interfaz para la respuesta de una solicitud HTTP.

| Nombre  | Tipo             | Descripción                    |
| ------- | ---------------- | ------------------------------ |
| data    | `any \| null`    | Datos de la respuesta          |
| loading | `boolean`        | Si la solicitud fue completada |
| error   | `string \| null` | Mensaje de error               |

#### Interfaces

##### CountryObj

Interfaz para los datos de un país.

| Nombre  | Tipo       | Descripción                |
| ------- | ---------- | -------------------------- |
| country | `string`   | Nombre del país            |
| cities? | `string[]` | Lista de ciudades del país |

##### CountriesRequest

Interfaz para solicitar la lista de países.

| Nombre | Tipo                   | Descripción                                                    |
| ------ | ---------------------- | -------------------------------------------------------------- |
| verify | `CountriesRequestType` | Tipo de solicitud para obtener solo países o países y ciudades |

##### StepsItemContent

Interfaz para definir los pasos en el proceso de validación de código.

| Nombre    | Tipo                                                      | Descripción                                        |
| --------- | --------------------------------------------------------- | -------------------------------------------------- |
| key       | `string`                                                  | Identificador del paso                             |
| title     | `string`                                                  | Título del paso                                    |
| status    | `"finish" \| "wait" \| "process" \| "error" \| undefined` | Estado del paso                                    |
| icon      | `any`                                                     | Ícono del paso                                     |
| text      | `string`                                                  | Descripción del paso                               |
| showInput | `boolean`                                                 | Si debe mostrarse el input para ingresar el código |

#### Redux

##### UserState

Interfaz para el estado del `userSlice`.

| Nombre | Tipo     | Descripción       |
| ------ | -------- | ----------------- |
| token  | `string` | Token del usuario |
| type   | `string` | Tipo de usuario   |
| uid    | `string` | Uid del usuario   |

##### LoadingState

Interfaz para el estado del `loadingSlice`.

| Nombre    | Tipo      | Descripción                  |
| --------- | --------- | ---------------------------- |
| isLoading | `boolean` | Estado de la página de carga |

##### MainState

Interfaz para el estado principal de Redux.

| Nombre  | Tipo           | Descripción                  |
| ------- | -------------- | ---------------------------- |
| user    | `UserState`    | Estado del usuario           |
| loading | `LoadingState` | Estado de la página de carga |

## Pages

### Utils

#### LoadingCond

Página de carga que llama a `LoadingPage` dependiendo del estado del `loadingSlice` en redux.

#### LoadingPage

Página de carga que muestra una animación de Lottie.

### Login

Página que muestra el formulario de login o de registro según la pestaña seleecionada. Obtiene la lista de dominios de nivel superior (TLDs) permitidos para la validación del dominio del correo electrónico. Limpia el input del número de documento del componente Dni cuando cambia el tipo de documento.

Cuando el formulario es enviado:

- Login: Inicia sesión y guarda en redux el token y tipo del usuario. Adicionalmente, alamcena el token en el local storage.
- Registro: Registra al usuario, guarda la uid del usuario en redux y redirecciona a la página de Profile.

### Profile

Página para crear perfil.

Obtiene la lista de países y ciudades para pasarlas a los componentes de Country y City.

Si la creación de perfil se realizó con éxito, se muestra el botón para enviar un código de validación. Al hacer click sobre éste, se envía el código al email del usuario registrado y se abre el modal ValidateCode.
Cuando el modal es cerrado, y si la validación fue exitosa, redirige a una nueva página.

## Redux

### store

Crea un _store_ de Redux.

### loadingSlice

Crea un _slice_, con el nombre loading, para el estado de la página de carga, que determina si se muestra o no.

### userSlice

Crea un _slice_, con el nombre _user_, para los datos del usuario.

## Services

### Auth

#### login

Retorna la respuesta al realizar el inicio de sesión.

_Parámetros_

| Nombre    | Tipo              | Descripción                               |
| --------- | ----------------- | ----------------------------------------- |
| loginData | `RegisterRequest` | Datos necesarios para el inicio de sesión |

#### profile

##### createProfile

Retorna la respuesta al crear un perfil.

_Parámetros_

| Nombre      | Tipo             | Descripción                           |
| ----------- | ---------------- | ------------------------------------- |
| profileData | `ProfileRequest` | Datos necesarios para crear un perfil |

#### register

Retorna la respuesta al registrar un usuario.

_Parámetros_

| Nombre       | Tipo              | Descripción                                |
| ------------ | ----------------- | ------------------------------------------ |
| registerData | `RegisterRequest` | Datos necesarios para registrar un usuario |

#### sendCode

Retorna la respuesta al enviar el código de validación.

_Parámetros_

| Nombre       | Tipo              | Descripción                            |
| ------------ | ----------------- | -------------------------------------- |
| sendCodeData | `SendCodeRequest` | Datos necesarios para enviar el código |

#### validateCode

Retorna la respuesta al validar el código de validación.

_Parámetros_

| Nombre           | Tipo                  | Descripción                             |
| ---------------- | --------------------- | --------------------------------------- |
| validateCodeData | `ValidateCodeRequest` | Datos necesarios para validar el código |

### Utils

#### country

##### getCountries

Retorna la respuesta al obtener la lista de países.

_Parámetros_

| Nombre | Tipo               | Descripción                          |
| ------ | ------------------ | ------------------------------------ |
| data   | `CountriesRequest` | Datos necesarios para obtener países |

#### topLevelDomains

##### getTLDs

Retorna la respuesta al obtener la lista de dominios de nivel superior (TLDs).

## Utilities

### notification

#### showNotification

Muestra una notificación con el contenido y tipo provistos, usando la configuración definida.

_Parámetros_

| Nombre      | Tipo                                          | Descripción                                                                                                                    |
| ----------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| api         | `NotificationInstance \| null`                | Instancia de la notificación proporcionada por Ant Design para mostrar la notificación. Puede ser `null` si no se proporciona. |
| type        | `'success' \| 'error' \| 'info' \| 'warning'` | Tipo de la notificación que se desea mostrar (éxito, error, información o advertencia).                                        |
| description | `string`                                      | Descripción del mensaje que se mostrará en la notificación.                                                                    |

### requests

#### httpRequest

Función que retorna una promesa de tipo `HttpObject` con los datos de respuesta, de error y si la solicitud ha terminado. Emplea _axios_ para realizar las solicitudes y, en caso de producirse un error, `httpErrorInterceptor` define el mensaje correspondiente de error.

_Parámetros_

| Nombre      | Tipo                                   | Descripción                                                              |
| ----------- | -------------------------------------- | ------------------------------------------------------------------------ |
| url         | `string`                               | URL a la cual se enviará la solicitud HTTP.                              |
| method      | `'get' \| 'post' \| 'put' \| 'delete'` | Método HTTP para la solicitud (GET, POST, PUT, DELETE).                  |
| type        | `string`                               | Tipo de ruta o contexto en el cual se está realizando la solicitud HTTP. |
| dataToSend? | `T \| undefined`                       | Datos a enviar en la solicitud, opcional dependiendo del método HTTP.    |

### globals

Almacena valores globales usados en la aplicación, como el formato de fecha.

### lengths

Almacena las longitudes usadas para la validación de variables.

### routes

Almacena las rutas del backend.

### types

Almacena tipos de datos u objetos que determinan tipos de datos.
