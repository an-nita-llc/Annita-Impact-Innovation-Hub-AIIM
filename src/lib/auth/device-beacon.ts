export async function registerSignInDevice(): Promise<void> {
  try {
    await fetch("/api/auth/device/register", {
      method: "POST",
      credentials: "same-origin",
    });
  } catch {
    // Offline or blocked beacon.
  }
}