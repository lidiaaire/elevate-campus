/**
 * parseLessonContent.js
 *
 * El contenido real de las lecciones de texto (backend/src/seeds/content/**)
 * ya trae su propia estructura pedagógica en texto plano: separadores de
 * línea ("━━━...") delimitando títulos de sección en mayúsculas, listas
 * "término → traducción", frases de ejemplo entre comillas, correcciones
 * "❌ / ✅" y un bloque final "PRACTICA".
 *
 * Este parser NO reescribe ni genera texto: solo reconoce esos patrones ya
 * presentes y los agrupa para que el frontend pueda renderizarlos con más
 * jerarquía visual. Si el contenido no encaja en el patrón, cae a un único
 * bloque de texto plano — nunca se pierde contenido.
 *
 * Si el contenido ya es HTML (autoría futura vía admin, por ejemplo), se
 * devuelve tal cual para que el consumidor lo siga tratando como HTML
 * (dangerouslySetInnerHTML), sin intentar parsear texto plano sobre marcado.
 */

// Línea compuesta solo por un carácter de regla horizontal repetido
// (━, ─, = ...) — el separador de sección usado en el contenido real.
const SEPARATOR_RE = /^[━─=]{8,}$/;

function isHtml(text) {
  return /<\/?[a-z][\s\S]*>/i.test(text);
}

function splitParagraphs(lines) {
  const paragraphs = [];
  let current = [];
  for (const line of lines) {
    if (line.trim() === '') {
      if (current.length) paragraphs.push(current);
      current = [];
    } else {
      current.push(line.trim());
    }
  }
  if (current.length) paragraphs.push(current);
  return paragraphs;
}

function classifyParagraph(lines) {
  const arrowCount  = lines.filter((l) => l.includes('→')).length;
  const quoteCount  = lines.filter((l) => /^".*"$/.test(l)).length;
  const errorCount  = lines.filter((l) => /^[❌✅]/.test(l)).length;

  if (arrowCount === lines.length) return { kind: 'vocab', lines };
  if (lines.length >= 2 && quoteCount === lines.length) return { kind: 'quotes', lines };
  if (errorCount === lines.length) return { kind: 'errors', lines };
  return { kind: 'text', lines };
}

function classifySectionType(heading, paragraphs) {
  const h = heading.toUpperCase();
  if (h.includes('PUNTO DE ERROR')) return 'warning';
  if (h.includes('PRACTICA') || h.includes('PRÁCTICA')) return 'practice';
  if (h.includes('CONVERSACI') || h.includes('DIÁLOGO') || h.includes('DIALOGO')) return 'dialogue';
  if (paragraphs.some((p) => p.kind === 'vocab')) return 'vocab';
  return 'section';
}

/**
 * @param {string} content
 * @returns {{type:'html', html:string}|{type:'plain', lead:string[], sections:Array}}
 */
export function parseLessonContent(content) {
  const text = content ?? '';
  if (!text.trim()) return { type: 'plain', lead: [], sections: [] };
  if (isHtml(text)) return { type: 'html', html: text };

  const lines = text.replace(/\r\n/g, '\n').split('\n');
  const sections = [];
  let lead = [];
  let currentHeading = null;
  let currentLines = [];

  const flush = () => {
    if (currentHeading === null) {
      lead = currentLines;
      return;
    }
    if (currentLines.some((l) => l.trim())) {
      const paragraphs = splitParagraphs(currentLines).map(classifyParagraph);
      sections.push({
        heading: currentHeading,
        type: classifySectionType(currentHeading, paragraphs),
        paragraphs,
      });
    }
  };

  let i = 0;
  while (i < lines.length) {
    const line = lines[i].trim();
    const closer = (lines[i + 2] ?? '').trim();
    if (SEPARATOR_RE.test(line) && lines[i + 1] !== undefined && SEPARATOR_RE.test(closer)) {
      flush();
      currentHeading = lines[i + 1].trim();
      currentLines = [];
      i += 3;
      continue;
    }
    currentLines.push(lines[i]);
    i += 1;
  }
  flush();

  return { type: 'plain', lead: splitParagraphs(lead).map((p) => p.join(' ')), sections };
}
