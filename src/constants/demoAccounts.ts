export const DEMO_ACCOUNTS = [
  {
    role: 'founder' as const,
    email: 'founder@aiim.com',
    password: 'password123',
    name: 'Founder Role',
    tier: 'pioneer' as const,
    isPaid: true,
    isConfirmed: true,
    description: 'Building a startup, raising capital, managing deal rooms, and seeking investor matches.'
  },
  {
    role: 'investor' as const,
    email: 'investor@aiim.com',
    password: 'password123',
    name: 'Investor / VC Role',
    tier: 'pioneer' as const,
    isPaid: true,
    isConfirmed: true,
    description: 'Sourcing deal flow, analyzing AI thesis scores, managing pipeline, and reviewing diligence.'
  },
  {
    role: 'partner' as const,
    email: 'partner@aiim.com',
    password: 'password123',
    name: 'Corporate Partner Role',
    tier: 'pioneer' as const,
    isPaid: true,
    isConfirmed: true,
    description: 'Posting corporate innovation challenges, tech scouting, and managing live pilots.'
  }
];