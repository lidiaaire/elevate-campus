# Portfolio Polish — Volumen II: Blueprint

**Fase**: Portfolio Polish
**Documento**: Volumen II de la fase (segundo documento oficial)
**Depende de**: `Volumen I — Product Review.md` (aprobado y congelado). Este documento no repite hallazgos; cada decisión aquí resuelve uno o más hallazgos (PR0-PR23) ya identificados y clasificados allí.
**Alcance de este documento**: Estrategia de implementación (qué se hace, en qué orden y por qué). No contiene diseño visual ni código.

---

## 1. Objetivo de la fase

Elevar la calidad percibida de portfolio de las pantallas señaladas en el Volumen I, para que ningún visitante (entrevistador técnico, reclutador) encuentre una superficie que transmita "herramienta interna sin terminar" en su primera sesión de uso — sin alterar funcionalidad, arquitectura ni el trabajo ya cerrado de `Role Experience Polish`.

Objetivo explícito de secuenciación: resolver primero lo que un visitante ve con certeza (login, PR0) y lo que ve con mayor probabilidad (rutas a un clic de distancia del dashboard de estudiante), antes que lo que solo ve si navega en profundidad como admin/teacher.

---

## 2. Principios que vamos a seguir

1. **Percepción sobre profundidad técnica.** El criterio de trabajo es "qué ve y siente un visitante", no "qué tan elegante es la solución internamente". No se introducen refactors ni abstracciones nuevas que no resuelvan directamente un hallazgo del Volumen I.
2. **Tono y voz de marca como dimensión propia.** Igual de relevante que el Design System visual. Idioma, copy y coherencia de fecha/marca (PR0, PR3) se tratan como hallazgos de primer nivel, no como un subproducto de "arreglar CSS".
3. **El Design System ya validado es la única fuente de estilo.** Se reutilizan los componentes y tokens que ya funcionan en las pantallas de referencia de student (`EmptyState`, `Badge`, `Card`, tokens de color) — no se inventan patrones nuevos.
4. **Una iteración, un hallazgo (o grupo de hallazgos de la misma pantalla).** No se mezclan hallazgos de pantallas distintas en la misma iteración, aunque compartan naturaleza.
5. **Cambios mínimos y reversibles.** Se corrige lo señalado en el Volumen I; no se aprovecha la iteración para "ya que estamos" tocar código adyacente no citado en un hallazgo.
6. **El Volumen I es la fuente de verdad de qué se hace.** Si durante la implementación aparece un problema grave que contradice un hallazgo o su prioridad, se detiene la iteración y se pide aprobación antes de desviarse — el Volumen I no se reabre por conveniencia.

---

## 3. Alcance

- Los **5 hallazgos P1** del Volumen I: PR0 (login), PR1 (teacher-analytics), PR3 (idioma admin), PR7 (achievements), PR10 (skill-radar).
- Los **10 hallazgos P2**: PR4, PR5, PR6, PR8, PR9, PR11, PR12, PR13, PR14, PR15. Se incluyen porque inciden en la misma dimensión de percepción visual que los P1, con menor probabilidad de exposición pero mismo tipo de impacto.
- Hallazgos **P3 que comparten archivo con un P1/P2 en alcance** (ejemplo: PR16 en `achievements`/`notifications`) podrán resolverse de forma oportunista dentro de esa iteración, sin ser objetivo propio ni justificar una iteración adicional.

---

## 4. Fuera de alcance

- **PR19 y PR21** — ya marcados en el Volumen I como deuda de código sin efecto visual o borderline de accesibilidad/semántica, no de percepción. Quedan registrados pero no se tocan en esta fase.
- **Migración completa de color de marca azul→naranja** — deuda ya documentada en `DESIGN_SYSTEM.md` §10.5, fuera del alcance de Portfolio Polish (ver Volumen I, tensión de color en incoherencia 7).
- **Cualquier hallazgo de navegación, roles o permisos** — pertenece a `Role Experience Polish`, no se reabre aquí.
- **Funcionalidad nueva** — esta fase no añade features (paginación, búsqueda, avatares, etc.), solo pule lo existente.
- **Cambios de dependencias o versión de librerías** (incluida Recharts) — PR10 se resuelve con props de color/animación, no con cambio de librería.
- **PR22 y PR23** — hallazgos P3 del Volumen I que no comparten archivo con ningún P1/P2 en alcance (`TeacherDashboard`, fallback de rol en `dashboard/page.js`), por lo que no se resuelven de forma oportunista como PR16/PR17. Quedan registrados como deuda menor confirmada, sin iteración propia en esta fase.

