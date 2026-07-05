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

---

## 1. Filosofía visual

Elevate Your English Campus es una plataforma educativa SaaS dirigida a estudiantes de inglés y sus docentes. La interfaz debe transmitir:

- **Claridad sobre creatividad**: la información académica (progreso, notas, tareas) es el protagonista. La UI no compite con el contenido.
- **Confianza profesional**: paleta contenida, tipografía legible, jerarquía visual clara. Sin gradientes agresivos ni decoración innecesaria.
- **Densidad funcional**: las vistas de teacher y admin muestran tablas, métricas y listas. El sistema debe soportar densidad sin sacrificar legibilidad.
- **Accesibilidad no negociable**: contraste mínimo WCAG AA (4.5:1 para texto, 3:1 para elementos interactivos). Focus visible en todos los elementos.

La estética de referencia es la de SaaS modernos de productividad (Linear, Notion, Vercel Dashboard): superficies blancas, grises fríos, un único color de acento usado con parsimonia.

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

Los siguientes tokens pertenecen al sistema anterior y **están marcados para eliminación**. Están presentes solo para garantizar compatibilidad durante la migración. No deben usarse en código nuevo.

| Token deprecado | Reemplazar por | Estado |
|-----------------|----------------|--------|
| `--color-accent` | `var(--brand-500)` | Deprecated — migración en curso |
| `--color-accent-soft` | `var(--brand-50)` | Deprecated — migración en curso |
| `--color-bg` | `var(--bg-page)` | Deprecated |
| `--color-surface` | `var(--bg-surface)` | Deprecated |
| `--color-border` | `var(--border-default)` | Deprecated |
| `--color-border-soft` | `var(--bg-subtle)` | Deprecated |
| `--color-text-primary` | `var(--text-primary)` | Deprecated |
| `--color-text-secondary` | `var(--text-secondary)` | Deprecated |
| `--color-text-muted` | `var(--text-muted)` | Deprecated |
| `--shadow-card` | `var(--shadow-sm)` | Deprecated |
| `--shadow-hover` | `var(--shadow-md)` | Deprecated |
| `--transition-fast` | `var(--dur-fast) var(--ease-default)` | Deprecated |
| `--transition-base` | `var(--dur-normal) var(--ease-default)` | Deprecated |

**El valor `#4f46e5` (indigo)** que aparece hardcodeado en archivos legacy (Assessment, LoginForm, Progress, CourseDetail, Enrollments, Users) se migrará a `var(--brand-500)` en la Fase 1. Hasta entonces, `--color-accent` mantiene su valor original para no romper esas vistas.

### Proceso de eliminación de un token deprecado

1. Buscar en el proyecto todas las referencias al token con `grep -r "token-name" src/`.
2. Sustituir cada referencia por el token recomendado.
3. Verificar visualmente que no hay regresiones.
4. Eliminar el token del bloque de deprecados en `globals.css`.
5. Documentar la eliminación en el PR.

---

*Este documento se actualiza con cada cambio estructural al Design System. Los cambios de tokens requieren actualizar tanto `globals.css` como este documento en el mismo PR.*
