# Role Experience Polish — Volumen I: Auditoría

**Fase**: Role Experience Polish
**Documento**: Volumen I de la fase (primer documento oficial)
**Alcance**: Frontend (Next.js App Router), roles `admin`, `teacher`, `student`
**Método**: Lectura directa del código fuente en `frontend/src`. Ningún hallazgo se basa en memoria de conversaciones previas ni en suposiciones; cada afirmación cita archivo y, cuando aplica, línea.
**Fuera de alcance**: Propuestas de solución, diseño de componentes nuevos o cambios de código. Este documento es exclusivamente diagnóstico.

---

## Índice

1. [Metodología](#1-metodología)
2. [Resumen ejecutivo](#2-resumen-ejecutivo)
3. [Mapa de rutas y roles](#3-mapa-de-rutas-y-roles)
4. [Auditoría por rol](#4-auditoría-por-rol)
   - 4.1 [Admin](#41-admin)
   - 4.2 [Teacher](#42-teacher)
   - 4.3 [Student](#43-student)
5. [Inconsistencias transversales](#5-inconsistencias-transversales)
   - 5.1 [Navegación](#51-navegación)
   - 5.2 [Consistencia visual y Design System](#52-consistencia-visual-y-design-system)
   - 5.3 [Permisos y control de acceso](#53-permisos-y-control-de-acceso)
   - 5.4 [Reutilización de componentes](#54-reutilización-de-componentes)
6. [Deuda técnica con impacto directo en UX](#6-deuda-técnica-con-impacto-directo-en-ux)
7. [Tabla consolidada de hallazgos](#7-tabla-consolidada-de-hallazgos)
8. [Cierre](#8-cierre)

---

## 1. Metodología

Se ha inspeccionado directamente:

- La totalidad de páginas bajo `frontend/src/app/(protected)/` (20 archivos `page.js`).
- Los componentes de layout compartidos: `Sidebar`, `Navbar`, `BottomNav`, `MobileMenu`, `ProtectedLayout`.
- Los tres dashboards por rol: `AdminDashboard`, `TeacherDashboard`, `StudentDashboard`.
- Los hooks de autenticación y protección de ruta: `useAuth`, `useProtectedRoute`.
- El Design System oficial (`frontend/DESIGN_SYSTEM.md`, v2.0) como criterio de referencia para toda comparación visual.
- Los módulos CSS activos consumidos realmente por página (confirmando import real, no solo coincidencia de nombre, siguiendo la advertencia ya documentada en `DESIGN_SYSTEM.md` §10.6 sobre archivos huérfanos).

No se ha ejecutado la aplicación en navegador ni se han tomado capturas; todos los hallazgos son estáticos, derivados de lectura de código.

---

## 2. Resumen ejecutivo

El frontend actual fue construido con **el rol `student` como caso primario**. Los flujos de estudiante están completos, usan de forma consistente los componentes de `ui/` y el Design System, y tienen estados de carga, error y vacío bien resueltos.

Los roles `teacher` y `admin` no tienen el mismo nivel de tratamiento:

- **Admin** tiene un dashboard funcional pero construido con HTML plano, sin un solo componente del Design System.
- **Teacher** tiene un dashboard bien construido, pero su pantalla más importante (`teacher-analytics`) es inalcanzable desde la navegación: no existe ningún enlace hacia ella en toda la aplicación.
- Varias rutas que aparecen en la navegación **común a los tres roles** (`/courses`, `/progress`) están implementadas exclusivamente en clave de estudiante (textos en primera persona como "Mis cursos", "Mi progreso", componentes importados desde `components/dashboard/student/`), sin ninguna adaptación para teacher o admin.
- El control de acceso por rol **no existe en el frontend**: ninguna página valida `user.role` antes de renderizar. La única protección es `useProtectedRoute`, que solo verifica autenticación, no autorización. Esto significa que cualquier usuario autenticado puede navegar manualmente a `/users` o `/teacher-analytics` sin importar su rol.

Estos tres puntos son el núcleo de lo que la fase "Role Experience Polish" debe resolver.

---

## 3. Mapa de rutas y roles

Fuente: `frontend/src/components/layout/Sidebar/index.js` (líneas 15-32) y `frontend/src/components/layout/BottomNav/index.js` (líneas 9-14).

| Ruta | En Sidebar para | En BottomNav (solo student) | Página existe | Implementación real está en clave de |
|---|---|---|---|---|
| `/dashboard` | Todos (`NAV_LINKS`) | Sí | Sí | Roleado (`dashboard/page.js` líneas 12-14 despacha por rol) |
| `/courses` | Todos (`NAV_LINKS`) | Sí | Sí | **Solo student** ("Mis cursos", tabs de matrícula) |
| `/enrollments` | Todos (`NAV_LINKS`) | No | Sí | Neutra, con una rama condicional para admin (línea 36) |
| `/progress` | Todos (`NAV_LINKS`) | Sí | Sí | **Solo student** (importa `SkillProgressList` de `components/dashboard/student/`) |
| `/users` | Solo admin (`ADMIN_LINKS`) | No | Sí | Admin |
| `/assessments` | Solo student (`STUDENT_LINKS`) | Sí | Sí | Student |
| `/certificates` | Solo student (`STUDENT_LINKS`) | No | Sí | Student |
| `/achievements` | Solo student (`STUDENT_LINKS`) | No | Sí | Student |
| `/notifications` | Solo student (`STUDENT_LINKS`) | No | Sí | Student |
| `/skill-radar` | Solo student (`STUDENT_LINKS`) | No | Sí | Student |
| `/teacher-analytics` | **En ningún sitio** | No | Sí | Teacher |
| `/calendar` | **En ningún sitio** (referenciado como link) | No | **No existe** | — |

Observaciones directas de esta tabla:

- El rol `teacher` no tiene **ninguna** entrada propia en `Sidebar` (no existe un `TEACHER_LINKS` — compárese con `ADMIN_LINKS` y `STUDENT_LINKS` en `Sidebar/index.js` líneas 22-32). Su única superficie de navegación son los 4 enlaces comunes, de los cuales dos (`/courses`, `/progress`) están construidos para estudiante.
- `/teacher-analytics` existe como página completa (`teacher-analytics/page.js`, 80+ líneas, con 4 componentes de dominio propios) pero no es alcanzable por ningún enlace de la interfaz. Es una pantalla huérfana de navegación.
- `/calendar` es referenciado como destino de un botón (`frontend/src/components/dashboard/student/TodayInElevateCard/index.js:91`) pero no existe ninguna carpeta `calendar` bajo `app/(protected)/`. Es un enlace roto para cualquier estudiante que lo pulse.

---

## 4. Auditoría por rol

### 4.1 Admin

**Pantallas propias**: `/dashboard` (rama `AdminDashboard`), `/users`.
**Pantallas compartidas mal adaptadas**: `/courses`, `/progress` (framing de estudiante, ver §3).

**Hallazgo principal — `AdminDashboard` no usa el Design System.**
`frontend/src/components/dashboard/admin/AdminDashboard/index.js` (146 líneas) no importa ni un solo componente de `components/ui/`. Toda la pantalla está construida con etiquetas HTML sin clase:

- Estados de carga y error como texto plano: `<p>Cargando dashboard...</p>` (línea 24), `<p>Error cargando dashboard</p>` (línea 25) — en vez de `LoadingState` / `ErrorState`, que sí usan `TeacherDashboard` y prácticamente toda página student.
- Título de página como `<h1>Admin Dashboard</h1>` (línea 33, en inglés, sin usar `PageHeader`).
- Ocho `<section>` con `<h2>` sin ninguna clase, tablas (`<table>`) sin `className`, sin `StatCard`, sin `Card`.
- Ningún `import` de `styles` — no existe un `AdminDashboard.module.css`.

El contraste es directo y verificable comparando con `TeacherDashboard/index.js`, que en la misma capa de la aplicación (mismo router, mismo momento de carga de datos) usa `PageHeader`, `StatCard`, `Card`/`CardHeader`/`CardBody`, `LoadingState`, `ErrorState` y un módulo CSS propio (`TeacherDashboard.module.css`).

**`/users` — Design System aplicado de forma parcial.**
`users/page.js` sí usa `PageHeader`, `LoadingState`, `ErrorState`, `EmptyState`, `Button` correctamente. Sin embargo, su hoja de estilos (`frontend/src/styles/Users.module.css`, confirmada como activamente importada en `users/page.js:12`) mezcla tokens con valores crudos:

- `border-radius: var(--radius-lg, 12px)` (línea 11) y `background: var(--bg-hover, var(--bg-subtle))` (línea 45): uso de fallback hardcodeado en lugar de confiar en el token, patrón no contemplado en `DESIGN_SYSTEM.md` §5.
- `background-color: var(--success-100, #d1fae5)` / `var(--danger-100, #fee2e2)` / `var(--brand-100, #e0e7ff)` (líneas 48-49, 68): mismos fallbacks hex crudos.
- Padding y font-size en `rem` directos (`0.75rem`, `0.875rem`, `0.2rem 0.6rem`) en vez de `var(--space-*)`, y `border-radius: 9999px` literal en vez de `var(--radius-full)` (líneas 55, 64) — contraviene explícitamente la tabla "No permitido" de `DESIGN_SYSTEM.md` §7.

**Ausencia de gestión de contenido.**
No existe en todo el frontend ningún flujo de creación, edición o publicación de cursos, ni gestión de matrículas más allá de activar/suspender (`enrollments/page.js`). Grep de `role ===` / `user?.role` en todo `frontend/src` (excluyendo build artefacts) devuelve exactamente 5 coincidencias en todo el proyecto — ninguna habilita un flujo de gestión, solo despacho de dashboard y una rama de resolución de nombres en `enrollments`. El rol admin no tiene, en el frontend actual, ninguna capacidad de administración de contenido académico — solo gestión de usuarios y consulta de métricas.

### 4.2 Teacher

**Pantallas propias**: `/dashboard` (rama `TeacherDashboard`), `/teacher-analytics`.
**Pantallas compartidas mal adaptadas**: `/courses`, `/progress` (igual que admin, ver §3).

**Hallazgo principal — pantalla insignia inalcanzable.**
`/teacher-analytics` es, por volumen de código y de componentes de dominio (`CohortComparisonTable`, `InactivityRanking`, `AssessmentBreakdownTable`, `StudentWeeklyTrendPanel`), la pantalla más compleja construida para este rol. No existe ningún `Link`, botón, ni entrada de `Sidebar`/`BottomNav` que apunte a `/teacher-analytics` en todo el proyecto (confirmado por búsqueda de la cadena `teacher-analytics` fuera del propio directorio de la página — cero resultados en componentes de navegación o dashboard). Un profesor solo puede llegar a esta pantalla escribiendo la URL manualmente.

**Sidebar sin sección propia.**
A diferencia de `admin` (`ADMIN_LINKS`) y `student` (`STUDENT_LINKS`), no existe un `TEACHER_LINKS` en `Sidebar/index.js`. La lógica de construcción de enlaces (líneas 39-43) solo contempla dos ramas (`admin`, `student`); cualquier otro rol —incluido `teacher`— cae al `else` y recibe únicamente los 4 enlaces comunes.

**Pantallas comunes con framing incorrecto.**
`/courses` (`courses/page.js`) presenta el título "Mis cursos" (línea 164) y organiza el contenido en pestañas "En progreso" / "Completados" / "Disponibles" basadas en matrícula del usuario autenticado como estudiante — un profesor no se matricula en cursos, por lo que esta pantalla, tal como está escrita, no tiene un caso de uso coherente para él. Lo mismo ocurre con `/progress` (título "Mi progreso", línea 89), que importa directamente `SkillProgressList` desde `frontend/src/components/dashboard/student/SkillProgressList` (línea 13) — un componente ubicado explícitamente en el namespace `student`, reutilizado en una ruta nominalmente compartida por los tres roles.

### 4.3 Student

**Pantallas propias**: `/dashboard` (rama `StudentDashboard`), `/courses`, `/progress`, `/assessments`, `/certificates`, `/achievements`, `/notifications`, `/skill-radar`, flujo completo de curso (`/courses/[id]`, `/courses/[id]/units/[unitId]`, lecciones, assessment de unidad).

Este es el rol con la implementación más completa y más alineada al Design System:

- Todas sus páginas usan consistentemente `PageHeader`, `LoadingState`, `ErrorState`, `EmptyState` (confirmado por conteo de ocurrencias: 8 en `achievements`, 8 en `assessments`, 8 en `certificates`, 8 en `notifications`, 8 en `skill-radar`, 8 en `progress`).
- `StudentDashboard` tiene estados dedicados adicionales no presentes en los otros dos dashboards: `EmptyDashboard.js`, `CompletedDashboard.js`, `DashboardSkeleton.js` — gestión de estado de UI más granular que `AdminDashboard` (sin estados dedicados, solo `loading`/`error` booleanos) y `TeacherDashboard` (mismo patrón simple que Admin, sin variantes empty/completed).
- Es el único rol con navegación móvil dedicada (`BottomNav`, montado condicionalmente solo si `user?.role === 'student'` en `ProtectedLayout/index.js:33`).

**Hallazgo — enlace roto.**
`frontend/src/components/dashboard/student/TodayInElevateCard/index.js:91` renderiza un `Button` con `href="/calendar"`. No existe ninguna ruta `/calendar` en `frontend/src/app/(protected)/`. Cualquier estudiante que vea este componente y pulse el botón llega a un 404.

---

## 5. Inconsistencias transversales

### 5.1 Navegación

1. **Asimetría estructural en `Sidebar`**: existen listas de enlaces dedicadas para `admin` (`ADMIN_LINKS`) y `student` (`STUDENT_LINKS`), pero ninguna para `teacher`. El profesor es, de los tres roles, el que menos superficie de navegación propia tiene, pese a tener una pantalla de analítica sustancialmente más compleja que la de admin.
2. **Enlace roto**: `/calendar` (ver §4.3), único caso confirmado de destino inexistente.
3. **Pantalla huérfana**: `/teacher-analytics` (ver §4.2), único caso confirmado de página completa sin ningún punto de entrada en la UI.
4. **Navegación móvil asimétrica sin justificación documentada**: `BottomNav` solo se monta para `student` (`ProtectedLayout/index.js:33`). Teacher y admin dependen exclusivamente del `Sidebar` en drawer (toggle vía `Navbar`) en viewport móvil. No hay ningún comentario, documentación o rama de código que explique si esto es una decisión de producto deliberada o una omisión.

### 5.2 Consistencia visual y Design System

1. **`AdminDashboard` fuera del sistema por completo** (ver §4.1) — es el caso más severo: no es una desviación parcial de tokens, es ausencia total de componentes `ui/` y de módulo CSS.
2. **`EnrollmentsPage` no usa `PageHeader` ni `LoadingState`**: `frontend/src/app/(protected)/enrollments/page.js` usa `<h1 className={styles.title}>Matrículas</h1>` (línea 68) en vez de `PageHeader`, y `<p className={styles.status}>Cargando matrículas…</p>` (línea 70) en vez de `LoadingState`. Tampoco usa `EmptyState` para la ausencia de resultados: la fila vacía de la tabla (líneas 130-136) tiene un `style={{ textAlign: 'center', color: '#9ca3af' }}` inline con un color hexadecimal hardcodeado, en contravención directa de la regla de `DESIGN_SYSTEM.md` §5.1 ("Nunca gris hardcodeado") y de la tabla "No permitido" de §7.
3. **`Users.module.css` con fallbacks hex crudos y espaciado no tokenizado** (ver detalle en §4.1) — módulo activo, no huérfano, por lo que su desviación es deuda real y no un falso positivo de los ya documentados en `DESIGN_SYSTEM.md` §10.6.
4. **Deuda ya documentada por el propio Design System, confirmada vigente en esta auditoría**: `CourseDetail.module.css` (activo, usado por `courses/[id]/units/[unitId]/page.js:13`) sigue sin usar tokens (`DESIGN_SYSTEM.md` §10.5); persisten 8 archivos `.module.css` huérfanos en `frontend/src/styles/` (`Dashboard`, `Sidebar`, `Navbar`, `Assessment`, `Progress`, `ProtectedLayout`, `LessonDetail`, `Courses` — confirmado por listado de directorio, ninguno de estos nombres aparece en los `import` reales de `app/(protected)/**/page.js`, salvo homónimos legítimos co-ubicados junto a su componente, que son archivos distintos con la misma base de nombre).
5. **Migración de marca azul→naranja pendiente** (`DESIGN_SYSTEM.md` §10.5): el color funcional dominante sigue siendo `--brand-*` (azul) en botones primarios, cards y barras de progreso, mientras el naranja de marca (`--elevate-accent-500`) solo cubre sidebar, símbolo y CTAs puntuales. Afecta por igual a los tres roles, pero es más visible en `admin`/`teacher` por la mayor densidad de botones de acción en sus tablas.

### 5.3 Permisos y control de acceso

1. **No existe guard de rol en el frontend.** `useProtectedRoute` (`frontend/src/hooks/useProtectedRoute.js`) solo verifica `user`/`token` (línea 12), nunca `user.role`. Ninguna de las 15 páginas que importan `useAuth` (ver búsqueda en `app/(protected)`) comprueba el rol antes de renderizar contenido o antes de solicitar datos.
2. **Consecuencia directa en `/users`**: un `teacher` o `student` autenticado que navegue manualmente a `/users` ejecutará `usersService.getUsers(token)`; el único guard posible es el que exista en el backend, y el frontend no tiene ninguna pantalla de "acceso denegado" — el resultado visible dependerá de cómo el backend responda al 403 (mostrado, en el mejor caso, como `ErrorState` con el mensaje crudo del backend).
3. **Consecuencia directa en `/teacher-analytics`**: mismo patrón — sin guard de rol, sin pantalla de acceso denegado dedicada.
4. **Único condicional de permisos existente en una página**: `enrollments/page.js:36`, que añade una llamada extra (`buildUserMap`) solo si `user?.role === 'admin'`, para resolver nombres de estudiante en la tabla. No es un control de acceso, es una optimización de datos — el resto del contenido de la página es idéntico para cualquier rol.

### 5.4 Reutilización de componentes

1. **Los tres dashboards no comparten ninguna base común.** `AdminDashboard`, `TeacherDashboard` y `StudentDashboard` son tres implementaciones independientes sin un layout de dashboard compartido, sin convención común de secciones, y (en el caso de Admin) sin siquiera compartir los mismos átomos de UI (`StatCard`, `Card`).
2. **`SkillProgressList` vive en el namespace `student` pero se reutiliza en una ruta nominalmente neutra** (`progress/page.js`, ver §4.2) — evidencia de que la frontera entre "componente de dominio de un rol" y "componente de página compartida" no está definida de forma explícita en la organización de carpetas (`components/dashboard/student/` vs. un posible `components/dashboard/shared/`).
3. **`StatCard`, `Card`, `PageHeader`, `LoadingState`, `ErrorState`, `EmptyState`** están bien adoptados y sí se comportan como un sistema reutilizable transversal cuando se usan — el problema no es la existencia de estos átomos, sino su adopción desigual (ausente en `AdminDashboard`, parcial en `enrollments`).

---

## 6. Deuda técnica con impacto directo en UX

Se listan aquí únicamente los elementos de deuda que tienen un efecto observable en la experiencia de alguno de los tres roles (se excluye deuda puramente interna sin efecto visible, como la organización de carpetas per se).

| Deuda | Rol afectado | Efecto en UX observable |
|---|---|---|
| `AdminDashboard` sin Design System | Admin | Pantalla de entrada del rol visualmente inconsistente con el resto de la plataforma; sin estados de carga/error reconocibles para el usuario habituado al resto de la app |
| `/teacher-analytics` sin punto de entrada | Teacher | Funcionalidad construida e invisible; el profesor no sabe que existe salvo que alguien le pase la URL |
| `TEACHER_LINKS` inexistente en `Sidebar` | Teacher | Navegación del rol reducida a 4 enlaces genéricos, dos de ellos mal adaptados |
| `/courses` y `/progress` en clave de estudiante | Teacher, Admin | Ruta presente en su menú que, al abrirse, no corresponde a ningún flujo real de su rol |
| Ausencia de guard de rol en frontend | Los tres | Cualquier usuario puede intentar acceder a pantallas de otro rol; la experiencia de fallo (si la hay) depende del mensaje crudo devuelto por el backend |
| Enlace `/calendar` roto | Student | 404 al pulsar un CTA visible en el dashboard |
| Fallbacks hex/rem crudos en `Users.module.css` | Admin | Inconsistencia visual sutil (radios, paddings, colores de badge) respecto al resto de tablas de la plataforma |
| `EnrollmentsPage` sin `PageHeader`/`LoadingState`/`EmptyState` | Admin, Teacher, Student (ruta común) | Título, estado de carga y estado vacío con apariencia distinta al resto de páginas con tabla (`/users`) |
| `CourseDetail.module.css` sin tokens (deuda ya documentada, confirmada vigente) | Student | Colores y radios (incluido indigo `#4f46e5`) fuera de paleta en la pantalla de detalle de unidad |
| Migración azul→naranja incompleta (deuda ya documentada, confirmada vigente) | Los tres | Identidad de marca visible solo en sidebar/CTAs puntuales; el resto de la interacción funcional sigue en azul |

---

## 7. Tabla consolidada de hallazgos

| # | Hallazgo | Ubicación (archivo:línea) | Rol(es) | Categoría |
|---|---|---|---|---|
| H1 | `AdminDashboard` no usa ningún componente `ui/` ni módulo CSS propio | `components/dashboard/admin/AdminDashboard/index.js` (completo) | Admin | Visual / Design System |
| H2 | `/teacher-analytics` no tiene ningún enlace de acceso en la UI | — (ausencia confirmada en `Sidebar`, `BottomNav`, dashboards) | Teacher | Navegación |
| H3 | No existe `TEACHER_LINKS` en `Sidebar` | `components/layout/Sidebar/index.js:22-43` | Teacher | Navegación |
| H4 | `/courses` implementado exclusivamente en clave de estudiante | `app/(protected)/courses/page.js:164` | Teacher, Admin | UX / Permisos implícitos |
| H5 | `/progress` implementado exclusivamente en clave de estudiante, reutiliza componente del namespace `student` | `app/(protected)/progress/page.js:13,89` | Teacher, Admin | UX / Reutilización |
| H6 | `useProtectedRoute` no valida `role`, ninguna página añade guard propio | `hooks/useProtectedRoute.js:11-18` | Los tres | Permisos |
| H7 | Enlace a `/calendar`, ruta inexistente | `components/dashboard/student/TodayInElevateCard/index.js:91` | Student | Navegación (enlace roto) |
| H8 | Fallbacks hex y espaciado no tokenizado en hoja activa | `styles/Users.module.css:11,45,48-49,55,64,68` | Admin | Design System |
| H9 | `EnrollmentsPage` no usa `PageHeader`/`LoadingState`/`EmptyState`; color hardcodeado inline | `app/(protected)/enrollments/page.js:68,70,132` | Admin, Teacher, Student (ruta común) | Visual / Design System |
| H10 | Ningún flujo de gestión de contenido (crear/editar/publicar curso) en todo el frontend | — (confirmado por ausencia total en el árbol de `app/(protected)`) | Admin, Teacher | Estructural |
| H11 | `BottomNav` exclusivo de `student`, sin equivalente ni justificación documentada para los otros roles | `components/layout/ProtectedLayout/index.js:33` | Teacher, Admin | Navegación |
| H12 | Tres dashboards sin base ni convención de sección compartida | `components/dashboard/{admin,teacher,student}/*Dashboard/index.js` | Los tres | Reutilización |

---

## 8. Cierre

Este documento constituye el **Volumen I** de la fase "Role Experience Polish" y su única función es dejar constancia, con trazabilidad a código, del estado real de la experiencia de los tres roles. No contiene decisiones de arquitectura de producto ni propuestas de implementación — estas corresponden a un volumen posterior de esta misma fase.
