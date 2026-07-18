# Volumen II — Product Architecture

> Fuente convertida automáticamente desde el PDF oficial. Se conserva el PDF original como fuente maestra.

Volumen  II  —  Product  Architecture  
 
Portada  
Elevate  Product  Blueprint  
Volumen  II  —  Product  Architecture  
Versión:  1.0  
 
Estado:
 
Approved
 
Baseline
 
 
Clasificación:
 
Internal
 
Product
 
Documentation
 
 
Objetivo  
Este  volumen  documenta  la  arquitectura  funcional  de  Elevate  y  define  cómo  se  organiza  el  
producto
 
desde
 
la
 
perspectiva
 
del
 
usuario.
 
Describe  los  módulos,  sus  responsabilidades,  las  relaciones  entre  ellos  y  las  reglas  que  
gobiernan
 
el
 
funcionamiento
 
del
 
ecosistema.
 
No  aborda  aspectos  visuales  ni  de  implementación  técnica,  que  se  desarrollan  en  los  
volúmenes
 
posteriores.
 
 
Control  de  versiones  
Versión  
Fecha  Estado  Autor  Cambios  
1.0  Julio  2026  
Approved  
Product  Management  &  Product  Design  
Primera  edición  oficial  de  la  arquitectura  funcional  de  Elevate.

Índice  
Capítulo  1.  Introducción  
1.1  Propósito  
1.2  Alcance  
1.3  Principios  arquitectónicos  
1.4  Relación  con  el  Product  Vision  
1.5  Organización  del  volumen  
 
Capítulo  2.  Arquitectura  del  Producto  
 
Capítulo  3.  Product  Map  
 
Capítulo  4.  Dominios  Funcionales  
 
Capítulo  5.  Módulos  
 
Capítulo  6.  Sistemas  Transversales  
 
Capítulo  7.  Navegación  Global  
 
Capítulo  8.  Roles  y  Permisos  
 
Capítulo  9.  Flujos  Principales  
 
Capítulo  10.  Reglas  Arquitectónicas

Capítulo  1  —  Introducción  
 
1.1  Propósito  
La  arquitectura  funcional  define  cómo  se  organiza  Elevate  como  producto.  
Su  finalidad  es  establecer  una  estructura  clara,  escalable  y  coherente  que  facilite  tanto  la  
evolución
 
del
 
producto
 
como
 
la
 
comprensión
 
de
 
su
 
funcionamiento
 
por
 
parte
 
de
 
los
 
equipos
 
de
 
diseño,
 
desarrollo
 
y
 
negocio.
 
Cada  módulo  descrito  en  este  volumen  representa  una  responsabilidad  concreta  dentro  del  
ecosistema
 
y
 
contribuye
 
a
 
una
 
experiencia
 
de
 
aprendizaje
 
unificada.
 
 
1.2  Alcance  
Este  volumen  documenta:  
●  la  estructura  general  del  producto;  ●  los  módulos  funcionales;  ●  los  dominios  que  los  agrupan;  ●  la  navegación  entre  ellos;  ●  los  sistemas  compartidos;  ●  los  roles  de  usuario;  ●  las  relaciones  funcionales;  ●  las  reglas  que  garantizan  la  coherencia  arquitectónica.  
No  incluye  especificaciones  de  interfaz,  componentes  visuales  o  detalles  técnicos  de  
implementación.
 
 
1.3  Principios  arquitectónicos  
La  arquitectura  de  Elevate  se  basa  en  los  siguientes  principios:  
Modularidad  
Cada  módulo  tiene  una  responsabilidad  claramente  definida.  
 
Bajo  acoplamiento

Los  módulos  colaboran  entre  sí  sin  depender  directamente  de  la  lógica  interna  de  otros.  
 
Alta  cohesión  
Cada  módulo  concentra  funcionalidades  relacionadas  con  un  mismo  objetivo.  
 
Escalabilidad  
La  arquitectura  permite  incorporar  nuevos  módulos  sin  alterar  la  estructura  existente.  
 
Consistencia  
Los  usuarios  deben  percibir  todo  el  producto  como  una  única  experiencia.  
 
Reutilización  
Los  sistemas  comunes  deben  compartirse  entre  módulos  para  evitar  duplicidades.  
 
1.4  Relación  con  el  Product  Vision  
Todas  las  decisiones  arquitectónicas  derivan  directamente  del  Volumen  I  —  Product  
Vision
.
 
La  arquitectura  existe  para  materializar  la  visión  del  producto  y  garantizar  que  los  principios  
definidos
 
previamente
 
puedan
 
aplicarse
 
de
 
forma
 
consistente
 
en
 
toda
 
la
 
plataforma.
 
 
1.5  Organización  del  volumen  
Este  documento  avanza  desde  una  visión  global  hasta  el  detalle  funcional.  
Primero  se  presenta  la  arquitectura  general  del  producto.  
Posteriormente  se  describen  los  dominios  funcionales,  los  módulos  que  los  componen,  los  
sistemas
 
transversales
 
y
 
los
 
principales
 
flujos
 
de
 
interacción.

Finalmente  se  establecen  las  reglas  que  deberán  respetarse  en  futuras  ampliaciones  del  
producto.
 
 
Capítulo  2  —  Arquitectura  del  Producto  
 
2.1  Propósito  
La  arquitectura  del  producto  define  la  estructura  funcional  de  Elevate  y  establece  cómo  se  
organizan
 
sus
 
capacidades
 
para
 
ofrecer
 
una
 
experiencia
 
de
 
aprendizaje
 
coherente.
 
No  representa  la  arquitectura  técnica  del  software,  sino  la  forma  en  la  que  el  producto  se  
divide
 
en
 
módulos
 
con
 
responsabilidades
 
bien
 
definidas
 
que
 
trabajan
 
como
 
un
 
único
 
ecosistema.
 
Su  objetivo  es  garantizar  que  el  crecimiento  del  producto  mantenga  la  claridad,  la  
escalabilidad
 
y
 
la
 
consistencia.
 
 
2.2  Visión  arquitectónica  
Elevate  está  concebido  como  un  ecosistema  compuesto  por  módulos  especializados,  
conectados
 
mediante
 
servicios
 
transversales
 
comunes.
 
Cada  módulo  resuelve  un  problema  concreto  del  usuario  y  evita  asumir  responsabilidades  
que
 
pertenecen
 
a
 
otros
 
módulos.
 
Esta  separación  favorece  una  evolución  ordenada  del  producto  y  reduce  la  complejidad  
tanto
 
para
 
los
 
usuarios
 
como
 
para
 
los
 
equipos
 
de
 
desarrollo.
 
 
2.3  Modelo  arquitectónico  
La  arquitectura  funcional  de  Elevate  se  organiza  en  cuatro  niveles.  
Nivel  1  —  Experiencia

Representa  todo  aquello  con  lo  que  interactúa  el  usuario.  
Incluye  los  módulos  visibles  de  la  plataforma,  como:  
●  Inicio  ●  Mis  cursos  ●  Curso  ●  Lección  ●  Evaluaciones  ●  Mi  progreso  ●  Certificados  ●  Calendario  ●  Actividades  ●  Comunidad  ●  Perfil  
Este  nivel  constituye  la  interfaz  funcional  del  producto.  
 
Nivel  2  —  Capacidades  funcionales  
Cada  módulo  implementa  una  capacidad  específica.  
Por  ejemplo:  
●  estudiar;  ●  realizar  evaluaciones;  ●  visualizar  progreso;  ●  gestionar  actividades;  ●  participar  en  la  comunidad;  ●  administrar  contenidos.  
Estas  capacidades  trabajan  conjuntamente  para  construir  la  experiencia  completa.  
 
Nivel  3  —  Servicios  transversales  
Todos  los  módulos  comparten  una  serie  de  servicios  comunes.  
Entre  ellos:  
●  autenticación;  ●  autorización;  ●  búsqueda  global;  ●  notificaciones;  ●  Tutor  IA;

●  seguimiento  del  progreso;  ●  sistema  de  logros;  ●  recomendaciones;  ●  accesibilidad;  ●  analítica.  
Estos  servicios  no  pertenecen  a  un  único  módulo  y  pueden  ser  utilizados  por  cualquier  parte  
del
 
producto.
 
 
Nivel  4  —  Plataforma  
Corresponde  a  la  infraestructura  tecnológica  que  soporta  el  funcionamiento  del  sistema.  
Este  nivel  será  desarrollado  en  el  Technical  Blueprint .  
 
2.4  Organización  funcional  
La  arquitectura  se  organiza  mediante  responsabilidades  claramente  delimitadas.  
Cada  módulo  responde  a  una  pregunta  concreta  del  usuario.  
Módulo  Pregunta  que  responde  
Inicio  ¿Qué  debo  hacer  hoy?  
Mis  cursos  ¿Qué  cursos  estoy  realizando?  
Curso  ¿Cómo  está  organizado  este  curso?  
Lección  ¿Qué  debo  aprender  ahora?  
Evaluaciones  
¿Qué  conocimientos  he  adquirido?  
Mi  progreso  ¿Cómo  estoy  evolucionando?  
Certificados  ¿Qué  logros  he  conseguido?  
Calendario  ¿Qué  tengo  previsto?  
Actividades  ¿Qué  tareas  debo  completar?  
Comunidad  ¿Con  quién  puedo  aprender?

