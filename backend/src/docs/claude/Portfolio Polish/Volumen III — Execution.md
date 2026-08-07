# Portfolio Polish — Volumen III: Execution

**Fase**: Portfolio Polish
**Documento**: Volumen III de la fase (plan de ejecución técnico)
**Depende de**: `Volumen I — Product Review.md` (aprobado, congelado) y `Volumen II — Blueprint.md` (aprobado, congelado). Este documento no reabre hallazgos ni prioridades — traduce el roadmap del Blueprint §6 a bloques ejecutables, con la granularidad de archivo real necesaria para secuenciarlos sin regresiones.
**Fuera de alcance**: Diseño visual, código, y cualquier decisión de producto o arquitectura no fijada ya en el Blueprint. Si durante la implementación aparece la necesidad de una decisión no cubierta por el Blueprint, este documento no la resuelve — se detiene la iteración y se vuelve al Volumen II.

---

## 1. Bloques de implementación

Mismos 7 bloques del Blueprint §6, con los archivos previsiblemente afectados por hallazgo (citados en el Volumen I).

| Bloque | Hallazgos | Archivos previsiblemente afectados |
|---|---|---|
| **1 — Login** | PR0 | `LoginForm/index.js` |
| **2 — Teacher-analytics** | PR1 | `CohortComparisonTable/index.js`, `InactivityRanking/index.js`, `AssessmentBreakdownTable/index.js`, `StudentWeeklyTrendPanel/index.js`, `TeacherAnalytics.module.css`, `teacher-analytics/page.js` |
| **3 — Superficies de estudiante de un clic** | PR7, PR10 | `AchievementCard/index.js`, `Achievements.module.css` (PR7) · `SkillRadarChart/index.js` (PR10) — dos iteraciones independientes dentro del bloque |
| **4 — Idioma y consistencia admin** | PR3, PR5, PR6, PR13 | `users/page.js`, `enrollments/page.js`, `Enrollments.module.css` |
| **5 — Limpieza de tokens/CSS legacy** | PR4, PR11 | `courses/[id]/units/[unitId]/page.js`, `styles/CourseDetail.module.css` (PR4) · `certificates/page.js` (PR11) |
| **6 — Componentes duplicados** | PR9, PR12, PR14 | `AchievementCard`/`NotificationCard` + sus CSS (PR9) · `progress/StudentProgress.js` (PR12) · `AdminDashboard.module.css`, `TeacherDashboard.module.css` (PR14) |
| **7 — Detalles de jerarquía visual** | PR8, PR15 | `NotificationCard/index.js` (PR8) · `courses/[id]/units/[unitId]/page.js` (PR15) |

Los 15 hallazgos P1+P2 del alcance quedan asignados a un bloque; ninguno queda huérfano (verificado en la autorrevisión, §9).

---

## 2. Dependencias entre bloques

El Blueprint §6 no fija dependencias estrictas entre bloques (son temáticamente independientes). A nivel de archivo, sin embargo, hay **dos solapamientos reales** que si se ejecutan en el orden temático puro generan riesgo de retrabajo:

1. **Bloque 3 (PR7) y Bloque 6 (PR9)** tocan el mismo archivo (`AchievementCard`). El orden temático (3 antes que 6) ya es seguro: PR7 aplica el tratamiento gamificado primero, PR9 consolida la estructura compartida con `NotificationCard` después, sobre una base ya estable. No requiere ajuste.
2. **Bloque 5 (PR4) y Bloque 7 (PR15)** tocan el mismo archivo (`courses/[id]/units/[unitId]/page.js`). El orden temático los separa (5 y 7, con el Bloque 6 en medio), lo que obliga a volver dos veces a un archivo que podría resolverse de una sola vez. **Esto sí requiere ajuste de secuencia** (ver §3).

Fuera de estos dos casos, los bloques son independientes entre sí y no existe dependencia de tipo "el Bloque X no puede empezar sin que termine el Bloque Y" (a diferencia de Role Experience Polish, donde el guard de rol bloqueaba el resto de la fase).

---

## 3. Orden recomendado de ejecución

Se mantiene la prioridad P1→P2 y la lógica de exposición del Blueprint, con un único ajuste técnico: el Bloque 7 se adelanta para ejecutarse inmediatamente después del Bloque 5, evitando dos pasadas sobre el mismo archivo.

1. Bloque 1 — Login (PR0)
2. Bloque 2 — Teacher-analytics (PR1)
3. Bloque 3 — Achievements + Skill-radar (PR7, PR10)
4. Bloque 4 — Idioma y consistencia admin (PR3, PR5, PR6, PR13)
5. Bloque 5 — Limpieza de tokens/CSS legacy (PR4, PR11)
6. Bloque 7 — Detalles de jerarquía visual (PR8, PR15) — **adelantado**, comparte archivo con el Bloque 5
7. Bloque 6 — Componentes duplicados (PR9, PR12, PR14) — se ejecuta al final: es el bloque de mayor superficie de archivos tocados (tres consolidaciones distintas) y el que más se beneficia de que todo lo demás ya esté estable

