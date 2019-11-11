import {AnyAction} from 'redux'
import {ACTIVATE_NOTE, CREATE_NOTE_SUCCESS} from '../actions'

export type ActiveNoteIdState = string | null

export function activeReducer(state: ActiveNoteIdState = null, action: AnyAction) {
  switch (action.type) {
    case ACTIVATE_NOTE:
      return action.id
    case CREATE_NOTE_SUCCESS:
      return action.note.id
    default:
      return state
  }

}