Perfil  ¿Cómo  gestiono  mi  cuenta?  
Esta  organización  reduce  la  duplicidad  funcional  y  facilita  la  navegación.  
 
2.5  Relaciones  entre  módulos  
Los  módulos  mantienen  relaciones  funcionales,  pero  no  dependen  unos  de  otros  para  
cumplir
 
su
 
responsabilidad
 
principal.
 
Por  ejemplo:  
●  Inicio  consume  información  de  prácticamente  todos  los  módulos,  pero  no  gestiona  
su
 
lógica.
 ●  Mis  cursos  enlaza  con  Curso ,  sin  contener  la  estructura  académica.  ●  Curso  organiza  las  unidades  y  dirige  al  estudiante  hacia  Lección .  ●  Lección  actualiza  el  progreso  y  puede  conducir  a  una  Evaluación .  ●  Evaluaciones  generan  resultados  que  alimentan  Mi  progreso .  ●  Mi  progreso  consolida  la  información  procedente  de  toda  la  actividad  académica.  ●  Certificados  dependen  del  cumplimiento  de  criterios  de  progreso  y  evaluación.  
Cada  módulo  mantiene  una  responsabilidad  única  y  claramente  definida.  
 
2.6  Flujo  principal  del  estudiante  
La  arquitectura  está  diseñada  para  favorecer  un  recorrido  natural.  
Inicio     ↓  Mis  cursos     ↓  Curso     ↓  Unidad     ↓  Lección     ↓  Evaluación     ↓  Mi  progreso     ↓  Certificados

Este  flujo  representa  el  itinerario  principal  de  aprendizaje.  
Otros  módulos,  como  Calendario,  Actividades  o  Comunidad,  complementan  este  recorrido  
sin
 
sustituirlo.
 
 
2.7  Arquitectura  orientada  al  crecimiento  
Elevate  está  preparado  para  incorporar  nuevos  módulos  sin  modificar  la  estructura  
existente.
 
Un  nuevo  módulo  deberá:  
●  resolver  una  responsabilidad  específica;  ●  integrarse  con  los  servicios  transversales;  ●  respetar  la  navegación  global;  ●  mantener  la  consistencia  del  producto;  ●  evitar  duplicar  funcionalidades  existentes.  
Este  enfoque  permite  que  la  plataforma  evolucione  de  forma  incremental.  
 
2.8  Dependencias  permitidas  
La  arquitectura  establece  una  serie  de  reglas  para  preservar  la  cohesión  del  producto.  
Los  módulos  pueden:  
●  consumir  servicios  compartidos;  ●  enlazar  con  otros  módulos;  ●  reutilizar  componentes  comunes;  ●  compartir  información  mediante  servicios  de  plataforma.  
Los  módulos  no  deben:  
●  duplicar  lógica  funcional;  ●  asumir  responsabilidades  ajenas;  ●  implementar  sistemas  paralelos;  ●  romper  la  navegación  establecida.  
Estas  reglas  garantizan  la  mantenibilidad  del  ecosistema.

2.9  Principios  de  escalabilidad  
Toda  ampliación  del  producto  deberá  cumplir  los  siguientes  criterios:  
●  mantener  la  modularidad;  ●  preservar  la  claridad  para  el  usuario;  ●  minimizar  dependencias;  ●  reutilizar  capacidades  existentes;  ●  facilitar  futuras  ampliaciones.  
La  escalabilidad  se  entiende  como  la  capacidad  del  producto  para  crecer  sin  incrementar  
innecesariamente
 
su
 
complejidad.
 
 
2.10  Declaración  arquitectónica  
La  arquitectura  de  Elevate  organiza  el  producto  como  un  ecosistema  de  
módulos
 
especializados,
 
conectados
 
mediante
 
servicios
 
transversales
 
y
 
orientados
 
a
 
un
 
único
 
objetivo:
 
ofrecer
 
una
 
experiencia
 
de
 
aprendizaje
 
estructurada,
 
coherente
 
y
 
escalable.
 
Cada
 
módulo
 
aporta
 
una
 
responsabilidad
 
específica,
 
mientras
 
que
 
la
 
integración
 
entre
 
ellos
 
construye
 
una
 
experiencia
 
continua
 
para
 
estudiantes,
 
profesorado
 
y
 
administración.
 
 
Capítulo  3  —  Product  Map  
 
3.1  Propósito  
El  Product  Map  representa  la  estructura  funcional  completa  de  Elevate  desde  la  perspectiva  
del
 
producto.
 
Su  finalidad  es  mostrar  cómo  se  organizan  los  módulos,  cuáles  son  sus  relaciones  y  cómo  
se
 
construye
 
la
 
experiencia
 
del
 
usuario
 
a
 
través
 
del
 
ecosistema.
 
Este  mapa  constituye  la  referencia  principal  para  comprender  la  organización  funcional  de  
Elevate
 
antes
 
de
 
analizar
 
cada
 
módulo
 
en
 
detalle.

3.2  Estructura  general  
Elevate  se  organiza  alrededor  de  un  núcleo  de  aprendizaje  complementado  por  servicios  de  
apoyo
 
y
 
herramientas
 
de
 
gestión.
 
Elevate  │  ├──  Inicio  │  ├──  Aprendizaje  │    ├──  Mis  cursos  │    ├──  Curso  │    ├──  Unidad  │    ├──  Lección  │    ├──  Evaluaciones  │    ├──  Mi  progreso  │    └──  Certificados  │  ├──  Organización  │    ├──  Calendario  │    ├──  Actividades  │    └──  Notificaciones  │  ├──  Colaboración  │    ├──  Comunidad  │    ├──  Tutor  IA  │    └──  Sesiones  en  directo  │  ├──  Usuario  │    └──  Perfil  │  └──  Sistemas  Transversales      ├──  Búsqueda  Global      ├──  Recomendaciones      ├──  Logros      ├──  Accesibilidad      ├──  Analítica      └──  Autenticación  y  Autorización  
Esta  estructura  refleja  la  organización  lógica  del  producto  y  no  la  arquitectura  técnica.  
 
3.3  Núcleo  del  producto

El  núcleo  de  Elevate  está  formado  por  los  módulos  que  intervienen  directamente  en  el  
proceso
 
de
 
aprendizaje.
 
Estos  módulos  constituyen  el  recorrido  principal  del  estudiante.  
Inicio        │        ▼  Mis  cursos        │        ▼  Curso        │        ▼  Unidad        │        ▼  Lección        │        ▼  Evaluación        │        ▼  Mi  progreso        │        ▼  Certificados  
Este  flujo  representa  la  experiencia  educativa  principal  de  la  plataforma.  
 
3.4  Módulos  de  apoyo  
Alrededor  del  núcleo  existen  módulos  cuya  función  es  enriquecer  la  experiencia.  
Estos  módulos  no  sustituyen  el  recorrido  principal,  sino  que  lo  complementan.  
Módulo  Función  principal  
Calendario  Organizar  el  aprendizaje  
Actividades  Gestionar  tareas  y  eventos  
Comunidad  Favorecer  el  aprendizaje  colaborativo

Tutor  IA  Ofrecer  apoyo  contextual  
Perfil  Gestionar  la  cuenta  del  usuario  
Su  objetivo  es  aumentar  el  valor  del  ecosistema  sin  alterar  la  simplicidad  del  recorrido  
principal.
 
 
3.5  Sistemas  transversales  
Los  sistemas  transversales  proporcionan  capacidades  compartidas  por  todos  los  módulos.  
Entre  ellos  destacan:  
●  autenticación;  ●  autorización;  ●  búsqueda  global;  ●  notificaciones;  ●  recomendaciones;  ●  seguimiento  del  progreso;  ●  sistema  de  logros;  ●  accesibilidad;  ●  analítica.  
Estos  sistemas  no  aparecen  como  módulos  independientes  en  la  navegación  principal,  pero  
forman
 
parte
 
de
 
la
 
experiencia
 
en
 
toda
 
la
 
plataforma.
 
 
3.6  Relaciones  funcionales  
La  arquitectura  establece  relaciones  claras  entre  los  módulos.  
Inicio  
Consume  información  de  prácticamente  todo  el  ecosistema  para  construir  una  experiencia  
personalizada.
 
 
Mis  cursos  
Centraliza  el  acceso  a  los  cursos  activos.

Curso  
Organiza  el  contenido  mediante  unidades  y  dirige  al  estudiante  hacia  las  lecciones.  
 
Lección  
Representa  el  punto  principal  de  aprendizaje.  
Desde  aquí  se  generan:  
●  progreso;  ●  actividad;  ●  recomendaciones;  ●  evaluaciones;  ●  logros.  
 
