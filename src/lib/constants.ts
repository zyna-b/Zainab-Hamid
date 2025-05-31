import type { NavItem, Project, Service, Skill, Certification, FAQ, AIExperiment, Experience } from './types';
import { Palette, Zap, Briefcase, Code as LucideCode, Brain as LucideBrain, Smartphone as LucideSmartphone } from 'lucide-react';

export const NAV_ITEMS: NavItem[] = [
  { title: 'Home', href: '/' },
  { title: 'About', href: '/about' },
  { title: 'Portfolio', href: '/portfolio' },
  { title: 'Services', href: '/services' },
  { title: 'AI Experiments', href: '/ai-experiments' },
  { title: 'Contact', href: '/contact' },
];

export const SITE_NAME = "Zainab Hamid";
export const SITE_DESCRIPTION = "Chief Developer & AI Engineer";
export const EMAIL = "contact@zainabhamid.tech"; 
export const RESUME_LINK = "/placeholder-resume.pdf"; 

export const SOCIAL_LINKS = {
  github: "https://github.com/zainabhamid", 
  linkedin: "https://linkedin.com/in/zainabhamid", 
  twitter: "https://twitter.com/zainabhamid", 
};

export const EXPERIENCE_DATA: Experience[] = [
  {
    role: "Chief Developer",
    company: "Technologistics.pk",
    location: "Lahore, Pakistan",
    date: "Nov 2024 – Present",
    description: [
      "Leads front-end and back-end development of scalable and performant web applications.",
      "Focuses on cross-functional collaboration, UX optimization, and ensuring responsiveness and load efficiency across devices."
    ]
  },
  {
    role: "Head of Events – AI Society",
    company: "The Superior University",
    location: "Pakistan",
    date: "Feb 2025 – Present",
    description: [
      "Leads AI-centered workshops, knowledge sessions, and tech events.",
      "First initiative includes a Python & AI fundamentals training series aimed at beginners."
    ]
  }
];

export const SKILLS_DATA: Skill[] = [
  { name: "Python", category: "Programming Languages" },
  { name: "JavaScript", category: "Programming Languages" },
  { name: "TypeScript", category: "Programming Languages" },
  { name: "Java", category: "Programming Languages" },
  { name: "Go", category: "Programming Languages" },
  { name: "Rust", category: "Programming Languages" },
  { name: "Next.js", category: "Frameworks & Libraries" },
  { name: "React", category: "Frameworks & Libraries" },
  { name: "Node.js", category: "Frameworks & Libraries" },
  { name: "Angular", category: "Frameworks & Libraries" },
  { name: "Vue.js", category: "Frameworks & Libraries" },
  { name: "Tailwind CSS", category: "Frameworks & Libraries" },
  { name: "Bootstrap", category: "Frameworks & Libraries" },
  { name: "TensorFlow", category: "AI & Machine Learning" },
  { name: "PyTorch", category: "AI & Machine Learning" },
  { name: "Scikit-learn", category: "AI & Machine Learning" },
  { name: "OpenCV", category: "AI & Machine Learning" },
  { name: "Hugging Face Transformers", category: "AI & Machine Learning" },
  { name: "LangChain", category: "AI & Machine Learning" },
  { name: "SQL", category: "Databases" },
  { name: "PostgreSQL", category: "Databases" },
  { name: "MySQL", category: "Databases" },
  { name: "SQLite", category: "Databases" },
  { name: "MongoDB", category: "Databases" },
  { name: "Firebase Realtime DB", category: "Databases" },
  { name: "Firestore", category: "Databases" },
  { name: "Supabase", category: "Databases" },
  { name: "Git", category: "DevOps & Tools" },
  { name: "Docker", category: "DevOps & Tools" },
  { name: "GitHub Actions", category: "DevOps & Tools" },
  { name: "Kubernetes", category: "DevOps & Tools" },
  { name: "Postman", category: "DevOps & Tools" },
  { name: "Swagger", category: "DevOps & Tools" },
  { name: "AWS", category: "Cloud Platforms" },
  { name: "Firebase", category: "Cloud Platforms" },
  { name: "Google Cloud Platform", category: "Cloud Platforms" },
  { name: "Microsoft Azure", category: "Cloud Platforms" },
  { name: "Heroku", category: "Cloud Platforms" },
  { name: "Vercel", category: "Cloud Platforms" },
  { name: "Netlify", category: "Cloud Platforms" },
  { name: "Railway", category: "Cloud Platforms" },
  { name: "Render", category: "Cloud Platforms" },
  { name: "Kotlin (Android)", category: "Mobile Development" },
  { name: "Swift (iOS)", category: "Mobile Development" },
  { name: "Flutter", category: "Mobile Development" },
  { name: "React Native", category: "Mobile Development" },
];

