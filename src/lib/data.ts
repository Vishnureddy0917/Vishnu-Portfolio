export interface Skill {
  id: string;
  name: string;
  symbol: string;
  number: number;
  family: 'Languages' | 'Frameworks' | 'Databases' | 'Tools' | 'Core CS & Concepts';
  isBrand: boolean;
  logoKey: string;
  projectsUsed: string[];
}

export interface Project {
  id: string;
  index: string;
  title: string;
  kicker: string;
  description: string;
  features: string[];
  tech: string[];
  github?: string;
  live?: string;
}

export interface ExperienceItem {
  id: string;
  type: 'experience' | 'education';
  year: string;
  title: string;
  organization: string;
  details: string[];
  score?: string;
}

export interface Certification {
  id: string;
  index: string;
  title: string;
  issuer: string;
  year: string;
}

export interface Achievement {
  id: string;
  index: string;
  title: string;
  caption: string;
  detail: string;
  numberValue: number;
  suffix: string;
  platformLogo: string;
}

export const PROFILE = {
  name: "Yenimireddy Vishnu Reddy",
  firstName: "VISHNU",
  lastName: "REDDY",
  initials: "VR",
  role: "Full Stack Developer",
  tagline: "Building intelligent, scalable software & AI systems",
  email: "vishnuyenimireddy@gmail.com",
  phone: "+91 93980 27354",
  phoneHref: "tel:+919398027354",
  location: "Andhra Pradesh, India",
  resumeSummary: "Engineered AI TripMate, an AI travel planner that turns preferences into personalized destination recommendations and itineraries.",
  additionalSummary: "B.Tech in Computer Science (AI & ML) student at SRM University, AP with expertise in React.js, Node.js, Python, PostgreSQL, and Generative AI.",
  github: "https://github.com/Vishnureddy0917",
  linkedin: "https://linkedin.com/in/vishnu-yenimireddy-b79348289",
  resumePath: "/resume.pdf",
  portraitPath: "/portrait-bust.webp?v=1001",
  graduationYear: "2027",
  cgpa: "7.46/10",
  idNumber: "VR-2027-CS",
  department: "Computer Science (AI & ML)",
};

export const NAV = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

export const SKILL_GROUPS = [
  "All",
  "Languages",
  "Frameworks",
  "Databases",
  "Tools",
  "Core CS & Concepts"
] as const;

