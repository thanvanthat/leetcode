import type { Project } from "@/lib/types";

/**
 * Project content. Statuses and technologies are written conservatively —
 * update them as each project evolves.
 */
export const projects: Project[] = [
  {
    slug: "brainverse-ai",
    number: "01",
    title: "BrainVerse AI",
    statement: "Adaptive gameplay powered by intelligence.",
    description:
      "An adaptive brain-gaming platform where cognitive challenges reshape themselves around how each player actually plays.",
    categories: ["game", "ai"],
    type: "Adaptive cognitive game platform",
    role: "Game design · AI systems · Development",
    engine: "Web platform",
    technologies: ["Python", "Machine Learning", "JavaScript / TypeScript", "React", "AI APIs"],
    status: "In development",
    visual: "brainverse",
    atmosphere: { accent: "#b7a4ff", base: "#0d0b16", glow: "#3b2d7a" },
    overview:
      "BrainVerse AI is a collection of short cognitive challenges — memory, focus, pattern recognition and reaction — connected by a system that reads gameplay signals and tunes the next challenge.",
    problem:
      "Most brain-training games use fixed difficulty curves. Players either plateau on content that is too easy or drop off when it spikes too hard.",
    concept:
      "Treat every session as data. Accuracy, reaction time and streaks feed an analysis layer that decides the next level's pace, grid size and complexity — keeping players in a flow zone.",
    responsibilities: [
      "Designing the challenge formats and game loop",
      "Building the adaptive difficulty logic",
      "Developing the gameplay UI and interaction feedback",
      "Structuring gameplay telemetry for analysis",
    ],
    system: [
      { label: "Player", detail: "Plays a short cognitive challenge." },
      { label: "Gameplay Data", detail: "Accuracy, reaction time, streaks and errors are captured." },
      { label: "AI Analysis", detail: "Signals are scored against the player's recent performance." },
      { label: "Adaptive Difficulty", detail: "Pace, grid size and complexity are adjusted." },
      { label: "Personalized Challenge", detail: "The next round is generated for that player." },
    ],
    process: [
      {
        heading: "Mechanics first",
        body: "Prototyped each mini-game as a standalone loop and tuned it by feel before connecting any intelligence.",
      },
      {
        heading: "Instrumenting play",
        body: "Defined the gameplay signals that matter and logged them consistently across challenge types.",
      },
      {
        heading: "Adaptation layer",
        body: "Iterating on the rules and models that turn those signals into difficulty decisions.",
      },
    ],
    result: "Actively in development. Core challenge loops and the adaptive difficulty flow are being built and tested.",
    gallery: [
      { caption: "Challenge hub", variant: 0 },
      { caption: "Pattern memory grid", variant: 1 },
      { caption: "Session analysis", variant: 2 },
    ],
  },
  {
    slug: "freshco-ai",
    number: "02",
    title: "FreshcoAI",
    statement: "Computer vision for food awareness.",
    description:
      "An AI-assisted food freshness and inventory platform: point a camera at produce, identify it, estimate freshness and get smart recommendations.",
    categories: ["ai"],
    type: "AI + computer vision mobile platform",
    role: "AI engineering · App development",
    engine: "Mobile application",
    technologies: ["Computer Vision", "CNN", "Object Detection", "Python", "AI APIs", "Mobile Application"],
    status: "Prototype",
    visual: "freshco",
    atmosphere: { accent: "#c5ec7a", base: "#0a0f0a", glow: "#2d4a1f" },
    overview:
      "FreshcoAI combines object detection and image classification to recognise food items from a camera feed, estimate their visual freshness, and turn that into inventory insight.",
    problem:
      "Households and small stores lose food simply because nobody is tracking what is ageing. Manual inventory is tedious and easy to abandon.",
    concept:
      "Make inventory passive. The camera identifies items, a model estimates visual freshness, and the app surfaces what to use first.",
    responsibilities: [
      "Designing the computer vision pipeline",
      "Working with CNN-based classification and object detection",
      "Integrating AI APIs into the application flow",
      "Designing the recommendation and inventory experience",
    ],
    system: [
      { label: "Camera", detail: "Captures a frame of the food item or shelf." },
      { label: "Computer Vision", detail: "Pre-processes the frame and locates regions of interest." },
      { label: "CNN / Object Detection", detail: "Detects and classifies individual items." },
      { label: "Food Identification", detail: "Maps detections to known food categories." },
      { label: "Freshness Estimation", detail: "Estimates visual freshness from appearance cues." },
      { label: "Smart Recommendations", detail: "Suggests what to use first and flags ageing stock." },
    ],
    process: [
      {
        heading: "Vision pipeline",
        body: "Set up detection and classification stages and tested them on everyday produce images.",
      },
      {
        heading: "Estimation, not verdicts",
        body: "Framed freshness as a visual estimate with confidence, so the app assists decisions rather than making safety claims.",
      },
      { heading: "Inventory layer", body: "Designing how estimates become simple, actionable recommendations in the app." },
    ],
    result: "Working prototype of the recognition and estimation flow; the model and inventory experience are being refined.",
    note: "Freshness outputs are AI-assisted visual estimates intended to support inventory decisions. They are not a food-safety or health assessment.",
    gallery: [
      { caption: "Live scan", variant: 0 },
      { caption: "Detection overlay", variant: 1 },
      { caption: "Inventory insight", variant: 2 },
    ],
  },
  {
    slug: "echo-protocol-escape",
    number: "03",
    title: "Echo Protocol: Escape",
    statement: "Third-person action-adventure prototype.",
    description:
      "A third-person action-adventure prototype built in Unreal Engine 5 — traversal, encounters and an escape narrative inside a locked-down facility.",
    categories: ["game"],
    type: "Third-person action-adventure",
    role: "Gameplay · Level design · Blueprints",
    engine: "Unreal Engine 5",
    technologies: ["Unreal Engine 5", "Blueprints", "MetaHuman", "Materials", "UMG UI"],
    status: "Prototype",
    visual: "echo",
    atmosphere: { accent: "#ff6a3d", base: "#0f0908", glow: "#5a1f12" },
    overview:
      "Echo Protocol: Escape follows a character trying to break out of a facility whose systems react to them. The prototype focuses on movement, level flow and moment-to-moment tension.",
    problem:
      "Build a playable slice that feels cohesive — character, camera, level and UI working together — rather than a set of disconnected mechanics.",
    concept:
      "A compact, atmospheric level where lighting, sound and layout guide the player, and every system exists to support the escape.",
    responsibilities: [
      "Third-person character and camera setup",
      "Gameplay logic in Blueprints",
      "Level blockout, lighting and materials",
      "HUD and menu UI",
    ],
    system: [
      { label: "Blueprints", detail: "Gameplay logic, interactions and triggers." },
      { label: "Character", detail: "Third-person movement, camera and animation." },
      { label: "Gameplay", detail: "Objectives, hazards and encounter flow." },
      { label: "UI", detail: "HUD, prompts and menus built with UMG." },
      { label: "World", detail: "Level layout, lighting and materials." },
    ],
    process: [
      { heading: "Blockout", body: "Greyboxed the facility to test pacing, sightlines and routes before any art." },
      { heading: "Systems", body: "Implemented interactions, objectives and hazards in Blueprints." },
      { heading: "Atmosphere", body: "Layered lighting, materials and UI to build tension." },
    ],
    result: "Playable prototype. Expanding encounters and polishing the level.",
    gallery: [
      { caption: "Facility corridor", variant: 0 },
      { caption: "Encounter space", variant: 1 },
      { caption: "Blueprint logic", variant: 2 },
    ],
  },
  {
    slug: "eco-dash",
    number: "04",
    title: "Eco Dash",
    statement: "A sustainability-focused endless runner.",
    description:
      "A fast, readable endless runner where collecting, dodging and choices are themed around sustainability and a world that recovers as you play.",
    categories: ["game"],
    type: "Endless runner",
    role: "Game design · Development",
    engine: "Game engine prototype",
    technologies: ["Game design", "C# / C++", "Procedural spawning", "UI"],
    status: "Prototype",
    visual: "ecodash",
    atmosphere: { accent: "#7fe0a8", base: "#07100d", glow: "#1d4a37" },
    overview:
      "Eco Dash uses the endless-runner format as a light way to talk about sustainability: pollution is an obstacle, clean energy is a power-up, and the environment visibly heals with good runs.",
    problem: "Educational games often feel like lessons with controls attached. The message needs to live inside the mechanics.",
    concept:
      "Keep the runner tight and fun first, then let the theme shape obstacles, collectibles and the world's visual state.",
    responsibilities: [
      "Core runner mechanics and controls",
      "Obstacle and collectible spawning",
      "Difficulty ramp and scoring",
      "Theme-driven UI and feedback",
    ],
    system: [
      { label: "Input", detail: "Lane switching, jump and slide." },
      { label: "Spawner", detail: "Procedurally places obstacles and pickups." },
      { label: "Difficulty", detail: "Speed and density ramp over time." },
      { label: "World State", detail: "Environment reacts to the player's run." },
    ],
    process: [
      { heading: "Feel", body: "Tuned speed, lane timing and hitboxes until the core loop felt fair." },
      { heading: "Theme", body: "Mapped sustainability ideas onto obstacles and power-ups." },
      { heading: "Loop", body: "Added scoring, ramping and the recovering-world feedback." },
    ],
    result: "Playable prototype with the core runner loop in place.",
    gallery: [
      { caption: "Run in progress", variant: 0 },
      { caption: "Clean-energy boost", variant: 1 },
      { caption: "World recovery", variant: 2 },
    ],
  },
  {
    slug: "game-dev-event-platform",
    number: "05",
    title: "Game Dev Event Platform",
    statement: "A home base for game development events.",
    description:
      "A web platform for running game development events — announcements, registrations, schedules and a showcase of what teams build.",
    categories: ["game", "web"],
    type: "Web platform",
    role: "Full-stack development · UI design",
    engine: "Web",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    status: "Completed",
    visual: "eventplatform",
    atmosphere: { accent: "#f2c46b", base: "#0f0d08", glow: "#4a3a17" },
    overview:
      "A platform built for the game development community around events: clear information for participants and a showcase that puts the games first.",
    problem:
      "Event details usually live across chat groups, forms and slides. Participants miss updates and projects disappear after the event.",
    concept: "One place for the whole event lifecycle — from announcement to registration to the final showcase.",
    responsibilities: [
      "Information architecture and UI design",
      "Frontend development",
      "Registration and schedule flows",
      "Project showcase pages",
    ],
    system: [
      { label: "Announce", detail: "Event pages with themes, rules and timelines." },
      { label: "Register", detail: "Participant and team registration." },
      { label: "Schedule", detail: "Sessions and milestones." },
      { label: "Showcase", detail: "A gallery of submitted games." },
    ],
    process: [
      { heading: "Structure", body: "Mapped the event lifecycle and what each audience needs at each step." },
      { heading: "Interface", body: "Designed a bold, game-flavoured UI that stays easy to scan." },
      { heading: "Build", body: "Implemented responsive pages and flows with a component-based frontend." },
    ],
    result: "Built and used as the web presence for game development events.",
    gallery: [
      { caption: "Event landing", variant: 0 },
      { caption: "Schedule", variant: 1 },
      { caption: "Showcase", variant: 2 },
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export const getNextProject = (slug: string) => {
  const index = projects.findIndex((p) => p.slug === slug);
  return projects[(index + 1) % projects.length]!;
};

/** Order of the Game Development pinned sequence. */
export const gameProjects = ["brainverse-ai", "echo-protocol-escape", "eco-dash", "game-dev-event-platform"]
  .map((slug) => getProject(slug))
  .filter((p): p is Project => Boolean(p));

/** Order of the cinematic chapter sequence. */
export const chapterProjects = projects;