Mi  progreso  
Consolida  información  procedente  de:  
●  cursos;  ●  lecciones;  ●  evaluaciones;  ●  actividades;  ●  certificados.  
 
Perfil  
Centraliza  la  información  personal,  preferencias  y  configuración  del  usuario.  
 
3.7  Mapa  de  navegación  principal  
La  navegación  del  estudiante  sigue  una  estructura  jerárquica  sencilla.  
Inicio  │  ├──  Mis  cursos  │       └──  Curso

│              └──  Unidad  │                     └──  Lección  │                            └──  Evaluación  │  ├──  Mi  progreso  │  ├──  Certificados  │  ├──  Calendario  │  ├──  Actividades  │  ├──  Comunidad  │  └──  Perfil  
Este  árbol  representa  la  navegación  funcional,  no  el  menú  definitivo  de  la  interfaz.  
 
3.8  Reglas  del  Product  Map  
Toda  modificación  del  mapa  deberá  respetar  las  siguientes  reglas:  
●  ningún  módulo  debe  duplicar  responsabilidades;  ●  el  recorrido  principal  del  estudiante  debe  mantenerse  claro;  ●  los  sistemas  transversales  no  deben  convertirse  en  módulos  independientes  salvo  
que
 
exista
 
una
 
necesidad
 
funcional;
 ●  la  incorporación  de  nuevos  módulos  no  debe  aumentar  la  complejidad  de  la  
navegación;
 ●  el  estudiante  debe  poder  comprender  la  estructura  del  producto  sin  esfuerzo.  
Estas  reglas  garantizan  la  coherencia  del  ecosistema  a  medida  que  evoluciona.  
 
3.9  Evolución  del  mapa  
El  Product  Map  está  preparado  para  crecer.  
Los  nuevos  módulos  podrán  incorporarse  siempre  que:  
●  respondan  a  una  necesidad  claramente  identificada;  ●  encajen  dentro  de  uno  de  los  dominios  funcionales  existentes  o  justifiquen  la  
creación
 
de
 
un
 
nuevo
 
dominio;
 ●  respeten  los  principios  definidos  en  el  Volumen  I;

●  mantengan  la  claridad  de  la  navegación  y  la  arquitectura.  
 
3.10  Declaración  del  Product  Map  
El  Product  Map  representa  la  organización  funcional  de  Elevate  como  un  
ecosistema
 
cohesionado,
 
donde
 
cada
 
módulo
 
desempeña
 
una
 
responsabilidad
 
específica
 
y
 
contribuye
 
a
 
una
 
experiencia
 
de
 
aprendizaje
 
continua.
 
Su
 
estructura
 
garantiza
 
que
 
el
 
crecimiento
 
del
 
producto
 
preserve
 
la
 
simplicidad,
 
la
 
coherencia
 
y
 
la
 
orientación
 
al
 
progreso
 
del
 
estudiante.
 
 
Capítulo  4  —  Functional  Domains  
 
4.1  Propósito  
Los  dominios  funcionales  constituyen  el  nivel  de  organización  inmediatamente  superior  a  los  
módulos
 
de
 
Elevate.
 
Su  objetivo  es  agrupar  funcionalidades  relacionadas  bajo  una  misma  responsabilidad  de  
negocio,
 
facilitando
 
la
 
comprensión
 
del
 
producto,
 
su
 
evolución
 
y
 
su
 
mantenimiento.
 
Cada  dominio  representa  una  capacidad  esencial  del  ecosistema  y  define  un  conjunto  de  
módulos
 
que
 
colaboran
 
para
 
ofrecer
 
una
 
experiencia
 
completa.
 
 
4.2  Organización  de  los  dominios  
La  arquitectura  funcional  de  Elevate  se  estructura  en  cinco  dominios  principales.  
Dominio  Objetivo  
Aprendizaje  Facilitar  el  proceso  formativo  del  estudiante.  
Organización  Ayudar  a  planificar  y  mantener  la  continuidad  del  aprendizaje.  
Colaboración  Favorecer  la  interacción  y  el  acompañamiento  educativo.

Gestión  Administrar  usuarios,  contenidos  y  configuración  del  ecosistema.  
Servicios  Transversales  
Proporcionar  capacidades  comunes  a  toda  la  plataforma.  
Cada  dominio  agrupa  módulos  con  responsabilidades  complementarias  y  evita  la  dispersión  
funcional.
 
 
4.3  Dominio  de  Aprendizaje  
Objetivo  
Constituye  el  núcleo  del  producto.  
Reúne  todas  las  capacidades  necesarias  para  que  el  estudiante  pueda  avanzar  en  su  
proceso
 
de
 
aprendizaje.
 
Módulos  
●  Inicio  ●  Mis  cursos  ●  Curso  ●  Unidad  ●  Lección  ●  Evaluaciones  ●  Mi  progreso  ●  Certificados  
Responsabilidades  
Este  dominio  permite:  
●  acceder  al  contenido;  ●  estudiar;  ●  realizar  actividades;  ●  completar  evaluaciones;  ●  visualizar  el  progreso;  ●  obtener  certificaciones.  
Es  el  dominio  con  mayor  impacto  sobre  la  experiencia  del  estudiante.

4.4  Dominio  de  Organización  
Objetivo  
Ayudar  al  estudiante  a  mantener  una  rutina  de  aprendizaje  organizada  y  sostenible.  
Módulos  
●  Calendario  ●  Actividades  ●  Notificaciones  
Responsabilidades  
Este  dominio  facilita:  
●  planificar  sesiones;  ●  consultar  eventos;  ●  recordar  tareas  pendientes;  ●  organizar  el  tiempo  de  estudio;  ●  mantener  la  continuidad  del  aprendizaje.  
Su  función  es  reducir  la  desorganización  y  favorecer  la  constancia.  
 
4.5  Dominio  de  Colaboración  
Objetivo  
Crear  un  entorno  donde  el  aprendizaje  pueda  enriquecerse  mediante  la  interacción  con  
otras
 
personas
 
y
 
con
 
herramientas
 
de
 
apoyo.
 
Módulos  
●  Comunidad  ●  Tutor  IA  ●  Sesiones  en  directo  
Responsabilidades  
Este  dominio  permite:

●  participar  en  debates;  ●  plantear  preguntas;  ●  resolver  dudas;  ●  asistir  a  sesiones;  ●  recibir  apoyo  contextual;  ●  compartir  experiencias  de  aprendizaje.  
El  aprendizaje  deja  de  ser  una  experiencia  exclusivamente  individual.  
 
4.6  Dominio  de  Gestión  
Objetivo  
Proporcionar  las  herramientas  necesarias  para  administrar  el  funcionamiento  de  la  
plataforma.
 
Módulos  
●  Perfil  ●  Gestión  de  usuarios  ●  Gestión  de  cursos  ●  Gestión  de  contenidos  ●  Panel  administrativo  ●  Panel  docente  
Responsabilidades  
Este  dominio  permite:  
●  administrar  usuarios;  ●  configurar  cursos;  ●  organizar  contenidos;  ●  supervisar  la  actividad  académica;  ●  gestionar  permisos;  ●  mantener  la  plataforma.  
Su  prioridad  es  la  eficiencia  operativa.  
 
4.7  Dominio  de  Servicios  Transversales

Objetivo  
Ofrecer  capacidades  compartidas  por  todos  los  dominios  funcionales.  
Estos  servicios  no  forman  parte  de  un  único  módulo,  sino  que  proporcionan  funcionalidades  
comunes
 
para
 
todo
 
el
 
ecosistema.
 
Capacidades  
●  Autenticación  ●  Autorización  ●  Búsqueda  Global  ●  Sistema  de  Notificaciones  ●  Tutor  IA  (como  servicio  compartido)  ●  Motor  de  Recomendaciones  ●  Seguimiento  del  progreso  ●  Sistema  de  Logros  ●  Analítica  ●  Accesibilidad  ●  Experiencia  multidispositivo  
Estos  servicios  permiten  que  los  módulos  compartan  comportamientos  consistentes  sin  
duplicar
 
lógica.
 
 
4.8  Relaciones  entre  dominios  
Los  dominios  colaboran  entre  sí  mediante  servicios  compartidos.  
                Servicios  Transversales                           │       ┌───────────────────┼───────────────────┐       │                    │                    │  Aprendizaje       Organización       Colaboración       │                    │                    │       └───────────────────┼───────────────────┘                           │                       Gestión  
Cada  dominio  mantiene  responsabilidades  independientes,  pero  todos  contribuyen  a  una  
única
 
experiencia
 
de
 
producto.

4.9  Principios  de  organización  
La  distribución  funcional  de  Elevate  se  rige  por  las  siguientes  reglas:  
●  un  módulo  pertenece  a  un  único  dominio;  ●  un  dominio  representa  una  capacidad  de  negocio;  ●  las  dependencias  entre  dominios  deben  minimizarse;  ●  los  servicios  comunes  deben  centralizarse;  ●  la  incorporación  de  nuevos  módulos  debe  respetar  esta  estructura.  
Estos  principios  favorecen  una  arquitectura  clara  y  escalable.  
 
