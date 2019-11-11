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
export const DELETE_NOTE = 'Delete Note'
export const DELETE_NOTE_SUCCESS = 'Delete Note Success'
export const DELETE_NOTE_FAILURE = 'Delete Note Failure'

export interface NoteFailureAction extends Action {
  error: Error
}

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

export function loadNoteCollectionFailure(error: Error): NoteFailureAction {
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

export function createNoteFailure(error: Error): NoteFailureAction {
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

export function updateNoteFailure(error: Error): NoteFailureAction {
  return {
    type: UPDATE_NOTE_FAILURE,
    error
  }
}

export interface DeleteNoteAction extends Action {
  id: string
}
export function deleteNote(id: string): DeleteNoteAction {
  return {
    type: DELETE_NOTE,
    id
  }
}

export interface DeleteNoteSuccessAction extends Action {
  id: string
  nextActiveId: string | null
}
export function deleteNoteSuccess(id: string, nextActiveId: string | null): DeleteNoteSuccessAction {
  return {
    type: DELETE_NOTE_SUCCESS,
    id,
    nextActiveId
  }
}

export function deleteNoteFailure(error: Error): NoteFailureAction {
  return {
    type: DELETE_NOTE_FAILURE,
    error
  }
}
