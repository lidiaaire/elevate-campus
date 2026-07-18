# Volumen VI — Product Specifications

> Fuente convertida automáticamente desde el PDF oficial. Se conserva el PDF original como fuente maestra.

Volumen  VI  —  Product  Specifications  
 
Portada  
Elevate  Product  Blueprint  
Volumen  VI  —  Product  Specifications  
Versión:  1.0  
 
Estado:
 
Approved
 
Baseline
 
 
Clasificación:
 
Internal
 
Product
 
Documentation
 
 
Objetivo  
El  Product  Specifications  constituye  la  especificación  funcional  oficial  de  Elevate.  
Mientras  los  volúmenes  anteriores  definen  la  visión,  arquitectura,  experiencia  de  usuario,  
diseño
 
y
 
arquitectura
 
técnica
 
del
 
producto,
 
este
 
volumen
 
documenta
 
el
 
comportamiento
 
funcional
 
de
 
cada
 
módulo
 
del
 
ecosistema.
 
Cada  especificación  describe  de  forma  precisa  qué  debe  hacer  el  producto,  cómo  debe  
comportarse
 
y
 
cuáles
 
son
 
los
 
criterios
 
que
 
determinan
 
que
 
una
 
funcionalidad
 
está
 
correctamente
 
implementada.
 
 
Control  de  versiones  
Versión  
Fecha  Estado  Autor  Cambios  
1.0  Julio  2026  
Approved  
Product  Management  
Primera  edición  oficial  del  Product  Specifications.

Índice  
Capítulo  1.  Introducción  
1.1  Propósito  
1.2  Alcance  
1.3  Relación  con  el  Blueprint  
1.4  Principios  de  especificación  
1.5  Organización  del  documento  
 
Capítulo  2.  Specification  Framework  
 
Capítulo  3.  Home  Module  
 
Capítulo  4.  Learning  Modules  
 
Capítulo  5.  Progress  Modules  
 
Capítulo  6.  Community  Modules  
 
Capítulo  7.  Administration  Modules  
 
Capítulo  8.  Cross-Cutting  Systems  
 
Capítulo  9.  Acceptance  Criteria  
 
Capítulo  10.  Specification  Rules

Capítulo  1  —  Introducción  
 
1.1  Propósito  
El  Product  Specifications  define  el  comportamiento  funcional  detallado  de  Elevate.  
Cada  módulo  del  producto  dispone  de  una  especificación  que  documenta:  
●  objetivos;  ●  funcionalidades;  ●  reglas  de  negocio;  ●  permisos;  ●  flujos;  ●  estados;  ●  criterios  de  aceptación.  
Este  volumen  constituye  la  referencia  principal  para  Product  Management,  Diseño,  
Desarrollo
 
y
 
QA
 
durante
 
la
 
implementación
 
del
 
producto.
 
 
1.2  Alcance  
Este  documento  cubre  todos  los  módulos  funcionales  de  Elevate.  
Incluye:  
●  Inicio;  ●  Mis  cursos;  ●  Curso;  ●  Lección;  ●  Evaluaciones;  ●  Mi  progreso;  ●  Certificados;  ●  Calendario;  ●  Actividades;  ●  Comunidad;  ●  Perfil;  ●  Tutor  IA;  ●  Notificaciones;  ●  Búsqueda;  ●  Sistemas  transversales.  
No  documenta  aspectos  técnicos  de  implementación,  definidos  en  el  Technical  Blueprint .

1.3  Relación  con  el  Blueprint  
El  Product  Specifications  representa  el  nivel  más  detallado  de  la  documentación  funcional.  
Product  Vision          ↓  Product  Architecture          ↓  UX  Playbook          ↓  Design  Blueprint          ↓  Technical  Blueprint          ↓  Product  Specifications  
Cada  especificación  deberá  respetar  las  decisiones  adoptadas  en  todos  los  volúmenes  
anteriores.
 
 
1.4  Principios  de  especificación  
Todas  las  especificaciones  deberán  cumplir  los  siguientes  principios:  
Completas  
Describen  todo  el  comportamiento  esperado.  
Claras  
No  generan  interpretaciones  ambiguas.  
Verificables  
Pueden  comprobarse  mediante  criterios  objetivos.  
Consistentes  
Utilizan  la  terminología  oficial  del  producto.  
Evolutivas  
Permiten  ampliar  funcionalidades  sin  romper  la  estructura  existente.

1.5  Organización  del  documento  
Cada  módulo  seguirá  exactamente  la  misma  estructura  documental.  
La  plantilla  oficial  incluirá:  
●  propósito;  ●  objetivos;  ●  alcance;  ●  actores;  ●  reglas  de  negocio;  ●  arquitectura  funcional;  ●  navegación;  ●  componentes;  ●  estados;  ●  permisos;  ●  integraciones;  ●  criterios  de  aceptación;  ●  evolución  futura.  
Esta  estructura  garantiza  que  todas  las  especificaciones  mantengan  el  mismo  nivel  de  
detalle
 
y
 
puedan
 
utilizarse
 
directamente
 
durante
 
el
 
desarrollo.
 
 
Capítulo  2  —  Specification  Framework  
 
2.1  Propósito  
El  Specification  Framework  establece  la  estructura  oficial  que  deberán  seguir  todas  las  
especificaciones
 
funcionales
 
de
 
Elevate.
 
Su  objetivo  es  garantizar  que  todos  los  módulos  del  producto  se  documenten  con  el  mismo  
nivel
 
de
 
detalle,
 
utilizando
 
una
 
terminología
 
uniforme
 
y
 
facilitando
 
la
 
colaboración
 
entre
 
Product
 
Management,
 
UX,
 
Diseño,
 
Desarrollo
 
y
 
QA.
 
Toda  especificación  funcional  deberá  construirse  utilizando  esta  plantilla.

2.2  Objetivos  
El  framework  persigue  los  siguientes  objetivos:  
●  estandarizar  la  documentación  funcional;  ●  eliminar  ambigüedades;  ●  facilitar  el  desarrollo;  ●  mejorar  la  trazabilidad  de  requisitos;  ●  simplificar  la  validación  funcional;  ●  mantener  la  coherencia  entre  módulos.  
 
2.3  Alcance  
La  plantilla  será  obligatoria  para:  
●  módulos  principales;  ●  módulos  secundarios;  ●  sistemas  transversales;  ●  nuevas  funcionalidades;  ●  evoluciones  importantes  del  producto.  
No  se  crearán  especificaciones  fuera  de  este  estándar.  
 
2.4  Estructura  oficial  
Toda  especificación  deberá  contener  los  siguientes  apartados.  
Nº  Sección  
1  Propósito  
2  Objetivos  
3  Alcance  
4  Actores  
5  Casos  de  uso  
6  Reglas  de  negocio  
7  Arquitectura  funcional

8  Navegación  
9  Componentes  
10  Estados  
11  Permisos  
12  Integraciones  
13  Métricas  
14  Criterios  de  aceptación  
15  Evolución  futura  
Esta  estructura  será  común  para  todos  los  módulos  de  Elevate.  
 
2.5  Propósito  del  módulo  
Cada  especificación  comenzará  describiendo:  
●  qué  problema  resuelve;  ●  por  qué  existe;  ●  qué  valor  aporta  al  estudiante  o  al  negocio.  
El  propósito  deberá  poder  comprenderse  sin  necesidad  de  conocer  el  resto  del  producto.  
 
2.6  Objetivos  
Los  objetivos  deberán  definir  los  resultados  esperados.  
Cada  objetivo  deberá  ser:  
●  específico;  ●  medible  cuando  sea  posible;  ●  alineado  con  el  Product  Vision.  
No  deberán  describir  soluciones  técnicas.

2.7  Alcance  funcional  
El  alcance  deberá  indicar  claramente:  
Incluido  
Funcionalidades  que  pertenecen  al  módulo.  
Excluido  
Responsabilidades  que  corresponden  a  otros  módulos.  
Esta  separación  evita  solapamientos  entre  especificaciones.  
 
2.8  Actores  
Toda  especificación  deberá  identificar  los  usuarios  implicados.  
Ejemplo:  
Actor  Participación  
Estudiante  Principal  
Profesor  Secundaria  
Administrador  Gestión  
Sistema  Automatizaciones  
Cada  actor  tendrá  permisos  y  responsabilidades  claramente  definidos.  
 
2.9  Casos  de  uso  
Cada  módulo  deberá  documentar  sus  casos  de  uso  principales.  
Para  cada  uno  se  describirá:  
●  objetivo;  ●  actor;  ●  desencadenante;

●  flujo  principal;  ●  flujos  alternativos;  ●  resultado  esperado.  
Los  casos  de  uso  representan  la  visión  funcional  del  módulo.  
 
2.10  Reglas  de  negocio  
Las  reglas  de  negocio  describen  el  comportamiento  obligatorio  del  sistema.  
Cada  regla  deberá:  
●  ser  verificable;  ●  evitar  ambigüedades;  ●  permanecer  independiente  de  la  implementación  técnica.  
Ejemplo:  
"Una  lección  solo  podrá  marcarse  como  completada  cuando  se  hayan  cumplido  
sus
 
condiciones
 
de
 
finalización."
 
 
2.11  Arquitectura  funcional  
Cada  módulo  deberá  mostrar  su  organización  interna.  
Como  mínimo  se  documentarán:  
●  secciones;  ●  componentes  principales;  ●  relaciones;  ●  navegación  interna;  ●  dependencias.  
Esta  arquitectura  deberá  mantenerse  alineada  con  el  Product  Architecture.  
 
2.12  Componentes  
La  especificación  identificará  los  componentes  reutilizados  del  Design  System.

Para  cada  componente  se  indicará:  
●  nombre;  ●  finalidad;  ●  variantes  utilizadas;  ●  comportamiento  específico.  
No  deberán  definirse  componentes  visuales  nuevos  dentro  de  una  especificación  funcional.  
 
2.13  Estados  
Todo  módulo  deberá  documentar  sus  estados  funcionales.  
Como  mínimo:  
●  inicial;  ●  cargando;  ●  vacío;  ●  disponible;  ●  éxito;  ●  error;  ●  restringido.  
Cada  estado  deberá  describir  claramente  el  comportamiento  esperado.  
 
2.14  Integraciones  
Las  dependencias  con  otros  módulos  deberán  identificarse  explícitamente.  
Ejemplo:  
Inicio     │     ├──  Mis  cursos     ├──  Calendario     ├──  Actividades     ├──  Tutor  IA     └──  Mi  progreso  
Las  integraciones  deberán  permanecer  desacopladas  siempre  que  sea  posible.

2.15  Métricas  
Cada  módulo  deberá  definir  indicadores  que  permitan  evaluar  su  funcionamiento.  
Ejemplos:  
●  uso;  ●  adopción;  ●  finalización;  ●  tiempo  medio  de  interacción;  ●  errores;  ●  satisfacción.  
Las  métricas  deberán  estar  relacionadas  con  los  objetivos  del  módulo.  
 
2.16  Criterios  de  aceptación  
Toda  funcionalidad  deberá  disponer  de  criterios  verificables.  
Los  criterios  deberán  responder  a  la  pregunta:  
¿Cómo  sabemos  que  esta  funcionalidad  está  correctamente  implementada?  
Estos  criterios  constituirán  la  referencia  para  QA  y  Product  Management.  
 
2.17  Evolución  futura  
Cada  especificación  incluirá  una  sección  destinada  a  futuras  ampliaciones.  
Esta  sección  permitirá  documentar:  
●  mejoras  previstas;  ●  funcionalidades  candidatas;  ●  limitaciones  conocidas;  ●  dependencias  futuras.  
Las  propuestas  futuras  no  forman  parte  del  alcance  de  la  versión  actual.

2.18  Declaración  del  Specification  
Framework
 
El  Specification  Framework  proporciona  un  estándar  único  para  
documentar
 
el
 
comportamiento
 
funcional
 
de
 
Elevate.
 
Mediante
 
una
 
estructura
 
homogénea,
 
clara
 
y
 
verificable,
 
garantiza
 
que
 
todas
 
las
 
áreas
 
del
 
producto
 
compartan
 
una
 
comprensión
 
común
 
de
 
cada
 
módulo,
 
facilitando
 
su
 
diseño,
 
desarrollo,
 
validación
 
y
 
evolución
 
a
 
lo
 
largo
 
del
 
tiempo.
 
 
Capítulo  3  —  Home  Module  (Inicio)  
 
3.1  Propósito  
El  módulo  Inicio  constituye  el  punto  de  entrada  principal  a  Elevate  y  representa  el  centro  de  
control
 
del
 
estudiante.
 
Su  propósito  es  ofrecer  una  visión  clara,  personalizada  y  accionable  del  estado  del  
aprendizaje,
 
permitiendo
 
al
 
usuario
 
continuar
 
su
 
progreso
 
con
 
el
 
menor
 
número
 
posible
 
de
 
interacciones.
 
La  pantalla  de  Inicio  no  actúa  como  un  panel  informativo,  sino  como  una  herramienta  para  
ayudar
 
al
 
estudiante
 
a
 
decidir
 
inmediatamente
 
cuál
 
es
 
el
 
siguiente
 
paso
 
de
 
su
 
aprendizaje.
 
 
3.2  Objetivos  
El  módulo  persigue  los  siguientes  objetivos:  
●  facilitar  la  continuidad  del  aprendizaje;  ●  mostrar  información  priorizada  y  personalizada;  ●  reducir  el  tiempo  necesario  para  retomar  un  curso;  ●  aumentar  la  frecuencia  de  uso  de  la  plataforma;  ●  centralizar  la  información  más  relevante;  ●  fomentar  la  constancia  del  estudiante.

3.3  Alcance  
Incluye  
●  Hero  personalizado.  ●  Continúa  donde  lo  dejaste.  ●  Actividad  de  hoy.  ●  Objetivos  semanales.  ●  Mis  cursos.  ●  Continúa  tu  camino.  ●  Recomendaciones.  ●  Hoy  en  Elevate.  ●  Mi  espacio  de  aprendizaje.  
No  incluye  
●  Gestión  completa  de  cursos.  ●  Visualización  detallada  del  progreso.  ●  Contenido  de  las  lecciones.  ●  Gestión  del  perfil.  ●  Configuración.  
Estas  funcionalidades  pertenecen  a  otros  módulos.  
 
3.4  Actores  
Actor  Participación  
Estudiante  
Principal  
Sistema  Personalización  automática  
Tutor  IA  Recomendaciones  
Profesor  Indirecta  mediante  contenido  y  actividades   
3.5  Objetivos  de  experiencia

Al  acceder  a  Inicio  el  estudiante  debe  ser  capaz  de  responder  inmediatamente  a  cinco  
preguntas:
 
1.  ¿Qué  debo  hacer  ahora?  2.  ¿Dónde  me  quedé?  3.  ¿Cómo  voy  progresando?  4.  ¿Qué  ocurre  hoy?  5.  ¿Qué  me  recomienda  la  plataforma?  
Si  alguna  de  estas  preguntas  requiere  navegar  a  otro  módulo  para  responderse,  la  
experiencia
 
no
 
cumple
 
el
 
objetivo
 
definido.
 
 
3.6  Arquitectura  funcional  
El  módulo  se  organiza  mediante  los  siguientes  bloques.  
Hero        ↓  Continúa  donde  lo  dejaste        ↓  Tu  actividad  de  hoy        ↓  Objetivos  de  la  semana        ↓  Mis  cursos        ↓  Continúa  tu  camino        ↓  Recomendado  para  ti        ↓  Hoy  en  Elevate        ↓  Mi  espacio  de  aprendizaje  
Este  orden  representa  la  prioridad  oficial  del  contenido.  
 
3.7  Componentes  principales  
La  pantalla  reutiliza  los  siguientes  componentes  del  Design  System.  
●  Dashboard  Layout  ●  Page  Header

●  ContinueLearningCard  ●  CourseCard  ●  WeeklyGoals  ●  ProgressBar  ●  RecommendationCard  ●  ActivityCard  ●  StatisticCard  ●  Avatar  ●  Badge  ●  Button  
No  deberán  utilizarse  componentes  específicos  fuera  del  catálogo  oficial.  
 
3.8  Navegación  
Desde  Inicio  el  estudiante  puede  acceder  directamente  a:  
●  Curso.  ●  Lección.  ●  Evaluaciones.  ●  Calendario.  ●  Actividades.  ●  Mi  progreso.  ●  Certificados.  ●  Tutor  IA.  ●  Comunidad.  
Inicio  constituye  el  principal  nodo  de  navegación  del  ecosistema.  
 
3.9  Reglas  de  negocio  
El  comportamiento  del  módulo  deberá  cumplir  las  siguientes  reglas.  
●  Solo  podrá  existir  una  lección  marcada  como  "continuar".  ●  La  información  mostrada  será  específica  para  el  usuario  autenticado.  ●  Los  objetivos  semanales  se  actualizarán  automáticamente.  ●  Las  recomendaciones  dependerán  del  progreso  del  estudiante.  ●  El  contenido  de  Inicio  deberá  adaptarse  dinámicamente  a  la  evolución  del  
aprendizaje.
 ●  Ningún  bloque  mostrará  información  irrelevante  para  el  usuario.

3.10  Estados  
El  módulo  deberá  contemplar  los  siguientes  estados.  
Primera  utilización  
Presenta  una  experiencia  de  bienvenida  y  orientación.  
 
Sin  cursos  
Invita  al  usuario  a  incorporarse  a  su  primer  curso.  
 
Aprendizaje  activo  
Estado  habitual  con  todos  los  bloques  personalizados.  
 
Curso  completado  
Prioriza  certificados  y  recomendaciones  para  continuar  aprendiendo.  
 
Error  
Comunica  la  incidencia  utilizando  el  componente  Error  State.  
 
Cargando  
Utiliza  Skeleton  Loaders  manteniendo  la  estructura  de  la  página.  
 
3.11  Personalización  
Toda  la  información  deberá  personalizarse  utilizando:  
●  progreso;  ●  cursos  matriculados;  ●  actividad  reciente;

●  objetivos;  ●  recomendaciones;  ●  sesiones  próximas;  ●  logros  obtenidos.  
No  existirán  contenidos  genéricos  cuando  el  sistema  disponga  de  información  suficiente  
para
 
personalizar
 
la
 
experiencia.
 
 
3.12  Integraciones  
El  módulo  Inicio  consume  información  procedente  de:  
Dashboard          │          ├──  Courses          ├──  Progress          ├──  Activities          ├──  Calendar          ├──  Recommendations          ├──  Certificates          ├──  Achievements          ├──  Notifications          └──  AI  Tutor  
Inicio  actúa  como  agregador  de  información,  sin  asumir  responsabilidades  propias  de  estos  
módulos.
 
 
3.13  Métricas  
El  rendimiento  del  módulo  podrá  evaluarse  mediante  indicadores  como:  
●  tiempo  hasta  la  primera  acción;  ●  porcentaje  de  usuarios  que  continúan  una  lección  desde  Inicio;  ●  frecuencia  de  uso  diario;  ●  interacción  con  recomendaciones;  ●  cumplimiento  de  objetivos  semanales;  ●  utilización  del  botón  "Continuar".  
Estas  métricas  permiten  valorar  la  eficacia  del  módulo  como  punto  de  entrada  al  
aprendizaje.

3.14  Criterios  de  aceptación  
El  módulo  se  considerará  correctamente  implementado  cuando:  
●  el  usuario  pueda  reanudar  su  aprendizaje  desde  Inicio  con  una  única  acción;  ●  todos  los  bloques  reflejen  información  personalizada;  ●  la  navegación  hacia  los  módulos  relacionados  funcione  correctamente;  ●  los  estados  de  carga,  vacío  y  error  estén  contemplados;  ●  el  diseño  respete  el  Design  System;  ●  la  experiencia  sea  consistente  en  escritorio,  tableta  y  móvil.  
 
3.15  Evolución  futura  
En  futuras  versiones  el  módulo  podrá  incorporar:  
●  objetivos  adaptativos  generados  por  IA;  ●  resumen  diario  inteligente;  ●  recomendaciones  predictivas;  ●  eventos  personalizados;  ●  widgets  configurables  por  el  usuario;  ●  indicadores  avanzados  de  hábitos  de  aprendizaje.  
Estas  capacidades  deberán  integrarse  sin  alterar  la  estructura  conceptual  del  módulo.  
 
3.16  Declaración  del  módulo  Inicio  
El  módulo  Inicio  representa  el  centro  operativo  del  estudiante  dentro  de  
Elevate.
 
Su
 
misión
 
es
 
transformar
 
la
 
información
 
dispersa
 
de
 
la
 
plataforma
 
en
 
una
 
experiencia
 
personalizada,
 
clara
 
y
 
orientada
 
a
 
la
 
acción,
 
permitiendo
 
que
 
cada
 
usuario
 
retome
 
su
 
aprendizaje
 
de
 
forma
 
inmediata
 
y
 
mantenga
 
una
 
visión
 
constante
 
de
 
su
 
progreso,
 
sus
 
objetivos
 
y
 
las
 
oportunidades
 
disponibles
 
para
 
seguir
 
avanzando.
 
 
Capítulo  4  —  Learning  Modules

4.1  Propósito  
Los  Learning  Modules  constituyen  el  núcleo  académico  de  Elevate.  
Agrupan  todos  los  módulos  relacionados  con  el  consumo  del  contenido  educativo  y  
representan
 
el
 
recorrido
 
principal
 
del
 
estudiante
 
desde
 
su
 
incorporación
 
a
 
un
 
curso
 
hasta
 
la
 
finalización
 
de
 
las
 
evaluaciones.
 
Su  objetivo  es  ofrecer  una  experiencia  de  aprendizaje  estructurada,  progresiva  y  orientada  
al
 
desarrollo
 
continuo
 
de
 
competencias.
 
 
4.2  Módulos  incluidos  
Este  grupo  funcional  está  formado  por:  
●  Mis  cursos  ●  Curso  ●  Unidad  ●  Lección  ●  Evaluaciones  
Estos  módulos  conforman  el  recorrido  principal  del  aprendizaje.  
 
4.3  Objetivos  
Los  Learning  Modules  persiguen  los  siguientes  objetivos:  
●  facilitar  el  acceso  al  contenido;  ●  estructurar  el  aprendizaje  por  niveles;  ●  mantener  el  progreso  del  estudiante;  ●  favorecer  la  continuidad;  ●  reducir  la  carga  cognitiva;  ●  ofrecer  una  navegación  intuitiva  entre  contenidos.  
 
4.4  Flujo  principal  
El  recorrido  estándar  del  estudiante  será  el  siguiente:

Inicio      ↓  Mis  cursos      ↓  Curso      ↓  Unidad      ↓  Lección      ↓  Evaluación      ↓  Progreso  actualizado  
Este  flujo  constituye  el  camino  principal  de  aprendizaje  dentro  de  Elevate.  
 
4.5  Arquitectura  funcional  
Learning  │  ├──  Mis  cursos  │  ├──  Curso  │       │  │       ├──  Información  │       ├──  Unidades  │       ├──  Progreso  │       ├──  Profesor  │       └──  Recursos  │  ├──  Unidad  │       │  │       ├──  Lecciones  │       └──  Evaluación  │  ├──  Lección  │       │  │       ├──  Texto  │       ├──  Vídeo  │       ├──  Quiz  │       └──  Recursos  │  └──  Evaluaciones  
Cada  nivel  añade  contexto  sin  romper  la  continuidad  del  aprendizaje.

4.6  Navegación  
La  navegación  deberá  permitir  al  estudiante  conocer  en  todo  momento:  
●  el  curso  actual;  ●  la  unidad  activa;  ●  la  lección  actual;  ●  el  porcentaje  completado;  ●  la  siguiente  actividad  disponible.  
Nunca  deberá  perderse  el  contexto  del  recorrido.  
 
4.7  Continuidad  del  aprendizaje  
El  sistema  recordará  automáticamente:  
●  último  curso  abierto;  ●  última  unidad;  ●  última  lección;  ●  punto  exacto  de  progreso;  ●  contenido  pendiente.  
El  estudiante  podrá  continuar  exactamente  donde  abandonó  la  sesión  anterior.  
 
4.8  Desbloqueo  progresivo  
Elevate  utiliza  un  sistema  de  Sequential  Unlock .  
Las  reglas  generales  son:  
●  una  lección  debe  completarse  antes  de  desbloquear  la  siguiente  cuando  el  curso  lo  
requiera;
 ●  las  evaluaciones  respetan  las  reglas  de  desbloqueo  definidas  por  el  curso;  ●  el  progreso  se  actualiza  automáticamente  tras  completar  cada  elemento.  
El  comportamiento  concreto  dependerá  de  la  configuración  del  curso.

4.9  Tipos  de  contenido  
Las  lecciones  podrán  estar  compuestas  por  distintos  tipos  de  contenido.  
Versión  1.0:  
●  Texto  ●  Vídeo  ●  Quiz  
El  sistema  deberá  permitir  incorporar  nuevos  tipos  de  contenido  en  futuras  versiones  sin  
modificar
 
la
 
arquitectura
 
general.
 
 
4.10  Integraciones  
Los  Learning  Modules  colaboran  con:  
Progress  Achievements  Certificates  Activities  Calendar  Notifications  AI  Tutor  Dashboard  Recommendations  
Las  integraciones  deberán  producirse  mediante  servicios  compartidos  y  no  mediante  
dependencias
 
directas
 
entre
 
módulos.
 
 
4.11  Reglas  generales  
Todos  los  módulos  de  aprendizaje  deberán  cumplir  las  siguientes  reglas:  
●  registrar  automáticamente  el  progreso;  ●  mantener  sincronización  entre  dispositivos;  ●  respetar  los  permisos  del  usuario;  ●  conservar  el  estado  de  aprendizaje;  ●  ofrecer  feedback  inmediato;  ●  registrar  la  actividad  académica  relevante.

4.12  Estados  comunes  
Todos  los  Learning  Modules  compartirán  los  mismos  estados  funcionales.  
●  Inicial  ●  Cargando  ●  Disponible  ●  Sin  contenido  ●  Bloqueado  ●  Completado  ●  Error  
La  representación  visual  deberá  reutilizar  los  componentes  oficiales  del  Design  System.  
 
4.13  Componentes  compartidos  
Los  módulos  reutilizarán  los  siguientes  componentes:  
●  Course  Card  ●  Unit  Card  ●  Lesson  Card  ●  Progress  Bar  ●  Continue  Learning  ●  Badge  ●  Page  Header  ●  Tabs  ●  Breadcrumb  ●  Empty  State  ●  Loading  State  ●  Error  State  
La  reutilización  garantiza  una  experiencia  consistente.  
 
