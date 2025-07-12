export interface Project {
  name: string;
  company: string;
  description: string;
  tech_stack: string[];
  role: string;
  responsibilities: string[];
  image?: string;
  github_link?: string | null;
}
