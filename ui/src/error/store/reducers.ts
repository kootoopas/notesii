import {AnyAction, Reducer} from 'redux'
import {CLEAR_ERROR_MESSAGE} from './actions'
import {LOAD_NOTE_COLLECTION_FAILURE, UPDATE_NOTE_FAILURE} from '../../note/store/actions'

export interface ErrorMessengerState {
  message: string | null
}

export const errorMessengerReducer: Reducer<ErrorMessengerState> = (
  state: ErrorMessengerState = {message: null},
  action: AnyAction
) => {
  switch(action.type) {
    case LOAD_NOTE_COLLECTION_FAILURE:
    case UPDATE_NOTE_FAILURE:
      return {message: action.error.message}
    case CLEAR_ERROR_MESSAGE:
      return {message: null}
    default:
      return state
  }
}
