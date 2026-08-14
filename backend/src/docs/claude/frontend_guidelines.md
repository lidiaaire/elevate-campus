# Elevate Your English Campus

## FRONTEND_GUIDELINES.md

Version: 1.0
Status: Official Frontend Development Guidelines

---

# 1. Purpose

Este documento define las normas oficiales para el desarrollo del frontend de Elevate Your English Campus.

Su objetivo es garantizar una experiencia consistente para el usuario y una base de código limpia, escalable y mantenible.

Estas directrices deben seguirse en todas las implementaciones.

---

# 2. Development Philosophy

El frontend debe desarrollarse siguiendo estos principios:

- Product First
- Student First
- Mobile First
- Accessibility by Design
- Reusability First
- Consistency over Creativity
- Simplicity over Complexity

Toda implementación debe aportar valor al estudiante.

---

# 3. Technology Stack

## Framework

- Next.js 16
- React 19
- JavaScript

## Routing

- App Router

## Styling

- CSS Modules
- CSS Variables

## State Management

- React Context cuando sea necesario.
- Hooks personalizados para lógica reutilizable.

---

# 4. Forbidden Technologies

No utilizar salvo aprobación expresa:

- Tailwind CSS
- Styled Components
- Emotion
- Material UI
- Chakra UI
- Bootstrap
- jQuery

---

# 5. Folder Structure

Respetar la arquitectura existente.

Ejemplo:

app/

components/

contexts/

hooks/

services/

types/

styles/

No reorganizar carpetas sin autorización.

---

# 6. Component Architecture

Cada componente debe cumplir:

- Una única responsabilidad.
- Ser reutilizable.
- Tener props tipadas.
- Ser fácil de leer.
- Mantener un tamaño razonable.

Si un componente empieza a crecer demasiado, dividirlo.

---

# 7. Component Naming

Utilizar nombres descriptivos.

Ejemplos:

StudentHero

CourseCard

LessonSidebar

ProgressRing

AchievementBadge

Evitar nombres genéricos como:

Component

Box

Item

Card2

NewComponent

---

# 8. Page Structure

Cada página debe seguir una estructura similar:

1. Header
2. Contenido principal
3. Secciones independientes
4. Feedback (Loading / Empty / Error)
5. Footer (cuando proceda)

Las páginas deben componerse mediante componentes pequeños.

---

# 9. Styling Rules

Utilizar siempre:

- CSS Modules
- Variables CSS

Evitar:

- Inline styles
- !important
- Selectores excesivamente específicos

Mantener una nomenclatura clara.

---

# 10. Responsive Design

Todo desarrollo debe funcionar correctamente en:

- Desktop
- Tablet
- Mobile

No desarrollar únicamente para escritorio.

---

# 11. Accessibility

Todo componente debe considerar:

- HTML semántico.
- aria-label cuando sea necesario.
- Navegación mediante teclado.
- Contraste adecuado.
- Estados de foco visibles.

La accesibilidad forma parte del desarrollo, no es una fase posterior.

---

# 12. Data Fetching

Los componentes visuales no deben contener lógica compleja de acceso a datos.

Los datos deben obtenerse mediante:

services/

hooks/

o componentes contenedores.

Siempre que sea posible separar presentación y lógica.

---

# 13. State Management

Utilizar:

- useState para estado local.
- Context únicamente cuando el estado sea compartido.
- Hooks personalizados para lógica reutilizable.

Evitar estados duplicados.

---

# 14. Error Handling

Toda vista que cargue datos debe contemplar:

- Loading
- Error
- Empty
- Success

Nunca dejar pantallas vacías si falla una petición.

---

# 15. Reusable Components

Antes de crear un componente nuevo:

1. Comprobar si ya existe uno similar.
2. Evaluar si puede ampliarse.
3. Evitar duplicación.

La reutilización tiene prioridad.

---

# 16. Performance

Buenas prácticas:

- Evitar renders innecesarios.
- Cargar únicamente los datos necesarios.
- Lazy loading cuando aporte valor.
- No optimizar prematuramente.

La legibilidad siempre tiene prioridad.

---

# 17. API Integration

Antes de crear nuevas llamadas:

- Revisar API_MAP.md.
- Comprobar si ya existe un endpoint.

Si el endpoint todavía no existe:

- utilizar datos mock tipados.
- preparar el componente para sustituirlos fácilmente.

No inventar contratos de API.

---

# 18. Code Quality

Todo el código debe ser:

- legible
- modular
- mantenible
- escalable
- tipado
- documentado cuando sea necesario

Evitar:

- código duplicado
- componentes gigantes
- lógica repetida
- imports innecesarios

---

# 19. Development Rules

En cada iteración:

- Implementar únicamente la funcionalidad solicitada.
- No modificar módulos no relacionados.
- No realizar refactorizaciones innecesarias.
- No cambiar nombres de archivos.
- No introducir dependencias sin justificación.

---

# 20. Response Rules

Al implementar una tarea:

1. Analizar el objetivo.
2. Identificar los archivos necesarios.
3. Modificar únicamente esos archivos.

La respuesta debe incluir:

- Resumen breve de los cambios.
- Archivos creados.
- Archivos modificados.
- Código correspondiente.

No implementar funcionalidades adicionales.

---

# 21. Golden Rules

Antes de escribir código, comprobar siempre:

✓ ¿Existe ya este componente?

✓ ¿Existe ya esta API?

✓ ¿Estoy respetando el Design System?

✓ ¿Estoy modificando únicamente lo necesario?

✓ ¿Este cambio aporta valor al estudiante?

Si alguna respuesta es "no", detener la implementación y revisar el enfoque.
