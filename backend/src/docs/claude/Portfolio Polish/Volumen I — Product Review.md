# Portfolio Polish — Volumen I: Product Review

**Fase**: Portfolio Polish
**Documento**: Volumen I de la fase (primer documento oficial) — revisado y corregido tras autorrevisión crítica (ver [Adenda](#adenda--revisión-crítica-del-volumen-i))
**Alcance**: Frontend (Next.js App Router), calidad percibida de producto — 15 páginas bajo `frontend/src/app/(protected)/` **más la pantalla pública de login** (`app/(auth)/login`), incorporada tras detectar en la autorrevisión que el alcance inicial excluía el primer punto de contacto real con el producto.
**Método**: Lectura directa del código fuente. Ningún hallazgo se basa en memoria de conversaciones previas ni en suposiciones; cada afirmación cita archivo y, cuando aplica, línea.
**Fuera de alcance**: Propuestas de solución, priorización de trabajo, roadmap, diseño de componentes nuevos o cambios de código. Este documento es exclusivamente diagnóstico.
**Relación con otros documentos**: Esta revisión no repite los hallazgos de `Role Experience Polish — Volumen I` (navegación, roles, permisos, enlaces rotos). Se centra exclusivamente en **pulido visual y percepción de producto**: qué distingue una pantalla que parece un SaaS cuidado (referencia: Linear, Notion, Vercel Dashboard, según `DESIGN_SYSTEM.md` §1) de una que parece una herramienta CRUD interna.

---

## Índice

1. [Objetivo de la revisión](#1-objetivo-de-la-revisión)
2. [Metodología empleada](#2-metodología-empleada)
3. [Estado general del producto](#3-estado-general-del-producto)
4. [Hallazgos clasificados por prioridad](#4-hallazgos-clasificados-por-prioridad)
   - 4.1 [P1 — Alto impacto en percepción de portfolio](#41-p1--alto-impacto-en-percepción-de-portfolio)
   - 4.2 [P2 — Impacto moderado](#42-p2--impacto-moderado)
   - 4.3 [P3 — Impacto menor / cosmético](#43-p3--impacto-menor--cosmético)
5. [Pantallas con nivel portfolio](#5-pantallas-con-nivel-portfolio)
6. [Pantallas que transmiten sensación de CRUD o herramienta interna](#6-pantallas-que-transmiten-sensación-de-crud-o-herramienta-interna)
7. [Incoherencias visuales detectadas](#7-incoherencias-visuales-detectadas)
8. [Deuda de frontend pendiente](#8-deuda-de-frontend-pendiente)
9. [Conclusión de la revisión](#9-conclusión-de-la-revisión)
10. [Adenda — Revisión crítica del Volumen I](#adenda--revisión-crítica-del-volumen-i)

---

## 1. Objetivo de la revisión

Evaluar el estado actual del frontend de "Elevate Your English | Campus" desde un único criterio: **la calidad percibida de producto** que transmite cada pantalla a un observador externo (entrevistador técnico, reclutador, visitante de portfolio). No se evalúa aquí si una pantalla funciona correctamente — eso ya está cubierto por la suite de tests y por `Role Experience Polish` — sino si su presentación visual, su copy y su nivel de detalle la hacen parecer parte de un producto SaaS terminado o, por el contrario, una interfaz de administración interna sin pulir.

## 2. Metodología empleada

Se ha inspeccionado directamente el código fuente de las 15 páginas activas bajo `frontend/src/app/(protected)/`, sus componentes de dominio asociados (dashboards por rol, componentes de `teacher-analytics`, `courses`, etc.) y sus hojas de estilo, colocadas o importadas desde `frontend/src/styles/`. Para cada pantalla se ha evaluado, con evidencia citada archivo:línea:

- Microcopy y tono (genérico/técnico vs. cuidado/contextual).
- Estados de carga, error y vacío (texto plano vs. componentes `LoadingState`/`ErrorState`/`EmptyState` con contexto).
- Densidad visual y jerarquía (cards y agrupación vs. tablas crudas).
- Presencia de señales de producto: badges semánticos, iconografía, barras de progreso, gráficos, estados de interacción pulidos.
- Presencia de señales de herramienta interna: tablas sin estilizar, datos técnicos expuestos (IDs), acciones sin confirmación ni feedback visual, idioma mixto.
- Responsive (media queries, `overflow-x` en tablas).
- Incoherencias visuales dentro de la misma pantalla o entre pantallas del mismo flujo.

El criterio de referencia visual es `frontend/DESIGN_SYSTEM.md` v2.0, en particular su filosofía visual (§1: "Claridad sobre creatividad", "Confianza profesional") y su tabla de prácticas no permitidas (§7). No se ha ejecutado la aplicación en navegador ni se han tomado capturas; todos los hallazgos son estáticos, derivados de lectura de código, con una verificación puntual por grep de las citas más relevantes.

## 3. Estado general del producto

El frontend tiene una **frontera de calidad claramente marcada por antigüedad de implementación, no por rol ni por complejidad funcional**. Las pantallas construidas más recientemente en clave de estudiante (`courses/[id]`, `progress`, `assessments`, `certificates`, lección, evaluación) alcanzan un nivel de acabado consistente con un producto SaaS cuidado: microcopy contextual, estados vacíos con mensaje motivacional, badges semánticos, animaciones de estado (skeleton, loading en botones) y jerarquía visual clara mediante `Card`, `PageHeader`, `ProgressBar`.

Frente a esto, un segundo grupo de pantallas —`users`, `enrollments`, `teacher-analytics`, y en menor medida `achievements`/`notifications`/`skill-radar`— conserva un patrón de implementación anterior: importan sus hojas de estilo desde el alias global `@/styles/*.module.css` en vez de colocarlas junto a la página, usan tablas HTML con poco o ningún tratamiento visual, y en el caso de `teacher-analytics` carecen por completo de estilo propio en sus componentes de tabla.

Esta división no es sutil: **coincide casi exactamente con el patrón de import de CSS** (colocado junto a la página vs. importado desde `@/styles`), lo que sugiere que es un artefacto de en qué momento de la evolución del proyecto se construyó cada pantalla, no una decisión de diseño deliberada por tipo de pantalla.

Un hallazgo transversal adicional afecta a la coherencia de tono: **la aplicación mezcla español e inglés de forma inconsistente** en las pantallas administrativas (`users`, `enrollments`), con botones de acción ("Activate", "Deactivate", "Suspend") y valores de estado sin traducir, mientras el resto de la interfaz está enteramente en español con textos cuidados.

## 4. Hallazgos clasificados por prioridad

### 4.1 P1 — Alto impacto en percepción de portfolio

| # | Hallazgo | Ubicación | Evidencia |
|---|---|---|---|
| PR0 | **Pantalla de login con mezcla de idioma severa y tono desalineado** — copy de marca íntegramente en inglés ("Open your next opportunity.", "Learn with purpose. Grow with confidence.", "Sign in to continue your journey.") con placeholder de tono B2B genérico ("tu@empresa.com"), frente a labels/botón/errores en español. Footer con copyright desactualizado ("© 2025") | `LoginForm/index.js:48-49,56,69,97,108` | Es el primer y único punto de contacto garantizado con el 100% de los visitantes, antes que cualquier otra pantalla — no requiere navegación para ser visto |
| PR1 | `teacher-analytics` — los 4 componentes de tabla de dominio no tienen ningún estilo propio (dependen de herencia CSS por descendencia desde la página padre) y sus estados vacíos son texto plano `<p>` sin `EmptyState`, pese a que la página sí importa `LoadingState`/`ErrorState` | `CohortComparisonTable/index.js` (sin `styles`, estado vacío en línea 7), `InactivityRanking/index.js` (línea 9), `AssessmentBreakdownTable/index.js` (línea 5), `StudentWeeklyTrendPanel/index.js` (línea 5); `TeacherAnalytics.module.css:39-70`; `page.js:12-13` (sin import de `EmptyState`) | Sin badges, sin iconos, sin color-coding — mayor gap entre volumen de datos y presentación de producto de todo el frontend |
| PR3 | Mezcla de idioma español/inglés en pantallas administrativas: acciones y valores de estado sin traducir | `users/page.js:74,86,96` (`'active'`/`'inactive'`, `'Activate'`/`'Deactivate'`); `enrollments/page.js:106,119,129` (`e.status` crudo, `'Activate'`/`'Suspend'`) | Verificado por grep directo; mismo patrón que PR0 pero en rutas de menor tráfico (solo visible si se navega como admin) |
| PR7 | `achievements` — pantalla de gamificación sin ningún tratamiento visual gamificado: `rarity` se muestra como badge gris genérico sin color por rareza, sin animación de desbloqueo, sin agrupación por categoría | `AchievementCard/index.js:16`; `Achievements.module.css:56-62` | Ruta de un clic desde el sidebar de estudiante; el nombre de la pantalla promete algo que la presentación no entrega en absoluto — desajuste directo entre expectativa y ejecución |
| PR10 | `skill-radar` — el único gráfico de datos real del producto (Recharts) no define color propio (`stroke`/`fill`): usa el azul violeta por defecto de la librería, desconectado de los tokens de marca; además tiene la animación de entrada desactivada explícitamente | `SkillRadarChart/index.js:31` (`isAnimationActive={false}`, sin `stroke`/`fill`) | Único elemento de data-visualization del frontend; es el momento con mayor potencial de "wow" visual y el que menos identidad de marca lleva |

*Reclasificados a P2 en la autorrevisión (ver [Adenda](#adenda--revisión-crítica-del-volumen-i)): CSS legacy en página de unidad de curso, IDs de MongoDB expuestos en `enrollments`, acciones sin confirmación/loading consistente en `users`/`enrollments` — ver PR4, PR5, PR6 en la tabla P2.*

### 4.2 P2 — Impacto moderado

| # | Hallazgo | Ubicación | Evidencia |
|---|---|---|---|
| PR4 | `courses/[id]/units/[unitId]/page.js` usa el stylesheet legacy 100% hardcodeado (`@/styles/CourseDetail.module.css`), con colores en crudo y acento morado (`#4f46e5`) ajeno tanto al azul funcional (`--brand-*`) como al naranja de marca (`--elevate-accent-500`) | `page.js:13`; `styles/CourseDetail.module.css:9,14-15,26,32,42,56,62,76-77` (verificado por grep) | Un paso intermedio dentro del mismo flujo (curso → unidad → lección) cambia de sistema de color; requiere 2 clics desde el detalle de curso, por lo que su probabilidad de verse en una primera sesión es menor que PR0/PR1 |
| PR5 | IDs técnicos de MongoDB expuestos directamente al usuario como fallback visible en `enrollments` | `enrollments/page.js:102-103` (`courseId`/`studentId` crudos en `<span className={styles.idFallback}>`) | Dato interno de infraestructura visible; solo alcanzable navegando como admin a una ruta secundaria |
| PR6 | Acciones destructivas/administrativas (activar, desactivar, suspender) sin confirmación ni feedback de carga consistente: el botón cambia su propio texto a "…" en vez de usar el estado `loading` del componente `Button` ya usado en otras páginas | `users/page.js:86,96`; `enrollments/page.js:119,129` | Comparar con `certificates/page.js` y `assessment/page.js`, que sí usan `loading` en `Button` |
| PR8 | `notifications` — `isRead` se muestra con el mismo badge visual para leídas y no leídas; sin indicador (punto, fondo distinto) para lo no leído, pese a ser el dato semánticamente más relevante de la pantalla | `NotificationCard/index.js:14` | Ausencia de jerarquía visual sobre el dato central de la vista |
| PR9 | `AchievementCard` y `NotificationCard` son visualmente casi idénticos (misma estructura `.card`/`.body`/`.meta`/`.badge` duplicada letra por letra en dos CSS distintos) pese a representar dominios de producto muy distintos | Comparación estructural de ambos componentes y sus `.module.css` | Sin diferenciación de identidad visual entre "logro" y "notificación del sistema" |
| PR11 | `CEFR_COLOR` en certificados hardcodeado con hex crudos a nivel de componente JS, fuera del sistema de tokens | `certificates/page.js:17-21` | Contradice `DESIGN_SYSTEM.md` §7 ("Qué está permitido y qué no") |
| PR12 | `progress/StudentProgress.js` redefine un componente local `StatCard` con el mismo nombre pero implementación distinta al `ui/StatCard` compartido usado en los dashboards | `StudentProgress.js:16-24` | Dos "tarjetas de estadística" con nombre idéntico y markup distinto conviviendo en la app |
| PR13 | `enrollments` no tiene ningún `overflow-x`/wrapper de scroll ni `@media` query, a diferencia de `users` (misma estructura de tabla, sí tiene ambos) | `Enrollments.module.css` (109 líneas, sin `@media`) vs. `Users.module.css:8,78-84` | Inconsistencia de responsive entre dos pantallas gemelas en propósito |
| PR14 | Badges de "alumnos en riesgo/cohorte" en `AdminDashboard`/`TeacherDashboard` reinventados con CSS local por página en vez de reutilizar el componente `ui/Badge` compartido | `AdminDashboard.module.css:56-79`; `TeacherDashboard.module.css:56-99` | Mismo patrón visual implementado dos veces de forma independiente; relacionado con PR9 (mismo patrón transversal de reutilización desigual, en pantallas distintas) |
| PR15 | `courses/[id]/units/[unitId]/page.js` no muestra iconos de estado (✓/🔒) ni badges de progreso para las lecciones, pese a que la página padre inmediata (`courses/[id]/page.js`) sí los tiene para las mismas lecciones | `page.js:36-77` (lista `<Link>` plana) vs. `courses/[id]/page.js:27-38,68-125` | Pérdida de información visual entre dos pasos consecutivos del mismo flujo |

### 4.3 P3 — Impacto menor / cosmético

| # | Hallazgo | Ubicación | Evidencia |
|---|---|---|---|
| PR16 | `achievements` y `notifications` sin ninguna `@media` query en sus hojas de estilo | `Achievements.module.css` (62 líneas), `Notifications.module.css` (57 líneas) — verificado sin coincidencias de `@media` | No se ha confirmado ruptura visual en mobile, solo ausencia de tratamiento explícito |
| PR17 | Excepciones puntuales de color hardcodeado en dos archivos por lo demás tokenizados: `badgeRetry` en `assessments` (`#fef3c7`/`#92400e`) y dos reglas sueltas en `skill-radar` (`#e5e7eb`, `#6b7280`) | `Assessments.module.css:117-118`; `SkillRadar.module.css:22,42` | Mismo patrón menor repetido dos veces (fusionado en la autorrevisión, antes PR17+PR18) — no forman una tendencia dominante en ninguno de los dos archivos |
| PR19 | Código muerto sin efecto visual observable: variable `visual` calculada y nunca usada en `courses/[id]/page.js`; clases `.btnActivate`/`.btnSuspend` en `Enrollments.module.css` sin consumidor en el JS actual | `page.js:149`; `Enrollments.module.css:74-109` vs. `page.js:113-131` | Fusionado en la autorrevisión (antes PR19+PR20) y marcado como **de relevancia baja para esta fase**: es deuda de código, no percepción visual — no afecta a nada que un visitante pueda ver |
| PR21 | Historial de intentos en `assessment/page.js` implementado con `div`s a modo de tabla (`historyRow`/`historyHead`) en vez de `<table>` semántica, mientras otras pantallas del proyecto usan tres enfoques distintos para tabular datos (`<table>` real en `users`/`enrollments`, `div`-tabla aquí, cards sin tabla en `assessments`) | `assessment/page.js:83-102` | Marcado en la autorrevisión como **borderline fuera de alcance**: es principalmente un tema de semántica HTML/accesibilidad, visualmente indistinguible de una tabla real |
| PR22 | `TeacherDashboard` muestra un mensaje de error genérico y hardcodeado en vez del `err.message` real que sí propaga `AdminDashboard` en el mismo patrón de carga | `TeacherDashboard/index.js:27` (`"Error cargando dashboard"`) vs. `AdminDashboard/index.js` | Reformulado en la autorrevisión para no asumir que propagar el error crudo del backend sea deseable — el hallazgo es la **inconsistencia** entre ambos dashboards, no una preferencia por un tratamiento sobre otro |
| PR23 | Fallback de rol no reconocido en `dashboard/page.js` como `<div>` de texto plano sin ningún estilo | `dashboard/page.js:16` | Caso límite, baja probabilidad de ocurrencia en uso real |

## 5. Pantallas con nivel portfolio

Pantallas cuya presentación actual es consistente con un producto SaaS cuidado, sin cambios necesarios de calidad percibida:

- **`courses/[id]` (detalle de curso)** — jerarquía clara, `CourseDetailSkeleton`, `EmptyState` contextual, iconografía de estado accesible (`StatusIcon` con `sr-only`), CTA con contexto ("Siguiente: {label}").
- **Página de lección** (`courses/[id]/units/[unitId]/lessons/[lessonId]`) — breadcrumb, barra de progreso, quiz interactivo con feedback visual por opción, reproductor de YouTube con conversión automática de URL, botones con estado `loading`.
- **Página de evaluación** (`courses/[id]/units/[unitId]/assessment`) — la pantalla con más ramas de estado bien resueltas de todo el frontend (bloqueada, sin evaluación, aprobada, sin intentos, formulario), copy específico por motivo de bloqueo, badges de resultado semánticos.
- **`assessments` (listado)** — resumen en mini-cards, indicador visual de "dots" de intentos, badges "Nuevo"/"Reintentar" con color.
- **`certificates`** — iconografía custom, badge de nivel CEFR con color, estado alternativo "PDF en preparación", feedback de descarga vía toast.
- **`progress` (vista de estudiante)** — secciones bien separadas, accent-color por curso, micro-mensajes motivacionales según racha.
- **`skill-radar`** — copy educativo maduro ("¿Cómo se calcula este radar?", nota legal de estimación), único uso de visualización de datos avanzada (Recharts), con matices señalados en PR10.
- **Dashboard de estudiante** (`StudentDashboard` y sus variantes `EmptyDashboard`/`CompletedDashboard`/`DashboardSkeleton`) — el más rico en storytelling de producto de las tres variantes de dashboard, único con skeleton real de carga.

## 6. Pantallas que transmiten sensación de CRUD o herramienta interna

- **Login** (fuera del árbol `(protected)/` pero incorporado en la autorrevisión) — no es "CRUD" en sentido estricto, pero transmite una sensación de plantilla genérica sin terminar de adaptar: copy de marca en inglés, placeholder de formulario B2B (`tu@empresa.com`), footer con año desactualizado (ver PR0).
- **`teacher-analytics`** — el caso más severo (ver PR1, PR2). Cuatro tablas HTML sin ningún estilo propio, estados vacíos en texto plano, cero badges/iconos/color-coding, mezcla de idioma en encabezados de columna ("Pass Rate", "Average Score" en inglés dentro de una pantalla en español).
- **`users`** — tabla clásica de administración (Nombre/Email/Rol/Estado/Acciones) sin cards, sin avatares, sin paginación ni búsqueda, acciones en inglés sin confirmación (ver PR3, PR6).
- **`enrollments`** — mismo patrón que `users`, agravado por IDs técnicos crudos visibles (PR5) y ausencia total de responsive (PR13).
- **`achievements`** y **`notifications`** — funcionalmente correctas y con `EmptyState`/`LoadingState`/`ErrorState` bien adoptados, pero con presentación plana: listas de `<li>` casi idénticas entre sí (PR9), sin jerarquía visual sobre el dato más relevante de cada una (rareza en logros, no-leída en notificaciones).
- **Dashboards de `admin` y `teacher`** (matiz) — bien construidos con `StatCard`/`Card` en su parte superior (grid de métricas), pero degradan a listas de texto plano (`<ul>`/`<li>`) para "alumnos en riesgo/cohorte" en la parte inferior de la misma pantalla — una pantalla que empieza como producto pulido y termina como lista interna.

## 7. Incoherencias visuales detectadas

1. **Duplicidad de stylesheets con nombre idéntico y sistemas de color distintos.** `frontend/src/styles/{Courses,Progress,Assessment,Certificates,CourseDetail}.module.css` (100% hex hardcodeado) coexisten con equivalentes colocados junto a sus páginas (basados en tokens). De estos, `CourseDetail.module.css` **sí está activamente importado** (`courses/[id]/units/[unitId]/page.js:13`, verificado); los demás parecen huérfanos pero conviven con nombre idéntico a archivos activos, con riesgo real de edición accidental del archivo equivocado.
2. **Patrón de import de CSS que coincide con la frontera de calidad.** Páginas "nuevas" colocan su CSS junto al `page.js`; páginas más CRUD (`users`, `enrollments`, `achievements`, `notifications`, `skill-radar`) importan desde el alias global `@/styles/*.module.css`.
3. **Idioma mixto español/inglés** en `users` y `enrollments` (PR3), verificado por grep directo.
4. **Tres enfoques distintos para tabular datos** en el mismo frontend: `<table>` real (`users`, `enrollments`), `div`-tabla (`assessment` — historial de intentos), y herencia CSS por descendencia sin className propio (`teacher-analytics`).
5. **Dos componentes `StatCard` con el mismo nombre e implementación distinta** (`ui/StatCard` vs. `progress/StudentProgress.js:16-24`).
6. **Badges reinventados por página** en vez de reutilizar `ui/Badge` (dashboards de admin/teacher, ver PR14) — incluida una tercera pareja casi idéntica (`AchievementCard`/`NotificationCard`, PR9).
7. **Colores de marca en tensión**: el naranja oficial (`--elevate-accent-500`) convive con el azul funcional (`--brand-500`, deuda ya documentada en `DESIGN_SYSTEM.md` §10.5) y, en el caso de `CourseDetail.module.css` legacy, con un tercer color (morado/indigo `#4f46e5`) ajeno a ambos sistemas.
8. **Gráfico sin identidad de marca**: el radar de habilidades usa el color por defecto de Recharts en vez de un token de la paleta oficial (PR10).

## 8. Deuda de frontend pendiente

- CSS legacy hardcodeado sin tokens, activo en al menos una ruta real (`CourseDetail.module.css`), con hermanos huérfanos de nombre idéntico para `Courses`, `Progress`, `Assessment`, `Certificates` — deuda ya señalada parcialmente en `DESIGN_SYSTEM.md` §10.5 y §10.6, confirmada vigente en esta revisión con un caso activo adicional no documentado previamente (la ruta de unidad de curso).
- Componentes de tabla de `teacher-analytics` sin ningún CSS module propio, dependientes de estilo heredado por descendencia desde la página contenedora.
- Ausencia de `EmptyState` en los 4 componentes de tabla de `teacher-analytics`, pese a estar disponible y adoptado en el resto del frontend.
- `CEFR_COLOR` hardcodeado en `certificates/page.js` fuera del sistema de tokens.
- Traducción inconsistente de enums de backend: `dashboard`/`assessments`/`courses` mapean con diccionarios `_LABEL` en español; `users`/`enrollments` muestran valores crudos del backend (incluyendo textos de botón) sin traducir.
- Componente `StatCard` duplicado con implementación divergente.
- CSS muerto confirmado: `.btnActivate`/`.btnSuspend` en `Enrollments.module.css` sin consumidor en el JS actual.
- Cómputo muerto confirmado: `visual` en `courses/[id]/page.js:149`.
- Responsive desigual: `users` y `skill-radar` tienen tratamiento explícito confirmado; `enrollments`, `achievements`, `notifications` no tienen ninguna `@media` query confirmada en sus hojas de estilo.

## 9. Conclusión de la revisión

El frontend no tiene un problema de calidad uniforme: tiene una **frontera nítida entre dos generaciones de implementación** dentro del mismo proyecto. El grupo de pantallas construido más recientemente (flujo completo de curso/lección/evaluación, progreso, certificados) alcanza un nivel de acabado consistente con un producto de portfolio serio. El grupo más antiguo o menos iterado (`teacher-analytics`, `users`, `enrollments`, y en menor medida `achievements`/`notifications`/`skill-radar`) se queda por debajo de ese estándar, con `teacher-analytics` como el caso más severo dentro del área protegida: es la pantalla con más volumen de datos de dominio del proyecto y, a la vez, la que menos presentación de producto tiene.

Tras la autorrevisión, el hallazgo de mayor impacto real no está dentro de esa frontera interna, sino **antes** de ella: la pantalla de login mezcla idiomas y tonos de forma más marcada que cualquier pantalla protegida, y es la única superficie que garantizadamente ve el 100% de quien evalúa el proyecto. Cualquier intervención de esta fase que ignore el login estaría optimizando pantallas que un visitante puede o no llegar a ver, antes de resolver la que ve con certeza.

Esta revisión no incluye una propuesta de intervención ni un orden de trabajo — ambos corresponden al Volumen II (Blueprint) de esta misma fase.

---

## Adenda — Revisión crítica del Volumen I

Tras la redacción inicial de este documento, se realizó una autorrevisión crítica solicitada explícitamente, con seis criterios de verificación. Resultado y cambios aplicados:

1. **Hallazgos duplicados/misma causa raíz** — PR1+PR2 (teacher-analytics), PR17+PR18 (excepciones de color puntuales) y PR19+PR20 (código muerto) se fusionaron en una sola entrada cada uno; el recuento total pasó de 23 a 20 hallazgos distintos más el nuevo PR0.
2. **P1 ausente** — se detectó que el alcance original excluía la pantalla de login, el único punto de contacto garantizado con el 100% de los visitantes. Se añadió como **PR0**, incorporando el login al alcance del documento.
3. **Reclasificación P1↔P2** — PR4, PR5 y PR6 bajaron de P1 a P2 (requieren navegación profunda como admin, baja probabilidad de verse en una primera sesión); PR7 (`achievements`) y PR10 (`skill-radar`) subieron de P2 a P1 (alcanzables en un clic desde el sidebar de estudiante, alta visibilidad).
4. **Hallazgos fuera de alcance** — PR19 (código muerto, antes PR19+PR20) y PR21 (semántica de tabla) se marcaron explícitamente como de relevancia baja o borderline para una fase centrada en percepción visual, sin eliminarlos del registro.
5. **Coherencia con el criterio "primeros 5 minutos"** — la clasificación P1/P2/P3 se reordenó siguiendo profundidad de navegación y probabilidad real de exposición, no solo severidad técnica del hallazgo.
6. **Sesgo hacia detalle técnico** — confirmado. El documento original carecía de una categoría para problemas de tono/voz de marca (idioma, copy, coherencia de fecha). El hallazgo del login (PR0) cubre ese vacío; el Blueprint (Volumen II) debería considerar "tono y voz de marca" como una dimensión propia, no subsumida en "Design System / tokens".

Ningún hallazgo original fue eliminado por considerarse incorrecto — todos los cambios son de alcance, fusión o reclasificación de prioridad, preservando la trazabilidad completa a código.
