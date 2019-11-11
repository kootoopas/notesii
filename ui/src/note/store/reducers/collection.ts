import {Note} from '../../Note'
import {AnyAction} from 'redux'
import {
  CREATE_NOTE_SUCCESS,
  DELETE_NOTE_SUCCESS,
  LOAD_NOTE_COLLECTION_SUCCESS,
  UPDATE_NOTE_SUCCESS
} from '../actions'

export type NoteCollectionState = Map<string, Note>

export function collectionReducer(state: NoteCollectionState = new Map(), action: AnyAction) {
  switch (action.type) {
    case LOAD_NOTE_COLLECTION_SUCCESS: {
      const collection = action.collection && action.collection.length
        ? new Map<string, Note>(action.collection.map((note: Note) => [note.id, note]))
        : new Map()
      return new Map([
        ...state.entries(),
        ...collection.entries()
      ])
    }
    case CREATE_NOTE_SUCCESS: {
      return new Map([
        [action.note.id, action.note],
        ...state.entries(),
      ])
    }
    case UPDATE_NOTE_SUCCESS: {
      const collection = new Map(state)
      collection.set(action.note.id, action.note)
      return collection
    }
    case DELETE_NOTE_SUCCESS: {
      const collection = new Map(state)
      collection.delete(action.id)
      return collection
    }
    default: {
      return state
    }
  }
}
