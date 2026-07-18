# Elevate Your English Campus

## IMPLEMENTATION_WORKFLOW.md

Version: 1.0
Status: Official Development Workflow

---

# Purpose

Este documento define el flujo oficial de trabajo para implementar nuevas funcionalidades en Elevate Your English Campus.

Su objetivo es garantizar un desarrollo incremental, seguro y consistente, especialmente cuando se trabaja con asistentes de IA como Claude.

Cada conversación debe centrarse en una única iteración de desarrollo.

---

# Development Philosophy

El desarrollo sigue una metodología **Product First**.

Toda implementación debe responder a una necesidad real del producto y aportar valor al estudiante.

Los principios fundamentales son:

- Una única tarea por iteración.
- Cambios pequeños y revisables.
- Código limpio y mantenible.
- Reutilización antes que creación.
- Sin refactorizaciones innecesarias.

---

# Standard Workflow

Cada iteración seguirá el siguiente flujo:

1. Seleccionar una única Feature.
2. Analizar el contexto funcional.
3. Identificar los archivos necesarios.
4. Diseñar la solución.
5. Implementar únicamente la funcionalidad solicitada.
6. Verificar que no se rompe el comportamiento existente.
7. Revisar el código.
8. Finalizar la iteración.

No comenzar una nueva Feature hasta cerrar completamente la anterior.

---

# Iteration Scope

Cada iteración debe limitarse a uno de estos elementos:

- Un componente.
- Una sección de una pantalla.
- Una página.
- Una mejora visual.
- Una integración con API.
- Una corrección de errores.

Evitar implementar varias funcionalidades en una misma iteración.

---

# Prompt Structure

Todas las peticiones a Claude deben seguir una estructura similar.

## 1. Objetivo

Definir claramente la única tarea que debe realizar.

## 2. Contexto

Explicar únicamente la información necesaria para esa tarea.

## 3. Requisitos

Enumerar los requisitos funcionales y técnicos.

## 4. Restricciones

Indicar qué no debe modificar.

## 5. Formato de respuesta

Solicitar un resumen breve, los archivos modificados y el código correspondiente.

---

# File Modification Rules

Claude debe:

- Modificar únicamente los archivos necesarios.
- Evitar cambios colaterales.
- Mantener la estructura del proyecto.
- No mover archivos ni carpetas.
- No renombrar componentes sin necesidad.

---

# Code Rules

Todo el código debe cumplir:

- TypeScript estricto.
- Componentes reutilizables.
- CSS Modules.
- CSS Variables.
- Código legible.
- Nombres descriptivos.

Evitar:

- Código duplicado.
- Componentes monolíticos.
- Lógica de negocio en componentes de presentación.

---

# API Rules

Antes de consumir un endpoint:

1. Revisar `API_MAP.md`.
2. Confirmar que el recurso existe.
3. Utilizar la capa `services/`.

Si el endpoint no existe:

- Utilizar mocks tipados.
- Preparar el componente para sustituir los mocks fácilmente.

---

# UI Rules

Toda implementación debe respetar:

- `PRODUCT_CONTEXT.md`
- `FRONTEND_GUIDELINES.md`
- `UI_BLUEPRINT.md`
- `COMPONENT_CATALOG.md`

No introducir decisiones de diseño nuevas sin aprobación.

---

# Review Checklist

Antes de dar una iteración por finalizada, comprobar:

- ¿Cumple el objetivo solicitado?
- ¿Respeta el Design System?
- ¿Es responsive?
- ¿Es accesible?
- ¿Reutiliza componentes existentes?
- ¿Mantiene el tipado?
- ¿Evita dependencias nuevas?
- ¿No rompe otras funcionalidades?

Si alguna respuesta es negativa, revisar la implementación.

---

# What Claude Should Avoid

No debe:

- Implementar funcionalidades adicionales.
- Hacer refactorizaciones no solicitadas.
- Crear endpoints nuevos.
- Modificar la arquitectura.
- Añadir librerías sin justificación.
- Cambiar el comportamiento de módulos no relacionados.
- Inventar requisitos de negocio.

---

# Communication Rules

Las respuestas deben ser breves y centradas en la tarea.

Siempre incluir:

- Resumen de los cambios.
- Archivos creados.
- Archivos modificados.
- Código correspondiente.

No explicar conceptos generales salvo que se soliciten.

---

# Definition of Done

Una iteración se considera completada cuando:

- La funcionalidad funciona correctamente.
- El código compila.
- No se introducen regresiones.
- Se respetan las guías del proyecto.
- El resultado puede integrarse inmediatamente en la rama principal.

Solo entonces podrá iniciarse la siguiente iteración.

---

# Continuous Improvement

Si durante una implementación se detecta una mejora relacionada pero fuera del alcance de la iteración:

- No implementarla.
- Documentarla como mejora futura.
- Continuar únicamente con el objetivo actual.

Esto garantiza iteraciones pequeñas, predecibles y fáciles de revisar.

---

# Golden Rules

1. Una iteración = un objetivo.
2. No modificar más de lo necesario.
3. Reutilizar antes que crear.
4. Mantener la arquitectura existente.
5. Priorizar siempre la experiencia del estudiante.
6. El código debe estar preparado para evolucionar sin grandes refactorizaciones.
