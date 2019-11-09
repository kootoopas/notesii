import {ofType} from 'redux-observable'
import {
  activateNote,
  LOAD_NOTE_COLLECTION,
  LOAD_NOTE_COLLECTION_SUCCESS,
  loadNoteCollectionFailure,
  loadNoteCollectionSuccess, UPDATE_NOTE, updateNoteFailure, updateNoteSuccess
} from './actions'
import {catchError, filter, map, mergeMap} from 'rxjs/operators'
import {of} from 'rxjs'
import {Effect} from '../../store'
import {Note} from '../Note'

export const loadNoteCollection$: Effect = (action$, _, {noteRepository}) => action$.pipe(
  ofType(LOAD_NOTE_COLLECTION),
  mergeMap(({page, size}) =>
    noteRepository.getList(page, size).pipe(
      map((notes: Note[]) => loadNoteCollectionSuccess(notes)),
      catchError((error) => of(loadNoteCollectionFailure(error)))
    )
  )
)

export const initActiveNote$: Effect = (action$, state$) => action$.pipe(
  ofType(LOAD_NOTE_COLLECTION_SUCCESS),
  // Exit if there's already an active note.
  filter((action) => action.collection && action.collection.length > 0 && !state$.value.note.active),
  map((action) => activateNote(action.collection[0].id))
)

export const updateNote$: Effect = (action$, state$, {noteRepository}) => action$.pipe(
  ofType(UPDATE_NOTE),
  mergeMap((action) =>
    noteRepository.update(action.note.id, action.note.title, action.note.body).pipe(
      map((note) => updateNoteSuccess(note)),
      catchError(error => of(updateNoteFailure(error)))
    )
  )
)
