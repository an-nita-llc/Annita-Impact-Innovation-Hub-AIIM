export interface SchoolPartner {
  id: string;
  name: string;
  type: 'High School' | 'College/University' | 'Custom';
  plan: 'High School Plan' | 'College/University Plan' | 'Custom Plan';
  fee: number;
  contactPerson: string;
  email: string;
  address: string;
  status: 'Active' | 'Expired' | 'Pending Invoice';
  registeredAt: string;
  renewalDate: string;
  studentCount: number;
  unconfirmedCount?: number;
  logo?: string;
}

export interface StudentRecord {
  id: string;
  name: string;
  email: string;
  schoolId: string;
  enrollments: {
    programId: string;
    progress: number;
    status: 'In Progress' | 'Completed';
    completedAt?: string;
  }[];
}

export interface FacilitationRequest {
  id: string;
  schoolId: string;
  schoolName: string;
  programId: string;
  programTitle: string;
  preferredDate: string;
  expectedAttendance: number;
  status: 'Pending' | 'Approved' | 'Declined';
  scheduledDate?: string;
}

export interface Sponsor {
  id: string;
  name: string;
  logo: string;
  tier: 'Program Sponsor' | 'Lead Partner';
  programId: string;
  activeFrom: string;
  activeTo: string;
}

export interface PayPerProgramTransaction {
  id: string;
  userEmail: string;
  userName: string;
  programId: string;
  programTitle: string;
  amount: number;
  date: string;
}

export interface ProgramMonetizationConfig {
  programId: string;
  enabled: boolean;
  price: number; // default $10 ($5 - $15)
}

// Default Seed Data
const DEFAULT_SCHOOL_PARTNERS: SchoolPartner[] = [
  {
    id: "sch-ul",
    name: "University of Liberia",
    type: "College/University",
    plan: "College/University Plan",
    fee: 800,
    contactPerson: "Prof. Arthur Kollie",
    email: "akollie@ul.edu.lr",
    address: "Capitol Hill, Monrovia",
    status: "Active",
    registeredAt: "2025-06-20",
    renewalDate: "2026-06-20", // within 30 days of June 15, 2026!
    studentCount: 45,
    logo: "UL"
  },
  {
    id: "sch-mc",
    name: "Monrovia College",
    type: "High School",
    plan: "High School Plan",
    fee: 300,
    contactPerson: "Mrs. Evelyn Carter",
    email: "info@monroviacollege.org",
    address: "Clay Street, Monrovia",
    status: "Active",
    registeredAt: "2025-07-02",
    renewalDate: "2026-07-02", // within 30 days of June 15, 2026!
    studentCount: 22,
    logo: "MC"
  },
  {
    id: "sch-bwi",
    name: "Booker Washington Institute",
    type: "High School",
    plan: "High School Plan",
    fee: 300,
    contactPerson: "Dr. Matthew Cooper",
    email: "contact@bwi-edu.com",
    address: "Kakata, Margibi County",
    status: "Active",
    registeredAt: "2026-01-15",
    renewalDate: "2027-01-15",
    studentCount: 15,
    logo: "BWI"
  }
];

const DEFAULT_SPONSORS: Sponsor[] = [
  {
    id: "sp-orange-1",
    name: "Orange Liberia",
    logo: "https://api.dicebear.com/7.x/identicon/svg?seed=orange&backgroundColor=ea580c",
    tier: "Lead Partner",
    programId: "prog-tech-skills",
    activeFrom: "2026-01-01",
    activeTo: "2026-12-31"
  },
  {
    id: "sp-lbdi-1",
    name: "LBDI Bank",
    logo: "https://api.dicebear.com/7.x/identicon/svg?seed=lbdi&backgroundColor=4338ca",
    tier: "Program Sponsor",
    programId: "prog-financial-literacy",
    activeFrom: "2026-02-15",
    activeTo: "2026-08-15"
  },
  {
    id: "sp-annita-1",
    name: "Annita Store",
    logo: "https://api.dicebear.com/7.x/identicon/svg?seed=annita&backgroundColor=ffd700",
    tier: "Lead Partner",
    programId: "prog-digital-commerce",
    activeFrom: "2026-01-10",
    activeTo: "2026-10-10"
  }
];

const DEFAULT_TRANSACTIONS: PayPerProgramTransaction[] = [
  {
    id: "tx-7391",
    userEmail: "samuel.bloh@gmail.com",
    userName: "Samuel Bloh",
    programId: "prog-business-basics",
    programTitle: "Business Basics & Registration",
    amount: 10,
    date: "2026-06-12"
  },
  {
    id: "tx-7422",
    userEmail: "fata.sheriff@hotmail.com",
    userName: "Fata Sheriff",
    programId: "prog-tax-compliance",
    programTitle: "Tax & Financial Compliance for MSMEs",
    amount: 12,
    date: "2026-06-14"
  }
];