4.10  Evolución  de  los  dominios  
Los  dominios  funcionales  podrán  ampliarse  con  nuevos  módulos  siempre  que:  
●  refuercen  la  responsabilidad  del  dominio;  ●  no  generen  duplicidad  funcional;  ●  respeten  la  arquitectura  general  del  producto;  ●  mantengan  la  simplicidad  de  la  experiencia.  
La  creación  de  un  nuevo  dominio  solo  estará  justificada  cuando  aparezca  una  capacidad  de  
negocio
 
que
 
no
 
pueda
 
integrarse
 
de
 
forma
 
coherente
 
en
 
la
 
estructura
 
existente.
 
 
4.11  Declaración  de  los  dominios  
funcionales
 
Los  dominios  funcionales  organizan  Elevate  en  áreas  de  responsabilidad  
claramente
 
diferenciadas,
 
permitiendo
 
que
 
cada
 
módulo
 
contribuya
 
a
 
un
 
propósito
 
específico
 
sin
 
perder
 
la
 
visión
 
global
 
del
 
producto.
 
Esta
 
organización
 
facilita
 
la
 
evolución
 
del
 
ecosistema,
 
preserva
 
la
 
coherencia
 
arquitectónica
 
y
 
garantiza
 
una
 
experiencia
 
de
 
aprendizaje
 
integrada
 
para
 
todos
 
los
 
usuarios.
 
  
Capítulo  5  —  Product  Modules

5.1  Propósito  
Los  módulos  constituyen  las  unidades  funcionales  que  conforman  Elevate.  
Cada  módulo  representa  una  capacidad  específica  del  producto,  posee  una  responsabilidad  
claramente
 
definida
 
y
 
colabora
 
con
 
el
 
resto
 
del
 
ecosistema
 
para
 
construir
 
una
 
experiencia
 
de
 
aprendizaje
 
continua.
 
Este  capítulo  establece  el  modelo  común  que  deberán  seguir  todos  los  módulos  presentes  y  
futuros
 
de
 
la
 
plataforma.
 
Las  especificaciones  funcionales  detalladas  de  cada  módulo  se  documentarán  
posteriormente
 
en
 
documentos
 
individuales
 
del
 
Product
 
Blueprint.
 
 
5.2  Definición  de  un  módulo  
Un  módulo  es  una  unidad  funcional  autónoma  que  agrupa  un  conjunto  de  capacidades  
relacionadas
 
para
 
resolver
 
una
 
necesidad
 
concreta
 
del
 
usuario.
 
Todo  módulo  debe:  
●  tener  un  objetivo  claramente  definido;  ●  responder  a  una  responsabilidad  específica;  ●  evitar  duplicar  funciones  de  otros  módulos;  ●  integrarse  con  el  resto  del  ecosistema;  ●  mantener  una  experiencia  consistente.  
 
5.3  Catálogo  oficial  de  módulos  
La  versión  1.0  de  Elevate  está  compuesta  por  los  siguientes  módulos  oficiales.  
Módulo  Dominio  
Inicio  Aprendizaje  
Mis  cursos  Aprendizaje  
Curso  Aprendizaje

Unidad  Aprendizaje  
Lección  Aprendizaje  
Evaluaciones  
Aprendizaje  
Mi  progreso  Aprendizaje  
Certificados  Aprendizaje  
Calendario  Organización  
Actividades  Organización  
Comunidad  Colaboración  
Perfil  Gestión  
Estos  módulos  representan  la  estructura  funcional  aprobada  del  producto.  
 
5.4  Responsabilidad  de  los  módulos  
Cada  módulo  debe  responder  a  una  única  pregunta  principal  del  usuario.  
Módulo  Pregunta  principal  
Inicio  ¿Qué  debo  hacer  hoy?  
Mis  cursos  ¿Qué  cursos  estoy  realizando?  
Curso  ¿Cómo  está  organizado  este  curso?  
Unidad  ¿Qué  bloque  de  aprendizaje  estoy  cursando?  
Lección  ¿Qué  debo  aprender  ahora?  
Evaluaciones  
¿Qué  conocimientos  he  adquirido?  
Mi  progreso  ¿Cómo  estoy  evolucionando?  
Certificados  ¿Qué  logros  he  conseguido?  
Calendario  ¿Qué  actividades  tengo  programadas?  
Actividades  ¿Qué  tareas  debo  completar?

Comunidad  ¿Cómo  puedo  aprender  junto  a  otros?  
Perfil  ¿Cómo  gestiono  mi  cuenta?  
Esta  regla  evita  la  superposición  de  responsabilidades  y  simplifica  la  navegación.  
 
5.5  Modelo  funcional  común  
Todos  los  módulos  deberán  documentarse  siguiendo  la  misma  estructura.  
Identificación  
●  Nombre  ●  Dominio  funcional  ●  Usuarios  ●  Estado  
Propósito  
Descripción  del  objetivo  principal  del  módulo.  
Responsabilidades  
Funciones  que  pertenecen  exclusivamente  al  módulo.  
Funcionalidades  
Listado  de  capacidades  principales.  
Entradas  
Información  que  recibe  del  ecosistema.  
Salidas  
Información  que  genera  o  comparte.  
Dependencias  
Servicios  transversales  y  módulos  relacionados.

Reglas  de  negocio  
Restricciones  funcionales  específicas.  
Métricas  
Indicadores  utilizados  para  medir  el  rendimiento  del  módulo.  
Este  formato  garantiza  uniformidad  en  toda  la  documentación  del  producto.  
 
5.6  Relaciones  entre  módulos  
Los  módulos  colaboran  entre  sí  mediante  intercambio  de  información  y  navegación.  
Por  ejemplo:  
●  Inicio  consume  datos  de  prácticamente  todos  los  módulos.  ●  Mis  cursos  enlaza  con  Curso .  ●  Curso  organiza  Unidades .  ●  Unidad  contiene  Lecciones .  ●  Lección  actualiza  Mi  progreso .  ●  Evaluaciones  generan  resultados  para  Mi  progreso .  ●  Certificados  dependen  del  progreso  y  de  las  evaluaciones.  
Las  relaciones  siempre  deberán  ser  explícitas  y  documentadas.  
 
5.7  Principios  de  diseño  modular  
Todos  los  módulos  deberán  respetar  los  siguientes  principios.  
Responsabilidad  única  
Cada  módulo  debe  resolver  un  único  problema  principal.  
 
Independencia  funcional  
Debe  poder  evolucionar  sin  afectar  innecesariamente  a  otros  módulos.

Consistencia  
Debe  utilizar  los  mismos  patrones  visuales  y  de  interacción  que  el  resto  del  producto.  
 
Reutilización  
Debe  apoyarse  en  los  servicios  transversales  antes  de  implementar  soluciones  propias.  
 
Escalabilidad  
Debe  permitir  incorporar  nuevas  funcionalidades  sin  modificar  su  propósito  principal.  
 
5.8  Ciclo  de  vida  de  un  módulo  
Todo  módulo  atraviesa  las  siguientes  fases.  
1.  Identificación  de  la  necesidad.  2.  Definición  funcional.  3.  Diseño  UX.  4.  Diseño  visual.  5.  Implementación  técnica.  6.  Validación.  7.  Publicación.  8.  Evolución  continua.  
Este  ciclo  asegura  que  todas  las  ampliaciones  del  producto  sigan  un  proceso  homogéneo.  
 
5.9  Reglas  para  nuevos  módulos  
La  incorporación  de  un  nuevo  módulo  requerirá  justificar:  
●  el  problema  que  resuelve;  ●  el  usuario  al  que  va  dirigido;  ●  su  integración  con  la  arquitectura  existente;  ●  las  dependencias  que  introduce;  ●  las  métricas  con  las  que  se  evaluará  su  impacto.

No  se  crearán  nuevos  módulos  para  resolver  necesidades  que  puedan  satisfacerse  
mediante
 
la
 
ampliación
 
razonable
 
de
 
uno
 
existente.
 
 
5.10  Inventario  de  documentación  
Cada  módulo  dispondrá  de  un  documento  funcional  propio  dentro  del  Product  Blueprint.  
La  estructura  prevista  para  la  versión  1.0  es:  
●  Módulo  01  —  Inicio  ●  Módulo  02  —  Mis  cursos  ●  Módulo  03  —  Curso  ●  Módulo  04  —  Unidad  ●  Módulo  05  —  Lección  ●  Módulo  06  —  Evaluaciones  ●  Módulo  07  —  Mi  progreso  ●  Módulo  08  —  Certificados  ●  Módulo  09  —  Calendario  ●  Módulo  10  —  Actividades  ●  Módulo  11  —  Comunidad  ●  Módulo  12  —  Perfil  
Cada  documento  desarrollará  en  profundidad  el  comportamiento,  los  flujos,  las  reglas  de  
negocio
 
y
 
