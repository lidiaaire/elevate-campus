# Role Experience Polish — Volumen III: Execution

**Fase**: Role Experience Polish
**Documento**: Volumen III de la fase (documento oficial de ejecución)
**Depende de**: `Volumen I — Auditoría.md` (aprobado) y `Volumen II — Blueprint.md` (aprobado). Este documento no repite hallazgos ni decisiones ya fijadas en esos dos volúmenes; cada iteración remite a ellos por referencia (Hxx, Bloque, sección).
**Alcance**: Traducir el roadmap del Blueprint (§7) en un backlog de iteraciones de desarrollo, ordenadas para ejecutarse una por conversación.
**Fuera de alcance**: Diseño visual, código, y cualquier decisión de producto o arquitectura no fijada ya en el Blueprint. Si durante la implementación de una iteración surge la necesidad de una decisión no cubierta por el Blueprint, este documento no la resuelve — debe volverse al Volumen II.

---

## Orden de ejecución

El orden sigue la cadena de dependencias fijada en el Blueprint §7 (Bloque A → B → C → D → E), con las dos iteraciones del Bloque B secuenciadas por prioridad y las dos del Bloque D secuenciadas de forma independiente entre sí.

1. Iteración 1 — Guard de rol y acceso denegado
2. Iteración 2 — Navegación propia del rol teacher
3. Iteración 3 — Corrección del enlace roto a `/calendar`
4. Iteración 4 — Adaptación por rol de `/courses` y `/progress`
5. Iteración 5 — `AdminDashboard` alineado al Design System
6. Iteración 6 — Tokens en `/enrollments` y `Users.module.css`
7. Iteración 7 — Layout de dashboard compartido

---

## Iteración 1 — Guard de rol y acceso denegado

**Objetivo**: Establecer un mecanismo central que decida, según el rol del usuario autenticado y la ruta solicitada, si el contenido se renderiza o se muestra un estado de acceso denegado.

**Alcance**: Extensión de `useProtectedRoute` de "verifica autenticación" a "verifica autenticación y autorización de ruta" (Blueprint §4, §5.2), y creación del estado de acceso denegado (Blueprint §5.3). Resuelve H6.

**Componentes afectados**: `useProtectedRoute`, nuevo estado de acceso denegado (mismo nivel de tratamiento que `ErrorState`/`EmptyState`).

**Archivos previsiblemente afectados**:
- `frontend/src/hooks/useProtectedRoute.js`
- Nuevo componente bajo `frontend/src/components/ui/` para el estado de acceso denegado
- Punto de integración del guard en el árbol de rutas protegidas (`frontend/src/app/(protected)/layout.js` o `frontend/src/components/layout/ProtectedLayout/index.js`)

**Dependencias**: Ninguna. Es la iteración bloqueante para el resto de la fase (Blueprint §7, Bloque A).

**Criterios de aceptación**:
- Un usuario autenticado que navega (por URL manual o enlace) a una ruta no permitida para su rol, según la matriz de permisos del Blueprint §6, ve el estado de acceso denegado y no se ejecuta ninguna llamada de datos de esa ruta.
- Un usuario que navega a una ruta permitida para su rol no experimenta ningún cambio de comportamiento respecto al estado actual.
- La forma de uso de `useProtectedRoute` en las páginas que ya lo consumen no cambia.

**Riesgos**:
- Traducir la matriz de permisos del Blueprint §6 a una configuración centralizada sin duplicar lógica de autorización en páginas individuales.
- Bloquear por error una ruta legítimamente compartida por los tres roles (`/dashboard`, `/courses`, `/progress`, `/enrollments`) si la configuración de roles permitidos por ruta es incorrecta.

---

## Iteración 2 — Navegación propia del rol teacher

**Objetivo**: El rol `teacher` alcanza `/teacher-analytics` desde su propia navegación, sin necesidad de URL manual.

**Alcance**: Creación de `TEACHER_LINKS` en `Sidebar`, análogo a `ADMIN_LINKS` y `STUDENT_LINKS` ya existentes, con entrada hacia `/teacher-analytics` (Blueprint §5.4, §7 Bloque B / B1). Resuelve H2, H3.

**Componentes afectados**: `Sidebar`.

**Archivos previsiblemente afectados**:
- `frontend/src/components/layout/Sidebar/index.js`

**Dependencias**: Iteración 1 (el guard de rol debe existir antes de exponer nuevos enlaces de navegación, según Blueprint §7).

