import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: null });
    // Clear localStorage to reset app state
    try {
      Object.keys(localStorage)
        .filter(key => key.startsWith('vibe-coding-'))
        .forEach(key => localStorage.removeItem(key));
    } catch {
      // Ignore localStorage errors
    }
    window.location.reload();
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          padding: '2rem',
          textAlign: 'center',
          backgroundColor: '#0a0f14',
          color: '#e0e0e0',
          fontFamily: 'monospace',
        }}>
          <h1 style={{ color: '#00ff88', marginBottom: '1rem' }}>
            Bir hata olustu / An error occurred
          </h1>
          <p style={{ color: '#888', marginBottom: '2rem', maxWidth: '500px' }}>
            Uygulama beklenmeyen bir hatayla karsilasti. Lutfen sayfayi yenileyin veya asagidaki butona tiklayin.
          </p>
          <pre style={{
            backgroundColor: '#1a1f24',
            padding: '1rem',
            borderRadius: '8px',
            marginBottom: '2rem',
            maxWidth: '100%',
            overflow: 'auto',
            fontSize: '0.875rem',
            color: '#ff6b6b',
          }}>
            {this.state.error?.message || 'Unknown error'}
          </pre>
          <button
            onClick={this.handleReset}
            style={{
              padding: '0.75rem 2rem',
              backgroundColor: '#00ff88',
              color: '#0a0f14',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            Sifirla ve Yenile / Reset & Reload
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
