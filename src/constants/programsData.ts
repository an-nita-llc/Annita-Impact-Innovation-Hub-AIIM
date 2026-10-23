export interface PartnerOrg {
  id: string;
  name: string;
  logo: string;
  bio: string;
  website: string;
  contactEmail: string;
}

export interface Module {
  id: string;
  title: string;
  contentType: 'video' | 'text' | 'quiz' | 'external_link';
  content: string;
  estimatedTime?: string;
}

export interface Program {
  id: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  partnerId: string;
  audience: ('Youth' | 'MSME Owner' | 'Student' | 'Entrepreneur' | 'Creative')[];
  format: 'Self-paced' | 'Live' | 'Hybrid' | 'Cohort';
  duration: string; // e.g. "4 modules, 2 hours total" or "6 modules across 6 weeks"
  status: 'Open' | 'Coming Soon' | 'Enrollment Closed' | 'Archived';
  enrolledCount: number;
  hasCertificate: boolean;
  featured: boolean;
  modules: Module[];
  bundledProgramIds?: string[]; // For bundled pathways like "The MSME Formalization Track"
}

export interface SchoolLead {
  id: string;
  name: string;
  institution: string;
  email: string;
  phone?: string;
  partnershipType: string;
  message: string;
  submittedAt: string;
  status: 'Pending' | 'Contacted' | 'Archived';
}

export const PARTNERS: PartnerOrg[] = [
  {
    id: "moc",
    name: "Ministry of Commerce & Industry",
    logo: "https://api.dicebear.com/7.x/identicon/svg?seed=moc&backgroundColor=b91c1c",
    bio: "The government agency responsible for promoting, developing, and regulating trade, commerce, and industrial activities in Liberia.",
    website: "https://moci.gov.lr",
    contactEmail: "partnerships@moci.gov.lr"
  },
  {
    id: "lra",
    name: "Liberia Revenue Authority",
    logo: "https://api.dicebear.com/7.x/identicon/svg?seed=lra&backgroundColor=1e3a8a",
    bio: "The autonomous agency of government charged with task of assessing, collecting, and accounting for national revenues in Liberia.",
    website: "https://lra.gov.lr",
    contactEmail: "compliance@lra.gov.lr"
  },
  {
    id: "wipo",
    name: "World Intellectual Property Organization (WIPO)",
    logo: "https://api.dicebear.com/7.x/identicon/svg?seed=wipo&backgroundColor=0369a1",
    bio: "WIPO is the global forum for intellectual property services, policy, information and cooperation, working to develop a balanced and effective international IP system.",
    website: "https://www.wipo.int",
    contactEmail: "regional.office@wipo.int"
  },
  {
    id: "annita",
    name: "Annita LLC",
    logo: "https://api.dicebear.com/7.x/identicon/svg?seed=annita&backgroundColor=ffd700",
    bio: "A diversified Pan-African company building solutions for marketplace trading, digital payments, logistics, and enterprise intelligence.",
    website: "https://annitastore.com",
    contactEmail: "ecosystem@annitastore.com"
  },
  {
    id: "smc",
    name: "Participating Colleges & High Schools",
    logo: "https://api.dicebear.com/7.x/identicon/svg?seed=smc&backgroundColor=047857",
    bio: "A collection of premier academic institutions in West Africa collaborating with AIIM to train students in real-world problem-solving, digital skills, and business models.",
    website: "https://aiim.hub/schools",
    contactEmail: "education@annitahub.com"
  },
  {
    id: "lbdi",
    name: "Liberian Bank for Development and Investment (LBDI)",
    logo: "https://api.dicebear.com/7.x/identicon/svg?seed=lbdi&backgroundColor=4338ca",
    bio: "Liberia's leading investment bank, providing capital, banking, financial planning, and advisory services to support small and medium enterprises.",
    website: "https://lbdi.net",
    contactEmail: "msme-desk@lbdi.net"
  },
  {
    id: "orange",
    name: "Orange Liberia",
    logo: "https://api.dicebear.com/7.x/identicon/svg?seed=orange&backgroundColor=ea580c",
    bio: "A major telecommunications provider in Liberia, delivering high-speed internet connectivity, cellular networks, and digital financial solutions.",
    website: "https://orange.com.lr",
    contactEmail: "orange-money@orange.com.lr"
  },
  {
    id: "mentors",
    name: "AIIM Mentors Alliance",
    logo: "https://api.dicebear.com/7.x/identicon/svg?seed=mentors&backgroundColor=7c3aed",
    bio: "An exclusive network of experienced local and international founders, corporate executives, and professional coaches dedicated to youth leadership.",
    website: "https://aiim.hub/mentors",
    contactEmail: "mentorship@annitahub.com"
  }
];