las
 
decisiones
 
de
 
producto
 
específicas
 
de
 
ese
 
módulo.
 
 
5.11  Declaración  de  los  módulos  
Los  módulos  constituyen  los  bloques  funcionales  de  Elevate.  Cada  uno  
aporta
 
una
 
responsabilidad
 
específica
 
dentro
 
del
 
ecosistema
 
y,
 
en
 
conjunto,
 
construyen
 
una
 
experiencia
 
de
 
aprendizaje
 
integrada,
 
escalable
 
y
 
coherente.
 
La
 
claridad
 
en
 
la
 
definición
 
de
 
responsabilidades
 
garantiza
 
que
 
el
 
producto
 
pueda
 
evolucionar
 
sin
 
perder
 
su
 
identidad
 
ni
 
comprometer
 
la
 
experiencia
 
del
 
usuario.
 
 
Capítulo  6  —  Cross-Cutting  Systems  
(Sistemas
 
Transversales)

6.1  Propósito  
Los  sistemas  transversales  proporcionan  capacidades  comunes  que  son  utilizadas  por  
múltiples
 
módulos
 
de
 
Elevate.
 
A  diferencia  de  los  módulos  funcionales,  estos  sistemas  no  representan  una  sección  
independiente
 
de
 
la
 
plataforma,
 
sino
 
servicios
 
compartidos
 
que
 
garantizan
 
una
 
experiencia
 
consistente
 
y
 
cohesionada.
 
Su  objetivo  es  evitar  duplicidades,  centralizar  comportamientos  comunes  y  facilitar  la  
evolución
 
del
 
producto.
 
 
6.2  Definición  
Un  sistema  transversal  es  una  capacidad  del  producto  que:  
●  puede  ser  utilizada  por  varios  módulos;  ●  mantiene  un  comportamiento  uniforme  en  toda  la  plataforma;  ●  no  pertenece  funcionalmente  a  un  único  dominio;  ●  aporta  valor  de  forma  continua  durante  la  experiencia  del  usuario.  
Los  sistemas  transversales  forman  parte  de  la  infraestructura  funcional  del  producto.  
 
6.3  Catálogo  oficial  
La  versión  1.0  de  Elevate  incorpora  los  siguientes  sistemas  transversales.  
Sistema  Propósito  
Autenticación  Identificar  al  usuario.  
Autorización  Controlar  permisos  y  accesos.  
Tutor  IA  Proporcionar  apoyo  contextual.  
Búsqueda  Global  Localizar  contenido  desde  cualquier  punto.  
Notificaciones  Informar  de  eventos  relevantes.

Motor  de  Recomendaciones  Sugerir  el  siguiente  paso.  
Seguimiento  del  Progreso  Registrar  la  evolución  del  estudiante.  
Sistema  de  Logros  Reconocer  hitos  alcanzados.  
Analítica  Obtener  información  sobre  el  uso  del  producto.  
Accesibilidad  Garantizar  una  experiencia  inclusiva.  
Experiencia  Multidispositivo  Mantener  la  continuidad  entre  dispositivos.   
6.4  Autenticación  y  autorización  
Estos  sistemas  garantizan  un  acceso  seguro  a  la  plataforma.  
Responsabilidades  
●  identificar  usuarios;  ●  validar  credenciales;  ●  mantener  sesiones;  ●  controlar  permisos;  ●  proteger  recursos.  
Todos  los  módulos  dependen  de  estos  sistemas  para  gestionar  el  acceso.  
 
6.5  Tutor  IA  
El  Tutor  IA  proporciona  asistencia  contextual  durante  el  aprendizaje.  
No  constituye  un  curso  independiente  ni  un  módulo  de  navegación  principal.  
Su  función  consiste  en  complementar  la  experiencia  mediante:  
●  resolución  de  dudas;  ●  explicación  de  conceptos;  ●  generación  de  ejemplos;  ●  orientación  durante  el  estudio;  ●  recomendaciones  relacionadas  con  el  contenido  actual.  
El  Tutor  IA  siempre  actúa  dentro  del  contexto  del  estudiante.

6.6  Búsqueda  Global  
La  búsqueda  permite  localizar  información  desde  cualquier  punto  del  producto.  
Debe  ofrecer  acceso  rápido  a:  
●  cursos;  ●  unidades;  ●  lecciones;  ●  actividades;  ●  comunidad;  ●  documentación  disponible  para  el  usuario.  
Su  comportamiento  debe  ser  consistente  independientemente  del  módulo  desde  el  que  se  
invoque.
 
 
6.7  Sistema  de  notificaciones  
Las  notificaciones  mantienen  informado  al  usuario  sobre  acontecimientos  relevantes.  
Entre  ellos:  
●  actividades  pendientes;  ●  nuevas  sesiones;  ●  evaluaciones  disponibles;  ●  progreso  conseguido;  ●  certificados  obtenidos;  ●  mensajes  importantes.  
Las  notificaciones  deben  aportar  información  útil  sin  generar  saturación.  
 
6.8  Motor  de  recomendaciones  
El  sistema  de  recomendaciones  orienta  al  estudiante  hacia  la  siguiente  acción  más  
relevante.
 
Puede  utilizar  información  como:  
●  progreso;

●  cursos  activos;  ●  actividades  pendientes;  ●  calendario;  ●  resultados  de  evaluaciones.  
Su  objetivo  es  reducir  la  incertidumbre  y  favorecer  la  continuidad  del  aprendizaje.  
 
6.9  Seguimiento  del  progreso  
Este  sistema  recopila  información  procedente  de  múltiples  módulos  para  construir  una  
visión
 
completa
 
de
 
la
 
evolución
 
del
 
estudiante.
 
Entre  los  datos  registrados  se  encuentran:  
●  lecciones  completadas;  ●  unidades  finalizadas;  ●  cursos  completados;  ●  evaluaciones  realizadas;  ●  actividades  completadas;  ●  certificados  obtenidos.  
Todos  los  indicadores  de  progreso  proceden  de  este  sistema  compartido.  
 
6.10  Sistema  de  logros  
El  sistema  de  logros  reconoce  hitos  alcanzados  durante  el  aprendizaje.  
Puede  utilizarse  para  destacar:  
●  finalización  de  cursos;  ●  progreso  continuo;  ●  participación;  ●  objetivos  conseguidos;  ●  reconocimientos  especiales.  
Los  logros  complementan  el  aprendizaje  y  nunca  deben  sustituirlo  como  principal  fuente  de  
motivación.
 
 
6.11  Analítica

La  analítica  permite  medir  el  comportamiento  del  producto  y  apoyar  la  toma  de  decisiones.  
Se  emplea  para:  
●  comprender  el  uso  de  la  plataforma;  ●  detectar  problemas  de  experiencia;  ●  medir  el  impacto  de  nuevas  funcionalidades;  ●  monitorizar  indicadores  estratégicos.  
La  información  recopilada  debe  respetar  la  privacidad  del  usuario  y  utilizarse  
exclusivamente
 
para
 
mejorar
 
el
 
producto.
 
 
6.12  Accesibilidad  
La  accesibilidad  es  un  sistema  transversal  que  afecta  a  toda  la  plataforma.  
Incluye  aspectos  como:  
●  navegación  mediante  teclado;  ●  compatibilidad  con  tecnologías  de  asistencia;  ●  contraste  adecuado;  ●  estructura  semántica;  ●  adaptación  a  diferentes  capacidades.  
No  se  considera  una  funcionalidad  adicional,  sino  un  requisito  de  calidad.  
 
6.13  Experiencia  multidispositivo  
El  estudiante  debe  poder  acceder  a  Elevate  desde  distintos  dispositivos  sin  perder  
continuidad.
 
El  sistema  garantiza:  
●  sincronización  del  progreso;  ●  continuidad  entre  sesiones;  ●  consistencia  de  navegación;  ●  adaptación  de  la  interfaz.  
La  experiencia  debe  percibirse  como  un  único  producto  independientemente  del  dispositivo  
utilizado.

6.14  Principios  de  diseño  
Todos  los  sistemas  transversales  deberán  cumplir  los  siguientes  principios:  
●  reutilización;  ●  consistencia;  ●  independencia  de  los  módulos;  ●  escalabilidad;  ●  mínimo  acoplamiento;  ●  máxima  disponibilidad.  
 
6.15  Declaración  de  los  sistemas  
transversales
 
Los  sistemas  transversales  constituyen  la  infraestructura  funcional  
compartida
 
de
 
Elevate.
 
Su
 
misión
 
es
 
proporcionar
 
capacidades
 
comunes
 
que
 
garanticen
 
una
 
experiencia
 
consistente,
 
escalable
 
y
 
cohesionada,
 
permitiendo
 
que
 
todos
 
los
 
módulos
 
del
 
producto
 
trabajen
 
como
 
un
 
único
 
ecosistema
 
de
 
aprendizaje.
 
 
Capítulo  7  —  Global  Navigation  
 
