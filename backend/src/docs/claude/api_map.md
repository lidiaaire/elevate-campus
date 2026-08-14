# Elevate Your English Campus

## API_MAP.md

Version: 1.0
Status: Official API Reference Map

---

# Purpose

Este documento proporciona una visión general de la API de Elevate.

No sustituye la documentación OpenAPI/Swagger.

Su objetivo es ayudar durante el desarrollo del frontend, permitiendo identificar rápidamente qué recursos existen y qué información proporcionan.

Antes de crear un nuevo endpoint, comprobar siempre si ya existe uno que cubra la necesidad.

---

# API Architecture

Todas las APIs siguen la arquitectura:

Route
↓

Controller
↓

Service
↓

Repository
↓

Model

No modificar esta arquitectura.

---

# Authentication

## Module

Auth

## Responsibilities

- Login
- Registro
- Refresh/Auth
- Perfil del usuario autenticado

## Related Frontend

- Login
- Protected Routes
- Session

---

# Users

## Module

Users

## Responsibilities

- Gestión de usuarios
- Perfil
- Roles
- Información personal

## Used By

- Perfil
- Administración
- Dashboard
- Ficha de alumno (staff — admin sin restricción, teacher solo su cohorte)

---

# Courses

## Module

Courses

## Responsibilities

- Listado de cursos
- Información del curso
- Publicación
- Archivado
- Gestión administrativa

## Used By

- Inicio
- Mis Cursos
- Curso

---

# Units

## Module

Units

## Responsibilities

- Organización del contenido
- Estructura del curso

## Used By

- Curso

---

# Lessons

## Module

Lessons

## Responsibilities

- Lecciones
- Contenido
- Tipos de lección
- Duración

Tipos soportados:

- TEXT
- VIDEO
- QUIZ

## Used By

- Curso
- Lección

---

# Enrollments

## Module

Enrollments

## Responsibilities

- Cursos inscritos
- Estado del alumno

## Used By

- Inicio
- Mis Cursos

---

# Progress

## Module

Progress

## Responsibilities

- Progreso del estudiante
- Lecciones completadas
- Porcentaje
- Continuar donde lo dejó

## Used By

- Inicio
- Curso
- Mi Progreso

---

# Assessments

## Module

Assessments

## Responsibilities

- Evaluaciones
- Resultados
- Calificaciones

## Used By

- Evaluaciones

---

# Dashboard

## Module

Dashboard

## Responsibilities

- Resumen general
- Actividad
- Continue Learning
- Objetivos
- Estadísticas
- Recomendaciones

## Used By

- Inicio

---

# Teacher Analytics

## Module

Teacher Analytics

## Responsibilities

- Analítica para profesores
- Rendimiento
- Seguimiento

---

# Achievements

## Module

Achievements

## Responsibilities

- Logros
- Desbloqueo
- Gamificación

## Used By

- Mi Progreso
- Ficha de alumno (staff)

---

# Certificates

## Module

Certificates

## Responsibilities

- Certificados
- Descarga
- Historial

## Used By

- Certificados
- Ficha de alumno (staff)

---

# Notifications

## Module

Notifications

## Responsibilities

- Notificaciones
- Alertas
- Recordatorios

## Used By

- Inicio
- Perfil

---

# Recommendations

## Module

Recommendations

## Responsibilities

- Recomendaciones personalizadas
- Próximos cursos
- Contenido sugerido

## Used By

- Inicio

---

# Bookings

## Module

Bookings

## Responsibilities

- Reservas
- Clases

---

# Availability

## Module

Availability

## Responsibilities

- Disponibilidad
- Agenda

---

# Live Sessions

## Module

Live Sessions

## Responsibilities

- Clases en directo
- Acceso
- Jitsi

---

# Attendance

## Module

Attendance

## Responsibilities

- Asistencia
- Control de participación

---

# Assignments

## Module

Assignments

## Responsibilities

- Tareas
- Entregas
- Fechas límite

## Used By

- Actividades

---

# Submissions

## Module

Submissions

## Responsibilities

- Entregas del estudiante
- Estado
- Correcciones

---

# Community

## Module

Community

## Responsibilities

- Feed de cohorte (posts, logros, certificados, announcements)
- Crear publicaciones y comentarios
- Announcements (teacher → su cohorte; admin → toda la academia)
- Moderación (soft delete): autor siempre, teacher solo su cohorte, admin sin restricción
- No existe modelo `Cohort` — el scope se resuelve vía `User.assignedTeacherId`, igual que en Achievements/Certificates por alumno

## Used By

- Comunidad

---

# API Development Rules

Antes de crear un nuevo endpoint:

1. Revisar si ya existe un módulo que cubra la funcionalidad.
2. Reutilizar los contratos existentes.
3. Mantener consistencia en nombres y estructuras.

---

# Frontend Integration Rules

El frontend debe consumir la API exclusivamente a través de la capa `services/`.

No realizar llamadas HTTP directamente desde componentes.

La lógica de acceso a datos debe mantenerse separada de la presentación.

---

# Mock Data

Si un endpoint aún no existe:

- utilizar datos mock tipados;
- mantener la misma estructura prevista para la futura respuesta;
- facilitar la sustitución por datos reales.

---

# Source of Truth

La referencia oficial de la API es:

- Swagger / OpenAPI
- Backend Node.js + Express
- Servicios implementados

Este documento actúa únicamente como índice de navegación para el desarrollo del frontend.