const DEFAULT_STUDENTS: StudentRecord[] = [
  {
    id: "std-1",
    name: "Daniel Flomo",
    email: "dflomo@ul.edu.lr",
    schoolId: "sch-ul",
    enrollments: [
      { programId: "prog-student-entrepreneur", progress: 60, status: "In Progress" },
      { programId: "prog-financial-literacy", progress: 100, status: "Completed", completedAt: "2026-06-10" }
    ]
  },
  {
    id: "std-2",
    name: "Kebeh Jallah",
    email: "kjallah@monroviacollege.org",
    schoolId: "sch-mc",
    enrollments: [
      { programId: "prog-student-entrepreneur", progress: 100, status: "Completed", completedAt: "2026-06-14" }
    ]
  },
  {
    id: "std-3",
    name: "Massa Kamara",
    email: "mkamara@bwi-edu.com",
    schoolId: "sch-bwi",
    enrollments: [
      { programId: "prog-financial-literacy", progress: 20, status: "In Progress" }
    ]
  }
];

const DEFAULT_FACILITATIONS: FacilitationRequest[] = [
  {
    id: "fac-1",
    schoolId: "sch-ul",
    schoolName: "University of Liberia",
    programId: "prog-student-entrepreneur",
    programTitle: "Entrepreneurship 101 for Students",
    preferredDate: "2026-07-10",
    expectedAttendance: 120,
    status: "Pending"
  },
  {
    id: "fac-2",
    schoolId: "sch-mc",
    schoolName: "Monrovia College",
    programId: "prog-financial-literacy",
    programTitle: "Financial Literacy & Money Management",
    preferredDate: "2026-06-28",
    expectedAttendance: 60,
    status: "Approved",
    scheduledDate: "2026-06-28"
  }
];

// Helper Functions
export const getSchoolPartners = (): SchoolPartner[] => {
  const data = localStorage.getItem('aiim_school_partners');
  if (data) {
    try { return JSON.parse(data); } catch (e) { return DEFAULT_SCHOOL_PARTNERS; }
  }
  localStorage.setItem('aiim_school_partners', JSON.stringify(DEFAULT_SCHOOL_PARTNERS));
  return DEFAULT_SCHOOL_PARTNERS;
};

export const saveSchoolPartners = (partners: SchoolPartner[]) => {
  localStorage.setItem('aiim_school_partners', JSON.stringify(partners));
};

export const addSchoolPartner = (partner: Omit<SchoolPartner, 'id' | 'registeredAt' | 'renewalDate' | 'studentCount' | 'status'>) => {
  const partners = getSchoolPartners();
  const dateStr = new Date().toISOString().split('T')[0];
  const nextYear = new Date();
  nextYear.setFullYear(nextYear.getFullYear() + 1);
  const renewalDateStr = nextYear.toISOString().split('T')[0];
  
  const newPartner: SchoolPartner = {
    ...partner,
    id: `sch-${Date.now()}`,
    status: 'Active',
    registeredAt: dateStr,
    renewalDate: renewalDateStr,
    studentCount: 0
  };
  partners.push(newPartner);
  saveSchoolPartners(partners);
  return newPartner;
};

export const getStudentRoster = (): StudentRecord[] => {
  const data = localStorage.getItem('aiim_school_roster');
  if (data) {
    try { return JSON.parse(data); } catch (e) { return DEFAULT_STUDENTS; }
  }
  localStorage.setItem('aiim_school_roster', JSON.stringify(DEFAULT_STUDENTS));
  return DEFAULT_STUDENTS;
};

export const saveStudentRoster = (students: StudentRecord[]) => {
  localStorage.setItem('aiim_school_roster', JSON.stringify(students));
};

export const addStudentToSchool = (schoolId: string, name: string, email: string) => {
  const roster = getStudentRoster();
  const newStudent: StudentRecord = {
    id: `std-${Date.now()}`,
    name,
    email,
    schoolId,
    enrollments: []
  };
  roster.push(newStudent);
  saveStudentRoster(roster);
  
  // Update partner's student count
  const partners = getSchoolPartners();
  const pIdx = partners.findIndex(p => p.id === schoolId);
  if (pIdx !== -1) {
    partners[pIdx].studentCount += 1;
    saveSchoolPartners(partners);
  }
  return newStudent;
};

export const importStudentsFromCSV = (schoolId: string, csvContent: string): number => {
  const roster = getStudentRoster();
  const lines = csvContent.split('\n');
  let addedCount = 0;
  
  lines.forEach(line => {
    if (!line.trim()) return;
    const parts = line.split(',');
    if (parts.length >= 2) {
      const name = parts[0].trim();
      const email = parts[1].trim();
      if (email.includes('@') && !roster.some(r => r.email === email)) {
        roster.push({
          id: `std-${Date.now()}-${addedCount}`,
          name: name || email.split('@')[0],
          email,
          schoolId,
          enrollments: []
        });
        addedCount++;
      }
    }
  });

  if (addedCount > 0) {
    saveStudentRoster(roster);
    const partners = getSchoolPartners();
    const pIdx = partners.findIndex(p => p.id === schoolId);
    if (pIdx !== -1) {
      partners[pIdx].studentCount += addedCount;
      saveSchoolPartners(partners);
    }
  }
  return addedCount;
};

