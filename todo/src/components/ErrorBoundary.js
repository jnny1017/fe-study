import { React } from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFormError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div>에러발생</div>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
