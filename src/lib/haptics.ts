/**
 * Lightweight haptic feedback for a native-app feel on touch devices.
 *
 * Calls the Vibration API with a subtle tick when the user presses a button,
 * link, or other interactive control. Silently no-ops on devices without a
 * vibration motor (desktop browsers, iOS Safari) or when the API is blocked,
 * so it is safe to call unconditionally.
 */

/** Tick patterns (milliseconds of vibration). */
export const HAPTIC = {
  /** Subtle press tick for buttons, tabs, and links. */
  tap: 8,
  /** Slightly firmer confirmation for primary actions and toggles. */
  confirm: 16,
} as const;

/** Fire a single haptic pulse if the device supports it. */
export function haptic(pattern: number | number[] = HAPTIC.tap) {
  if (typeof navigator === "undefined" || !("vibrate" in navigator)) return;
  try {
    navigator.vibrate(pattern);
  } catch {
    /* Vibration can throw on some user-agent configurations; ignore. */
  }
}

/**
 * Installs a single global listener that ticks on every interactive press,
 * so individual components do not need to wire haptics themselves.
 * Idempotent — safe to call more than once.
 */
export function installGlobalHaptics() {
  if (typeof document === "undefined" || !("vibrate" in navigator)) return;
  const handler = (event: PointerEvent) => {
    const target = event.target as HTMLElement | null;
    if (!target) return;
    if (target.closest("button, a[href], [role='button'], summary, label[for]")) {
      haptic(HAPTIC.tap);
    }
  };
  document.addEventListener("pointerdown", handler, { passive: true });
}
