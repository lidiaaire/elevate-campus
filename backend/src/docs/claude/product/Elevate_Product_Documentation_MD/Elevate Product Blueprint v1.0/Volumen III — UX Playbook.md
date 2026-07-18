# Volumen III — UX Playbook

> Fuente convertida automáticamente desde el PDF oficial. Se conserva el PDF original como fuente maestra.

Volumen  III  —  UX  Playbook  
 
Portada  
Elevate  Product  Blueprint  
Volumen  III  —  UX  Playbook  
Versión:  1.0  
 
Estado:
 
Approved
 
Baseline
 
 
Clasificación:
 
Internal
 
Product
 
Documentation
 
 
Objetivo  
Este  volumen  define  las  reglas  de  experiencia  de  usuario  que  gobiernan  toda  la  plataforma  
Elevate.
 
Mientras  el  Product  Vision  explica  por  qué  existe  el  producto  y  el  Product  Architecture  
describe
 
cómo
 
está
 
organizado,
 
el
 
UX
 
Playbook
 
establece
 
cómo
 
debe
 
sentirse,
 
comportarse
 
e
 
interactuar
 
el
 
producto.
 
Todas  las  interfaces,  flujos  y  componentes  deberán  respetar  los  principios  definidos  en  este  
documento.
 
 
Control  de  versiones  
Versión  
Fecha  Estado  Autor  Cambios  
1.0  Julio  2026  
Approved  
Product  Management  &  Product  Design  
Primera  edición  oficial  del  UX  Playbook.

Índice  
Capítulo  1.  Introducción  
1.1  Propósito  
1.2  Alcance  
1.3  Relación  con  el  Blueprint  
1.4  Principios  UX  
1.5  Organización  del  documento  
 
Capítulo  2.  UX  Foundations  
 
Capítulo  3.  User  Mental  Models  
 
Capítulo  4.  Navigation  Patterns  
 
Capítulo  5.  Interaction  Patterns  
 
Capítulo  6.  Feedback  &  System  States  
 
Capítulo  7.  Accessibility  
 
Capítulo  8.  Responsive  Experience  
 
Capítulo  9.  Motion  &  Microinteractions  
 
Capítulo  10.  UX  Rules

Capítulo  1  —  Introducción  
 
1.1  Propósito  
El  UX  Playbook  establece  las  reglas  que  deben  seguir  todas  las  experiencias  de  usuario  de  
Elevate.
 
Su  finalidad  es  garantizar  que  la  plataforma  ofrezca  una  interacción  consistente,  intuitiva  y  
alineada
 
con
 
la
 
visión
 
del
 
producto,
 
independientemente
 
del
 
módulo
 
desde
 
el
 
que
 
acceda
 
el
 
usuario.
 
Este  documento  no  define  el  aspecto  visual  de  la  interfaz  ni  su  implementación  técnica.  Su  
foco
 
es
 
la
 
experiencia
 
de
 
uso.
 
 
1.2  Alcance  
Este  volumen  documenta:  
●  principios  de  experiencia  de  usuario;  ●  patrones  de  navegación;  ●  patrones  de  interacción;  ●  comportamiento  de  los  componentes;  ●  estados  del  sistema;  ●  accesibilidad;  ●  experiencia  multidispositivo;  ●  microinteracciones;  ●  reglas  UX.  
No  incluye  especificaciones  visuales,  tokens  de  diseño  o  componentes  gráficos,  que  se  
desarrollarán
 
en
 
el
 
Design
 
Blueprint
.
 
 
1.3  Relación  con  el  Blueprint  
El  UX  Playbook  conecta  la  arquitectura  funcional  con  el  diseño  visual.  
Su  posición  dentro  del  Blueprint  es  la  siguiente:  
Product  Vision          ↓  Product  Architecture          ↓

UX  Playbook          ↓  Design  Blueprint          ↓  Technical  Blueprint  
Toda  decisión  de  experiencia  debe  estar  alineada  con  los  principios  establecidos  en  los  
volúmenes
 
anteriores.
 
 
1.4  Principios  UX  
Toda  experiencia  diseñada  para  Elevate  deberá  perseguir  cinco  objetivos.  
Claridad  
El  usuario  entiende  qué  puede  hacer  y  cómo  hacerlo.  
Continuidad  
La  plataforma  mantiene  siempre  el  contexto  del  aprendizaje.  
Consistencia  
Los  mismos  patrones  producen  los  mismos  resultados.  
Eficiencia  
Las  tareas  frecuentes  requieren  el  mínimo  esfuerzo.  
Confianza  
El  sistema  comunica  claramente  lo  que  ocurre  en  cada  momento.  
Estos  principios  serán  desarrollados  en  los  capítulos  siguientes.  
 
1.5  Organización  del  documento  
El  UX  Playbook  evoluciona  desde  los  principios  generales  hasta  las  reglas  concretas  de  
interacción.
 
Los  siguientes  capítulos  desarrollarán:  
●  los  fundamentos  de  la  experiencia;  ●  el  modelo  mental  del  usuario;

●  la  navegación;  ●  los  patrones  de  interacción;  ●  el  comportamiento  del  sistema;  ●  la  accesibilidad;  ●  la  adaptación  multidispositivo;  ●  las  microinteracciones;  ●  las  reglas  UX  que  deberán  respetar  todos  los  módulos.  
Capítulo  2  —  UX  Foundations  
 
2.1  Propósito  
Los  fundamentos  de  experiencia  de  usuario  establecen  los  criterios  que  deben  guiar  el  
diseño
 
de
 
cualquier
 
interacción
 
dentro
 
de
 
Elevate.
 
Su  objetivo  es  garantizar  que  toda  la  plataforma  transmita  una  experiencia  coherente,  
intuitiva
 
y
 
centrada
 
en
 
el
 
aprendizaje,
 
independientemente
 
del
 
módulo
 
desde
 
el
 
que
 
interactúe
 
el
 
usuario.
 
Estos  principios  son  transversales  y  deberán  aplicarse  en  todas  las  futuras  evoluciones  del  
producto.
 
 
2.2  La  experiencia  antes  que  la  interfaz  
La  experiencia  de  usuario  no  comienza  cuando  aparece  una  pantalla  ni  termina  al  pulsar  un  
botón.
 
En  Elevate,  la  experiencia  comprende  todo  el  recorrido  del  estudiante:  
●  descubrir  qué  debe  hacer;  ●  acceder  rápidamente  al  contenido;  ●  aprender  sin  interrupciones;  ●  comprender  su  progreso;  ●  continuar  su  formación  con  claridad.  
Cada  decisión  de  diseño  debe  contribuir  a  que  este  recorrido  resulte  natural  y  continuo.

2.3  Principios  fundamentales  
La  experiencia  de  usuario  de  Elevate  se  basa  en  ocho  principios.  
Claridad  
La  interfaz  debe  comunicar  su  propósito  de  forma  inmediata.  
El  usuario  no  debería  necesitar  explorar  varias  pantallas  para  comprender  cómo  realizar  
una
 
acción.
 
Cada  vista  debe  responder  claramente  a  la  pregunta:  
¿Qué  puedo  hacer  aquí?  
 
Simplicidad  
Cada  pantalla  debe  contener  únicamente  la  información  necesaria  para  la  tarea  que  el  
usuario
 
está
 
realizando.
 
Reducir  elementos  innecesarios  disminuye  la  carga  cognitiva  y  facilita  la  toma  de  
decisiones.
 
 
Continuidad  
Elevate  debe  mantener  el  contexto  del  estudiante  entre  sesiones  y  durante  la  navegación.  
La  plataforma  siempre  debe  facilitar  la  continuación  del  aprendizaje  sin  obligar  al  usuario  a  
reconstruir
 
mentalmente
 
dónde
 
se
 
encontraba.
 
 
Consistencia  
Los  mismos  elementos  deben  comportarse  siempre  de  la  misma  manera.  
Esto  incluye:  
●  botones;  ●  iconos;  ●  colores;  ●  formularios;

●  navegación;  ●  mensajes;  ●  acciones.  
La  consistencia  genera  confianza  y  reduce  el  tiempo  de  aprendizaje  de  la  interfaz.  
 
Retroalimentación  
Toda  acción  del  usuario  debe  producir  una  respuesta  visible.  
El  sistema  debe  comunicar:  
●  que  una  acción  ha  comenzado;  ●  que  está  siendo  procesada;  ●  que  ha  finalizado  correctamente;  ●  o  que  requiere  la  intervención  del  usuario.  
Nunca  debe  existir  incertidumbre  sobre  el  estado  de  una  operación.  
 
Accesibilidad  
La  experiencia  debe  ser  utilizable  por  el  mayor  número  posible  de  personas.  
Las  decisiones  de  UX  deberán  considerar  desde  el  inicio  aspectos  relacionados  con  
accesibilidad,
 
legibilidad
 
y
 
facilidad
 
de
 
uso.
 
 
Eficiencia  
Las  tareas  frecuentes  deben  completarse  con  el  menor  esfuerzo  posible.  
Las  acciones  repetitivas  deben  optimizarse  mediante  accesos  directos,  automatizaciones  o  
recomendaciones
 
contextuales.
 
 
Progreso  visible  
El  usuario  debe  percibir  continuamente  que  está  avanzando.  
La  experiencia  debe  reforzar  la  sensación  de  progreso  mediante  indicadores  claros  y  
actualizados.

2.4  Modelo  de  experiencia  
Elevate  organiza  la  experiencia  de  usuario  en  un  ciclo  continuo.  
Comprender        ↓  Actuar        ↓  Recibir  feedback        ↓  Visualizar  progreso        ↓  Continuar  
Cada  interacción  dentro  del  producto  debe  encajar  en  este  ciclo.  
 
