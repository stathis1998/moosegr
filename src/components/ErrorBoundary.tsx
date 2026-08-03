import { Component, type ErrorInfo, type ReactNode } from "react";

type Props = { children: ReactNode };
type State = { hasError: boolean };

/** Top-level boundary so one render error shows a fallback instead of a blank page. */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Unhandled UI error:", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-6 text-center">
          <h1 className="text-2xl font-semibold">Something went wrong</h1>
          <p className="text-body">
            Please refresh the page, or reach us at{" "}
            <a href="mailto:info@moose.gr" className="text-brand font-semibold">
              info@moose.gr
            </a>
            .
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}