export const SKILLS: Skill[] = [
  // Languages
  { id: "c", name: "C", symbol: "C", number: 1, family: "Languages", isBrand: true, logoKey: "c", projectsUsed: ["Core CS Coursework"] },
  { id: "cpp", name: "C++", symbol: "Cp", number: 2, family: "Languages", isBrand: true, logoKey: "cpp", projectsUsed: ["Data Structures & Algorithms"] },
  { id: "python", name: "Python", symbol: "Py", number: 3, family: "Languages", isBrand: true, logoKey: "python", projectsUsed: ["Edubot AI TripMate", "TaskFlow", "PrepWise AI"] },
  { id: "java", name: "Java", symbol: "Jv", number: 4, family: "Languages", isBrand: true, logoKey: "java", projectsUsed: ["Oracle SE 17 Developer Certification"] },
  { id: "typescript", name: "TypeScript", symbol: "Ts", number: 5, family: "Languages", isBrand: true, logoKey: "typescript", projectsUsed: ["Edubot AI TripMate", "CodeSense AI"] },
  { id: "javascript", name: "JavaScript", symbol: "Js", number: 6, family: "Languages", isBrand: true, logoKey: "javascript", projectsUsed: ["CodeSense AI", "TaskFlow", "PrepWise AI"] },
  { id: "sql", name: "SQL", symbol: "Sq", number: 7, family: "Languages", isBrand: true, logoKey: "sql", projectsUsed: ["CodeSense AI", "PrepWise AI"] },

  // Frameworks
  { id: "react", name: "React.js", symbol: "Re", number: 8, family: "Frameworks", isBrand: true, logoKey: "react", projectsUsed: ["Edubot AI TripMate", "CodeSense AI", "TaskFlow", "PrepWise AI"] },
  { id: "nextjs", name: "Next.js", symbol: "Nx", number: 9, family: "Frameworks", isBrand: true, logoKey: "nextjs", projectsUsed: ["Personal Portfolio"] },
  { id: "nodejs", name: "Node.js", symbol: "Nd", number: 10, family: "Frameworks", isBrand: true, logoKey: "nodejs", projectsUsed: ["CodeSense AI", "TaskFlow", "PrepWise AI"] },
  { id: "express", name: "Express.js", symbol: "Ex", number: 11, family: "Frameworks", isBrand: true, logoKey: "express", projectsUsed: ["CodeSense AI"] },
  { id: "flask", name: "Flask", symbol: "Fl", number: 12, family: "Frameworks", isBrand: true, logoKey: "flask", projectsUsed: ["Edubot AI TripMate"] },

  // Databases
  { id: "postgresql", name: "PostgreSQL", symbol: "Pg", number: 13, family: "Databases", isBrand: true, logoKey: "postgresql", projectsUsed: ["CodeSense AI", "PrepWise AI"] },
  { id: "mysql", name: "MySQL", symbol: "My", number: 14, family: "Databases", isBrand: true, logoKey: "mysql", projectsUsed: ["DBMS Coursework"] },
  { id: "mongodb", name: "MongoDB", symbol: "Mg", number: 15, family: "Databases", isBrand: true, logoKey: "mongodb", projectsUsed: ["MongoDB Associate Developer Cert"] },
  { id: "vectordb", name: "Vector Databases", symbol: "Vd", number: 16, family: "Databases", isBrand: false, logoKey: "vectordb", projectsUsed: ["Edubot AI TripMate"] },

  // Tools
  { id: "git", name: "Git", symbol: "Gt", number: 17, family: "Tools", isBrand: true, logoKey: "git", projectsUsed: ["Edubot Internship", "CodeSense AI", "TaskFlow"] },
  { id: "github", name: "GitHub", symbol: "Gh", number: 18, family: "Tools", isBrand: true, logoKey: "github", projectsUsed: ["CodeSense AI", "TaskFlow", "PrepWise AI"] },
  { id: "docker", name: "Docker", symbol: "Dk", number: 19, family: "Tools", isBrand: true, logoKey: "docker", projectsUsed: ["TaskFlow"] },
  { id: "redis", name: "Redis", symbol: "Rd", number: 20, family: "Tools", isBrand: true, logoKey: "redis", projectsUsed: ["TaskFlow"] },
  { id: "vscode", name: "VS Code", symbol: "Vc", number: 21, family: "Tools", isBrand: true, logoKey: "vscode", projectsUsed: ["Development Workspace"] },

  // Core CS & Concepts
  { id: "dsa", name: "Data Structures & Algorithms", symbol: "Da", number: 22, family: "Core CS & Concepts", isBrand: false, logoKey: "dsa", projectsUsed: ["Academic Coursework & Problem Solving"] },
  { id: "oop", name: "OOP", symbol: "Op", number: 23, family: "Core CS & Concepts", isBrand: false, logoKey: "oop", projectsUsed: ["Object-Oriented Design"] },
  { id: "dbms", name: "DBMS", symbol: "Db", number: 24, family: "Core CS & Concepts", isBrand: false, logoKey: "dbms", projectsUsed: ["Relational Database Architecture"] },
  { id: "auth", name: "Auth & Authorization", symbol: "Au", number: 25, family: "Core CS & Concepts", isBrand: false, logoKey: "auth", projectsUsed: ["CodeSense AI", "PrepWise AI"] },
  { id: "genai", name: "Generative AI", symbol: "Ai", number: 26, family: "Core CS & Concepts", isBrand: false, logoKey: "genai", projectsUsed: ["CodeSense AI", "PrepWise AI", "Edubot AI TripMate"] },
  { id: "llm", name: "LLMs & Vector Embeddings", symbol: "Lm", number: 27, family: "Core CS & Concepts", isBrand: false, logoKey: "llm", projectsUsed: ["Edubot AI TripMate", "PrepWise AI"] },
  { id: "rest", name: "REST APIs", symbol: "Ap", number: 28, family: "Core CS & Concepts", isBrand: false, logoKey: "rest", projectsUsed: ["Edubot Internship", "CodeSense AI"] }
];

