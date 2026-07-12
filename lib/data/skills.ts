import type { Skill } from "@/lib/types";

// Static by design: skills change rarely, and treating them as Firestore
// documents would add reads/writes for no real benefit. If this becomes
// wrong (e.g. skills need to be editable without a redeploy), migrate to
// a Firestore collection the same way projects/certifications are done.
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