export const CERTIFICATIONS_DATA: Certification[] = [
  { name: "Foundations of SQL & Database Querying", issuer: "Sololearn", date: "May 2025", link: "#" },
  { name: "CV Writing Workshop", issuer: "The Superior University", date: "Jan 2025", link: "#" },
  { name: "Introduction to Python", issuer: "Coursera", date: "Date not specified", link: "#" },
  { name: "AI For Everyone", issuer: "DeepLearning.AI", date: "Date not specified", link: "#" },
  { name: "Responsive Web Design", issuer: "freeCodeCamp", date: "Date not specified", link: "#" },
  { name: "JavaScript Essentials", issuer: "LinkedIn Learning", date: "Date not specified", link: "#" }
];

export const PROJECTS_DATA: Project[] = [
  {
    id: "project-1",
    title: "AI-Powered Content Recommendation Engine",
    description: "Developed a personalized content recommendation system using collaborative filtering and NLP techniques. Improved user engagement by 30%.",
    imageSrc: "https://placehold.co/600x400.png",
    dataAiHint: "technology abstract",
    tags: ["AI/ML", "Python", "TensorFlow", "Flask", "React"],
    liveLink: "#",
    sourceLink: "#",
    category: "AI"
  },
  {
    id: "project-2",
    title: "E-commerce Platform Rebuild",
    description: "Led the full-stack development of a modern e-commerce platform with Next.js, Stripe integration, and a custom CMS.",
    imageSrc: "https://placehold.co/600x400.png",
    dataAiHint: "website interface",
    tags: ["Web", "Next.js", "TypeScript", "Node.js", "PostgreSQL"],
    liveLink: "#",
    sourceLink: "#",
    category: "Web"
  },
  {
    id: "project-3",
    title: "Mobile Health & Wellness App",
    description: "Designed and developed a cross-platform mobile app for tracking fitness goals and providing personalized workout plans.",
    imageSrc: "https://placehold.co/600x400.png",
    dataAiHint: "mobile app",
    tags: ["Mobile", "React Native", "Firebase", "UX/UI"],
    liveLink: "#",
    sourceLink: "#",
    category: "Mobile"
  },
  {
    id: "project-4",
    title: "Automated Software Testing Suite",
    description: "Built an automated testing framework for a large-scale enterprise application, reducing regression testing time by 70%.",
    imageSrc: "https://placehold.co/600x400.png",
    dataAiHint: "software code",
    tags: ["Software", "Java", "Selenium", "Jenkins", "CI/CD"],
    liveLink: "#",
    sourceLink: "#",
    category: "Software"
  },
   {
    id: "project-5",
    title: "Sentiment Analysis API",
    description: "Created a robust API for real-time sentiment analysis of text data, utilized by marketing teams for brand monitoring.",
    imageSrc: "https://placehold.co/600x400.png",
    dataAiHint: "data visualization",
    tags: ["AI", "Python", "NLP", "FastAPI", "Docker"],
    liveLink: "#",
    sourceLink: "#",
    category: "AI"
  },
  {
    id: "project-6",
    title: "Interactive Data Visualization Dashboard",
    description: "Developed a web-based dashboard for visualizing complex datasets, enabling better data-driven decision-making.",
    imageSrc: "https://placehold.co/600x400.png",
    dataAiHint: "charts graphs",
    tags: ["Web", "React", "D3.js", "Python", "Flask"],
    liveLink: "#",
    sourceLink: "#",
    category: "Web"
  }
];

