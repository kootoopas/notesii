import {AnyAction, Reducer} from 'redux'
import {ACTIVATE_NOTE} from '../actions'

export type ActiveNoteIdState = string | undefined

export const activeReducer: Reducer<ActiveNoteIdState> = (state: ActiveNoteIdState = undefined, action: AnyAction) => {
  if (action.type === ACTIVATE_NOTE) {
    return action.id
  }

  return state
}
