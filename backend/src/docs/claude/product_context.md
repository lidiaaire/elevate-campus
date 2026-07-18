# Elevate Your English Campus

## PRODUCT_CONTEXT.md

Version: 1.0
Status: Official Development Context

---

# 1. Project Overview

Elevate Your English Campus es una plataforma SaaS de aprendizaje de inglés basada en el marco CEFR (A1–C2).

El proyecto debe desarrollarse como un producto profesional y escalable, no como un proyecto académico.

La prioridad absoluta es ofrecer la mejor experiencia posible para el estudiante.

Toda decisión debe aportar valor al aprendizaje.

---

# 2. Product Development Philosophy

Se sigue una metodología Product First.

Principios:

- Student Value First
- Simple before Complex
- Incremental Development
- Clean Architecture
- Reusable Components
- Consistency over Creativity
- Accessibility by Design
- Mobile First
- Performance First

Nunca implementar funcionalidades que no hayan sido solicitadas.

---

# 3. Tech Stack

## Frontend

- Next.js 16
- React 19
- TypeScript
- App Router
- CSS Modules
- CSS Variables

No utilizar:

- Tailwind
- Styled Components
- Material UI
- Chakra UI

## Backend

- Node.js
- Express
- MongoDB
- Mongoose

Arquitectura:

Routes
↓

Controllers
↓

Services
↓

Repositories
↓

Models

Nunca saltarse capas.

---

# 4. Existing Backend Modules

Actualmente existen los siguientes módulos:

- Auth
- Users
- Courses
- Units
- Lessons
- Enrollments
- Progress
- Assessments
- Dashboard
- Teacher Analytics
- Achievements
- Certificates
- Bookings
- Availability
- Live Sessions
- Attendance
- Assignments
- Submissions
- Notifications
- Recommendations

Antes de crear nuevas APIs, comprobar si ya existe una.

---

# 5. Frontend Architecture

Seguir la arquitectura existente.

Ejemplo:

app/

components/

contexts/

hooks/

services/

types/

styles/

No modificar la estructura salvo petición expresa.

---

# 6. Design System

Mantener el Design System existente.

Principios:

- limpio
- moderno
- profesional
- mucho espacio en blanco
- componentes reutilizables
- responsive
- accesible
- tipografía consistente
- tarjetas con bordes suaves
- sombras discretas
- jerarquía visual clara

Estados obligatorios cuando proceda:

- Loading
- Empty
- Error

No abusar de animaciones.

Las microinteracciones deben ser sutiles.

---

# 7. Product Modules

El producto está organizado en los siguientes módulos principales:

- Inicio
- Mis cursos
- Curso
- Lección
- Evaluaciones
- Mi progreso
- Certificados
- Calendario
- Actividades
- Comunidad
- Perfil

No modificar la arquitectura funcional.

---

# 8. Code Principles

Todo el código debe cumplir:

- limpio
- legible
- modular
- reutilizable
- escalable
- tipado estricto
- fácil de mantener

Evitar:

- duplicación
- componentes gigantes
- lógica repetida
- dependencias innecesarias

---

# 9. CSS Rules

Utilizar exclusivamente:

- CSS Modules
- CSS Variables

No utilizar estilos inline salvo casos muy concretos.

Mantener nomenclatura consistente.

---

# 10. Component Rules

Cada componente debe:

- tener una única responsabilidad
- aceptar props tipadas
- ser reutilizable
- evitar dependencias innecesarias

No crear componentes enormes.

Si un componente empieza a crecer, dividirlo.

---

# 11. API Rules

No inventar endpoints.

Primero comprobar si existe uno.

Si todavía no existe:

- utilizar datos mock tipados
- dejar preparado el componente para conectar posteriormente

No modificar contratos API existentes.

---

# 12. Development Workflow

Cada petición corresponde a una única iteración.

Implementar únicamente el objetivo solicitado.

No aprovechar para modificar otras partes del proyecto.

No realizar refactorizaciones no solicitadas.

No cambiar nombres de archivos sin motivo.

No mover carpetas.

---

# 13. Response Format

Antes de escribir código:

1. Analizar la tarea.
2. Identificar archivos afectados.
3. Modificar únicamente los necesarios.

La respuesta debe incluir:

- breve explicación
- archivos creados
- archivos modificados

Después devolver únicamente el código solicitado.

---

# 14. Priorities

Siempre priorizar en este orden:

1. Funcionalidad correcta
2. Experiencia del estudiante
3. Código limpio
4. Reutilización
5. Rendimiento
6. Accesibilidad
7. Optimización

Nunca sacrificar legibilidad por optimización prematura.

---

# 15. Current Project Phase

Estado del proyecto:

- Arquitectura definida
- Backend estable
- APIs implementadas
- Documentación finalizada
- Auditoría completada

La fase actual consiste en transformar el frontend para alinearlo con el diseño aprobado y conectar progresivamente las vistas con los servicios existentes.

No se deben rediseñar decisiones de producto.

---

# 16. Golden Rules

- Una única tarea por iteración.
- No hacer más de lo solicitado.
- Mantener la arquitectura existente.
- Reutilizar antes que crear.
- Pensar siempre como un producto SaaS profesional.
- Priorizar la experiencia del estudiante.
- Si existe una duda sobre una decisión de producto, detenerse y preguntar antes de asumir un comportamiento.
