export const LINKS = {
  github: "https://github.com/hmmlavi",
  linkedin: "https://www.linkedin.com/in/lakshitsinghsaini/",
  instagram: "https://www.instagram.com/lakshitsinghsaini/",
  x: "https://x.com/Lakshits27",
  resume:
    "https://drive.google.com/file/d/14PMZMTqUAa_w0xP8O1fSogpWSWb4mp3K",
  email: "lakshitsinghsaini@gmail.com",
};

export const NAV_ITEMS = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Contact", id: "contact" },
];

export const HERO_STATS = [
  { value: "02", label: "Android Projects" },
  { value: "03", label: "Web Projects" },
  { value: "10+", label: "AI Experiments" },
  { value: "∞", label: "Ideas to Build" },
];

export const STATS_BAND = [
  { value: "02", label: "Android Projects" },
  { value: "03", label: "Web Projects" },
  { value: "15+", label: "Technologies & Tools" },
  { value: "10+", label: "AI Experiments" },
  { value: "∞", label: "Ideas to Build" },
];

export const ORBIT_BADGES = [
  { label: "Kotlin", color: "#A97BFF" },
  { label: "Generative AI", color: "#A78BFA" },
  { label: "Android", color: "#3DDC84" },
  { label: "React", color: "#61DAFB" },
  { label: "Python", color: "#60A5FA" },
  { label: "Gemini API", color: "#4ADE80" },
  { label: "C++", color: "#8B9CC4" },
  { label: "JavaScript", color: "#F7DF1E" },
];

export const CAPABILITIES = [
  {
    index: "01",
    title: "AI Software",
    color: "#a78bfa",
    desc: "AI-powered applications, generative AI and intelligent software experiences built on modern AI APIs.",
  },
  {
    index: "02",
    title: "Software Development",
    color: "#60a5fa",
    desc: "Building practical software products by experimenting with different technologies and ideas.",
  },
  {
    index: "03",
    title: "Android",
    color: "#4ade80",
    desc: "Native Android applications in Kotlin — with AI-powered functionality where it genuinely helps.",
  },
  {
    index: "04",
    title: "Web Development",
    color: "#e2e8f0",
    desc: "Modern web experiences with HTML, CSS, JavaScript and React — fast, clean and responsive.",
  },
];

export type Tech = { name: string; color: string };

export const TECHS: Tech[] = [
  { name: "C", color: "#8b9cc4" },
  { name: "C++", color: "#a78bfa" },
  { name: "Python", color: "#60a5fa" },
  { name: "JavaScript", color: "#f7df1e" },
  { name: "HTML", color: "#f97316" },
  { name: "CSS", color: "#7dd3fc" },
  { name: "React", color: "#61dafb" },
  { name: "Node.js", color: "#4ade80" },
  { name: "REST APIs", color: "#94a3b8" },
  { name: "Kotlin", color: "#a97bff" },
  { name: "Android", color: "#3ddc84" },
  { name: "Generative AI", color: "#c4b5fd" },
  { name: "Gemini API", color: "#818cf8" },
  { name: "Google AI Studio", color: "#38bdf8" },
  { name: "AI Integration", color: "#e9d5ff" },
  { name: "SQL", color: "#5eead4" },
  { name: "Firebase", color: "#fbbf24" },
  { name: "MongoDB", color: "#34d399" },
  { name: "Git", color: "#f87171" },
  { name: "GitHub", color: "#e5e7eb" },
  { name: "Postman", color: "#fb923c" },
  { name: "Figma", color: "#f0abfc" },
];

export type ProjectStatus = "development" | "ready";

export const PROJECTS = [
  {
    index: "01",
    name: "SaBuddy",
    tagline: "AI-powered social media management, on Android.",
    desc: "An Android application designed to help users manage and improve their social media workflow using AI — thoughtfully built in Kotlin on top of modern AI APIs.",
    tags: ["Android", "Kotlin", "AI", "APIs"],
    accent: "#a78bfa",
    accentSoft: "rgba(167,139,250,0.16)",
    variant: "social" as const,
    status: "development" as ProjectStatus,
    note: "no public build yet — details stay under wraps",
  },
  {
    index: "02",
    name: "L.A.V.I.",
    tagline: "An AI-powered personal assistant for students.",
    desc: "Combines AI assistance with tools designed around student productivity and everyday workflows — one companion app for study life, backed by Firebase.",
    tags: ["Android", "Kotlin", "AI", "APIs", "Firebase"],
    accent: "#60a5fa",
    accentSoft: "rgba(96,165,250,0.16)",
    variant: "assistant" as const,
    status: "development" as ProjectStatus,
    note: "no public build yet — details stay under wraps",
  },
  {
    index: "03",
    name: "Portfolio Site",
    tagline: "The site you're looking at right now.",
    desc: "A personal portfolio built from scratch — dark atmosphere, an interactive tech constellation, scroll-driven motion and a fully responsive layout. Designed, coded and shipped by me.",
    tags: ["React", "JavaScript", "HTML", "CSS"],
    accent: "#4ade80",
    accentSoft: "rgba(74,222,128,0.14)",
    variant: "portfolio" as const,
    status: "ready" as ProjectStatus,
    note: "you're browsing it — this is the live build",
  },
  {
    index: "04",
    name: "Decision Board",
    tagline: "Compare choices using weighted criteria.",
    desc: "A web tool for making hard decisions rationally — set your options, weight the criteria that matter, and it automatically calculates the scores so the strongest choice becomes obvious.",
    tags: ["React", "JavaScript", "HTML", "CSS"],
    accent: "#fbbf24",
    accentSoft: "rgba(251,191,36,0.14)",
    variant: "decision" as const,
    status: "development" as ProjectStatus,
    note: "in progress — refining the scoring model",
  },
];

export const FAQS = [
  {
    q: "Who is Lakshit Singh Saini?",
    a: "A B.Tech Computer Science student and aspiring AI software engineer. I build Android apps, AI-powered software and web experiences — and I publish the work under my personal identity, LAVI.",
  },
  {
    q: "What do you actually build?",
    a: "Mostly AI-powered Android applications and software experiments. I take an idea I'm curious about, wire it up with real code and AI APIs, and keep iterating until it feels useful.",
  },
  {
    q: "What technologies do you work with?",
    a: "Kotlin and Android on the mobile side; Python, C and C++ as my programming base; React, JavaScript and Node.js on the web; plus tools like Firebase, MongoDB, the Gemini API, Git and Postman. The full map is in the constellation above.",
  },
  {
    q: "What is LAVI?",
    a: "LAVI is my personal builder identity — the name attached to my projects, experiments and this website. Short, memorable, and mine.",
  },
  {
    q: "What are you building right now?",
    a: "Two Android apps: SaBuddy, an AI-powered social media management app, and L.A.V.I., an AI personal assistant for students. Both are actively in development.",
  },
  {
    q: "Are you open to opportunities?",
    a: "Yes. Internships, collaborations and interesting problems in AI, Android or web — if you're building something real, I'd love to hear about it.",
  },
  {
    q: "Can I collaborate with you?",
    a: "Definitely. The fastest way to reach me is email — lakshitsinghsaini@gmail.com. I read everything and reply quickly.",
  },
];