4.14  Métricas  
Los  indicadores  principales  serán:  
●  cursos  iniciados;

●  cursos  completados;  ●  unidades  completadas;  ●  lecciones  completadas;  ●  tiempo  de  estudio;  ●  porcentaje  de  finalización;  ●  evaluaciones  superadas;  ●  continuidad  entre  sesiones.  
Estas  métricas  alimentarán  el  Dashboard  y  el  módulo  Mi  Progreso.  
 
4.15  Declaración  de  los  Learning  
Modules
 
Los  Learning  Modules  constituyen  el  núcleo  de  la  experiencia  educativa  
de
 
Elevate.
 
Su
 
arquitectura
 
organiza
 
el
 
recorrido
 
del
 
estudiante
 
mediante
 
una
 
progresión
 
clara,
 
estructurada
 
y
 
personalizada,
 
garantizando
 
que
 
cada
 
paso
 
del
 
aprendizaje
 
mantenga
 
el
 
contexto,
 
registre
 
el
 
progreso
 
y
 
facilite
 
la
 
continuidad
 
hasta
 
la
 
consecución
 
de
 
los
 
objetivos
 
académicos.
 
 
Capítulo  4.1  —  Mis  Cursos  
 
4.1.1  Propósito  
El  módulo  Mis  Cursos  constituye  el  catálogo  personal  de  aprendizaje  del  estudiante.  
Su  propósito  es  ofrecer  una  visión  completa  de  todos  los  cursos  en  los  que  el  usuario  está  
matriculado,
 
permitiendo
 
localizar
 
rápidamente
 
cualquier
 
curso,
 
conocer
 
su
 
estado
 
y
 
acceder
 
al
 
punto
 
exacto
 
donde
 
debe
 
continuar.
 
Mis  Cursos  representa  la  biblioteca  personal  del  estudiante  dentro  de  Elevate.  
 
4.1.2  Objetivos  
El  módulo  persigue  los  siguientes  objetivos:

●  centralizar  todos  los  cursos  del  estudiante;  ●  facilitar  la  localización  de  cualquier  curso;  ●  mostrar  claramente  el  estado  de  progreso;  ●  permitir  continuar  el  aprendizaje  desde  cualquier  curso;  ●  favorecer  la  organización  del  itinerario  formativo.  
 
4.1.3  Alcance  
Incluye  
●  listado  de  cursos  matriculados;  ●  búsqueda;  ●  filtros;  ●  ordenación;  ●  progreso  individual;  ●  acceso  directo  al  curso;  ●  acceso  al  último  punto  de  aprendizaje.  
No  incluye  
●  contenido  del  curso;  ●  edición  de  cursos;  ●  administración  académica;  ●  creación  de  cursos.  
Estas  responsabilidades  pertenecen  al  módulo  Curso  y  al  área  administrativa.  
 
4.1.4  Actores  
Actor  Participación  
Estudiante  
Principal  
Sistema  Actualización  automática  del  progreso  
Profesor  Indirecta  mediante  la  gestión  del  contenido

4.1.5  Objetivos  de  experiencia  
Al  acceder  al  módulo  el  estudiante  debe  responder  inmediatamente  a  cuatro  preguntas:  
1.  ¿Qué  cursos  tengo  disponibles?  2.  ¿Cuál  debería  continuar?  3.  ¿Cuánto  he  avanzado  en  cada  curso?  4.  ¿Qué  cursos  he  terminado?  
Toda  la  información  necesaria  deberá  estar  disponible  sin  acceder  al  interior  de  cada  curso.  
 
4.1.6  Arquitectura  funcional  
Mis  Cursos  │  ├──  Header  │  ├──  Buscador  │  ├──  Filtros  │  ├──  Ordenación  │  ├──  Vista  de  cursos  │       │  │       ├──  Tarjeta  │       ├──  Progreso  │       ├──  Estado  │       ├──  Profesor  │       └──  Acción  principal  │  └──  Paginación  (si  fuera  necesaria)   
4.1.7  Estructura  de  la  pantalla  
La  organización  oficial  será:  
1.  Cabecera  de  página.  2.  Buscador.  3.  Barra  de  filtros.  4.  Contador  de  cursos.  5.  Rejilla  de  Course  Cards.

6.  Acciones  de  navegación.  
La  acción  principal  siempre  será  Continuar  curso .  
 
4.1.8  Información  de  cada  curso  
Cada  tarjeta  deberá  mostrar,  como  mínimo:  
●  imagen  de  portada;  ●  título;  ●  nivel  CEFR;  ●  profesor  responsable;  ●  porcentaje  de  progreso;  ●  número  de  unidades  completadas;  ●  estado  del  curso;  ●  última  actividad;  ●  botón  Continuar .  
La  información  deberá  ser  suficiente  para  decidir  si  continuar  ese  curso  sin  necesidad  de  
abrirlo.
 
 
4.1.9  Estados  del  curso  
Cada  curso  podrá  encontrarse  en  uno  de  los  siguientes  estados.  
Estado  Descripción  
No  iniciado  El  estudiante  aún  no  ha  comenzado  el  curso.  
En  progreso  
Existe  progreso  registrado.  
Completado  
Todas  las  unidades  y  evaluaciones  obligatorias  han  finalizado.  
Archivado  El  curso  ya  no  está  disponible  para  nuevas  actividades.  
El  estado  deberá  mostrarse  mediante  Badge  y  elementos  visuales  consistentes.

4.1.10  Búsqueda  
El  buscador  permitirá  localizar  cursos  por:  
●  nombre;  ●  nivel;  ●  profesor.  
La  búsqueda  deberá  actualizar  los  resultados  de  forma  inmediata.  
 
4.1.11  Filtros  
La  versión  1.0  contempla  los  siguientes  filtros:  
●  Todos  ●  En  progreso  ●  No  iniciados  ●  Completados  ●  Archivados  
Los  filtros  podrán  combinarse  con  la  búsqueda.  
 
4.1.12  Ordenación  
El  usuario  podrá  ordenar  los  cursos  por:  
●  Última  actividad.  ●  Progreso.  ●  Nombre.  ●  Nivel.  ●  Fecha  de  matrícula.  
Por  defecto  se  mostrará  Última  actividad .  
 
4.1.13  Course  Card  
La  Course  Card  constituye  el  componente  principal  del  módulo.

Cada  tarjeta  incluirá:  
●  portada  del  curso;  ●  título;  ●  nivel;  ●  profesor;  ●  barra  de  progreso;  ●  porcentaje;  ●  estado;  ●  acción  principal.  
La  tarjeta  completa  será  seleccionable  para  acceder  al  detalle  del  curso.  
 
4.1.14  Continuidad  del  aprendizaje  
Cuando  exista  progreso  previo,  el  botón  principal  deberá  abrir  directamente  la  siguiente  
lección
 
pendiente.
 
El  estudiante  nunca  deberá  buscar  manualmente  dónde  continuar.  
Esta  funcionalidad  reutiliza  el  sistema  Continue  Learning  definido  en  el  Product  
Architecture.
 
 
4.1.15  Estados  de  la  pantalla  
El  módulo  deberá  contemplar:  
Sin  cursos  
Invita  al  estudiante  a  contactar  con  su  profesor  o  administrador  para  obtener  acceso  a  
cursos.
 
 
Un  único  curso  
La  interfaz  prioriza  la  continuación  del  aprendizaje.  
 
Varios  cursos

Se  muestran  organizados  según  la  ordenación  seleccionada.  
 
Todos  completados  
La  pantalla  prioriza  el  acceso  a  certificados  y  recomendaciones.  
 
Cargando  
Utiliza  Skeleton  Cards.  
 
Error  
Utiliza  Error  State.  
 
4.1.16  Integraciones  
Mis  Cursos  obtiene  información  de:  
Enrollments        │  Courses        │  Progress        │  Dashboard        │  Recommendations  
Toda  la  información  procede  del  backend  y  se  presenta  de  forma  agregada.  
 
4.1.17  Reglas  de  negocio  
El  módulo  deberá  cumplir  las  siguientes  reglas.  
●  Solo  se  mostrarán  cursos  matriculados.  ●  El  progreso  siempre  será  el  registrado  oficialmente.

●  La  portada  del  curso  será  única.  ●  La  acción  principal  dependerá  del  estado  del  curso.  ●  El  progreso  se  actualizará  automáticamente  tras  completar  una  lección.  ●  Los  cursos  archivados  permanecerán  accesibles  únicamente  en  modo  consulta.  
 
4.1.18  Métricas  
El  módulo  permitirá  medir:  
●  frecuencia  de  acceso;  ●  cursos  iniciados;  ●  cursos  completados;  ●  tiempo  hasta  abrir  un  curso;  ●  uso  del  buscador;  ●  utilización  de  filtros;  ●  porcentaje  de  continuaciones  desde  "Continuar".  
 
4.1.19  Criterios  de  aceptación  
El  módulo  se  considerará  correctamente  implementado  cuando:  
●  todos  los  cursos  matriculados  aparezcan  correctamente;  ●  el  progreso  coincida  con  el  registrado  en  el  sistema;  ●  la  búsqueda  y  los  filtros  funcionen  conjuntamente;  ●  el  botón  Continuar  lleve  siempre  a  la  siguiente  lección  disponible;  ●  todos  los  estados  estén  contemplados;  ●  la  experiencia  sea  consistente  en  escritorio,  tableta  y  móvil.  
 
4.1.20  Evolución  futura  
Las  siguientes  capacidades  podrán  incorporarse  en  versiones  posteriores:  
●  agrupación  por  itinerarios;  ●  favoritos;  ●  colecciones  personalizadas;  ●  aprendizaje  recomendado  mediante  IA;  ●  comparación  de  progreso  entre  cursos;  ●  vistas  alternativas  (lista  y  tablero);

●  acceso  rápido  a  recursos  recientes  del  curso.  
 
4.1.21  Declaración  del  módulo  Mis  
Cursos
 
Mis  Cursos  representa  la  biblioteca  personal  de  aprendizaje  del  estudiante  
dentro
 
de
 
Elevate.
 
Su
 
misión
 
es
 
ofrecer
 
una
 
visión
 
clara,
 
organizada
 
y
 
siempre
 
actualizada
 
de
 
la
 
formación
 
disponible,
 
facilitando
 
el
 
acceso
 
inmediato
 
al
 
siguiente
 
paso
 
del
 
recorrido
 
educativo
 
y
 
eliminando
 
cualquier
 
fricción
 
entre
 
la
 
intención
 
de
 
aprender
 
y
 
el
 
inicio
 
efectivo
 
del
 
estudio.
 
 
Capítulo  4.2  —  Curso  
 
4.2.1  Propósito  
El  módulo  Curso  representa  el  espacio  principal  de  aprendizaje  dentro  de  Elevate.  
Su  propósito  es  organizar  todo  el  contenido  académico  de  un  curso,  mostrar  el  progreso  del  
estudiante
 
y
 
facilitar
 
el
 
acceso
 
ordenado
 
a
 
las
 
unidades,
 
lecciones
 
y
 
evaluaciones.
 
Desde  este  módulo  el  estudiante  comprende  la  estructura  completa  del  curso  y  puede  
avanzar
 
siguiendo
 
el
 
itinerario
 
definido.
 
 
4.2.2  Objetivos  
El  módulo  persigue  los  siguientes  objetivos:  
●  presentar  una  visión  global  del  curso;  ●  facilitar  la  navegación  entre  unidades;  ●  mostrar  el  progreso  del  estudiante;  ●  contextualizar  el  contenido  antes  de  comenzar;  ●  reforzar  la  continuidad  del  aprendizaje;  ●  servir  como  punto  de  entrada  a  todas  las  lecciones  del  curso.

4.2.3  Alcance  
Incluye  
●  información  general  del  curso;  ●  progreso;  ●  listado  de  unidades;  ●  estado  de  cada  unidad;  ●  acceso  a  las  lecciones;  ●  información  del  profesor;  ●  requisitos;  ●  certificación;  ●  recursos  generales.  
No  incluye  
●  visualización  del  contenido  de  las  lecciones;  ●  resolución  de  evaluaciones;  ●  edición  del  curso;  ●  administración  académica.  
 
4.2.4  Actores  
Actor  Participación  
Estudiante  
Principal  
Profesor  Responsable  del  contenido  
Sistema  Actualización  automática  del  progreso   
4.2.5  Objetivos  de  experiencia  
Al  acceder  al  curso  el  estudiante  debe  responder  inmediatamente  a  seis  preguntas:

1.  ¿Qué  aprenderé?  2.  ¿Cuánto  llevo  completado?  3.  ¿Qué  unidad  debo  hacer  ahora?  4.  ¿Qué  contenido  queda  pendiente?  5.  ¿Quién  imparte  este  curso?  6.  ¿Qué  obtendré  al  finalizarlo?  
 
4.2.6  Arquitectura  funcional  
Curso  │  ├──  Hero  ├──  Información  general  ├──  Barra  de  progreso  ├──  Unidades  │       ├──  Unidad  1  │       ├──  Unidad  2  │       ├──  Unidad  3  │       └──  ...  ├──  Profesor  ├──  Recursos  ├──  Certificación  └──  Información  adicional   
4.2.7  Hero  del  curso  
El  Hero  constituye  la  introducción  al  curso.  
Como  mínimo  incluirá:  
●  portada;  ●  nombre;  ●  nivel  CEFR;  ●  breve  descripción;  ●  duración  estimada;  ●  porcentaje  completado;  ●  botón  Continuar  aprendizaje .  
El  Hero  debe  permitir  al  estudiante  comprender  el  curso  de  un  vistazo.

4.2.8  Información  general  
La  sección  mostrará:  
●  descripción  completa;  ●  objetivos  de  aprendizaje;  ●  competencias  desarrolladas;  ●  duración  estimada;  ●  número  de  unidades;  ●  número  de  lecciones;  ●  número  de  evaluaciones.  
 
4.2.9  Progreso  
El  progreso  constituye  uno  de  los  elementos  principales  de  la  página.  
Se  mostrará  mediante:  
●  barra  de  progreso;  ●  porcentaje;  ●  unidades  completadas;  ●  lecciones  completadas;  ●  evaluación  pendiente  cuando  exista.  
Toda  la  información  deberá  actualizarse  automáticamente.  
 
4.2.10  Unidades  
Las  unidades  representan  la  estructura  principal  del  curso.  
Cada  unidad  mostrará:  
●  nombre;  ●  descripción;  ●  habilidad  principal;  ●  duración;  ●  número  de  lecciones;  ●  estado;  ●  progreso.  
La  lista  seguirá  el  orden  pedagógico  definido  por  el  curso.

4.2.11  Estado  de  las  unidades  
Cada  unidad  podrá  encontrarse  en  uno  de  los  siguientes  estados.  
Estado  Descripción  
Bloqueada  Aún  no  disponible.  
Disponible  Puede  iniciarse.  
En  progreso  
Contiene  actividad  realizada.  
Completada  
Finalizada  correctamente.  
El  estado  deberá  comunicarse  visualmente  mediante  el  Design  System.  
 
4.2.12  Sequential  Unlock  
Cuando  el  curso  tenga  activado  el  desbloqueo  secuencial:  
●  las  unidades  futuras  permanecerán  bloqueadas;  ●  el  sistema  mostrará  claramente  el  motivo  del  bloqueo;  ●  al  completar  una  unidad  se  desbloqueará  automáticamente  la  siguiente.  
Si  el  curso  no  utiliza  esta  modalidad,  todas  las  unidades  estarán  disponibles  desde  el  inicio.  
 
4.2.13  Profesor  
La  sección  del  profesor  incluirá:  
●  fotografía  o  avatar;  ●  nombre;  ●  breve  presentación;  ●  especialidad;  ●  idiomas;  ●  experiencia  relevante.

Su  finalidad  es  humanizar  la  experiencia  de  aprendizaje.  
 
4.2.14  Recursos  del  curso  
El  módulo  podrá  ofrecer  recursos  generales  como:  
●  material  descargable;  ●  enlaces  complementarios;  ●  bibliografía;  ●  recursos  multimedia;  ●  documentación  adicional.  
Estos  recursos  estarán  disponibles  durante  todo  el  curso.  
 
4.2.15  Certificación  
Cuando  el  curso  permita  obtener  certificado  se  mostrará:  
●  requisitos  necesarios;  ●  estado  actual;  ●  porcentaje  restante;  ●  acceso  al  certificado  una  vez  obtenido.  
El  estudiante  deberá  conocer  desde  el  inicio  qué  necesita  para  conseguir  la  certificación.  
 
4.2.16  Estados  de  la  pantalla  
El  módulo  deberá  contemplar:  
Curso  no  iniciado  
Presenta  la  información  general  y  anima  a  comenzar.  
 
Curso  en  progreso  
Prioriza  la  continuación  del  aprendizaje.

Curso  completado  
Destaca  la  certificación  y  las  recomendaciones  para  continuar.  
 
Curso  archivado  
Permite  consulta,  pero  limita  nuevas  acciones.  
 
Error  
Utiliza  Error  State.  
 
Cargando  
Utiliza  Skeleton  Layout.  
 
4.2.17  Integraciones  
El  módulo  Curso  consume  información  de:  
Courses       │  Units       │  Lessons       │  Progress       │  Assessments       │  Certificates       │  Recommendations

4.2.18  Reglas  de  negocio  
El  módulo  deberá  cumplir  las  siguientes  reglas.  
●  Solo  los  estudiantes  matriculados  podrán  acceder  al  curso.  ●  El  progreso  será  único  y  sincronizado  entre  dispositivos.  ●  Las  unidades  respetarán  el  orden  oficial  del  curso.  ●  El  desbloqueo  dependerá  de  la  configuración  del  curso.  ●  La  información  del  profesor  será  visible  para  todos  los  estudiantes  matriculados.  ●  El  porcentaje  de  progreso  se  recalculará  automáticamente  tras  completar  una  
lección
 
o
 
evaluación.
 
 
4.2.19  Métricas  
Entre  los  principales  indicadores  del  módulo:  
●  tiempo  medio  por  visita;  ●  porcentaje  de  estudiantes  que  inician  el  curso;  ●  porcentaje  de  estudiantes  que  completan  cada  unidad;  ●  abandono  por  unidad;  ●  utilización  del  botón  Continuar  aprendizaje ;  ●  finalización  del  curso.  
 
4.2.20  Criterios  de  aceptación  
El  módulo  se  considerará  correctamente  implementado  cuando:  
●  la  estructura  del  curso  refleje  fielmente  el  contenido  académico;  ●  el  progreso  se  actualice  automáticamente;  ●  las  unidades  respeten  las  reglas  de  desbloqueo;  ●  la  navegación  hacia  las  lecciones  funcione  correctamente;  ●  los  estados  visuales  sean  consistentes  con  el  Design  System;  ●  la  experiencia  sea  coherente  en  todos  los  dispositivos.  
 
4.2.21  Evolución  futura  
En  versiones  posteriores  podrán  incorporarse:

●  vista  de  mapa  del  curso;  ●  rutas  de  aprendizaje  alternativas;  ●  recomendaciones  específicas  por  unidad;  ●  comparación  de  progreso  con  cohortes;  ●  contenido  adaptativo  según  rendimiento;  ●  recursos  personalizados  mediante  IA.  
 
4.2.22  Declaración  del  módulo  Curso  
El  módulo  Curso  constituye  el  eje  organizador  del  aprendizaje  en  Elevate.  
Su
 
misión
 
es
 
ofrecer
 
una
 
visión
 
estructurada,
 
transparente
 
y
 
motivadora
 
del
 
recorrido
 
formativo,
 
permitiendo
 
al
 
estudiante
 
comprender
 
su
 
progreso,
 
acceder
 
al
 
contenido
 
en
 
el
 
momento
 
adecuado
 
y
 
avanzar
 
de
 
forma
 
continua
 
hasta
 
alcanzar
 
los
 
objetivos
 
académicos
 
y
 
la
 
certificación
 
correspondiente.
 
 
Capítulo  4.3  —  Unidad  
 
4.3.1  Propósito  
El  módulo  Unidad  representa  el  bloque  didáctico  principal  dentro  de  un  curso.  
Su  propósito  es  organizar  un  conjunto  coherente  de  lecciones  orientadas  al  desarrollo  de  
una
 
competencia
 
concreta,
 
facilitando
 
un
 
aprendizaje
 
progresivo
 
y
 
estructurado
 
antes
 
de
 
acceder
 
a
 
la
 
siguiente
 
unidad.
 
La  unidad  constituye  el  nivel  intermedio  entre  el  curso  y  las  lecciones.  
 
4.3.2  Objetivos  
El  módulo  persigue  los  siguientes  objetivos:  
●  agrupar  contenidos  relacionados;  ●  desarrollar  una  habilidad  específica;  ●  mostrar  claramente  el  progreso  dentro  de  la  unidad;

●  organizar  el  orden  de  las  lecciones;  ●  preparar  al  estudiante  para  la  evaluación  correspondiente.  
 
4.3.3  Alcance  
Incluye  
●  información  de  la  unidad;  ●  objetivos  de  aprendizaje;  ●  habilidad  principal;  ●  listado  de  lecciones;  ●  progreso;  ●  evaluación  de  la  unidad;  ●  recursos  específicos.  
No  incluye  
●  contenido  completo  de  las  lecciones;  ●  información  general  del  curso;  ●  certificación.  
 
4.3.4  Actores  
Actor  Participación  
Estudiante  
Principal  
Profesor  Responsable  del  contenido  
Sistema  Seguimiento  del  progreso   
4.3.5  Objetivos  de  experiencia  
Al  acceder  a  una  unidad  el  estudiante  debe  responder  inmediatamente  a  cinco  preguntas:  
1.  ¿Qué  voy  a  aprender  en  esta  unidad?

2.  ¿Qué  habilidad  voy  a  desarrollar?  3.  ¿Qué  lecciones  contiene?  4.  ¿Qué  me  falta  por  completar?  5.  ¿Cuál  es  el  siguiente  paso?  
 
4.3.6  Arquitectura  funcional  
Unidad  │  ├──  Header  ├──  Objetivos  ├──  Habilidad  principal  ├──  Progreso  ├──  Lecciones  │       ├──  Lección  1  │       ├──  Lección  2  │       ├──  Lección  3  │       └──  ...  ├──  Evaluación  └──  Recursos   
4.3.7  Header  de  la  unidad  
El  encabezado  deberá  incluir:  
●  nombre  de  la  unidad;  ●  breve  descripción;  ●  habilidad  principal;  ●  duración  estimada;  ●  número  de  lecciones;  ●  porcentaje  completado.  
Este  bloque  proporciona  el  contexto  necesario  antes  de  comenzar.  
 
4.3.8  Objetivos  de  aprendizaje  
Cada  unidad  mostrará  los  resultados  que  el  estudiante  alcanzará  al  finalizarla.  
Los  objetivos  deberán  expresarse  mediante  resultados  observables.

Ejemplos:  
●  utilizar  correctamente  el  Present  Simple;  ●  comprender  conversaciones  cotidianas;  ●  ampliar  el  vocabulario  relacionado  con  viajes;  ●  escribir  un  correo  electrónico  sencillo.  
 
4.3.9  Habilidad  principal  
Cada  unidad  podrá  asociarse  a  una  habilidad  principal.  
La  versión  1.0  contempla:  
●  Grammar  ●  Vocabulary  ●  Reading  ●  Listening  ●  Speaking  ●  Writing  
Esta  clasificación  alimenta  los  indicadores  de  progreso  y  las  futuras  recomendaciones  
personalizadas.
 
 
4.3.10  Lecciones  
Las  lecciones  constituyen  el  contenido  principal  de  la  unidad.  
Cada  lección  mostrará:  
●  título;  ●  tipo  de  contenido;  ●  duración  estimada;  ●  estado;  ●  progreso;  ●  acción  principal.  
Las  lecciones  aparecerán  siguiendo  el  orden  pedagógico  definido  por  el  profesor.  
 
4.3.11  Estados  de  las  lecciones

Cada  lección  podrá  encontrarse  en  uno  de  los  siguientes  estados.  
Estado  Descripción  
Bloqueada  No  disponible  todavía.  
Disponible  Puede  iniciarse.  
En  progreso  
Iniciada  pero  no  completada.  
Completada  
Finalizada  correctamente.  
Los  estados  deberán  representarse  mediante  los  componentes  oficiales  del  Design  System.  
 
4.3.12  Evaluación  de  la  unidad  
Cuando  exista  una  evaluación  asociada  se  mostrará  al  final  de  la  unidad.  
La  sección  incluirá:  
●  disponibilidad;  ●  estado;  ●  puntuación  obtenida  cuando  exista;  ●  requisitos  para  acceder.  
La  evaluación  deberá  integrarse  como  el  paso  final  de  la  unidad.  
 
4.3.13  Recursos  
Cada  unidad  podrá  incluir  recursos  específicos  como:  
●  documentos;  ●  ejercicios  descargables;  ●  enlaces  externos;  ●  material  complementario;  ●  glosarios.  
Estos  recursos  estarán  relacionados  únicamente  con  la  unidad  actual.

4.3.14  Progreso  
El  progreso  deberá  mostrarse  mediante:  
●  porcentaje  completado;  ●  número  de  lecciones  finalizadas;  ●  evaluación  completada  o  pendiente;  ●  indicador  visual  de  avance.  
La  información  deberá  actualizarse  automáticamente  tras  cada  acción  del  estudiante.  
 
4.3.15  Navegación  
Desde  la  unidad  el  estudiante  podrá  acceder  directamente  a:  
●  cualquier  lección  disponible;  ●  la  evaluación  de  la  unidad;  ●  la  unidad  anterior;  ●  la  siguiente  unidad  cuando  esté  desbloqueada;  ●  el  curso.  
La  navegación  deberá  mantener  siempre  el  contexto.  
 
4.3.16  Integraciones  
El  módulo  Unidad  obtiene  información  de:  
Course       │  Lessons       │  Progress       │  Assessments       │  Recommendations   
4.3.17  Reglas  de  negocio

El  módulo  deberá  cumplir  las  siguientes  reglas.  
●  Toda  unidad  pertenece  a  un  único  curso.  ●  Cada  lección  pertenece  únicamente  a  una  unidad.  ●  La  habilidad  principal  será  única  por  unidad.  ●  El  progreso  se  recalculará  automáticamente  tras  completar  una  lección.  ●  La  evaluación  solo  estará  disponible  cuando  se  cumplan  las  condiciones  definidas  
por
 
el
 
curso.
 ●  El  desbloqueo  de  nuevas  unidades  dependerá  de  las  reglas  del  curso.  
 
