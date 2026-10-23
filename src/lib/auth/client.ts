// Stub auth client for the Vite hub (no backend). Mirrors Annita One's
// better-auth client surface just enough for the auth pages to render and
// navigate. Replace with a real client when a backend is wired up.

export type AuthResult = { error: string | null };

const ok: AuthResult = { error: null };

export const authClient = {
  signIn: {
    email: async (_: unknown): Promise<AuthResult> => ok,
    emailOtp: async (_: unknown): Promise<AuthResult> => ok,
    passkey: async (): Promise<AuthResult> => ok,
  },
  emailOtp: {
    sendVerificationOtp: async (_: unknown): Promise<AuthResult> => ok,
  },
  requestPasswordReset: async (_: unknown): Promise<AuthResult> => ok,
  resetPassword: async (_: unknown): Promise<AuthResult> => ok,
  verifyEmail: async (_: unknown): Promise<AuthResult> => ok,
  twoFactor: {
    verifyTotp: async (_: unknown): Promise<AuthResult> => ok,
    verifyBackupCode: async (_: unknown): Promise<AuthResult> => ok,
  },
};

export const { useSession, signIn, signOut } = {
  useSession: () => ({ data: null }),
  signIn: authClient.signIn,
  signOut: async () => {},
};