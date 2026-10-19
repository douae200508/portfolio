// ============================================================
// Compétences — groupées par catégorie, sans barre de pourcentage
// (cahier des charges §4.4). `icon` est le nom d'une icône
// Simple Icons (slug) utilisée par SkillBadge pour afficher le
// logo réel de chaque techno.
// ============================================================

export interface SkillCategory {
  titleKey: string
  skills: { name: string; icon: string }[]
}

export const skillCategories: SkillCategory[] = [
  {
    titleKey: 'skills.frontend',
    skills: [
      { name: 'HTML5', icon: 'html5' },
      { name: 'CSS3', icon: 'css' },
      { name: 'Bootstrap', icon: 'bootstrap' },
      { name: 'JavaScript', icon: 'javascript' },
      { name: 'Vue.js', icon: 'vuedotjs' },
      { name: 'React', icon: 'react' },
      { name: 'Redux', icon: 'redux' },
    ],
  },
  {
    titleKey: 'skills.backend',
    skills: [
      { name: 'PHP', icon: 'php' },
      { name: 'Laravel', icon: 'laravel' },
      { name: 'Node.js', icon: 'nodedotjs' },
      { name: 'Python', icon: 'python' },
    ],
  },
  {
    titleKey: 'skills.databases',
    skills: [
      { name: 'SQL', icon: 'mysql' },
      { name: 'MongoDB', icon: 'mongodb' },
    ],
  },
  {
    titleKey: 'skills.cms',
    skills: [{ name: 'WordPress', icon: 'wordpress' }],
  },
  {
    titleKey: 'skills.other',
    skills: [
      { name: 'Git', icon: 'git' },
      { name: 'GitHub', icon: 'github' },
      { name: 'Figma', icon: 'figma' },
      { name: 'UML', icon: 'uml' },
    ],
  },
]