4.3.18  Métricas  
Los  indicadores  principales  serán:  
●  porcentaje  de  finalización  de  la  unidad;  ●  tiempo  medio  para  completarla;  ●  abandono  por  lección;  ●  resultados  de  la  evaluación;  ●  habilidad  desarrollada;  ●  utilización  de  recursos  complementarios.  
 
4.3.19  Criterios  de  aceptación  
El  módulo  se  considerará  correctamente  implementado  cuando:  
●  todas  las  lecciones  aparezcan  en  el  orden  definido;  ●  el  progreso  se  actualice  automáticamente;  ●  la  evaluación  respete  las  reglas  de  disponibilidad;  ●  la  navegación  mantenga  el  contexto  del  curso;  ●  todos  los  estados  visuales  sean  consistentes;  ●  la  experiencia  funcione  correctamente  en  todos  los  dispositivos.  
 
4.3.20  Evolución  futura  
En  futuras  versiones  podrán  incorporarse:  
●  objetivos  adaptativos  según  el  rendimiento;  ●  rutas  alternativas  dentro  de  una  unidad;

●  recomendaciones  específicas  por  habilidad;  ●  contenido  opcional;  ●  actividades  colaborativas;  ●  recursos  generados  mediante  IA.  
 
4.3.21  Declaración  del  módulo  Unidad  
La  Unidad  constituye  el  bloque  didáctico  fundamental  del  aprendizaje  en  
Elevate.
 
Organiza
 
el
 
contenido
 
en
 
torno
 
a
 
una
 
competencia
 
concreta,
 
ofreciendo
 
un
 
recorrido
 
claro
 
entre
 
objetivos,
 
lecciones
 
y
 
evaluación.
 
Su
 
estructura
 
garantiza
 
que
 
el
 
estudiante
 
avance
 
de
 
forma
 
progresiva,
 
comprendiendo
 
en
 
todo
 
momento
 
qué
 
está
 
aprendiendo,
 
cuánto
 
ha
 
progresado
 
y
 
cuál
 
es
 
el
 
siguiente
 
paso
 
dentro
 
de
 
su
 
itinerario
 
formativo.
 
 
Capítulo  4.4  —  Lección  
 
4.4.1  Propósito  
La  Lección  representa  la  unidad  mínima  de  aprendizaje  dentro  de  Elevate.  
Es  el  lugar  donde  el  estudiante  consume  el  contenido  educativo,  desarrolla  competencias  y  
registra
 
el
 
progreso
 
real
 
del
 
curso.
 
Todo  el  recorrido  académico  converge  en  este  módulo,  por  lo  que  constituye  el  núcleo  de  la  
experiencia
 
de
 
aprendizaje
 
de
 
la
 
plataforma.
 
 
4.4.2  Objetivos  
El  módulo  persigue  los  siguientes  objetivos:  
●  facilitar  una  experiencia  de  aprendizaje  inmersiva;  ●  minimizar  las  distracciones;  ●  adaptar  la  presentación  al  tipo  de  contenido;  ●  registrar  automáticamente  el  progreso;  ●  mantener  la  continuidad  entre  lecciones;

●  facilitar  la  transición  hacia  la  siguiente  actividad.  
 
4.4.3  Alcance  
Incluye  
●  contenido  educativo;  ●  navegación  entre  lecciones;  ●  progreso;  ●  Tutor  IA  contextual;  ●  recursos;  ●  acciones  de  aprendizaje;  ●  finalización  de  la  lección.  
No  incluye  
●  estructura  general  del  curso;  ●  administración  del  contenido;  ●  gestión  del  progreso  global.  
 
4.4.4  Actores  
Actor  Participación  
Estudiante  
Principal  
Profesor  Autor  del  contenido  
Sistema  Registro  del  progreso  
Tutor  IA  Asistencia  contextual   
4.4.5  Objetivos  de  experiencia  
Durante  una  lección  el  estudiante  debe  poder  responder  continuamente  a  las  siguientes  
preguntas:

1.  ¿Qué  estoy  aprendiendo?  2.  ¿Qué  debo  hacer  ahora?  3.  ¿Cuánto  me  queda?  4.  ¿Puedo  resolver  una  duda?  5.  ¿Cuál  será  el  siguiente  paso?  
La  interfaz  deberá  mantener  el  foco  en  el  contenido  educativo.  
 
4.4.6  Arquitectura  funcional  
Lección  │  ├──  Header  ├──  Información  contextual  ├──  Contenido  principal  ├──  Recursos  ├──  Tutor  IA  ├──  Navegación  └──  Finalización   
4.4.7  Header  
El  encabezado  mostrará:  
●  nombre  de  la  lección;  ●  curso;  ●  unidad;  ●  tipo  de  contenido;  ●  progreso  dentro  de  la  unidad.  
El  estudiante  deberá  mantener  siempre  el  contexto  del  recorrido  académico.  
 
4.4.8  Tipos  de  lección  
La  versión  1.0  soporta  tres  tipos  oficiales.  
Tipo  Objetivo  
TEXT  Explicación  de  contenidos.

VIDEO  Aprendizaje  audiovisual.  
QUIZ  Consolidación  y  evaluación  rápida.  
La  arquitectura  permitirá  incorporar  nuevos  tipos  de  contenido  en  versiones  futuras  sin  
modificar
 
la
 
estructura
 
del
 
módulo.
 
 
4.4.9  Lecciones  de  texto  
Las  lecciones  de  tipo  TEXT  estarán  orientadas  a  la  lectura  estructurada.  
Podrán  incluir:  
●  explicaciones;  ●  ejemplos;  ●  imágenes;  ●  tablas;  ●  listas;  ●  bloques  destacados;  ●  recursos  descargables.  
El  contenido  deberá  dividirse  en  secciones  claramente  identificables  para  facilitar  la  lectura.  
 
4.4.10  Lecciones  de  vídeo  
Las  lecciones  VIDEO  centran  la  experiencia  en  un  recurso  audiovisual.  
La  interfaz  incluirá:  
●  reproductor;  ●  descripción;  ●  duración;  ●  objetivos;  ●  recursos  complementarios;  ●  transcripción  cuando  esté  disponible.  
El  estudiante  podrá  abandonar  y  retomar  el  vídeo  manteniendo  su  posición.

4.4.11  Lecciones  tipo  Quiz  
Las  lecciones  QUIZ  permiten  comprobar  la  comprensión  inmediata  de  los  contenidos.  
Podrán  incluir:  
●  preguntas  de  opción  múltiple;  ●  verdadero  o  falso;  ●  completar  espacios;  ●  asociación  de  conceptos.  
Al  finalizar,  el  sistema  mostrará  el  resultado  y  actualizará  el  progreso  según  las  reglas  del  
curso.
 
 
4.4.12  Recursos  complementarios  
Cada  lección  podrá  incorporar  recursos  adicionales  como:  
●  documentos;  ●  enlaces;  ●  vocabulario;  ●  material  descargable;  ●  ejercicios  opcionales.  
Estos  recursos  enriquecen  el  aprendizaje,  pero  no  sustituyen  al  contenido  principal.  
 
4.4.13  Tutor  IA  
El  Tutor  IA  estará  disponible  durante  toda  la  lección  como  ayuda  contextual.  
Permitirá:  
●  resolver  dudas;  ●  explicar  conceptos;  ●  ampliar  información;  ●  proponer  ejemplos;  ●  aclarar  vocabulario;  ●  ofrecer  explicaciones  alternativas.  
El  Tutor  IA  complementa  el  aprendizaje,  pero  no  modifica  el  contenido  oficial  de  la  lección.

4.4.14  Registro  del  progreso  
El  sistema  actualizará  automáticamente:  
●  tiempo  dedicado;  ●  porcentaje  de  lectura;  ●  posición  del  vídeo;  ●  preguntas  respondidas;  ●  estado  de  finalización.  
El  estudiante  nunca  deberá  guardar  manualmente  su  progreso.  
 
4.4.15  Finalización  
Una  lección  se  considerará  completada  cuando  se  cumplan  las  condiciones  definidas  por  su  
tipo.
 
Ejemplos:  
●  lectura  completada;  ●  vídeo  visualizado  según  el  criterio  establecido;  ●  cuestionario  enviado.  
Al  completarse  correctamente:  
●  se  actualizará  el  progreso;  ●  podrán  desbloquearse  nuevas  lecciones;  ●  se  evaluarán  logros;  ●  se  actualizarán  recomendaciones;  ●  podrá  habilitarse  la  evaluación  correspondiente.  
 
4.4.16  Navegación  
La  navegación  permitirá  acceder  a:  
●  lección  anterior;  ●  lección  siguiente;  ●  unidad;

●  curso.  
Cuando  exista  una  siguiente  lección  disponible,  el  botón  principal  será  Continuar .  
 
4.4.17  Estados  
El  módulo  deberá  contemplar:  
Disponible  
La  lección  puede  iniciarse.  
 
En  progreso  
Existe  actividad  registrada.  
 
Completada  
Se  han  cumplido  todas  las  condiciones  de  finalización.  
 
Bloqueada  
La  lección  permanece  inaccesible  hasta  cumplir  los  requisitos  establecidos.  
 
Error  
Utiliza  Error  State.  
 
Cargando  
Utiliza  Skeleton  Layout.

4.4.18  Integraciones  
La  lección  interactúa  con:  
Lessons        │  Progress        │  Achievements        │  Recommendations        │  AI  Tutor        │  Assessments        │  Dashboard  
Toda  la  actualización  del  progreso  se  realiza  automáticamente  mediante  los  servicios  
correspondientes.
 
 
4.4.19  Reglas  de  negocio  
El  módulo  deberá  cumplir  las  siguientes  reglas.  
●  Solo  podrán  acceder  estudiantes  matriculados.  ●  El  progreso  se  registrará  automáticamente.  ●  Cada  lección  pertenecerá  a  una  única  unidad.  ●  La  finalización  dependerá  del  tipo  de  contenido.  ●  El  desbloqueo  de  nuevas  lecciones  seguirá  las  reglas  del  curso.  ●  El  Tutor  IA  estará  disponible  durante  toda  la  experiencia,  salvo  incidencias  técnicas.  
 
4.4.20  Métricas  
Entre  los  principales  indicadores:  
●  porcentaje  de  finalización;  ●  tiempo  medio  por  lección;  ●  abandono;  ●  utilización  del  Tutor  IA;  ●  tasa  de  finalización  en  el  primer  intento;

●  interacción  con  recursos  complementarios.  
 
4.4.21  Criterios  de  aceptación  
El  módulo  se  considerará  correctamente  implementado  cuando:  
●  cada  tipo  de  lección  presente  correctamente  su  contenido;  ●  el  progreso  se  registre  automáticamente;  ●  el  Tutor  IA  funcione  de  forma  contextual;  ●  la  navegación  entre  lecciones  mantenga  el  contexto;  ●  los  estados  visuales  sean  consistentes  con  el  Design  System;  ●  la  experiencia  sea  fluida  en  escritorio,  tableta  y  móvil.  
 
4.4.22  Evolución  futura  
En  versiones  posteriores  podrán  incorporarse:  
●  simulaciones  interactivas;  ●  ejercicios  prácticos  corregidos  por  IA;  ●  laboratorios  conversacionales;  ●  realidad  aumentada  y  realidad  virtual;  ●  aprendizaje  adaptativo  en  tiempo  real;  ●  contenidos  generados  dinámicamente  según  el  rendimiento.  
 
4.4.23  Declaración  del  módulo  Lección  
La  Lección  constituye  el  núcleo  de  la  experiencia  educativa  de  Elevate.  Es  
el
 
espacio
 
donde
 
el
 
conocimiento
 
se
 
transforma
 
en
 
aprendizaje
 
mediante
 
contenidos
 
estructurados,
 
asistencia
 
inteligente
 
y
 
un
 
seguimiento
 
continuo
 
del
 
progreso.
 
Su
 
diseño
 
prioriza
 
la
 
concentración,
 
la
 
comprensión
 
y
 
la
 
continuidad,
 
permitiendo
 
que
 
cada
 
interacción
 
contribuya
 
de
 
forma
 
directa
 
al
 
desarrollo
 
de
 
las
 
competencias
 
del
 
estudiante.

Capítulo  4.5  —  Evaluaciones  
 
4.5.1  Propósito  
El  módulo  Evaluaciones  verifica  la  adquisición  de  conocimientos  y  competencias  por  parte  
del
 
estudiante
 
a
 
lo
 
largo
 
de
 
su
 
itinerario
 
de
 
aprendizaje.
 
Su  propósito  es  medir  objetivamente  el  progreso  académico,  proporcionar  retroalimentación  
útil
 
y
 
determinar
 
el
 
cumplimiento
 
de
 
los
 
requisitos
 
necesarios
 
para
 
avanzar
 
dentro
 
del
 
curso
 
y
 
obtener
 
la
 
certificación
 
correspondiente.
 
Las  evaluaciones  forman  parte  del  proceso  de  aprendizaje,  no  constituyen  únicamente  un  
mecanismo
 
de
 
calificación.
 
 
4.5.2  Objetivos  
El  módulo  persigue  los  siguientes  objetivos:  
●  comprobar  el  nivel  de  comprensión;  ●  reforzar  el  aprendizaje  mediante  retroalimentación;  ●  identificar  áreas  de  mejora;  ●  registrar  resultados  académicos;  ●  desbloquear  nuevo  contenido  cuando  corresponda;  ●  contribuir  a  la  obtención  del  certificado  del  curso.  
 
4.5.3  Alcance  
Incluye  
●  listado  de  evaluaciones;  ●  realización  de  pruebas;  ●  puntuaciones;  ●  retroalimentación;  ●  historial  de  intentos;  ●  estado  de  aprobación;  ●  integración  con  el  progreso.

No  incluye  
●  contenido  formativo;  ●  edición  de  evaluaciones;  ●  creación  de  preguntas.  
 
4.5.4  Actores  
Actor  Participación  
Estudiante  
Principal  
Profesor  Diseña  y  gestiona  las  evaluaciones  
Sistema  Corrección  automática  y  actualización  del  progreso   
4.5.5  Objetivos  de  experiencia  
Al  realizar  una  evaluación  el  estudiante  debe  conocer  en  todo  momento:  
1.  Qué  se  está  evaluando.  2.  Cuántas  preguntas  quedan.  3.  Cuánto  tiempo  dispone,  si  aplica.  4.  Qué  resultado  ha  obtenido.  5.  Qué  debe  hacer  después.  
La  experiencia  debe  reducir  la  incertidumbre  y  favorecer  la  concentración.  
 
4.5.6  Arquitectura  funcional  
Evaluaciones  │  ├──  Listado  ├──  Detalle  ├──  Instrucciones  ├──  Realización  ├──  Resultados

├──  Historial  └──  Recomendaciones   
4.5.7  Tipos  de  evaluación  
La  versión  1.0  contempla  los  siguientes  tipos:  
●  Quiz  de  unidad.  ●  Evaluación  final  de  curso.  ●  Prueba  diagnóstica.  ●  Evaluación  práctica.  
La  arquitectura  permitirá  incorporar  nuevos  formatos  en  futuras  versiones.  
 
4.5.8  Información  de  la  evaluación  
Antes  de  comenzar,  el  estudiante  visualizará:  
●  título;  ●  descripción;  ●  objetivo;  ●  unidad  o  curso  asociado;  ●  número  de  preguntas;  ●  duración  estimada;  ●  tiempo  límite,  si  existe;  ●  puntuación  mínima  para  aprobar;  ●  número  de  intentos  permitidos.  
Esta  información  deberá  mostrarse  de  forma  clara  antes  de  iniciar  la  prueba.  
 
4.5.9  Desarrollo  de  la  evaluación  
Durante  la  realización  de  la  prueba  se  mostrará:  
●  progreso  de  preguntas;  ●  navegación  entre  preguntas  cuando  esté  permitida;  ●  temporizador,  si  aplica;  ●  estado  de  las  respuestas;  ●  botón  de  envío.

La  interfaz  minimizará  elementos  ajenos  a  la  evaluación.  
 
4.5.10  Finalización  
Al  enviar  una  evaluación  el  sistema  deberá:  
●  registrar  el  intento;  ●  calcular  la  puntuación;  ●  determinar  si  ha  sido  superada;  ●  actualizar  el  progreso;  ●  desbloquear  contenido  cuando  corresponda;  ●  registrar  logros  relacionados.  
La  corrección  deberá  realizarse  automáticamente  cuando  el  tipo  de  prueba  lo  permita.  
 
4.5.11  Resultados  
La  pantalla  de  resultados  incluirá:  
●  puntuación  obtenida;  ●  porcentaje;  ●  estado  (Aprobada  /  No  aprobada);  ●  respuestas  correctas  e  incorrectas  cuando  la  configuración  lo  permita;  ●  recomendaciones  para  continuar.  
El  objetivo  principal  es  favorecer  el  aprendizaje,  no  únicamente  comunicar  una  nota.  
 
4.5.12  Intentos  
Cada  evaluación  podrá  definir:  
●  un  único  intento;  ●  varios  intentos  limitados;  ●  intentos  ilimitados.  
Cuando  existan  varios  intentos,  el  sistema  mostrará:  
●  intentos  realizados;  ●  intentos  restantes;

●  mejor  resultado  obtenido.  
 
4.5.13  Estados  
Cada  evaluación  podrá  encontrarse  en  uno  de  los  siguientes  estados.  
Estado  Descripción  
Disponible  Puede  iniciarse.  
En  curso  Existe  un  intento  activo.  
Completada  Finalizada  correctamente.  
Aprobada  Se  ha  alcanzado  la  puntuación  requerida.  
No  aprobada  
No  se  ha  alcanzado  la  puntuación  mínima.  
Bloqueada  No  cumple  los  requisitos  para  iniciarse.   
4.5.14  Retroalimentación  
La  retroalimentación  deberá  adaptarse  a  la  configuración  de  la  evaluación.  
Podrá  incluir:  
●  explicación  de  respuestas;  ●  referencias  a  las  lecciones  relacionadas;  ●  recomendaciones  de  repaso;  ●  sugerencias  del  Tutor  IA.  
El  feedback  deberá  favorecer  la  mejora  continua.  
 
4.5.15  Integraciones  
El  módulo  Evaluaciones  interactúa  con:  
Assessments        │

Progress        │  Lessons        │  Achievements        │  Certificates        │  Recommendations        │  AI  Tutor  
Los  resultados  alimentan  automáticamente  el  resto  del  ecosistema.  
 
4.5.16  Reglas  de  negocio  
El  módulo  deberá  cumplir  las  siguientes  reglas.  
●  Solo  los  estudiantes  matriculados  podrán  realizar  una  evaluación.  ●  Los  intentos  deberán  respetar  el  límite  definido.  ●  La  puntuación  se  almacenará  automáticamente.  ●  El  progreso  solo  se  actualizará  cuando  se  cumplan  las  reglas  establecidas.  ●  La  obtención  del  certificado  dependerá  de  los  requisitos  del  curso.  ●  Toda  evaluación  quedará  asociada  al  historial  académico  del  estudiante.  
 
4.5.17  Métricas  
Los  indicadores  principales  serán:  
●  tasa  de  aprobación;  ●  puntuación  media;  ●  número  medio  de  intentos;  ●  tiempo  medio  de  realización;  ●  preguntas  con  mayor  índice  de  error;  ●  abandono  de  evaluaciones.  
Estos  indicadores  permitirán  mejorar  tanto  el  contenido  como  el  diseño  de  las  evaluaciones.

4.5.18  Criterios  de  aceptación  
El  módulo  se  considerará  correctamente  implementado  cuando:  
●  el  estudiante  pueda  completar  la  evaluación  sin  perder  el  progreso;  ●  la  puntuación  se  calcule  correctamente;  ●  los  intentos  respeten  la  configuración  establecida;  ●  el  progreso  y  los  logros  se  actualicen  automáticamente;  ●  la  retroalimentación  se  muestre  según  las  reglas  definidas;  ●  la  experiencia  sea  consistente  en  todos  los  dispositivos.  
 
4.5.19  Evolución  futura  
En  futuras  versiones  podrán  incorporarse:  
●  preguntas  adaptativas  mediante  IA;  ●  ejercicios  de  expresión  oral  evaluados  automáticamente;  ●  evaluación  de  escritura  mediante  IA;  ●  bancos  dinámicos  de  preguntas;  ●  pruebas  colaborativas;  ●  exámenes  supervisados  (proctoring)  para  certificaciones  oficiales.  
 
4.5.20  Declaración  del  módulo  
Evaluaciones
 
El  módulo  Evaluaciones  garantiza  que  el  aprendizaje  en  Elevate  pueda  
medirse
 
de
 
forma
 
objetiva,
 
transparente
 
y
 
orientada
 
a
 
la
 
mejora
 
continua.
 
Más
 
allá
 
de
 
asignar
 
una
 
puntuación,
 
cada
 
evaluación
 
proporciona
 
información
 
útil
 
al
 
estudiante,
 
actualiza
 
su
 
progreso
 
y
 
conecta
 
el
 
rendimiento
 
académico
 
con
 
el
 
resto
 
del
 
ecosistema,
 
impulsando
 
un
 
aprendizaje
 
más
 
eficaz
 
y
 
personalizado.
 
  
Capítulo  5  —  Progress  Modules

5.1  Propósito  
Los  Progress  Modules  proporcionan  al  estudiante  una  visión  completa  de  su  evolución  
dentro
 
de
 
Elevate.
 
Su  objetivo  es  transformar  los  datos  generados  durante  el  aprendizaje  en  información  
comprensible,
 
útil
 
y
 
motivadora,
 
permitiendo
 
al
 
usuario
 
conocer
 
su
 
rendimiento,
 
identificar
 
áreas
 
de
 
mejora
 
y
 
mantener
 
una
 
visión
 
clara
 
de
 
sus
 
objetivos
 
académicos.
 
Estos  módulos  convierten  el  progreso  en  un  elemento  activo  de  la  experiencia  de  
aprendizaje.
 
 
5.2  Módulos  incluidos  
Este  grupo  funcional  está  formado  por:  
●  Mi  Progreso  ●  Certificados  ●  Logros  (Achievements)  
Estos  módulos  reflejan  los  resultados  del  aprendizaje  realizado  en  la  plataforma.  
 
5.3  Objetivos  
Los  Progress  Modules  persiguen  los  siguientes  objetivos:  
●  visualizar  el  progreso  del  estudiante;  ●  reforzar  la  motivación;  ●  mostrar  la  evolución  temporal;  ●  destacar  los  logros  obtenidos;  ●  facilitar  el  acceso  a  las  certificaciones;  ●  proporcionar  información  para  mejorar  el  aprendizaje.  
 
5.4  Flujo  principal  
El  recorrido  habitual  será:  
Curso

↓  Lección      ↓  Evaluación      ↓  Actualización  del  progreso      ↓  Logros      ↓  Certificados  
Todo  el  progreso  registrado  durante  el  aprendizaje  se  refleja  automáticamente  en  estos  
módulos.
 
 
5.5  Arquitectura  funcional  
Progress  │  ├──  Mi  Progreso  │  ├──  Certificados  │  └──  Logros  
Cada  módulo  tiene  una  responsabilidad  específica,  pero  todos  comparten  la  misma  fuente  
de
 
datos.
 
 
5.6  Principios  
Los  Progress  Modules  deberán  cumplir  los  siguientes  principios:  
●  información  siempre  actualizada;  ●  métricas  comprensibles;  ●  visualización  clara;  ●  motivación  positiva;  ●  coherencia  con  el  recorrido  del  estudiante;  ●  personalización.

5.7  Información  compartida  
Todos  los  módulos  reutilizan  información  procedente  de:  
●  progreso  académico;  ●  cursos;  ●  evaluaciones;  ●  logros;  ●  certificados;  ●  actividad  reciente.  
No  deberán  almacenar  información  duplicada.  
 
5.8  Integraciones  
Los  Progress  Modules  reciben  información  de:  
Lessons       │  Assessments       │  Courses       │  Achievements       │  Certificates       │  Dashboard  
La  actualización  será  completamente  automática.  
 
5.9  Componentes  compartidos  
Todos  los  módulos  reutilizarán  componentes  oficiales  como:  
●  Progress  Bar  ●  Statistic  Card  ●  Achievement  Card  ●  Certificate  Card  ●  Timeline  ●  Badge

●  Empty  State  ●  Loading  State  ●  Error  State  
 
5.10  Estados  comunes  
Todos  los  módulos  compartirán  los  siguientes  estados:  
●  Sin  actividad.  ●  Con  progreso.  ●  Curso  completado.  ●  Nuevos  logros.  ●  Error.  ●  Cargando.  
 
5.11  Declaración  de  los  Progress  
Modules
 
Los  Progress  Modules  convierten  la  actividad  académica  del  estudiante  
en
 
una
 
representación
 
clara
 
de
 
su
 
evolución.
 
Su
 
misión
 
es
 
proporcionar
 
visibilidad
 
sobre
 
el
 
aprendizaje
 
realizado,
 
reforzar
 
la
 
motivación
 
y
 
conectar
 
el
 
esfuerzo
 
diario
 
con
 
resultados
 
tangibles
 
como
 
logros
 
y
 
certificaciones.
 
 
Capítulo  5.1  —  Mi  Progreso  
 
5.1.1  Propósito  
Mi  Progreso  constituye  el  panel  analítico  personal  del  estudiante.  
Su  propósito  es  ofrecer  una  visión  completa  del  rendimiento  académico,  permitiendo  
comprender
 
la
 
evolución
 
del
 
aprendizaje,
 
identificar
 
fortalezas
 
y
 
detectar
 
oportunidades
 
de
 
mejora.

No  se  limita  a  mostrar  porcentajes;  proporciona  una  interpretación  visual  del  recorrido  del  
estudiante
 
dentro
 
de
 
Elevate.
 
 
5.1.2  Objetivos  
El  módulo  persigue  los  siguientes  objetivos:  
●  mostrar  el  progreso  global;  ●  visualizar  la  evolución  temporal;  ●  representar  el  desarrollo  de  habilidades;  ●  reforzar  la  motivación  mediante  indicadores;  ●  facilitar  el  seguimiento  de  objetivos.  
 
5.1.3  Alcance  
Incluye  
●  progreso  general;  ●  estadísticas;  ●  evolución;  ●  habilidades;  ●  actividad  reciente;  ●  objetivos;  ●  tiempo  de  estudio;  ●  resumen  académico.  
No  incluye  
●  certificados;  ●  gestión  de  cursos;  ●  contenido  educativo.  
 
5.1.4  Actores  
Actor  Participación

