import {Component, ErrorInfo} from 'react'
import {Logger} from './Logger'
import * as React from 'react'

export interface ErrorBoundaryProps {
  logger: Logger
}

export interface ErrorBoundaryState {
  error?: Error
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state = {
    error: undefined
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {error}
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.props.logger.error(error, new Map([
      ['component stacktrace', errorInfo.componentStack]
    ]))
  }

  render() {
    if (this.state.error) {
      return <h3 className='text-center warning callout'>Unfortunately, an error occurred.</h3>
    }

    return this.props.children
  }
}