2.5  Carga  cognitiva  
Uno  de  los  objetivos  principales  del  diseño  es  minimizar  el  esfuerzo  mental  necesario  para  
utilizar
 
la
 
plataforma.
 
Para  ello:  
●  las  decisiones  importantes  deben  estar  guiadas;  ●  la  información  debe  organizarse  por  prioridad;  ●  los  elementos  secundarios  no  deben  competir  visualmente  con  los  principales;  ●  cada  pantalla  debe  centrarse  en  una  tarea  principal.  
La  interfaz  debe  permitir  pensar  en  aprender,  no  en  utilizar  la  plataforma.  
 
2.6  Modelo  de  decisión  
Antes  de  incorporar  cualquier  nueva  funcionalidad  deberán  responderse  las  siguientes  
preguntas:
 
1.  ¿Qué  necesidad  del  usuario  resuelve?  2.  ¿Es  comprensible  sin  explicación  adicional?  3.  ¿Reduce  o  aumenta  la  complejidad?

4.  ¿Mantiene  la  consistencia  del  producto?  5.  ¿Favorece  el  aprendizaje?  
Si  alguna  respuesta  es  negativa,  la  propuesta  deberá  revisarse  antes  de  su  incorporación.  
 
2.7  Priorización  de  la  información  
Todas  las  pantallas  de  Elevate  deberán  organizar  la  información  siguiendo  una  jerarquía  
clara.
 
Nivel  1  —  Acción  principal  
La  tarea  más  importante  de  la  pantalla.  
Nivel  2  —  Información  de  apoyo  
Datos  necesarios  para  completar  la  acción.  
Nivel  3  —  Información  complementaria  
Contenido  útil  pero  no  imprescindible.  
Nivel  4  —  Acciones  secundarias  
Opciones  avanzadas  o  de  menor  frecuencia.  
Esta  jerarquía  debe  mantenerse  en  todos  los  módulos.  
 
2.8  Continuidad  del  aprendizaje  
Toda  sesión  debe  finalizar  facilitando  el  siguiente  paso.  
El  estudiante  nunca  debería  abandonar  la  plataforma  sin  saber:  
●  qué  ha  conseguido;  ●  qué  le  queda  por  hacer;  ●  cómo  continuar.  
Este  principio  conecta  directamente  con  la  visión  de  producto  definida  en  el  Volumen  I.

2.9  Validación  de  la  experiencia  
Toda  decisión  de  UX  deberá  poder  responder  afirmativamente  a  las  siguientes  cuestiones:  
●  ¿Reduce  la  fricción?  ●  ¿Hace  el  producto  más  fácil  de  utilizar?  ●  ¿Ayuda  al  estudiante  a  avanzar?  ●  ¿Es  consistente  con  el  resto  del  ecosistema?  ●  ¿Mejora  la  percepción  de  calidad?  
Estas  preguntas  constituyen  la  lista  de  comprobación  básica  para  cualquier  evolución  de  la  
experiencia.
 
 
2.10  Declaración  de  los  fundamentos  UX  
La  experiencia  de  usuario  de  Elevate  se  construye  sobre  la  claridad,  la  
simplicidad
 
y
 
la
 
continuidad
 
del
 
aprendizaje.
 
Cada
 
interacción
 
debe
 
facilitar
 
que
 
el
 
estudiante
 
avance
 
con
 
confianza,
 
comprenda
 
su
 
progreso
 
y
 
alcance
 
sus
 
objetivos
 
con
 
el
 
menor
 
esfuerzo
 
posible.
 
La
 
calidad
 
de
 
la
 
experiencia
 
se
 
mide
 
por
 
la
 
facilidad
 
con
 
la
 
que
 
el
 
usuario
 
aprende,
 
no
 
por
 
la
 
complejidad
 
de
 
la
 
interfaz.
 
 
Capítulo  3  —  User  Mental  Models  
 
3.1  Propósito  
La  experiencia  de  usuario  de  Elevate  debe  adaptarse  a  la  forma  en  que  los  usuarios  
piensan,
 
toman
 
decisiones
 
y
 
esperan
 
interactuar
 
con
 
una
 
plataforma
 
educativa.
 
Este  capítulo  define  los  modelos  mentales  que  deben  guiar  el  diseño  de  la  interfaz  para  
minimizar
 
la
 
curva
 
de
 
aprendizaje
 
y
 
favorecer
 
una
 
interacción
 
natural.
 
El  objetivo  no  es  enseñar  al  usuario  cómo  funciona  Elevate,  sino  diseñar  Elevate  de  forma  
que
 
funcione
 
como
 
el
 
usuario
 
espera.

3.2  ¿Qué  es  un  modelo  mental?  
Un  modelo  mental  es  la  representación  que  una  persona  construye  sobre  el  funcionamiento  
de
 
un
 
sistema.
 
Los  usuarios  toman  decisiones  basándose  en  experiencias  previas,  expectativas  y  patrones  
ya
 
conocidos.
 
Cuando  el  comportamiento  de  la  plataforma  coincide  con  esas  expectativas,  la  interacción  
resulta
 
intuitiva.
 
Cuando  no  coincide,  aumenta  la  incertidumbre,  la  carga  cognitiva  y  la  probabilidad  de  
cometer
 
errores.
 
 
3.3  Modelo  mental  del  estudiante  
El  estudiante  no  accede  a  Elevate  para  explorar  funcionalidades.  
Accede  con  un  objetivo  concreto:  
Continuar  aprendiendo  inglés.  
Desde  el  momento  en  que  inicia  sesión  espera  responder  rápidamente  a  cuatro  preguntas:  
●  ¿Dónde  me  quedé?  ●  ¿Qué  debo  hacer  ahora?  ●  ¿Cuánto  llevo  completado?  ●  ¿Qué  conseguiré  si  continúo?  
Toda  la  experiencia  debe  responder  a  estas  preguntas  sin  que  el  estudiante  tenga  que  
buscarlas.
 
 
3.4  Modelo  mental  del  profesor  
El  profesor  espera  disponer  de  información  clara  para  acompañar  a  sus  estudiantes.  
Su  foco  no  está  en  gestionar  la  plataforma,  sino  en  comprender  qué  ocurre  dentro  de  ella.  
Las  preguntas  principales  son:  
●  ¿Qué  estudiantes  necesitan  ayuda?  ●  ¿Quién  ha  avanzado?

●  ¿Qué  actividades  están  pendientes?  ●  ¿Qué  debo  revisar  hoy?  
La  interfaz  debe  priorizar  información  accionable  frente  a  datos  secundarios.  
 
3.5  Modelo  mental  del  administrador  
El  administrador  entiende  Elevate  como  un  sistema  que  debe  mantenerse  organizado  y  
operativo.
 
Busca  rapidez,  control  y  visibilidad.  
Sus  principales  preguntas  son:  
●  ¿Todo  funciona  correctamente?  ●  ¿Qué  debo  administrar?  ●  ¿Dónde  puedo  realizar  esta  configuración?  ●  ¿Existe  alguna  incidencia?  
Las  herramientas  administrativas  deben  priorizar  eficiencia  y  claridad.  
 
3.6  Principio  de  continuidad  
Los  usuarios  esperan  que  la  plataforma  recuerde  el  contexto.  
Elevate  debe  conservar  automáticamente  información  como:  
●  último  curso  visitado;  ●  última  lección  completada;  ●  progreso  actual;  ●  actividades  pendientes;  ●  objetivos  en  curso.  
El  usuario  no  debería  reconstruir  manualmente  su  contexto  en  cada  sesión.  
 
3.7  Principio  de  previsibilidad  
Las  acciones  deben  producir  resultados  esperados.

Ejemplos:  
●  pulsar  una  lección  siempre  abre  esa  lección;  ●  completar  una  actividad  actualiza  el  progreso;  ●  finalizar  una  evaluación  muestra  inmediatamente  el  resultado;  ●  obtener  un  certificado  lo  hace  visible  en  el  módulo  correspondiente.  
La  plataforma  nunca  debe  sorprender  al  usuario  con  comportamientos  inconsistentes.  
 
3.8  Principio  de  reconocimiento  
Es  preferible  que  el  usuario  reconozca  opciones  antes  que  obligarle  a  recordarlas.  
Por  ello:  
●  las  acciones  frecuentes  deben  permanecer  visibles;  ●  el  siguiente  paso  debe  destacarse  claramente;  ●  los  elementos  importantes  deben  poder  identificarse  de  un  vistazo;  ●  la  navegación  debe  apoyarse  en  patrones  repetitivos.  
Elevate  prioriza  el  reconocimiento  sobre  la  memorización.  
 
3.9  Reducción  de  decisiones  
Cada  decisión  adicional  aumenta  el  esfuerzo  mental.  
Siempre  que  sea  posible,  la  plataforma  debe  reducir  el  número  de  elecciones  necesarias.  
Ejemplos:  
●  sugerir  automáticamente  la  siguiente  lección;  ●  destacar  actividades  prioritarias;  ●  recomendar  recursos  relevantes;  ●  ordenar  la  información  por  importancia.  
El  sistema  debe  ayudar  a  decidir,  no  trasladar  esa  responsabilidad  al  usuario.  
 
3.10  Gestión  de  expectativas

La  plataforma  debe  comunicar  de  forma  clara  qué  va  a  ocurrir  antes,  durante  y  después  de  
cada
 
acción.
 
El  usuario  debe  conocer:  
●  qué  está  haciendo;  ●  cuánto  tiempo  puede  requerir;  ●  cuándo  ha  finalizado;  ●  cuál  será  el  siguiente  paso.  
La  transparencia  reduce  la  incertidumbre  y  mejora  la  percepción  de  calidad.  
 
