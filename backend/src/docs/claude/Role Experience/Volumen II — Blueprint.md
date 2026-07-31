# Role Experience Polish — Volumen II: Blueprint

**Fase**: Role Experience Polish
**Documento**: Volumen II de la fase (segundo documento oficial)
**Depende de**: `Volumen I — Auditoría.md` (aprobado). Este documento no repite hallazgos; cada decisión aquí resuelve uno o más hallazgos (H1-H12) ya identificados.
**Alcance**: Decisiones oficiales de producto y arquitectura para la fase. No contiene diseño visual ni código.

---

## 1. Objetivos de la fase

1. Los tres roles (`admin`, `teacher`, `student`) deben tener una experiencia de navegación propia, completa y alcanzable: ninguna pantalla construida queda sin punto de entrada (resuelve H2, H3).
2. Ninguna pantalla compartida por nombre de ruta puede presentar contenido en clave de un único rol cuando la sirve a los tres (resuelve H4, H5).
3. Los tres dashboards y todas las pantallas de tabla/listado deben alcanzar el mismo nivel de adopción del Design System que hoy solo tiene `student` (resuelve H1, H8, H9).
4. Debe existir control de acceso por rol en el frontend, con una experiencia de "acceso denegado" explícita, no dependiente del mensaje crudo del backend (resuelve H6).
5. Los dashboards operativos (`admin`, `teacher`) deben compartir una base estructural común, sin perder sus diferencias de contenido por rol (resuelve H12). **Resolución de la Iteración 7 (decisión definitiva de producto):** `StudentDashboard` queda excluido de esta base compartida — responde a un modelo de interacción distinto al de `admin`/`teacher` y mantiene arquitectura propia. No hay Iteración 7bis pendiente.
6. Ningún enlace visible en la interfaz debe apuntar a una ruta inexistente (resuelve H7).

Fuera de objetivo de esta fase: nuevos flujos de gestión de contenido académico (H10) y la migración de marca azul→naranja (§5.2.5 del Volumen I). Ambos quedan registrados como deuda confirmada pero no forman parte del alcance de "Role Experience Polish".

---

## 2. Principios de diseño

1. **Un rol, una experiencia coherente.** Cada rol debe poder cumplir su propósito principal sin salir de su navegación propia ni interpretar pantallas escritas para otro rol.
2. **Ninguna pantalla huérfana.** Toda página existente bajo `app/(protected)/` debe ser alcanzable desde la navegación del/los rol(es) que la usan legítimamente.
3. **El Design System es la única fuente de estilo.** Ninguna pantalla nueva ni modificada introduce HTML sin clase, color hardcodeado o valor no tokenizado. La adopción ya validada en `student` (`PageHeader`, `LoadingState`, `ErrorState`, `EmptyState`, `StatCard`, `Card`) es el estándar mínimo para los tres roles.
4. **Compartir por capacidad, no por conveniencia.** Un componente o ruta se comparte entre roles solo cuando representa la misma necesidad funcional para todos ellos. Si el contenido difiere en fondo (no solo en datos), la pantalla se separa por rol en vez de forzarse a un componente único con ramas condicionales frágiles.
5. **La autorización se decide una vez y se aplica en un solo lugar.** El control de acceso por rol vive en un mecanismo central (guard de ruta), no repetido de forma ad-hoc en cada página.
6. **Cambios mínimos y reversibles.** Se evoluciona lo existente (`Sidebar`, dashboards, `useProtectedRoute`) en vez de sustituirlo; no se introducen abstracciones nuevas que no resuelvan un hallazgo concreto del Volumen I.

---

## 3. Arquitectura por rol

### 3.1 Admin

**Responsabilidad**: administración de usuarios y supervisión operativa de la plataforma (matrículas, métricas agregadas).

**Navegación propia**: `Dashboard`, `Usuarios` (`/users`), `Matrículas` (`/enrollments`). Sin acceso a pantallas de progreso o evaluación individual de estudiante en clave personal.

**Objetivo de experiencia**: el admin debe ver, al entrar, un panorama operativo de la plataforma (usuarios, matrículas, estado general) construido con los mismos átomos visuales que el resto de la app — no una versión distinta o degradada.

### 3.2 Teacher

**Responsabilidad**: seguimiento del desempeño de sus estudiantes y cohortes; consulta de analítica docente.

**Navegación propia**: `Dashboard`, `Analítica` (`/teacher-analytics`, actualmente inalcanzable — pasa a tener entrada de navegación dedicada). Sin acceso a `/users`.

**Objetivo de experiencia**: el profesor debe llegar a `/teacher-analytics` en un clic desde cualquier pantalla, con la misma naturalidad con la que un admin llega a `/users`. Las rutas hoy compartidas en clave de estudiante (`/courses`, `/progress`) dejan de aparecer en su navegación tal cual, o se adaptan a una vista de docente (ver §6, iteración correspondiente) — no se le muestra un flujo de matrícula/estudiante propio.