export const getFacilitationRequests = (): FacilitationRequest[] => {
  const data = localStorage.getItem('aiim_facilitation_requests');
  if (data) {
    try { return JSON.parse(data); } catch (e) { return DEFAULT_FACILITATIONS; }
  }
  localStorage.setItem('aiim_facilitation_requests', JSON.stringify(DEFAULT_FACILITATIONS));
  return DEFAULT_FACILITATIONS;
};

export const saveFacilitationRequests = (reqs: FacilitationRequest[]) => {
  localStorage.setItem('aiim_facilitation_requests', JSON.stringify(reqs));
};

export const addFacilitationRequest = (request: Omit<FacilitationRequest, 'id' | 'status'>) => {
  const reqs = getFacilitationRequests();
  const newReq: FacilitationRequest = {
    ...request,
    id: `fac-${Date.now()}`,
    status: 'Pending'
  };
  reqs.push(newReq);
  saveFacilitationRequests(reqs);
  return newReq;
};

export const updateFacilitationStatus = (id: string, status: 'Approved' | 'Declined', scheduledDate?: string) => {
  const reqs = getFacilitationRequests();
  const idx = reqs.findIndex(r => r.id === id);
  if (idx !== -1) {
    reqs[idx].status = status;
    if (scheduledDate) {
      reqs[idx].scheduledDate = scheduledDate;
    }
    saveFacilitationRequests(reqs);
  }
};

export const getSponsors = (): Sponsor[] => {
  const data = localStorage.getItem('aiim_program_sponsors');
  if (data) {
    try { return JSON.parse(data); } catch (e) { return DEFAULT_SPONSORS; }
  }
  localStorage.setItem('aiim_program_sponsors', JSON.stringify(DEFAULT_SPONSORS));
  return DEFAULT_SPONSORS;
};

export const saveSponsors = (sponsors: Sponsor[]) => {
  localStorage.setItem('aiim_program_sponsors', JSON.stringify(sponsors));
};

export const addProgramSponsor = (sponsor: Omit<Sponsor, 'id'>) => {
  const sponsors = getSponsors();
  const newSponsor: Sponsor = {
    ...sponsor,
    id: `sp-${Date.now()}`
  };
  sponsors.push(newSponsor);
  saveSponsors(sponsors);
  return newSponsor;
};

export const getTransactions = (): PayPerProgramTransaction[] => {
  const data = localStorage.getItem('aiim_pay_per_program_purchases');
  if (data) {
    try { return JSON.parse(data); } catch (e) { return DEFAULT_TRANSACTIONS; }
  }
  localStorage.setItem('aiim_pay_per_program_purchases', JSON.stringify(DEFAULT_TRANSACTIONS));
  return DEFAULT_TRANSACTIONS;
};

export const saveTransactions = (txs: PayPerProgramTransaction[]) => {
  localStorage.setItem('aiim_pay_per_program_purchases', JSON.stringify(txs));
};

export const addTransaction = (userName: string, userEmail: string, programId: string, programTitle: string, amount: number) => {
  const txs = getTransactions();
  const newTx: PayPerProgramTransaction = {
    id: `tx-${Math.floor(1000 + Math.random() * 9000)}`,
    userName,
    userEmail,
    programId,
    programTitle,
    amount,
    date: new Date().toISOString().split('T')[0]
  };
  txs.push(newTx);
  saveTransactions(txs);
  return newTx;
};

export const getMonetizationConfigs = (): ProgramMonetizationConfig[] => {
  const data = localStorage.getItem('aiim_program_monetization_configs');
  if (data) {
    try { return JSON.parse(data); } catch (e) { return []; }
  }
  return [];
};

export const saveMonetizationConfigs = (configs: ProgramMonetizationConfig[]) => {
  localStorage.setItem('aiim_program_monetization_configs', JSON.stringify(configs));
};

export const getProgramConfig = (programId: string): ProgramMonetizationConfig => {
  const configs = getMonetizationConfigs();
  const existing = configs.find(c => c.programId === programId);
  if (existing) return existing;
  return { programId, enabled: true, price: 10 }; // Default price $10, enabled toggled to true by default
};

export const updateProgramConfig = (programId: string, enabled: boolean, price: number) => {
  const configs = getMonetizationConfigs();
  const idx = configs.findIndex(c => c.programId === programId);
  if (idx !== -1) {
    configs[idx].enabled = enabled;
    configs[idx].price = price;
  } else {
    configs.push({ programId, enabled, price });
  }
  saveMonetizationConfigs(configs);
};

// Check if a guest has purchased access to a specific program
export const guestHasAccess = (email: string, programId: string): boolean => {
  const txs = getTransactions();
  return txs.some(t => t.userEmail.toLowerCase() === email.toLowerCase() && t.programId === programId);
};
