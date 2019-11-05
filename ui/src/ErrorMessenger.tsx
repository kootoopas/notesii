import {Component} from 'react'
import * as React from 'react'
import ErrorStore from './note/ErrorStore'
import {Subscription} from 'rxjs'

export interface ErrorMessengerProps {
  errorStore: ErrorStore
}

export interface ErrorMessengerState {
  message?: string
}

export default class ErrorMessenger extends Component<ErrorMessengerProps, ErrorMessengerState> {
  state = {
    message: undefined
  }
  subscription?: Subscription

  constructor(props: ErrorMessengerProps) {
    super(props)
    this.clearError = this.clearError.bind(this)
  }

  componentDidMount(): void {
    this.subscription = this.props.errorStore.getError()
      .subscribe((error?: Error) => {
        this.setState({message: error && error.message})
      })
  }

  componentWillUnmount(): void {
    this.subscription!.unsubscribe()
  }

  clearError(): void {
    this.props.errorStore.clearError()
  }

  render() {
    return this.state.message
      ? (
        <div className='callout alert'>
          <h5>{this.state.message!}</h5>
          <button className='close-button' aria-label='Dismiss alert' type='button'
                  onClick={this.clearError}>
            <span aria-hidden='true'>&times;</span>
          </button>
        </div>
      )
      : null
  }
}
