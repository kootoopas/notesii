import {AnyAction} from 'redux'
import {ACTIVATE_NOTE} from '../actions'

export type ActiveNoteIdState = string | null

export function activeReducer(state: ActiveNoteIdState = null, action: AnyAction) {
  if (action.type === ACTIVATE_NOTE) {
    return action.id
  }

  return state
}
