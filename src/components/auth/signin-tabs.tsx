import { KeyRound, Lock } from "lucide-react";
import { useState } from "react";
import { LoginForm } from "./login-form";
import { OtpSignInForm } from "./otp-form";
import { PasskeyButton } from "./passkey-button";

type Method = "password" | "code";

export function SignInTabs() {
  const [method, setMethod] = useState<Method>("password");

  return (
    <div className="flex flex-col gap-5">
      <div
        role="tablist"
        aria-label="Sign-in method"
        className="grid grid-cols-2 gap-1 rounded-xl bg-muted p-1"
      >
        {(
          [
            { value: "password", label: "Password", icon: Lock },
            { value: "code", label: "Email code", icon: KeyRound },
          ] as const
        ).map((tab) => {
          const Icon = tab.icon;
          const selected = method === tab.value;
          return (
            <button
              key={tab.value}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setMethod(tab.value)}
              className={`flex min-h-11 items-center justify-center gap-2 rounded-lg px-3 text-sm font-semibold transition ${
                selected
                  ? "bg-surface text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon aria-hidden="true" className="size-4" />
              {tab.label}
            </button>
          );
        })}
      </div>
      <div role="tabpanel">
        {method === "password" ? <LoginForm /> : <OtpSignInForm />}
      </div>
      <PasskeyButton />
    </div>
  );
}