### 3.3 Student

**Responsabilidad**: consumo del contenido formativo propio: cursos matriculados, progreso, evaluaciones, logros.

**Navegación propia**: la ya existente (`Dashboard`, `Mis cursos`, `Mi progreso`, `Evaluaciones`, `Certificados`, `Logros`, `Notificaciones`, `Skill Radar`), sin cambios de fondo — es el rol de referencia.

**Objetivo de experiencia**: mantener el nivel actual (ya validado como el más completo) y corregir únicamente lo puntual: el enlace roto a `/calendar` (se retira el CTA o se construye la ruta — decisión de implementación en la iteración correspondiente, no aquí).

---

## 4. Componentes compartidos

**Se mantienen sin cambios de contrato** (ya funcionan como sistema transversal, adopción a extender, no a rediseñar): `PageHeader`, `LoadingState`, `ErrorState`, `EmptyState`, `StatCard`, `Card`/`CardHeader`/`CardBody`, `Button`, `Badge`, `ProgressBar`, `Modal`, `Toast`.

**Deben evolucionar**:

- **`Sidebar`**: su lógica de construcción de enlaces pasa de contemplar dos ramas (`admin`, `student`) a contemplar las tres (`admin`, `teacher`, `student`), cada una con su propia lista de enlaces.
- **Estructura de dashboards por rol** (`AdminDashboard`, `TeacherDashboard`, `StudentDashboard`): pasan a construirse sobre una base común de layout/sección (ver §5), en vez de ser tres implementaciones independientes.
- **`useProtectedRoute`**: su responsabilidad se extiende de "verifica autenticación" a "verifica autenticación y autorización de ruta", sin cambiar su forma de uso en las páginas que ya lo consumen.

**Deben re-situarse, no rediseñarse**: componentes hoy ubicados en el namespace `student` pero consumidos (o candidatos a serlo) desde rutas neutras — el caso confirmado es `SkillProgressList`. La decisión de qué vive en un namespace compartido frente a uno de rol se resuelve por el principio 4 (§2): solo se mueve si la capacidad que representa es igual para los tres roles.

---

## 5. Nuevos componentes

Especificación funcional únicamente — sin diseño visual ni código.

1. **Layout de dashboard compartido.** Estructura común (cabecera de rol, grid de secciones) que los dashboards operativos por rol rellenan con su propio contenido. Resuelve H12 para `AdminDashboard` y `TeacherDashboard`. **Resolución de la Iteración 7 (decisión definitiva de producto):** `StudentDashboard` queda fuera de esta base compartida y mantiene arquitectura propia — responde a un modelo de interacción distinto al de los dashboards operativos.
2. **Guard de ruta por rol.** Mecanismo que, dado el rol del usuario autenticado y la ruta solicitada, decide si el contenido se renderiza o se muestra un estado de acceso denegado. Se apoya en `useProtectedRoute` (extensión, no sustitución — ver §4).
3. **Pantalla/estado de acceso denegado.** Estado dedicado (en la línea de `ErrorState`/`EmptyState`, mismo nivel de tratamiento visual) para cuando el guard de rol bloquea una ruta. Sustituye la dependencia actual del mensaje crudo del backend.
4. **`TEACHER_LINKS`.** Conjunto de enlaces de navegación propio del rol `teacher`, análogo funcionalmente a `ADMIN_LINKS` y `STUDENT_LINKS` ya existentes.

---

## 6. Matriz de permisos

Aplica a todas las rutas bajo `app/(protected)/`. "Ver" = acceso de lectura a la pantalla. "Modificar" = capacidad de cambiar datos ya existentes. "Ejecutar acciones" = operaciones de estado (activar/suspender, publicar, etc.).

| Pantalla | Ver | Modificar información | Ejecutar acciones |
|---|---|---|---|
| `/dashboard` | Los tres (contenido propio de cada rol) | — | — |
| `/courses` | Los tres (vista adaptada por rol — ver §3.2) | Student: ninguna. Teacher/Admin: sin flujo de edición en esta fase (H10 fuera de alcance) | Student: matricularse/continuar curso |
| `/courses/[id]` y flujo de unidad/lección | Student (propio); Teacher/Admin sin acceso a esta fase | — | Student: completar lección/assessment |
| `/enrollments` | Admin, Teacher (consulta) | Admin únicamente | Admin: activar/suspender matrícula |
| `/progress` | Los tres (vista adaptada por rol — ver §3.2) | — | — |
| `/users` | Admin únicamente | Admin únicamente | Admin: gestión de usuarios |
| `/assessments` | Student | — | Student: realizar evaluación |
| `/certificates` | Student | — | Student: descargar/consultar certificado |
| `/achievements` | Student | — | — |
| `/notifications` | Student | — | Student: marcar como leída |
| `/skill-radar` | Student | — | — |
| `/teacher-analytics` | Teacher | — | Teacher: filtrar/exportar analítica |

