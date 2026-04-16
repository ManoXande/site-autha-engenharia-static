export interface ServiceFeature {
  icon: string;
  title: string;
  description: string;
}

export interface ServiceProof {
  metric: string;
  label: string;
}

export interface ServiceSectionData {
  id: string;
  sectionIndex: number;
  backgroundImage: string;
  backgroundAlt: string;
  objectPosition?: string;
  eyebrow?: string;
  label: string;
  headline: string;
  lead: string;
  features: ServiceFeature[];
  proof?: ServiceProof;
  cta: { text: string; href: string };
  layoutReverse?: boolean;
  mood?: "warm" | "tech" | "authority" | "power" | "nature";
  imageRevealDirection?: "up" | "left" | "right";
  whatsappMessage?: string;
}

export type ImpactStatFormat = "number" | "currency" | "area";

export interface ImpactStat {
  value: number;
  suffix: string;
  label: string;
  prefix?: string;
  format?: ImpactStatFormat;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface ContactFormData {
  name: string;
  phone: string;
  service: string;
  message: string;
}

export type LoadingState = "scanning" | "revealing" | "done";