3.11  Adaptación  al  contexto  
El  comportamiento  de  la  interfaz  debe  variar  según  el  contexto  del  usuario.  
Por  ejemplo:  
●  un  estudiante  verá  recomendaciones  de  aprendizaje;  ●  un  profesor  visualizará  indicadores  académicos;  ●  un  administrador  accederá  a  herramientas  de  gestión.  
Aunque  el  contenido  cambie,  los  patrones  de  interacción  permanecerán  consistentes.  
 
3.12  Declaración  de  los  modelos  
mentales
 
Elevate  se  diseña  para  adaptarse  a  la  forma  natural  en  que  estudiantes,  
profesores
 
y
 
administradores
 
piensan
 
y
 
trabajan.
 
La
 
plataforma
 
reduce
 
la
 
necesidad
 
de
 
recordar
 
información,
 
minimiza
 
la
 
toma
 
de
 
decisiones
 
innecesarias
 
y
 
mantiene
 
el
 
contexto
 
de
 
forma
 
continua,
 
permitiendo
 
que
 
los
 
usuarios
 
se
 
concentren
 
en
 
sus
 
objetivos
 
y
 
no
 
en
 
el
 
funcionamiento
 
del
 
sistema.
 
  
Capítulo  4  —  Navigation  Patterns

4.1  Propósito  
Los  patrones  de  navegación  definen  cómo  los  usuarios  recorren  Elevate  y  cómo  la  
plataforma
 
organiza
 
el
 
acceso
 
a
 
la
 
información
 
y
 
a
 
las
 
funcionalidades.
 
Su  objetivo  es  que  cualquier  usuario  pueda  desplazarse  por  el  ecosistema  de  forma  
intuitiva,
 
manteniendo
 
siempre
 
el
 
contexto
 
y
 
minimizando
 
el
 
esfuerzo
 
necesario
 
para
 
completar
 
una
 
tarea.
 
La  navegación  debe  sentirse  consistente,  independientemente  del  módulo  o  del  dispositivo  
utilizado.
 
 
4.2  Principios  de  navegación  
Toda  la  navegación  de  Elevate  se  rige  por  los  siguientes  principios:  
●  Siempre  existe  un  siguiente  paso  claro.  ●  El  usuario  nunca  pierde  el  contexto.  ●  La  navegación  prioriza  las  tareas  frecuentes.  ●  Los  cambios  de  pantalla  son  previsibles.  ●  El  número  de  pasos  necesarios  se  mantiene  al  mínimo.  ●  La  estructura  permanece  estable  en  toda  la  plataforma.  
 
4.3  Arquitectura  de  navegación  
La  navegación  se  organiza  en  cuatro  niveles  jerárquicos.  
Nivel  1  —  Navegación  global  
Permite  acceder  a  los  principales  módulos  del  producto.  
Ejemplos:  
●  Inicio  ●  Mis  cursos  ●  Mi  progreso  ●  Calendario  ●  Actividades  ●  Comunidad  ●  Certificados

●  Perfil  
Este  nivel  permanece  estable  durante  toda  la  sesión.  
 
Nivel  2  —  Navegación  de  módulo  
Cada  módulo  dispone  de  una  navegación  específica  adaptada  a  su  contenido.  
Ejemplos:  
En  Curso :  
●  Información  general  ●  Unidades  ●  Recursos  ●  Evaluaciones  
En  Perfil :  
●  Datos  personales  ●  Preferencias  ●  Seguridad  ●  Notificaciones  
 
Nivel  3  —  Navegación  contextual  
Permite  acceder  a  elementos  relacionados  con  la  tarea  actual.  
Ejemplos:  
●  Cambiar  de  unidad.  ●  Abrir  una  actividad.  ●  Consultar  recursos  adicionales.  ●  Acceder  al  Tutor  IA.  ●  Revisar  resultados.  
 
Nivel  4  —  Acciones  
Corresponde  a  las  acciones  disponibles  sobre  un  elemento  concreto.  
Ejemplos:

●  Completar.  ●  Editar.  ●  Descargar.  ●  Compartir.  ●  Continuar.  
 
4.4  Regla  de  profundidad  
La  navegación  debe  evitar  estructuras  excesivamente  profundas.  
Como  principio  general:  
●  la  mayoría  de  tareas  deben  completarse  en  tres  niveles  de  navegación  o  menos;  ●  las  acciones  frecuentes  deben  estar  accesibles  desde  uno  o  dos  niveles.  
La  complejidad  estructural  nunca  debe  trasladarse  al  usuario.  
 
4.5  Breadcrumbs  
Cuando  el  usuario  acceda  a  niveles  profundos  de  la  plataforma,  Elevate  mostrará  una  ruta  
de
 
navegación
 
que
 
indique
 
claramente
 
su
 
ubicación.
 
Ejemplo:  
Mis  cursos     >  English  B1     >  Unit  3     >  Lesson  2  
Los  breadcrumbs  deben  ser  siempre  navegables  y  reflejar  la  jerarquía  real  del  contenido.  
 
4.6  Navegación  contextual  
Cada  pantalla  debe  facilitar  la  transición  natural  hacia  la  siguiente  acción.  
Ejemplos:

●  una  lección  conduce  a  la  siguiente  lección;  ●  una  evaluación  conduce  a  los  resultados;  ●  los  resultados  conducen  al  progreso;  ●  un  certificado  conduce  al  curso  completado.  
La  navegación  contextual  reduce  la  necesidad  de  volver  constantemente  al  menú  principal.  
 
4.7  Navegación  orientada  al  objetivo  
La  navegación  no  debe  centrarse  únicamente  en  la  estructura  del  producto,  sino  también  en  
los
 
objetivos
 
del
 
usuario.
 
Por  ejemplo,  desde  la  pantalla  de  Inicio  el  estudiante  debe  poder:  
●  continuar  aprendiendo;  ●  revisar  sus  objetivos;  ●  consultar  actividades  pendientes;  ●  acceder  al  calendario;  ●  resolver  una  duda  con  el  Tutor  IA.  
El  sistema  debe  acercar  al  usuario  a  su  objetivo  con  el  menor  número  posible  de  
interacciones.
 
 
4.8  Acciones  globales  
Existen  acciones  disponibles  desde  cualquier  punto  de  la  plataforma.  
Estas  acciones  forman  parte  de  la  navegación  global.  
Incluyen:  
●  búsqueda  global;  ●  notificaciones;  ●  Tutor  IA;  ●  ayuda;  ●  acceso  al  perfil.  
Su  ubicación  y  comportamiento  deberán  mantenerse  constantes  en  todos  los  módulos.

4.9  Regreso  y  continuidad  
Toda  pantalla  debe  permitir  regresar  fácilmente  al  contexto  anterior.  
La  navegación  nunca  debe  provocar  que  el  usuario  pierda:  
●  el  curso  activo;  ●  la  unidad  actual;  ●  la  lección  en  curso;  ●  los  filtros  aplicados;  ●  la  posición  dentro  de  una  lista.  
La  continuidad  constituye  un  requisito  de  experiencia.  
 
4.10  Gestión  de  estados  
La  navegación  debe  adaptarse  correctamente  a  diferentes  estados  del  sistema.  
Por  ejemplo:  
●  contenido  bloqueado;  ●  curso  completado;  ●  evaluación  pendiente;  ●  recurso  no  disponible;  ●  ausencia  de  resultados.  
En  todos  los  casos,  la  plataforma  debe  indicar  claramente  la  situación  y  ofrecer  una  acción  
alternativa
 
cuando
 
sea
 
posible.
 
 
4.11  Búsqueda  como  complemento  
La  búsqueda  global  complementa  la  navegación,  pero  no  la  sustituye.  
Los  usuarios  deben  poder  encontrar  contenido  mediante  exploración  o  mediante  búsqueda.  
Ambos  mecanismos  deben  conducir  a  la  misma  información  y  mantener  una  experiencia  
coherente.

4.12  Navegación  según  el  dispositivo  
La  estructura  funcional  de  la  navegación  permanece  constante  en  todos  los  dispositivos.  
Lo  que  cambia  es  su  presentación.  
Por  ejemplo:  
●  escritorio:  barra  lateral  permanente;  ●  tableta:  barra  lateral  colapsable;  ●  móvil:  navegación  inferior  y  menús  desplegables.  
La  adaptación  visual  no  debe  modificar  la  organización  conceptual  del  producto.  
 
4.13  Antipatrones  
Se  consideran  prácticas  no  permitidas  dentro  de  Elevate:  
●  ocultar  funciones  principales  en  múltiples  niveles  de  navegación;  ●  utilizar  nombres  diferentes  para  una  misma  funcionalidad;  ●  abrir  flujos  críticos  sin  contexto;  ●  crear  caminos  distintos  para  realizar  la  misma  tarea  sin  una  justificación  clara;  ●  modificar  la  navegación  principal  entre  módulos.  
 
4.14  Declaración  de  los  patrones  de  
navegación
 
La  navegación  de  Elevate  está  diseñada  para  que  los  usuarios  alcancen  
sus
 
objetivos
 
con
 
rapidez,
 
manteniendo
 
siempre
 
el
 
contexto
 
y
 
comprendiendo
 
en
 
todo
 
momento
 
dónde
 
se
 
encuentran
 
y
 
cuál
 
es
 
el
 
siguiente
 
paso.
 
La
 
estructura
 
del
 
producto
 
debe
 
permanecer
 
estable,
 
predecible
 
y
 
orientada
 
a
 
facilitar
 
el
 
