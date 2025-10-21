import { Component, type ErrorInfo, type ReactNode } from "react";
import {
  AlertTriangle,
  RefreshCcw,
  Home,
  Copy,
  Check,
  ChevronRight,
} from "@shared/lib/icons";

interface Props {
  children: ReactNode;
  fallback?: (
    error: Error,
    errorInfo: ErrorInfo | null,
    reset: () => void
  ) => ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  copied: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      copied: false,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary capturó un error:", error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  reset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      copied: false,
    });
  };

  copyStackTrace = async () => {
    if (!this.state.errorInfo) return;

    const stackTraceText = `Error: ${this.state.error?.message}\n\nStack Trace:\n${this.state.errorInfo.componentStack}`;

    try {
      await navigator.clipboard.writeText(stackTraceText);
      this.setState({ copied: true });
      setTimeout(() => {
        this.setState({ copied: false });
      }, 2000);
    } catch (err) {
      console.error("Error al copiar:", err);
    }
  };

  render() {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) {
        return this.props.fallback(
          this.state.error,
          this.state.errorInfo,
          this.reset
        );
      }

      return (
        <div className='min-h-screen w-full flex items-center justify-center bg-lexy-bg-platform p-4'>
          <div className='max-w-2xl w-full bg-white rounded-lg shadow-lg border border-lexy-border-table p-8'>
            <div className='flex items-center gap-x-4 mb-6'>
              <div className='p-3 bg-red-100 rounded-full'>
                <AlertTriangle className='size-8 text-red-600' />
              </div>
              <div>
                <h1 className='text-2xl font-bold text-lexy-text-primary'>
                  ¡Woopsie! Algo salió mal 😿
                </h1>
                <p className='text-lexy-text-secondary mt-1'>
                  Ha ocurrido un error inesperado en la aplicación
                </p>
              </div>
            </div>

            <p className='font-medium text-gray-700 mb-2'>
              Detalles del error:
            </p>
            <div className='bg-gray-50 border border-gray-200 rounded-md p-4 mb-6'>
              <h3 className='text-sm text-gray-700'>Mensaje:</h3>
              <p className='text-sm text-red-600 font-mono break-all'>
                {this.state.error.message}
              </p>
              {this.state.errorInfo && (
                <details className='mt-4'>
                  <summary className='text-sm font-medium text-gray-700 cursor-pointer hover:text-gray-900 flex items-center justify-between'>
                    <span className='flex items-center gap-x-1'>
                      <ChevronRight className='size-4' />
                      Stack trace (<strong>enviar a TI</strong>)
                    </span>
                  </summary>
                  <div className='mt-2 relative'>
                    <button
                      type='button'
                      onClick={this.copyStackTrace}
                      className='absolute top-2 right-2 p-2 bg-white hover:bg-gray-100 rounded border border-gray-300 transition-colors flex items-center gap-x-1.5 text-xs font-medium text-gray-700'>
                      {this.state.copied ? (
                        <>
                          <Check className='size-4 text-green-600' />
                          <span className='text-green-600'>Copiado</span>
                        </>
                      ) : (
                        <>
                          <Copy className='size-4' />
                          <span>Copiar</span>
                        </>
                      )}
                    </button>
                    <pre className='text-xs text-gray-600 overflow-auto max-h-64 bg-white p-2 pr-24 rounded border border-gray-200'>
                      {this.state.errorInfo.componentStack}
                    </pre>
                  </div>
                </details>
              )}
            </div>

            <div className='flex justify-between'>
              <button
                type='button'
                onClick={this.reset}
                className='flex items-center gap-x-2 px-6 py-3 bg-lexy-brand-secondary-dark text-white font-medium rounded-sm hover:bg-lexy-brand-secondary-dark/90 transition-colors cursor-pointer'>
                <RefreshCcw className='size-5' />
                Intentar de nuevo
              </button>
              <button
                type='button'
                onClick={() => (window.location.href = "/")}
                className='flex items-center gap-x-2 px-6 py-3 bg-white text-lexy-brand-secondary-dark font-medium border-2 border-lexy-brand-secondary-dark rounded-sm hover:bg-lexy-btn-secondary-hover transition-colors cursor-pointer'>
                <Home className='size-5' />
                Volver al inicio
              </button>
            </div>

            <p className='text-sm text-lexy-text-secondary mt-6'>
              Si el problema persiste, por favor contacta a TI.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