Estudiante  
Principal  
Sistema  Actualización  automática   
5.1.5  Objetivos  de  experiencia  
El  estudiante  debe  responder  inmediatamente  a  las  siguientes  preguntas:  
1.  ¿Cómo  voy?  2.  ¿Estoy  mejorando?  3.  ¿Qué  habilidades  tengo  más  desarrolladas?  4.  ¿Qué  necesito  reforzar?  5.  ¿Qué  objetivo  debería  alcanzar  ahora?  
 
5.1.6  Arquitectura  funcional  
Mi  Progreso  │  ├──  Resumen  ├──  Estadísticas  ├──  Evolución  ├──  Skill  Radar  ├──  Objetivos  ├──  Actividad  reciente  └──  Recomendaciones   
5.1.7  Resumen  general  
La  parte  superior  mostrará  una  visión  rápida  del  progreso.  
Incluirá:  
●  progreso  global;  ●  cursos  activos;  ●  cursos  completados;  ●  tiempo  total  de  estudio;  ●  racha  de  aprendizaje;  ●  último  acceso.

Este  bloque  permite  comprender  el  estado  general  de  un  vistazo.  
 
5.1.8  Estadísticas  
Entre  los  indicadores  principales:  
●  lecciones  completadas;  ●  unidades  completadas;  ●  evaluaciones  superadas;  ●  porcentaje  de  finalización;  ●  tiempo  de  estudio;  ●  días  consecutivos  de  actividad.  
Toda  la  información  deberá  actualizarse  automáticamente.  
 
5.1.9  Evolución  temporal  
El  módulo  mostrará  la  evolución  del  aprendizaje  mediante  gráficos.  
La  versión  1.0  permitirá  visualizar:  
●  últimos  7  días;  ●  últimos  30  días;  ●  últimos  90  días;  ●  evolución  histórica.  
El  objetivo  es  mostrar  tendencias,  no  únicamente  valores  absolutos.  
 
5.1.10  Skill  Radar  
El  Skill  Radar  representa  el  desarrollo  de  las  competencias  principales  del  idioma.  
Las  habilidades  contempladas  son:  
●  Grammar  ●  Vocabulary  ●  Reading  ●  Listening  ●  Speaking

●  Writing  
Cada  indicador  se  calculará  a  partir  del  progreso  registrado  en  cursos,  lecciones  y  
evaluaciones.
 
 
5.1.11  Objetivos  
El  estudiante  visualizará:  
●  objetivos  semanales;  ●  porcentaje  de  cumplimiento;  ●  progreso  acumulado;  ●  próximos  hitos.  
Los  objetivos  deberán  sincronizarse  con  el  Dashboard.  
 
5.1.12  Actividad  reciente  
La  cronología  mostrará  acciones  como:  
●  lecciones  completadas;  ●  evaluaciones  realizadas;  ●  logros  desbloqueados;  ●  certificados  obtenidos;  ●  sesiones  asistidas.  
La  actividad  reciente  facilita  la  revisión  del  aprendizaje  realizado.  
 
5.1.13  Recomendaciones  
El  módulo  podrá  sugerir:  
●  habilidades  para  reforzar;  ●  cursos  relacionados;  ●  nuevas  actividades;  ●  contenidos  pendientes;  ●  recomendaciones  del  Tutor  IA.  
Las  sugerencias  deberán  basarse  en  datos  reales  del  estudiante.

5.1.14  Integraciones  
Mi  Progreso  obtiene  información  de:  
Progress       │  Courses       │  Lessons       │  Assessments       │  Achievements       │  Dashboard       │  Recommendations   
5.1.15  Reglas  de  negocio  
El  módulo  deberá  cumplir  las  siguientes  reglas.  
●  El  progreso  se  actualizará  automáticamente.  ●  Las  estadísticas  reflejarán  únicamente  información  validada.  ●  Las  habilidades  utilizarán  los  datos  oficiales  del  sistema.  ●  Las  recomendaciones  dependerán  del  rendimiento  del  estudiante.  ●  Ningún  dato  podrá  modificarse  manualmente  desde  este  módulo.  
 
5.1.16  Métricas  
El  propio  módulo  permitirá  medir:  
●  frecuencia  de  consulta;  ●  utilización  de  gráficos;  ●  interacción  con  recomendaciones;  ●  cumplimiento  de  objetivos;  ●  evolución  de  habilidades;  ●  tiempo  dedicado  al  aprendizaje.

5.1.17  Criterios  de  aceptación  
El  módulo  se  considerará  correctamente  implementado  cuando:  
●  todas  las  métricas  se  actualicen  automáticamente;  ●  el  Skill  Radar  represente  correctamente  las  habilidades;  ●  los  gráficos  reflejen  la  evolución  temporal;  ●  las  recomendaciones  sean  coherentes  con  el  progreso;  ●  todos  los  estados  visuales  respeten  el  Design  System.  
 
5.1.18  Evolución  futura  
En  futuras  versiones  podrán  incorporarse:  
●  comparativas  con  cohortes;  ●  predicción  de  finalización;  ●  indicadores  de  riesgo;  ●  análisis  mediante  IA;  ●  informes  descargables;  ●  objetivos  inteligentes  adaptativos.  
 
5.1.19  Declaración  del  módulo  Mi  
Progreso
 
Mi  Progreso  transforma  los  datos  académicos  en  conocimiento  
accionable
 
para
 
el
 
estudiante.
 
Mediante
 
indicadores
 
claros,
 
visualizaciones
 
comprensibles
 
y
 
recomendaciones
 
personalizadas,
 
permite
 
comprender
 
la
 
evolución
 
del
 
aprendizaje,
 
mantener
 
la
 
motivación
 
y
 
orientar
 
el
 
esfuerzo
 
hacia
 
la
 
mejora
 
continua
 
dentro
 
de
 
Elevate.
 
 
Capítulo  5.2  —  Certificados

5.2.1  Propósito  
El  módulo  Certificados  gestiona  la  obtención,  visualización  y  conservación  de  las  
certificaciones
 
académicas
 
obtenidas
 
por
 
el
 
estudiante
 
dentro
 
de
 
Elevate.
 
Su  propósito  es  reconocer  oficialmente  la  finalización  satisfactoria  de  un  curso  y  
proporcionar
 
evidencias
 
verificables
 
del
 
aprendizaje
 
realizado.
 
Los  certificados  representan  el  resultado  final  del  recorrido  académico  y  constituyen  uno  de  
los
 
principales
 
elementos
 
de
 
motivación
 
del
 
estudiante.
 
 
5.2.2  Objetivos  
El  módulo  persigue  los  siguientes  objetivos:  
●  reconocer  los  cursos  completados;  ●  facilitar  el  acceso  a  las  certificaciones;  ●  garantizar  la  autenticidad  de  los  certificados;  ●  permitir  su  consulta  permanente;  ●  reforzar  la  motivación  del  estudiante.  
 
5.2.3  Alcance  
Incluye  
●  listado  de  certificados;  ●  visualización;  ●  información  académica;  ●  descarga;  ●  verificación;  ●  historial  de  certificaciones.  
No  incluye  
●  expedición  manual;  ●  modificación  de  certificados;  ●  creación  de  cursos.

5.2.4  Actores  
Actor  Participación  
Estudiante  Principal  
Sistema  Generación  automática  
Administrador  Gestión  excepcional   
5.2.5  Objetivos  de  experiencia  
El  estudiante  debe  poder  responder  inmediatamente  a  las  siguientes  preguntas:  
1.  ¿Qué  certificados  he  obtenido?  2.  ¿Cuándo  los  conseguí?  3.  ¿Qué  acredita  cada  uno?  4.  ¿Puedo  descargarlo?  5.  ¿Es  verificable?  
 
5.2.6  Arquitectura  funcional  
Certificados  │  ├──  Resumen  ├──  Listado  ├──  Certificate  Card  ├──  Vista  detallada  ├──  Descarga  └──  Verificación   
5.2.7  Resumen  
La  parte  superior  mostrará  una  visión  general.  
Incluye:  
●  certificados  obtenidos;  ●  cursos  completados;

●  último  certificado  conseguido;  ●  porcentaje  de  cursos  certificados.  
Este  bloque  proporciona  una  visión  rápida  del  progreso  académico  completado.  
 
5.2.8  Listado  
El  listado  mostrará  todos  los  certificados  obtenidos.  
Cada  elemento  incluirá:  
●  nombre  del  curso;  ●  nivel  CEFR;  ●  fecha  de  emisión;  ●  estado;  ●  botón  de  visualización;  ●  botón  de  descarga.  
La  ordenación  por  defecto  será  más  recientes  primero .  
 
5.2.9  Certificate  Card  
La  tarjeta  de  certificado  reutiliza  el  componente  oficial  del  Design  System.  
Mostrará:  
●  nombre  del  curso;  ●  portada;  ●  nivel;  ●  fecha;  ●  insignia  de  certificado;  ●  acciones  disponibles.  
Toda  la  tarjeta  permitirá  acceder  al  detalle.  
 
5.2.10  Vista  detallada  
Cada  certificado  mostrará:

●  nombre  del  estudiante;  ●  curso  completado;  ●  nivel  CEFR;  ●  profesor  o  institución;  ●  fecha  de  emisión;  ●  identificador  único;  ●  estado  de  verificación.  
La  presentación  deberá  transmitir  profesionalidad  y  credibilidad.  
 
5.2.11  Emisión  
La  emisión  será  completamente  automática  cuando  el  estudiante  cumpla  los  requisitos  
definidos
 
por
 
el
 
curso.
 
Como  mínimo  deberán  verificarse:  
●  curso  completado;  ●  evaluaciones  obligatorias  superadas;  ●  requisitos  académicos  satisfechos.  
El  estudiante  no  deberá  solicitar  manualmente  el  certificado.  
 
5.2.12  Descarga  
El  certificado  podrá  descargarse  en  un  formato  preparado  para  su  conservación  y  
presentación.
 
La  descarga  deberá  mantener  el  diseño  oficial  de  Elevate  y  conservar  toda  la  información  
necesaria
 
para
 
su
 
validación.
 
 
5.2.13  Verificación  
Cada  certificado  dispondrá  de  un  identificador  único  que  permitirá  comprobar  su  
autenticidad.
 
La  verificación  confirmará,  como  mínimo:  
●  existencia  del  certificado;

●  curso  correspondiente;  ●  fecha  de  emisión;  ●  estado  de  validez.  
Este  mecanismo  garantiza  la  confianza  en  las  certificaciones  emitidas.  
 
5.2.14  Estados  
Cada  certificado  podrá  encontrarse  en  uno  de  los  siguientes  estados.  
Estado  Descripción  
Disponible  Puede  visualizarse  y  descargarse.  
Pendiente  El  curso  aún  no  cumple  los  requisitos.  
Emitido  Certificado  generado  correctamente.  
Verificado  Su  autenticidad  ha  sido  confirmada.   
5.2.15  Integraciones  
El  módulo  Certificados  interactúa  con:  
Courses       │  Progress       │  Assessments       │  Achievements       │  Certificates  
Toda  la  información  se  genera  automáticamente  a  partir  del  progreso  académico.  
 
5.2.16  Reglas  de  negocio

El  módulo  deberá  cumplir  las  siguientes  reglas.  
●  Solo  se  emitirá  un  certificado  por  curso  y  estudiante.  ●  La  emisión  será  automática.  ●  Cada  certificado  dispondrá  de  un  identificador  único.  ●  Los  certificados  emitidos  no  podrán  modificarse.  ●  Solo  el  propietario  podrá  acceder  a  sus  certificados.  ●  Los  certificados  permanecerán  disponibles  indefinidamente  salvo  decisión  
administrativa
 
excepcional.
 
 
5.2.17  Métricas  
Los  indicadores  principales  serán:  
●  certificados  emitidos;  ●  porcentaje  de  cursos  certificados;  ●  descargas  realizadas;  ●  verificaciones  efectuadas;  ●  tiempo  medio  desde  la  finalización  del  curso  hasta  la  emisión.  
 
5.2.18  Criterios  de  aceptación  
El  módulo  se  considerará  correctamente  implementado  cuando:  
●  el  certificado  se  genere  automáticamente  tras  cumplir  todos  los  requisitos;  ●  el  listado  muestre  correctamente  todas  las  certificaciones;  ●  la  descarga  funcione  correctamente;  ●  el  mecanismo  de  verificación  confirme  la  autenticidad;  ●  todos  los  estados  visuales  respeten  el  Design  System;  ●  la  experiencia  sea  consistente  en  escritorio,  tableta  y  móvil.  
 
5.2.19  Evolución  futura  
En  futuras  versiones  podrán  incorporarse:  
●  certificados  con  firma  digital  avanzada;  ●  integración  con  Open  Badges;  ●  exportación  a  LinkedIn;

●  cartera  digital  de  certificaciones;  ●  verificación  mediante  código  QR;  ●  emisión  de  microcredenciales  por  competencias.  
 
5.2.20  Declaración  del  módulo  
Certificados
 
El  módulo  Certificados  representa  el  reconocimiento  oficial  del  
aprendizaje
 
realizado
 
en
 
Elevate.
 
Su
 
misión
 
es
 
transformar
 
la
 
finalización
 
de
 
un
 
curso
 
en
 
una
 
credencial
 
verificable,
 
permanente
 
y
 
de
 
alta
 
calidad,
 
reforzando
 
el
 
valor
 
académico
 
de
 
la
 
plataforma
 
y
 
ofreciendo
 
al
 
estudiante
 
una
 
evidencia
 
tangible
 
de
 
sus
 
logros.
 
 
Capítulo  5.3  —  Logros  (Achievements)  
 
5.3.1  Propósito  
El  módulo  Logros  reconoce  los  hitos  alcanzados  por  el  estudiante  durante  su  recorrido  en  
Elevate.
 
Su  propósito  es  reforzar  la  motivación  mediante  un  sistema  de  reconocimiento  que  premie  
la
 
constancia,
 
el
 
progreso
 
y
 
la
 
participación
 
activa
 
en
 
la
 
plataforma.
 
Los  logros  no  sustituyen  la  evaluación  académica,  sino  que  complementan  la  experiencia  de  
aprendizaje
 
mediante
 
objetivos
 
adicionales
 
y
 
recompensas
 
visuales.
 
 
5.3.2  Objetivos  
El  módulo  persigue  los  siguientes  objetivos:  
●  incentivar  la  continuidad  del  aprendizaje;  ●  reconocer  hitos  relevantes;  ●  aumentar  la  motivación;  ●  reforzar  hábitos  positivos;

●  visibilizar  los  avances  del  estudiante;  ●  enriquecer  la  experiencia  de  usuario.  
 
5.3.3  Alcance  
Incluye  
●  catálogo  de  logros;  ●  logros  desbloqueados;  ●  progreso  hacia  logros  pendientes;  ●  insignias;  ●  historial  de  obtención;  ●  criterios  de  desbloqueo.  
No  incluye  
●  certificaciones  oficiales;  ●  puntuaciones  académicas;  ●  recompensas  económicas.  
 
5.3.4  Actores  
Actor  Participación  
Estudiante  Principal  
Sistema  Desbloqueo  automático  
Administrador  Gestión  del  catálogo  de  logros   
5.3.5  Objetivos  de  experiencia  
El  estudiante  debe  responder  rápidamente  a  las  siguientes  preguntas:  
1.  ¿Qué  logros  he  conseguido?  2.  ¿Qué  me  falta  para  conseguir  los  siguientes?  3.  ¿Cuál  fue  mi  último  logro?

4.  ¿Qué  representa  cada  insignia?  5.  ¿Cómo  puedo  seguir  progresando?  
 
5.3.6  Arquitectura  funcional  
Logros  │  ├──  Resumen  ├──  Último  logro  ├──  Catálogo  ├──  Logros  desbloqueados  ├──  Logros  pendientes  └──  Detalle  del  logro   
5.3.7  Resumen  
La  cabecera  mostrará  una  visión  global  del  progreso  dentro  del  sistema  de  logros.  
Como  mínimo  incluirá:  
●  logros  obtenidos;  ●  logros  disponibles;  ●  porcentaje  completado;  ●  último  logro  desbloqueado.  
 
5.3.8  Catálogo  
El  catálogo  mostrará  todos  los  logros  definidos  por  la  plataforma.  
Cada  logro  incluirá:  
●  nombre;  ●  descripción;  ●  categoría;  ●  insignia;  ●  estado;  ●  progreso  cuando  corresponda.  
Los  logros  bloqueados  permanecerán  visibles  para  incentivar  la  progresión.

5.3.9  Categorías  
La  versión  1.0  contempla  las  siguientes  categorías.  
●  Progreso  ●  Cursos  ●  Lecciones  ●  Evaluaciones  ●  Constancia  ●  Participación  ●  Comunidad  ●  Eventos  especiales  
La  arquitectura  permitirá  añadir  nuevas  categorías  sin  modificar  el  funcionamiento  del  
módulo.
 
 
5.3.10  Achievement  Card  
Cada  logro  reutilizará  el  componente  Achievement  Card  del  Design  System.  
La  tarjeta  mostrará:  
●  insignia;  ●  nombre;  ●  descripción;  ●  categoría;  ●  fecha  de  obtención  cuando  exista;  ●  estado.  
Cuando  el  logro  esté  en  progreso  podrá  mostrar  un  indicador  de  avance.  
 
5.3.11  Estados  
Cada  logro  podrá  encontrarse  en  uno  de  los  siguientes  estados.  
Estado  Descripción

Bloqueado  Aún  no  se  cumplen  los  requisitos.  
En  progreso  Existe  avance  hacia  el  logro.  
Desbloqueado  
Requisitos  completados.  
Destacado  Logro  recientemente  obtenido.   
5.3.12  Desbloqueo  
Los  logros  se  desbloquearán  automáticamente  cuando  se  cumplan  las  condiciones  
definidas.
 
Ejemplos:  
●  completar  la  primera  lección;  ●  finalizar  un  curso;  ●  mantener  una  racha  de  aprendizaje;  ●  superar  una  evaluación;  ●  asistir  a  una  sesión  en  directo.  
El  desbloqueo  nunca  requerirá  una  acción  manual  del  estudiante.  
 
5.3.13  Notificación  
Cuando  se  obtenga  un  nuevo  logro  el  sistema  mostrará  una  notificación  destacada.  
La  notificación  incluirá:  
●  insignia;  ●  nombre;  ●  breve  descripción;  ●  acceso  al  módulo  Logros.  
La  celebración  deberá  ser  breve  y  no  interrumpir  el  flujo  de  aprendizaje.  
 
5.3.14  Historial

El  módulo  conservará  un  historial  cronológico  con:  
●  logros  obtenidos;  ●  fecha  de  desbloqueo;  ●  categoría;  ●  contexto  en  el  que  fueron  conseguidos.  
El  historial  permitirá  revisar  la  evolución  del  estudiante  a  lo  largo  del  tiempo.  
 
5.3.15  Integraciones  
El  módulo  Logros  interactúa  con:  
Lessons       │  Progress       │  Assessments       │  Courses       │  Activities       │  Community       │  Dashboard  
El  desbloqueo  de  logros  dependerá  de  la  actividad  registrada  en  estos  módulos.  
 
5.3.16  Reglas  de  negocio  
El  módulo  deberá  cumplir  las  siguientes  reglas.  
●  Cada  logro  solo  podrá  desbloquearse  una  vez  por  estudiante.  ●  El  desbloqueo  será  automático.  ●  Los  criterios  de  obtención  serán  verificables.  ●  Los  logros  permanecerán  asociados  permanentemente  al  perfil  del  estudiante.  ●  El  progreso  hacia  un  logro  se  actualizará  automáticamente  cuando  proceda.

5.3.17  Métricas  
Los  indicadores  principales  serán:  
●  logros  desbloqueados;  ●  porcentaje  de  estudiantes  que  obtienen  cada  logro;  ●  tiempo  medio  hasta  el  primer  logro;  ●  frecuencia  de  obtención;  ●  impacto  sobre  la  continuidad  del  aprendizaje.  
Estas  métricas  permitirán  evaluar  la  eficacia  del  sistema  de  gamificación.  
 
5.3.18  Criterios  de  aceptación  
El  módulo  se  considerará  correctamente  implementado  cuando:  
●  los  logros  se  desbloqueen  automáticamente  al  cumplir  sus  requisitos;  ●  el  catálogo  refleje  correctamente  el  estado  de  cada  logro;  ●  las  notificaciones  aparezcan  tras  la  obtención;  ●  el  historial  registre  todos  los  logros  conseguidos;  ●  el  diseño  respete  el  Design  System;  ●  la  experiencia  sea  consistente  en  escritorio,  tableta  y  móvil.  
 
5.3.19  Evolución  futura  
En  futuras  versiones  podrán  incorporarse:  
●  niveles  de  logros  (Bronce,  Plata,  Oro);  ●  logros  estacionales;  ●  colecciones  de  insignias;  ●  retos  semanales;  ●  recompensas  virtuales;  ●  integración  con  Open  Badges.  
 
5.3.20  Declaración  del  módulo  Logros

El  módulo  Logros  transforma  el  progreso  cotidiano  del  estudiante  en  hitos  
visibles
 
y
 
motivadores.
 
Mediante
 
un
 
sistema
 
de
 
reconocimiento
 
automático,
 
Elevate
 
refuerza
 
los
 
hábitos
 
positivos
 
de
 
aprendizaje,
 
celebra
 
los
 
avances
 
alcanzados
 
y
 
convierte
 
el
 
recorrido
 
académico
 
en
 
una
 
experiencia
 
más
 
atractiva,
 
constante
 
y
 
gratificante.
 
 
Capítulo  6  —  Community  Modules  
 
6.1  Propósito  
Los  Community  Modules  amplían  la  experiencia  de  aprendizaje  más  allá  del  contenido  
académico,
 
incorporando
 
herramientas
 
de
 
organización,
 
colaboración
 
e
 
interacción
 
entre
 
los
 
miembros
 
de
 
Elevate.
 
Su  objetivo  es  facilitar  la  planificación  del  estudio,  mejorar  la  comunicación  y  fomentar  una  
comunidad
 
activa
 
en
 
torno
 
al
 
aprendizaje
 
del
 
inglés.
 
Estos  módulos  complementan  el  recorrido  formativo  y  fortalecen  el  compromiso  del  
estudiante
 
con
 
la
 
plataforma.
 
 
6.2  Módulos  incluidos  
Este  grupo  funcional  está  formado  por:  
●  Calendario  ●  Actividades  ●  Comunidad  
Cada  módulo  responde  a  una  necesidad  específica,  pero  todos  contribuyen  a  una  
experiencia
 
de
 
aprendizaje
 
conectada.
 
 
6.3  Objetivos  
Los  Community  Modules  persiguen  los  siguientes  objetivos:

●  organizar  el  aprendizaje;  ●  facilitar  el  seguimiento  de  tareas;  ●  mejorar  la  comunicación;  ●  fomentar  la  participación;  ●  aumentar  el  compromiso  del  estudiante;  ●  centralizar  la  actividad  académica.  
 
6.4  Flujo  principal  
Curso      ↓  Actividad      ↓  Calendario      ↓  Comunidad      ↓  Participación  
Este  flujo  conecta  la  planificación,  la  ejecución  y  la  interacción  social.  
 
6.5  Arquitectura  funcional  
Community  │  ├──  Calendario  │  ├──  Actividades  │  └──  Comunidad   
6.6  Principios  
Todos  los  Community  Modules  deberán  cumplir  los  siguientes  principios:  
●  claridad;  ●  organización;  ●  colaboración;  ●  participación;

●  continuidad;  ●  personalización.  
 
6.7  Información  compartida  
Los  módulos  reutilizan  información  procedente  de:  
●  cursos;  ●  actividades;  ●  sesiones;  ●  progreso;  ●  notificaciones;  ●  perfil  del  usuario.  
La  sincronización  será  automática.  
 
6.8  Integraciones  
Courses       │  Activities       │  Calendar       │  Community       │  Notifications       │  Dashboard   
6.9  Componentes  compartidos  
Los  módulos  reutilizarán:  
●  Calendar  Event  Card  ●  Activity  Card  ●  Community  Post  ●  Avatar  ●  Badge

●  Notification  Badge  ●  Empty  State  ●  Loading  State  ●  Error  State  
 
6.10  Estados  comunes  
Todos  los  módulos  compartirán  los  siguientes  estados:  
●  Sin  actividad.  ●  Disponible.  ●  Con  contenido.  ●  Error.  ●  Cargando.  
 
6.11  Declaración  de  los  Community  
Modules
 
Los  Community  Modules  enriquecen  la  experiencia  educativa  de  Elevate  
integrando
 
planificación,
 
colaboración
 
e
 
interacción
 
en
 
un
 
único
 
ecosistema.
 
Su
 
misión
 
es
 
convertir
 
el
 
aprendizaje
 
en
 
una
 
experiencia
 
organizada,
 
participativa
 
y
 
conectada,
 
fortaleciendo
 
la
 
relación
 
del
 
estudiante
 
con
 
la
 
plataforma
 
y
 
con
 
su
 
comunidad
 
educativa.
 
 
Capítulo  6.1  —  Calendario  
 
6.1.1  Propósito  
El  módulo  Calendario  proporciona  al  estudiante  una  visión  cronológica  de  todas  las  
actividades
 
relevantes
 
de
 
su
 
aprendizaje.
 
Su  propósito  es  ayudar  a  planificar  el  estudio,  anticipar  eventos  importantes  y  mantener  una  
organización
 
eficaz
 
del
 
tiempo.

El  calendario  actúa  como  la  agenda  académica  personal  del  estudiante  dentro  de  Elevate.  
 
6.1.2  Objetivos  
El  módulo  persigue  los  siguientes  objetivos:  
●  organizar  la  actividad  académica;  ●  mostrar  próximos  eventos;  ●  reducir  olvidos;  ●  facilitar  la  planificación;  ●  sincronizar  todas  las  actividades  relevantes.  
 
6.1.3  Alcance  
Incluye  
●  calendario  mensual;  ●  calendario  semanal;  ●  eventos;  ●  sesiones  en  directo;  ●  actividades;  ●  evaluaciones;  ●  recordatorios.  
No  incluye  
●  creación  de  cursos;  ●  edición  del  contenido  académico;  ●  mensajería.  
 
6.1.4  Actores  
Actor  Participación  
Estudiante  
Principal

Profesor  Programa  eventos  y  sesiones  
Sistema  Generación  automática  de  eventos   
6.1.5  Objetivos  de  experiencia  
El  estudiante  debe  responder  inmediatamente  a  las  siguientes  preguntas:  
1.  ¿Qué  tengo  hoy?  2.  ¿Qué  actividades  vencen  pronto?  3.  ¿Cuándo  es  mi  próxima  clase?  4.  ¿Qué  evaluaciones  se  aproximan?  5.  ¿Qué  debo  planificar  esta  semana?  
 
