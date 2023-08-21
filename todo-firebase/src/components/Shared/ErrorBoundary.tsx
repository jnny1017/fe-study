import { Component, PropsWithChildren } from 'react'

interface Props {
  rejectFallback?: React.ReactNode
}

interface State {
  hasError: boolean
}

class ErrorBoundary extends Component<PropsWithChildren<Props>, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return this.props.rejectFallback ? (
        this.props.rejectFallback
      ) : (
        <div>에러발생</div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
