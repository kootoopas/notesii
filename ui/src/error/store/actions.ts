import {Action} from 'redux'

export const CLEAR_ERROR_MESSAGE = 'Clear Error Message'
export function clearErrorMessage(): Action {
  return {
    type: CLEAR_ERROR_MESSAGE
  }
}
