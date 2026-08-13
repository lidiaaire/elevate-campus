/**
 * routePermissions.js — Matriz declarativa de autorización por rol.
 *
 * Única fuente de verdad de qué rol puede acceder a qué ruta protegida
 * (Role Experience Polish, Volumen II §6). No debe existir en ningún otro
 * punto del proyecto lógica condicional del tipo `if (role === ...)` o
 * `if (pathname.startsWith(...))` para decidir acceso — toda esa decisión
 * se resuelve leyendo esta tabla y la función `isRouteAllowed`.
 *
 * match: 'exact'  -> el pathname coincide exactamente con `path`.
 * match: 'prefix' -> el pathname coincide con cualquier sub-ruta de `path`
 *                    (p.ej. '/courses' en modo prefix cubre
 *                    '/courses/123/units/45', pero no '/courses' en sí).
 *
 * Por construcción, para una misma base de ruta las entradas 'exact' y
 * 'prefix' capturan pathnames mutuamente excluyentes (una entrada 'prefix'
 * exige un '/' después de `path`, así que nunca coincide con la ruta
 * exacta), por lo que como mucho una entrada es aplicable a un pathname
 * dado.
 */

export const ROUTE_PERMISSIONS = [
  { path: '/dashboard',         match: 'exact',  roles: ['admin', 'teacher', 'student'] },
  { path: '/courses',           match: 'exact',  roles: ['admin', 'teacher', 'student'] },
  { path: '/courses',           match: 'prefix', roles: ['student'] },
  { path: '/enrollments',       match: 'exact',  roles: ['admin', 'teacher'] },
  { path: '/progress',          match: 'exact',  roles: ['admin', 'teacher', 'student'] },
  { path: '/community',         match: 'exact',  roles: ['admin', 'teacher', 'student'] },
  { path: '/users',             match: 'exact',  roles: ['admin'] },
  { path: '/users',             match: 'prefix', roles: ['admin', 'teacher'] },
  { path: '/assessments',       match: 'exact',  roles: ['student'] },
  { path: '/certificates',      match: 'exact',  roles: ['student'] },
  { path: '/achievements',      match: 'exact',  roles: ['student'] },
  { path: '/notifications',     match: 'exact',  roles: ['student'] },
  { path: '/skill-radar',       match: 'exact',  roles: ['student'] },
  { path: '/teacher-analytics', match: 'exact',  roles: ['teacher'] },
];

function matchesEntry(entry, pathname) {
  if (entry.match === 'exact') return pathname === entry.path;
  if (entry.match === 'prefix') return pathname.startsWith(`${entry.path}/`);
  return false;
}

/**
 * Devuelve la entrada de la matriz aplicable a un pathname, o undefined
 * si ninguna ruta declarada lo cubre.
 */
export function findRoutePermission(pathname) {
  return ROUTE_PERMISSIONS.find((entry) => matchesEntry(entry, pathname));
}

/**
 * Decide si un rol puede acceder a un pathname según la matriz.
 * Fail-closed: si el pathname no está declarado en la matriz, se deniega.
 */
export function isRouteAllowed(role, pathname) {
  const entry = findRoutePermission(pathname);
  if (!entry) return false;
  return entry.roles.includes(role);
}
