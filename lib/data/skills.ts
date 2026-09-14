import type { Skill } from "@/lib/types";

export type BubbleSize = "xl" | "lg" | "md" | "sm";

export interface BubbleSkill {
  name: string;
  iconKey: string;
  size: BubbleSize;
  floatDelay: number;
}

export interface SkillCategory {
  id: string;
  name: string;
  skills: BubbleSkill[];
}

export interface SkillCategoryItem {
  id: string;
  categoryName: string;
  skills: string[];
}

export interface VisualSkill {
  name: string;
  iconKey: string;
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "languages",
    name: "Programming Languages",
    skills: [
      { name: "Python", iconKey: "python", size: "xl", floatDelay: 0 },
      { name: "JavaScript", iconKey: "javascript", size: "xl", floatDelay: -1.2 },
      { name: "TypeScript", iconKey: "typescript", size: "xl", floatDelay: -2.4 },
      { name: "Java", iconKey: "java", size: "lg", floatDelay: -0.6 },
      { name: "C", iconKey: "c", size: "md", floatDelay: -1.8 },
    ],
  },
  {
    id: "frontend",
    name: "Frontend & UI",
    skills: [
      { name: "React", iconKey: "react", size: "xl", floatDelay: -0.8 },
      { name: "Next.js", iconKey: "nextjs", size: "xl", floatDelay: -2.0 },
      { name: "TailwindCSS", iconKey: "tailwindcss", size: "lg", floatDelay: -1.4 },
      { name: "HTML5", iconKey: "html5", size: "sm", floatDelay: -2.8 },
      { name: "CSS3", iconKey: "css3", size: "sm", floatDelay: -0.5 },
      { name: "Bootstrap", iconKey: "bootstrap", size: "sm", floatDelay: -3.2 },
    ],
  },
  {
    id: "backend",
    name: "Backend & Databases",
    skills: [
      { name: "Node.js", iconKey: "nodejs", size: "lg", floatDelay: -1.0 },
      { name: "Flask", iconKey: "flask", size: "md", floatDelay: -2.5 },
      { name: "PostgreSQL", iconKey: "postgresql", size: "md", floatDelay: -0.4 },
      { name: "MySQL", iconKey: "mysql", size: "md", floatDelay: -3.1 },
      { name: "MongoDB", iconKey: "mongodb", size: "md", floatDelay: -1.7 },
      { name: "Firebase", iconKey: "firebase", size: "md", floatDelay: -2.2 },
    ],
  },
  {
    id: "tools",
    name: "AI, Tools & Platforms",
    skills: [
      { name: "TensorFlow", iconKey: "tensorflow", size: "lg", floatDelay: -0.9 },
      { name: "Docker", iconKey: "docker", size: "lg", floatDelay: -2.1 },
      { name: "Git", iconKey: "git", size: "lg", floatDelay: -1.5 },
      { name: "VS Code", iconKey: "vscode", size: "md", floatDelay: -0.3 },
      { name: "Linux", iconKey: "linux", size: "md", floatDelay: -2.7 },
      { name: "GitHub", iconKey: "github", size: "sm", floatDelay: -1.1 },
      { name: "Postman", iconKey: "postman", size: "sm", floatDelay: -3.0 },
      { name: "Colab", iconKey: "colab", size: "sm", floatDelay: -0.7 },
      { name: "Vercel", iconKey: "vercel", size: "sm", floatDelay: -2.3 },
      { name: "Command Line", iconKey: "commandline", size: "sm", floatDelay: -1.6 },
    ],
  },
];

// Flat list of all bubble skills
export const TECH_CLOUD_SKILLS: BubbleSkill[] = SKILL_CATEGORIES.flatMap((c) => c.skills);

export const TECHNICAL_SKILLS: VisualSkill[] = [
  { name: "HTML5", iconKey: "html5" },
  { name: "CSS3", iconKey: "css3" },
  { name: "JavaScript", iconKey: "javascript" },
  { name: "React", iconKey: "react" },
  { name: "TypeScript", iconKey: "typescript" },
  { name: "Node.js", iconKey: "nodejs" },
  { name: "Python", iconKey: "python" },
  { name: "Java", iconKey: "java" },
  { name: "C", iconKey: "c" },
  { name: "Flask", iconKey: "flask" },
  { name: "Next.js", iconKey: "nextjs" },
  { name: "TailwindCSS", iconKey: "tailwindcss" },
  { name: "Bootstrap", iconKey: "bootstrap" },
  { name: "PostgreSQL", iconKey: "postgresql" },
  { name: "MySQL", iconKey: "mysql" },
  { name: "MongoDB", iconKey: "mongodb" },
  { name: "Firebase", iconKey: "firebase" },
  { name: "TensorFlow", iconKey: "tensorflow" },
];

export const TOOLS_AND_PLATFORMS: VisualSkill[] = [
  { name: "Git", iconKey: "git" },
  { name: "GitHub", iconKey: "github" },
  { name: "Command Line", iconKey: "commandline" },
  { name: "VS Code", iconKey: "vscode" },
  { name: "Colab", iconKey: "colab" },
  { name: "Docker", iconKey: "docker" },
  { name: "Postman", iconKey: "postman" },
  { name: "Linux", iconKey: "linux" },
  { name: "Vercel", iconKey: "vercel" },
];

// Preserved for backward-compatibility with any component importing SKILLS
export const SKILLS: Skill[] = [
  { name: "Java", category: "language" },
  { name: "Python", category: "language" },
  { name: "C", category: "language" },
  { name: "JavaScript", category: "language" },
  { name: "TypeScript", category: "language" },
  { name: "React", category: "framework" },
  { name: "Next.js", category: "framework" },
  { name: "Flask", category: "framework" },
  { name: "Node.js", category: "framework" },
  { name: "TensorFlow", category: "framework" },
  { name: "OpenCV", category: "framework" },
  { name: "MediaPipe", category: "framework" },
  { name: "MySQL", category: "database" },
  { name: "Firestore", category: "database" },
  { name: "Git", category: "tool" },
  { name: "Linux", category: "tool" },
  { name: "MATLAB", category: "tool" },
  { name: "VS Code", category: "tool" },
];