---

## 4. Riesgos técnicos por bloque

| Bloque | Riesgo técnico |
|---|---|
| 1 — Login | Ninguno estructural: archivo único, sin lógica compartida con otras pantallas. Riesgo bajo. |
| 2 — Teacher-analytics | Cuatro componentes de tabla sin CSS propio dependen hoy de herencia por descendencia desde `TeacherAnalytics.module.css`; al darles CSS propio hay que verificar que no se pierda ningún estilo heredado que no esté documentado como tal. |
| 3 — Achievements + Skill-radar | Skill-radar: cambiar props de Recharts (`stroke`/`fill`/`isAnimationActive`) sin verificar tokens de color puede introducir un color que no exista en la paleta oficial. Achievements: el color por `rarity` requiere una escala nueva (no existe hoy) — riesgo de inventar valores no tokenizados si no se reutiliza la paleta ya definida en `DESIGN_SYSTEM.md`. |
| 4 — Idioma y consistencia admin | Es el bloque que toca más hallazgos a la vez sobre los mismos dos archivos (`users/page.js`, `enrollments/page.js`); riesgo de que un cambio de copy (PR3) interfiera visualmente con el cambio de estado de carga (PR6) si no se prueban juntos antes de commitear. |
| 5 — Limpieza de tokens/CSS legacy | `CourseDetail.module.css` tiene un huérfano de nombre idéntico en `@/styles/` (ya señalado en el Volumen I, incoherencia 1) — riesgo real de editar el archivo equivocado si no se verifica el import real en `page.js` antes de tocar CSS. |
| 7 — Detalles de jerarquía visual | Bajo: cambios acotados (indicador visual, iconos de estado) sin lógica de datos nueva. |
| 6 — Componentes duplicados | El de mayor riesgo técnico del backlog: consolidar `AchievementCard`/`NotificationCard` puede tentar a crear una abstracción compartida no autorizada por el Blueprint (principio 5, Volumen II §2) — el Blueprint no pide unificar los componentes, solo diferenciarlos visualmente. Hay que resolver PR9 sin fusionar ambos componentes en uno solo. |

---

## 5. Estrategia de validación tras cada bloque

Validación mínima obligatoria, igual para los 7 bloques:

1. `npm run lint` en `frontend` — 0 errores (los warnings preexistentes de `no-unused-vars` no bloquean).
2. `npm run build` en `frontend` — compilación exitosa, sin nuevas rutas rotas.
3. Verificación visual manual de la(s) pantalla(s) afectadas por el bloque, en el rol correspondiente (login sin sesión; resto como el rol que las consume según la matriz del Volumen II de Role Experience Polish).
4. Confirmación de que ninguna pantalla fuera del bloque cambió de aspecto (revisión de diff acotada a los archivos previsiblemente afectados listados en §1).

Validación adicional solo cuando aplique:
- **Bloques 2 y 4** (tablas): verificar explícitamente los tres estados — carga, vacío y con datos — no solo el estado con datos.
- **Bloque 3** (skill-radar): verificar que el color usado existe como token en `DESIGN_SYSTEM.md`, no como hex inventado.
- **Bloque 6**: confirmar que `AchievementCard` y `NotificationCard` siguen siendo dos componentes distintos tras la consolidación (no una fusión).

La suite de tests de backend no se ejecuta por bloque (esta fase no toca backend); se reserva como comprobación de cierre de fase completa, junto con el resto de criterios ya fijados en el Volumen II §8.

---

## 6. Estrategia de commits

- **Un commit por bloque**, siempre que sea posible. Si un bloque agrupa dos iteraciones independientes (Bloque 3: achievements + skill-radar), se permite un commit por iteración dentro del bloque en vez de uno solo, ya que no comparten archivo.
- **Mensaje**: `portfolio-polish: <bloque> — <resumen breve>`, referenciando el/los hallazgo(s) resuelto(s). Ejemplos:
  - `portfolio-polish: login — corrige idioma y tono (PR0)`
  - `portfolio-polish: teacher-analytics — CSS propio y EmptyState (PR1)`
- No se mezclan hallazgos de bloques distintos en un mismo commit, ni se hace commit parcial de un bloque a medio resolver salvo que el propio bloque se divida en iteraciones independientes (caso del Bloque 3).
- No se hace commit hasta que la validación de §5 pase completa para ese bloque.

---

## 7. Criterios para detenernos y revisar antes de continuar