aprendizaje,
 
no
 
a
 
incrementar
 
la
 
complejidad
 
de
 
la
 
interfaz.
 
  
Capítulo  5  —  Interaction  Patterns

5.1  Propósito  
Los  patrones  de  interacción  definen  cómo  responden  las  interfaces  de  Elevate  ante  las  
acciones
 
del
 
usuario.
 
Su  finalidad  es  garantizar  una  experiencia  consistente,  predecible  y  eficiente  en  toda  la  
plataforma,
 
independientemente
 
del
 
módulo
 
o
 
del
 
dispositivo
 
utilizado.
 
Toda  interacción  debe  reducir  la  carga  cognitiva,  facilitar  la  comprensión  del  sistema  y  
permitir
 
que
 
el
 
usuario
 
complete
 
sus
 
tareas
 
con
 
confianza.
 
 
5.2  Principios  de  interacción  
Toda  interacción  en  Elevate  deberá  cumplir  los  siguientes  principios:  
●  ser  comprensible  antes  de  ejecutarse;  ●  proporcionar  una  respuesta  inmediata;  ●  minimizar  el  riesgo  de  error;  ●  facilitar  la  recuperación  cuando  ocurra  un  error;  ●  mantener  un  comportamiento  consistente  en  toda  la  plataforma.  
 
5.3  Acciones  primarias  y  secundarias  
Cada  pantalla  debe  identificar  claramente  la  acción  principal.  
Acción  primaria  
Representa  la  tarea  más  importante  de  la  pantalla.  
Ejemplos:  
●  Continuar  curso.  ●  Comenzar  evaluación.  ●  Guardar  cambios.  ●  Enviar  actividad.  
Solo  debe  existir  una  acción  primaria  por  pantalla.

Acciones  secundarias  
Complementan  la  acción  principal  sin  competir  visualmente  con  ella.  
Ejemplos:  
●  Cancelar.  ●  Ver  detalles.  ●  Descargar.  ●  Compartir.  
Las  acciones  secundarias  deben  tener  menor  peso  visual.  
 
5.4  Botones  
Los  botones  representan  acciones  explícitas  del  usuario.  
Todos  los  botones  deberán  comunicar  claramente  su  propósito  mediante  un  verbo.  
Ejemplos  correctos:  
●  Continuar  ●  Guardar  ●  Enviar  ●  Comenzar  evaluación  ●  Descargar  certificado  
Ejemplos  incorrectos:  
●  Aceptar  ●  Sí  ●  Acción  ●  Ejecutar  
El  usuario  debe  comprender  el  resultado  esperado  antes  de  pulsar  el  botón.  
 
5.5  Formularios  
Los  formularios  deberán  minimizar  el  esfuerzo  necesario  para  introducir  información.

Principios:  
●  solicitar  únicamente  los  datos  necesarios;  ●  agrupar  campos  relacionados;  ●  mostrar  ejemplos  cuando  aporten  claridad;  ●  validar  la  información  de  forma  progresiva;  ●  conservar  los  datos  introducidos  ante  errores.  
El  usuario  nunca  debería  tener  que  repetir  información  por  un  fallo  evitable.  
 
5.6  Listas  
Las  listas  se  utilizarán  para  mostrar  conjuntos  de  elementos  homogéneos.  
Toda  lista  deberá  facilitar:  
●  búsqueda;  ●  filtrado;  ●  ordenación;  ●  paginación  cuando  sea  necesaria.  
Los  elementos  deberán  presentarse  con  una  jerarquía  visual  clara  y  permitir  identificar  
rápidamente
 
la
 
información
 
relevante.
 
 
5.7  Tarjetas  (Cards)  
Las  tarjetas  representan  entidades  independientes  del  producto.  
Ejemplos:  
●  curso;  ●  actividad;  ●  certificado;  ●  evento;  ●  publicación.  
Cada  tarjeta  deberá  responder  de  un  vistazo  a  tres  preguntas:  
●  ¿Qué  es?  ●  ¿Cuál  es  su  estado?  ●  ¿Qué  puedo  hacer  con  ello?  
Las  tarjetas  no  deben  contener  acciones  irrelevantes  ni  exceso  de  información.

5.8  Tablas  
Las  tablas  se  utilizarán  únicamente  cuando  sea  necesario  comparar  información  
estructurada.
 
Deberán  ofrecer:  
●  ordenación;  ●  filtrado;  ●  selección  múltiple  cuando  proceda;  ●  acciones  agrupadas.  
Las  tablas  estarán  orientadas  principalmente  a  profesorado  y  administración.  
 
5.9  Modales  
Los  diálogos  modales  interrumpen  el  flujo  principal  y,  por  tanto,  deberán  utilizarse  con  
moderación.
 
Solo  estarán  justificados  para:  
●  confirmar  acciones  críticas;  ●  mostrar  información  imprescindible;  ●  realizar  tareas  breves  sin  abandonar  el  contexto.  
No  deberán  emplearse  para  procesos  largos  o  complejos.  
 
5.10  Menús  
Los  menús  agrupan  acciones  relacionadas  con  un  mismo  elemento.  
Reglas:  
●  las  acciones  más  frecuentes  aparecen  primero;  ●  las  acciones  destructivas  se  separan  visualmente;  ●  los  nombres  deben  ser  descriptivos;  ●  no  se  duplicarán  acciones  visibles  en  la  pantalla  principal.

5.11  Estados  interactivos  
Todo  elemento  interactivo  deberá  comunicar  su  estado.  
Como  mínimo  se  contemplarán  los  siguientes  estados:  
●  reposo;  ●  foco;  ●  hover  (cuando  el  dispositivo  lo  permita);  ●  activo;  ●  cargando;  ●  deshabilitado;  ●  completado;  ●  error.  
El  comportamiento  deberá  ser  consistente  en  toda  la  plataforma.  
 
5.12  Acciones  destructivas  
Las  acciones  que  puedan  provocar  pérdida  de  información  deberán  cumplir  reglas  
específicas.
 
Ejemplos:  
●  eliminar;  ●  cancelar  definitivamente;  ●  restablecer  progreso;  ●  revocar  acceso.  
Estas  acciones  deberán:  
●  diferenciarse  visualmente;  ●  requerir  confirmación  cuando  el  impacto  sea  irreversible;  ●  explicar  claramente  las  consecuencias.  
 
5.13  Feedback  inmediato  
Toda  interacción  iniciada  por  el  usuario  debe  generar  una  respuesta  perceptible.  
El  sistema  debe  indicar:

●  que  la  acción  ha  sido  reconocida;  ●  que  se  está  procesando;  ●  si  ha  finalizado  correctamente;  ●  si  requiere  intervención  adicional.  
La  ausencia  de  feedback  se  considera  un  error  de  experiencia.  
 
5.14  Recuperación  ante  errores  
Cuando  una  interacción  falle,  la  plataforma  deberá  facilitar  la  recuperación.  
Siempre  que  sea  posible:  
●  explicar  el  problema  en  lenguaje  comprensible;  ●  indicar  cómo  resolverlo;  ●  conservar  la  información  introducida;  ●  ofrecer  una  acción  para  reintentar.  
Los  errores  nunca  deben  bloquear  innecesariamente  el  avance  del  usuario.  
 
5.15  Automatización  inteligente  
El  sistema  deberá  automatizar  tareas  repetitivas  siempre  que  no  reduzcan  el  control  del  
usuario.
 
Ejemplos:  
●  guardar  automáticamente  el  progreso;  ●  recordar  la  última  posición  de  lectura;  ●  completar  información  conocida;  ●  sugerir  acciones  habituales.  
La  automatización  debe  simplificar  la  experiencia  sin  generar  comportamientos  inesperados.  
 
5.16  Consistencia  entre  módulos  
Los  mismos  patrones  de  interacción  deberán  reutilizarse  en  toda  la  plataforma.

Un  botón,  formulario,  tarjeta  o  diálogo  debe  comportarse  de  la  misma  forma  
independientemente
 
del
 
módulo
 
en
 
el
 
que
 
aparezca.
 
La  consistencia  tiene  prioridad  sobre  la  personalización  de  cada  módulo.  
 
5.17  Declaración  de  los  patrones  de  
interacción
 
Las  interacciones  de  Elevate  deben  ser  claras,  consistentes  y  orientadas  a  
la
 
acción.
 
Cada
 
elemento
 
interactivo
 
existe
 
para
 
ayudar
 
al
 
usuario
 
a
 
completar
 
una
 
tarea
 
con
 
el
 
menor
 
esfuerzo
 
posible,
 
ofreciendo
 
siempre
 
feedback
 
inmediato,
 
reduciendo
 
la
 
posibilidad
 
de
 
error
 
y
 
manteniendo
 
una
 
experiencia
 
homogénea
 
en
 
todo
 
el
 
ecosistema.
 
  
Capítulo  6  —  Feedback  &  System  States  
 
6.1  Propósito  
El  comportamiento  del  sistema  es  una  parte  esencial  de  la  experiencia  de  usuario.  
Este  capítulo  define  cómo  debe  responder  Elevate  ante  cualquier  acción  del  usuario  y  cómo  
comunicar
 
el
 
estado
 
de
 
la
 
plataforma
 
durante
 
todo
 
el
 
recorrido
 
de
 
aprendizaje.
 
El  objetivo  es  eliminar  la  incertidumbre,  generar  confianza  y  mantener  al  usuario  informado  
en
 
todo
 
momento.
 
 
6.2  Principios  
Todo  feedback  del  sistema  deberá  cumplir  los  siguientes  principios:  
●  ser  inmediato;  ●  ser  comprensible;  ●  ser  contextual;

