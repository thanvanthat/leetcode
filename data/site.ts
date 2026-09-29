import type { NavItem, SocialLink } from "@/lib/types";

/**
 * Global identity + contact details.
 * Replace the placeholder values marked TODO before deploying.
 */
export const site = {
  name: "Thanvanth AT",
  shortName: "Thanvanth",
  roles: ["Game Developer", "AI Engineer", "Creative Technologist"],
  tagline: "I build interactive worlds, intelligent systems, and experiences where creativity meets technology.",
  positioning:
    "Computer Science and Engineering student focused on game development, AI, software engineering and interactive technology.",
  url: "https://thanvanth.dev", // TODO: replace with the deployed domain
  title: "Thanvanth AT — Game Developer & AI Engineer",
  description: "Game Developer and AI Engineer building interactive experiences, AI systems and creative technology.",
  email: "hello@example.com", // TODO: replace with your real contact email
  year: 2026,
} as const;

export const socials: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/thanvanthat", handle: "@thanvanthat" },
  // TODO: replace with your LinkedIn profile URL
  { label: "LinkedIn", href: "https://www.linkedin.com/", handle: "Thanvanth AT" },
];

export const navItems: NavItem[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "game-dev", label: "Game Dev" },
  { id: "ai", label: "AI" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export const getSocial = (label: string) => socials.find((s) => s.label === label);
