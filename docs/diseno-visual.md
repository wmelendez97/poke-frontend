# Diseño visual

Este documento formaliza los patrones visuales observados en las imágenes de referencia y su aplicación a Poke. Las imágenes son la fuente principal de composición, jerarquía, espaciado y componentes. Por indicación del proyecto, la identidad y la paleta pueden adaptarse al universo Pokémon. Esta adaptación cromática se documenta por separado de los colores observados en las capturas.

## Objetivo del aplicativo

Poke es una aplicación de consulta de información sobre Pokémon. Su backend expone una API que consume PokeAPI mediante una capa proxy, adapta las respuestas y mantiene una caché local de información consultada. El frontend React presenta las funciones de esa API a usuarios autenticados.

El alcance comprobado en el backend incluye:

- Inicio de sesión con correo y contraseña, y consulta del usuario autenticado.
- Catálogo de Pokémon paginado y consulta de detalle por identificador o nombre.
- Búsqueda por nombre. Las coincidencias parciales se buscan en la caché local; cuando no hay coincidencias, se consulta el nombre en la API externa. No implica búsqueda parcial exhaustiva en todo PokeAPI.
- Consulta de tipos y de Pokémon asociados a un tipo.
- Consulta de habilidades, movimientos y estadísticas disponibles en las respuestas.
- Registro y consulta de historial de búsquedas, con filtros de fecha, tipo de consulta y texto en el listado global, además de consulta por usuario.

La intención funcional de la interfaz es facilitar la exploración del catálogo, la lectura de fichas y la consulta del historial. Los saldos, pagos, tarjetas y créditos de las imágenes pertenecen a la referencia bancaria; no son funcionalidades de Poke. Los patrones documentados orientan desarrollos futuros y no implican que todas estas pantallas ya estén implementadas en el frontend.

## Objetivo de responsividad y compatibilidad

Poke debe ofrecer una experiencia funcional, legible y consistente en la mayor variedad posible de dispositivos: teléfonos, tabletas, portátiles y equipos de escritorio. La interfaz debe adaptarse al espacio disponible, la orientación y el método de entrada, conservando la identidad visual y el acceso a las funciones principales.

El objetivo incluye navegadores de uso extendido en Android, iOS, Windows, macOS y Linux. La compatibilidad efectiva debe comprobarse y documentarse con versiones concretas, considerando los requisitos del framework y sus dependencias. Este objetivo no constituye una garantía de soporte universal ni una afirmación de pruebas ya realizadas.

## Alcance de la adaptación

- Conservar las jerarquías, superficies claras, espaciados, radios, sombras suaves, botones grandes y patrones de layout de las imágenes.
- Aplicar la paleta Pokémon definida en este documento a los mismos roles visuales: títulos, navegación, CTA, acentos de cards y etiquetas.
- Usar el nombre e identidad de Poke en la interfaz. Los logos CUSCATLAN, los distintivos YA y los textos bancarios documentan la referencia; no deben trasladarse al aplicativo.
- Mantener separados los hechos observados, las inferencias y la adaptación solicitada. Los apartados de login, dashboard bancario, detalle de cuenta y productos describen las capturas; la sección de aplicación a módulos Poke define su correspondencia funcional.
- El objetivo multidispositivo es un requisito del proyecto. La distribución responsive y las propuestas para modales o estados vacíos son inferencias, porque las capturas no muestran esos estados o tamaños. No representan evidencia de pantallas existentes.

Ante una diferencia, la adaptación Pokémon aquí definida prevalece para identidad, color y contenido; las capturas prevalecen para estructura visual. Los estilos de plantilla existentes no sustituyen ninguna de estas referencias.

## Fuentes revisadas

- Imágenes de referencia del login, dashboard bancario, detalle de cuenta, productos digitales, tarjetas relacionadas, banner de pagos automáticos y footer.
- `frontend/poke-frontend/package.json`: el frontend actual usa React 19, Vite 8, PrimeReact 10, PrimeFlex y PrimeIcons.
- `frontend/poke-frontend/src/index.css` y `frontend/poke-frontend/src/App.css`: contienen estilos base de plantilla Vite/React que no representan el diseño de las imágenes.
- Backend: [PokemonController](../backend/poke-backend/src/main/java/com/poke/api/controller/PokemonController.java), [TypeController](../backend/poke-backend/src/main/java/com/poke/api/controller/TypeController.java), [AuthController](../backend/poke-backend/src/main/java/com/poke/api/controller/AuthController.java) y [SearchHistoryController](../backend/poke-backend/src/main/java/com/poke/api/controller/SearchHistoryController.java), como evidencia de las funciones expuestas.
- Integración externa y caché: [PokeApiClient](../backend/poke-backend/src/main/java/com/poke/api/proxy/client/PokeApiClient.java) y [PokemonService](../backend/poke-backend/src/main/java/com/poke/api/service/PokemonService.java).
- Contratos de datos: [PokemonResponse](../backend/poke-backend/src/main/java/com/poke/api/dto/response/PokemonResponse.java) y [PokemonPageItemResponse](../backend/poke-backend/src/main/java/com/poke/api/dto/response/PokemonPageItemResponse.java).