export const SERVICES_DATA: Service[] = [
  {
    id: "service-1",
    title: "Custom AI Solutions",
    description: "Leverage the power of AI with bespoke solutions including machine learning models, NLP, computer vision, and predictive analytics to solve your unique business challenges.",
    icon: LucideBrain,
  },
  {
    id: "service-2",
    title: "Full-Stack Web Development",
    description: "End-to-end web application development, from intuitive front-end interfaces with React/Next.js to robust back-end systems using Node.js, Python, or Java.",
    icon: LucideCode,
  },
  {
    id: "service-3",
    title: "Mobile App Development",
    description: "Cross-platform and native mobile app development for iOS and Android, focusing on user experience, performance, and scalability.",
    icon: LucideSmartphone,
  },
  {
    id: "service-4",
    title: "Software Development & Architecture",
    description: "Building scalable and maintainable software solutions, API design, microservices architecture, and cloud-native application development.",
    icon: Briefcase,
  },
  {
    id: "service-5",
    title: "UI/UX Design & Prototyping",
    description: "Crafting user-centric designs and interactive prototypes that enhance usability and deliver engaging digital experiences.",
    icon: Palette,
  },
  {
    id: "service-6",
    title: "Tech Consulting & Strategy",
    description: "Providing expert guidance on technology adoption, digital transformation, and AI strategy to help businesses innovate and grow.",
    icon: Zap,
  },
];

export const AI_EXPERIMENTS_DATA: AIExperiment[] = [
  {
    id: "exp-1",
    title: "Real-time Object Detection",
    description: "A live demo showcasing object detection in video streams using YOLOv5. Try it with your webcam!",
    imageSrc: "https://placehold.co/600x400.png",
    dataAiHint: "camera technology",
    tags: ["Computer Vision", "YOLOv5", "Python"],
    interactiveLink: "#"
  },
  {
    id: "exp-2",
    title: "Generative Art with GANs",
    description: "Explore unique artworks generated by a StyleGAN model trained on abstract patterns. Refresh to see new creations.",
    imageSrc: "https://placehold.co/600x400.png",
    dataAiHint: "abstract art",
    tags: ["Generative AI", "GANs", "TensorFlow"],
    interactiveLink: "#"
  },
  {
    id: "exp-3",
    title: "Text Summarization Tool",
    description: "Paste a long article and get a concise summary generated by a transformer-based model.",
    imageSrc: "https://placehold.co/600x400.png",
    dataAiHint: "text document",
    tags: ["NLP", "Transformers", "Hugging Face"],
    interactiveLink: "#"
  }
];

export const FAQS_DATA: FAQ[] = [
  {
    question: "What kind of AI projects have you worked on?",
    answer: "I've worked on a variety of AI projects including natural language processing, computer vision, predictive analytics, and recommendation systems. You can find some examples in my portfolio."
  },
  {
    question: "What is your preferred tech stack for web development?",
    answer: "I'm proficient with the MERN stack (MongoDB, Express, React, Node.js) and also extensively use Next.js with TypeScript for modern web applications. I'm adaptable and can work with other technologies based on project requirements."
  },
  {
    question: "Are you available for freelance projects?",
    answer: "Yes, I am currently available for freelance projects and consulting opportunities. Please reach out via the contact form or email to discuss your project."
  },
  {
    question: "How do you approach a new software development project?",
    answer: "I follow an agile methodology, starting with understanding the requirements, followed by iterative design, development, testing, and deployment. Communication and collaboration are key throughout the process."
  }
];