7.1  Propósito  
La  navegación  global  define  cómo  los  usuarios  se  desplazan  por  Elevate  y  cómo  acceden  a  
las
 
distintas
 
capacidades
 
del
 
producto.
 
Su  objetivo  es  construir  una  experiencia  intuitiva,  predecible  y  consistente,  reduciendo  el  
tiempo
 
necesario
 
para
 
localizar
 
información
 
y
 
completar
 
tareas.
 
La  navegación  constituye  uno  de  los  pilares  fundamentales  de  la  experiencia  de  usuario  y  
debe
 
mantenerse
 
estable
 
a
 
medida
 
que
 
el
 
producto
 
evoluciona.

7.2  Principios  de  navegación  
La  navegación  de  Elevate  se  basa  en  los  siguientes  principios.  
Claridad  
El  usuario  debe  comprender  en  todo  momento  dónde  se  encuentra  y  qué  opciones  tiene  
disponibles.
 
Consistencia  
La  estructura  de  navegación  debe  mantenerse  uniforme  en  todos  los  módulos.  
Continuidad  
La  plataforma  debe  facilitar  que  el  usuario  retome  su  actividad  sin  perder  el  contexto.  
Eficiencia  
Las  acciones  frecuentes  deben  requerir  el  menor  número  posible  de  pasos.  
Escalabilidad  
La  incorporación  de  nuevas  funcionalidades  no  debe  alterar  significativamente  la  
navegación
 
existente.
 
 
7.3  Estructura  principal  
La  navegación  principal  de  Elevate  está  compuesta  por  los  módulos  de  mayor  frecuencia  de  
uso.
 
Inicio   Mis  cursos   Mi  progreso   Calendario   Actividades   Comunidad   Certificados

Perfil  
Estos  accesos  constituyen  el  punto  de  entrada  a  las  principales  áreas  funcionales  del  
producto.
 
Los  módulos  Curso ,  Unidad ,  Lección  y  Evaluaciones  forman  parte  del  flujo  de  
aprendizaje
 
y
 
se
 
acceden
 
de
 
forma
 
contextual,
 
no
 
como
 
elementos
 
principales
 
de
 
navegación.
 
 
7.4  Jerarquía  de  navegación  
La  navegación  sigue  una  estructura  jerárquica.  
Inicio  │  ├──  Mis  cursos  │       └──  Curso  │              └──  Unidad  │                     └──  Lección  │                            └──  Evaluación  │  ├──  Mi  progreso  │  ├──  Calendario  │  ├──  Actividades  │  ├──  Comunidad  │  ├──  Certificados  │  └──  Perfil  
Esta  jerarquía  refleja  el  recorrido  natural  del  estudiante.  
 
7.5  Contexto  permanente  
Durante  toda  la  navegación,  Elevate  debe  mantener  visible  el  contexto  del  usuario.  
La  interfaz  debe  indicar  siempre:

●  el  módulo  actual;  ●  la  ubicación  dentro  del  recorrido;  ●  el  curso  activo,  cuando  corresponda;  ●  la  identidad  del  usuario;  ●  el  acceso  a  acciones  globales.  
Esto  reduce  la  sensación  de  desorientación  y  facilita  la  continuidad.  
 
7.6  Navegación  contextual  
Cada  módulo  puede  ofrecer  accesos  específicos  relacionados  con  la  tarea  que  el  usuario  
está
 
realizando.
 
Ejemplos:  
●  una  lección  puede  enlazar  con  el  Tutor  IA;  ●  una  evaluación  puede  dirigir  al  progreso;  ●  un  certificado  puede  abrir  el  curso  correspondiente;  ●  una  actividad  puede  llevar  directamente  a  la  lección  asociada.  
La  navegación  contextual  complementa  la  navegación  principal  sin  sustituirla.  
 
7.7  Acciones  globales  
Existen  acciones  disponibles  desde  cualquier  punto  de  la  plataforma.  
Entre  ellas:  
●  búsqueda  global;  ●  notificaciones;  ●  acceso  al  perfil;  ●  ayuda;  ●  Tutor  IA.  
Estas  acciones  deben  mantener  una  posición  y  un  comportamiento  consistentes  en  toda  la  
interfaz.
 
 
7.8  Navegación  según  el  rol

Aunque  la  estructura  general  es  común,  la  navegación  se  adapta  al  rol  del  usuario.  
Estudiante  
Prioriza  el  acceso  al  aprendizaje  y  al  seguimiento  del  progreso.  
Profesor  
Incorpora  accesos  a  herramientas  de  gestión  académica,  seguimiento  del  alumnado  y  
sesiones.
 
Administrador  
Añade  funcionalidades  de  administración,  configuración  y  supervisión  de  la  plataforma.  
Cada  usuario  visualiza  únicamente  las  opciones  relevantes  para  sus  responsabilidades.  
 
7.9  Reglas  de  navegación  
Toda  la  navegación  del  producto  debe  respetar  las  siguientes  reglas:  
●  un  módulo  tiene  una  única  entrada  principal;  ●  el  usuario  siempre  dispone  de  un  camino  claro  para  regresar;  ●  la  navegación  nunca  depende  exclusivamente  de  un  único  flujo;  ●  las  acciones  críticas  requieren  confirmación  cuando  sea  necesario;  ●  los  cambios  de  contexto  deben  ser  evidentes.  
Estas  reglas  garantizan  una  experiencia  predecible  y  reducen  los  errores  de  uso.  
 
7.10  Evolución  de  la  navegación  
La  incorporación  de  nuevos  módulos  deberá  preservar  la  simplicidad  de  la  estructura  
existente.
 
Antes  de  añadir  un  nuevo  elemento  de  navegación  será  necesario  justificar:  
●  su  frecuencia  de  uso;  ●  su  relevancia  para  el  usuario;  ●  el  impacto  sobre  la  arquitectura  actual;  ●  la  existencia  de  alternativas  mediante  navegación  contextual.  
La  navegación  principal  debe  mantenerse  lo  más  estable  posible.

7.11  Declaración  de  navegación  
La  navegación  global  de  Elevate  organiza  el  acceso  al  ecosistema  
mediante
 
una
 
estructura
 
clara,
 
consistente
 
y
 
orientada
 
al
 
aprendizaje.
 
Su
 
diseño
 
garantiza
 
que
 
estudiantes,
 
profesores
 
y
 
administradores
 
puedan
 
desplazarse
 
por
 
la
 
plataforma
 
con
 
confianza,
 
manteniendo
 
siempre
 
el
 
contexto
 
y
 
minimizando
 
la
 
complejidad
 
de
 
la
 
interacción.
 
 
Capítulo  8  —  Roles  &  Permissions  
 
8.1  Propósito  
El  modelo  de  roles  y  permisos  define  cómo  se  distribuyen  las  responsabilidades  dentro  de  
Elevate
 
y
 
qué
 
capacidades
 
puede
 
utilizar
 
cada
 
tipo
 
de
 
usuario.
 
Su  objetivo  es  garantizar  que  cada  usuario  tenga  acceso  únicamente  a  las  funcionalidades  
necesarias
 
para
 
desempeñar
 
su
 
función,
 
manteniendo
 
la
 
seguridad,
 
la
 
simplicidad
 
y
 
la
 
coherencia
 
del
 
producto.
 
La  gestión  de  permisos  forma  parte  de  la  arquitectura  funcional  de  Elevate  y  constituye  un  
elemento
 
esencial
 
para
 
la
 
protección
 
de
 
la
 
información
 
y
 
la
 
correcta
 
operación
 
de
 
la
 
plataforma.
 
 
8.2  Principios  
El  sistema  de  permisos  se  basa  en  cinco  principios  fundamentales.  
Mínimo  privilegio  
Cada  usuario  dispone  únicamente  de  los  permisos  necesarios  para  realizar  sus  tareas.  
 
Claridad

Los  permisos  deben  ser  predecibles  y  fáciles  de  comprender.  
 
Consistencia  
Una  misma  acción  requiere  los  mismos  permisos  en  toda  la  plataforma.  
 
Escalabilidad  
El  modelo  debe  permitir  incorporar  nuevos  roles  sin  modificar  la  arquitectura  existente.  
 
Seguridad  
Toda  operación  sensible  debe  estar  protegida  mediante  autorización  explícita.  
 
8.3  Modelo  de  roles  
Elevate  define  tres  roles  principales.  
Rol  Propósito  
Estudiante  Aprender  y  realizar  el  recorrido  formativo.  
Profesor  Gestionar  la  actividad  académica  y  acompañar  al  alumnado.  
Administrador  Administrar  el  funcionamiento  global  de  la  plataforma.  
Estos  roles  representan  la  estructura  base  del  producto.  
 
8.4  Rol:  Estudiante  
El  estudiante  es  el  usuario  principal  del  ecosistema.  
Su  experiencia  está  completamente  orientada  al  aprendizaje.