## Diferencias con el código actual

- El proyecto actual no usa Angular ni PrimeNG. Usa React con PrimeReact. Las reglas visuales deben implementarse con PrimeReact, PrimeFlex, PrimeIcons y CSS propio.
- Si en el futuro existe una versión Angular, los patrones pueden trasladarse a PrimeNG, pero no debe introducirse Angular ni PrimeNG en este frontend React.
- `src/index.css` define acento morado, modo oscuro automático, layout centrado de plantilla y estilos genéricos. Esto contradice las imágenes, donde dominan azul CUSCATLAN, amarillo, superficies blancas y fondos gris muy claro.
- `src/styles/variables.css`, `src/styles/global.css`, `Dashboard.css` y `Login.css` están vacíos. Este documento debe funcionar como referencia de diseño hasta que existan tokens CSS reales.
- Las capturas corresponden a banca digital, mientras que el backend trabaja con Pokémon. Se reutiliza su lenguaje de interfaz, con contenido Poke y una adaptación cromática Pokémon explícita; no se adopta el dominio bancario.

## Paleta observada en las capturas

Los colores son aproximados por muestreo visual de las capturas, no valores oficiales de marca. Esta tabla conserva la referencia original; para desarrollar Poke, utilizar la correspondencia de la sección siguiente.

| Color | Hex aproximado | Uso recomendado |
| --- | --- | --- |
| Azul CUSCATLAN profundo | `#003A5D` | Títulos principales, textos destacados, iconos lineales, footer, cards oscuras, navegación principal. |
| Azul petróleo oscuro | `#003049` | Fondos de footer, cards promocionales oscuras, bloques de alta jerarquía. |
| Azul medio | `#005B8E` | Enlaces, acciones secundarias, indicadores activos, iconos de campos. |
| Azul suave | `#EAF3F8` | Botones secundarios, chips suaves, fondos de iconos, estados seleccionables de baja jerarquía. |
| Amarillo primario | `#FFC400` | CTA principal, botones grandes, chips YA, acentos laterales, estados activos principales. |
| Dorado institucional | `#B9975B` | Isotipo del banco y acentos de marca. No usar como CTA principal. |
| Fondo general | `#F3F4F5` | Fondo de dashboard y pantallas transaccionales. |
| Superficie blanca | `#FFFFFF` | Cards, topbar, formularios, contenedores, banners. |
| Separador claro | `#E8ECEF` | Bordes sutiles, divisores, líneas internas. |
| Texto principal | `#003A5D` | Títulos, montos, nombres de producto, labels importantes. |
| Texto secundario | `#6E7378` | Descripciones, fechas, textos auxiliares. |
| Texto tenue | `#A7ABB0` | Labels secundarios, marcas de banco, placeholders. |
| Éxito | `#009E52` | Montos positivos y estados exitosos. |
| Alerta de notificación | `#FF0000` | Punto de notificación pequeño. |
| Promo verde | `#68A010` | Cards de producto verde. Usar solo como color de producto. |
| Promo coral | `#FF4860` | Cards de producto coral. Usar solo como color de producto. |

Reglas de uso observadas en la referencia:

- El azul profundo y el amarillo forman la identidad principal de la referencia.
- El amarillo se reserva para CTA primario, pestaña activa o acento visible. No usarlo como fondo general.
- El fondo general debe ser gris claro o blanco. Evitar fondos oscuros salvo footer y cards promocionales.
- Los colores de producto, como verde o coral, deben quedar contenidos dentro de cards promocionales y no convertirse en tema global.

## Paleta Pokémon para Poke

Esta paleta es una adaptación autorizada por el proyecto, inspirada en el amarillo, azul y rojo asociados visualmente al universo Pokémon. Los valores son decisiones de diseño para Poke, no colores extraídos de las capturas ni una especificación oficial de Pokémon. Se establece una base común para todas las pantallas; los colores de tipos son acentos complementarios.