6.1.6  Arquitectura  funcional  
Calendario  │  ├──  Vista  mensual  ├──  Vista  semanal  ├──  Vista  diaria  ├──  Lista  de  eventos  ├──  Detalle  del  evento  └──  Próximas  actividades   
6.1.7  Tipos  de  eventos  
El  calendario  podrá  mostrar:  
●  clases  en  directo;  ●  actividades;  ●  evaluaciones;  ●  fechas  límite;  ●  recordatorios;  ●  eventos  institucionales.  
Cada  tipo  utilizará  una  representación  visual  diferenciada.

6.1.8  Vistas  
La  versión  1.0  incluye:  
●  Vista  mensual.  ●  Vista  semanal.  ●  Vista  diaria.  
El  usuario  podrá  cambiar  entre  ellas  sin  perder  el  contexto.  
 
6.1.9  Información  de  los  eventos  
Cada  evento  mostrará:  
●  título;  ●  fecha;  ●  hora;  ●  duración;  ●  tipo;  ●  curso  asociado;  ●  estado;  ●  acción  principal.  
 
6.1.10  Próximos  eventos  
La  parte  superior  del  módulo  mostrará  un  resumen  con:  
●  siguiente  sesión;  ●  próxima  evaluación;  ●  próxima  fecha  límite;  ●  actividades  pendientes.  
Este  resumen  permitirá  al  estudiante  identificar  rápidamente  sus  prioridades.  
 
6.1.11  Estados  
Cada  evento  podrá  encontrarse  en  uno  de  los  siguientes  estados.

Estado  Descripción  
Programado  
Pendiente  de  realización.  
En  curso  Evento  actualmente  activo.  
Finalizado  Evento  completado.  
Cancelado  Evento  anulado.   
6.1.12  Integraciones  
El  módulo  Calendario  interactúa  con:  
Activities       │  Live  Sessions       │  Assessments       │  Courses       │  Notifications  
Toda  la  información  se  sincroniza  automáticamente.  
 
6.1.13  Reglas  de  negocio  
El  módulo  deberá  cumplir  las  siguientes  reglas.  
●  Todo  evento  deberá  pertenecer  a  un  curso  o  sistema.  ●  Las  fechas  se  mostrarán  según  la  zona  horaria  del  usuario.  ●  Los  cambios  se  reflejarán  automáticamente.  ●  Las  sesiones  canceladas  permanecerán  identificadas  como  tales.  ●  Los  eventos  pasados  permanecerán  consultables.  
 
6.1.14  Métricas

Entre  los  indicadores  principales:  
●  consultas  del  calendario;  ●  asistencia  a  sesiones;  ●  cumplimiento  de  fechas  límite;  ●  utilización  de  las  distintas  vistas;  ●  interacción  con  recordatorios.  
 
6.1.15  Criterios  de  aceptación  
El  módulo  se  considerará  correctamente  implementado  cuando:  
●  todos  los  eventos  aparezcan  correctamente  sincronizados;  ●  las  vistas  mensual,  semanal  y  diaria  funcionen  correctamente;  ●  los  cambios  se  reflejen  automáticamente;  ●  la  navegación  entre  fechas  sea  fluida;  ●  el  diseño  respete  el  Design  System;  ●  la  experiencia  sea  consistente  en  escritorio,  tableta  y  móvil.  
 
6.1.16  Evolución  futura  
En  futuras  versiones  podrán  incorporarse:  
●  sincronización  con  calendarios  externos;  ●  planificación  inteligente  mediante  IA;  ●  disponibilidad  personalizada;  ●  sugerencias  automáticas  de  estudio;  ●  planificación  adaptativa.  
 
6.1.17  Declaración  del  módulo  
Calendario
 
El  módulo  Calendario  organiza  el  tiempo  de  aprendizaje  del  estudiante  
mediante
 
una
 
planificación
 
clara
 
y
 
centralizada
 
de
 
eventos,
 
actividades
 
y
 
sesiones.
 
Su
 
misión
 
es
 
transformar
 
el
 
itinerario
 
académico
 
en
 
una
 
agenda
 
estructurada
 
que
 
facilite
 
la
 
organización
 
personal,
 
reduzca
 
olvidos
 
y
 
favorezca
 
la
 
continuidad
 
del
 
aprendizaje
 
dentro
 
de
 
Elevate.

Capítulo  6.2  —  Actividades  
 
6.2.1  Propósito  
El  módulo  Actividades  gestiona  todas  las  tareas  académicas  asignadas  al  estudiante  
durante
 
su
 
proceso
 
de
 
aprendizaje.
 
Su  propósito  es  organizar  el  trabajo  práctico,  facilitar  la  entrega  de  ejercicios  y  proporcionar  
un
 
seguimiento
 
claro
 
del
 
estado
 
de
 
cada
 
actividad.
 
Las  actividades  representan  la  aplicación  práctica  de  los  conocimientos  adquiridos  durante  
el
 
curso.
 
 
6.2.2  Objetivos  
El  módulo  persigue  los  siguientes  objetivos:  
●  centralizar  todas  las  tareas  del  estudiante;  ●  facilitar  la  planificación  del  trabajo;  ●  mostrar  claramente  los  plazos;  ●  gestionar  el  ciclo  completo  de  entrega;  ●  proporcionar  retroalimentación  del  profesor;  ●  integrar  las  actividades  con  el  progreso  académico.  
 
6.2.3  Alcance  
Incluye  
●  listado  de  actividades;  ●  detalle  de  cada  actividad;  ●  entregas;  ●  estados;  ●  fechas  límite;  ●  calificaciones;  ●  comentarios  del  profesor.

No  incluye  
●  edición  de  actividades;  ●  creación  de  tareas;  ●  administración  del  curso.  
 
6.2.4  Actores  
Actor  Participación  
Estudiante  
Principal  
Profesor  Asigna,  revisa  y  califica  
Sistema  Gestión  de  estados  y  plazos   
6.2.5  Objetivos  de  experiencia  
El  estudiante  debe  responder  inmediatamente  a  las  siguientes  preguntas:  
1.  ¿Qué  actividades  tengo  pendientes?  2.  ¿Cuál  vence  antes?  3.  ¿Qué  actividades  ya  he  entregado?  4.  ¿Cuáles  han  sido  revisadas?  5.  ¿Qué  comentarios  ha  dejado  el  profesor?  
 
6.2.6  Arquitectura  funcional  
Actividades  │  ├──  Resumen  ├──  Buscador  ├──  Filtros  ├──  Listado  ├──  Detalle  ├──  Entrega  └──  Historial

6.2.7  Resumen  
La  parte  superior  mostrará  un  resumen  del  estado  actual.  
Incluirá:  
●  actividades  pendientes;  ●  entregas  realizadas;  ●  actividades  calificadas;  ●  próximas  fechas  límite.  
Este  bloque  ayuda  al  estudiante  a  priorizar  su  trabajo.  
 
6.2.8  Listado  
Cada  actividad  mostrará:  
●  título;  ●  curso;  ●  fecha  de  publicación;  ●  fecha  límite;  ●  estado;  ●  profesor;  ●  acción  principal.  
La  ordenación  por  defecto  será  por  fecha  límite  más  próxima .  
 
6.2.9  Estados  
Cada  actividad  podrá  encontrarse  en  uno  de  los  siguientes  estados.  
Estado  Descripción  
Pendiente  Aún  no  iniciada.  
En  progreso  
El  estudiante  ha  comenzado  el  trabajo.

Entregada  Pendiente  de  revisión.  
Revisada  El  profesor  ha  evaluado  la  actividad.  
Devuelta  Requiere  modificaciones.  
Cerrada  Ya  no  admite  entregas.   
6.2.10  Detalle  de  la  actividad  
Cada  actividad  incluirá:  
●  título;  ●  descripción;  ●  objetivos;  ●  instrucciones;  ●  criterios  de  evaluación;  ●  fecha  de  entrega;  ●  archivos  adjuntos;  ●  recursos  relacionados.  
Toda  la  información  necesaria  deberá  estar  disponible  en  una  única  pantalla.  
 
6.2.11  Entrega  
El  estudiante  podrá:  
●  subir  archivos;  ●  sustituir  una  entrega  cuando  esté  permitido;  ●  añadir  comentarios;  ●  confirmar  la  entrega.  
El  sistema  mostrará  claramente  si  la  entrega  ha  sido  registrada  correctamente.  
 
6.2.12  Retroalimentación  
Una  vez  revisada  la  actividad,  el  estudiante  visualizará:  
●  estado;

●  calificación;  ●  comentarios  del  profesor;  ●  observaciones;  ●  fecha  de  revisión.  
La  retroalimentación  deberá  contribuir  a  la  mejora  del  aprendizaje.  
 
6.2.13  Historial  
El  historial  conservará:  
●  fecha  de  publicación;  ●  fecha  de  entrega;  ●  revisiones;  ●  modificaciones;  ●  calificaciones.  
El  estudiante  podrá  consultar  toda  la  evolución  de  cada  actividad.  
 
6.2.14  Filtros  
La  versión  1.0  incluye:  
●  Todas;  ●  Pendientes;  ●  En  progreso;  ●  Entregadas;  ●  Revisadas;  ●  Cerradas.  
Los  filtros  podrán  combinarse  con  la  búsqueda.  
 
6.2.15  Integraciones  
El  módulo  Actividades  interactúa  con:  
Assignments        │

Submissions        │  Courses        │  Calendar        │  Notifications        │  Progress  
La  información  se  sincroniza  automáticamente  entre  todos  los  módulos  relacionados.  
 
6.2.16  Reglas  de  negocio  
El  módulo  deberá  cumplir  las  siguientes  reglas.  
●  Solo  los  estudiantes  matriculados  podrán  entregar  actividades.  ●  Cada  actividad  pertenecerá  a  un  único  curso.  ●  Las  entregas  respetarán  la  fecha  límite  definida.  ●  El  historial  no  podrá  eliminarse.  ●  La  calificación  solo  podrá  ser  modificada  por  el  profesor  cuando  las  reglas  del  curso  
lo
 
permitan.
 ●  La  actualización  del  progreso  dependerá  de  la  configuración  de  la  actividad.  
 
6.2.17  Métricas  
Entre  los  indicadores  principales:  
●  porcentaje  de  actividades  entregadas;  ●  entregas  fuera  de  plazo;  ●  tiempo  medio  hasta  la  entrega;  ●  calificación  media;  ●  actividades  pendientes;  ●  tasa  de  revisión.  
Estos  indicadores  alimentarán  el  Dashboard  y  el  módulo  Mi  Progreso.  
 
6.2.18  Criterios  de  aceptación

El  módulo  se  considerará  correctamente  implementado  cuando:  
●  todas  las  actividades  aparezcan  correctamente  clasificadas;  ●  las  entregas  se  registren  sin  pérdida  de  información;  ●  el  historial  refleje  todas  las  acciones  realizadas;  ●  las  calificaciones  y  comentarios  sean  visibles  tras  la  revisión;  ●  los  estados  visuales  respeten  el  Design  System;  ●  la  experiencia  sea  consistente  en  escritorio,  tableta  y  móvil.  
 
6.2.19  Evolución  futura  
En  futuras  versiones  podrán  incorporarse:  
●  edición  colaborativa;  ●  entregas  mediante  enlaces  externos;  ●  corrección  asistida  por  IA;  ●  rúbricas  avanzadas;  ●  evaluación  entre  estudiantes  (peer  review);  ●  detección  de  similitud  de  contenidos.  
 
6.2.20  Declaración  del  módulo  
Actividades
 
El  módulo  Actividades  organiza  el  trabajo  práctico  del  estudiante  durante  
todo
 
su
 
recorrido
 
académico
 
en
 
Elevate.
 
Su
 
misión
 
es
 
ofrecer
 
un
 
flujo
 
claro
 
desde
 
la
 
asignación
 
hasta
 
la
 
revisión,
 
integrando
 
planificación,
 
entregas
 
y
 
retroalimentación
 
en
 
una
 
experiencia
 
coherente
 
que
 
favorezca
 
la
 
aplicación
 
efectiva
 
de
 
los
 
conocimientos
 
adquiridos.
 
 
Capítulo  6.3  —  Comunidad  
 
6.3.1  Propósito  
El  módulo  Comunidad  constituye  el  espacio  de  interacción  social  de  Elevate.

Su  propósito  es  facilitar  la  colaboración  entre  estudiantes  y  profesores,  fomentar  el  
intercambio
 
de
 
conocimiento
 
y
 
crear
 
un
 
entorno
 
de
 
aprendizaje
 
participativo
 
que
 
complemente
 
el
 
estudio
 
individual.
 
La  Comunidad  no  pretende  sustituir  el  contenido  académico,  sino  enriquecerlo  mediante  la  
conversación,
 
la
 
ayuda
 
mutua
 
y
 
la
 
participación
 
activa.
 
 
6.3.2  Objetivos  
El  módulo  persigue  los  siguientes  objetivos:  
●  fomentar  la  colaboración;  ●  facilitar  la  resolución  de  dudas;  ●  impulsar  la  participación;  ●  crear  un  sentimiento  de  comunidad;  ●  compartir  recursos  y  experiencias;  ●  fortalecer  el  aprendizaje  entre  iguales.  
 
6.3.3  Alcance  
Incluye  
●  publicaciones;  ●  comentarios;  ●  respuestas;  ●  reacciones;  ●  recursos  compartidos;  ●  moderación;  ●  búsqueda  dentro  de  la  comunidad.  
No  incluye  
●  mensajería  privada;  ●  videollamadas;  ●  administración  de  cursos.

6.3.4  Actores  
Actor  Participación  
Estudiante  Principal  
Profesor  Participación  y  moderación  académica  
Administrador  Moderación  general  
Sistema  Notificaciones  y  automatizaciones   
6.3.5  Objetivos  de  experiencia  
El  estudiante  debe  responder  rápidamente  a  las  siguientes  preguntas:  
1.  ¿Qué  novedades  hay?  2.  ¿Puedo  resolver  una  duda  aquí?  3.  ¿Qué  conversaciones  son  relevantes  para  mí?  4.  ¿Quién  ha  respondido  a  mis  publicaciones?  5.  ¿Cómo  puedo  participar?  
 
6.3.6  Arquitectura  funcional  
Comunidad  │  ├──  Feed  principal  ├──  Publicaciones  ├──  Comentarios  ├──  Respuestas  ├──  Recursos  compartidos  ├──  Búsqueda  └──  Moderación   
6.3.7  Feed  principal  
El  feed  mostrará  las  publicaciones  ordenadas  por  relevancia  y  actualidad.  
Cada  publicación  incluirá:

●  autor;  ●  fecha;  ●  contenido;  ●  curso  relacionado  cuando  exista;  ●  número  de  comentarios;  ●  reacciones;  ●  acciones  disponibles.  
 
6.3.8  Publicaciones  
El  estudiante  podrá  crear  publicaciones  para:  
●  realizar  preguntas;  ●  compartir  recursos;  ●  iniciar  debates;  ●  comunicar  experiencias;  ●  solicitar  ayuda.  
Las  publicaciones  deberán  admitir  texto  e  imágenes.  La  incorporación  de  otros  tipos  de  
archivos
 
podrá
 
habilitarse
 
en
 
futuras
 
versiones.
 
 
6.3.9  Comentarios  
Cada  publicación  permitirá  comentarios  organizados  cronológicamente.  
Los  comentarios  podrán:  
●  responder  directamente  a  la  publicación;  ●  responder  a  otro  comentario;  ●  recibir  reacciones.  
El  objetivo  es  facilitar  conversaciones  estructuradas.  
 
6.3.10  Reacciones  
Los  usuarios  podrán  reaccionar  a  publicaciones  y  comentarios.  
Las  reacciones  tienen  como  finalidad:

●  reconocer  aportaciones  útiles;  ●  aumentar  la  participación;  ●  facilitar  la  identificación  de  contenido  relevante.  
Las  reacciones  no  sustituyen  las  respuestas.  
 
6.3.11  Búsqueda  
La  comunidad  permitirá  buscar  por:  
●  texto;  ●  autor;  ●  curso;  ●  etiquetas;  ●  fecha.  
La  búsqueda  deberá  ofrecer  resultados  relevantes  y  actualizados.  
 
6.3.12  Moderación  
La  plataforma  deberá  disponer  de  mecanismos  de  moderación.  
Como  mínimo  permitirá:  
●  ocultar  contenido  inapropiado;  ●  denunciar  publicaciones;  ●  eliminar  contenido  por  parte  de  administradores;  ●  destacar  publicaciones  importantes  del  profesorado.  
La  moderación  garantizará  un  entorno  seguro  y  respetuoso.  
 
6.3.13  Estados  
Cada  publicación  podrá  encontrarse  en  uno  de  los  siguientes  estados.  
Estado  Descripción  
Publicada  Visible  para  la  comunidad.

Editada  Ha  sido  modificada  tras  su  publicación.  
Oculta  No  visible  temporalmente.  
Eliminada  Retirada  de  la  comunidad.   
6.3.14  Integraciones  
El  módulo  Comunidad  interactúa  con:  
Users       │  Courses       │  Notifications       │  AI  Tutor       │  Profile  
Las  notificaciones  informarán  de  respuestas,  menciones  e  interacciones  relevantes.  
 
6.3.15  Reglas  de  negocio  
El  módulo  deberá  cumplir  las  siguientes  reglas.  
●  Solo  los  usuarios  autenticados  podrán  participar.  ●  Cada  publicación  tendrá  un  autor  único.  ●  Los  autores  podrán  editar  sus  publicaciones  mientras  las  reglas  de  la  plataforma  lo  
permitan.
 ●  Los  administradores  podrán  moderar  cualquier  contenido.  ●  Las  acciones  de  moderación  quedarán  registradas  para  auditoría.  ●  El  contenido  eliminado  no  será  visible  para  los  usuarios,  pero  podrá  conservarse  
según
 
la
 
política
 
de
 
retención
 
de
 
datos.
 
 
6.3.16  Métricas  
Los  indicadores  principales  serán:

●  publicaciones  creadas;  ●  comentarios  realizados;  ●  porcentaje  de  participación;  ●  tiempo  medio  hasta  la  primera  respuesta;  ●  publicaciones  con  mayor  interacción;  ●  usuarios  activos.  
Estos  indicadores  permitirán  evaluar  la  salud  y  el  nivel  de  actividad  de  la  comunidad.  
 
6.3.17  Criterios  de  aceptación  
El  módulo  se  considerará  correctamente  implementado  cuando:  
●  los  usuarios  puedan  crear  publicaciones  y  comentarios;  ●  las  conversaciones  mantengan  su  estructura  correctamente;  ●  las  notificaciones  se  generen  tras  las  interacciones  relevantes;  ●  las  herramientas  de  moderación  funcionen  según  los  permisos  definidos;  ●  el  diseño  respete  el  Design  System;  ●  la  experiencia  sea  consistente  en  escritorio,  tableta  y  móvil.  
 
6.3.18  Evolución  futura  
En  futuras  versiones  podrán  incorporarse:  
●  grupos  temáticos;  ●  canales  por  curso;  ●  preguntas  destacadas;  ●  contenido  fijado;  ●  eventos  comunitarios;  ●  gamificación  de  la  participación;  ●  traducción  automática  de  publicaciones;  ●  resumen  de  debates  mediante  IA.  
 
6.3.19  Declaración  del  módulo  
Comunidad

El  módulo  Comunidad  amplía  el  aprendizaje  más  allá  del  contenido  
académico,
 
proporcionando
 
un
 
espacio
 
seguro
 
donde
 
estudiantes
 
y
 
profesores
 
pueden
 
compartir
 
conocimiento,
 
resolver
 
dudas
 
y
 
colaborar.
 
Su
 
misión
 
es
 
convertir
 
Elevate
 
en
 
un
 
entorno
 
de
 
aprendizaje
 
participativo,
 
donde
 
la
 
interacción
 
entre
 
personas
 
complemente
 
el
 
estudio
 
individual
 
y
 
fortalezca
 
el
 
sentimiento
 
de
 
pertenencia
 
a
 
la
 
comunidad
 
educativa.
 
 
Capítulo  7  —  Administration  Modules  
 
7.1  Propósito  
Los  Administration  Modules  agrupan  las  funcionalidades  relacionadas  con  la  gestión  de  la  
cuenta
 
del
 
usuario,
 
la
 
configuración
 
personal
 
y
 
la
 
administración
 
de
 
la
 
plataforma.
 
Su  objetivo  es  proporcionar  un  entorno  seguro  donde  cada  usuario  pueda  gestionar  su  
información
 
personal,
 
configurar
 
su
 
experiencia
 
y,
 
en
 
función
 
de
 
su
 
rol,
 
administrar
 
los
 
recursos
 
del
 
ecosistema
 
Elevate.
 
 
7.2  Módulos  incluidos  
Este  grupo  funcional  está  formado  por:  
●  Perfil  ●  Notificaciones  ●  Administración  
Cada  módulo  posee  responsabilidades  claramente  diferenciadas.  
 
7.3  Objetivos  
Los  Administration  Modules  persiguen  los  siguientes  objetivos:  
●  centralizar  la  gestión  de  la  cuenta;  ●  personalizar  la  experiencia  del  usuario;  ●  facilitar  la  administración  de  la  plataforma;

●  garantizar  la  seguridad  de  la  información;  ●  mantener  la  configuración  sincronizada  entre  dispositivos.  
 
7.4  Arquitectura  funcional  
Administration  │  ├──  Perfil  │  ├──  Notificaciones  │  └──  Administración   
7.5  Principios  
Todos  los  módulos  deberán  cumplir  los  siguientes  principios:  
●  seguridad;  ●  claridad;  ●  personalización;  ●  consistencia;  ●  privacidad;  ●  accesibilidad.  
 
7.6  Integraciones  
Users       │  Authentication       │  Notifications       │  Courses       │  Community       │  Dashboard

7.7  Declaración  de  los  Administration  
Modules
 
Los  Administration  Modules  proporcionan  las  herramientas  necesarias  
para
 
gestionar
 
la
 
identidad,
 
las
 
preferencias
 
y
 
la
 
configuración
 
del
 
usuario
 
dentro
 
de
 
Elevate.
 
Su
 
misión
 
es
 
garantizar
 
una
 
experiencia
 
personalizada,
 
segura
 
y
 
coherente,
 
adaptada
 
a
 
las
 
necesidades
 
de
 
estudiantes,
 
profesores
 
y
 
administradores.
 
 
Capítulo  7.1  —  Perfil  
 
7.1.1  Propósito  
El  módulo  Perfil  representa  el  espacio  personal  del  usuario  dentro  de  Elevate.  
Su  propósito  es  centralizar  la  información  personal,  mostrar  la  identidad  académica  del  
estudiante
 
y
 
permitir
 
la
 
gestión
 
de
 
los
 
datos
 
básicos
 
de
 
la
 
cuenta.
 
El  Perfil  constituye  la  representación  permanente  del  usuario  dentro  del  ecosistema.  
 
7.1.2  Objetivos  
El  módulo  persigue  los  siguientes  objetivos:  
●  gestionar  la  información  personal;  ●  mostrar  la  identidad  del  usuario;  ●  facilitar  la  actualización  de  datos;  ●  ofrecer  acceso  a  la  configuración  de  la  cuenta;  ●  mostrar  un  resumen  del  recorrido  académico.  
 
7.1.3  Alcance

Incluye  
●  información  personal;  ●  fotografía  de  perfil;  ●  datos  de  contacto;  ●  idioma;  ●  preferencias;  ●  resumen  académico;  ●  configuración  básica.  
No  incluye  
●  administración  de  cursos;  ●  configuración  avanzada  del  sistema;  ●  gestión  de  otros  usuarios.  
 
7.1.4  Actores  
Actor  Participación  
Estudiante  Principal  
Profesor  Principal  
Administrador  Principal  
Sistema  Gestión  de  autenticación   
7.1.5  Objetivos  de  experiencia  
El  usuario  debe  responder  inmediatamente  a  las  siguientes  preguntas:  
1.  ¿Quién  soy  dentro  de  Elevate?  2.  ¿Qué  información  personal  tengo  registrada?  3.  ¿Cómo  puedo  actualizar  mis  datos?  4.  ¿Cuál  es  mi  resumen  académico?  5.  ¿Qué  configuración  puedo  modificar?

7.1.6  Arquitectura  funcional  
Perfil  │  ├──  Cabecera  ├──  Información  personal  ├──  Resumen  académico  ├──  Preferencias  ├──  Seguridad  └──  Configuración   
7.1.7  Cabecera  
La  cabecera  mostrará:  
●  fotografía  o  avatar;  ●  nombre  completo;  ●  rol;  ●  nivel  principal;  ●  fecha  de  incorporación.  
La  cabecera  constituye  la  identidad  visual  del  usuario  dentro  de  Elevate.  
 
7.1.8  Información  personal  
El  usuario  podrá  consultar  y,  cuando  proceda,  actualizar:  
●  nombre;  ●  apellidos;  ●  correo  electrónico;  ●  idioma  preferido;  ●  zona  horaria;  ●  fotografía  de  perfil.  
La  disponibilidad  de  edición  dependerá  de  las  políticas  de  la  plataforma.  
 
7.1.9  Resumen  académico

El  perfil  mostrará  un  resumen  con  los  principales  indicadores.  
Entre  ellos:  
●  cursos  activos;  ●  cursos  completados;  ●  certificados  obtenidos;  ●  logros;  ●  progreso  global;  ●  tiempo  de  estudio.  
Este  bloque  reutiliza  información  del  módulo  Mi  Progreso .  
 
7.1.10  Preferencias  
El  usuario  podrá  configurar  aspectos  relacionados  con  su  experiencia.  
La  versión  1.0  contempla:  
●  idioma  de  la  plataforma;  ●  formato  de  fecha  y  hora;  ●  zona  horaria;  ●  preferencias  de  comunicación.  
Las  preferencias  deberán  sincronizarse  entre  dispositivos.  
 
7.1.11  Seguridad  
La  sección  de  seguridad  permitirá:  
●  cambiar  la  contraseña;  ●  revisar  la  última  sesión  iniciada;  ●  cerrar  sesiones  activas  cuando  proceda.  
Las  operaciones  relacionadas  con  la  seguridad  requerirán  una  validación  adicional  cuando  
corresponda.
 
 
7.1.12  Configuración

