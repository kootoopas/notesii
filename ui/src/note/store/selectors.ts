import {RootState} from '../../store'
import {NoteCollectionState} from './reducers/collection'
import {ActiveNoteIdState} from './reducers/active'

export function selectNoteCollection(state: RootState): NoteCollectionState {
  return state.note.collection
}

export function selectActiveNoteId(state: RootState): ActiveNoteIdState {
  return state.note.active
}