**Criterios de aceptación**:
- La lógica de construcción de enlaces de `Sidebar` contempla las tres ramas (`admin`, `teacher`, `student`), no solo dos.
- Un usuario con rol `teacher` ve en su `Sidebar` una entrada hacia `/teacher-analytics` y llega a la pantalla en un clic.
- Un usuario con rol `teacher` no ve en su `Sidebar` la entrada a `/users`.
- Los roles `admin` y `student` no ven cambios en su propia lista de enlaces.

**Riesgos**:
- Inconsistencia de iconografía, orden o convención visual respecto a `ADMIN_LINKS`/`STUDENT_LINKS` si `TEACHER_LINKS` no sigue el mismo patrón.
- Verificar que `BottomNav` (exclusivo de `student`, H11) no se vea afectado por el cambio en `Sidebar`.

---

## Iteración 3 — Corrección del enlace roto a `/calendar`

**Objetivo**: Eliminar el destino roto hacia `/calendar` visible en el dashboard de estudiante.

**Alcance**: Retirada (o corrección, según se decida al implementar) del CTA en `TodayInElevateCard` que apunta a `/calendar` (Blueprint §3.3, §7 Bloque B / B2). Resuelve H7.

**Componentes afectados**: `TodayInElevateCard`.

**Archivos previsiblemente afectados**:
- `frontend/src/components/dashboard/student/TodayInElevateCard/index.js`

**Dependencias**: Ninguna.

**Criterios de aceptación**:
- No queda en el proyecto ningún enlace visible que apunte a `/calendar`.
- `TodayInElevateCard` sigue mostrando el resto de su contenido sin el CTA roto, sin dejar huecos de layout sin resolver.

**Riesgos**:
- Riesgo puramente visual: la tarjeta puede quedar desequilibrada si pierde su único CTA sin sustituirlo por otro elemento.

---

## Iteración 4 — Adaptación por rol de `/courses` y `/progress`

**Objetivo**: `/courses` y `/progress` dejan de presentarse en clave exclusiva de estudiante cuando las sirven a `teacher` o `admin`.

**Alcance**: Adaptación de contenido por rol en ambas rutas, según los principios de "compartir por capacidad, no por conveniencia" y separar por rol cuando el contenido difiere en fondo (Blueprint §2.4, §3.2, §7 Bloque C / C1). Incluye la evaluación de si `SkillProgressList` debe resituarse fuera del namespace `student` (Blueprint §4). Resuelve H4, H5.

**Componentes afectados**: página `/courses`, página `/progress`, `SkillProgressList`.

**Archivos previsiblemente afectados**:
- `frontend/src/app/(protected)/courses/page.js`
- `frontend/src/app/(protected)/progress/page.js`
- `frontend/src/components/dashboard/student/SkillProgressList` (posible resituación de namespace)

**Dependencias**: Iteración 1 (Bloque A, según Blueprint §7).

**Criterios de aceptación**:
- Un usuario con rol `teacher` o `admin` que abre `/courses` o `/progress` ve contenido coherente con su rol, sin textos en primera persona de estudiante ni flujo de matrícula.
- Un usuario con rol `student` no experimenta ningún cambio de fondo en `/courses` ni `/progress` respecto al estado actual.
- Si `SkillProgressList` se resitúa de namespace, su comportamiento para `student` permanece idéntico.

**Riesgos**:
- Mayor alcance por tocar dos rutas ya en uso por los tres roles.
- Riesgo de introducir ramas condicionales frágiles dentro de un mismo componente en lugar de separar por rol cuando el contenido difiere en fondo, en contra del principio 4 del Blueprint.
- Riesgo de regresión sobre la experiencia de `student`, ya validada como la más completa de las tres.

---

## Iteración 5 — `AdminDashboard` alineado al Design System

**Objetivo**: `AdminDashboard` alcanza el mismo nivel de adopción del Design System que `TeacherDashboard`.

**Alcance**: Reconstrucción de `AdminDashboard` con los componentes ya estandarizados (`PageHeader`, `LoadingState`, `ErrorState`, `StatCard`, `Card`/`CardHeader`/`CardBody`) y módulo CSS propio (Blueprint §3.1, §7 Bloque D / D1). Resuelve H1.

**Componentes afectados**: `AdminDashboard`.

**Archivos previsiblemente afectados**:
- `frontend/src/components/dashboard/admin/AdminDashboard/index.js`
- Nuevo `frontend/src/components/dashboard/admin/AdminDashboard/AdminDashboard.module.css`

**Dependencias**: Ninguna de forma estricta en este punto del backlog. El Blueprint (§7, D1) contempla una dependencia condicional con el Bloque E (layout de dashboard compartido) solo si se decide construir directamente sobre él; en este backlog, E se ejecuta después, por lo que esta iteración se resuelve de forma independiente y podrá ajustarse en la Iteración 7.

