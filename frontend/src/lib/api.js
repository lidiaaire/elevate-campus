const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000/api';

async function request(endpoint, { method = 'GET', body, token } = {}) {
  const headers = { 'Content-Type': 'application/json' };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  // 204 No Content (p.ej. DELETE) no trae body — response.json() lanzaría
  // un SyntaxError al intentar parsear una cadena vacía. Mismo criterio
  // para cualquier respuesta sin contenido real.
  const data = response.status === 204 ? null : await response.json();

  if (!response.ok) {
    const message = data?.message ?? 'Ha ocurrido un error. Inténtalo de nuevo.';
    const error = new Error(message);
    // Aditivo: los consumidores existentes solo leen .message y siguen intactos.
    // Nuevo: permite distinguir 403/404/etc. sin parsear el mensaje.
    error.status = response.status;
    error.code   = data?.error;
    throw error;
  }

  return data;
}

export const api = {
  get:    (endpoint, token)        => request(endpoint, { method: 'GET',    token }),
  post:   (endpoint, body, token)  => request(endpoint, { method: 'POST',   body, token }),
  put:    (endpoint, body, token)  => request(endpoint, { method: 'PUT',    body, token }),
  patch:  (endpoint, body, token)  => request(endpoint, { method: 'PATCH',  body, token }),
  delete: (endpoint, token)        => request(endpoint, { method: 'DELETE', token }),
};
