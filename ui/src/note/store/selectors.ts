import {RootState} from '../../store'
import {NoteCollectionState} from './reducers/collection'
import {ActiveNoteIdState} from './reducers/active'
import {Note} from '../Note'

export function selectNoteCollection(state: RootState): NoteCollectionState {
  return state.note.collection
}

export function selectNoteCollectionAsArray(state: RootState): Note[] {
  return [...selectNoteCollection(state).values()]
}

export function selectActiveNoteId(state: RootState): ActiveNoteIdState {
  return state.note.active
}