---

## 5. Priorización

| Prioridad | Hallazgos | Criterio |
|---|---|---|
| **P1** | PR0, PR1, PR3, PR7, PR10 | Alta probabilidad de exposición en primeros 5 minutos (heredado del Volumen I) |
| **P2** | PR4, PR5, PR6, PR8, PR9, PR11, PR12, PR13, PR14, PR15 | Impacto de percepción real pero exposición condicionada a navegación más profunda o como admin/teacher |
| **P3 (oportunista, no objetivo propio)** | PR16, PR17 | Se resuelven solo si aparecen en el mismo archivo que un P1/P2 ya en curso |

---

## 6. Orden de implementación recomendado

### Bloque 1 — Login (cero clics)
- PR0. Máxima prioridad: es la única pantalla que ve el 100% de los visitantes, antes que cualquier otra decisión de producto.

### Bloque 2 — Teacher-analytics (mayor severidad dentro del área protegida)
- PR1. Pantalla con más volumen de datos y menor presentación de producto de todo el frontend.

### Bloque 3 — Superficies de estudiante de un clic
- PR7 (achievements) y PR10 (skill-radar), como dos iteraciones independientes — dominios de producto distintos, sin código compartido.

### Bloque 4 — Idioma y consistencia en pantallas administrativas
- PR3, junto con PR5 y PR6 (mismos archivos: `users/page.js`, `enrollments/page.js`) y PR13 (responsive de `enrollments`, misma pantalla) — se agrupan por archivo, no por tipo de hallazgo.

### Bloque 5 — Limpieza de tokens y CSS legacy
- PR4 (CourseDetail legacy) y PR11 (CEFR hardcodeado) — mismo tipo de deuda (color fuera de tokens), archivos distintos.

### Bloque 6 — Componentes duplicados
- PR9 (Achievement/NotificationCard), PR12 (StatCard duplicado), PR14 (badges reinventados) — consolidación de patrones repetidos, en ese orden por menor a mayor superficie de archivos tocados.

### Bloque 7 — Detalles de jerarquía visual restantes
- PR8 (indicador no leída) y PR15 (iconos de estado en unidad de curso).

**Dependencias entre bloques**: ninguna estricta — cada bloque es independiente y podría reordenarse si aparece una razón de producto. El orden 1→7 sigue exclusivamente el criterio de probabilidad de exposición ya usado en el Volumen I.

---

## 7. Riesgos

1. **Archivos huérfanos con nombre idéntico** (`Courses`, `Progress`, `Assessment`, `Certificates` en `@/styles/`) — riesgo real de editar el archivo equivocado al tocar `CourseDetail.module.css` en el Bloque 5 (ya señalado como incoherencia en el Volumen I). Mitigación: verificar el import real en el `page.js` antes de tocar cualquier CSS de ese namespace.
2. **Scope creep por acumulación de hallazgos "parecidos".** Con 15 hallazgos en alcance, hay tentación de fusionar iteraciones no relacionadas por conveniencia. Mitigación: principio 4 (§2) es innegociable.
3. **Confusión de límites con `Role Experience Polish`.** Algunas pantallas (dashboards admin/teacher) están en el radar de ambas fases. Mitigación: esta fase solo toca percepción visual/tono; cualquier cambio de estructura o navegación se remite a la otra fase.
4. **Congelar el Volumen I y no poder reflejar aprendizajes durante la implementación.** Si aparece un problema grave, se debe frenar y pedir aprobación explícita en vez de improvisar una reclasificación silenciosa.

---

## 8. Criterios para considerar la fase terminada

1. Los 5 hallazgos P1 están resueltos y validados visualmente.
2. Los 10 hallazgos P2 están resueltos, o explícitamente diferidos con justificación documentada (mismo patrón que H10 en Role Experience Polish).
3. Ninguna de las pantallas listadas en el Volumen I §6 ("sensación de CRUD o herramienta interna") sigue perteneciendo a ese grupo.
4. Build, lint y tests permanecen en verde tras cada iteración (sin regresiones).
5. Un registro de ejecución (`EXECUTION_LOG.md`, mismo patrón que Role Experience Polish) queda actualizado iteración a iteración.
6. Aprobación explícita del usuario del cierre de fase.

---

**Cierre**: este documento constituye el Volumen II de la fase "Portfolio Polish". Toda iteración de implementación (Volumen III) debe remitirse a las decisiones aquí fijadas; cualquier desviación requiere actualizar este documento antes de implementarse.
