import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Ignore Chrome extension errors
    const message = error?.message || '';
    if (
      message.includes('runtime.lastError') ||
      message.includes('message channel closed') ||
      message.includes('Extension context invalidated')
    ) {
      // Reset error state for extension errors
      this.setState({ hasError: false, error: null });
      return;
    }

    // Log other errors
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Render fallback UI
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          padding: '20px',
          textAlign: 'center',
          background: 'linear-gradient(135deg, #1e1e2e 0%, #2d2d44 100%)',
          color: '#fff'
        }}>
          <h2 style={{ marginBottom: '20px' }}>⚠️ Something went wrong</h2>
          <p style={{ marginBottom: '20px', color: 'rgba(255, 255, 255, 0.7)' }}>
            {this.state.error?.message || 'An unexpected error occurred'}
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '12px 24px',
              borderRadius: '8px',
              border: 'none',
              background: 'linear-gradient(135deg, #007AFF 0%, #0051D5 100%)',
              color: '#fff',
              fontSize: '1em',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            🔄 Reload App
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