●  indicar  claramente  el  siguiente  paso  cuando  sea  necesario;  ●  mantener  una  comunicación  consistente  en  toda  la  plataforma.  
 
6.3  Estados  del  sistema  
Todos  los  módulos  deberán  contemplar  los  mismos  estados  funcionales.  
Estado  Objetivo  
Inicial  Presentar  el  contenido  disponible.  
Cargando  Informar  de  que  el  sistema  está  procesando  información.  
Disponible  Permitir  la  interacción  normal.  
Vacío  Comunicar  la  ausencia  de  contenido.  
Éxito  Confirmar  una  operación  completada  correctamente.  
Error  Informar  de  un  problema  e  indicar  cómo  continuar.  
Sin  conexión  Gestionar  la  pérdida  de  conectividad.  
Restringido  Comunicar  la  falta  de  permisos.  
La  consistencia  entre  estos  estados  es  obligatoria.  
 
6.4  Estado  de  carga  
Cuando  una  operación  requiera  tiempo  de  procesamiento,  el  sistema  deberá  comunicarlo  
inmediatamente.
 
Reglas:  
●  mostrar  indicadores  de  carga  desde  el  primer  momento;  ●  evitar  pantallas  completamente  vacías;  ●  mantener  visible  el  contexto  cuando  sea  posible;  ●  impedir  acciones  duplicadas  durante  el  procesamiento.  
El  usuario  debe  percibir  que  la  plataforma  continúa  funcionando.

6.5  Estado  vacío  
Los  estados  vacíos  representan  oportunidades  para  orientar  al  usuario.  
No  deben  limitarse  a  indicar  la  ausencia  de  información.  
Cada  estado  vacío  debe  incluir:  
●  explicación  breve;  ●  motivo  de  la  ausencia  de  contenido,  cuando  sea  relevante;  ●  acción  recomendada.  
Ejemplos:  
●  "Todavía  no  tienes  cursos  asignados."  ●  "Aún  no  has  obtenido  certificados."  ●  "No  hay  actividades  pendientes  para  hoy."  
 
6.6  Estado  de  éxito  
Toda  operación  importante  debe  confirmar  su  resultado.  
Ejemplos:  
●  actividad  enviada;  ●  evaluación  completada;  ●  cambios  guardados;  ●  perfil  actualizado;  ●  certificado  obtenido.  
El  mensaje  debe  ser  breve  y  centrarse  en  el  resultado  conseguido.  
Siempre  que  sea  posible,  debe  sugerir  el  siguiente  paso.  
 
6.7  Estado  de  error  
Los  errores  deben  ayudar  al  usuario  a  resolver  el  problema.  
Cada  mensaje  de  error  deberá  responder  a  tres  preguntas:  
●  ¿Qué  ha  ocurrido?  ●  ¿Por  qué  puede  haber  ocurrido?

●  ¿Qué  puedo  hacer  ahora?  
Siempre  que  sea  posible  se  evitarán  mensajes  técnicos  o  códigos  de  error  dirigidos  al  
usuario
 
final.
 
 
6.8  Estado  sin  conexión  
Cuando  no  exista  conexión  con  la  plataforma,  Elevate  deberá:  
●  informar  claramente  de  la  situación;  ●  mantener  disponible  la  información  ya  cargada  siempre  que  sea  posible;  ●  impedir  acciones  que  no  puedan  completarse;  ●  reintentar  automáticamente  las  operaciones  cuando  proceda.  
La  pérdida  temporal  de  conexión  no  debe  provocar  pérdida  de  información.  
 
6.9  Estado  restringido  
Cuando  el  usuario  no  tenga  permisos  suficientes  para  acceder  a  un  recurso,  el  sistema  
deberá:
 
●  explicar  que  el  acceso  está  restringido;  ●  evitar  mostrar  información  sensible;  ●  ofrecer  una  alternativa  cuando  exista.  
El  usuario  nunca  debe  interpretar  una  falta  de  permisos  como  un  fallo  del  sistema.  
 
6.10  Feedback  de  progreso  
Durante  procesos  compuestos  por  varias  etapas,  Elevate  deberá  comunicar  el  avance  de  
forma
 
continua.
 
Ejemplos:  
●  envío  de  una  actividad;  ●  carga  de  archivos;  ●  generación  de  un  certificado;  ●  importación  de  contenidos.

Siempre  que  sea  posible  se  mostrará:  
●  progreso  actual;  ●  etapa  en  curso;  ●  tiempo  estimado  cuando  resulte  útil.  
 
6.11  Confirmaciones  
Las  confirmaciones  solo  deberán  solicitarse  cuando  exista  riesgo  de  pérdida  de  información  
o
 
consecuencias
 
relevantes.
 
Requerirán  confirmación  acciones  como:  
●  eliminar  contenido;  ●  abandonar  una  evaluación  en  curso;  ●  cancelar  una  sesión;  ●  restablecer  progreso.  
Las  acciones  reversibles  no  deberían  requerir  confirmación  adicional.  
 
6.12  Recuperación  
La  experiencia  debe  facilitar  la  recuperación  ante  cualquier  incidencia.  
Siempre  que  sea  posible:  
●  conservar  el  trabajo  realizado;  ●  permitir  reintentar  la  operación;  ●  evitar  comenzar  el  proceso  desde  cero;  ●  proporcionar  alternativas.  
El  usuario  nunca  debería  sentirse  bloqueado  por  un  error  recuperable.  
 
6.13  Comunicación  del  sistema  
El  tono  de  comunicación  de  Elevate  debe  ser:  
●  claro;  ●  profesional;

●  directo;  ●  respetuoso;  ●  orientado  a  la  acción.  
Se  evitarán:  
●  mensajes  ambiguos;  ●  lenguaje  excesivamente  técnico;  ●  expresiones  alarmistas;  ●  información  innecesaria.  
El  sistema  debe  transmitir  confianza  en  todas  las  situaciones.  
 
6.14  Priorización  de  mensajes  
Cuando  existan  varios  mensajes  simultáneamente,  la  prioridad  será:  
1.  Errores  críticos.  2.  Advertencias  relevantes.  3.  Confirmaciones  de  éxito.  4.  Información  general.  5.  Consejos  y  recomendaciones.  
Esta  jerarquía  evita  la  saturación  visual  y  garantiza  que  la  información  importante  reciba  la  
atención
 
adecuada.
 
 
6.15  Declaración  sobre  el  
comportamiento
 
del
 
sistema
 
Elevate  mantiene  una  comunicación  constante  con  el  usuario  durante  
toda
 
la
 
experiencia.
 
Cada
 
estado
 
del
 
sistema
 
debe
 
aportar
 
contexto,
 
reducir
 
la
 
incertidumbre
 
y
 
facilitar
 
la
 
siguiente
 
acción.
 
El
 
feedback
 
no
 
constituye
 
un
 
elemento
 
accesorio
 
de
 
la
 
interfaz,
 
sino
 
un
 
componente
 
esencial
 
para
 
construir
 
una
 
experiencia
 
de
 
aprendizaje
 
clara,
 
fiable
 
y
 
orientada
 
al
 
progreso.
 
 
Capítulo  7  —  Accessibility

7.1  Propósito  
La  accesibilidad  garantiza  que  Elevate  pueda  ser  utilizado  por  el  mayor  número  posible  de  
personas,
 
independientemente
 
de
 
sus
 
capacidades,
 
del
 
dispositivo
 
empleado
 
o
 
del
 
contexto
 
de
 
uso.
 
En  Elevate,  la  accesibilidad  no  constituye  una  funcionalidad  adicional  ni  una  fase  posterior  
del
 
desarrollo.
 
Forma
 
parte
 
de
 
la
 
definición
 
del
 
producto
 
y
 
debe
 
integrarse
 
desde
 
el
 
diseño
 
inicial
 
de
 
cada
 
módulo.
 
Su  objetivo  es  eliminar  barreras  y  ofrecer  una  experiencia  de  aprendizaje  inclusiva  y  de  alta  
calidad.
 
 
7.2  Principios  
Toda  decisión  de  experiencia  deberá  cumplir  los  siguientes  principios.  
Perceptible  
La  información  debe  poder  percibirse  mediante  diferentes  formas  de  presentación.  
Operable  
Todas  las  funcionalidades  deben  poder  utilizarse  con  distintos  métodos  de  interacción.  
Comprensible  
La  interfaz  y  el  contenido  deben  resultar  fáciles  de  entender.  
Robusta  
La  experiencia  debe  mantenerse  funcional  en  diferentes  navegadores,  dispositivos  y  
tecnologías
 
de
 
asistencia.
 
Estos  principios  se  alinean  con  las  recomendaciones  internacionales  de  accesibilidad,  
especialmente
 
con
 
las
 
Web
 
Content
 
Accessibility
 
Guidelines
 
(WCAG)
.
 
 
7.3  Objetivo  de  conformidad

Elevate  adopta  como  objetivo  de  diseño  el  cumplimiento  de  WCAG  2.2  Nivel  AA  para  toda  
la
 
plataforma.
 
Este  nivel  constituye  el  estándar  de  referencia  para  productos  digitales  modernos  y  deberá  
aplicarse
 
tanto
 
a
 
nuevas
 
funcionalidades
 
como
 
a
 
la
 
evolución
 
de
 
las
 
existentes.
 
Cualquier  excepción  deberá  estar  documentada  y  justificada.  
 