Regla general derivada de esta matriz: **ningún rol fuera de la columna "Ver" debe poder alcanzar la pantalla**, ni siquiera navegando la URL directamente — esto es lo que el guard de ruta (§5.2) debe garantizar de forma centralizada.

---

## 7. Roadmap

### Bloque A — Control de acceso (base para todo lo demás)

**Iteración A1**
- Objetivo: guard de rol funcionando de forma centralizada.
- Alcance: extensión de `useProtectedRoute` + estado de acceso denegado (§5.2, §5.3).
- Prioridad: alta — bloqueante para el resto de la fase, ya que valida qué rol puede ver qué antes de tocar contenido de pantallas.
- Dependencias: ninguna.

### Bloque B — Navegación

**Iteración B1**
- Objetivo: `teacher` tiene navegación propia y alcanza `/teacher-analytics` sin URL manual.
- Alcance: `TEACHER_LINKS` en `Sidebar` (§5.4), enlace a `/teacher-analytics`.
- Prioridad: alta — resuelve la pantalla huérfana más severa del Volumen I (H2).
- Dependencias: Bloque A (el guard debe existir antes de exponer nuevos enlaces).

**Iteración B2**
- Objetivo: eliminar el enlace roto a `/calendar`.
- Alcance: CTA en `TodayInElevateCard` (student).
- Prioridad: media.
- Dependencias: ninguna.

### Bloque C — Pantallas compartidas mal adaptadas

**Iteración C1**
- Objetivo: `/courses` y `/progress` dejan de presentarse en clave exclusiva de estudiante para teacher/admin.
- Alcance: adaptación de contenido por rol en ambas rutas, según §3.2.
- Prioridad: alta — resuelve H4/H5, afecta a dos de los tres roles en rutas que ya están en su navegación actual.
- Dependencias: Bloque A.

### Bloque D — Design System en Admin

**Iteración D1**
- Objetivo: `AdminDashboard` alcanza el mismo nivel de adopción del Design System que `TeacherDashboard`.
- Alcance: `AdminDashboard` completo (H1).
- Prioridad: alta — es el hallazgo más severo del Volumen I en términos de consistencia visual.
- Dependencias: Bloque E (layout de dashboard compartido), si se decide construir sobre él directamente; en caso contrario, independiente.

**Iteración D2**
- Objetivo: `/enrollments` y `Users.module.css` alcanzan el estándar de tokens y componentes ya usado en `/users` y en las páginas de student.
- Alcance: H8, H9.
- Prioridad: media.
- Dependencias: ninguna.

### Bloque E — Base estructural de dashboards

**Iteración E1**
- Objetivo: los dashboards operativos (`AdminDashboard`, `TeacherDashboard`) comparten layout/sección base.
- Alcance: layout de dashboard compartido (§5.1), refactor de `AdminDashboard` y `TeacherDashboard` sobre esa base.
- Prioridad: media — mejora estructural que consolida el trabajo de los bloques C y D, pero no bloquea su entrega.
- Dependencias: Bloques C y D completados (evita refactorizar dos veces el mismo contenido).
- **Resolución (decisión definitiva de producto, cerrada en la Iteración 7):** `StudentDashboard` queda excluido de esta iteración y de la base compartida — mantiene arquitectura propia. No hay Iteración 7bis pendiente.

---

## 8. Reglas de ejecución

1. **El código como fuente de verdad ante discrepancias con la documentación.** Cuando durante una iteración exista una discrepancia entre la documentación de la fase y el estado real del código, el código será la fuente de verdad para identificar los archivos afectados, siempre que el objetivo funcional de la iteración no cambie. Esta situación no autoriza a ampliar el alcance de la iteración. Si la discrepancia implica modificar archivos no mencionados explícitamente en la documentación, deberás detenerte y solicitar aprobación antes de continuar.

2. **No introducir abstracciones, refactorizaciones o consolidaciones únicamente por similitud de código.** Solo podrán realizarse cuando exista un beneficio funcional o de mantenibilidad demostrado y hayan sido aprobadas explícitamente.

3. **Criterio de cierre de iteración.** Cada iteración termina únicamente cuando se cumplen cuatro condiciones: implementación completada; revisión de arquitectura aprobada; `EXECUTION_LOG.md` actualizado; validación funcional realizada cuando la iteración afecte a la experiencia visual del usuario.

---

**Cierre**: este documento constituye el Volumen II de la fase "Role Experience Polish". Toda iteración de implementación debe remitirse a las decisiones aquí fijadas; cualquier desviación requiere actualizar este documento antes de implementarse.