| Rol visual | Color Poke | Aplicación |
| --- | --- | --- |
| Títulos y texto destacado | `#17345C` | Sustituye al azul institucional en títulos, nombres, identificadores, datos destacados y texto de CTA amarillo. |
| Navegación y acciones secundarias | `#2455A4` | Enlaces, iconos, foco y selección de controles. Botones grandes de navegación con texto blanco. |
| CTA principal | `#FFCB05` | Botón principal y pestaña activa; conserva el papel del amarillo de las capturas, con texto `#17345C`. |
| Acento Poké Ball | `#E3350D` | Detalles de identidad e ilustraciones. No sustituye el amarillo de los CTA ni sirve por sí solo como señal de error. |
| Superficie secundaria azul | `#EAF3F8` | Acciones suaves, fondos de iconos y selección de baja jerarquía. |
| Fondo de aplicación | `#F3F4F5` | Dashboard, búsqueda, ficha e historial. Catálogo con composición de productos: fondo blanco. |
| Superficie y separadores | `#FFFFFF` / `#E8ECEF` | Topbar, cards, campos, filas y divisores, conservando la referencia. |
| Texto secundario | `#6E7378` | Metadatos y descripciones. |
| Fondo de footer, cuando exista | `#17345C` | Texto blanco y títulos amarillos, conservando el patrón observado. |
| Estado satisfactorio | `#009E52` | Iconos o acentos de resultado correcto acompañados de texto; no representa un tipo Pokémon. |
| Error | `#B42318` | Mensaje e indicador de error; distinguirlo del rojo decorativo mediante texto e icono. |

### Acentos por tipo

Los tipos pueden aportar color a etiquetas, iconos, barras laterales o áreas pequeñas de la ficha. La tabla define fondos suaves propios de Poke con texto `#17345C`; no establece colores oficiales de tipos. Usar la clave que entrega la API y mostrar una etiqueta legible, sin alterar el valor enviado al backend.

| Clave API | Etiqueta | Fondo de etiqueta |
| --- | --- | --- |
| `normal` | Normal | `#E5E7EB` |
| `fire` | Fuego | `#FFE0CC` |
| `water` | Agua | `#D8ECFF` |
| `electric` | Eléctrico | `#FFF2B3` |
| `grass` | Planta | `#DFF0D5` |
| `ice` | Hielo | `#DDF5F5` |
| `fighting` | Lucha | `#F4D5CF` |
| `poison` | Veneno | `#ECDCF5` |
| `ground` | Tierra | `#F0E4C8` |
| `flying` | Volador | `#E3E8FA` |
| `psychic` | Psíquico | `#FADBE7` |
| `bug` | Bicho | `#E9EFCB` |
| `rock` | Roca | `#E7E1D0` |
| `ghost` | Fantasma | `#E3DEF2` |
| `dragon` | Dragón | `#DDDFFA` |
| `dark` | Siniestro | `#DFDBD8` |
| `steel` | Acero | `#E1E8ED` |
| `fairy` | Hada | `#F7DEEF` |
| Otra clave o tipo sin color asignado | Nombre disponible del tipo | `#E5E7EB` |

Reglas de aplicación:

- El azul y el amarillo siguen siendo constantes entre módulos. El rojo temático y los colores de tipos ocupan áreas acotadas.
- Los colores de tipo no cambian el fondo general, la navegación, los enlaces ni el CTA de una ficha.
- Mostrar cada tipo con su nombre. Un Pokémon con varios tipos conserva etiquetas independientes, sin mezclarlas en un degradado.
- Las ilustraciones o imágenes Pokémon sustituyen las imágenes bancarias cuando el contenido lo requiere. Mantener encuadre, proporción y jerarquía; no recolorear imágenes para ajustarlas al tipo.
- El color de tipo clasifica; el color de estado comunica un resultado. Un tipo Planta no significa éxito y un tipo Fuego no significa error.

## Tipografía

La tipografía aparente es una sans geométrica y limpia, cercana a Montserrat, Poppins o una familia institucional equivalente. En ausencia de fuente oficial, usar una pila compatible:

```css
font-family: "Montserrat", "Poppins", "Segoe UI", Arial, sans-serif;
```

Jerarquía observada:

| Uso | Tamaño desktop | Peso | Color |
| --- | --- | --- | --- |
| Título de pantalla | 22px a 28px | 700 a 800 | Azul profundo |
| Sección destacada | 20px a 26px | 700 a 800 | Azul profundo |
| Título de card promocional | 24px a 28px | 800 | Blanco o azul profundo |
| Subtítulo o texto introductorio | 18px a 24px | 400 a 500 | Azul profundo o texto base |
| Label de card bancaria | 13px a 15px | 500 | Azul medio o texto secundario |
| Montos | 24px a 30px | 700 a 800 | Azul profundo |
| Botón principal | 15px a 18px | 700 | Azul profundo |
| Texto de tabla/lista | 13px a 16px | 400 a 700 | Azul profundo o secundario |
| Topbar usuario | 14px a 16px | 400 a 500 | Azul profundo |

Reglas:

- Usar títulos con peso alto y color azul profundo.
- Mantener buena respiración entre líneas, aproximadamente `1.25` en títulos y `1.45` a `1.6` en textos largos.
- Los montos deben ser grandes, pesados y fáciles de escanear.
- Usar acentos correctos en todo texto visible.

## Espaciado, bordes, radios y sombras

Espaciado:

- Usar escala base de `8px`.
- Separación interna de cards transaccionales: `24px` a `32px`.
- Separación entre cards: `16px` a `24px`.
- Separación entre secciones grandes: `32px` a `56px`.
- Layout de productos digitales: contenedor centrado con márgenes laterales amplios y gap cercano a `32px`.
- Dashboard: columnas con gap cercano a `16px`; contenido inicia bajo topbar con margen vertical amplio.

Bordes y radios:

- Cards bancarias y dashboard: radio `8px` a `12px`.
- Cards promocionales grandes: radio `14px` a `16px`.
- Botones principales: radio `8px` a `10px`.
- Inputs: radio `8px` a `10px`.
- Avatares, badges e iconos flotantes: circulares.
- Separadores: `1px solid #E8ECEF` o gris claro equivalente.

Sombras:

- Sombras suaves, difusas y de baja opacidad.
- Cards blancas: `0 10px 24px rgba(0, 48, 72, 0.04)` a `0 18px 36px rgba(0, 48, 72, 0.08)`.
- No usar sombras duras, bordes negros ni elevación exagerada.

Fondos:

- Pantallas transaccionales: fondo gris claro.
- Topbar y cards: blanco.
- Footer: azul petróleo oscuro.
- Banners: blanco sobre fondo claro con sombra suave.

## Layout y responsive

Reglas generales:

- Desktop usa composición amplia, centrada y con aire lateral.
- Mantener ancho máximo visual entre `1080px` y `1180px` para productos digitales.
- Dashboard puede usar ancho mayor, cercano al viewport, con márgenes de `40px` a `80px`.
- En mobile, las columnas se apilan, las cards ocupan ancho completo y los botones mantienen altura táctil mínima de `48px`.
- Evitar que topbar, sidebar o cards dependan de alturas fijas que rompan textos largos.

Breakpoints sugeridos:

- Desktop: tres columnas cuando existan cards promocionales o dashboard con columnas.
- Tablet: dos columnas para productos digitales; dashboard pasa a dos columnas o apilado por prioridad.
- Mobile: una columna, sidebar convertida en menú horizontal o bloque de acciones apilado.

### Criterios multidispositivo

- Diseñar desde un ancho de referencia de `320px` CSS y permitir crecimiento fluido hasta pantallas amplias. Elegir los puntos de cambio según el contenido, sin depender de modelos de dispositivo concretos.
- Comprobar orientación vertical y horizontal, ventanas redimensionadas y anchos intermedios. Reorganizar columnas y acciones sin cambiar su prioridad funcional.
- Evitar desbordamiento horizontal de la página, textos cortados y superposición de controles. Cuando una tabla necesite desplazamiento horizontal, limitarlo a su contenedor y conservar acceso a todos sus datos.
- Permitir ajuste de textos largos y zoom del navegador al `200%` sin perder contenido ni acciones. No desactivar el zoom.
- Mantener imágenes proporcionales y dimensiones estables para cards, iconos y áreas de carga. En pantallas amplias, conservar los anchos máximos de lectura definidos por cada patrón.
- Permitir uso con pantalla táctil, ratón y teclado. Conservar objetivos táctiles de al menos `48px`, foco visible y acceso a acciones sin depender exclusivamente de hover.
- Verificar formularios, menús y modales con teclado virtual abierto y con poca altura disponible. Permitir desplazamiento del contenido y mantener accesibles campos, cierre y CTA.