7.4  Navegación  mediante  teclado  
Toda  funcionalidad  deberá  ser  accesible  utilizando  únicamente  el  teclado.  
Esto  implica  que  el  usuario  pueda:  
●  recorrer  todos  los  elementos  interactivos;  ●  identificar  claramente  el  foco  de  navegación;  ●  activar  acciones  sin  utilizar  un  dispositivo  apuntador;  ●  acceder  a  los  mismos  contenidos  que  mediante  interacción  táctil  o  con  ratón.  
La  navegación  mediante  teclado  deberá  seguir  un  orden  lógico  y  predecible.  
 
7.5  Contraste  y  legibilidad  
El  diseño  visual  deberá  garantizar  una  lectura  cómoda  en  diferentes  condiciones.  
Las  interfaces  deberán:  
●  mantener  un  contraste  suficiente  entre  texto  y  fondo;  ●  evitar  utilizar  únicamente  el  color  para  transmitir  información;  ●  emplear  tamaños  de  texto  adecuados;  ●  respetar  una  jerarquía  tipográfica  consistente.  
La  legibilidad  prevalece  sobre  las  decisiones  estéticas.  
 
7.6  Estructura  semántica  
Las  pantallas  deberán  construirse  siguiendo  una  estructura  lógica.  
Esto  incluye:

●  títulos  jerárquicos;  ●  regiones  claramente  identificadas;  ●  etiquetas  descriptivas;  ●  relaciones  coherentes  entre  los  elementos.  
Una  estructura  semántica  correcta  mejora  tanto  la  accesibilidad  como  la  comprensión  
general
 
de
 
la
 
interfaz.
 
 
7.7  Formularios  accesibles  
Todos  los  formularios  deberán  facilitar  su  uso  por  cualquier  persona.  
Como  mínimo  deberán:  
●  asociar  correctamente  cada  etiqueta  con  su  campo;  ●  indicar  qué  información  es  obligatoria;  ●  proporcionar  instrucciones  cuando  sean  necesarias;  ●  comunicar  los  errores  de  forma  clara;  ●  permitir  corregir  la  información  sin  perder  los  datos  introducidos.  
 
7.8  Contenido  multimedia  
Todo  recurso  multimedia  deberá  incorporar  alternativas  accesibles  cuando  proceda.  
Ejemplos:  
●  subtítulos  para  vídeos;  ●  transcripciones  para  contenidos  de  audio;  ●  descripciones  de  imágenes  cuando  aporten  información  relevante;  ●  controles  accesibles  para  la  reproducción.  
El  objetivo  es  garantizar  que  el  contenido  educativo  pueda  ser  aprovechado  por  todos  los  
estudiantes.
 
 
7.9  Interacción  táctil  
Los  elementos  interactivos  deberán  diseñarse  para  un  uso  cómodo  en  dispositivos  táctiles.  
Esto  implica:

●  áreas  de  pulsación  adecuadas;  ●  separación  suficiente  entre  controles;  ●  evitar  gestos  complejos  como  única  forma  de  interacción;  ●  proporcionar  alternativas  para  acciones  basadas  en  deslizamientos  o  movimientos.  
 
7.10  Mensajes  y  errores  
La  comunicación  del  sistema  deberá  ser  comprensible  para  todos  los  usuarios.  
Los  mensajes  deberán:  
●  utilizar  lenguaje  claro;  ●  evitar  tecnicismos  innecesarios;  ●  explicar  el  problema;  ●  indicar  cómo  resolverlo.  
Nunca  deberán  depender  exclusivamente  del  color  o  de  un  icono  para  transmitir  significado.  
 
7.11  Adaptabilidad  
La  experiencia  deberá  adaptarse  a  diferentes  configuraciones  del  usuario.  
Por  ejemplo:  
●  distintos  tamaños  de  pantalla;  ●  ampliación  del  texto;  ●  orientación  vertical  u  horizontal;  ●  preferencias  del  sistema  operativo  relacionadas  con  accesibilidad.  
La  interfaz  deberá  mantener  su  funcionalidad  sin  importar  estas  variaciones.  
 
7.12  Validación  de  accesibilidad  
Toda  nueva  funcionalidad  deberá  verificarse  antes  de  su  publicación.  
Como  mínimo  se  evaluará:  
●  navegación  mediante  teclado;  ●  orden  del  foco;

●  contraste  de  colores;  ●  jerarquía  semántica;  ●  compatibilidad  con  lectores  de  pantalla;  ●  comportamiento  en  diferentes  dispositivos.  
La  accesibilidad  forma  parte  del  proceso  de  aseguramiento  de  la  calidad  del  producto.  
 
7.13  Responsabilidad  compartida  
La  accesibilidad  no  depende  exclusivamente  del  equipo  de  diseño.  
Es  responsabilidad  conjunta  de:  
●  Product  Management;  ●  UX;  ●  UI  Design;  ●  Desarrollo  Frontend;  ●  Desarrollo  Backend  cuando  afecte  al  contenido  generado;  ●  Quality  Assurance.  
Todos  los  equipos  deberán  considerar  la  accesibilidad  durante  su  trabajo.  
 
7.14  Declaración  de  accesibilidad  
Elevate  considera  la  accesibilidad  un  requisito  fundamental  de  calidad.  La  
plataforma
 
debe
 
ofrecer
 
una
 
experiencia
 
inclusiva,
 
comprensible
 
y
 
utilizable
 
por
 
el
 
mayor
 
número
 
posible
 
de
 
personas,
 
eliminando
 
barreras
 
desde
 
el
 
diseño
 
inicial
 
y
 
garantizando
 
que
 
el
 
aprendizaje
 
esté
 
al
 
alcance
 
de
 
todos
 
los
 
usuarios.
 
  
Capítulo  8  —  Responsive  Experience  
 
8.1  Propósito

Elevate  debe  ofrecer  una  experiencia  consistente  en  cualquier  dispositivo,  permitiendo  que  
el
 
usuario
 
continúe
 
su
 
aprendizaje
 
sin
 
importar
 
desde
 
dónde
 
acceda
 
a
 
la
 
plataforma.
 
La  experiencia  responsive  no  consiste  únicamente  en  adaptar  el  diseño  a  distintos  tamaños  
de
 
pantalla,
 
sino
 
en
 
preservar
 
la
 
continuidad
 
del
 
aprendizaje,
 
la
 
claridad
 
de
 
la
 
información
 
y
 
la
 
eficiencia
 
de
 
la
 
interacción.
 
El  objetivo  es  que  la  plataforma  se  perciba  como  un  único  producto,  independientemente  del  
dispositivo
 
utilizado.
 
 
8.2  Principios  
Toda  experiencia  multidispositivo  deberá  respetar  los  siguientes  principios:  
●  continuidad  del  aprendizaje;  ●  consistencia  funcional;  ●  adaptación  sin  pérdida  de  capacidades;  ●  priorización  del  contenido;  ●  optimización  para  el  contexto  de  uso.  
 
8.3  Dispositivos  objetivo  
Elevate  está  diseñado  para  tres  categorías  principales.  
Dispositivo  
Contexto  principal  
Escritorio  Estudio  prolongado,  gestión  y  creación  de  contenido.  
Tableta  Aprendizaje  flexible  y  consumo  de  contenido.  
Móvil  Consultas  rápidas,  continuidad  y  actividades  de  corta  duración.  
Cada  dispositivo  mantiene  las  mismas  capacidades  funcionales,  adaptando  únicamente  la  
presentación
 
y
 
la
 
interacción
 
cuando
 
resulte
 
necesario.
 
 
8.4  Continuidad  entre  dispositivos

El  usuario  debe  poder  comenzar  una  tarea  en  un  dispositivo  y  continuarla  posteriormente  en  
otro
 
sin
 
perder
 
información.
 
La  plataforma  deberá  sincronizar  automáticamente:  
●  progreso;  ●  curso  activo;  ●  última  lección  visitada;  ●  actividades  en  curso;  ●  evaluaciones  guardadas  cuando  proceda;  ●  preferencias  del  usuario.  
La  continuidad  constituye  uno  de  los  principios  fundamentales  de  la  experiencia  de  Elevate.  
 
8.5  Adaptación  del  contenido  
El  contenido  debe  reorganizarse  según  el  espacio  disponible,  manteniendo  siempre  la  
misma
 
jerarquía
 
de
 
información.
 
Las  adaptaciones  podrán  afectar  a:  
●  distribución;  ●  tamaño  de  los  bloques;  ●  posición  de  la  navegación;  ●  densidad  de  información.  
No  deberán  alterar  el  significado  ni  la  organización  conceptual  de  la  plataforma.  
 
8.6  Experiencia  en  escritorio  
El  escritorio  constituye  el  entorno  de  referencia  para  las  tareas  de  mayor  complejidad.  
Se  priorizan:  
●  navegación  permanente;  ●  visión  global  del  progreso;  ●  trabajo  con  múltiples  paneles;  ●  gestión  administrativa;  ●  edición  de  contenidos;  ●  análisis  de  información.  
El  espacio  disponible  permite  mostrar  mayor  cantidad  de  información  simultáneamente.

8.7  Experiencia  en  tableta  
La  tableta  combina  movilidad  y  superficie  de  trabajo.  
La  experiencia  deberá  favorecer:  
●  lectura  cómoda;  ●  visualización  de  recursos  educativos;  ●  realización  de  actividades;  ●  participación  en  sesiones;  ●  navegación  táctil.  
La  organización  visual  deberá  adaptarse  al  uso  tanto  en  orientación  vertical  como  
horizontal.
 
 
8.8  Experiencia  en  móvil  
El  móvil  está  orientado  a  mantener  la  continuidad  del  aprendizaje.  
La  interfaz  priorizará:  
●  continuar  donde  lo  dejó;  ●  completar  actividades  breves;  ●  consultar  el  progreso;  ●  acceder  al  calendario;  ●  responder  notificaciones;  ●  utilizar  el  Tutor  IA.  
La  navegación  deberá  minimizar  el  número  de  interacciones  necesarias  para  acceder  a  las  
acciones
 