Desde  el  perfil  el  usuario  accederá  a:  
●  preferencias  de  notificaciones;  ●  privacidad;  ●  accesibilidad;  ●  configuración  de  la  cuenta.  
El  perfil  actúa  como  punto  central  de  acceso  a  la  configuración  personal.  
 
7.1.13  Estados  
El  módulo  deberá  contemplar:  
Estado  Descripción  
Perfil  completo  Toda  la  información  disponible.  
Perfil  incompleto  Existen  datos  pendientes.  
Edición  El  usuario  modifica  información.  
Error  No  ha  sido  posible  cargar  o  guardar  los  datos.   
7.1.14  Integraciones  
El  módulo  Perfil  interactúa  con:  
Users       │  Authentication       │  Progress       │  Achievements       │  Certificates       │  Notifications

7.1.15  Reglas  de  negocio  
El  módulo  deberá  cumplir  las  siguientes  reglas.  
●  Cada  usuario  dispondrá  de  un  único  perfil.  ●  El  correo  electrónico  deberá  ser  único.  ●  Solo  el  propietario  podrá  modificar  su  información  personal,  salvo  permisos  
administrativos.
 ●  Las  modificaciones  deberán  registrarse  correctamente.  ●  Los  cambios  se  reflejarán  automáticamente  en  toda  la  plataforma  cuando  proceda.  
 
7.1.16  Métricas  
Los  indicadores  principales  serán:  
●  perfiles  completados;  ●  frecuencia  de  actualización;  ●  cambios  de  fotografía;  ●  utilización  de  preferencias;  ●  modificaciones  de  seguridad.  
 
7.1.17  Criterios  de  aceptación  
El  módulo  se  considerará  correctamente  implementado  cuando:  
●  toda  la  información  del  usuario  se  muestre  correctamente;  ●  las  modificaciones  autorizadas  se  guarden  correctamente;  ●  las  preferencias  se  sincronicen  entre  dispositivos;  ●  el  resumen  académico  refleje  los  datos  oficiales;  ●  el  diseño  respete  el  Design  System;  ●  la  experiencia  sea  consistente  en  escritorio,  tableta  y  móvil.  
 
7.1.18  Evolución  futura  
En  futuras  versiones  podrán  incorporarse:  
●  biografía  pública;

●  objetivos  personales;  ●  insignias  destacadas;  ●  estadísticas  avanzadas;  ●  personalización  del  perfil;  ●  integración  con  cuentas  profesionales.  
 
7.1.19  Declaración  del  módulo  Perfil  
El  módulo  Perfil  representa  la  identidad  digital  del  usuario  dentro  de  
Elevate.
 
Su
 
misión
 
es
 
centralizar
 
la
 
información
 
personal,
 
ofrecer
 
una
 
visión
 
resumida
 
del
 
recorrido
 
académico
 
y
 
proporcionar
 
un
 
punto
 
único
 
desde
 
el
 
que
 
gestionar
 
la
 
configuración
 
y
 
las
 
preferencias
 
de
 
la
 
cuenta,
 
garantizando
 
una
 
experiencia
 
personalizada,
 
coherente
 
y
 
segura.
 
 
Capítulo  7.2  —  Notificaciones  
 
7.2.1  Propósito  
El  módulo  Notificaciones  constituye  el  centro  de  comunicación  de  Elevate.  
Su  propósito  es  informar  al  usuario  sobre  eventos  relevantes,  acciones  pendientes  y  
novedades
 
relacionadas
 
con
 
su
 
actividad
 
académica,
 
permitiéndole
 
mantenerse
 
al
 
día
 
sin
 
necesidad
 
de
 
revisar
 
manualmente
 
cada
 
módulo
 
de
 
la
 
plataforma.
 
Las  notificaciones  deben  ser  oportunas,  relevantes  y  no  intrusivas.  
 
7.2.2  Objetivos  
El  módulo  persigue  los  siguientes  objetivos:  
●  comunicar  información  relevante;  ●  reducir  el  riesgo  de  olvidar  tareas  importantes;  ●  mantener  informado  al  usuario;  ●  facilitar  el  acceso  rápido  a  acciones  pendientes;  ●  centralizar  todas  las  comunicaciones  de  la  plataforma.

7.2.3  Alcance  
Incluye  
●  centro  de  notificaciones;  ●  notificaciones  en  la  aplicación;  ●  preferencias  de  notificación;  ●  estados  de  lectura;  ●  acciones  rápidas;  ●  historial  de  notificaciones.  
No  incluye  
●  mensajería  instantánea;  ●  correo  electrónico  externo;  ●  comunicaciones  comerciales.  
 
7.2.4  Actores  
Actor  Participación  
Estudiante  Principal  
Profesor  Principal  
Administrador  Principal  
Sistema  Generación  automática  de  notificaciones   
7.2.5  Objetivos  de  experiencia  
El  usuario  debe  responder  inmediatamente  a  las  siguientes  preguntas:  
1.  ¿Qué  ha  ocurrido  desde  mi  última  visita?  2.  ¿Qué  requiere  mi  atención?  3.  ¿Qué  acciones  debo  realizar  ahora?  4.  ¿Qué  notificaciones  ya  he  leído?

5.  ¿Puedo  acceder  directamente  al  contenido  relacionado?  
 
7.2.6  Arquitectura  funcional  
Notificaciones  │  ├──  Centro  de  notificaciones  ├──  Lista  ├──  Detalle  ├──  Acciones  rápidas  ├──  Preferencias  └──  Historial   
7.2.7  Centro  de  notificaciones  
El  centro  mostrará  todas  las  notificaciones  del  usuario  ordenadas  cronológicamente.  
Cada  notificación  incluirá:  
●  icono;  ●  título;  ●  descripción;  ●  fecha  y  hora;  ●  estado;  ●  acción  principal.  
Las  notificaciones  no  leídas  aparecerán  visualmente  diferenciadas.  
 
7.2.8  Tipos  de  notificación  
La  versión  1.0  contempla  los  siguientes  tipos:  
●  progreso  actualizado;  ●  actividad  asignada;  ●  actividad  revisada;  ●  nueva  evaluación  disponible;  ●  sesión  en  directo  próxima;  ●  logro  desbloqueado;  ●  certificado  emitido;

●  respuesta  en  la  comunidad;  ●  recordatorio;  ●  anuncio  institucional.  
La  arquitectura  permitirá  añadir  nuevos  tipos  sin  modificar  el  funcionamiento  del  módulo.  
 
7.2.9  Prioridad  
Cada  notificación  tendrá  un  nivel  de  prioridad.  
Prioridad  Uso  
Alta  Requiere  atención  inmediata.  
Media  Acción  recomendada.  
Baja  Información  general.  
La  prioridad  influirá  en  la  presentación  visual  y  en  el  orden  de  determinadas  
comunicaciones.
 
 
7.2.10  Estados  
Cada  notificación  podrá  encontrarse  en  uno  de  los  siguientes  estados.  
Estado  Descripción  
No  leída  Pendiente  de  revisión.  
Leída  El  usuario  la  ha  consultado.  
Archivada  Conservada  en  el  historial.   
7.2.11  Acciones  rápidas  
Cuando  proceda,  la  notificación  permitirá  acceder  directamente  al  recurso  relacionado.

Ejemplos:  
●  abrir  una  actividad;  ●  continuar  una  lección;  ●  acceder  a  una  sesión  en  directo;  ●  consultar  un  certificado;  ●  abrir  una  conversación  de  la  comunidad.  
El  objetivo  es  reducir  el  número  de  pasos  necesarios  para  completar  una  acción.  
 
7.2.12  Preferencias  
El  usuario  podrá  configurar  qué  tipos  de  notificaciones  desea  recibir.  
La  versión  1.0  permitirá  activar  o  desactivar:  
●  recordatorios  académicos;  ●  actividad  de  la  comunidad;  ●  logros;  ●  certificados;  ●  anuncios  generales;  ●  sesiones  en  directo.  
Las  preferencias  serán  personales  y  se  sincronizarán  entre  dispositivos.  
 
7.2.13  Historial  
El  historial  conservará  todas  las  notificaciones  generadas  durante  el  periodo  definido  por  la  
política
 
de
 
retención
 
de
 
la
 
plataforma.
 
El  usuario  podrá:  
●  consultar  notificaciones  anteriores;  ●  marcarlas  como  leídas;  ●  archivarlas  cuando  corresponda.  
 
7.2.14  Integraciones  
El  módulo  Notificaciones  recibe  eventos  de:

Dashboard       │  Courses       │  Lessons       │  Assignments       │  Assessments       │  Calendar       │  Community       │  Achievements       │  Certificates       │  AI  Tutor  
Todos  estos  módulos  pueden  generar  notificaciones  cuando  se  produce  un  evento  
relevante.
 
 
7.2.15  Reglas  de  negocio  
El  módulo  deberá  cumplir  las  siguientes  reglas.  
●  Cada  notificación  pertenecerá  a  un  único  usuario.  ●  Las  notificaciones  se  generarán  automáticamente  cuando  ocurra  el  evento  
correspondiente.
 ●  Una  notificación  marcada  como  leída  conservará  su  estado  entre  dispositivos.  ●  Las  preferencias  del  usuario  determinarán  qué  comunicaciones  recibe,  salvo  
aquellas
 
consideradas
 
críticas
 
para
 
el
 
funcionamiento
 
de
 
la
 
plataforma.
 ●  Las  notificaciones  archivadas  permanecerán  disponibles  en  el  historial  mientras  dure  
el
 
periodo
 
de
 
conservación
 
definido.
 
 
7.2.16  Métricas  
Los  indicadores  principales  serán:  
●  notificaciones  enviadas;

●  porcentaje  de  apertura;  ●  tiempo  medio  hasta  la  lectura;  ●  utilización  de  acciones  rápidas;  ●  porcentaje  de  notificaciones  archivadas;  ●  tipos  de  notificación  más  consultados.  
Estos  indicadores  permitirán  optimizar  la  estrategia  de  comunicación  de  la  plataforma.  
 
7.2.17  Criterios  de  aceptación  
El  módulo  se  considerará  correctamente  implementado  cuando:  
●  las  notificaciones  se  generen  automáticamente  a  partir  de  los  eventos  
correspondientes;
 ●  el  estado  de  lectura  se  sincronice  correctamente  entre  dispositivos;  ●  las  acciones  rápidas  dirijan  al  recurso  adecuado;  ●  las  preferencias  del  usuario  se  apliquen  correctamente;  ●  el  diseño  respete  el  Design  System;  ●  la  experiencia  sea  consistente  en  escritorio,  tableta  y  móvil.  
 
7.2.18  Evolución  futura  
En  futuras  versiones  podrán  incorporarse:  
●  notificaciones  inteligentes  priorizadas  mediante  IA;  ●  agrupación  automática  de  notificaciones  similares;  ●  resumen  diario  o  semanal  personalizado;  ●  notificaciones  push  para  aplicaciones  móviles;  ●  recordatorios  predictivos  basados  en  hábitos  de  estudio;  ●  integración  con  servicios  de  calendario  externos.  
 
7.2.19  Declaración  del  módulo  
Notificaciones
 
El  módulo  Notificaciones  garantiza  que  el  usuario  permanezca  informado  
sobre
 
los
 
acontecimientos
 
relevantes
 
de
 
Elevate
 
mediante
 
comunicaciones
 
oportunas,
 
personalizadas
 
y
 
orientadas
 
a
 
la
 
acción.
 
Su

misión  es  conectar  todos  los  módulos  de  la  plataforma,  facilitando  que  el  
estudiante
 
y
 
el
 
profesorado
 
actúen
 
en
 
el
 
momento
 
adecuado
 
sin
 
perder
 
información
 
importante.
 
 
Capítulo  7.3  —  Administración  
 
7.3.1  Propósito  
El  módulo  Administración  proporciona  las  herramientas  necesarias  para  gestionar  el  
funcionamiento
 
operativo
 
de
 
Elevate.
 
Su  propósito  es  permitir  a  los  administradores  controlar  los  recursos  de  la  plataforma,  
supervisar
 
la
 
actividad
 
académica
 
y
 
mantener
 
la
 
integridad
 
del
 
ecosistema
 
mediante
 
una
 
interfaz
 
centralizada.
 
Este  módulo  constituye  el  centro  de  gestión  de  la  plataforma  y  está  reservado  a  usuarios  
con
 
privilegios
 
administrativos.
 
 
7.3.2  Objetivos  
El  módulo  persigue  los  siguientes  objetivos:  
●  administrar  usuarios;  ●  gestionar  cursos;  ●  supervisar  la  actividad  académica;  ●  controlar  la  configuración  del  sistema;  ●  facilitar  la  operación  diaria  de  la  plataforma;  ●  proporcionar  información  para  la  toma  de  decisiones.  
 
7.3.3  Alcance  
Incluye  
●  gestión  de  usuarios;

●  gestión  de  cursos;  ●  gestión  de  profesores;  ●  gestión  de  estudiantes;  ●  matrículas;  ●  analítica;  ●  configuración  general;  ●  auditoría.  
No  incluye  
●  desarrollo  de  contenido;  ●  configuración  técnica  de  la  infraestructura;  ●  mantenimiento  del  código  fuente.  
 
7.3.4  Actores  
Actor  Participación  
Administrador  Principal  
Sistema  Automatizaciones  
Profesor  Acceso  limitado  según  permisos   
7.3.5  Objetivos  de  experiencia  
El  administrador  debe  responder  inmediatamente  a  las  siguientes  preguntas:  
1.  ¿Cómo  está  funcionando  la  plataforma?  2.  ¿Qué  usuarios  requieren  atención?  3.  ¿Qué  cursos  están  activos?  4.  ¿Existen  incidencias  relevantes?  5.  ¿Qué  acciones  administrativas  debo  realizar?  
 
7.3.6  Arquitectura  funcional  
Administración  │

├──  Dashboard  ├──  Usuarios  ├──  Cursos  ├──  Profesores  ├──  Estudiantes  ├──  Matrículas  ├──  Analítica  ├──  Configuración  └──  Auditoría   
7.3.7  Dashboard  administrativo  
El  Dashboard  ofrecerá  una  visión  global  del  estado  de  la  plataforma.  
Como  mínimo  mostrará:  
●  usuarios  activos;  ●  cursos  publicados;  ●  matrículas  activas;  ●  actividad  reciente;  ●  indicadores  de  rendimiento;  ●  alertas  operativas.  
La  información  deberá  actualizarse  automáticamente.  
 
7.3.8  Gestión  de  usuarios  
El  administrador  podrá:  
●  consultar  usuarios;  ●  crear  usuarios;  ●  modificar  información;  ●  activar  o  desactivar  cuentas;  ●  asignar  roles;  ●  consultar  el  historial  básico  del  usuario.  
Toda  modificación  deberá  respetar  las  reglas  de  seguridad  del  sistema.  
 
7.3.9  Gestión  de  cursos

Desde  esta  sección  será  posible:  
●  crear  cursos;  ●  editar  información;  ●  publicar  cursos;  ●  archivar  cursos;  ●  asignar  profesores;  ●  consultar  estadísticas  del  curso.  
Las  modificaciones  deberán  reflejarse  inmediatamente  en  la  plataforma.  
 
7.3.10  Gestión  académica  
El  módulo  permitirá  administrar:  
●  unidades;  ●  lecciones;  ●  evaluaciones;  ●  actividades;  ●  certificados;  ●  logros.  
Estas  operaciones  estarán  sujetas  a  los  permisos  correspondientes.  
 
7.3.11  Matrículas  
La  gestión  de  matrículas  permitirá:  
●  matricular  estudiantes;  ●  cancelar  matrículas;  ●  consultar  el  estado;  ●  revisar  el  progreso  asociado.  
Cada  matrícula  estará  vinculada  a  un  único  estudiante  y  a  un  único  curso.  
 
7.3.12  Analítica  
La  sección  de  analítica  proporcionará  indicadores  como:

●  crecimiento  de  usuarios;  ●  cursos  más  utilizados;  ●  tasas  de  finalización;  ●  actividad  diaria;  ●  estudiantes  en  riesgo;  ●  utilización  de  la  plataforma.  
La  analítica  facilitará  la  toma  de  decisiones  basada  en  datos.  
 
7.3.13  Configuración  
El  administrador  podrá  gestionar  la  configuración  general  de  la  plataforma.  
Entre  otros  aspectos:  
●  parámetros  globales;  ●  catálogo  de  niveles;  ●  configuraciones  académicas;  ●  parámetros  de  notificaciones;  ●  opciones  generales  del  sistema.  
Las  modificaciones  deberán  registrarse  para  auditoría.  
 
7.3.14  Auditoría  
El  sistema  conservará  un  registro  de  las  operaciones  administrativas  relevantes.  
Ejemplos:  
●  creación  de  usuarios;  ●  modificación  de  permisos;  ●  publicación  de  cursos;  ●  eliminación  de  contenido;  ●  cambios  de  configuración.  
Estos  registros  facilitarán  el  seguimiento  de  incidencias  y  auditorías  internas.  
 
7.3.15  Estados

El  módulo  deberá  contemplar:  
Estado  Descripción  
Operativo  Funcionamiento  normal.  
Procesando  Existe  una  operación  en  curso.  
Error  No  ha  sido  posible  completar  la  acción.  
Acceso  denegado  
El  usuario  carece  de  permisos  suficientes.   
7.3.16  Integraciones  
El  módulo  Administración  interactúa  con  prácticamente  todos  los  sistemas  de  Elevate.  
Users  │  Courses  │  Enrollments  │  Lessons  │  Assessments  │  Assignments  │  Progress  │  Certificates  │  Achievements  │  Community  │  Dashboard  │  Notifications  
La  administración  actúa  como  punto  central  de  gestión  del  ecosistema.

7.3.17  Reglas  de  negocio  
El  módulo  deberá  cumplir  las  siguientes  reglas.  
●  Solo  los  administradores  podrán  acceder  al  módulo.  ●  Todas  las  operaciones  deberán  verificarse  mediante  autorización.  ●  Las  acciones  críticas  deberán  registrarse  en  el  sistema  de  auditoría.  ●  Las  modificaciones  deberán  propagarse  automáticamente  a  los  módulos  afectados.  ●  Ninguna  operación  administrativa  podrá  comprometer  la  integridad  de  los  datos  
académicos.
 
 
7.3.18  Métricas  
Los  indicadores  principales  serán:  
●  usuarios  gestionados;  ●  cursos  publicados;  ●  matrículas  realizadas;  ●  operaciones  administrativas;  ●  incidencias  resueltas;  ●  tiempo  medio  de  gestión.  
Estas  métricas  permiten  evaluar  la  eficiencia  operativa  de  la  plataforma.  
 
7.3.19  Criterios  de  aceptación  
El  módulo  se  considerará  correctamente  implementado  cuando:  
●  todas  las  operaciones  respeten  los  permisos  definidos;  ●  los  cambios  se  reflejen  correctamente  en  el  resto  del  sistema;  ●  las  acciones  críticas  queden  registradas;  ●  el  Dashboard  administrativo  muestre  información  actualizada;  ●  el  diseño  respete  el  Design  System;  ●  la  experiencia  sea  consistente  en  escritorio  y  tableta.  
 
7.3.20  Evolución  futura

En  futuras  versiones  podrán  incorporarse:  
●  administración  multiinstitución;  ●  gestión  avanzada  de  permisos;  ●  automatización  de  procesos  administrativos;  ●  informes  ejecutivos;  ●  paneles  configurables;  ●  administración  asistida  mediante  IA.  
 
7.3.21  Declaración  del  módulo  
Administración
 
El  módulo  Administración  constituye  el  centro  operativo  de  Elevate.  Su  
misión
 
es
 
proporcionar
 
a
 
los
 
administradores
 
un
 
conjunto
 
integrado
 
de
 
herramientas
 
para
 
gestionar
 
usuarios,
 
contenidos
 
y
 
recursos
 
de
 
forma
 
segura,
 
eficiente
 
y
 
trazable,
 
garantizando
 
el
 
correcto
 
funcionamiento
 
de
 
la
 
plataforma
 
y
 
apoyando
 
su
 
crecimiento
 
sostenible.
 
 
Capítulo  8  —  Cross-Cutting  Systems  
 
8.1  Propósito  
Los  Cross-Cutting  Systems  agrupan  las  capacidades  que  afectan  de  forma  transversal  a  
todo
 
el
 
ecosistema
 
de
 
Elevate.
 
A  diferencia  de  los  módulos  funcionales,  estos  sistemas  no  pertenecen  a  una  única  sección  
de
 
la
 
plataforma,
 
sino
 
que
 
enriquecen
 
toda
 
la
 
experiencia
 
del
 
usuario
 
independientemente
 
del
 
lugar
 
en
 
el
 
que
 
se
 
encuentre.
 
Su  objetivo  es  proporcionar  una  experiencia  inteligente,  consistente,  accesible  y  continua  
durante
 
todo
 
el
 
recorrido
 
de
 
aprendizaje.
 
 
8.2  Sistemas  incluidos

Este  grupo  funcional  está  formado  por:  
●  Tutor  IA  ●  Búsqueda  Global  ●  Accesibilidad  ●  Experiencia  multidispositivo  ●  Microinteracciones  
Todos  ellos  forman  parte  de  la  arquitectura  base  del  producto.  
 
8.3  Objetivos  
Los  Cross-Cutting  Systems  persiguen  los  siguientes  objetivos:  
●  mejorar  la  experiencia  de  usuario;  ●  reducir  la  fricción;  ●  aumentar  la  productividad;  ●  ofrecer  asistencia  contextual;  ●  garantizar  la  accesibilidad;  ●  mantener  la  coherencia  en  toda  la  plataforma.  
 
8.4  Principios  
Todos  los  sistemas  transversales  deberán  cumplir  los  siguientes  principios:  
●  disponibilidad  permanente;  ●  consistencia;  ●  contexto;  ●  accesibilidad;  ●  rendimiento;  ●  mínima  interrupción  del  flujo  de  trabajo.  
 
8.5  Arquitectura  funcional  
Cross-Cutting  Systems  │  ├──  AI  Tutor  ├──  Global  Search  ├──  Accessibility

├──  Multi-device  Experience  └──  Microinteractions   
8.6  Integraciones  
Todos  los  módulos          │  ────────┼────────          │  AI  Tutor  Global  Search  Notifications  Accessibility  Multi-device  
Los  sistemas  transversales  deberán  poder  integrarse  con  cualquier  módulo  sin  modificar  su  
comportamiento
 
funcional.
 
 
8.7  Componentes  compartidos  
Estos  sistemas  reutilizarán  componentes  del  Design  System,  entre  ellos:  
●  Floating  Action  Button  ●  Search  Modal  ●  Tooltip  ●  Dialog  ●  Toast  ●  Loading  State  ●  Empty  State  ●  Keyboard  Shortcuts  ●  Accessibility  Controls  
 
8.8  Declaración  de  los  Cross-Cutting  
Systems
 
Los  Cross-Cutting  Systems  representan  las  capacidades  comunes  que  
elevan
 
la
 
calidad
 
global
 
de
 
Elevate.
 
Su
 
misión
 
es
 
proporcionar
 
una
 
experiencia
 
inteligente,
 
accesible
 
y
 
coherente
 
en
 
toda
 
la
 
plataforma,

permitiendo  que  cada  módulo  comparta  los  mismos  estándares  de  
asistencia,
 
usabilidad
 
y
 
continuidad
 
independientemente
 
del
 
contexto
 
de
 
uso.
 
 
Capítulo  8.1  —  Tutor  IA  
 
8.1.1  Propósito  
El  Tutor  IA  constituye  el  asistente  inteligente  integrado  de  Elevate.  
Su  propósito  es  proporcionar  ayuda  contextual  durante  todo  el  proceso  de  aprendizaje,  
resolviendo
 
dudas,
 
ampliando
 
explicaciones
 
y
 
guiando
 
al
 
estudiante
 
sin
 
sustituir
 
el
 
contenido
 
oficial
 
del
 
curso
 
ni
 
el
 
papel
 
del
 
profesorado.
 
El  Tutor  IA  está  diseñado  para  acompañar  al  estudiante  en  cualquier  momento  de  su  
recorrido
 
académico.
 
 
8.1.2  Objetivos  
El  Tutor  IA  persigue  los  siguientes  objetivos:  
●  resolver  dudas  de  forma  inmediata;  ●  reforzar  la  comprensión  de  los  contenidos;  ●  ofrecer  explicaciones  alternativas;  ●  fomentar  el  aprendizaje  autónomo;  ●  reducir  bloqueos  durante  el  estudio;  ●  personalizar  la  experiencia  educativa.  
 
8.1.3  Alcance  
Incluye  
●  asistencia  contextual;  ●  conversación  mediante  chat;

●  explicación  de  conceptos;  ●  ayuda  sobre  vocabulario;  ●  aclaración  de  reglas  gramaticales;  ●  sugerencias  de  estudio;  ●  recomendaciones  relacionadas  con  el  contenido  actual.  
No  incluye  
●  modificación  del  contenido  oficial;  ●  evaluación  académica  oficial;  ●  sustitución  del  profesor;  ●  generación  automática  de  calificaciones.  
 
8.1.4  Actores  
Actor  Participación  
Estudiante  Principal  
Profesor  Referencia  académica  indirecta  
Sistema  IA  Generación  de  respuestas   
8.1.5  Objetivos  de  experiencia  
El  estudiante  debe  percibir  que  puede  obtener  ayuda  en  cualquier  momento  sin  abandonar  
la
 
tarea
 
que
 
está
 
realizando.
 
El  Tutor  IA  debe  responder  a  preguntas  como:  
1.  ¿Qué  significa  este  concepto?  2.  ¿Puedes  explicarlo  de  otra  forma?  3.  ¿Puedes  darme  más  ejemplos?  4.  ¿Cómo  puedo  mejorar?  5.  ¿Qué  debería  estudiar  después?  
 
8.1.6  Arquitectura  funcional

Tutor  IA  │  ├──  Chat  ├──  Contexto  ├──  Historial  ├──  Sugerencias  ├──  Recomendaciones  └──  Acciones  rápidas   
8.1.7  Disponibilidad  
El  Tutor  IA  estará  disponible  desde  cualquier  punto  relevante  de  la  plataforma.  
Especialmente  en:  
●  Inicio;  ●  Curso;  ●  Unidad;  ●  Lección;  ●  Evaluaciones;  ●  Actividades;  ●  Mi  Progreso.  
Su  acceso  deberá  requerir  una  única  interacción.  
 
