# Elevate Your English Campus — Design System

**Versión**: 2.0  
**Estado**: Activo  
**Mantenido por**: Frontend Engineering

---

## Índice

1. [Filosofía visual](#1-filosofía-visual)
2. [Principios del Design System](#2-principios-del-design-system)
3. [Arquitectura de tokens](#3-arquitectura-de-tokens)
4. [Referencia de tokens](#4-referencia-de-tokens)
5. [Reglas de uso de tokens](#5-reglas-de-uso-de-tokens)
6. [Convenciones para nuevos componentes](#6-convenciones-para-nuevos-componentes)
7. [Qué está permitido y qué no](#7-qué-está-permitido-y-qué-no)
8. [Guía de consistencia para contribuciones](#8-guía-de-consistencia-para-contribuciones)
9. [Tokens deprecados y migración](#9-tokens-deprecados-y-migración)
10. [Identidad de marca Elevate](#10-identidad-de-marca-elevate)

---

## 1. Filosofía visual

Elevate Your English Campus es una plataforma educativa SaaS dirigida a estudiantes de inglés y sus docentes. La interfaz debe transmitir:

- **Claridad sobre creatividad**: la información académica (progreso, notas, tareas) es el protagonista. La UI no compite con el contenido.
- **Confianza profesional**: paleta contenida, tipografía legible, jerarquía visual clara. Sin gradientes agresivos ni decoración innecesaria.
- **Densidad funcional**: las vistas de teacher y admin muestran tablas, métricas y listas. El sistema debe soportar densidad sin sacrificar legibilidad.
- **Accesibilidad no negociable**: contraste mínimo WCAG AA (4.5:1 para texto, 3:1 para elementos interactivos). Focus visible en todos los elementos.

La estética de referencia ya no es la de un SaaS de productividad genérico. Sigue la identidad propia de Elevate Your English (ver §10): superficies claras para contenido de lectura prolongada, grafito/negro como color funcional de alto contraste, y el naranja de marca (`#FF5722`) como acento único por vista — nunca decoración repetida ni fondo extenso.

---

## 2. Principios del Design System

### 2.1 Tokens primero

Ningún valor visual (color, tamaño, radio, sombra, duración) se escribe directamente en un componente. Todo valor debe existir primero como token en `globals.css`. Si el token no existe, se crea el token y luego se usa.

**Incorrecto:**
```css
.card { border-radius: 12px; }
```

**Correcto:**
```css
.card { border-radius: var(--radius-lg); }
```

### 2.2 Semántica sobre valor

Se prefieren los tokens semánticos (que describen el propósito) sobre los tokens de valor crudo (que describen el píxel). Cuando existan ambos, usar el semántico.

**Evitar:**
```css
color: var(--danger-600);  /* valor crudo */
```

**Preferir:**
```css
color: var(--text-danger);  /* semántico — cuando exista */
```

### 2.3 Un sistema, no excepciones

Si un componente necesita un valor que no existe en el sistema, la respuesta correcta no es hardcodearlo: es proponer el nuevo token, revisarlo y añadirlo a `globals.css`. Las excepciones crean deuda.

### 2.4 Composición sobre complejidad

Los componentes base (`Button`, `Card`, `Badge`, `Input`) deben ser simples y componibles. La complejidad vive en los componentes de dominio que los componen, no en los base.

### 2.5 Accesibilidad por defecto

Los estados de focus, hover, y disabled no son opcionales. Todo elemento interactivo debe tener los tres implementados con los tokens del sistema.

---

## 3. Arquitectura de tokens

Los tokens se definen en una única fuente de verdad:

```
frontend/src/styles/globals.css
```

Se organizan en dos capas:

| Capa | Descripción | Ejemplo |
|------|-------------|---------|
| **Primitivos** | Valores atómicos (la paleta completa) | `--brand-500: #3b82f6` |
| **Semánticos** | Referencias a primitivos con significado de UI | `--border-focus: var(--brand-500)` |

Regla: los componentes solo deben referenciar tokens semánticos. Los tokens primitivos son para construir los semánticos, no para uso directo en componentes.

> **Excepción conocida**: hasta completar la migración v2.0, algunos componentes referencian primitivos directamente. Esto se corrige en Fase 1.

---

## 4. Referencia de tokens

### 4.1 Color — Fondos

| Token | Valor | Uso |
|-------|-------|-----|
| `--bg-page` | `#f8fafc` | Fondo de la página (body, layout raíz) |
| `--bg-surface` | `#ffffff` | Superficies elevadas: cards, modales, dropdowns |
| `--bg-subtle` | `#f1f5f9` | Fondos de tablas alt-row, tooltips, badges neutros |
| `--bg-hover` | `rgba(15, 23, 42, 0.04)` | Hover sobre elementos de lista o fila |
| `--bg-active` | `rgba(15, 23, 42, 0.08)` | Estado activo / pressed |

### 4.2 Color — Texto

| Token | Valor | Uso |
|-------|-------|-----|
| `--text-display` | `#0f172a` | Títulos de página (h1, display) |
| `--text-primary` | `#1e293b` | Texto principal: párrafos, labels, cuerpo |
| `--text-secondary` | `#475569` | Texto secundario, descripciones, metadatos |
| `--text-muted` | `#94a3b8` | Placeholders, timestamps, texto deshabilitado |
| `--text-inverse` | `#ffffff` | Texto sobre fondos oscuros (sidebar, botón primary) |

### 4.3 Color — Brand (Blue)

El color primario de la plataforma. Usar `--brand-500` como referencia principal.

| Token | Valor |
|-------|-------|
| `--brand-50` | `#eff6ff` |
| `--brand-200` | `#bfdbfe` |
| `--brand-300` | `#93c5fd` |
| `--brand-400` | `#60a5fa` |
| `--brand-500` | `#3b82f6` ← primario |
| `--brand-600` | `#2563eb` |
| `--brand-700` | `#1d4ed8` |
| `--brand-950` | `#172554` |

### 4.4 Color — Semánticos de estado

| Token | Valor | Uso |
|-------|-------|-----|
| `--success-500` | `#22c55e` | Estados positivos, completado, aprobado |
| `--danger-500` | `#ef4444` | Errores, fallido, peligro |
| `--warning-500` | `#f59e0b` | Advertencias, pendiente, borrador |

Escala completa: `--{success|danger|warning}-{50|200|300|400|500|600|700|800}`

### 4.5 Color — Bordes e interacción

| Token | Valor | Uso |
|-------|-------|-----|
| `--border-default` | `#e2e8f0` | Borde estándar de cards, inputs, separadores |
| `--border-strong` | `#cbd5e1` | Borde con mayor contraste |
| `--border-focus` | `#3b82f6` | Borde de elementos con foco |
| `--color-focus-ring` | `rgba(59, 130, 246, 0.4)` | Outline de focus accesible |
| `--focus-ring` | `0 0 0 3px var(--color-focus-ring)` | Box-shadow completo para focus |

### 4.6 Tipografía

Base: **16px** (`1rem`). La escala es `Major Second` (×1.125) con ajustes pragmáticos.

**Tamaños:**

| Token | Valor rem | Valor px | Uso típico |
|-------|-----------|----------|------------|
| `--font-size-xs` | `0.75rem` | 12px | Labels auxiliares, badges, timestamps |
| `--font-size-sm` | `0.875rem` | 14px | Texto secundario, table cells, metadatos |
| `--font-size-base` | `1rem` | 16px | Texto principal del cuerpo |
| `--font-size-lg` | `1.125rem` | 18px | Subtítulos de sección, card titles |
| `--font-size-xl` | `1.25rem` | 20px | Títulos de página secundarios |
| `--font-size-2xl` | `1.5rem` | 24px | Títulos de página principales |
| `--font-size-3xl` | `1.875rem` | 30px | Display, stats grandes |
| `--font-size-4xl` | `2.25rem` | 36px | Hero, números de dashboard |

**Pesos:**

| Token | Valor | Uso |
|-------|-------|-----|
| `--font-weight-normal` | `400` | Cuerpo de texto |
| `--font-weight-medium` | `500` | Labels, nav items, table headers |
| `--font-weight-semibold` | `600` | Títulos de card, botones |
| `--font-weight-bold` | `700` | Títulos de página, valores de stats |

**Interlineado:**

| Token | Valor | Uso |
|-------|-------|-----|
| `--line-height-tight` | `1.2` | Títulos grandes (display, h1) |
| `--line-height-snug` | `1.35` | Subtítulos, headings medianos |
| `--line-height-normal` | `1.5` | Cuerpo de texto, párrafos |
| `--line-height-relaxed` | `1.65` | Texto largo, instrucciones |

**Tracking (letter-spacing):**

| Token | Valor | Uso |
|-------|-------|-----|
| `--letter-spacing-tight` | `-0.025em` | Títulos grandes |
| `--letter-spacing-normal` | `-0.01em` | Texto general |
| `--letter-spacing-wide` | `0.025em` | Labels uppercase, badges |

**Familias:**

| Token | Valor |
|-------|-------|
| `--font-family-sans` | `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif` |
| `--font-family-mono` | `ui-monospace, "JetBrains Mono", "Fira Code", monospace` |

### 4.7 Espaciado

Escala de 4pt grid. Nomenclatura numérica donde N = N × 4px.

| Token | Valor rem | Valor px |
|-------|-----------|----------|
| `--space-px` | `1px` | 1px |
| `--space-0-5` | `0.125rem` | 2px |
| `--space-1` | `0.25rem` | 4px |
| `--space-1-5` | `0.375rem` | 6px |
| `--space-2` | `0.5rem` | 8px |
| `--space-2-5` | `0.625rem` | 10px |
| `--space-3` | `0.75rem` | 12px |
| `--space-4` | `1rem` | 16px |
| `--space-5` | `1.25rem` | 20px |
| `--space-6` | `1.5rem` | 24px |
| `--space-8` | `2rem` | 32px |
| `--space-10` | `2.5rem` | 40px |
| `--space-12` | `3rem` | 48px |
| `--space-16` | `4rem` | 64px |

### 4.8 Border Radius

| Token | Valor | Uso típico |
|-------|-------|------------|
| `--radius-xs` | `4px` | Badges pequeños, tags |
| `--radius-sm` | `6px` | Botones, inputs, chips |
| `--radius-md` | `8px` | Cards pequeñas, dropdowns |
| `--radius-lg` | `12px` | Cards estándar, modales |
| `--radius-xl` | `16px` | Cards grandes, paneles |
| `--radius-full` | `9999px` | Pills, avatares, toggles |

### 4.9 Sombras

| Token | Valor | Uso |
|-------|-------|-----|
| `--shadow-sm` | `0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)` | Cards en reposo |
| `--shadow-md` | `0 4px 16px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.05)` | Cards en hover, dropdowns |
| `--shadow-lg` | `0 8px 24px rgba(0,0,0,0.10), 0 4px 10px rgba(0,0,0,0.06)` | Popovers, drawers |
| `--shadow-xl` | `0 25px 50px rgba(15,23,42,0.18), 0 8px 20px rgba(15,23,42,0.08)` | Modales, dialogs |

### 4.10 Layout

| Token | Valor | Uso |
|-------|-------|-----|
| `--layout-sidebar-width` | `240px` | Ancho del sidebar expandido |
| `--layout-sidebar-collapsed` | `64px` | Ancho del sidebar colapsado |
| `--layout-navbar-height` | `56px` | Alto del navbar |
| `--layout-content-max-width` | `1280px` | Ancho máximo del área de contenido |
| `--layout-content-padding` | `var(--space-6)` | Padding horizontal del contenido |
| `--layout-section-gap` | `var(--space-6)` | Gap entre secciones verticales |

### 4.11 Z-index

| Token | Valor | Uso |
|-------|-------|-----|
| `--z-content` | `0` | Contenido base |
| `--z-overlay` | `10` | Overlays de contenido |
| `--z-dropdown` | `20` | Dropdowns, selects |
| `--z-navbar` | `30` | Barra de navegación |
| `--z-sidebar` | `40` | Sidebar |
| `--z-tooltip` | `50` | Tooltips |
| `--z-backdrop` | `100` | Backdrop de modal |
| `--z-modal` | `101` | Modal / Dialog |
| `--z-toast` | `200` | Notificaciones Toast |

### 4.12 Animación

**Duraciones:**

| Token | Valor | Uso |
|-------|-------|-----|
| `--dur-fast` | `100ms` | Micro-interacciones (hover states) |
| `--dur-normal` | `150ms` | Transiciones estándar |
| `--dur-slow` | `250ms` | Animaciones de entrada/salida |

**Easing:**

| Token | Valor | Uso |
|-------|-------|-----|
| `--ease-default` | `ease` | Transiciones genéricas |
| `--ease-out` | `ease-out` | Elementos que entran a pantalla |
| `--ease-bounce` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Toggles, checkboxes, microanimaciones |

---

## 5. Reglas de uso de tokens

### 5.1 Color

- **Texto sobre fondo blanco**: usar `--text-primary` o `--text-secondary`. Nunca gris hardcodeado.
- **Color primario**: siempre `--brand-500` o sus variantes de escala. Nunca `#3b82f6` literal.
- **Estados de feedback**: `--success-*`, `--danger-*`, `--warning-*`. Nunca verde/rojo/amarillo hardcodeados.
- **Hover sobre superficies**: usar `--bg-hover`. Nunca `opacity: 0.9` sobre el color base como sustituto.
- **Focus ring**: siempre `var(--focus-ring)` como `box-shadow` o `var(--color-focus-ring)` como `outline-color`.

### 5.2 Tipografía

- **Tamaño mínimo de texto legible**: `--font-size-xs` (12px). Nunca menos.
- **Texto de cuerpo**: siempre `--font-size-base` (16px) como referencia. El contexto puede reducir a `--font-size-sm` en tablas densas.
- **Nunca `px` directo** para font-size: usar siempre tokens o `rem` si el token no cubre el caso (y proponer el token).

### 5.3 Espaciado

- **Padding/margin**: siempre `var(--space-*)`. Nunca valores `rem` o `px` hardcodeados.
- **Gap en grid/flex**: siempre `var(--space-*)`.
- **Excepción**: `border-width: 1px` y `outline-width: 2px` o `3px` son aceptables hardcodeados (son valores absolutos estructurales).

### 5.4 Sombras

- **Componentes en reposo**: `--shadow-sm`.
- **Componentes en hover**: `--shadow-md`.
- **Elementos flotantes** (dropdowns, popovers): `--shadow-lg`.
- **Capas de modal**: `--shadow-xl`.
- **Nunca** escribir `rgba(...)` directamente en un componente.

### 5.5 Transiciones

```css
/* Patrón estándar para transiciones */
transition: <propiedad> var(--dur-normal) var(--ease-default);

/* Para hover sobre superficies (más rápido) */
transition: background-color var(--dur-fast) var(--ease-default);
```

---

## 6. Convenciones para nuevos componentes

### 6.1 Estructura de archivos

Cada componente base vive en `src/components/ui/<NombreComponente>/`:

```
ComponenteName/
├── index.js          ← re-export: export { ComponentName } from './ComponentName'
├── ComponentName.jsx ← implementación
└── ComponentName.module.css
```

Los componentes de dominio (fuera de `ui/`) pueden tener la misma estructura pero no son parte del Design System.

### 6.2 Nombrado de clases CSS

- **camelCase** dentro de CSS Modules: `.cardHeader`, `.iconSlot`, `.isActive`
- **Prefijo `is-`** para estados: `.isLoading`, `.isDisabled`, `.isSelected`
- **Prefijo `has-`** para modificadores estructurales: `.hasIcon`, `.hasBadge`
- Evitar nombres genéricos como `.wrapper`, `.container`, `.inner` sin contexto.

### 6.3 Props de variante

Los componentes con variantes visuales reciben una prop `variant` y una prop `size`:

```jsx
<Button variant="primary" size="md" />
<Card variant="elevated" size="lg" />
<Badge variant="success" />
```

Los valores de variant y size se aplican como clases CSS adicionales en el módulo:

```css
.primary { ... }
.secondary { ... }
.sm { ... }
.md { ... }
```

### 6.4 Estados interactivos obligatorios

Todo componente interactivo debe implementar:

| Estado | CSS requerido |
|--------|---------------|
| `:hover` | Cambio visual claro (background, shadow, transform leve) |
| `:focus-visible` | `box-shadow: var(--focus-ring)` o `outline: 2px solid var(--border-focus)` |
| `[disabled]` / `.isDisabled` | `opacity: 0.5; cursor: not-allowed; pointer-events: none` |
| `[aria-busy]` / `.isLoading` | Spinner o skeleton visible |

### 6.5 Accesibilidad mínima

- Los botones que solo muestran un icono necesitan `aria-label`.
- Los modales necesitan `role="dialog"`, `aria-modal="true"`, y trampa de foco.
- Los formularios necesitan `<label>` asociado por `htmlFor`/`id` o `aria-label`.
- Los estados de carga deben tener `aria-live` o `role="status"`.

---

## 7. Qué está permitido y qué no

### ✅ Permitido

- Usar cualquier token definido en `globals.css` mediante `var(--token-name)`.
- Usar `1px` hardcodeado para `border-width` y `outline-width`.
- Usar `100%`, `100vh`, `100dvh` para dimensiones de layout.
- Usar `currentColor` para heredar color en iconos SVG.
- Proponer un nuevo token si el valor es recurrente (mínimo 3 usos en distintos componentes).
- Usar `calc()` combinando tokens: `calc(var(--space-4) + var(--space-2))`.
- Usar `0` sin unidades para border-radius, padding, margin cuando el valor es cero.

### ❌ No permitido

| Práctica | Alternativa |
|----------|-------------|
| `color: #3b82f6` | `color: var(--brand-500)` |
| `font-size: 14px` | `font-size: var(--font-size-sm)` |
| `padding: 1rem` | `padding: var(--space-4)` |
| `border-radius: 8px` | `border-radius: var(--radius-md)` |
| `box-shadow: 0 1px 3px rgba(...)` | `box-shadow: var(--shadow-sm)` |
| `transition: all 0.15s ease` | `transition: all var(--dur-normal) var(--ease-default)` |
| `z-index: 100` | `z-index: var(--z-backdrop)` |
| `outline: 3px solid rgba(59,130,246,0.4)` | `box-shadow: var(--focus-ring)` |
| Importar estilos de dominio en componentes `ui/` | Mantener `ui/` libre de dependencias de dominio |
| Usar `!important` | Revisar la especificidad y reestructurar |
| Variables CSS locales con valores hardcodeados | Referenciar tokens globales |

---

## 8. Guía de consistencia para contribuciones

### 8.1 Antes de crear un componente nuevo

1. Verificar que no existe ya en `src/components/ui/`.
2. Verificar que no existe ya en `src/components/<dominio>/` y podría generalizarse.
3. Definir qué variantes, tamaños y estados tendrá antes de escribir código.
4. Comprobar que todos los valores visuales del nuevo componente tienen token en `globals.css`.

### 8.2 Antes de añadir un valor visual nuevo

1. Buscar en `globals.css` si existe un token equivalente.
2. Si no existe, proponer el token en el PR con justificación.
3. Si el valor es un caso único y no recurrente, buscar el token más cercano (ejemplo: necesitas `14px` de padding → usa `--space-3` = 12px o `--space-4` = 16px, elige el más apropiado semánticamente).

### 8.3 Checklist de PR para componentes UI

- [ ] Usa solo tokens de `globals.css` (sin valores hardcodeados)
- [ ] Tiene estados `:hover`, `:focus-visible`, y `[disabled]` implementados
- [ ] Las clases CSS siguen la convención camelCase con prefijos `is-`/`has-`
- [ ] El componente exporta desde `index.js`
- [ ] No importa de ningún componente de dominio ni página
- [ ] Los colores de texto cumplen contraste WCAG AA mínimo

### 8.4 Checklist de PR para páginas y componentes de dominio

- [ ] No hay valores hardcodeados: colores, tamaños, radios, sombras, duraciones
- [ ] Usa componentes de `ui/` donde aplique (no reimplementa Button, Card, Badge, etc.)
- [ ] El layout responde correctamente en los breakpoints definidos

---

## 9. Tokens deprecados y migración

**Actualizado en Fase 6.** Al auditar los consumidores reales de cada token deprecado (no solo su presencia por `grep`, sino confirmando que el archivo que los referenciaba estuviera realmente importado por algún componente), se descubrió que 12 de los 13 tokens originales no tenían ningún consumidor real: su único "uso" estaba en `frontend/src/styles/Dashboard.module.css`, un CSS Module huérfano sin ningún `import` en todo el proyecto (ver nota de archivos huérfanos en § 10.6). Esos 12 tokens se eliminaron de `globals.css` en esta fase.

| Token deprecado | Estado |
|-----------------|--------|
| `--color-text-secondary` | Se mantiene temporalmente. Tenía un único consumidor real (`ErrorState.module.css`), ya migrado en Fase 6 a `var(--text-secondary)` directamente. El token queda sin consumo, pendiente de una fase de retirada explícita. |
| `--color-accent`, `--color-accent-soft`, `--color-bg`, `--color-surface`, `--color-border`, `--color-border-soft`, `--color-text-primary`, `--color-text-muted`, `--shadow-card`, `--shadow-hover`, `--transition-fast`, `--transition-base` | **Eliminados en Fase 6** — 0 consumidores reales confirmados. |

### Proceso de eliminación de un token deprecado

1. Buscar en el proyecto todas las referencias al token con `grep -r "token-name" src/`.
2. **Confirmar que cada archivo encontrado está realmente importado** por algún componente o página (no asumir por la sola presencia del texto — ver § 10.6).
3. Sustituir cada referencia real por el token recomendado.
4. Verificar visualmente que no hay regresiones.
5. Eliminar el token del bloque de deprecados en `globals.css`.
6. Documentar la eliminación en el PR.

---

## 10. Identidad de marca Elevate

### 10.1 Paleta oficial

La identidad visual de Elevate Your English define cuatro colores oficiales, independientes de la paleta funcional (`--brand-*`, azul) usada hoy en producción:

| Color | Valor | Rol |
|-------|-------|-----|
| Negro profundo | `#0F1115` | Superficie de marca primaria (oscura) |
| Gris oscuro | `#2A2D33` | Superficie de marca secundaria (oscura, elevada) |
| Blanco/gris claro | `#F4F5F7` | Superficie de marca clara |
| Naranja | `#FF5722` | Acento de marca — símbolo, foco, CTA puntual |

Tokens en `globals.css` (bloque "Elevate Identity v3"):

```css
--elevate-accent-500:               #FF5722; /* corregido en Fase 1 */
--elevate-surface-brand-primary:    #0F1115; /* nuevo, en reposo */
--elevate-surface-brand-secondary:  #2A2D33; /* nuevo, en reposo */
--elevate-surface-brand-light:      #F4F5F7; /* nuevo, en reposo */
```

### 10.2 Regla de uso del naranja

> **SUPERSEDIDA desde la iteración Dark Theme Global (§10.8, 2026-08-12).**
> La regla original — "el naranja es un acento único por vista, nunca un color dominante" — se calibró para un sistema con superficies blancas, donde el naranja necesitaba dosificarse para no verse gratuito. Con el sistema dark global el naranja pasa a ser el color funcional habitual de progreso, CTA y selección: puede aparecer varias veces por vista (p. ej. el Student Dashboard combina barra de progreso del hero, barra del curso activo y dos barras de objetivos, todas naranjas). Lo que sigue vigente: **no se usa como fondo extenso de página ni de card completa** — vive en barras, botones, chips, focos y highlights puntuales, nunca como superficie dominante.

### 10.3 Superficies de marca vs. superficies de trabajo

> **SUPERSEDIDA desde §10.8.** Ya no existe esa distinción: con el sistema dark global, `--bg-page`/`--bg-surface`/`--bg-subtle` (superficies de trabajo) se derivan directamente de `--elevate-surface-brand-primary` — son la misma superficie de marca, no una alternativa clara para "no competir con la lectura". Toda la app, incluida la superficie de trabajo, es ahora superficie de marca.

### 10.4 Estado por fase

| Fase | Alcance | Estado |
|------|---------|--------|
| 1 — Fundamentos | Tokens oficiales, símbolo SVG, favicon | ✅ Completada |
| 2 — Sidebar de marca | Superficie oscura oficial, símbolo + wordmark, estado activo naranja | ✅ Completada |
| 3 — CTA de marca | Variante `Button accent`, aplicada a CTAs de alta intención | ✅ Completada |
| 3.1 — Jerarquía Dashboard | Un único acento naranja principal por vista | ✅ Completada |
| 4.1 — Login consolidado | Superficies unificadas con Sidebar, sin rediseño | ✅ Completada |
| 5 — Navegación móvil | `BottomNav` + `MobileMenu` migrados junto con Sidebar | ✅ Completada |
| 6 — Consolidación técnica | Limpieza de tokens legacy/deprecated sin consumo real | ✅ Completada |
| 7 — Vertical slice de marca | Ver §10.7 | ✅ Completada |
| 8 — Dark theme global (1ª iteración) | Ver §10.8 | ✅ Completada (tokens + UI compartida + Student Dashboard; Teacher/Admin heredan, sin rediseño propio todavía) |

`Navbar` permanece neutro por decisión de producto (superficie de trabajo, no de marca) — no es deuda pendiente.

Asset de símbolo: `frontend/public/brand/elevate-symbol.svg` es una **reconstrucción provisional** (no existía ningún asset vectorial oficial en el proyecto). Debe sustituirse por el archivo definitivo del brandbook en cuanto esté disponible, manteniendo la misma ruta y los mismos colores oficiales. Se usa hoy en `Sidebar` y como favicon (`layout.js`).

### 10.5 Deudas conocidas (no resueltas)

| Deuda | Detalle |
|-------|---------|
| Sistema azul activo (parcial) | `--brand-*` migrado a `--color-ink-*` en el vertical slice y consolidado en el dark theme global (§10.8). **Sigue azul** en Courses, Assessment, Lesson, Certificates y CourseDetail legacy — migración pendiente de fase futura |
| Teacher/Admin sin rediseño propio | Heredan el dark theme global vía tokens compartidos (fondos, texto, bordes, Button, Card, StatCard, Avatar, ProgressBar) y no están rotos, pero no han recibido el tratamiento de composición/jerarquía que sí recibió Student Dashboard. Es el siguiente slice (ver §10.8) |
| `--color-text-secondary` | Sin consumidores tras Fase 6; candidato a retirada en una futura fase de limpieza |
| `CourseDetail.module.css` legacy | `frontend/src/styles/CourseDetail.module.css` (activo, usado por `courses/[id]/units/[unitId]/page.js`) no usa tokens del Design System — colores, radios, etc. en crudo, incluido el indigo antiguo `#4f46e5`. Requiere una migración propia, no puntual |
| Paletas funcionales de contenido | `courseVisuals.js` (colores decorativos por curso) y `CEFR_COLOR` en `certificates/page.js` (colores por nivel A1-C2) usan hex fijos por diseño — no son deuda de marca, son paletas categóricas intencionales |

### 10.6 Archivos CSS huérfanos — advertencia para auditorías futuras

Existen **8 archivos `.module.css` en `frontend/src/styles/`** sin ningún `import` real en el proyecto: `Dashboard`, `Sidebar`, `Navbar`, `Assessment`, `Progress`, `ProtectedLayout`, `LessonDetail`, `Courses`. Son remanentes de una reestructuración anterior a la colocación de estilos junto a sus componentes/páginas (patrón actual: `./Componente.module.css`).

**Advertencia:** un `grep` de un token o color por nombre de archivo puede devolver falsos positivos si coincide con estos huérfanos (ocurrió en la auditoría de Fase 1, que documentó incorrectamente `Dashboard.module.css` como consumidor activo de tokens deprecated). **Antes de dar por válido cualquier hallazgo de auditoría, confirmar que el archivo encontrado está realmente importado** por algún `index.js`/`page.js` (`grep -r "NombreArchivo.module.css" src --include=*.js`).

Su eliminación no se ha decidido — requiere una iteración propia que confirme ausencia de imports dinámicos y de referencias externas antes de borrar.

### 10.7 Vertical slice "Marca antes que dashboard genérico" (2026-08-12)

Primera fase de corrección de la desconexión BRAND/PRODUCT identificada en auditoría. Alcance: Sidebar/Layout, Student/Teacher/Admin Dashboard, componentes base consumidos por ellos. No toca Courses, Assessment, Lesson, Certificates ni backend.

**Tokens nuevos** (`globals.css`):
- `--color-ink` / `--color-ink-hover` / `--color-ink-active` / `--color-ink-soft` — reutilizan `--elevate-surface-brand-primary/secondary` como color funcional de alto contraste, sustituyendo a `--brand-*` en el slice migrado.
- `--border-focus` y `--color-focus-ring` repuntados a naranja de marca (antes azul) — corrección **global**, afecta a toda la app: el foco es un estado efímero (solo teclado), no compite con la regla de acento único por vista.

**Componentes modificados**:
- `Button` — `primary`/`link`/`groupActive` de azul a `--color-ink`. `accent` (naranja) sin cambios.
- `ProgressBar` — nueva prop `variant` (`'default'|'accent'`). Default ahora grafito; `accent` (naranja) reservado al indicador protagonista de cada vista.
- `StatCard` y `Avatar` — variante `brand` redefinida de azul a `--color-ink` (mismo nombre de prop, sin romper consumidores).
- `Card` — estado `selected` de azul a naranja de marca (`--elevate-accent-*`).

**Pantallas**:
- **Student Dashboard** — Hero convertido en bloque editorial oscuro (`--elevate-surface-brand-primary`), único punto de la vista con naranja (barra de progreso `variant="accent"`). Badges de `WeeklyGoalsCard`/`RecommendedCard`/`TodayInElevateCard`/`ContinueLearningCard`/`LearningPathCard`/`CourseProgressCard`/`SkillProgressList` de azul a grafito.
- **Teacher Dashboard** — `Avatar` añadido a la lista de alumnos (antes solo texto), alineado con el patrón ya usado en Admin. KPIs "brand" heredan el grafito automáticamente vía token.
- **Admin Dashboard** — sin cambios estructurales (principio "más sobrio"); KPIs "brand" y `courseDistPct` heredan grafito vía token.

**Pendiente de validar visualmente** (ver resumen de conversación): contraste del Hero oscuro, legibilidad del foco naranja sobre fondos claros y oscuros, y si el grafito en StatCard/Avatar necesita más contraste en pantallas de alta densidad (Admin).

### 10.8 Dark theme global — 1ª iteración (2026-08-12)

Salto de "identidad de marca aplicada en puntos concretos" (§10.7) a **sistema dark completo**: toda la app-shell (fondos, texto, bordes, sombras, componentes UI compartidos) se re-derivó para funcionar como si se hubiera diseñado en oscuro desde el origen, no como un filtro sobre el sistema claro anterior.

**Principio de tokens**: cero colores nuevos. Todo se deriva de los 4 oficiales (`#0F1115`, `#2A2D33`, `#F4F5F7`, `#FF5722`) vía referencia directa o `color-mix()` — un patrón ya usado en el proyecto (Login, ContinueLearningCard) antes de esta iteración.

**Tokens rehechos en `globals.css`**:
- `--bg-page` = `--elevate-surface-brand-primary` directo. `--bg-surface`/`--bg-subtle` = ese mismo negro aclarado 12%/8% vía `color-mix` (nunca un gris neutro inventado). `--bg-elevated` (nuevo) = `--elevate-surface-brand-secondary`, para modales/popovers.
- `--text-display`/`--text-primary` = `--elevate-surface-brand-light`. `--text-secondary` reutiliza el token ya oficial `--elevate-text-brand-muted` (no se creó un gris nuevo). `--text-inverse` se mantiene claro (sigue sirviendo para texto sobre superficies saturadas, que no cambian de polaridad).
- `--border-default`/`--border-strong` pasan de gris plano a alfa claro (`rgba(244,245,247,.08/.16)`) — escala igual sobre cualquier superficie oscura.
- `--shadow-*` muy reducidas: una sombra negra sobre fondo casi negro no aporta nada: la separación entre superficies la da el borde, no la sombra.
- `--success/danger/warning-50/100/200` (los tonos "soft", pensados para badge sobre blanco) se re-derivan con `color-mix()` sobre `--elevate-surface-brand-primary` en vez de mantener el pastel claro original — evita "tarjetas blancas" semánticas encima de un sistema negro.
- **`--color-ink*` invierte su polaridad**: en el sistema anterior era "oscuro sobre superficie clara" (botón primario negro sobre fondo blanco); ahora que el fondo de toda la app es oscuro, el neutro de alto contraste pasa a ser el claro oficial (`--elevate-surface-brand-light`). Es el cambio de mayor riesgo de esta iteración — cualquier componente que combinara `--color-ink` con un color de texto fijo (no derivado del propio ink) necesitaba revisión manual, no solo el cambio de tokens.

**Regla de progreso actualizada**: las barras de progreso que no representan un estado semántico (éxito/aviso/error) ahora usan naranja por defecto (`ProgressBar` sin `variant`, y los mini-fills locales de `WeeklyGoalsCard`/`RecommendedCard`). `variant="accent"` queda para el indicador protagonista único de cada vista (color sólido + resplandor sutil, en vez de degradado).

**Componentes compartidos revisados** (todos consumidos también por Teacher/Admin): `Button` (`.primary` ahora es píldora clara con texto oscuro — antes negro con texto claro —, spinner propio; `.groupActive` pasa de ink a naranja: "selección" es un uso explícitamente reservado al acento), `Card` (`.elevated` gana borde — en dark theme una sombra sola no separa dos negros), `StatCard`/`Avatar` (icono de la variante `brand` invierte texto/fondo; variantes `success`/`warning`/`danger` usan el tono "400" en vez de "700" para texto sobre badge oscuro), `EmptyState`/`ErrorState`/`LoadingState`/`AccessDenied`/`Toast` (tokens `--brand-*` legacy y hex sueltos eliminados a favor de tokens ya oficiales), `Sidebar` (borde derecho sutil — ya no se diferencia del contenido por color, porque ambos comparten el mismo negro de marca).

**Student Dashboard** llevado a este lenguaje: Hero con halo radial naranja (`mix-blend-mode: screen`) en la costura entre contenido y fotografía, para que ambos lean como una sola composición; badges y mini-progreso de `WeeklyGoalsCard`/`RecommendedCard`/`TodayInElevateCard`/`TodayActivityCard`/`LearningPathCard` migrados a los tonos "400" + naranja no-semántico.

**Teacher/Admin**: sin cambios propios en esta iteración — auditados y confirmados **sin colores hardcodeados** en sus `.module.css` (0 coincidencias de hex), por lo que heredan el sistema dark completo únicamente a través de los tokens y componentes compartidos ya corregidos arriba. Su rediseño de composición/jerarquía específico queda para el siguiente slice.

---

*Este documento se actualiza con cada cambio estructural al Design System. Los cambios de tokens requieren actualizar tanto `globals.css` como este documento en el mismo PR.*