**Criterios de aceptación**:
- `AdminDashboard` no contiene HTML sin clase ni estados de carga/error como texto plano.
- `AdminDashboard` usa los mismos átomos visuales (`PageHeader`, `StatCard`, `Card`, `LoadingState`, `ErrorState`) que `TeacherDashboard`.
- El título y los textos de la pantalla son consistentes en idioma y tono con el resto de la aplicación.

**Riesgos**:
- Trabajo potencialmente revisado una segunda vez cuando se construya el layout compartido en la Iteración 7 — riesgo ya asumido explícitamente por el propio Blueprint.

---

## Iteración 6 — Tokens en `/enrollments` y `Users.module.css`

**Objetivo**: `/enrollments` y `Users.module.css` alcanzan el estándar de tokens y componentes ya usado en `/users` y en las páginas de `student`.

**Alcance**: Sustitución de HTML sin clase, colores hardcodeados y valores no tokenizados por los componentes y tokens ya estandarizados (Blueprint §7 Bloque D / D2). Resuelve H8, H9.

**Componentes afectados**: página `/enrollments`, hoja de estilos `Users.module.css`.

**Archivos previsiblemente afectados**:
- `frontend/src/app/(protected)/enrollments/page.js`
- `frontend/src/styles/Users.module.css`

**Dependencias**: Ninguna.

**Criterios de aceptación**:
- `/enrollments` usa `PageHeader`, `LoadingState` y `EmptyState` en lugar de HTML plano equivalente.
- No queda ningún color hardcodeado inline en `/enrollments`.
- `Users.module.css` no contiene fallbacks hex crudos ni valores de espaciado/radio no tokenizados; usa las variables de espaciado, radio y color ya definidas en el Design System.

**Riesgos**:
- Cambios visuales en una tabla ya en producción (`/users`) pueden requerir revisión de contraste tras reemplazar valores hex hardcodeados por tokens.

---

## Iteración 7 — Layout de dashboard compartido

**Objetivo**: Los dashboards operativos (`AdminDashboard`, `TeacherDashboard`) se construyen sobre una base común de layout/sección, sin perder sus diferencias de contenido por rol.

**Alcance**: Creación del layout de dashboard compartido y refactor de `AdminDashboard` y `TeacherDashboard` sobre esa base (Blueprint §5.1, §7 Bloque E / E1). Resuelve H12 para los dashboards operativos.

**Componentes afectados**: nuevo layout de dashboard compartido, `AdminDashboard`, `TeacherDashboard`.

**Archivos afectados**:
- Nuevo componente de layout bajo `frontend/src/components/dashboard/DashboardLayout/` (base compartida, exclusivamente infraestructura visual: wrapper, `PageHeader`, `DashboardSection`, grids de `StatCard`)
- `frontend/src/components/dashboard/admin/AdminDashboard/index.js` y `AdminDashboard.module.css`
- `frontend/src/components/dashboard/teacher/TeacherDashboard/index.js` y `TeacherDashboard.module.css`

**Dependencias**: Iteraciones 4 y 5 completadas (Bloques C y D, según Blueprint §7, para evitar refactorizar dos veces el mismo contenido).

**Criterios de aceptación**:
- `AdminDashboard` y `TeacherDashboard` se construyen sobre la misma estructura de layout/sección.
- Ninguno de los dos pierde contenido o funcionalidad específica de su rol.
- No se unifica lógica de datos ni listas de alumnos entre `admin` y `teacher`.

**Resolución de arquitectura (decisión definitiva de producto)**: `StudentDashboard` queda excluido del alcance de esta iteración y de la base compartida. La fase ha demostrado que `StudentDashboard` responde a un modelo de interacción distinto al de los dashboards operativos y mantiene arquitectura propia, incluidos sus estados dedicados (`EmptyDashboard`, `CompletedDashboard`, `DashboardSkeleton`), que no se ven afectados. No se planifica una Iteración 7bis. Esta resolución actualiza el objetivo 5 del Blueprint §1 y la Iteración E1 del Blueprint §7.

**Riesgos**:
- Riesgo de regresión sobre comportamiento ya validado en `admin`/`teacher` al tocar ambos dashboards simultáneamente. Mitigado: build de producción verificado tras el refactor.

---

**Cierre**: este documento constituye el Volumen III de la fase "Role Experience Polish" y es el backlog oficial de ejecución. Cada iteración debe implementarse en una conversación independiente, en el orden aquí fijado, sin reabrir decisiones ya tomadas en el Volumen II salvo que se actualice explícitamente ese documento antes de implementar.
