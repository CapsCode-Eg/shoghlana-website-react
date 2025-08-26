declare global {
  interface Window {
    Sentry?: {
      captureException: (error: Error, context?: any) => void;
      captureMessage: (message: string, level?: string) => void;
      setUser: (user: any) => void;
      configureScope: (callback: (scope: any) => void) => void;
    };
  }
}

export {};