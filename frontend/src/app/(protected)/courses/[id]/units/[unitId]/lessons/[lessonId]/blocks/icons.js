import {
  BookOpen, MessageCircle, Zap, Clock, Tv, MapPin, Lightbulb, Sparkles,
} from 'lucide-react';

// Mapa de claves de datos (contentBlocks.*.icon, string libre en el
// documento) a componentes de icono. Puramente decorativo: una clave
// desconocida cae al icono por defecto en vez de romper el render.
export const ITEM_ICONS = {
  book:     BookOpen,
  chat:     MessageCircle,
  bolt:     Zap,
  clock:    Clock,
  tv:       Tv,
  pin:      MapPin,
  lightbulb: Lightbulb,
  sparkles: Sparkles,
};

export function getItemIcon(key) {
  return ITEM_ICONS[key] ?? BookOpen;
}
