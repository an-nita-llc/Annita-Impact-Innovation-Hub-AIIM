export const DEMO_ACCOUNTS = [
  {
    role: 'admin' as const,
    email: 'admin@aiim.com',
    password: 'password123',
    name: 'System Admin',
    tier: 'pioneer' as const,
    isPaid: true,
    isConfirmed: true,
    description: 'Full access to system management, user verification, and analytics.'
  },
  {
    role: 'school-admin' as const,
    email: 'schooladmin@aiim.com',
    password: 'password123',
    name: 'Arthur Kollie (LU Admin)',
    tier: 'pioneer' as const,
    isPaid: true,
    isConfirmed: true,
    description: 'School Admin access to manage roster, requests, & co-branded certs.'
  },
  {
    role: 'investor' as const,
    email: 'investor@aiim.com',
    password: 'password123',
    name: 'James Kollie',
    tier: 'pioneer' as const,
    isPaid: true,
    isConfirmed: true,
    description: 'Access to Deal Room, portfolio tracking, and AI matching tools.'
  },
  {
    role: 'partner' as const,
    email: 'partner@aiim.com',
    password: 'password123',
    name: 'Global Partner',
    tier: 'pioneer' as const,
    isPaid: true,
    isConfirmed: true,
    description: 'Access to partner hub, program management, and ecosystem map.'
  },
  {
    role: 'pioneer' as const,
    email: 'pioneer@aiim.com',
    password: 'password123',
    name: 'Pioneer Member',
    tier: 'pioneer' as const,
    isPaid: true,
    isConfirmed: true,
    description: 'Full member access with paid benefits and confirmed status.'
  },
  {
    role: 'member' as const,
    email: 'member@aiim.com',
    password: 'password123',
    name: 'Standard Member',
    tier: 'member' as const,
    isPaid: false,
    isConfirmed: true,
    description: 'Standard access to resources, blog, and community.'
  }
];
