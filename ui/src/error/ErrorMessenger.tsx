import {Component} from 'react'
import * as React from 'react'
import {connect} from 'react-redux'
import {RootState} from '../store'
import {clearErrorMessage} from './store/actions'

export interface ErrorMessengerProps {
  message?: string
  clearError: () => void
}

class ErrorMessenger extends Component<ErrorMessengerProps> {
  render() {
    return this.props.message
      ? (
        <div className='callout alert'>
          <h5 className='text-center'>{this.props.message!}</h5>
          <button className='close-button' aria-label='Dismiss alert' type='button'
                  onClick={this.props.clearError}>
            <span aria-hidden='true'>&times;</span>
          </button>
        </div>
      )
      : null
  }
}

export default connect(
  (state: RootState) => ({
      message: state.error.message
  }),
  (dispatch) => ({
    clearError: () => dispatch(clearErrorMessage())
  })
)(ErrorMessenger)
