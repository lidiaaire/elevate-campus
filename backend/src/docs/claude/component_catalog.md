# Elevate Your English Campus

## COMPONENT_CATALOG.md

Version: 1.0
Status: Official UI Component Catalog

---

# Purpose

Este documento define el catálogo oficial de componentes reutilizables de Elevate.

Antes de crear un nuevo componente, comprobar siempre si existe uno similar.

La reutilización tiene prioridad sobre la creación de nuevos componentes.

---

# Design Principles

Todos los componentes deben ser:

- Reutilizables
- Tipados
- Modulares
- Responsables de una única función
- Compatibles con el Design System
- Responsive
- Accesibles

---

# Component Categories

## Layout Components

### AppLayout

Responsabilidad

Layout principal de la aplicación.

Contiene:

- Sidebar
- Header
- Main Content

---

### Container

Responsabilidad

Limitar el ancho del contenido.

Uso

Todas las páginas principales.

---

### Section

Responsabilidad

Agrupar bloques relacionados.

---

### PageHeader

Responsabilidad

Cabecera estándar de una página.

Puede incluir:

- título
- descripción
- acciones
- breadcrumbs

---

### SectionHeader

Responsabilidad

Título y descripción de una sección.

---

# Navigation Components

### Sidebar

Navegación principal.

---

### TopBar

Cabecera superior.

---

### Breadcrumb

Ruta de navegación.

---

### Tabs

Cambio entre vistas.

---

### Pagination

Navegación entre páginas.

---

# Buttons

### PrimaryButton

Acción principal.

---

### SecondaryButton

Acción secundaria.

---

### GhostButton

Acciones discretas.

---

### IconButton

Botón únicamente con icono.

---

# Form Components

### Input

Campo de texto.

---

### Textarea

Texto largo.

---

### Select

Lista desplegable.

---

### Checkbox

Selección múltiple.

---

### RadioGroup

Selección única.

---

### Toggle

Activar o desactivar opciones.

---

### SearchBar

Búsqueda.

---

### FilterBar

Filtros.

---

# Feedback Components

### LoadingState

Carga.

---

### Skeleton

Carga visual.

---

### EmptyState

Sin datos.

---

### ErrorState

Error.

---

### Toast

Notificaciones temporales.

---

### Alert

Mensajes importantes.

---

### Modal

Ventanas modales.

---

### ConfirmationDialog

Confirmación de acciones críticas.

---

# Cards

### CourseCard

Mostrar información resumida de un curso.

---

### LessonCard

Información de una lección.

---

### AssessmentCard

Evaluación.

---

### AchievementCard

Logro.

---

### CertificateCard

Certificado.

---

### ActivityCard

Actividad reciente.

---

### RecommendationCard

Recomendación personalizada.

---

### TeacherCard

Información del profesor.

---

# Learning Components

### ProgressBar

Progreso lineal.

---

### ProgressRing

Progreso circular.

---

### SkillBadge

Nivel o habilidad.

---

### CEFRBadge

Nivel CEFR.

---

### StreakIndicator

Racha del estudiante.

---

### XPIndicator

Experiencia acumulada.

---

### LessonNavigator

Navegación entre lecciones.

---

### UnitAccordion

Listado de unidades.

---

### LessonContent

Contenedor principal del contenido.

---

# Dashboard Components

### StudentHero

Cabecera principal del dashboard.

---

### ContinueLearningCard

Continúa donde lo dejaste.

---

### DailyActivity

Actividad diaria.

---

### WeeklyGoals

Objetivos semanales.

---

### RecommendedCourses

Cursos recomendados.

---

### RecentActivity

Actividad reciente.

---

### LearningStatistics

Resumen de progreso.

---

# Community Components

### PostCard

Publicación.

---

### Comment

Comentario.

---

### ReactionBar

Reacciones.

---

### UserAvatar

Avatar.

---

# Profile Components

### UserProfileCard

Información personal.

---

### PreferencesPanel

Preferencias.

---

### SecurityPanel

Seguridad.

---

# Tables

### DataTable

Tabla reutilizable.

Debe soportar:

- ordenación
- paginación
- búsqueda
- estados vacíos

---

# Charts

Los gráficos deben mantenerse desacoplados.

Ejemplos:

- ProgressChart
- ActivityChart
- SkillRadarChart

---

# Naming Convention

Todos los componentes deben utilizar PascalCase.

Ejemplos:

CourseCard

LessonCard

StudentHero

PageHeader

No utilizar nombres genéricos como:

CardNew

Component

Item

Box

Container2

---

# File Structure

Cada componente debe mantener una estructura consistente.

Ejemplo:

Component/

Component.tsx

Component.module.css

index.ts

---

# Props

Las props deben:

- estar tipadas
- ser mínimas
- ser descriptivas

Evitar pasar objetos enormes cuando solo se necesitan unos pocos datos.

---

# Reusability Checklist

Antes de crear un componente nuevo, comprobar:

□ ¿Existe uno similar?

□ ¿Puede ampliarse uno existente?

□ ¿Respeta el Design System?

□ ¿Será reutilizable?

□ ¿Tiene una única responsabilidad?

Si alguna respuesta es negativa, reconsiderar el diseño.

---

# Component Evolution

Cuando un componente evolucione:

- Mantener compatibilidad siempre que sea posible.
- Evitar romper implementaciones existentes.
- Documentar cambios importantes.

---

# Source of Truth

Este catálogo representa el conjunto oficial de componentes reutilizables del proyecto.

Todo nuevo componente debe evaluarse antes de incorporarse al catálogo.