Capacidades  
Puede:  
●  acceder  a  sus  cursos;  ●  visualizar  contenidos;  ●  completar  lecciones;  ●  realizar  evaluaciones;  ●  consultar  su  progreso;  ●  obtener  certificados;  ●  participar  en  la  comunidad;  ●  utilizar  el  Tutor  IA;  ●  gestionar  su  perfil.  
No  puede  modificar  contenidos  académicos  ni  acceder  a  información  de  otros  usuarios.  
 
8.5  Rol:  Profesor  
El  profesorado  dispone  de  herramientas  para  gestionar  la  actividad  académica.  
Capacidades  
Puede:  
●  crear  y  gestionar  sesiones;  ●  realizar  seguimiento  del  alumnado;  ●  consultar  progreso;  ●  evaluar  actividades;  ●  gestionar  asistencia;  ●  revisar  entregas;  ●  comunicarse  con  los  estudiantes;  ●  acceder  a  paneles  docentes.  
No  puede  modificar  configuraciones  globales  de  la  plataforma  salvo  autorización  específica.  
 
8.6  Rol:  Administrador  
El  administrador  es  responsable  del  funcionamiento  del  ecosistema.  
Capacidades

Puede:  
●  gestionar  usuarios;  ●  administrar  cursos;  ●  organizar  contenidos;  ●  configurar  parámetros  generales;  ●  gestionar  permisos;  ●  consultar  analítica  global;  ●  supervisar  la  actividad  de  la  plataforma.  
Dispone  del  mayor  nivel  de  acceso  dentro  del  producto.  
 
8.7  Matriz  de  permisos  
Funcionalidad  Estudiante  Profesor  
Administrador  
Acceder  a  cursos  ✔  ✔  ✔  
Completar  lecciones  ✔  ✔  ✔  
Realizar  evaluaciones  ✔  ✔  ✔  
Consultar  progreso  propio  ✔  ✔  ✔  
Consultar  progreso  de  estudiantes  
✖  ✔  ✔  
Gestionar  contenidos  ✖  ✔  ✔  
Gestionar  usuarios  ✖  ✖  ✔  
Configurar  plataforma  ✖  ✖  ✔  
Gestionar  sesiones  ✖  ✔  ✔  
Utilizar  Tutor  IA  ✔  ✔  ✔  
Participar  en  comunidad  ✔  ✔  ✔  
Esta  matriz  representa  el  modelo  funcional  de  permisos  y  podrá  ampliarse  en  futuras  
versiones.

8.8  Gestión  de  permisos  
Los  permisos  no  se  asignan  directamente  a  cada  usuario.  
Cada  usuario  hereda  los  permisos  asociados  a  su  rol.  
Este  enfoque  facilita:  
●  la  administración;  ●  la  consistencia;  ●  la  escalabilidad;  ●  el  mantenimiento  del  sistema.  
Las  excepciones  deberán  minimizarse  y  justificarse.  
 
8.9  Acceso  a  módulos  
No  todos  los  módulos  están  disponibles  para  todos  los  usuarios.  
Módulo  Estudiante  Profesor  
Administrador  
Inicio  ✔  ✔  ✔  
Mis  cursos  ✔  ✔  ✔  
Curso  ✔  ✔  ✔  
Lección  ✔  ✔  ✔  
Evaluaciones  ✔  ✔  ✔  
Mi  progreso  ✔  ✔  ✔  
Certificados  ✔  ✔  ✔  
Calendario  ✔  ✔  ✔  
Actividades  ✔  ✔  ✔  
Comunidad  ✔  ✔  ✔  
Perfil  ✔  ✔  ✔

Panel  docente  ✖  ✔  ✔  
Panel  administrativo  ✖  ✖  ✔  
La  navegación  se  adapta  automáticamente  al  rol  del  usuario.  
 
8.10  Evolución  del  modelo  
El  sistema  de  permisos  está  preparado  para  crecer.  
En  futuras  versiones  podrán  incorporarse  nuevos  roles,  como:  
●  Tutor  académico.  ●  Coordinador.  ●  Responsable  de  centro.  ●  Soporte.  ●  Invitado.  
Cada  nuevo  rol  deberá:  
●  responder  a  una  necesidad  real;  ●  reutilizar  permisos  existentes  cuando  sea  posible;  ●  evitar  duplicidades;  ●  mantener  la  simplicidad  del  modelo.  
 
8.11  Reglas  de  autorización  
Toda  operación  protegida  deberá  cumplir  las  siguientes  reglas:  
●  verificar  la  identidad  del  usuario;  ●  comprobar  los  permisos  asociados  al  rol;  ●  registrar  las  acciones  críticas  cuando  sea  necesario;  ●  impedir  accesos  no  autorizados;  ●  comunicar  claramente  los  errores  de  autorización.  
Estas  reglas  son  obligatorias  para  todos  los  módulos  del  producto.  
 
8.12  Declaración  del  modelo  de  roles

El  modelo  de  roles  y  permisos  de  Elevate  garantiza  que  cada  usuario  
disponga
 
de
 
las
 
capacidades
 
necesarias
 
para
 
desempeñar
 
su
 
función
 
dentro
 
del
 
ecosistema.
 
Su
 
diseño
 
prioriza
 
la
 
seguridad,
 
la
 
simplicidad
 
y
 
la
 
escalabilidad,
 
permitiendo
 
que
 
la
 
plataforma
 
evolucione
 
sin
 
comprometer
 
la
 
coherencia
 
de
 
la
 
experiencia
 
ni
 
la
 
protección
 
de
 
la
 
información.
 
 
Capítulo  9  —  Core  User  Flows  
 
9.1  Propósito  
Los  Core  User  Flows  describen  los  recorridos  principales  que  realizan  los  usuarios  dentro  
de
 
Elevate
 
para
 
alcanzar
 
sus
 
objetivos.
 
Estos  flujos  representan  la  interacción  entre  módulos  desde  una  perspectiva  funcional  y  
constituyen
 
la
 
base
 
sobre
 
la
 
que
 
posteriormente
 
se
 
diseñarán
 
las
 
experiencias
 
de
 
usuario
 
(UX),
 
las
 
interfaces
 
(UI)
 
y
 
los
 
procesos
 
técnicos.
 
Su  finalidad  es  garantizar  que  las  acciones  más  importantes  del  producto  sean  coherentes,  
eficientes
 
y
 
predecibles.
 
 
9.2  Principios  
Todos  los  flujos  de  Elevate  deberán  cumplir  los  siguientes  principios:  
●  minimizar  el  número  de  pasos;  ●  mantener  el  contexto  del  usuario;  ●  proporcionar  feedback  continuo;  ●  evitar  callejones  sin  salida;  ●  ofrecer  siempre  un  siguiente  paso  claro;  ●  preservar  la  continuidad  del  aprendizaje.  
 
9.3  Flujo  1  —  Acceso  a  la  plataforma  
Objetivo

Permitir  que  el  usuario  acceda  de  forma  segura  a  su  espacio  de  trabajo.  
Recorrido  Inicio  de  sesión          ↓  Autenticación          ↓  Carga  del  perfil          ↓  Carga  del  contexto          ↓  Pantalla  Inicio  
Resultado  esperado  
El  usuario  accede  directamente  a  una  vista  personalizada  según  su  rol  y  estado  de  
aprendizaje.
 
 
9.4  Flujo  2  —  Continuar  aprendiendo  
Este  es  el  flujo  principal  del  producto.  
Recorrido  Inicio        ↓  Continúa  donde  lo  dejaste        ↓  Curso        ↓  Unidad        ↓  Lección        ↓  Finalización        ↓  Actualización  del  progreso        ↓  Siguiente  recomendación  
Objetivo  
Reducir  el  tiempo  entre  abrir  la  plataforma  y  comenzar  a  aprender.

9.5  Flujo  3  —  Completar  un  curso  
Mis  cursos        ↓  Curso        ↓  Unidades        ↓  Lecciones        ↓  Evaluaciones        ↓  Curso  completado        ↓  Certificado  
Resultado  esperado  
El  estudiante  completa  el  recorrido  académico  y  obtiene  el  reconocimiento  correspondiente.  
 
9.6  Flujo  4  —  Realizar  una  evaluación  
Curso        ↓  Evaluación        ↓  Respuestas        ↓  Corrección        ↓  Resultado        ↓  Actualización  del  progreso  
Objetivo  
Medir  el  nivel  de  adquisición  de  conocimientos  y  ofrecer  retroalimentación  inmediata.  
 
9.7  Flujo  5  —  Consultar  el  progreso  
Inicio

↓  Mi  progreso        ↓  Cursos        ↓  Competencias        ↓  Objetivos        ↓  Recomendaciones  
Resultado  esperado  
El  estudiante  comprende  rápidamente  su  evolución  y  sabe  qué  debe  hacer  a  continuación.  
 
9.8  Flujo  6  —  Participar  en  la  comunidad  
Comunidad        ↓  Explorar  publicaciones        ↓  Responder  o  crear  contenido        ↓  Interacción        ↓  Regreso  al  aprendizaje  
Objetivo  
Favorecer  el  aprendizaje  colaborativo  sin  convertir  la  comunidad  en  el  centro  del  producto.  
 