8.1.8  Contexto  
Las  respuestas  del  Tutor  IA  deberán  adaptarse  automáticamente  al  contexto  actual.  
Podrán  utilizar  información  como:  
●  curso  activo;  ●  unidad;  ●  lección;  ●  nivel  CEFR;  ●  progreso  del  estudiante;  ●  actividad  actual.  
El  contexto  permitirá  ofrecer  respuestas  más  relevantes  sin  necesidad  de  repetir  
información.

8.1.9  Conversación  
El  Tutor  IA  ofrecerá  una  conversación  continua.  
El  historial  permitirá  mantener  el  contexto  durante  la  sesión  y  facilitar  consultas  relacionadas  
con
 
preguntas
 
anteriores.
 
El  usuario  podrá  iniciar  una  nueva  conversación  cuando  lo  desee.  
 
8.1.10  Capacidades  
La  versión  1.0  permitirá,  entre  otras  funciones:  
●  explicar  conceptos;  ●  resolver  dudas  gramaticales;  ●  ampliar  vocabulario;  ●  proponer  ejemplos;  ●  resumir  contenidos;  ●  sugerir  ejercicios  relacionados;  ●  orientar  al  estudiante  cuando  encuentre  dificultades.  
 
8.1.11  Acciones  rápidas  
Dependiendo  del  contexto,  el  Tutor  IA  podrá  ofrecer  acciones  como:  
●  explicar  este  concepto;  ●  generar  un  ejemplo;  ●  resumir  la  lección;  ●  practicar  vocabulario;  ●  preparar  un  cuestionario  rápido.  
Estas  acciones  reducirán  el  tiempo  necesario  para  solicitar  ayuda.  
 
8.1.12  Integraciones  
El  Tutor  IA  interactúa  con:  
Courses

│  Lessons  │  Progress  │  Activities  │  Assessments  │  Recommendations  │  Dashboard  
No  modifica  la  información  de  estos  módulos,  únicamente  la  utiliza  como  contexto  para  
generar
 
respuestas
 
más
 
útiles.
 
 
8.1.13  Reglas  de  negocio  
El  Tutor  IA  deberá  cumplir  las  siguientes  reglas.  
●  No  alterará  el  contenido  oficial  del  curso.  ●  No  modificará  el  progreso  del  estudiante.  ●  No  aprobará  evaluaciones.  ●  Todas  las  respuestas  deberán  adaptarse  al  contexto  disponible.  ●  La  asistencia  será  complementaria  al  aprendizaje,  nunca  sustitutiva  del  profesor.  ●  Las  conversaciones  podrán  almacenarse  según  la  política  de  privacidad  y  retención  
de
 
datos
 
de
 
la
 
plataforma.
 
 
8.1.14  Métricas  
Los  indicadores  principales  serán:  
●  conversaciones  iniciadas;  ●  preguntas  por  sesión;  ●  tiempo  medio  de  interacción;  ●  utilización  por  módulo;  ●  tasa  de  reutilización  del  Tutor  IA;  ●  valoración  de  utilidad  por  parte  del  usuario.

8.1.15  Criterios  de  aceptación  
El  módulo  se  considerará  correctamente  implementado  cuando:  
●  el  Tutor  IA  esté  disponible  desde  todos  los  módulos  definidos;  ●  las  respuestas  utilicen  correctamente  el  contexto  disponible;  ●  el  historial  mantenga  la  conversación  durante  la  sesión;  ●  las  acciones  rápidas  funcionen  según  el  contexto;  ●  el  diseño  respete  el  Design  System;  ●  la  experiencia  sea  consistente  en  escritorio,  tableta  y  móvil.  
 
8.1.16  Evolución  futura  
En  futuras  versiones  podrán  incorporarse:  
●  conversación  por  voz;  ●  práctica  de  pronunciación;  ●  simulaciones  de  conversación  en  inglés;  ●  planes  de  estudio  personalizados  mediante  IA;  ●  generación  dinámica  de  ejercicios;  ●  análisis  automático  de  fortalezas  y  debilidades;  ●  tutor  proactivo  capaz  de  anticipar  dificultades  del  estudiante.  
 
8.1.17  Declaración  del  módulo  Tutor  IA  
El  Tutor  IA  constituye  el  asistente  inteligente  de  Elevate  y  acompaña  al  
estudiante
 
durante
 
todo
 
su
 
recorrido
 
de
 
aprendizaje.
 
Su
 
misión
 
es
 
proporcionar
 
ayuda
 
contextual,
 
personalizada
 
e
 
inmediata
 
que
 
complemente
 
el
 
contenido
 
académico
 
y
 
favorezca
 
un
 
aprendizaje
 
más
 
autónomo,
 
eficaz
 
y
 
continuo,
 
manteniendo
 
siempre
 
al
 
estudiante
 
en
 
el
 
centro
 
de
 
la
 
experiencia
 
educativa.
 
  
Capítulo  8.2  —  Búsqueda  Global

8.2.1  Propósito  
La  Búsqueda  Global  proporciona  un  punto  único  de  acceso  a  toda  la  información  
disponible
 
en
 
Elevate.
 
Su  propósito  es  permitir  que  el  usuario  localice  cualquier  recurso  de  la  plataforma  de  forma  
rápida,
 
independientemente
 
del
 
módulo
 
en
 
el
 
que
 
se
 
encuentre,
 
reduciendo
 
el
 
tiempo
 
de
 
navegación
 
y
 
mejorando
 
la
 
productividad.
 
La  búsqueda  debe  actuar  como  una  herramienta  universal  de  acceso  al  conocimiento  y  a  
las
 
funcionalidades
 
de
 
Elevate.
 
 
8.2.2  Objetivos  
El  módulo  persigue  los  siguientes  objetivos:  
●  localizar  información  rápidamente;  ●  reducir  el  número  de  clics  necesarios  para  acceder  a  un  recurso;  ●  unificar  la  experiencia  de  búsqueda;  ●  ofrecer  resultados  relevantes;  ●  facilitar  la  navegación  entre  módulos;  ●  aumentar  la  eficiencia  del  usuario.  
 
8.2.3  Alcance  
Incluye  
●  búsqueda  global;  ●  resultados  unificados;  ●  sugerencias;  ●  historial  de  búsquedas;  ●  resultados  por  categorías;  ●  navegación  directa.  
No  incluye  
●  búsquedas  externas  a  Elevate;  ●  indexación  de  contenido  privado  no  autorizado.

8.2.4  Actores  
Actor  Participación  
Estudiante  Principal  
Profesor  Principal  
Administrador  Principal  
Sistema  Indexación  y  recuperación  de  resultados   
8.2.5  Objetivos  de  experiencia  
El  usuario  debe  poder  responder  inmediatamente  a  las  siguientes  preguntas:  
1.  ¿Dónde  está  lo  que  busco?  2.  ¿Existe  algún  resultado  relacionado?  3.  ¿Puedo  acceder  directamente  desde  aquí?  4.  ¿Qué  recursos  similares  existen?  5.  ¿Qué  consulté  recientemente?  
 
8.2.6  Arquitectura  funcional  
Búsqueda  Global  │  ├──  Campo  de  búsqueda  ├──  Sugerencias  ├──  Resultados  ├──  Categorías  ├──  Historial  └──  Acceso  rápido   
8.2.7  Acceso

La  Búsqueda  Global  estará  disponible  permanentemente  desde  la  navegación  principal  de  
Elevate.
 
También  podrá  abrirse  mediante  un  atajo  de  teclado  en  plataformas  compatibles.  
El  acceso  deberá  requerir  una  única  interacción.  
 
8.2.8  Recursos  indexados  
La  versión  1.0  permitirá  buscar,  como  mínimo:  
●  cursos;  ●  unidades;  ●  lecciones;  ●  evaluaciones;  ●  actividades;  ●  certificados;  ●  publicaciones  de  la  comunidad;  ●  usuarios  visibles  según  permisos;  ●  páginas  principales  de  la  plataforma.  
Cada  resultado  respetará  las  reglas  de  autorización  del  usuario.  
 
8.2.9  Sugerencias  
Mientras  el  usuario  escribe,  el  sistema  mostrará  sugerencias  dinámicas.  
Las  sugerencias  podrán  incluir:  
●  coincidencias  exactas;  ●  búsquedas  recientes;  ●  recursos  más  utilizados;  ●  resultados  destacados.  
El  objetivo  es  reducir  el  tiempo  necesario  para  completar  una  búsqueda.  
 
8.2.10  Resultados  
Los  resultados  aparecerán  agrupados  por  categorías.

Ejemplo:  
Cursos  ───────  English  Survival  Kit   Lecciones  ──────────  Present  Simple   Actividades  ────────────  Writing  Exercise  2   Comunidad  ──────────  Present  Simple  Questions  
Cada  resultado  mostrará  la  información  mínima  necesaria  para  identificar  el  recurso.  
 
8.2.11  Navegación  
Al  seleccionar  un  resultado  el  usuario  accederá  directamente  al  recurso  correspondiente.  
Siempre  que  sea  posible,  el  sistema  abrirá  el  contenido  en  su  contexto  original.  
Ejemplos:  
●  una  lección  dentro  de  su  curso;  ●  una  actividad  dentro  del  módulo  Actividades;  ●  una  publicación  dentro  de  Comunidad.  
 
8.2.12  Historial  
La  búsqueda  conservará  un  historial  personal  de  consultas  recientes.  
El  usuario  podrá:  
●  reutilizar  búsquedas  anteriores;  ●  eliminar  entradas  del  historial;  ●  borrar  completamente  el  historial  cuando  lo  desee.

8.2.13  Estados  
La  búsqueda  contemplará  los  siguientes  estados.  
Estado  Descripción  
Sin  búsqueda  Campo  vacío.  
Buscando  Recuperación  de  resultados.  
Con  resultados  
Existen  coincidencias.  
Sin  resultados  No  se  han  encontrado  coincidencias.  
Error  No  ha  sido  posible  completar  la  búsqueda.   
8.2.14  Integraciones  
La  Búsqueda  Global  interactúa  con  prácticamente  todos  los  módulos  de  Elevate.  
Courses  │  Lessons  │  Activities  │  Assessments  │  Community  │  Certificates  │  Profile  │  Dashboard  
Todos  los  módulos  podrán  exponer  información  para  ser  indexada  según  los  permisos  del  
usuario.

8.2.15  Reglas  de  negocio  
El  módulo  deberá  cumplir  las  siguientes  reglas.  
●  Los  resultados  respetarán  siempre  los  permisos  del  usuario.  ●  Los  recursos  no  autorizados  nunca  aparecerán  en  los  resultados.  ●  El  historial  será  privado  para  cada  usuario.  ●  Las  sugerencias  se  actualizarán  dinámicamente  durante  la  escritura.  ●  Los  resultados  se  ordenarán  por  relevancia.  
 
8.2.16  Métricas  
Los  indicadores  principales  serán:  
●  búsquedas  realizadas;  ●  tiempo  medio  hasta  seleccionar  un  resultado;  ●  porcentaje  de  búsquedas  con  resultados;  ●  recursos  más  consultados;  ●  utilización  del  historial;  ●  búsquedas  sin  resultados.  
Estos  indicadores  permitirán  optimizar  la  experiencia  de  búsqueda.  
 
8.2.17  Criterios  de  aceptación  
El  módulo  se  considerará  correctamente  implementado  cuando:  
●  los  resultados  aparezcan  en  menos  del  tiempo  objetivo  definido  por  la  plataforma;  ●  los  recursos  se  agrupen  correctamente  por  categorías;  ●  las  sugerencias  se  actualicen  dinámicamente;  ●  la  navegación  abra  el  recurso  correcto;  ●  los  permisos  se  respeten  en  todos  los  resultados;  ●  el  diseño  respete  el  Design  System  y  sea  consistente  en  escritorio,  tableta  y  móvil.  
 
8.2.18  Evolución  futura  
En  futuras  versiones  podrán  incorporarse:

●  búsqueda  semántica  mediante  IA;  ●  consultas  en  lenguaje  natural;  ●  comandos  rápidos  ("Ir  a...",  "Abrir...");  ●  filtros  avanzados;  ●  búsqueda  por  voz;  ●  recomendaciones  inteligentes  basadas  en  el  contexto  del  usuario.  
 
8.2.19  Declaración  del  módulo  Búsqueda  
Global
 
La  Búsqueda  Global  constituye  el  punto  de  acceso  universal  a  la  
información
 
de
 
Elevate.
 
Su
 
misión
 
es
 
permitir
 
que
 
cualquier
 
recurso
 
pueda
 
localizarse
 
de
 
forma
 
rápida,
 
precisa
 
y
 
contextual,
 
reduciendo
 
la
 
fricción
 
en
 
la
 
navegación
 
y
 
facilitando
 
que
 
estudiantes,
 
profesores
 
y
 
administradores
 
accedan
 
inmediatamente
 
al
 
contenido
 
que
 
necesitan,
 
respetando
 
siempre
 
las
 
reglas
 
de
 
seguridad
 
y
 
autorización
 
de
 
la
 
plataforma.
 
 
Capítulo  8.3  —  Accesibilidad  
 
8.3.1  Propósito  
La  Accesibilidad  garantiza  que  Elevate  pueda  utilizarse  por  el  mayor  número  posible  de  
personas,
 
independientemente
 
de
 
sus
 
capacidades,
 
limitaciones
 
o
 
del
 
dispositivo
 
utilizado.
 
Su  propósito  es  eliminar  barreras  de  acceso  al  aprendizaje  mediante  un  diseño  inclusivo  
que
 
forme
 
parte
 
de
 
la
 
arquitectura
 
del
 
producto
 
desde
 
su
 
concepción
 
y
 
no
 
como
 
una
 
funcionalidad
 
adicional.
 
La  accesibilidad  constituye  un  principio  transversal  de  todo  el  ecosistema  Elevate.  
 
8.3.2  Objetivos  
El  sistema  de  accesibilidad  persigue  los  siguientes  objetivos:

●  garantizar  un  acceso  inclusivo;  ●  facilitar  la  navegación  a  todos  los  usuarios;  ●  mejorar  la  usabilidad  general;  ●  cumplir  los  estándares  internacionales;  ●  reducir  barreras  cognitivas  y  físicas;  ●  ofrecer  una  experiencia  consistente  en  toda  la  plataforma.  
 
8.3.3  Alcance  
Incluye  
●  navegación  mediante  teclado;  ●  compatibilidad  con  lectores  de  pantalla;  ●  contraste  adecuado;  ●  escalado  tipográfico;  ●  indicadores  de  foco;  ●  reducción  de  movimiento;  ●  estructura  semántica.  
No  incluye  
●  tecnologías  de  asistencia  externas;  ●  hardware  específico  del  usuario.  
 
8.3.4  Actores  
Actor  Participación  
Estudiante  Principal  
Profesor  Principal  
Administrador  Principal  
Sistema  Aplicación  de  estándares  de  accesibilidad   
8.3.5  Objetivos  de  experiencia

Todos  los  usuarios  deberán  poder:  
1.  Navegar  por  la  plataforma  sin  utilizar  un  ratón.  2.  Comprender  correctamente  la  información  presentada.  3.  Identificar  fácilmente  los  elementos  interactivos.  4.  Completar  tareas  sin  barreras  innecesarias.  5.  Mantener  una  experiencia  consistente  independientemente  de  sus  capacidades.  
 
8.3.6  Arquitectura  funcional  
Accesibilidad  │  ├──  Navegación  ├──  Lectores  de  pantalla  ├──  Contraste  ├──  Tipografía  ├──  Movimiento  ├──  Formularios  └──  Contenido   
8.3.7  Navegación  mediante  teclado  
Toda  la  plataforma  deberá  ser  completamente  navegable  mediante  teclado.  
Como  mínimo  deberá  garantizar:  
●  orden  lógico  de  tabulación;  ●  indicadores  visibles  de  foco;  ●  acceso  a  todos  los  controles  interactivos;  ●  activación  mediante  teclado;  ●  ausencia  de  bloqueos  de  navegación.  
 
8.3.8  Lectores  de  pantalla  
La  interfaz  deberá  ser  compatible  con  tecnologías  de  asistencia.  
Para  ello  se  utilizarán:  
●  estructura  semántica  correcta;  ●  etiquetas  descriptivas;

●  nombres  accesibles;  ●  atributos  ARIA  únicamente  cuando  sean  necesarios.  
La  información  deberá  poder  comprenderse  sin  apoyo  visual.  
 
8.3.9  Contraste  
Todos  los  elementos  visuales  deberán  cumplir  los  niveles  mínimos  de  contraste  definidos  
por
 
las
 
WCAG.
 
Especial  atención  a:  
●  texto;  ●  botones;  ●  iconos;  ●  enlaces;  ●  indicadores  de  estado;  ●  formularios.  
El  contraste  nunca  dependerá  únicamente  del  color.  
 
8.3.10  Tipografía  
El  sistema  tipográfico  deberá  permitir:  
●  escalado  sin  pérdida  de  funcionalidad;  ●  espaciado  legible;  ●  longitud  de  línea  adecuada;  ●  jerarquía  visual  consistente.  
La  plataforma  deberá  mantenerse  utilizable  con  aumentos  significativos  del  tamaño  del  
texto.
 
 
8.3.11  Movimiento  
Las  animaciones  deberán  respetar  las  preferencias  del  usuario.  
Cuando  el  sistema  detecte  una  preferencia  por  reducir  el  movimiento:

●  se  minimizarán  las  animaciones;  ●  se  eliminarán  efectos  innecesarios;  ●  se  mantendrán  únicamente  las  transiciones  imprescindibles  para  la  comprensión  de  
la
 
interfaz.
 
 
8.3.12  Formularios  
Todos  los  formularios  deberán  cumplir  las  siguientes  reglas:  
●  etiquetas  asociadas  correctamente;  ●  mensajes  de  error  comprensibles;  ●  identificación  clara  de  campos  obligatorios;  ●  ayuda  contextual  cuando  sea  necesaria;  ●  validación  accesible.  
Los  errores  deberán  describirse  mediante  texto  y  no  únicamente  mediante  colores.  
 
8.3.13  Contenido  
El  contenido  deberá  ser  comprensible  y  estructurado.  
Como  mínimo:  
●  títulos  jerárquicos;  ●  listas  correctamente  marcadas;  ●  tablas  accesibles;  ●  imágenes  con  texto  alternativo  cuando  aporten  información;  ●  enlaces  descriptivos.  
 
8.3.14  Integraciones  
La  accesibilidad  afecta  a  todos  los  módulos  de  Elevate.  
Todos  los  módulos          │  ────────┼────────          │  Design  System

Frontend  Componentes  
Todo  nuevo  componente  deberá  cumplir  las  reglas  definidas  en  este  capítulo  antes  de  
incorporarse
 
al
 
producto.
 
 
8.3.15  Reglas  de  negocio  
El  sistema  deberá  cumplir  las  siguientes  reglas.  
●  Ninguna  funcionalidad  dependerá  exclusivamente  del  uso  del  ratón.  ●  Toda  información  importante  deberá  presentarse  mediante  más  de  un  canal  visual.  ●  Los  componentes  reutilizables  deberán  ser  accesibles  por  defecto.  ●  Las  nuevas  funcionalidades  deberán  validarse  desde  el  punto  de  vista  de  la  
accesibilidad
 
antes
 
de
 
su
 
publicación.
 ●  La  accesibilidad  constituye  un  criterio  obligatorio  de  aceptación  del  producto.  
 
8.3.16  Métricas  
Los  indicadores  principales  serán:  
●  porcentaje  de  componentes  accesibles;  ●  incidencias  de  accesibilidad  detectadas;  ●  cumplimiento  de  auditorías  WCAG;  ●  errores  corregidos;  ●  cobertura  de  pruebas  de  accesibilidad.  
Estos  indicadores  permitirán  mantener  una  mejora  continua  del  producto.  
 
8.3.17  Criterios  de  aceptación  
El  sistema  se  considerará  correctamente  implementado  cuando:  
●  toda  la  plataforma  pueda  utilizarse  mediante  teclado;  ●  los  componentes  sean  compatibles  con  lectores  de  pantalla;  ●  se  respeten  los  niveles  mínimos  de  contraste;  ●  las  preferencias  de  reducción  de  movimiento  se  apliquen  correctamente;  ●  todos  los  formularios  sean  accesibles;

●  los  componentes  reutilizados  mantengan  un  comportamiento  accesible  en  todos  los  
dispositivos.
 
 
8.3.18  Evolución  futura  
En  futuras  versiones  podrán  incorporarse:  
●  modo  de  alto  contraste  configurable;  ●  perfiles  de  accesibilidad  personalizados;  ●  ajustes  avanzados  de  tipografía;  ●  lectura  asistida  mediante  IA;  ●  simplificación  automática  de  contenidos;  ●  validación  continua  de  accesibilidad  durante  el  desarrollo.  
 
8.3.19  Declaración  del  sistema  de  
Accesibilidad
 
La  accesibilidad  forma  parte  de  la  arquitectura  fundamental  de  Elevate  y  
garantiza
 
que
 
la
 
plataforma
 
pueda
 
ser
 
utilizada
 
por
 
el
 
mayor
 
número
 
posible
 
de
 
personas
 
sin
 
barreras
 
innecesarias.
 
Mediante
 
el
 
cumplimiento
 
de
 
estándares
 
internacionales,
 
componentes
 
accesibles
 
por
 
defecto
 
y
 
una
 
experiencia
 
inclusiva
 
desde
 
el
 
diseño,
 
Elevate
 
sitúa
 
la
 
igualdad
 
de
 
acceso
 
al
 
aprendizaje
 
como
 
un
 
principio
 
permanente
 
del
 
producto.
 
 
Capítulo  8.4  —  Experiencia  
Multidispositivo
 
 
8.4.1  Propósito  
La  Experiencia  Multidispositivo  garantiza  que  Elevate  pueda  utilizarse  de  forma  
consistente
 
desde
 
cualquier
 
dispositivo
 
compatible,
 
permitiendo
 
al
 
usuario
 
continuar
 
su
 
aprendizaje
 
sin
 
interrupciones.

Su  propósito  es  adaptar  la  interfaz  y  la  interacción  a  cada  contexto  de  uso,  manteniendo  
siempre
 
la
 
continuidad
 
del
 
aprendizaje
 
y
 
la
 
sincronización
 
del
 
progreso.
 
El  dispositivo  utilizado  nunca  debe  condicionar  la  calidad  de  la  experiencia  educativa.  
 
8.4.2  Objetivos  
La  experiencia  multidispositivo  persigue  los  siguientes  objetivos:  
●  ofrecer  una  experiencia  consistente;  ●  adaptar  la  interfaz  al  dispositivo;  ●  mantener  el  progreso  sincronizado;  ●  facilitar  la  continuidad  del  aprendizaje;  ●  optimizar  la  interacción  táctil  y  mediante  ratón;  ●  minimizar  diferencias  funcionales  entre  plataformas.  
 
8.4.3  Alcance  
Incluye  
●  diseño  responsive;  ●  adaptación  de  componentes;  ●  sincronización  del  progreso;  ●  continuidad  entre  dispositivos;  ●  optimización  para  interacción  táctil;  ●  comportamiento  adaptable.  
No  incluye  
●  aplicaciones  nativas  específicas;  ●  funcionalidades  exclusivas  para  un  dispositivo  concreto.  
 
8.4.4  Actores  
Actor  Participación

Estudiante  Principal  
Profesor  Principal  
Administrador  Principal  
Sistema  Sincronización  automática   
8.4.5  Objetivos  de  experiencia  
El  usuario  debe  poder:  
1.  Comenzar  una  actividad  en  un  dispositivo  y  continuarla  en  otro.  2.  Encontrar  siempre  la  misma  organización  de  la  plataforma.  3.  Acceder  a  todas  las  funcionalidades  principales  independientemente  del  dispositivo.  4.  Mantener  el  progreso  actualizado  en  tiempo  real.  5.  Utilizar  una  interfaz  adaptada  al  tamaño  de  la  pantalla.  
 
8.4.6  Arquitectura  funcional  
Experiencia  Multidispositivo  │  ├──  Responsive  Layout  ├──  Sincronización  ├──  Adaptación  de  componentes  ├──  Continuidad  ├──  Optimización  táctil  └──  Rendimiento   
8.4.7  Dispositivos  soportados  
La  versión  1.0  de  Elevate  está  diseñada  para  funcionar  en:  
●  escritorio;  ●  ordenador  portátil;  ●  tableta;  ●  teléfono  móvil.  
Todos  los  dispositivos  compartirán  el  mismo  conjunto  de  funcionalidades  esenciales.

8.4.8  Diseño  responsive  
La  interfaz  deberá  adaptarse  automáticamente  al  tamaño  disponible.  
La  adaptación  afectará,  entre  otros  elementos,  a:  
●  navegación;  ●  distribución  de  tarjetas;  ●  paneles  laterales;  ●  tablas;  ●  formularios;  ●  gráficos;  ●  componentes  del  Design  System.  
La  adaptación  nunca  deberá  comprometer  la  usabilidad.  
 
8.4.9  Continuidad  del  aprendizaje  
El  sistema  conservará  automáticamente:  
●  curso  activo;  ●  unidad;  ●  lección;  ●  posición  dentro  del  contenido;  ●  progreso;  ●  actividad  en  curso  cuando  sea  posible.  
El  estudiante  podrá  cambiar  de  dispositivo  sin  perder  el  contexto.  
 
8.4.10  Sincronización  
Toda  la  información  relevante  deberá  sincronizarse  automáticamente.  
Como  mínimo:  
●  progreso;  ●  actividades;  ●  evaluaciones;

●  certificados;  ●  logros;  ●  preferencias;  ●  notificaciones.  
La  sincronización  deberá  realizarse  de  forma  transparente  para  el  usuario.  
 
8.4.11  Adaptación  de  la  navegación  
La  navegación  principal  se  ajustará  al  dispositivo.  
Ejemplos:  
Escritorio  
●  Sidebar  permanente.  ●  Mayor  densidad  de  información.  ●  Espacios  de  trabajo  amplios.  
Tableta  
●  Sidebar  colapsable.  ●  Controles  táctiles  optimizados.  
Móvil  
●  Navegación  simplificada.  ●  Menús  adaptados.  ●  Prioridad  al  contenido  principal.  
La  arquitectura  funcional  permanecerá  constante  en  todos  los  dispositivos.  
 
8.4.12  Optimización  táctil  
En  dispositivos  táctiles  deberán  cumplirse  las  siguientes  reglas:  
●  áreas  de  pulsación  suficientes;  ●  separación  adecuada  entre  controles;  ●  desplazamiento  fluido;  ●  gestos  intuitivos  cuando  aporten  valor.  
La  interacción  táctil  no  deberá  dificultar  el  acceso  a  ninguna  funcionalidad.