### Compatibilidad y validación

- La matriz objetivo incluye Chrome, Edge, Firefox y Safari, en su versión estable vigente y la anterior donde estén disponibles. Incluir Safari en iOS y Chrome en Android, además de las comprobaciones de escritorio.
- Priorizar HTML semántico, controles estándar y CSS compatible con la matriz objetivo. Si una capacidad visual no está disponible, ofrecer una alternativa que conserve contenido y funcionalidad.
- Validar como muestra anchos de `320`, `360`, `390`, `768`, `1024`, `1366` y `1920px` CSS, junto con orientación horizontal y alturas reducidas. Esta muestra complementa la revisión de tamaños intermedios; no define breakpoints obligatorios.
- Recorrer acceso, catálogo, búsqueda, ficha, tipos e historial en las combinaciones verificadas. Revisar también carga, ausencia de datos y errores, respetando el alcance implementado de cada módulo.
- Combinar emulación responsive con comprobaciones en dispositivos físicos cuando estén disponibles. Registrar navegador, versión, sistema, viewport y limitaciones detectadas; marcar las combinaciones pendientes como no verificadas.
- En dispositivos con recursos limitados o conexiones lentas, mantener controles utilizables, estados de carga visibles y espacio reservado para imágenes. Los elementos decorativos no deben bloquear las consultas ni la navegación.

## Topbar

Patrón observado:

- Fondo blanco.
- Logo CUSCATLAN a la izquierda.
- Separador vertical gris claro entre logo y nombre de producto.
- Nombre de producto: `Banca Digital` o `Productos Digitales YA`, en azul profundo.
- Lado derecho con avatar, badge YA, iniciales de usuario, nombre y chevron.
- En productos digitales aparece botón circular amarillo con chevron.

Reglas:

- Altura aproximada: `64px` a `80px`.
- Logo siempre visible en desktop.
- Separador vertical discreto, no más oscuro que gris claro.
- Iconos de usuario y chevron en azul profundo.
- Punto rojo de notificación pequeño y superpuesto al badge cuando aplique.

## Login

Patrón observado:

- Fondo gris muy claro.
- Logo arriba a la izquierda y botón circular de menú arriba a la derecha.
- Formulario centrado horizontal y verticalmente, sin card contenedora pesada.
- Saludo grande en azul profundo con icono solar amarillo.
- Usuario seleccionado con icono circular azul suave y nombre en dos líneas.
- Campo contraseña con borde gris, iconos internos y fondo azul muy suave en el valor.
- Checkbox azul marcado.
- CTA principal amarillo ancho, centrado.
- Link de recuperación pequeño en azul medio.
- Elementos flotantes decorativos con avatares, iconos y mini cards blancas.

Reglas:

- Mantener el foco visual en saludo, usuario y CTA.
- No encerrar todo el login en una card pesada.
- Los objetos flotantes deben ser secundarios y no competir con el formulario.
- En mobile, ocultar o reducir elementos flotantes.

## Dashboard bancario

Patrón observado:

- Fondo gris claro.
- Topbar blanca.
- Sidebar izquierda dentro de card blanca con acciones grandes.
- Contenido principal con cards blancas.
- Cards de productos con barra lateral de color, título, monto enmascarado, número de cuenta y botón amarillo.
- Columna derecha con favoritos en mini cards y productos sugeridos en cards horizontales.

Sidebar:

- Ancho aproximado: `200px`.
- Card contenedora blanca con radio suave.
- Botones de acción grandes, azul profundo, icono superior y texto blanco.
- Botón "Ver todos" en azul suave con icono azul.
- Separación vertical uniforme entre acciones.

Cards de producto:

- Altura aproximada: `112px` a `136px`.
- Barra lateral de color de `8px` a `10px`.
- Botón "Ver detalle" amarillo, alineado a la derecha.
- Montos enmascarados conservan jerarquía de monto real.
- Los textos de banco o alias secundarios usan gris.

Favoritos:

- Mini cards blancas de tamaño homogéneo.
- Avatar circular con iniciales y color propio.
- Nombre en azul profundo y banco en gris tenue.

Productos para ti:

- Cards horizontales blancas.
- Icono o marca a la izquierda.
- Texto breve con énfasis en la palabra clave.

## Detalle de cuenta

Patrón observado:

- Título con flecha de regreso en azul profundo.
- Contenedor principal en dos columnas.
- Bloque superior con resumen de cuenta, barra lateral amarilla y card secundaria de reservas.
- Acciones de cuenta en card blanca con botones grandes.
- Sección de movimientos con pestañas tipo segmented control.
- Lista de movimientos en filas blancas, separadas por espacio.
- Panel de saldos con chip activo azul y filas blancas.

Reglas:

- La flecha de regreso debe ser simple y alineada con el título.
- El resumen de cuenta mantiene monto como elemento dominante.
- Pestaña activa: fondo amarillo para movimientos o azul para chips internos según captura.
- Montos positivos en verde; negativos en texto oscuro o gris, con signo visible.
- Filas de detalle deben favorecer lectura rápida: concepto a la izquierda, fecha secundaria debajo, monto a la derecha.

## Productos digitales

Patrón observado:

- Fondo blanco, no gris.
- Header institucional con logo, separador y nombre `Productos Digitales YA`.
- Contenido centrado y ancho máximo.
- Saludo superior: `¡Hola, WILLIAM!` en azul profundo.
- Subtítulo con cantidad de productos, número en negrita.
- Sección `Productos destacados` con tres cards grandes.
- Cards de producto con fondos de color sólido, imagen de tarjeta, curva decorativa sutil, título blanco y panel interno blanco.
- Botón amarillo de ancho completo dentro del panel.

Reglas:

- Usar grid de tres columnas en desktop.
- Cards destacadas deben tener altura consistente.
- Imagen de producto debe ocupar la parte superior y conservar presencia visual.
- Título de card destacado en blanco, centrado y con peso alto.
- Panel interno blanco contiene descripción y CTA.
- Los colores de card son parte del producto, no del sistema global.

## Productos relacionados

Patrón observado:

- Sección con título azul profundo.
- Dos cards blancas grandes con sombra suave y radio amplio.
- Ilustración superior centrada.
- Marca del producto centrada con círculo amarillo YA.
- Texto descriptivo en bloque, alineado a la izquierda dentro de la card.
- CTA amarillo ancho al fondo.

Reglas:

- Mantener cards equilibradas en altura.
- La ilustración no debe deformarse ni ocupar más jerarquía que el título del producto.
- El botón debe alinearse visualmente entre cards, aunque el texto tenga distinta longitud.

## Banner y footer

Banner:

- Card horizontal blanca con sombra suave.
- Ilustración a la izquierda.
- Texto principal azul profundo con palabra clave en negrita.
- CTA amarillo a la derecha.
- En mobile, apilar ilustración, texto y botón.

Footer:

- Fondo azul petróleo oscuro.
- Logo blanco/dorado a la izquierda.
- Columnas de enlaces.
- Títulos de columna en amarillo.
- Texto y enlaces en blanco.
- Subfooter en azul un poco más claro.
- Iconos sociales blancos, pequeños y alineados.

## Formularios

Patrón observado:

- Inputs con borde gris claro y radio medio.
- Labels pequeños, grises o azules, cercanos al borde superior.
- Iconos internos en azul profundo.
- Password con control de visibilidad.
- Checkbox cuadrado azul cuando está activo.
- Links de ayuda en azul medio y peso semibold.

Reglas:

- Usar `InputText`, `Password`, `Checkbox`, `Dropdown` y `Button` de PrimeReact con clases propias.
- No depender del tema visual por defecto de PrimeReact si contradice la paleta.
- Estados focus deben usar azul medio, no morado.
- Validación debe usar rojo solo para error, sin competir con el amarillo de CTA.

## Tablas y listas

No se observa una tabla formal tipo grid de datos, pero sí listas tabulares de movimientos y saldos.

Reglas:

- Usar filas blancas sobre fondo gris claro.
- Mantener altura cómoda, entre `48px` y `72px`.
- Concepto o label a la izquierda, valor a la derecha.
- Texto principal en azul profundo.
- Fechas y metadatos en gris tenue.
- Para `DataTable` de PrimeReact, eliminar exceso de bordes y mantener encabezados simples, blancos o gris muy claro.

## Modales

No se observa modal en las imágenes. Si se necesita uno, derivar de cards y formularios:

- Fondo del modal blanco.
- Radio `12px` a `16px`.
- Sombra suave.
- Título azul profundo.
- Footer con CTA amarillo a la derecha y acción secundaria como botón de texto azul o botón suave.
- Overlay discreto, sin oscurecer agresivamente la pantalla.
- No usar estilos morados o negros del tema por defecto.

## Estados vacíos

No se observa estado vacío explícito. Si se necesita uno, derivar de productos relacionados y login:

