export const PROFILE = {
  name: "Kingsly Mokgwathi",
  title: "Full-stack Developer",
  headline: "Software | AI | DevOps | Data | Solutions Engineer",
  contact: {
    email: "kingslytshepiso@gmail.com",
    phone: "+27 76 076 8257",
    phoneTel: "+27760768257",
    location: "Midrand, Gauteng",
    locationShort: "South Africa",
  },
  stack: [
    "Java Spring Boot",
    "React",
    "React Native",
    "AWS",
    "Azure",
    "Python",
  ],
  interests: [
    "AI Engineering",
    "Cloud Architecture",
    "API Development",
    "Mobile",
  ],
} as const;

export const JOURNEY = [
  "I grew up in a small township in Limpopo, where curiosity and persistence mattered more than where you started. From Modubatse High School to an Advanced Diploma in IT at Nelson Mandela University, I kept pushing toward a career in technology.",
  "CAPACITI's intensive programme launched me into professional development—through an iOCO internship, leading BlueApp and AI middleware work at Blue Pearl, and now evolving Droppa's platform as a full-stack developer, shipping cloud, AI, and data solutions that create real impact.",
] as const;

export const OBJECTIVE =
  "Motivated full-stack developer with solid experience in Java Spring Boot, React, and cloud platforms like AWS and Azure. I build practical AI-powered applications and scalable solutions that drive business value—always learning, collaborating, and delivering meaningful impact.";

export interface ExperienceEntry {
  period: string;
  role: string;
  company: string;
  highlight: string;
}

export const EXPERIENCE: ExperienceEntry[] = [
  {
    period: "Feb 2026 – Present",
    role: "Software Developer",
    company: "Droppa",
    highlight:
      "Legacy-to-modern full-stack across Java EE, Spring Boot, Angular, and React.",
  },
  {
    period: "Aug 2024 – Dec 2025",
    role: "Associate Developer 2",
    company: "Blue Pearl",
    highlight:
      "BlueApp microservices plus IBM WatsonX and AWS Bedrock middleware.",
  },
  {
    period: "Oct 2023 – Jul 2024",
    role: "Application Developer Intern",
    company: "iOCO/EOH",
    highlight: "360 Reviews REST APIs and Agile delivery.",
  },
  {
    period: "Mar 2023 – Sep 2023",
    role: "Full-Stack Candidate Intern",
    company: "CAPACITI",
    highlight: "Foundation in Java and React from web fundamentals.",
  },
];

export interface EducationEntry {
  year: string;
  qualification: string;
  institution: string;
}

export const EDUCATION: EducationEntry[] = [
  {
    year: "2022",
    qualification: "Advanced Diploma in IT",
    institution: "Nelson Mandela University",
  },
  {
    year: "2018",
    qualification: "National Senior Certificate",
    institution: "Modubatse High School",
  },
];

export const SKILLS = {
  hard: [
    "Java Spring Boot",
    "React / React Native",
    "Python",
    "AWS",
    "Azure",
    "AI Engineering",
    "API Development",
    "PostgreSQL / MongoDB",
  ],
  focus: [
    "Cloud Architecture",
    "Data Analytics",
    "DevOps",
    "Mobile",
  ],
} as const;
