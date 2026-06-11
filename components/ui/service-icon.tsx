import {
  Activity,
  Apple,
  Brain,
  Calendar,
  Heart,
  Leaf,
  Scale,
  Sparkles,
  Stethoscope,
  Utensils,
  type LucideIcon,
} from "lucide-react";

import type { ServiceIcon as ServiceIconName } from "@/lib/content";

const MAP: Record<ServiceIconName, LucideIcon> = {
  leaf: Leaf,
  apple: Apple,
  activity: Activity,
  heart: Heart,
  brain: Brain,
  stethoscope: Stethoscope,
  scale: Scale,
  calendar: Calendar,
  utensils: Utensils,
  sparkles: Sparkles,
};

export function ServiceIcon({
  name,
  className,
}: {
  name: ServiceIconName;
  className?: string;
}) {
  const Icon = MAP[name] ?? Leaf;
  return <Icon className={className} strokeWidth={1.6} />;
}
