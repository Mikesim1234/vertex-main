import {
  Award,
  BriefcaseBusiness,
  Building2,
  Calculator,
  Cpu,
  GraduationCap,
  Handshake,
  HeartHandshake,
  Hotel,
  LineChart,
  RefreshCw,
  ShieldCheck,
  Smile,
  Users,
  Utensils,
  type LucideIcon,
} from "lucide-react"

export const siteConfig = {
  name: "Vertex Edge Consultants",
  tagline: "Human resource solutions for modern, growth-focused organizations.",
  location: "Nairobi, Kenya",
  phone: "+254 790 669 385",
  email: "vertexrecruimentglobal@gmail.com",
}

export const navLinks = [
  { label: "Services", href: "/#services" },
  { label: "Training Areas", href: "/#training" },
  { label: "Careers / Jobs", href: "/careers" },
  { label: "Clients", href: "/#clients" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
]

export type Service = {
  id: string
  title: string
  summary: string
  description: string
  highlights: string[]
  outcomes: string[]
  icon: LucideIcon
}

export const services: Service[] = [
  {
    id: "recruitment",
    title: "Recruitment & Talent Acquisition",
    summary: "Build high-performing teams with structured hiring and onboarding.",
    description:
      "From role design to onboarding, we deliver recruitment programs that reduce time-to-hire and improve retention across industries.",
    highlights: [
      "Executive search & volume hiring",
      "Psychometric & behavioral assessments",
      "Background checks & vetting",
      "Onboarding playbooks",
    ],
    outcomes: ["Faster hiring cycles", "Stronger candidate fit", "Improved early retention"],
    icon: Users,
  },
  {
    id: "outsourcing",
    title: "HR Outsourcing & Managed Services",
    summary: "Lean HR operations with compliance and payroll handled end-to-end.",
    description:
      "We manage payroll, HR administration, and compliance so your leaders stay focused on growth and performance.",
    highlights: [
      "Payroll administration & statutory filings",
      "HR administration & records management",
      "Contract drafting & lifecycle management",
      "Compliance audits & documentation",
    ],
    outcomes: ["Lower HR overhead", "Reduced compliance risk", "Consistent employee records"],
    icon: BriefcaseBusiness,
  },
  {
    id: "learning",
    title: "Learning, Training & Organizational Development",
    summary: "Capability building that elevates service, leadership, and culture.",
    description:
      "Customized training programs aligned with operational realities and growth goals for any sector.",
    highlights: [
      "Leadership & supervisor coaching",
      "Customer service excellence",
      "Performance management workshops",
      "Culture & engagement programs",
    ],
    outcomes: ["Higher service scores", "Stronger people leadership", "Aligned team culture"],
    icon: GraduationCap,
  },
  {
    id: "performance",
    title: "Performance Management, HR Policies & Systems",
    summary: "Modern policies, KPIs, and tools that drive accountability.",
    description:
      "We design performance frameworks, HR policies, and systems that clarify expectations and enable consistent evaluation across teams.",
    highlights: [
      "HR policy design & updates",
      "Job evaluation & grading structures",
      "KPI design & appraisal tools",
      "HRIS implementation support",
    ],
    outcomes: ["Clear performance standards", "Equitable grading", "Actionable performance data"],
    icon: LineChart,
  },
  {
    id: "compliance",
    title: "Employee Relations, Labour Law & Compliance",
    summary: "Protect your brand with proactive labor and compliance guidance.",
    description:
      "We provide labor advisory, dispute resolution, and compliance support to keep your workplace stable and compliant.",
    highlights: [
      "Labour law advisory & training",
      "Disciplinary & grievance procedures",
      "Union relations support",
      "HR audits & risk mitigation",
    ],
    outcomes: ["Lower legal exposure", "Consistent employee relations", "Improved workplace trust"],
    icon: ShieldCheck,
  },
  {
    id: "compensation",
    title: "Compensation, Benefits & Workforce Strategy",
    summary: "Benchmark pay, retain top talent, and plan for growth.",
    description:
      "We design compensation and benefits strategies that are competitive, sustainable, and aligned with organizational goals.",
    highlights: [
      "Salary benchmarking & market analysis",
      "Benefits design & retention strategies",
      "Succession planning & workforce modeling",
      "Organizational restructuring",
    ],
    outcomes: ["Competitive reward structures", "Improved retention", "Resilient workforce plans"],
    icon: Award,
  },
  {
    id: "digital",
    title: "HR Systems, Digital Transformation & AI",
    summary: "Digitize HR processes and unlock people analytics.",
    description:
      "We help teams implement HR systems, automate workflows, and apply analytics for smarter workforce decisions.",
    highlights: [
      "HR systems selection & rollout",
      "Workflow automation & self-service",
      "People analytics dashboards",
      "AI-enabled recruitment insights",
    ],
    outcomes: ["Faster HR workflows", "Data-driven people decisions", "Better employee experience"],
    icon: Cpu,
  },
]

export type TrainingProgram = {
  id: string
  title: string
  description: string
  icon: LucideIcon
}

export type TrainingArea = {
  id: string
  title: string
  description: string
  icon: LucideIcon
  programs: TrainingProgram[]
}

export const trainingAreas: TrainingArea[] = [
  {
    id: "hospitality-excellence",
    title: "Hospitality Excellence",
    description: "Core service standards and operational excellence for hotels and dining teams.",
    icon: Hotel,
    programs: [
      {
        id: "food-safety",
        title: "Food Safety",
        description: "Hygiene, handling, and safety protocols aligned with hospitality standards.",
        icon: Utensils,
      },
      {
        id: "haccp",
        title: "HACCP",
        description: "Hazard analysis and critical control points for compliant operations.",
        icon: ShieldCheck,
      },
      {
        id: "food-costing",
        title: "Food Costing",
        description: "Menu engineering and cost controls to protect profitability.",
        icon: Calculator,
      },
      {
        id: "customer-service",
        title: "Customer Service",
        description: "Service excellence frameworks for memorable guest experiences.",
        icon: Smile,
      },
      {
        id: "team-building",
        title: "Team Building",
        description: "High-trust team dynamics and collaboration practices.",
        icon: Handshake,
      },
    ],
  },
  {
    id: "leadership",
    title: "Leadership & People Management",
    description: "Leadership, coaching, and engagement training for managers across industries.",
    icon: Users,
    programs: [
      {
        id: "supervisory-skills",
        title: "Supervisory Essentials",
        description: "Daily leadership habits that improve accountability and trust.",
        icon: Users,
      },
      {
        id: "coaching-feedback",
        title: "Coaching & Feedback",
        description: "Performance conversations, conflict management, and motivation.",
        icon: Handshake,
      },
      {
        id: "workplace-culture",
        title: "Workplace Culture",
        description: "Engagement, inclusion, and values-driven leadership.",
        icon: HeartHandshake,
      },
    ],
  },
  {
    id: "compliance-policy",
    title: "HR Compliance & Policy",
    description: "Risk-aware HR practices for regulated environments.",
    icon: ShieldCheck,
    programs: [
      {
        id: "labour-law",
        title: "Labour Law Essentials",
        description: "Employment law, contracts, and dispute prevention.",
        icon: ShieldCheck,
      },
      {
        id: "discipline-grievance",
        title: "Discipline & Grievance",
        description: "Fair processes and documentation for people issues.",
        icon: BriefcaseBusiness,
      },
      {
        id: "safety-compliance",
        title: "Safety & Compliance",
        description: "Workplace safety standards and compliance audits.",
        icon: Building2,
      },
    ],
  },
  {
    id: "talent-hiring",
    title: "Talent Acquisition",
    description: "Hiring and onboarding practices that scale with growth.",
    icon: BriefcaseBusiness,
    programs: [
      {
        id: "interviewing",
        title: "Structured Interviewing",
        description: "Bias-reduced interview guides and scorecards.",
        icon: Users,
      },
      {
        id: "employer-branding",
        title: "Employer Branding",
        description: "Attracting top talent through messaging and candidate experience.",
        icon: Building2,
      },
      {
        id: "onboarding",
        title: "Onboarding Excellence",
        description: "First-90-day playbooks that improve retention.",
        icon: GraduationCap,
      },
    ],
  },
  {
    id: "performance-culture",
    title: "Performance & Culture",
    description: "Performance systems and culture-building for results-driven teams.",
    icon: LineChart,
    programs: [
      {
        id: "kpi-design",
        title: "KPI & Goal Setting",
        description: "Align team goals with measurable outcomes.",
        icon: LineChart,
      },
      {
        id: "appraisals",
        title: "Appraisals & Reviews",
        description: "Modern performance review frameworks.",
        icon: Award,
      },
      {
        id: "change-management",
        title: "Change Management",
        description: "Support teams through transitions and restructuring.",
        icon: RefreshCw,
      },
    ],
  },
  {
    id: "digital-hr",
    title: "HR Digital & Analytics",
    description: "Tools and analytics that modernize people operations.",
    icon: Cpu,
    programs: [
      {
        id: "hris",
        title: "HRIS Fundamentals",
        description: "Selecting and implementing HR systems that fit.",
        icon: Cpu,
      },
      {
        id: "people-analytics",
        title: "People Analytics",
        description: "Dashboards, reporting, and data-driven decisions.",
        icon: LineChart,
      },
      {
        id: "automation",
        title: "HR Process Automation",
        description: "Workflow optimization and self-service enablement.",
        icon: Calculator,
      },
    ],
  },
]

export type Client = {
  name: string
  industry: string
  logo?: string
}

export const clients: Client[] = [
  {
    name: "OKASH City Boutique Hotel",
    industry: "Boutique Hospitality",
    logo: "/clients/okash-hotel.png",
  },
  {
    name: "The Base Hotel",
    industry: "Hotel & Lodging",
    logo: "/clients/the-base-hotel.png",
  },
  { name: "Hychem", industry: "Manufacturing" },
  {
    name: "RNB Rejuvenating Nature's Beam",
    industry: "Wellness & Spa",
    logo: "/clients/rnb-wellness.png",
  },
  {
    name: "Impact Hospitality & Tourism Institute",
    industry: "Training & Education",
    logo: "/clients/impact-hospitality.png",
  },
  {
    name: "Ubuntu Life Cafe",
    industry: "Cafe & Dining",
    logo: "/clients/ubuntu-life.png",
  },
  {
    name: "Argyle Grand Hotel",
    industry: "Luxury Hospitality",
    logo: "/clients/argyle-grand-hotel.png",
  },
  {
    name: "Endeavour Linen Ltd.",
    industry: "Hospitality Services",
    logo: "/clients/endeavour-linen.png",
  },
  { name: "1000 Horses Recruitment", industry: "Recruitment" },
  {
    name: "AJ Apex Media",
    industry: "Media",
    logo: "/clients/aj-apex-media.png",
  },
]

export const companyValues = [
  "Industry-agnostic talent strategies with measurable impact",
  "Compliance-driven HR practices that protect your brand",
  "Data-informed people decisions and operational visibility",
  "Leadership development that elevates service delivery",
]

export const companyStats = [
  { value: 100, label: "Professionals Placed", suffix: "+" },
  { value: 95, label: "Client Satisfaction", suffix: "%" },
  { value: 2, label: "Years in Market", suffix: "+" },
]