principales.
 
 
8.9  Jerarquía  adaptativa  
La  importancia  del  contenido  permanece  constante,  aunque  cambie  su  presentación.  
La  prioridad  será  siempre:  
1.  Acción  principal.  2.  Información  necesaria  para  completarla.

3.  Información  complementaria.  4.  Acciones  secundarias.  
En  pantallas  pequeñas  se  reducirá  la  densidad  de  información  antes  de  eliminar  
funcionalidades.
 
 
8.10  Comportamiento  de  la  navegación  
La  navegación  mantiene  la  misma  estructura  conceptual  en  todos  los  dispositivos.  
Únicamente  cambia  su  representación.  
Dispositivo  
Navegación  recomendada  
Escritorio  Barra  lateral  permanente.  
Tableta  Barra  lateral  colapsable.  
Móvil  Navegación  inferior  y  menú  desplegable.  
El  usuario  debe  reconocer  inmediatamente  la  organización  del  producto,  
independientemente
 
del
 
dispositivo.
 
 
8.11  Interacciones  adaptativas  
La  interacción  deberá  adaptarse  al  método  de  entrada  disponible.  
Ejemplos:  
●  ratón  y  teclado  en  escritorio;  ●  interacción  táctil  en  tableta  y  móvil;  ●  teclado  virtual  en  formularios;  ●  gestos  sencillos  cuando  aporten  valor.  
Nunca  deberá  existir  una  funcionalidad  accesible  únicamente  mediante  un  tipo  específico  de  
interacción.

8.12  Rendimiento  percibido  
La  experiencia  responsive  también  implica  mantener  una  sensación  de  fluidez.  
Las  interfaces  deberán:  
●  cargar  progresivamente;  ●  priorizar  el  contenido  visible;  ●  reducir  esperas  innecesarias;  ●  mantener  la  respuesta  inmediata  de  la  interfaz.  
La  percepción  de  rendimiento  forma  parte  de  la  calidad  de  la  experiencia.  
 
8.13  Casos  de  uso  prioritarios  
Cada  dispositivo  responde  a  necesidades  diferentes.  
Escritorio  
●  Estudiar  durante  sesiones  largas.  ●  Gestionar  cursos.  ●  Administrar  la  plataforma.  ●  Analizar  el  progreso.  
Tableta  
●  Consumir  contenido  multimedia.  ●  Realizar  actividades.  ●  Participar  en  clases  en  directo.  
Móvil  
●  Continuar  una  lección.  ●  Revisar  objetivos.  ●  Consultar  el  calendario.  ●  Responder  a  notificaciones.  ●  Resolver  dudas  rápidas  con  el  Tutor  IA.  
Estas  prioridades  orientarán  las  decisiones  de  diseño  sin  limitar  las  capacidades  del  
producto.

8.14  Declaración  de  la  experiencia  
responsive
 
Elevate  ofrece  una  experiencia  continua  e  independiente  del  dispositivo.  
La
 
plataforma
 
adapta
 
la
 
presentación
 
y
 
la
 
interacción
 
a
 
cada
 
contexto
 
de
 
uso,
 
preservando
 
siempre
 
la
 
estructura
 
funcional,
 
la
 
claridad
 
del
 
contenido
 
y
 
la
 
continuidad
 
del
 
aprendizaje.
 
El
 
usuario
 
debe
 
percibir
 
un
 
único
 
producto,
 
capaz
 
de
 
acompañarle
 
allí
 
donde
 
decida
 
aprender.
 
 
Capítulo  9  —  Motion  &  Microinteractions  
 
9.1  Propósito  
Las  animaciones  y  microinteracciones  mejoran  la  comprensión  de  la  interfaz  al  proporcionar  
continuidad
 
visual,
 
comunicar
 
cambios
 
de
 
estado
 
y
 
reforzar
 
la
 
percepción
 
de
 
calidad
 
del
 
producto.
 
En  Elevate,  el  movimiento  no  tiene  una  finalidad  estética.  Su  función  es  ayudar  al  usuario  a  
comprender
 
qué
 
está
 
ocurriendo
 
y
 
facilitar
 
la
 
interacción
 
sin
 
distraer
 
del
 
aprendizaje.
 
Toda  animación  debe  aportar  un  beneficio  funcional.  
 
9.2  Principios  
El  uso  del  movimiento  en  Elevate  se  basa  en  cinco  principios.  
Funcional  
Toda  animación  debe  comunicar  algo  útil.  
Discreta  
El  movimiento  nunca  debe  competir  con  el  contenido  educativo.  
Consistente

Las  mismas  acciones  producen  las  mismas  animaciones.  
Rápida  
Las  transiciones  deben  sentirse  fluidas  y  no  ralentizar  la  interacción.  
Accesible  
Las  personas  sensibles  al  movimiento  deben  poder  utilizar  la  plataforma  sin  dificultades.  
 
9.3  Objetivos  del  movimiento  
Las  animaciones  pueden  utilizarse  para:  
●  indicar  cambios  de  estado;  ●  reforzar  relaciones  entre  elementos;  ●  mantener  el  contexto  durante  la  navegación;  ●  confirmar  acciones;  ●  dirigir  la  atención  hacia  información  relevante;  ●  mejorar  la  percepción  de  fluidez.  
No  deberán  utilizarse  únicamente  con  fines  decorativos.  
 
9.4  Transiciones  entre  pantallas  
El  cambio  entre  vistas  debe  transmitir  continuidad.  
Las  transiciones  deben:  
●  mantener  el  contexto;  ●  evitar  cambios  bruscos;  ●  proporcionar  sensación  de  estabilidad;  ●  ser  prácticamente  imperceptibles  para  el  usuario.  
La  navegación  nunca  debe  sentirse  interrumpida.  
 
9.5  Microinteracciones

Las  microinteracciones  comunican  que  una  acción  ha  sido  reconocida  por  el  sistema.  
Ejemplos:  
●  pulsar  un  botón;  ●  completar  una  lección;  ●  marcar  una  actividad  como  realizada;  ●  guardar  cambios;  ●  desbloquear  un  logro;  ●  finalizar  una  evaluación.  
Estas  respuestas  deben  ser  inmediatas  y  coherentes  con  el  resultado  de  la  acción.  
 
9.6  Animaciones  de  feedback  
Las  animaciones  pueden  reforzar  diferentes  estados  del  sistema.  
Cargando  
Transmiten  que  el  sistema  está  procesando  información.  
Éxito  
Confirman  visualmente  que  una  acción  se  ha  completado.  
Error  
Llaman  la  atención  sobre  un  problema  sin  resultar  agresivas.  
Advertencia  
Destacan  situaciones  que  requieren  la  atención  del  usuario.  
La  prioridad  siempre  será  la  claridad  del  mensaje.  
 
9.7  Movimiento  del  contenido  
Cuando  el  contenido  aparezca,  desaparezca  o  cambie  de  posición,  el  movimiento  debe  
ayudar
 
al
 
usuario
 
a
 
comprender
 
la
 
transición.
 
Ejemplos:

●  expansión  de  un  acordeón;  ●  apertura  de  un  panel  lateral;  ●  aparición  de  un  diálogo;  ●  reordenación  de  elementos;  ●  actualización  de  una  lista.  
Las  transiciones  deben  preservar  la  relación  espacial  entre  los  elementos.  
 
9.8  Indicadores  de  progreso  
El  progreso  puede  reforzarse  mediante  animaciones  sutiles.  
Ejemplos:  
●  actualización  de  una  barra  de  progreso;  ●  incremento  de  un  porcentaje;  ●  desbloqueo  de  una  unidad;  ●  obtención  de  un  certificado;  ●  consecución  de  un  objetivo  semanal.  
Estas  animaciones  deben  enfatizar  el  avance  del  estudiante  sin  convertir  la  experiencia  en  
un
 
sistema
 
de
 
recompensas
 
excesivo.
 
 
9.9  Movimiento  y  accesibilidad  
Elevate  respetará  las  preferencias  de  accesibilidad  del  sistema  operativo.  
Cuando  el  usuario  solicite  reducir  animaciones:  
●  se  eliminarán  movimientos  no  esenciales;  ●  se  sustituirán  por  cambios  de  estado  inmediatos;  ●  se  mantendrá  toda  la  funcionalidad.  
La  comprensión  de  la  interfaz  nunca  dependerá  exclusivamente  de  una  animación.  
 
9.10  Patrones  permitidos  
Se  consideran  apropiados:

●  transiciones  suaves  entre  pantallas;  ●  cambios  de  estado  de  botones;  ●  apertura  y  cierre  de  paneles;  ●  indicadores  de  carga;  ●  confirmaciones  visuales;  ●  animaciones  de  progreso;  ●  aparición  gradual  de  contenido.  
Todos  estos  patrones  deberán  reutilizarse  de  forma  consistente.  
 
9.11  Patrones  no  permitidos  
No  forman  parte  del  lenguaje  de  interacción  de  Elevate:  
●  animaciones  largas;  ●  movimientos  continuos  sin  propósito;  ●  efectos  parallax  excesivos;  ●  rebotes  exagerados;  ●  elementos  parpadeantes;  ●  animaciones  que  retrasen  el  acceso  al  contenido;  ●  efectos  que  puedan  distraer  durante  el  estudio.  
El  aprendizaje  siempre  tiene  prioridad  sobre  el  impacto  visual.  
 
