export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'remote';
  salary?: string;
  description: string;
  requirements: string[];
  matchScore?: number;
  postedAt: string;
  logo?: string;
}

export interface Skill {
  id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export interface UserProfile {
  name: string;
  email: string;
  skills: Skill[];
  experience: number;
  resumeText?: string;
  preferredRoles: string[];
  preferredLocations: string[];
}