export const INITIAL_PROGRAMS: Program[] = [
  {
    id: "prog-business-basics",
    title: "Business Basics & Registration",
    shortDesc: "Understand what is a business, choose a compliant structure, and master Liberia's official registration process.",
    longDesc: "This course is the starting point for anyone looking to transition an idea into a legal entity. Learn about the statutory structures available in West Africa, the filing process with the Ministry of Commerce & Industry, tax identification number (TIN) setups, and essential pre-operational compliance guidelines.",
    partnerId: "moc",
    audience: ["Youth", "Entrepreneur"],
    format: "Self-paced",
    duration: "4 modules, ~2 hours total",
    status: "Open",
    enrolledCount: 124,
    hasCertificate: true,
    featured: true,
    modules: [
      {
        id: "m1",
        title: "Introduction to Business Structures in Liberia",
        contentType: "text",
        content: `What is a business entity, and how do you decide which legal structure fits your goal? In this module, we break down Sole Proprietorship, Partnership, and Limited Liability Companies (LLC). You will analyze the liability conditions, setup costs, and corporate hierarchies for each options. Learn how choosing the right structure early protects you and places your company in the best position for seed capital.`
      },
      {
        id: "m2",
        title: "The Step-by-Step Registration Process at MoC",
        contentType: "video",
        content: `A complete video guide and walk-through of the Ministry of Commerce and Industry's registration requirements. Learn which forms to submit, the fees associated with registration, and the typical timelines for receiving your final Official business license.`
      },
      {
        id: "m3",
        title: "Post-Registration Compliance & License Basics",
        contentType: "text",
        content: `Your business certificate of registration is just the first step. To maintain active operational status, you must understand municipal business permits, sector-specific licenses (like health certificates or agricultural approvals), and renewal rules. This module details the annual obligations you must observe.`
      },
      {
        id: "m4",
        title: "Launch Checklist: Moving from Idea to Registered Entity",
        contentType: "quiz",
        content: `Time to verify your business launch list! This module contains an interactive quiz to test your mastery of structures, fees, registration timelines, and permit requirements, followed by a downloadable official template checklist.`
      }
    ]
  },
  {
    id: "prog-tax-compliance",
    title: "Tax & Financial Compliance for MSMEs",
    shortDesc: "Demystify financial obligations, grasp LRA filing systems, understand GST, and avoid costly compliance audits.",
    longDesc: "Compliance is the bedrock of business longevity. Co-developed with the Liberia Revenue Authority (LRA), this program explains tax brackets, filing regimes, the application processes for tax clearances (TCC), bookkeeping for micro-enterprises, and common pitfalls to avoid.",
    partnerId: "lra",
    audience: ["MSME Owner", "Entrepreneur"],
    format: "Hybrid",
    duration: "5 modules, ~3 hours total",
    status: "Open",
    enrolledCount: 98,
    hasCertificate: true,
    featured: true,
    modules: [
      {
        id: "m5",
        title: "Income Tax vs. Goods and Services Tax (GST) in Liberia",
        contentType: "text",
        content: `Learn the structural differences between direct income taxes and consumer sales taxes (GST) in West Africa. Understand how withholding taxes are calculated for office leases and consulting contracts, and define what triggers standard audit thresholds.`
      },
      {
        id: "m6",
        title: "LRA TIN Registration & Online Filing Portal",
        contentType: "video",
        content: `In this module, watch a live screen recording and guide showing how to navigate the Liberia Revenue Authority digital dashboard, generate tax receipts manually, request your Taxpayer Identification Number, and perform monthly filing.`
      },
      {
        id: "m7",
        title: "Bookkeeping Practices for Regulatory Reporting",
        contentType: "text",
        content: `Good tax planning requires pristine financials. Discover basic spreadsheets, double-entry ledgers, and cash flow structures designed specifically for MSMEs who do not have full-time professional corporate accountants.`
      },
      {
        id: "m8",
        title: "Understanding Deadlines & Penalty Avoidance",
        contentType: "text",
        content: `Avoid freeze orders and heavy interest assessments. Learn the exact dates for quarterly revenue payments, employee PAYE filings, and annual income tax reconciliation in the West African business calendar.`
      },
      {
        id: "m9",
        title: "LRA Compliance Assessment Quiz",
        contentType: "quiz",
        content: `An interactive 10-question evaluation program created to challenge and confirm your knowledge of taxation thresholds, write-offs, clearance certificate requirements, and filing deadlines.`
      }
    ]
  },
  {
    id: "prog-ip-management",
    title: "Intellectual Property for Entrepreneurs & Creators",
    shortDesc: "Secure your brand, register trademarks, explore copyrights, and utilize assets as leverage with WIPO standards.",
    longDesc: "In the digital economy, your most valuable assets are your ideas, algorithms, and brand names. Created alongside the World Intellectual Property Organization archives, this course empowers founders and content creators to secure, monitor, and license intellectual properties.",
    partnerId: "wipo",
    audience: ["Entrepreneur", "Student", "Creative"],
    format: "Self-paced",
    duration: "6 modules, ~4 hours total",
    status: "Open",
    enrolledCount: 74,
    hasCertificate: true,
    featured: false,
    modules: [
      {
        id: "m10",
        title: "Patent, Copyright, Trademark, and Design Basics",
        contentType: "text",
        content: `Define the four pillars of intellectual property. This module contrasts industrial patents (protecting functional systems) with trademarks (protecting business identity), copyright protections for creative files, and industrial designs.`
      },
      {
        id: "m11",
        title: "Navigating WIPO's Global Brands Database",
        contentType: "external_link",
        content: `WIPO maintains the premier portal to search for trademark registrations worldwide. Learn how to verify that your startup's name or visual logo is original, non-infringing, and eligible for local protection prior to filing costly applications.`
      },
      {
        id: "m12",
        title: "Developing an IP Asset Strategy for Startups",
        contentType: "text",
        content: `For high-growth software and hardware entities, IP assets represent a key driver of valuation. Discover options for incorporating IP clauses in employee contracts, protecting trade secrets, and valuing developer achievements.`
      },
      {
        id: "m13",
        title: "Filing for Protection in West Africa (ARIPO)",
        contentType: "video",
        content: `A complete video summary explaining regional networks such as the African Regional Intellectual Property Organization (ARIPO) and the national offices like Liberia Industrial Property Office (LIPO).`
      },
      {
        id: "m14",
        title: "Licensing, Franchising, and Royalties",
        contentType: "text",
        content: `Monetize your intellectual properties. Discover how to safely draft licensing contracts, structure global franchise programs, secure royalty payments, and leverage proprietary assets to obtain banking support.`
      },
      {
        id: "m15",
        title: "WIPO IP Final Certification Quiz",
        contentType: "quiz",
        content: `Consolidate your learning. Complete this 12-question technical quiz covering prior art searches, trademark eligibility requirements, trade secret security protocols, and international IP law.`
      }
    ]
  },
  {
    id: "prog-digital-commerce",
    title: "Digital Commerce & The Annita Ecosystem",
    shortDesc: "Scale your merchant operations, list on Annita marketplace, receive digital payments, and optimize logistics.",
    longDesc: "Digital integration is the ultimate shortcut to business growth. Learn to list storefronts, set competitive prices, activate customer support flow, leverage AnnitaPay rails, and integrate last-mile logistics systems to ship seamlessly.",
    partnerId: "annita",
    audience: ["MSME Owner", "Student"],
    format: "Hybrid",
    duration: "4 modules, ~2.5 hours total",
    status: "Open",
    enrolledCount: 185,
    hasCertificate: true,
    featured: true,
    modules: [
      {
        id: "m16",
        title: "Direct-to-Consumer: Launching on Annita Marketplace",
        contentType: "text",
        content: `Learn the architectural setup of high-converting digital storefronts. This module focuses on taking clean product photography using standard mobile phones, writing descriptive and SEO-friendly copy, and structuring categorical collections.`
      },
      {
        id: "m17",
        title: "Setting up Storefront Catalogs & Pricing Strategies",
        contentType: "video",
        content: `Watch this video masterclass to learn dynamic catalog management. Learn wholesale versus retail pricing formulas, setting discounts, tracking stock levels, and handling automated customer notifications.`
      },
      {
        id: "m18",
        title: "Seamless Local/Regional Payments with AnnitaPay",
        contentType: "text",
        content: `Integrate and accept local mobile money alongside card infrastructure. Understand cash reconciliation, processing rates, security measures, and automated payouts configuration to keep your company cash flow positive.`
      },
      {
        id: "m19",
        title: "Managing Inventory, Invoicing, and Order Delivery",
        contentType: "quiz",
        content: `The logistics and fulfillment loop. Test your skills on delivery tracking, customer invoicing and return cycles, and last-mile operations with this interactive evaluation.`
      }
    ]
  },
  {
    id: "prog-student-entrepreneur",
    title: "Entrepreneurship 101 for Students",
    shortDesc: "Formulate brilliant ideas, discover business models, create pitches, and receive incubator preparation.",
    longDesc: "An extracurricular hybrid bootcamp prepared specifically for secondary and college students. Learn fundamental problem-solving principles, empathy interviewing, lean canvas development, and showcase your business pitch deck.",
    partnerId: "smc",
    audience: ["Student", "Youth"],
    format: "Hybrid",
    duration: "6 modules across 6 weeks",
    status: "Coming Soon",
    enrolledCount: 160,
    hasCertificate: true,
    featured: false,
    modules: [
      { id: "m20", title: "Defining the Problem: Identifying Local Pains", contentType: "text", content: "Learn how to spot real-world friction. Great businesses begin with problems, not solutions. We explore research on waste management, renewable energy, and educational deficits in local markets." },
      { id: "m21", title: "Customer Interviews & Empathy Mapping", contentType: "video", content: "A dynamic video of practical interviews on the streets of Monrovia. Discover how to talk to potential buyers without biasing their answers, collecting rich qualitative feedback." },
      { id: "m22", title: "Prototyping Lean Solutions on Zero Budget", contentType: "text", content: "Build before buying. Learn how to design landing pages, mockups, or simple service tests using free digital tools before writing a single line of code or leasing space." },
      { id: "m23", title: "Introduction to the Business Model Canvas (BMC)", contentType: "text", content: "The famous 9-box single sheet model. Walk through value propositions, channels, customer segments, cost structures, and revenue streams, mapping your project as an active startup." },
      { id: "m24", title: "Storytelling: Crafting a High-Impact Startup Pitch", contentType: "text", content: "How to tell a compelling story. Learn the standard 10-slide deck format, timing your speech to 3 minutes, and highlighting the team's capacity to deliver." },
      { id: "m25", title: "Entrepreneurship Essentials Quiz", contentType: "quiz", content: "A general business model canvas quiz to verify understanding before concluding the cohort." }
    ]
  },
  {
    id: "prog-financial-literacy",
    title: "Financial Literacy & Money Management",
    shortDesc: "Budget personal and business earnings, cultivate savings, leverage commercial banking, and explore digital systems.",
    longDesc: "This foundational course separates personal from structural enterprise finances. Discover modern budget matrix designs, business bank and savings options, micro-credits, and securing transactions in the modern age.",
    partnerId: "lbdi",
    audience: ["Youth", "Student"],
    format: "Self-paced",
    duration: "4 modules, ~2 hours total",
    status: "Open",
    enrolledCount: 220,
    hasCertificate: true,
    featured: false,
    modules: [
      { id: "m26", title: "Personal Savings Plans & Smart Budgeting", contentType: "text", content: "Master the 50/30/20 rule modified for emerging economies. Set clear personal reserves targets, separate basic life survival costs, and establish an automated saving routine." },
      { id: "m27", title: "Commercial Banking 101: Account Types & Interest", contentType: "video", content: "A clear video walkthrough detailing differences between retail savings, business current accounts, requirements for commercial registration, and how interest yields operate." },
      { id: "m28", title: "Credit Risk and Leveraged Growth", contentType: "text", content: "Understand debt. Compare productive debt (investing in tools, machinery, inventory) with expensive personal credit. Review loan application compliance requirements." },
      { id: "m29", title: "Budgeting & Financial Accounts Quiz", contentType: "quiz", content: "Interactive evaluation checking your capability to calculate loan interest rate risk, separate accounting ledger line items, and audit budgets." }
    ]
  },
  {
    id: "prog-marketing-branding",
    title: "Marketing & Branding for Small Businesses",
    shortDesc: "Build recognizable brand messaging, design items on Canva, handle Facebook Ads, and execute offline promos.",
    longDesc: "Gain high conversion rates. Learn to target niche buyers, configure professional social posts, optimize Whatsapp Business profiles, analyze promotional budgets, and organize guerrilla local store opening events.",
    partnerId: "annita",
    audience: ["MSME Owner", "Youth"],
    format: "Self-paced",
    duration: "5 modules, ~3 hours total",
    status: "Open",
    enrolledCount: 140,
    hasCertificate: true,
    featured: false,
    modules: [
      { id: "m30", title: "Defining Your Unique Brand Proposition", contentType: "text", content: "Why should a customer choose you over competitors? Define your brand personality, core message, slogans, and color palettes to create a memorable impact." },
      { id: "m31", title: "High-Converting Creative Asset Design in Canva", contentType: "video", content: "A step-by-step video tutorial demonstrating the creation of professional flyers, social media assets, product packaging designs, and digital catalogs." },
      { id: "m32", title: "WhatsApp Business & Meta Ads for Target Audience", contentType: "text", content: "Learn local digital marketing. Configure automated welcome messages in WhatsApp, compile professional catalogs, and set up hyper-local low-budget Meta ads targeting West African buyers." },
      { id: "m33", title: "Customer Retention & Loyalty Programs", contentType: "text", content: "It costs 5x more to find a new client than to keep an old one. Design loyalty cards, feedback loops, and customer reward calendars to ensure repeatable revenue streams." },
      { id: "m34", title: "Promotions & Marketing Campaign Quiz", contentType: "quiz", content: "A comprehensive quiz verifying your skill in measuring retention rate thresholds, advertisement cost-per-click, and messaging alignment." }
    ]
  },
  {
    id: "prog-tech-skills",
    title: "Tech for Business (Digital Skills Fundamentals)",
    shortDesc: "Configure cloud operations, utilize spreadsheet templates, deploy Google tools, and secure customer records.",
    longDesc: "Upgrade your technological capacity. Understand cloud storage, build automated spreadsheets, leverage online collaboration tools, and execute standard security protocols to guard your venture.",
    partnerId: "orange",
    audience: ["Youth", "MSME Owner", "Student"],
    format: "Self-paced",
    duration: "4 modules, ~2 hours total",
    status: "Open",
    enrolledCount: 304,
    hasCertificate: true,
    featured: false,
    modules: [
      { id: "m35", title: "Collaborative Business Operations with Google Workspace", contentType: "text", content: "Learn to utilize Google Drive, Docs, and Calendar to coordinate tasks with remote teams, manage project documents, and sync meetings effortlessly." },
      { id: "m36", title: "Google Sheets & Excel for Streamlined Expenses", contentType: "video", content: "Watch a high-signal video demonstration explaining standard spreadsheet formulas (SUM, AVERAGE, multiplication matrices), inventory tracking sheets, and sales charts." },
      { id: "m37", title: "Securing Customer Data: Basic Cybersecurity Hygiene", contentType: "text", content: "Avoid hacking disasters. Learn proper passwords criteria, authentication mechanisms, identifying phishing attempts, and backing up sensitive files safely." },
      { id: "m38", title: "Digital Tools & Operations Evaluation", contentType: "quiz", content: "Evaluate spreadsheets formulas, document permissions, and computer/phone network security systems through this technical module quiz." }
    ]
  },
  {
    id: "prog-leadership",
    title: "Leadership & Personal Development",
    shortDesc: "Master public speaking, construct goals, build peer networks, and foster resilience in high-stakes environments.",
    longDesc: "Created for ambitious youth and future executives. This cohort-based program emphasizes advanced speaking, leadership strategies, confidence building, and professional network expansion.",
    partnerId: "mentors",
    audience: ["Youth", "Student"],
    format: "Cohort",
    duration: "4-week cohort, 1 session per week",
    status: "Enrollment Closed",
    enrolledCount: 52,
    hasCertificate: true,
    featured: false,
    modules: [
      { id: "m39", title: "Strategic Communication & Public Speaking", contentType: "text", content: "Public speaking builds authority. This module presents classic structure scripts, vocal training techniques, body posture guidelines, and slide alignment rules." },
      { id: "m40", title: "Goal Alignment: Vision Boards & Personal KPIs", contentType: "video", content: "A dynamic video illustrating the preparation of goal maps. Discover how to transition large monthly aspirations into daily action steps." },
      { id: "m41", title: "Building Professional Network & Navigating Mentors", contentType: "text", content: "Learn networking decorum. Write professional cold-emails, approach senior advisors with poise, and create mutual value flows." },
      { id: "m42", title: "Leadership & Goal Strategy Evaluation", contentType: "quiz", content: "Review and assess public speaking structures, networking practices, and active personal development priorities." }
    ]
  },
  {
    id: "prog-msme-formalization",
    title: "The MSME Formalization Track",
    shortDesc: "An advanced learning pathway. Complete Programs 1, 2, and 4 in sequence to unlock your MSME-Ready Badge.",
    longDesc: "This is a bundled flagship learning pathway designed for comprehensive formalization. Successfully complete 'Business Basics & Registration', 'Tax & Compliance', and 'Digital Commerce' to earn your verified badge.",
    partnerId: "annita",
    audience: ["MSME Owner", "Entrepreneur"],
    format: "Self-paced",
    duration: "Combined Track",
    status: "Open",
    enrolledCount: 155,
    hasCertificate: true,
    featured: true,
    bundledProgramIds: ["prog-business-basics", "prog-tax-compliance", "prog-digital-commerce"],
    modules: [
      { id: "m43", title: "Introduction to the Pathway Requirements", contentType: "text", content: "Welcome to the elite formalization track. This module details the milestones you will reach and introduction of the specialized industry badge." },
      { id: "m44", title: "Pathway Progress Tracking & Validation Review", contentType: "quiz", content: "Comprehensive feedback review panel checking registrations, taxation, and logistics setups." }
    ]
  }
];

