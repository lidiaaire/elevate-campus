# Elevate Your English Campus

## UI_BLUEPRINT.md

Version: 1.0
Status: Official UI Implementation Blueprint

---

# Purpose

Este documento define la estructura funcional y visual de cada módulo del frontend.

No describe la implementación técnica.

Describe:

- qué debe mostrar cada pantalla
- qué componentes contiene
- qué datos necesita
- cómo debe comportarse
- qué experiencia debe ofrecer

Debe utilizarse como referencia durante toda la fase de implementación del frontend.

---

# Global UI Principles

Todas las pantallas deben seguir los mismos principios.

## Experiencia

- Limpia
- Moderna
- Profesional
- Enfocada en el aprendizaje
- Sin elementos innecesarios

---

## Diseño

- Mucho espacio en blanco
- Tarjetas
- Bordes redondeados
- Sombras suaves
- Jerarquía visual clara

---

## Responsive

Obligatorio:

- Desktop
- Tablet
- Mobile

---

## Estados

Cada vista debe contemplar cuando sea necesario:

- Loading
- Empty
- Error
- Success

---

## Navegación

La navegación debe resultar intuitiva.

El estudiante nunca debe preguntarse dónde está.

---

# Module: Inicio

## Objetivo

Motivar al estudiante y ofrecer acceso inmediato a su aprendizaje.

## Componentes

- Hero
- Continúa donde lo dejaste
- Tu actividad de hoy
- Objetivos de la semana
- Mis cursos
- Continúa tu camino
- Recomendado para ti
- Hoy en Elevate
- Mi espacio de aprendizaje

## Datos

- Dashboard
- Progress
- Recommendations
- Notifications

---

# Module: Mis Cursos

## Objetivo

Mostrar todos los cursos del estudiante.

## Componentes

- Encabezado
- Buscador
- Filtros
- Ordenación
- Grid/Lista de cursos
- Tarjetas de curso
- Estados vacíos

## Datos

- Courses
- Enrollments
- Progress

---

# Module: Curso

## Objetivo

Centralizar toda la información del curso.

## Componentes

- Header del curso
- Información general
- Barra de progreso
- Unidades
- Lecciones
- Próxima lección
- Recursos
- Profesor

## Datos

- Course
- Units
- Lessons
- Progress

---

# Module: Lección

## Objetivo

Maximizar la concentración del estudiante.

## Componentes

- Cabecera
- Contenido principal
- Navegación entre lecciones
- Recursos
- Progreso
- Acciones

## Tipos

- Texto
- Vídeo
- Quiz

---

# Module: Evaluaciones

## Objetivo

Realizar evaluaciones de forma sencilla.

## Componentes

- Lista
- Detalle
- Preguntas
- Navegación
- Resultado
- Feedback

---

# Module: Mi Progreso

## Objetivo

Visualizar el avance del estudiante.

## Componentes

- Resumen
- Estadísticas
- Progreso por curso
- Logros
- Actividad reciente
- Evolución

---

# Module: Certificados

## Objetivo

Gestionar certificados obtenidos.

## Componentes

- Lista
- Tarjeta de certificado
- Vista previa
- Descarga

---

# Module: Calendario

## Objetivo

Mostrar la planificación del estudiante.

## Componentes

- Calendario
- Eventos
- Próximas sesiones
- Entregas
- Recordatorios

---

# Module: Actividades

## Objetivo

Centralizar todas las tareas pendientes.

## Componentes

- Lista
- Estado
- Prioridad
- Fecha límite
- Acciones

---

# Module: Comunidad

## Objetivo

Favorecer la interacción entre estudiantes.

## Componentes

- Feed
- Publicaciones
- Comentarios
- Reacciones
- Búsqueda

---

# Module: Perfil

## Objetivo

Gestionar la información personal del estudiante.

## Componentes

- Información personal
- Preferencias
- Seguridad
- Idioma
- Notificaciones

---

# Cross-Cutting Components

Los siguientes componentes pueden aparecer en cualquier módulo.

- PageHeader
- SectionHeader
- Card
- Button
- Modal
- Badge
- ProgressBar
- ProgressRing
- EmptyState
- ErrorState
- LoadingState
- Skeleton
- Toast
- Pagination
- Tabs
- Breadcrumb
- SearchBar
- FilterBar

Siempre reutilizar estos componentes antes de crear nuevos.

---

# UX Rules

Toda pantalla debe responder claramente a estas preguntas:

- ¿Dónde estoy?
- ¿Qué puedo hacer aquí?
- ¿Cuál es el siguiente paso?

El usuario nunca debe sentirse perdido.

---

# Visual Consistency

Todos los módulos deben compartir:

- Espaciados
- Tipografía
- Iconografía
- Colores
- Componentes
- Animaciones

La experiencia debe sentirse uniforme en toda la plataforma.

---

# Implementation Rule

Cada iteración de desarrollo implementará únicamente:

- un módulo,
- una sección,
- o un componente.

Nunca desarrollar varias áreas del producto en una sola iteración.

El objetivo es garantizar calidad, facilidad de revisión y bajo consumo de contexto para las herramientas de IA.