9.9  Flujo  7  —  Utilizar  el  Tutor  IA  
Lección        ↓  Abrir  Tutor  IA        ↓  Realizar  consulta        ↓  Respuesta  contextual        ↓  Continuar  la  lección

Principio  
La  IA  acompaña  el  aprendizaje,  pero  no  sustituye  el  recorrido  formativo.  
 
9.10  Flujo  8  —  Profesor  
Inicio        ↓  Panel  docente        ↓  Curso        ↓  Seguimiento        ↓  Evaluaciones        ↓  Retroalimentación  
Objetivo  
Facilitar  el  acompañamiento  del  alumnado  reduciendo  la  carga  administrativa.  
 
9.11  Flujo  9  —  Administrador  
Inicio        ↓  Panel  administrativo        ↓  Usuarios        ↓  Cursos        ↓  Configuración        ↓  Analítica  
Objetivo  
Gestionar  el  funcionamiento  global  del  ecosistema  desde  una  experiencia  eficiente  y  
organizada.

9.12  Convergencia  de  flujos  
Aunque  existen  recorridos  específicos  para  cada  rol,  todos  los  flujos  convergen  sobre  un  
mismo
 
objetivo.
 
             Aprendizaje                      ▲                      │  Profesor  ◄──────────┼──────────►  Administrador                      │                      ▼                 Estudiante  
Todas  las  interacciones  del  producto  deben  contribuir,  directa  o  indirectamente,  a  mejorar  la  
experiencia
 
de
 
aprendizaje.
 
 
9.13  Reglas  de  diseño  de  flujos  
Todo  flujo  funcional  deberá:  
●  tener  un  objetivo  claramente  definido;  ●  finalizar  con  un  resultado  verificable;  ●  proporcionar  feedback  en  cada  etapa  relevante;  ●  evitar  pasos  innecesarios;  ●  permitir  la  recuperación  ante  errores;  ●  mantener  la  consistencia  con  el  resto  del  ecosistema.  
 
9.14  Declaración  de  los  Core  User  Flows  
Los  Core  User  Flows  representan  los  recorridos  esenciales  que  permiten  
a
 
estudiantes,
 
profesores
 
y
 
administradores
 
alcanzar
 
sus
 
objetivos
 
dentro
 
de
 
Elevate.
 
Su
 
diseño
 
garantiza
 
una
 
experiencia
 
continua,
 
eficiente
 
y
 
orientada
 
al
 
aprendizaje,
 
sirviendo
 
como
 
referencia
 
para
 
el
 
diseño
 
de
 
la
 
experiencia
 
de
 
usuario
 
y
 
la
 
implementación
 
funcional
 
del
 
producto.
 
 
Capítulo  10  —  Architectural  Rules

10.1  Propósito  
Las  reglas  arquitectónicas  establecen  los  principios  que  deben  respetarse  durante  toda  la  
evolución
 
de
 
Elevate.
 
Su  objetivo  es  preservar  la  coherencia  funcional  del  producto,  garantizar  su  escalabilidad  y  
evitar
 
que
 
nuevas
 
funcionalidades
 
comprometan
 
la
 
experiencia
 
construida
 
hasta
 
el
 
momento.
 
Estas  reglas  son  de  aplicación  obligatoria  para  cualquier  modificación  de  la  arquitectura  del  
producto.
 
 
10.2  Principios  generales  
Toda  evolución  de  Elevate  deberá  respetar  los  siguientes  principios:  
●  mantener  una  arquitectura  modular;  ●  preservar  la  simplicidad  del  producto;  ●  favorecer  la  reutilización  de  capacidades  existentes;  ●  evitar  la  duplicidad  funcional;  ●  garantizar  una  experiencia  consistente  para  todos  los  usuarios.  
 
10.3  Responsabilidad  única  
Cada  módulo  debe  tener  un  propósito  claramente  definido.  
No  se  incorporarán  funcionalidades  que  pertenezcan  conceptualmente  a  otro  módulo  del  
ecosistema.
 
Cuando  una  necesidad  afecte  a  varios  módulos,  deberá  resolverse  mediante  un  sistema  
transversal
 
o
 
una
 
integración
 
adecuada,
 
no
 
duplicando
 
la
 
funcionalidad.
 
 
10.4  Modularidad  
Los  módulos  deben  poder  evolucionar  de  forma  independiente.

Las  modificaciones  realizadas  en  un  módulo  no  deberán  producir  efectos  inesperados  sobre  
el
 
resto
 
del
 
producto.
 
La  comunicación  entre  módulos  deberá  realizarse  mediante  interfaces  y  servicios  definidos  
por
 
la
 
arquitectura.
 
 
10.5  Reutilización  
Antes  de  crear  una  nueva  funcionalidad  deberán  evaluarse  las  capacidades  existentes.  
Siempre  que  sea  posible  se  reutilizarán:  
●  componentes;  ●  servicios  transversales;  ●  patrones  de  interacción;  ●  flujos  de  usuario;  ●  reglas  de  negocio.  
La  reutilización  favorece  la  consistencia  y  reduce  el  coste  de  mantenimiento.  
 
10.6  Consistencia  
Todas  las  incorporaciones  deberán  mantener  coherencia  con:  
●  la  visión  del  producto;  ●  la  arquitectura  funcional;  ●  la  navegación;  ●  la  experiencia  de  usuario;  ●  el  sistema  de  diseño;  ●  la  terminología  oficial.  
La  consistencia  prevalece  sobre  las  preferencias  individuales  de  implementación.  
 
10.7  Escalabilidad  
La  arquitectura  debe  facilitar  la  incorporación  de  nuevas  capacidades  sin  requerir  
reorganizaciones
 
profundas.
 
Toda  ampliación  deberá:

●  integrarse  en  los  dominios  existentes  siempre  que  sea  posible;  ●  justificar  la  creación  de  nuevos  módulos  o  dominios;  ●  minimizar  el  impacto  sobre  la  estructura  actual.  
 
10.8  Evolución  del  producto  
Elevate  evolucionará  mediante  incrementos  controlados.  
Cada  nueva  funcionalidad  deberá  documentar:  
●  el  problema  que  resuelve;  ●  el  usuario  afectado;  ●  el  impacto  sobre  la  arquitectura;  ●  los  módulos  implicados;  ●  las  dependencias  introducidas;  ●  los  criterios  para  medir  su  éxito.  
La  incorporación  de  funcionalidades  sin  una  justificación  funcional  clara  no  forma  parte  del  
proceso
 
de
 
evolución
 
del
 
producto.
 
 
10.9  Gestión  de  cambios  
Toda  modificación  arquitectónica  deberá  seguir  un  proceso  definido.  
1.  Identificación  de  la  necesidad.  2.  Análisis  del  impacto.  3.  Validación  con  los  principios  del  Product  Vision.  4.  Revisión  de  la  arquitectura  funcional.  5.  Actualización  del  Blueprint.  6.  Diseño  UX.  7.  Diseño  visual.  8.  Implementación  técnica.  9.  Validación  y  publicación.  
El  Blueprint  constituye  la  referencia  oficial  durante  todo  este  proceso.  
 
10.10  Compatibilidad  entre  volúmenes

Las  decisiones  recogidas  en  este  volumen  deberán  mantenerse  alineadas  con:  
●  Volumen  I  —  Product  Vision  ●  Volumen  III  —  UX  Playbook  ●  Volumen  IV  —  Design  Blueprint  ●  Volumen  V  —  Technical  Blueprint  
Ningún  volumen  podrá  contradecir  las  decisiones  establecidas  en  otro  sin  una  revisión  
formal
 
del
 
Blueprint.
 
 
10.11  Gobernanza  del  Blueprint  
El  Product  Blueprint  es  la  fuente  oficial  de  conocimiento  sobre  Elevate.  
Toda  decisión  estratégica  relacionada  con  el  producto  deberá  reflejarse  en  esta  
documentación.
 
La  incorporación,  modificación  o  eliminación  de  funcionalidades  implicará  la  actualización  
del
 
Blueprint
 
correspondiente
 
para
 
garantizar
 
que
 
la
 
documentación
 
permanezca
 
sincronizada
 
con
 
la
 
evolución
 
del
 
producto.
 
 
10.12  Declaración  arquitectónica  final  
La  arquitectura  de  Elevate  se  basa  en  una  estructura  modular,  escalable  y  
orientada
 
al
 
aprendizaje.
 
Sus
 
reglas
 
garantizan
 
que
 
el
 
producto
 
pueda
 
evolucionar
 
de
 
forma
 
controlada,
 
preservando
 
la
 
coherencia
 
entre
 
la
 
visión,
 
la
 
experiencia
 
de
 
usuario
 
y
 
la
 
implementación
 
funcional.
 
El
 
Blueprint
 
constituye
 
la
 
referencia
 
oficial
 
para
 
todas
 
las
 
decisiones
 
presentes
 
y
 
futuras
 
del
 
ecosistema.
