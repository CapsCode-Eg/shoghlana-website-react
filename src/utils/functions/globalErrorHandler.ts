// utils/globalErrorHandler.ts
export class GlobalErrorHandler {
  private static instance: GlobalErrorHandler;
  private errorHandlers: ((error: Error) => void)[] = [];

  private constructor() {
    this.setupGlobalHandlers();
  }

  static getInstance(): GlobalErrorHandler {
    if (!GlobalErrorHandler.instance) {
      GlobalErrorHandler.instance = new GlobalErrorHandler();
    }
    return GlobalErrorHandler.instance;
  }

  private setupGlobalHandlers() {
    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      console.error('Unhandled promise rejection:', event.reason);
      this.handleError(new Error(event.reason));
      event.preventDefault();
    });

    // Handle global errors
    window.addEventListener('error', (event) => {
      console.error('Global error:', event.error);
      this.handleError(event.error);
      event.preventDefault();
    });
  }

  handleError(error: Error) {
    // Log error
    console.error('Global error handler:', error);
    
    // Send to error tracking service
    if (window.Sentry) {
      window.Sentry.captureException(error);
    }

    // Execute custom handlers
    this.errorHandlers.forEach(handler => handler(error));
    
    // Show user-friendly notification
    this.showErrorNotification(error);
  }

  private showErrorNotification(error: Error) {
    // You can use a toast library here
    const notification = document.createElement('div');
    notification.className = 'error-notification';
    notification.textContent = 'An error occurred. Please try again.';
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 5000);
    console.log(error)
  }

  addErrorHandler(handler: (error: Error) => void) {
    this.errorHandlers.push(handler);
  }

  removeErrorHandler(handler: (error: Error) => void) {
    this.errorHandlers = this.errorHandlers.filter(h => h !== handler);
  }
}