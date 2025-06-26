import React from "react";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    // Puedes enviar el error a un servicio externo aquí si lo deseas
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 32, color: 'white', background: '#1e293b', minHeight: '100vh' }}>
          <h1 style={{ color: '#f87171' }}>¡Ocurrió un error en la aplicación!</h1>
          <pre style={{ color: '#fbbf24', whiteSpace: 'pre-wrap' }}>{this.state.error && this.state.error.toString()}</pre>
          <details style={{ color: '#fbbf24', marginTop: 16 }}>
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }
    return this.props.children;
  }
}
