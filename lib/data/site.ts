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
  url: "https://www.vertexedgeconsultants.co.ke",
  location: "Nairobi, Kenya",
  phone: "+254 734 933297",
  email: "info@vertexedgeconsultants.co.ke",
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
  href?: string
}

export const services: Service[] = [
  {
    id: "recruitment",
    title: "Recruitment & Talent Acquisition",
    summary: "Build high-performing teams with a recruitment agency in Kenya that understands local talent markets.",
    description:
      "From role design to onboarding, we deliver recruitment and talent acquisition programs in Kenya that reduce time-to-hire and improve retention across industries.",
    highlights: [
      "Executive search & volume hiring",
      "Psychometric & behavioral assessments",
      "Background checks & vetting",
      "Onboarding playbooks",
    ],
    outcomes: ["Faster hiring cycles", "Stronger candidate fit", "Improved early retention"],
    icon: Users,
    href: "/services/recruitment-agency-kenya",
  },
  {
    id: "staffing",
    title: "Staffing Solutions & Workforce Support",
    summary: "Flexible staffing solutions in Kenya for short-term, project-based, and outsourced workforce needs.",
    description:
      "We help organizations source, onboard, and coordinate reliable staff for operational peaks, new locations, and project-based workforce requirements.",
    highlights: [
      "Temporary and project staffing",
      "Volume hiring support",
      "Workforce onboarding coordination",
      "Role profiling and candidate screening",
    ],
    outcomes: ["Reliable staffing cover", "Faster operational ramp-up", "Better workforce visibility"],
    icon: BriefcaseBusiness,
    href: "/services/staffing-solutions-kenya",
  },
  {
    id: "outsourcing",
    title: "HR Outsourcing & Managed Services",
    summary: "Lean HR outsourcing in Kenya with compliance, payroll coordination, and HR administration support.",
    description:
      "We manage HR administration, compliance workflows, and people operations so your leaders stay focused on growth and performance.",
    highlights: [
      "Payroll administration & statutory filings",
      "HR administration & records management",
      "Contract drafting & lifecycle management",
      "Compliance audits & documentation",
    ],
    outcomes: ["Lower HR overhead", "Reduced compliance risk", "Consistent employee records"],
    icon: BriefcaseBusiness,
    href: "/services/hr-outsourcing-kenya",
  },
  {
    id: "learning",
    title: "Learning, Training & Organizational Development",
    summary: "Corporate training in Kenya that strengthens leadership, service delivery, compliance, and culture.",
    description:
      "Customized corporate training and HR training programs aligned with operational realities and growth goals for any sector.",
    highlights: [
      "Leadership & supervisor coaching",
      "Customer service excellence",
      "Performance management workshops",
      "Culture & engagement programs",
    ],
    outcomes: ["Higher service scores", "Stronger people leadership", "Aligned team culture"],
    icon: GraduationCap,
    href: "/services/corporate-training-kenya",
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

export const seoKeywords = [
  "Recruitment agency Kenya",
  "Recruitment company Nairobi",
  "Staffing agency Kenya",
  "Staffing solutions Nairobi",
  "HR outsourcing Kenya",
  "HR outsourcing Nairobi",
  "Corporate training Kenya",
  "Corporate training Nairobi",
  "HR training Kenya",
  "HR consultants Kenya",
  "HR consultants Nairobi",
  "Talent acquisition Kenya",
  "Talent acquisition services Nairobi",
  "Recruitment services Nairobi",
  "HR consulting services Kenya",
  "Employee recruitment agency Nairobi",
  "Executive recruitment Kenya",
  "HR staffing solutions Kenya",
  "Payroll outsourcing Kenya",
  "HR administration services Nairobi",
  "Compliance HR services Kenya",
  "Leadership training Kenya",
  "Workforce recruitment Nairobi",
]

export type Faq = {
  question: string
  answer: string
}

export const homepageFaqs: Faq[] = [
  {
    question: "Does Vertex Edge Consultants provide recruitment services across Kenya?",
    answer:
      "Yes. Vertex Edge Consultants supports employers in Nairobi and across Kenya with recruitment, staffing, screening, onboarding, and talent acquisition support for growing teams.",
  },
  {
    question: "Can you handle HR outsourcing for small and mid-sized businesses?",
    answer:
      "Yes. We support lean HR teams with HR administration, compliance workflows, payroll coordination, employee records, and managed HR operations that reduce internal workload.",
  },
  {
    question: "Do you offer corporate training for managers and frontline teams?",
    answer:
      "Yes. Our corporate training programs cover leadership, customer service, performance management, HR compliance, team building, hospitality excellence, and HR systems.",
  },
  {
    question: "Which industries do you serve?",
    answer:
      "We work with hospitality, manufacturing, media, wellness, training institutions, recruitment firms, and other growth-focused organizations that need practical people solutions.",
  },
]

export const caseStudySnapshots = [
  {
    title: "Hospitality hiring and service readiness",
    description:
      "Recruitment, onboarding guidance, and training support for hotels, cafes, and hospitality teams that need dependable service delivery.",
  },
  {
    title: "Training and learning partnerships",
    description:
      "Practical corporate training and HR training programs for teams that need stronger leadership, compliance, and customer experience habits.",
  },
  {
    title: "People operations support for growing teams",
    description:
      "HR consulting, documentation, and workforce support for organizations that need clearer people processes as they scale.",
  },
]

export const trustSignals = [
  "Nairobi-based HR consultants serving employers across Kenya",
  "Client experience across hospitality, manufacturing, media, wellness, and training",
  "Structured screening, documentation, and compliance-led HR delivery",
  "Practical training programs built around measurable workplace outcomes",
]

export type ServiceLandingPage = {
  slug: string
  serviceId: string
  shortTitle: string
  title: string
  metaTitle: string
  metaDescription: string
  keywords: string[]
  summary: string
  hero: string
  intro: string
  image: string
  benefits: string[]
  deliverables: string[]
  process: string[]
  faqs: Faq[]
}

export const serviceLandingPages: ServiceLandingPage[] = [
  {
    slug: "recruitment-agency-kenya",
    serviceId: "recruitment",
    shortTitle: "Recruitment",
    title: "Recruitment Agency in Kenya",
    metaTitle: "Recruitment Agency Kenya | Talent Acquisition Consultants",
    metaDescription:
      "Hire qualified talent faster with Vertex Edge Consultants, a Nairobi recruitment agency in Kenya for screening, shortlisting, interviews, and onboarding support.",
    keywords: ["Recruitment agency Kenya", "Recruitment company Kenya", "Talent acquisition Kenya"],
    summary:
      "Structured recruitment and talent acquisition for Kenyan employers that need reliable shortlists, clearer hiring decisions, and smoother onboarding.",
    hero:
      "Find and hire qualified candidates in Kenya with a recruitment partner that understands role design, screening, interviews, compliance, and onboarding.",
    intro:
      "Vertex Edge Consultants helps organizations in Nairobi and across Kenya move from unclear hiring needs to confident hiring decisions. We support role definition, candidate sourcing, screening, interviews, reference checks, and onboarding coordination so your team can hire with speed and discipline.",
    image: "/corporate-office-business-team-collaboration-moder.jpg",
    benefits: [
      "Reduce time spent reviewing unsuitable applications",
      "Improve candidate quality through structured screening",
      "Build interview processes that compare candidates fairly",
      "Protect retention by aligning skills, culture, and role expectations",
    ],
    deliverables: [
      "Role scorecards and candidate profiles",
      "Sourcing, screening, and shortlist management",
      "Interview coordination and assessment support",
      "Reference checks and onboarding guidance",
    ],
    process: [
      "Clarify the role, success metrics, and hiring timeline",
      "Source and screen candidates against the agreed profile",
      "Shortlist candidates with structured notes and recommendations",
      "Support selection, offer coordination, and onboarding handover",
    ],
    faqs: [
      {
        question: "What makes Vertex Edge Consultants a strong recruitment company in Kenya?",
        answer:
          "We combine local market knowledge with structured screening and practical HR experience, helping employers identify candidates who can perform in the role and fit the work environment.",
      },
      {
        question: "Do you recruit for both specialist and volume roles?",
        answer:
          "Yes. We support targeted professional hiring as well as volume recruitment for teams that need several qualified candidates within a defined timeline.",
      },
      {
        question: "Can you help improve our hiring process before recruitment starts?",
        answer:
          "Yes. We can refine job descriptions, interview criteria, scorecards, onboarding requirements, and candidate communication before sourcing begins.",
      },
    ],
  },
  {
    slug: "staffing-solutions-kenya",
    serviceId: "staffing",
    shortTitle: "Staffing",
    title: "Staffing Solutions in Kenya",
    metaTitle: "Staffing Solutions Kenya | Flexible Workforce Support",
    metaDescription:
      "Get reliable staffing solutions in Kenya for temporary, project-based, outsourced, and operational workforce needs with Vertex Edge Consultants.",
    keywords: ["Staffing agency Kenya", "Staffing solutions Kenya", "Temporary staffing Kenya"],
    summary:
      "Flexible staffing support for employers that need reliable people for operational peaks, project roles, temporary cover, or workforce expansion.",
    hero:
      "Scale your workforce with staffing solutions in Kenya designed for speed, compliance, and day-to-day operational reliability.",
    intro:
      "When demand changes quickly, your staffing model needs to respond without creating avoidable HR risk. Vertex Edge Consultants supports Kenyan employers with workforce planning, candidate screening, onboarding coordination, and ongoing staffing support for temporary and project-based needs.",
    image: "/professional-business-team-collaboration-in-modern.jpg",
    benefits: [
      "Respond faster to seasonal or project-based workforce demand",
      "Reduce hiring pressure on internal managers",
      "Improve worker fit through clear role profiling",
      "Maintain better visibility across outsourced or temporary teams",
    ],
    deliverables: [
      "Staffing needs analysis and role mapping",
      "Candidate screening and shortlist coordination",
      "Onboarding documentation and deployment support",
      "Workforce check-ins and performance feedback loops",
    ],
    process: [
      "Map the workforce requirement, location, schedule, and role expectations",
      "Screen candidates for skill fit, reliability, and availability",
      "Coordinate onboarding requirements and deployment readiness",
      "Review staffing performance and adjust support as needs change",
    ],
    faqs: [
      {
        question: "What types of staffing solutions do you support in Kenya?",
        answer:
          "We support temporary staffing, project staffing, volume staffing, operational workforce support, and staff outsourcing coordination for Kenyan employers.",
      },
      {
        question: "Can staffing support be combined with recruitment?",
        answer:
          "Yes. Many clients combine staffing support with recruitment when they need both immediate workforce cover and longer-term permanent hires.",
      },
      {
        question: "Do you help with onboarding for outsourced staff?",
        answer:
          "Yes. We support onboarding coordination, role expectations, documentation, and performance check-ins so managers have clearer visibility from the start.",
      },
    ],
  },
  {
    slug: "hr-outsourcing-kenya",
    serviceId: "outsourcing",
    shortTitle: "HR Outsourcing",
    title: "HR Outsourcing in Kenya",
    metaTitle: "HR Outsourcing Kenya | Managed HR Consulting Services",
    metaDescription:
      "Outsource HR administration, compliance, employee records, payroll coordination, and people operations to Vertex Edge Consultants in Nairobi, Kenya.",
    keywords: ["HR outsourcing Kenya", "HR consultants Kenya", "HR consulting Kenya"],
    summary:
      "Managed HR outsourcing and consulting support for organizations that need compliant, organized, and scalable people operations.",
    hero:
      "Run cleaner HR operations with Nairobi-based HR outsourcing support for administration, compliance, employee records, and people processes.",
    intro:
      "Vertex Edge Consultants helps organizations reduce HR workload while improving consistency, compliance, and employee experience. Our HR outsourcing support is designed for businesses that need practical HR administration, stronger documentation, and trusted HR consulting without building a full internal department immediately.",
    image: "/corporate-office-business-team-collaboration-moder.jpg",
    benefits: [
      "Lower internal HR administration pressure",
      "Improve documentation and compliance discipline",
      "Create clearer employee lifecycle processes",
      "Give leaders better people operations visibility",
    ],
    deliverables: [
      "HR administration and employee records support",
      "Policy, contract, and compliance documentation reviews",
      "Payroll coordination and statutory workflow support",
      "Employee relations and performance process guidance",
    ],
    process: [
      "Audit current HR records, policies, and operating gaps",
      "Prioritize compliance and employee lifecycle improvements",
      "Set up repeatable HR administration workflows",
      "Review outcomes regularly and refine HR support as the team grows",
    ],
    faqs: [
      {
        question: "What HR functions can be outsourced?",
        answer:
          "Common HR outsourcing areas include employee records, onboarding, policy updates, payroll coordination, compliance tracking, HR administration, and performance process support.",
      },
      {
        question: "Is HR outsourcing suitable for small businesses in Kenya?",
        answer:
          "Yes. It is often useful for small and mid-sized businesses that need professional HR support but are not ready to build a large internal HR team.",
      },
      {
        question: "Can you support HR consulting projects as well?",
        answer:
          "Yes. We support HR audits, policy reviews, performance management frameworks, role design, employee relations processes, and HR systems advisory.",
      },
    ],
  },
  {
    slug: "corporate-training-kenya",
    serviceId: "learning",
    shortTitle: "Corporate Training",
    title: "Corporate Training in Kenya",
    metaTitle: "Corporate Training Kenya | HR Training & Leadership Programs",
    metaDescription:
      "Build stronger managers and frontline teams with corporate training in Kenya covering leadership, HR training, customer service, compliance, and performance.",
    keywords: ["Corporate training Kenya", "HR training Kenya", "Leadership training Kenya"],
    summary:
      "Practical corporate training and HR training programs for Kenyan teams that need stronger leadership, service, compliance, and performance habits.",
    hero:
      "Equip managers and teams with corporate training in Kenya that turns learning into better workplace behavior and measurable outcomes.",
    intro:
      "Vertex Edge Consultants designs training around the realities of the workplace. We help organizations strengthen leadership, customer service, HR compliance, performance management, team culture, and digital HR readiness through practical sessions that connect learning to day-to-day work.",
    image: "/professional-business-team-collaboration-in-modern.jpg",
    benefits: [
      "Improve manager confidence and people leadership",
      "Strengthen service delivery and team accountability",
      "Reduce compliance gaps through practical HR training",
      "Create shared language around performance and culture",
    ],
    deliverables: [
      "Training needs assessment and learning objectives",
      "Facilitated workshops for managers and frontline teams",
      "Workplace exercises, discussion guides, and action plans",
      "Post-training feedback and improvement recommendations",
    ],
    process: [
      "Define the capability gap and training audience",
      "Design a focused program with practical examples and exercises",
      "Facilitate sessions in a format that fits the team",
      "Capture feedback and recommend next-step capability building",
    ],
    faqs: [
      {
        question: "What corporate training topics do you offer in Kenya?",
        answer:
          "We cover leadership, customer service, performance management, HR policies, labour compliance, team building, hospitality excellence, HR systems, and people analytics.",
      },
      {
        question: "Can training be customized for our industry?",
        answer:
          "Yes. Training can be tailored to your sector, audience level, operational challenges, and the behavior changes you want to see after the session.",
      },
      {
        question: "Do you offer HR training for managers?",
        answer:
          "Yes. We train managers on practical HR topics such as performance conversations, documentation, policy compliance, coaching, feedback, discipline, and team culture.",
      },
    ],
  },
]