// LocalStorage helpers to simulate database persistent operations safely:
export const getStoredPrograms = (): Program[] => {
  const saved = localStorage.getItem('aiim_programs_db');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      return INITIAL_PROGRAMS;
    }
  }
  localStorage.setItem('aiim_programs_db', JSON.stringify(INITIAL_PROGRAMS));
  return INITIAL_PROGRAMS;
};

export const saveStoredPrograms = (programs: Program[]) => {
  localStorage.setItem('aiim_programs_db', JSON.stringify(programs));
};

export interface Enrollment {
  programId: string;
  enrolledAt: string;
  completedModuleIds: string[];
  progress: number; // percentage
  status: 'In Progress' | 'Completed';
  certificateId?: string;
  completedAt?: string;
}

export const getUserEnrollments = (email: string): Enrollment[] => {
  const saved = localStorage.getItem(`aiim_enrollments_${email}`);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      return [];
    }
  }
  return [];
};

export const saveUserEnrollments = (email: string, enrollments: Enrollment[]) => {
  localStorage.setItem(`aiim_enrollments_${email}`, JSON.stringify(enrollments));
  
  // Also push to standard dashboard activities list if appropriate, or keep it synced!
  const systemFeed = localStorage.getItem(`aiim_recent_activities_${email}`);
  let activitiesArray = systemFeed ? JSON.parse(systemFeed) : [];
  localStorage.setItem(`aiim_recent_activities_${email}`, JSON.stringify(activitiesArray));
};

export const getStoredSchoolLeads = (): SchoolLead[] => {
  const saved = localStorage.getItem('aiim_school_leads');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      return [];
    }
  }
  return [];
};

export const saveSchoolLead = (lead: Omit<SchoolLead, 'id' | 'submittedAt' | 'status'>) => {
  const leads = getStoredSchoolLeads();
  const newLead: SchoolLead = {
    ...lead,
    id: `lead-${Date.now()}`,
    submittedAt: new Date().toLocaleDateString(),
    status: 'Pending'
  };
  leads.push(newLead);
  localStorage.setItem('aiim_school_leads', JSON.stringify(leads));
  return newLead;
};

export const updateSchoolLeadStatus = (id: string, status: 'Pending' | 'Contacted' | 'Archived') => {
  const leads = getStoredSchoolLeads();
  const index = leads.findIndex(l => l.id === id);
  if (index !== -1) {
    leads[index].status = status;
    localStorage.setItem('aiim_school_leads', JSON.stringify(leads));
  }
};
