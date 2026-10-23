import { Component, type ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface Props { children: ReactNode; }
interface State { hasError: boolean; error: Error | null; }

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: unknown) {
    // eslint-disable-next-line no-console
    console.error("AIIM runtime error:", error, info);
  }

  reset = () => this.setState({ hasError: false, error: null });

  render() {
    if (!this.state.hasError) return this.props.children;
    return (
      <div className="flex min-h-dvh items-center justify-center bg-background p-6">
        <div className="max-w-md rounded-2xl border border-border bg-surface px-6 py-8 text-center shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
          <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-danger/10 text-danger">
            <AlertTriangle aria-hidden="true" className="size-6" />
          </span>
          <h1 className="mt-4 text-lg font-bold tracking-tight">Something went wrong</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            The page hit an unexpected error. Our team has been notified. You can retry or return home.
          </p>
          {this.state.error ? (
            <pre className="mt-3 max-h-32 overflow-auto rounded-lg bg-muted px-3 py-2 text-left text-[10px] text-muted-foreground">{this.state.error.message}</pre>
          ) : null}
          <div className="mt-5 flex justify-center gap-2">
            <button type="button" onClick={this.reset} className="btn btn-primary btn-sm">
              <RefreshCw aria-hidden="true" className="size-4" /> Retry
            </button>
            <button type="button" onClick={() => (window.location.href = "/")} className="btn btn-secondary btn-sm">
              Home
            </button>
          </div>
        </div>
      </div>
    );
  }
}