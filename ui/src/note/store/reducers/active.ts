import {AnyAction, Reducer} from 'redux'
import {ACTIVATE_NOTE} from '../actions'

export type ActiveNoteIdState = string | null

export const activeReducer: Reducer<ActiveNoteIdState> = (state: ActiveNoteIdState = null, action: AnyAction) => {
  if (action.type === ACTIVATE_NOTE) {
    return action.id
  }

  return state
}
