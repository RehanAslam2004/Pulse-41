import {
  Monitor,
  Briefcase,
  ShoppingBag,
  GraduationCap,
  ClipboardCheck,
  Heart,
  Factory,
  Building2,
  HandHeart,
  Rocket,
  HelpCircle,
  type LucideIcon,
} from 'lucide-react'

export const industryIconMap: Record<string, LucideIcon> = {
  Monitor,
  Briefcase,
  ShoppingBag,
  GraduationCap,
  ClipboardCheck,
  Heart,
  Factory,
  Building2,
  HandHeart,
  Rocket,
}

export function getIndustryIcon(name?: string): LucideIcon {
  if (!name) return HelpCircle
  return industryIconMap[name] || HelpCircle
}
