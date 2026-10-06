export type ProjectCategory = "game" | "ai" | "web";

export type ProjectStatus = "In development" | "Prototype" | "Concept prototype" | "Completed" | "Exploring";

/** Identifies which procedural artwork renders for a project. */
export type ProjectVisualKey = "brainverse" | "freshco" | "echo" | "ecodash" | "eventplatform";

export interface ProjectAtmosphere {
  /** Accent color used sparingly for highlights, states and hover. */
  accent: string;
  /** Deep base tone of the project's own atmosphere. */
  base: string;
  /** Soft secondary tone used in gradients and artwork. */
  glow: string;
}

export interface PipelineStep {
  label: string;
  detail: string;
}

export interface CaseStudySection {
  heading: string;
  body: string;
}

export interface Project {
  slug: string;
  number: string;
  title: string;
  /** Short cinematic statement shown on chapters and hero. */
  statement: string;
  description: string;
  categories: ProjectCategory[];
  type: string;
  role: string;
  engine: string;
  technologies: string[];
  status: ProjectStatus;
  visual: ProjectVisualKey;
  atmosphere: ProjectAtmosphere;
  overview: string;
  problem: string;
  concept: string;
  responsibilities: string[];
  system: PipelineStep[];
  process: CaseStudySection[];
  result: string;
  gallery: { caption: string; variant: number }[];
  /** Optional honest disclaimer, e.g. for AI estimation systems. */
  note?: string;
  links?: { label: string; href: string }[];
}

export interface NavItem {
  id: string;
  label: string;
}

export interface SocialLink {
  label: string;
  href: string;
  handle: string;
}

export interface SkillGroup {
  id: string;
  title: string;
  caption: string;
  items: string[];
}

export interface TimelineEntry {
  chapter: string;
  title: string;
  body: string;
  tags: string[];
}

export interface UnrealStage {
  label: string;
  detail: string;
  tools: string[];
}

export interface ResearchThread {
  title: string;
  status: ProjectStatus;
  summary: string;
  slug?: string;
}