8.4.13  Rendimiento  
La  experiencia  deberá  mantenerse  fluida  independientemente  del  dispositivo.  
Se  priorizará:  
●  carga  progresiva;  ●  reutilización  de  componentes;  ●  optimización  de  imágenes;  ●  reducción  de  operaciones  innecesarias;  ●  tiempos  de  respuesta  consistentes.  
 
8.4.14  Integraciones  
La  experiencia  multidispositivo  afecta  a  toda  la  plataforma.  
Todos  los  módulos          │  ────────┼────────          │  Frontend  Design  System  Progress  Authentication  
Todos  los  módulos  deberán  respetar  las  mismas  reglas  de  adaptación.  
 
8.4.15  Reglas  de  negocio  
El  sistema  deberá  cumplir  las  siguientes  reglas.  
●  El  progreso  será  único  para  todos  los  dispositivos.  ●  Ningún  dispositivo  ofrecerá  información  distinta  según  el  mismo  rol  de  usuario.  ●  Las  preferencias  personales  se  sincronizarán  automáticamente.  ●  Los  cambios  realizados  en  un  dispositivo  estarán  disponibles  en  el  resto  tras  la  
sincronización.
 ●  La  adaptación  de  la  interfaz  nunca  modificará  el  comportamiento  funcional  del  
producto.

8.4.16  Métricas  
Los  indicadores  principales  serán:  
●  distribución  de  uso  por  dispositivo;  ●  continuidad  entre  dispositivos;  ●  tiempo  medio  de  carga;  ●  incidencias  relacionadas  con  responsive;  ●  abandono  por  tipo  de  dispositivo;  ●  rendimiento  de  la  interfaz.  
Estos  indicadores  permitirán  optimizar  la  experiencia  en  cada  plataforma.  
 
8.4.17  Criterios  de  aceptación  
El  sistema  se  considerará  correctamente  implementado  cuando:  
●  la  interfaz  se  adapte  correctamente  a  escritorio,  tableta  y  móvil;  ●  el  progreso  permanezca  sincronizado  entre  dispositivos;  ●  la  navegación  mantenga  la  misma  estructura  conceptual;  ●  todos  los  componentes  del  Design  System  sean  responsive;  ●  el  rendimiento  cumpla  los  objetivos  definidos  para  la  plataforma.  
 
8.4.18  Evolución  futura  
En  futuras  versiones  podrán  incorporarse:  
●  aplicaciones  nativas  para  iOS  y  Android;  ●  funcionamiento  offline  con  sincronización  diferida;  ●  continuidad  entre  dispositivos  en  tiempo  real;  ●  adaptación  específica  para  pantallas  de  gran  formato;  ●  soporte  para  dispositivos  plegables;  ●  integración  con  wearables  para  notificaciones  y  seguimiento  de  hábitos.

8.4.19  Declaración  del  sistema  de  
Experiencia
 
Multidispositivo
 
La  Experiencia  Multidispositivo  garantiza  que  Elevate  ofrezca  un  
aprendizaje
 
continuo
 
e
 
independiente
 
del
 
dispositivo
 
utilizado.
 
Mediante
 
una
 
interfaz
 
adaptable,
 
una
 
sincronización
 
permanente
 
y
 
una
 
arquitectura
 
coherente,
 
la
 
plataforma
 
permite
 
que
 
estudiantes,
 
profesores
 
y
 
administradores
 
mantengan
 
su
 
actividad
 
sin
 
interrupciones,
 
preservando
 
el
 
contexto
 
y
 
la
 
calidad
 
de
 
la
 
experiencia
 
en
 
cualquier
 
entorno
 
de
 
uso.
 
 
Capítulo  8.5  —  Microinteracciones  
 
8.5.1  Propósito  
Las  Microinteracciones  constituyen  el  conjunto  de  respuestas  visuales  y  comportamientos  
que
 
acompañan
 
las
 
acciones
 
del
 
usuario
 
dentro
 
de
 
Elevate.
 
Su  propósito  es  proporcionar  feedback  inmediato,  reforzar  la  comprensión  de  la  interfaz  y  
aumentar
 
la
 
calidad
 
percibida
 
del
 
producto
 
mediante
 
pequeñas
 
interacciones
 
coherentes
 
y
 
funcionales.
 
Las  microinteracciones  no  tienen  un  objetivo  decorativo;  su  función  es  mejorar  la  usabilidad  
y
 
facilitar
 
la
 
comunicación
 
entre
 
el
 
sistema
 
y
 
el
 
usuario.
 
 
8.5.2  Objetivos  
El  sistema  persigue  los  siguientes  objetivos:  
●  proporcionar  feedback  inmediato;  ●  comunicar  cambios  de  estado;  ●  reducir  la  incertidumbre;  ●  reforzar  la  sensación  de  fluidez;  ●  mejorar  la  percepción  de  calidad;  ●  facilitar  la  comprensión  de  la  interfaz.

8.5.3  Alcance  
Incluye  
●  animaciones  funcionales;  ●  estados  de  transición;  ●  indicadores  de  carga;  ●  feedback  visual;  ●  confirmaciones;  ●  cambios  de  estado;  ●  transiciones  entre  pantallas.  
No  incluye  
●  animaciones  decorativas  sin  propósito  funcional;  ●  efectos  que  dificulten  el  rendimiento  o  la  accesibilidad.  
 
8.5.4  Actores  
Actor  Participación  
Estudiante  Principal  
Profesor  Principal  
Administrador  Principal  
Sistema  Generación  automática  de  feedback   
8.5.5  Objetivos  de  experiencia  
El  usuario  debe  percibir  en  todo  momento:  
1.  Que  su  acción  ha  sido  reconocida.  2.  Qué  está  ocurriendo.  3.  Cuándo  una  operación  ha  finalizado.  4.  Si  existe  algún  error.  5.  Qué  puede  hacer  a  continuación.

Ninguna  acción  importante  deberá  producirse  sin  una  respuesta  visual  del  sistema.  
 
8.5.6  Arquitectura  funcional  
Microinteracciones  │  ├──  Feedback  ├──  Transiciones  ├──  Estados  ├──  Animaciones  ├──  Confirmaciones  └──  Indicadores   
8.5.7  Feedback  inmediato  
Toda  interacción  significativa  deberá  producir  una  respuesta  visual.  
Ejemplos:  
●  pulsación  de  botones;  ●  selección  de  elementos;  ●  apertura  de  paneles;  ●  envío  de  formularios;  ●  finalización  de  una  lección.  
El  feedback  deberá  producirse  de  forma  prácticamente  inmediata.  
 
8.5.8  Indicadores  de  carga  
Cuando  una  operación  requiera  tiempo  de  procesamiento  se  mostrarán  indicadores  
apropiados.
 
La  plataforma  utilizará:  
●  Skeleton  Loaders;  ●  barras  de  progreso;  ●  indicadores  circulares;  ●  estados  de  carga  específicos  del  componente.  
Se  evitarán  pantallas  completamente  vacías  durante  la  carga.

8.5.9  Confirmaciones  
Las  acciones  completadas  correctamente  deberán  comunicarse  mediante  componentes  
consistentes.
 
Ejemplos:  
●  actividad  enviada;  ●  perfil  actualizado;  ●  lección  completada;  ●  logro  desbloqueado;  ●  certificado  emitido.  
Las  confirmaciones  deberán  ser  visibles  sin  interrumpir  el  flujo  de  trabajo.  
 
8.5.10  Gestión  de  errores  
Los  errores  deberán  comunicar:  
●  qué  ha  ocurrido;  ●  por  qué  puede  haber  sucedido;  ●  qué  puede  hacer  el  usuario  para  solucionarlo  cuando  sea  posible.  
Se  utilizarán  los  componentes  oficiales  Error  State  y  Toast  definidos  en  el  Design  System.  
 
8.5.11  Transiciones  
Las  transiciones  deberán  facilitar  la  continuidad  visual  entre  estados.  
Se  aplicarán  principalmente  en:  
●  navegación;  ●  apertura  de  diálogos;  ●  cambios  de  vista;  ●  expansión  de  contenido;  ●  actualización  dinámica  de  información.  
Las  transiciones  deberán  ser  rápidas  y  discretas.

8.5.12  Animaciones  
Las  animaciones  deberán  cumplir  los  siguientes  principios:  
●  aportar  significado;  ●  reforzar  la  interacción;  ●  mantener  la  continuidad;  ●  evitar  distracciones.  
Las  animaciones  repetitivas  o  innecesarias  deberán  evitarse.  
 
8.5.13  Estados  visuales  
Todos  los  componentes  interactivos  deberán  representar  claramente  sus  estados.  
Como  mínimo:  
●  normal;  ●  hover;  ●  focus;  ●  activo;  ●  deshabilitado;  ●  cargando;  ●  error.  
Los  estados  deberán  mantenerse  consistentes  en  toda  la  plataforma.  
 
8.5.14  Integraciones  
Las  microinteracciones  afectan  a  todos  los  módulos  de  Elevate.  
Todos  los  módulos          │  ────────┼────────          │  Design  System  Frontend  Componentes

Todo  nuevo  componente  deberá  incorporar  las  microinteracciones  oficiales  definidas  por  el  
sistema
 
de
 
diseño.
 
 
8.5.15  Reglas  de  negocio  
El  sistema  deberá  cumplir  las  siguientes  reglas.  
●  Toda  acción  relevante  generará  feedback  visual.  ●  Las  animaciones  nunca  bloquearán  la  interacción  del  usuario.  ●  Las  microinteracciones  respetarán  las  preferencias  de  accesibilidad  relacionadas  
con
 
la
 
reducción
 
del
 
movimiento.
 ●  Todos  los  componentes  reutilizables  compartirán  los  mismos  patrones  de  
interacción.
 ●  La  ausencia  de  conexión  o  errores  de  red  deberán  comunicarse  claramente.  
 
8.5.16  Métricas  
Los  indicadores  principales  serán:  
●  tiempo  medio  de  respuesta  percibido;  ●  utilización  de  estados  de  carga;  ●  frecuencia  de  errores;  ●  abandono  durante  operaciones;  ●  satisfacción  percibida  de  la  interfaz.  
Estos  indicadores  permitirán  evaluar  la  calidad  de  la  experiencia  de  interacción.  
 
8.5.17  Criterios  de  aceptación  
El  sistema  se  considerará  correctamente  implementado  cuando:  
●  todas  las  acciones  relevantes  produzcan  feedback  inmediato;  ●  los  estados  de  carga  utilicen  los  componentes  oficiales;  ●  las  confirmaciones  y  errores  sean  consistentes;  ●  las  transiciones  mantengan  la  continuidad  visual;  ●  las  animaciones  respeten  las  preferencias  de  accesibilidad;  ●  el  comportamiento  sea  uniforme  en  escritorio,  tableta  y  móvil.

8.5.18  Evolución  futura  
En  futuras  versiones  podrán  incorporarse:  
●  animaciones  adaptativas  según  el  contexto;  ●  retroalimentación  háptica  en  dispositivos  compatibles;  ●  microinteracciones  personalizables;  ●  animaciones  generadas  dinámicamente  mediante  IA;  ●  transiciones  avanzadas  entre  módulos;  ●  personalización  del  nivel  de  animación  según  preferencias  del  usuario.  
 
8.5.19  Declaración  del  sistema  de  
Microinteracciones
 
Las  Microinteracciones  constituyen  la  capa  de  comunicación  inmediata  
entre
 
Elevate
 
y
 
sus
 
usuarios.
 
Mediante
 
respuestas
 
visuales
 
coherentes,
 
estados
 
claramente
 
definidos
 
y
 
transiciones
 
funcionales,
 
contribuyen
 
a
 
que
 
la
 
plataforma
 
resulte
 
más
 
intuitiva,
 
predecible
 
y
 
agradable
 
de
 
utilizar,
 
reforzando
 
la
 
percepción
 
de
 
calidad
 
sin
 
interferir
 
en
 
el
 
proceso
 
de
 
aprendizaje.
 
 
Capítulo  9  —  Acceptance  Criteria  
 
9.1  Propósito  
Los  Acceptance  Criteria  establecen  las  condiciones  objetivas  que  debe  cumplir  cualquier  
funcionalidad
 
antes
 
de
 
incorporarse
 
oficialmente
 
a
 
Elevate.
 
Su  propósito  es  garantizar  que  todas  las  entregas  mantengan  un  nivel  homogéneo  de  
calidad,
 
respeten
 
la
 
visión
 
del
 
producto
 
y
 
puedan
 
validarse
 
mediante
 
criterios
 
verificables.
 
Los  criterios  de  aceptación  constituyen  el  contrato  común  entre  Product  Management,  UX,  
Diseño,
 
Desarrollo
 
y
 
QA.

9.2  Objetivos  
Este  capítulo  persigue  los  siguientes  objetivos:  
●  unificar  los  criterios  de  validación;  ●  reducir  interpretaciones  ambiguas;  ●  asegurar  la  calidad  del  producto;  ●  facilitar  la  validación  funcional;  ●  garantizar  la  consistencia  entre  módulos;  ●  establecer  una  definición  común  de  entrega.  
 
9.3  Principios  
Toda  funcionalidad  deberá  cumplir  los  siguientes  principios:  
●  verificabilidad;  ●  objetividad;  ●  trazabilidad;  ●  consistencia;  ●  calidad;  ●  orientación  al  usuario.  
Ninguna  funcionalidad  podrá  aprobarse  mediante  criterios  subjetivos.  
 
9.4  Definition  of  Ready  (DoR)  
Una  funcionalidad  únicamente  podrá  comenzar  su  desarrollo  cuando  cumpla  los  siguientes  
requisitos.
 
Producto  
●  Objetivo  claramente  definido.  ●  Problema  identificado.  ●  Alcance  aprobado.  ●  Dependencias  conocidas.

Diseño  
●  Flujos  definidos.  ●  Arquitectura  funcional  aprobada.  ●  Componentes  identificados.  ●  Casos  límite  documentados.  
Técnico  
●  Impacto  arquitectónico  evaluado.  ●  APIs  identificadas.  ●  Modelo  de  datos  revisado.  ●  Riesgos  documentados.  
 
9.5  Definition  of  Done  (DoD)  
Una  funcionalidad  únicamente  podrá  considerarse  finalizada  cuando  cumpla  todos  los  
criterios
 
siguientes.
 
Funcionalidad  
●  Cumple  todos  los  requisitos  definidos.  ●  Resuelve  el  problema  identificado.  ●  No  presenta  defectos  conocidos  de  alta  prioridad.  
Diseño  
●  Respeta  el  Design  System.  ●  Mantiene  consistencia  visual.  ●  Sigue  el  UX  Playbook.  
Desarrollo  
●  Código  revisado.  ●  Arquitectura  respetada.  ●  Sin  deuda  técnica  crítica.  
Calidad  
●  Pruebas  superadas.  ●  Sin  regresiones.

●  Validación  funcional  completada.  
Documentación  
●  Especificaciones  actualizadas.  ●  Cambios  documentados.  ●  APIs  documentadas  cuando  proceda.  
 
9.6  Criterios  funcionales  
Toda  funcionalidad  deberá  demostrar  que:  
●  realiza  correctamente  su  objetivo;  ●  respeta  las  reglas  de  negocio;  ●  mantiene  la  coherencia  con  el  resto  del  producto;  ●  contempla  todos  los  estados  definidos;  ●  responde  correctamente  a  errores  previsibles.  
 
9.7  Criterios  de  experiencia  de  usuario  
Toda  nueva  funcionalidad  deberá:  
●  mantener  una  navegación  coherente;  ●  minimizar  la  carga  cognitiva;  ●  ofrecer  feedback  inmediato;  ●  utilizar  componentes  oficiales;  ●  mantener  una  experiencia  consistente  en  toda  la  plataforma.  
 
9.8  Criterios  de  accesibilidad  
La  validación  deberá  comprobar  como  mínimo:  
●  navegación  mediante  teclado;  ●  compatibilidad  con  lectores  de  pantalla;  ●  contraste  suficiente;  ●  indicadores  visibles  de  foco;  ●  formularios  accesibles;

●  cumplimiento  de  los  requisitos  definidos  para  accesibilidad.  
 
9.9  Criterios  de  rendimiento  
Toda  funcionalidad  deberá  respetar  los  objetivos  generales  de  rendimiento  del  producto.  
Se  verificará:  
●  tiempos  de  carga;  ●  fluidez  de  navegación;  ●  consumo  eficiente  de  recursos;  ●  ausencia  de  bloqueos  perceptibles.  
 
9.10  Criterios  de  seguridad  
Antes  de  aprobar  una  funcionalidad  deberá  verificarse:  
●  autenticación;  ●  autorización;  ●  validación  de  entradas;  ●  protección  de  datos;  ●  gestión  correcta  de  errores.  
La  seguridad  forma  parte  de  la  aceptación  del  producto.  
 
9.11  Criterios  de  calidad  
La  funcionalidad  deberá:  
●  superar  las  pruebas  definidas;  ●  mantener  la  estabilidad;  ●  evitar  regresiones;  ●  respetar  la  arquitectura;  ●  reutilizar  componentes  existentes.

9.12  Validación  por  rol  
Cada  funcionalidad  deberá  validarse  desde  la  perspectiva  de  los  roles  afectados.  
Como  mínimo:  
Rol  Validación  
Estudiante  Flujo  principal  de  aprendizaje.  
Profesor  Gestión  académica  correspondiente.  
Administrador  Administración  y  supervisión  cuando  proceda.   
9.13  Gestión  de  incidencias  
Las  incidencias  detectadas  durante  la  validación  se  clasificarán  según  su  impacto.  
Prioridad  Descripción  
Crítica  Impide  el  uso  de  la  funcionalidad.  
Alta  Afecta  significativamente  a  la  experiencia.  
Media  Existe  alternativa  temporal.  
Baja  Impacto  reducido.  
Las  incidencias  críticas  impedirán  la  aprobación  de  la  funcionalidad.  
 
9.14  Checklist  de  aceptación  
Antes  de  aprobar  cualquier  entrega  deberá  completarse  la  siguiente  verificación.  
Criterio  Estado  
Requisitos  funcionales  cumplidos  ☐  
Arquitectura  respetada  ☐  
UX  validada  ☐

Design  System  aplicado  ☐  
Accesibilidad  validada  ☐  
Seguridad  verificada  ☐  
Pruebas  superadas  ☐  
Documentación  actualizada  ☐  
Sin  regresiones  críticas  ☐  
Aprobación  de  Product  ☐  
La  funcionalidad  únicamente  podrá  aprobarse  cuando  todos  los  elementos  estén  
completados.
 
 
9.15  Trazabilidad  
Cada  funcionalidad  deberá  poder  relacionarse  con:  
●  objetivo  del  producto;  ●  módulo  correspondiente;  ●  reglas  de  negocio;  ●  criterios  de  aceptación;  ●  pruebas  realizadas;  ●  versión  publicada.  
La  trazabilidad  permitirá  comprender  el  ciclo  completo  de  cada  capacidad  del  producto.  
 
9.16  Declaración  de  los  Acceptance  
Criteria
 
Los  Acceptance  Criteria  constituyen  el  estándar  oficial  de  validación  de  
Elevate.
 
Mediante
 
criterios
 
objetivos,
 
verificables
 
y
 
compartidos
 
por
 
todas
 
las
 
disciplinas
 
del
 
producto,
 
garantizan
 
que
 
cada
 
funcionalidad
 
incorporada
 
a
 
la
 
plataforma
 
cumpla
 
los
 
niveles
 
esperados
 
de
 
calidad,
 
usabilidad,
 
seguridad
 
y
 
coherencia,
 
preservando
 
la
 
excelencia
 
del
 
ecosistema
 
a
 
medida
 
que
 
evoluciona.

Capítulo  10  —  Specification  Rules  
 
10.1  Propósito  
Las  Specification  Rules  establecen  el  conjunto  de  normas  que  regulan  la  creación,  
mantenimiento
 
y
 
evolución
 
de
 
las
 
especificaciones
 
funcionales
 
de
 
Elevate.
 
Su  propósito  es  garantizar  que  toda  la  documentación  funcional  permanezca  consistente,  
actualizada
 
y
 
alineada
 
con
 
la
 
visión
 
del
 
producto,
 
evitando
 
duplicidades,
 
contradicciones
 
o
 
interpretaciones
 
ambiguas.
 
Estas  reglas  constituyen  el  marco  de  gobernanza  documental  del  Product  Blueprint.  
 
10.2  Objetivos  
Este  capítulo  persigue  los  siguientes  objetivos:  
●  mantener  una  documentación  uniforme;  ●  facilitar  la  evolución  del  producto;  ●  preservar  la  coherencia  entre  módulos;  ●  garantizar  la  trazabilidad  de  las  decisiones;  ●  simplificar  el  trabajo  entre  equipos;  ●  convertir  las  especificaciones  en  una  única  fuente  de  verdad.  
 
10.3  Principios  
Toda  especificación  funcional  deberá  respetar  los  siguientes  principios:  
●  claridad;  ●  precisión;  ●  consistencia;  ●  verificabilidad;  ●  reutilización;  ●  evolución  controlada.

Las  especificaciones  deberán  describir  qué  hace  el  producto ,  no  cómo  se  implementa  
técnicamente
.
 
 
10.4  Estructura  obligatoria  
Toda  nueva  especificación  deberá  seguir  la  estructura  oficial  definida  en  el  Specification  
Framework
.
 
Como  mínimo  incluirá:  
●  propósito;  ●  objetivos;  ●  alcance;  ●  actores;  ●  arquitectura  funcional;  ●  reglas  de  negocio;  ●  estados;  ●  integraciones;  ●  métricas;  ●  criterios  de  aceptación;  ●  evolución  futura.  
No  podrán  omitirse  secciones  sin  una  justificación  documentada.  
 
10.5  Terminología  
Toda  la  documentación  utilizará  la  terminología  oficial  de  Elevate.  
Los  nombres  de  módulos,  componentes  y  conceptos  deberán  mantenerse  constantes  en  
todos
 
los
 
documentos.
 
No  se  utilizarán  sinónimos  cuando  exista  una  denominación  oficial.  
Ejemplos:  
●  Mis  Cursos ,  no  Biblioteca .  ●  Mi  Progreso ,  no  Estadísticas .  ●  Tutor  IA ,  no  Asistente  Inteligente .  ●  Lección ,  no  Tema .

10.6  Gestión  de  cambios  
Toda  modificación  de  una  especificación  deberá:  
●  identificar  el  motivo  del  cambio;  ●  indicar  el  impacto  funcional;  ●  actualizar  la  versión  correspondiente;  ●  mantener  la  compatibilidad  documental  cuando  sea  posible.  
Las  decisiones  aprobadas  solo  podrán  modificarse  mediante  una  nueva  revisión  formal.  
 
10.7  Trazabilidad  
Cada  especificación  deberá  poder  relacionarse  con:  
●  la  visión  del  producto;  ●  el  módulo  correspondiente;  ●  las  reglas  de  negocio;  ●  la  arquitectura  funcional;  ●  los  criterios  de  aceptación;  ●  la  implementación  técnica.  
La  trazabilidad  garantizará  la  alineación  entre  producto  y  desarrollo.  
 
10.8  Coherencia  entre  módulos  
Las  especificaciones  no  podrán  entrar  en  conflicto  entre  sí.  
Cuando  una  funcionalidad  dependa  de  otro  módulo:  
●  reutilizará  su  comportamiento  oficial;  ●  evitará  redefinir  reglas  existentes;  ●  referenciará  la  especificación  correspondiente.  
La  responsabilidad  funcional  de  cada  módulo  será  única.  
 
10.9  Evolución  del  producto

Toda  nueva  funcionalidad  deberá  responder  previamente  a  las  siguientes  preguntas:  
●  ¿Resuelve  un  problema  real  del  usuario?  ●  ¿Está  alineada  con  el  Product  Vision?  ●  ¿Respeta  la  Product  Architecture?  ●  ¿Puede  reutilizar  componentes  existentes?  ●  ¿Afecta  a  otros  módulos?  ●  ¿Debe  documentarse  una  nueva  regla  de  negocio?  
Solo  tras  responder  afirmativamente  a  estas  cuestiones  podrá  iniciarse  su  especificación.  
 
10.10  Gestión  de  versiones  
Cada  especificación  deberá  mantener  un  historial  de  versiones.  
Como  mínimo  registrará:  
●  número  de  versión;  ●  fecha;  ●  responsable;  ●  cambios  principales;  ●  estado  de  aprobación.  
La  evolución  documental  deberá  poder  auditarse.  
 
10.11  Revisión  y  aprobación  
Toda  especificación  seguirá  el  siguiente  flujo  de  aprobación:  
Borrador        ↓  Revisión  de  Producto        ↓  Revisión  UX        ↓  Revisión  Técnica        ↓  Aprobación        ↓  Baseline  Oficial

Una  especificación  solo  formará  parte  del  Blueprint  cuando  alcance  el  estado  Baseline  
Oficial
.
 
 
10.12  Relación  con  el  desarrollo  
Las  especificaciones  funcionales  constituyen  la  referencia  principal  para  el  desarrollo.  
Antes  de  implementar  una  funcionalidad  deberá  verificarse  que:  
●  existe  una  especificación  aprobada;  ●  los  criterios  de  aceptación  están  definidos;  ●  las  reglas  de  negocio  son  completas;  ●  las  dependencias  están  identificadas.  
El  desarrollo  nunca  deberá  adelantarse  a  la  definición  funcional.  
 
10.13  Gobernanza  del  Blueprint  
El  Elevate  Product  Blueprint  constituye  la  fuente  oficial  de  conocimiento  del  producto.  
Todas  las  decisiones  relacionadas  con:  
●  visión;  ●  arquitectura;  ●  UX;  ●  diseño;  ●  comportamiento  funcional;  ●  evolución  del  producto;  
deberán  documentarse  en  alguno  de  sus  volúmenes.  
No  existirán  decisiones  de  producto  fuera  del  Blueprint.  
 
10.14  Declaración  final  
Las  Specification  Rules  garantizan  que  Elevate  evolucione  mediante  
decisiones
 
documentadas,
 
coherentes
 
y
 
verificables.
 
Al
 
establecer
 
un
 
estándar
 
único
 
para
 
la
 
creación
 
y
 
mantenimiento
 
de
 
las
 
especificaciones
 
funcionales,
 
este
 
capítulo
 
convierte
 
el
 
Product
 
Blueprint
 
en
 
la
 
fuente

oficial  de  conocimiento  del  producto  y  en  el  marco  que  guía  su  evolución  
a
 
largo
 
plazo.
