import {Action} from 'redux'
import {Note} from '../Note'

export const LOAD_NOTE_COLLECTION = 'Load Note Collection'
export const LOAD_NOTE_COLLECTION_SUCCESS = 'Load Note Collection Success'
export const LOAD_NOTE_COLLECTION_FAILURE = 'Load Note Collection Failure'
export const ACTIVATE_NOTE = 'Activate Note'
export const CREATE_NOTE = 'Create Note'
export const CREATE_NOTE_SUCCESS = 'Create Note Success'
export const CREATE_NOTE_FAILURE = 'Create Note Failure'
export const UPDATE_NOTE = 'Update Note'
export const UPDATE_NOTE_SUCCESS = 'Update Note Success'
export const UPDATE_NOTE_FAILURE = 'Update Note Failure'

export interface LoadNoteCollectionAction extends Action {
  page: number
  size: number
}
export function loadNoteCollection(page: number, size: number): LoadNoteCollectionAction {
  return {
    type: LOAD_NOTE_COLLECTION,
    page,
    size
  }
}

export interface LoadNoteCollectionSuccessAction extends Action {
  collection: Note[]
}
export function loadNoteCollectionSuccess(collection: Note[]): LoadNoteCollectionSuccessAction {
  return {
    type: LOAD_NOTE_COLLECTION_SUCCESS,
    collection
  }
}

export interface LoadNoteCollectionFailureAction extends Action {
  error: Error
}
export function loadNoteCollectionFailure(error: Error): LoadNoteCollectionFailureAction {
  return {
    type: LOAD_NOTE_COLLECTION_FAILURE,
    error
  }
}

export interface ActivateNoteAction extends Action {
  id: string
}
export function activateNote(id: string): ActivateNoteAction {
  return {
    type: ACTIVATE_NOTE,
    id
  }
}

export function createNote(): Action {
  return {
    type: CREATE_NOTE
  }
}

export interface CreateNoteSuccessAction extends Action {
  note: Note
}
export function createNoteSuccess(note: Note): CreateNoteSuccessAction {
  return {
    type: CREATE_NOTE_SUCCESS,
    note
  }
}

export interface CreateNoteFailureAction extends Action {
  error: Error
}
export function createNoteFailure(error: Error): CreateNoteFailureAction {
  return {
    type: CREATE_NOTE_FAILURE,
    error
  }
}

export interface UpdateNoteAction extends Action {
  note: Note
}
export function updateNote(note: Note): UpdateNoteAction {
  return {
    type: UPDATE_NOTE,
    note
  }
}

export interface UpdateNoteSuccessAction extends Action {
  note: Note
}
export function updateNoteSuccess(note: Note): UpdateNoteSuccessAction {
  return {
    type: UPDATE_NOTE_SUCCESS,
    note
  }
}

export interface UpdateNoteFailureAction extends Action {
  error: Error
}
export function updateNoteFailure(error: Error): UpdateNoteFailureAction {
  return {
    type: UPDATE_NOTE_FAILURE,
    error
  }
}
