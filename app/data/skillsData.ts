export interface Skill {
  name: string;
  icon?: string;
  bgColor: string;
  textColor: string;
}

export interface SkillCategory {
  title: string;
  emoji: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: 'Tech Stack',
    emoji: '✨',
    skills: [
      { name: 'JAVASCRIPT', bgColor: 'bg-yellow-400', textColor: 'text-black' },
      { name: 'TYPESCRIPT', bgColor: 'bg-blue-600', textColor: 'text-white' },
      { name: 'REACT', bgColor: 'bg-cyan-500', textColor: 'text-white' },
    ],
  },
  {
    title: 'Tools',
    emoji: '🛠️',
    skills: [
      { name: 'GIT', bgColor: 'bg-orange-600', textColor: 'text-white' },
      { name: 'GITHUB', bgColor: 'bg-gray-800', textColor: 'text-white' },
      { name: 'NOTION', bgColor: 'bg-white', textColor: 'text-black' },
      { name: 'VSCODE', bgColor: 'bg-blue-600', textColor: 'text-white' },
      { name: 'FIGMA', bgColor: 'bg-purple-600', textColor: 'text-white' },
    ],
  },
];