1. **Un hallazgo requiere modificar un archivo no listado en §1 para ese bloque.** Señal de que el alcance real es mayor al previsto — se detiene, se confirma, no se amplía por iniciativa propia.
2. **Un hallazgo, al implementarlo, resulta requerir cambio de comportamiento o de datos (no solo visual).** Señal de que excede Portfolio Polish (podría pertenecer a Role Experience Polish o a producto) — se detiene y se reporta.
3. **Lint o build fallan y la causa no es evidente tras un diagnóstico breve.** No se itera a ciegas sobre el error — se detiene y se reporta el fallo tal cual.
4. **Discrepancia entre lo citado en el Volumen I (archivo/línea) y el estado real del código.** El código es la fuente de verdad para localizar el hallazgo, pero eso no autoriza ampliar el alcance de la iteración — se confirma antes de aplicar el cambio.
5. **Tentación de crear una abstracción o componente compartido no pedido por el Blueprint** (riesgo explícito del Bloque 6, §4). Se detiene y se confirma antes de fusionar cualquier componente.

---

## 8. Orden final de ejecución (resumen operativo)

1. Bloque 1 — Login
2. Bloque 2 — Teacher-analytics
3. Bloque 3 — Achievements + Skill-radar
4. Bloque 4 — Idioma y consistencia admin
5. Bloque 5 — Limpieza de tokens/CSS legacy
6. Bloque 7 — Detalles de jerarquía visual
7. Bloque 6 — Componentes duplicados

---

## 9. Autorrevisión crítica

Verificación aplicada contra los tres criterios pedidos:

1. **¿El orden minimiza regresiones?** Sí, con el ajuste de §3: el orden temático puro del Blueprint (1-2-3-4-5-6-7) obligaba a volver dos veces sobre `courses/[id]/units/[unitId]/page.js` (Bloques 5 y 7, con el Bloque 6 en medio). El orden final (§8) adelanta el Bloque 7 justo después del 5, eliminando esa doble pasada. El otro solapamiento detectado (Bloque 3 → Bloque 6, `AchievementCard`) ya estaba en orden seguro sin necesidad de ajuste.
2. **¿Ningún hallazgo P1/P2 queda sin bloque?** Verificado por recuento: 5 P1 + 10 P2 = 15 hallazgos; la tabla de §1 asigna exactamente 15 hallazgos distintos (PR0, PR1, PR3, PR4, PR5, PR6, PR7, PR8, PR9, PR10, PR11, PR12, PR13, PR14, PR15) repartidos en los 7 bloques, sin duplicados ni omisiones.
3. **¿Los bloques son lo bastante pequeños para iteraciones cortas?** Seis de los siete bloques tocan entre 1 y 3 archivos. El único bloque de mayor superficie es el 6 (tres consolidaciones distintas sobre hasta 6 archivos) — por eso se ejecuta último y sus tres hallazgos (PR9, PR12, PR14) pueden tratarse como sub-iteraciones independientes dentro del bloque, con su propio commit cada una, en vez de forzar una sola iteración grande. Se deja esta subdivisión anotada aquí para no tener que reabrir este documento al llegar a ese bloque.

Ningún cambio de esta autorrevisión afecta a las prioridades ni al alcance fijados en el Volumen II — son ajustes de secuencia y granularidad de ejecución, dentro del margen que corresponde a este documento.

---

**Cierre**: este documento constituye el Volumen III de la fase "Portfolio Polish" y es el backlog oficial de ejecución. Cada bloque (o sub-iteración dentro de un bloque, según §9) se implementa en una iteración corta e independiente, en el orden fijado en §8, sin reabrir decisiones del Volumen I o del Volumen II salvo que aparezca un problema grave durante la implementación.

---

## Adenda — Resultado final de Portfolio Polish

Los 7 bloques (§8) se ejecutaron en el orden fijado, sin regresiones (lint y build en verde tras cada iteración). La fase queda **oficialmente cerrada**.

**P1 implementados (5/5)**: PR0, PR1, PR3, PR7, PR10.

**P2 — recuento (10/10, verificado contra Volumen I §4.2)**:
- **Implementados (8)**: PR4, PR5, PR6, PR8, PR11, PR12, PR13, PR15.
- **Cerrado sin código (1)**: PR9 — la diferenciación visual entre `AchievementCard` y `NotificationCard` que pedía el hallazgo quedó resuelta como efecto colateral de PR7 (color por rareza) y PR8 (indicador de no leída), ambos posteriores a la auditoría del Volumen I. Ambos componentes siguen siendo independientes, sin fusión.
- **Diferido (1)**: PR14 — el hallazgo asume la existencia de un componente compartido `ui/Badge`, pero esa carpeta está vacía; el componente nunca se implementó. Crearlo desde cero excede el alcance de "polish" de esta fase y requiere una decisión de producto/diseño explícita en una iteración futura.

8 + 1 + 1 = 10, sin duplicados ni omisiones sobre los 10 hallazgos P2 del Volumen I.