export const PROJECTS: Project[] = [
  {
    id: "codesense-ai",
    index: "01",
    title: "CodeSense AI",
    kicker: "Intelligent Code Review Platform",
    description: "Created a code review platform combining 4 analysis modules: static analysis, complexity analysis, auto-documentation, and Generative AI review.",
    features: [
      "Delivered automated multi-language analysis producing 3 review outputs: bug detection, quality assessment, and optimization recommendations.",
      "Built 3 backend services on Express.js: REST APIs, user authentication, and PostgreSQL review-history storage."
    ],
    tech: ["React.js", "Node.js", "Express.js", "PostgreSQL", "REST APIs", "Generative AI"],
    github: "https://github.com/Vishnureddy0917/CodeSense-AI"
  },
  {
    id: "taskflow",
    index: "02",
    title: "TaskFlow",
    kicker: "Distributed Task Processing System",
    description: "Architected an asynchronous job system spanning 2 runtimes: Node.js producers and Python workers connected through Redis queues.",
    features: [
      "Orchestrated Redis queues with 3 reliability features: job scheduling, automatic retries, and live task monitoring.",
      "Containerized every service and worker with Docker, and visualized job status in 1 real-time React.js dashboard."
    ],
    tech: ["Node.js", "Python", "Redis", "React.js", "Docker", "Message Queues"],
    github: "https://github.com/Vishnureddy0917"
  },
  {
    id: "prepwise-ai",
    index: "03",
    title: "PrepWise AI",
    kicker: "Intelligent Technical Interview Platform",
    description: "Designed an interview platform covering 3 assessment types: coding, technical, and system-design rounds.",
    features: [
      "Automated 4 AI-driven features with Generative AI and LLM prompts: resume analysis, question generation, code evaluation, and feedback.",
      "Tracked candidate progress with 3 components: session management, PostgreSQL storage, and interactive analytics dashboards."
    ],
    tech: ["Python", "React.js", "Node.js", "PostgreSQL", "Generative AI", "LLMs"],
    github: "https://github.com/Vishnureddy0917"
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: "oracle-java",
    index: "01",
    title: "Oracle Certified Professional: Java SE 17 Developer",
    issuer: "Oracle",
    year: "2025"
  },
  {
    id: "mongodb-assoc",
    index: "02",
    title: "MongoDB Associate Developer",
    issuer: "MongoDB",
    year: "2026"
  }
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: "exp-edubot",
    type: "experience",
    year: "Jun 2025 – Jul 2025",
    title: "Python Web Development Intern",
    organization: "Edubot",
    details: [
      "Engineered AI TripMate, an AI travel planner that turns preferences into personalized destination recommendations and itineraries within a 2-month internship.",
      "Integrated 2 AI techniques, LLMs and vector embeddings, to generate context-aware itinerary content.",
      "Implemented semantic search matching traveler preferences to destination data across 3 layers: AI, backend, and frontend.",
      "Developed REST APIs connecting 2 tiers, a Flask backend and a React.js and TypeScript frontend; debugged and tested using Git."
    ]
  },
  {
    id: "edu-srm",
    type: "education",
    year: "2023 – 2027",
    title: "B.Tech in Computer Science (AI & ML)",
    organization: "SRM University, AP",
    score: "CGPA: 7.46/10",
    details: [
      "Relevant Coursework: Data Structures & Algorithms, OOP, DBMS"
    ]
  },
  {
    id: "edu-narayana",
    type: "education",
    year: "2021 – 2023",
    title: "Board of Intermediate Education",
    organization: "Narayana College, Andhra Pradesh",
    score: "92.8% (928/1000)",
    details: [
      "Mathematics, Physics, and Chemistry stream."
    ]
  },
  {
    id: "edu-nirmala",
    type: "education",
    year: "2020 – 2021",
    title: "Secondary School Certificate (SSC)",
    organization: "Nirmala High School",
    score: "10/10 points",
    details: [
      "Secondary School Certificate with perfect grade point score."
    ]
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "dance-lead",
    index: "01 / 03",
    title: "University Dance Team Lead",
    caption: "Dance Team Founder & Leader",
    detail: "Founded and led 1 independent university dance team, coordinating members and winning prizes at 2 competition levels: inter-college and university.",
    numberValue: 2,
    suffix: " Prize Levels",
    platformLogo: "/logos/dance.svg"
  },
  {
    id: "cert-oracle",
    index: "02 / 03",
    title: "Oracle SE 17 Certified",
    caption: "Java SE 17 Developer",
    detail: "Oracle Certified Professional demonstrating software engineering and backend programming mastery.",
    numberValue: 2025,
    suffix: " Certified",
    platformLogo: "/logos/oracle.svg"
  },
  {
    id: "cert-mongodb",
    index: "03 / 03",
    title: "MongoDB Associate",
    caption: "Associate Developer",
    detail: "MongoDB Associate Developer certification proving proficiency in document database design, aggregation pipelines, and NoSQL architecture.",
    numberValue: 2026,
    suffix: " Certified",
    platformLogo: "/logos/mongodb.svg"
  }
];
