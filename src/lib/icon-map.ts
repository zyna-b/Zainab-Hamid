import type { LucideIcon } from 'lucide-react';
import { Brain, Code, Smartphone, Briefcase, Palette, Zap } from 'lucide-react';

export const SERVICES_ICON_MAP = {
  LucideBrain: Brain,
  LucideCode: Code,
  LucideSmartphone: Smartphone,
  Briefcase,
  Palette,
  Zap,
} satisfies Record<string, LucideIcon>;

export type ServiceIconKey = keyof typeof SERVICES_ICON_MAP;

export function resolveServiceIcon(key: ServiceIconKey | string): LucideIcon {
  return SERVICES_ICON_MAP[key as ServiceIconKey] ?? Briefcase;
}