9.12  Percepción  de  calidad  
Las  microinteracciones  contribuyen  a  transmitir  sensación  de  producto  cuidado.  
Cuando  se  utilizan  correctamente:  
●  aumentan  la  confianza;  ●  reducen  la  incertidumbre;  ●  mejoran  la  comprensión  de  la  interfaz;  ●  refuerzan  la  continuidad  del  aprendizaje.  
El  movimiento  debe  percibirse  como  una  ayuda,  no  como  un  elemento  protagonista.  
 
9.13  Validación

Toda  nueva  animación  deberá  responder  afirmativamente  a  las  siguientes  preguntas:  
●  ¿Comunica  un  cambio  de  estado?  ●  ¿Facilita  la  comprensión?  ●  ¿Reduce  la  incertidumbre?  ●  ¿Respeta  las  preferencias  de  accesibilidad?  ●  ¿Es  consistente  con  el  resto  del  producto?  
Si  la  respuesta  es  negativa  a  cualquiera  de  estas  cuestiones,  la  animación  deberá  
replantearse.
 
 
9.14  Declaración  sobre  movimiento  e  
interacción
 
En  Elevate,  el  movimiento  constituye  una  herramienta  de  comunicación.  
Las
 
animaciones
 
y
 
microinteracciones
 
existen
 
para
 
reforzar
 
la
 
comprensión
 
de
 
la
 
interfaz,
 
aportar
 
continuidad
 
y
 
mejorar
 
la
 
percepción
 
de
 
calidad
 
del
 
producto.
 
Su
 
uso
 
debe
 
ser
 
siempre
 
funcional,
 
discreto
 
y
 
coherente
 
con
 
el
 
objetivo
 
principal
 
de
 
la
 
plataforma:
 
facilitar
 
el
 
aprendizaje.
 
  
Capítulo  10  —  UX  Rules  
 
10.1  Propósito  
Las  UX  Rules  constituyen  el  conjunto  de  normas  que  deben  respetarse  en  el  diseño  y  
evolución
 
de
 
todas
 
las
 
experiencias
 
de
 
usuario
 
de
 
Elevate.
 
Su  finalidad  es  garantizar  que  el  producto  mantenga  una  experiencia  coherente,  predecible  
y
 
centrada
 
en
 
el
 
aprendizaje,
 
independientemente
 
del
 
equipo
 
que
 
diseñe
 
o
 
implemente
 
una
 
funcionalidad.
 
Estas  reglas  son  de  aplicación  obligatoria  para  cualquier  nueva  pantalla,  flujo,  componente  
o
 
interacción.

10.2  Principios  de  gobernanza  UX  
Toda  decisión  de  experiencia  deberá  alinearse  con  los  principios  establecidos  en  el  Product  
Vision
,
 
el
 
Product
 
Architecture
 
y
 
este
 
UX
 
Playbook
.
 
Ninguna  mejora  de  UX  podrá  contradecir  las  decisiones  estratégicas  definidas  en  los  
volúmenes
 
anteriores.
 
La  experiencia  de  usuario  debe  evolucionar  preservando  la  identidad  del  producto.  
 
10.3  Reglas  generales  
Toda  interfaz  desarrollada  para  Elevate  deberá  cumplir  las  siguientes  reglas.  
●  Resolver  una  necesidad  concreta  del  usuario.  ●  Priorizar  la  claridad  sobre  la  complejidad.  ●  Mantener  la  consistencia  con  el  resto  del  producto.  ●  Reducir  la  carga  cognitiva.  ●  Guiar  al  usuario  hacia  su  siguiente  objetivo.  ●  Comunicar  claramente  el  estado  del  sistema.  
Estas  reglas  prevalecen  sobre  cualquier  preferencia  estética.  
 
10.4  Reglas  de  navegación  
La  navegación  deberá  cumplir  siempre  los  siguientes  criterios:  
●  el  usuario  sabe  dónde  está;  ●  el  usuario  sabe  cómo  regresar;  ●  el  usuario  identifica  fácilmente  la  acción  principal;  ●  el  recorrido  hacia  el  objetivo  resulta  evidente;  ●  la  estructura  permanece  estable  entre  módulos.  
La  navegación  nunca  deberá  convertirse  en  un  obstáculo  para  el  aprendizaje.  
 
10.5  Reglas  de  interacción  
Todas  las  interacciones  deberán:

●  responder  inmediatamente;  ●  comunicar  el  resultado  obtenido;  ●  permitir  recuperar  errores  cuando  sea  posible;  ●  evitar  acciones  ambiguas;  ●  mantener  un  comportamiento  uniforme.  
El  usuario  nunca  debería  preguntarse  si  una  acción  ha  sido  ejecutada  correctamente.  
 
10.6  Reglas  de  contenido  
Todo  contenido  presentado  en  la  interfaz  deberá  ser:  
●  relevante  para  la  tarea  actual;  ●  comprensible  sin  conocimientos  técnicos;  ●  organizado  mediante  una  jerarquía  clara;  ●  consistente  con  la  terminología  oficial  del  producto.  
La  plataforma  debe  comunicar  con  precisión  y  evitar  información  innecesaria.  
 
10.7  Reglas  de  consistencia  
Los  siguientes  elementos  deberán  reutilizarse  en  toda  la  plataforma:  
●  patrones  de  navegación;  ●  componentes;  ●  iconografía;  ●  terminología;  ●  mensajes;  ●  estados;  ●  comportamientos.  
La  consistencia  constituye  uno  de  los  principales  factores  de  calidad  percibida.  
 
10.8  Reglas  de  accesibilidad  
Toda  nueva  funcionalidad  deberá:  
●  cumplir  los  requisitos  de  accesibilidad  definidos  en  este  Blueprint;

●  respetar  la  navegación  mediante  teclado;  ●  mantener  un  contraste  adecuado;  ●  proporcionar  información  mediante  más  de  un  canal  visual;  ●  funcionar  correctamente  con  tecnologías  de  asistencia.  
La  accesibilidad  no  podrá  posponerse  para  fases  posteriores.  
 
10.9  Reglas  de  evolución  
Antes  de  aprobar  una  nueva  funcionalidad  será  obligatorio  responder  afirmativamente  a  las  
siguientes
 
preguntas:
 
●  ¿Resuelve  un  problema  real?  ●  ¿Respeta  la  visión  del  producto?  ●  ¿Mantiene  la  coherencia  arquitectónica?  ●  ¿Reduce  o  mantiene  la  carga  cognitiva?  ●  ¿Mejora  la  experiencia  de  aprendizaje?  ●  ¿Puede  integrarse  sin  romper  patrones  existentes?  
Si  alguna  respuesta  es  negativa,  la  propuesta  deberá  revisarse.  
 
10.10  Validación  UX  
Toda  nueva  funcionalidad  deberá  superar  una  revisión  de  experiencia  de  usuario  antes  de  
considerarse
 
finalizada.
 
Como  mínimo  se  verificará:  
●  claridad  del  flujo;  ●  consistencia  con  el  producto;  ●  accesibilidad;  ●  comportamiento  responsive;  ●  gestión  de  estados;  ●  calidad  del  feedback;  ●  continuidad  del  aprendizaje.  
La  validación  UX  forma  parte  del  proceso  de  calidad  del  producto.

10.11  Lista  de  comprobación  
Antes  de  aprobar  cualquier  pantalla  o  flujo,  deberá  comprobarse  que:  
●  el  objetivo  principal  es  evidente;  ●  existe  una  única  acción  principal;  ●  el  contenido  está  correctamente  jerarquizado;  ●  los  estados  del  sistema  están  contemplados;  ●  la  navegación  mantiene  el  contexto;  ●  los  mensajes  son  claros;  ●  la  interacción  es  consistente;  ●  la  accesibilidad  está  garantizada;  ●  la  experiencia  funciona  correctamente  en  todos  los  dispositivos  previstos.  
Esta  lista  constituye  el  criterio  mínimo  de  aceptación  desde  la  perspectiva  UX.  
 
10.12  Gestión  de  cambios  
Las  modificaciones  de  experiencia  deberán  documentarse  antes  de  su  implementación.  
Cada  cambio  deberá  indicar:  
●  problema  identificado;  ●  propuesta  de  mejora;  ●  módulos  afectados;  ●  impacto  esperado;  ●  criterios  de  validación;  ●  relación  con  el  Product  Blueprint.  
La  documentación  garantiza  la  trazabilidad  de  las  decisiones  de  diseño.  
 
10.13  Gobernanza  UX  
El  UX  Playbook  es  la  referencia  oficial  para  todas  las  decisiones  relacionadas  con  la  
experiencia
 
de
 
usuario
 
de
 
Elevate.
 
Ningún  patrón,  interacción  o  flujo  deberá  incorporarse  al  producto  sin  respetar  las  normas  
definidas
 
en
 
este
 
volumen.
 
Las  futuras  versiones  del  producto  ampliarán  este  documento,  manteniendo  la  
compatibilidad
 
con
 
los
 
principios
 
establecidos
 
en
 
la
 
versión
 
1.0.

10.14  Declaración  final  
La  experiencia  de  usuario  de  Elevate  es  un  activo  estratégico  del  
producto.
 
Cada
 
decisión
 
de
 
diseño
 
debe
 
contribuir
 
a
 
una
 
plataforma
 
más
 
clara,
 
consistente
 
y
 
orientada
 
al
 
aprendizaje.
 
El
 
UX
 
Playbook
 
establece
 
el
 
marco
 
de
 
referencia
 
que
 
garantiza
 
que
 
la
 
evolución
 
del
 
producto
 
preserve
 
una
 
experiencia
 
coherente,
 
accesible
 
y
 
de
 
alta
 
calidad
 
para
 
todos
 
los
 
usuarios.
