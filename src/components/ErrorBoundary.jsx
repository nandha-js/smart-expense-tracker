import { Component } from 'react';

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('Error caught by boundary:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return <div className="p-4 bg-red-50 text-red-600 rounded-lg">Component failed to load</div>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;