- Card blanca centrada o bloque dentro de la sección.
- Ilustración o icono lineal azul dentro de círculo azul suave.
- Título azul profundo.
- Texto breve gris secundario.
- CTA amarillo si existe acción principal.
- Mantener el estado vacío funcional y sobrio, sin tono promocional excesivo.

## Uso de PrimeReact, PrimeFlex y PrimeIcons

Componentes recomendados:

- `Button`: CTA amarillo, acciones azules de sidebar, botones suaves.
- `Card`: productos, favoritos, banners, estados vacíos.
- `InputText`, `Password`, `Checkbox`, `Dropdown`: login y formularios.
- `Dialog`: modales.
- `DataTable`: tablas formales, aplicando estilos visuales propios.
- `Avatar` o plantilla propia: iniciales, usuario y favoritos.
- `TabView` o segmented control propio: movimientos, reservas y saldos.
- `Sidebar` o menú propio: menú responsive.

Reglas:

- Usar `className` y CSS propio para acercar PrimeReact a las capturas.
- Aplicar los colores Poke a los roles del tema mediante las variables y hojas de estilo previstas por el proyecto. Mantener una definición compartida por rol; no introducir una paleta distinta por feature.
- Distinguir el color de selección de un componente del color de un tipo Pokémon; una etiqueta de tipo no cambia por estar dentro de una card seleccionada.
- Usar PrimeIcons solo si el icono coincide con el estilo lineal observado.
- No usar colores, radios o sombras del tema por defecto cuando rompan la identidad.
- En frontend usar `pnpm` para instalar, ejecutar y construir.

## Patrones por tipo de pantalla de referencia

Login:

- Composición centrada.
- CTA amarillo dominante.
- Elementos decorativos flotantes en desktop.
- Sin card pesada alrededor del formulario.

Dashboard:

- Fondo gris claro.
- Topbar blanca.
- Sidebar de acciones.
- Cards blancas con botones amarillos.
- Contenido en columnas.

Detalle transaccional:

- Título con regreso.
- Resumen superior.
- Acciones rápidas.
- Listas tabulares en cards.
- Dos columnas en desktop.

Productos digitales:

- Fondo blanco.
- Header institucional.
- Grid promocional de cards grandes.
- Imágenes de producto fuertes.
- Footer institucional.

Footer institucional:

- Azul oscuro.
- Columnas de enlaces.
- Títulos amarillos.
- Contacto e iconos sociales.

## Aplicación a módulos Poke

Estas correspondencias aplican los patrones de referencia al alcance comprobado en el backend. No añaden funciones al contrato existente ni acreditan pantallas ya implementadas.

| Módulo Poke | Patrón de referencia | Contenido e intención funcional |
| --- | --- | --- |
| Acceso | Login centrado, campo con iconos y CTA amarillo | Correo y contraseña conforme a `AuthRequest`. Conservar jerarquía y espaciado; no asumir usuario recordado ni recuperación de contraseña por aparecer en la captura. |
| Inicio, si se utiliza como entrada | Dashboard con topbar, acciones grandes y bloques de información | Accesos a catálogo, tipos e historial. Usar nombre Poke y usuario autenticado; no introducir saldos ni indicadores bancarios. |
| Catálogo y búsqueda | Grid de elementos y cards con acción de detalle | Identificador y nombre como información principal, paginación y búsqueda conforme al backend. Imagen y tipos cuando estén disponibles en los datos obtenidos. |
| Ficha Pokémon | Detalle con regreso, resumen superior y dos columnas | Imagen, nombre, identificador, tipos y datos como altura, peso y experiencia base. Secciones para estadísticas, habilidades y movimientos cuando sus respuestas estén disponibles. |
| Tipos y resultados por tipo | Etiquetas y grid de elementos | Nombre de tipo acompañado del acento asignado; listado de Pokémon devuelto por el endpoint de tipos. |
| Habilidades y movimientos | Pestañas y listas de detalle | Nombre e identificador cuando estén disponibles; habilidad oculta y posición cuando correspondan. No suponer descripciones o efectos que los DTO actuales no incluyen. |
| Historial | Listas tabulares de lectura rápida | Consulta, fecha, tipo de consulta y resultado. Los filtros globales corresponden a `from`, `to`, `type` y `q`; el tipo de consulta no equivale al tipo elemental del Pokémon. |

Límites del contenido y estados:

- El flujo funcional es frontend Poke → backend Poke → PokeAPI, con uso de caché donde lo contempla el servicio. Los servicios del frontend consumen los endpoints propios; la URL de una imagen recibida no constituye un endpoint de consulta de datos.
- `PokemonPageItemResponse` contiene solo `id` y `name`. `PokemonResponse` puede aportar `imageUrl`, `types`, `stats` y otros datos. Una card no debe asumir que la respuesta paginada ya incluye imágenes o tipos; su espacio visual se conserva cuando falten.
- No convertir una estadística ausente en cero ni inventar una descripción, relación o cantidad para llenar un componente.
- Los favoritos de la captura son una referencia de mini cards. No se ha identificado una función de favoritos en los controllers revisados; no presentarla como capacidad existente de Poke. Lo mismo aplica a recomendaciones y productos relacionados.
- El estado vacío de búsqueda comunica ausencia de resultados; el de historial, ausencia de registros. Los fallos de consulta al backend o a su proveedor se comunican como error, no como catálogo vacío.
- La adaptación cromática no modifica la tipografía, densidad, radios ni estructura responsive documentados.

## Antipatrones

- Usar morado como acento global; se permite como acento localizado de tipos como Veneno o Fantasma.
- Copiar marca CUSCATLAN, distintivos YA, textos financieros o funcionalidades bancarias a Poke.
- Cambiar el tema completo según el Pokémon seleccionado o usar los colores de tipos como colores de estado.
- Presentar la paleta Pokémon adaptada como si hubiera sido observada en las capturas o fuera una paleta oficial.
- Activar modo oscuro automático en estas pantallas.
- Mantener la estética de plantilla Vite/React.
- Usar gradients genéricos, blobs decorativos o fondos multicolor fuera de cards promocionales.
- Reemplazar el CTA amarillo de Poke por rojo temático, verde, coral o dorado.
- Usar sombras duras o bordes oscuros.
- Crear cards con radios excesivamente redondos en dashboard bancario.
- Mezclar Angular/PrimeNG dentro del frontend React.
- Usar componentes PrimeReact sin adaptar colores, radios y tipografía.
- Crear layouts muy densos sin aire entre cards.
- Omitir la identidad Poke o reducirla a un elemento irrelevante en topbar.
- Usar textos sin acentos.
- Usar iconos rellenos pesados cuando el patrón muestra iconos lineales.
- Cambiar los colores de producto a una paleta global.

## Checklist de validación

- La pantalla corresponde al objetivo Poke y utiliza datos disponibles en los contratos del backend.
- La identidad usa azul Poke y amarillo `#FFCB05`; el rojo temático permanece como acento localizado.
- Los tipos usan etiquetas con nombre y color consistente, sin cambiar el tema global ni confundirse con estados.
- El fondo corresponde al patrón: gris claro en dashboard, ficha e historial; blanco en catálogo basado en productos.
- Topbar incluye identidad Poke, separador y nombre de sección cuando aplica; no copia marcas bancarias.
- Los CTA principales son amarillos, con texto `#17345C` y peso alto.
- Las cards son blancas, con radio moderado y sombra suave.
- Los textos principales usan azul profundo; secundarios usan gris.
- El nombre, identificador y datos relevantes del Pokémon tienen jerarquía visual clara.
- Las acciones rápidas usan botones grandes y fáciles de tocar.
- La composición desktop respeta columnas y gaps observados.
- En mobile, las columnas se apilan sin ocultar acciones principales.
- La pantalla funciona en anchos pequeños, intermedios y amplios, en ambas orientaciones, sin desbordamiento horizontal de la página.
- El zoom al `200%`, los textos largos y el teclado virtual no ocultan contenido ni acciones.
- Las funciones principales son accesibles mediante tacto, ratón y teclado, con foco visible y sin depender de hover.
- La validación registra dispositivos, sistemas y versiones de navegador comprobados; las combinaciones pendientes quedan identificadas.
- La carga de imágenes y los recursos limitados no impiden navegar ni consultar información.
- Los formularios usan bordes sutiles, iconos azules y estados focus azules.
- Las listas tabulares mantienen label a la izquierda y valor a la derecha.
- Las cards con imágenes Pokémon mantienen su proporción y sus acentos dentro del componente.
- La ausencia de imagen, estadística o resultado se distingue de un error de consulta, sin inventar valores.
- El footer mantiene fondo azul oscuro, títulos amarillos y enlaces blancos.
- No aparecen acentos morados globales, estilos Vite, modo oscuro automático ni sombras agresivas.
- Todo texto visible usa acentos correctos.
