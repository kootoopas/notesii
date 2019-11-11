import {ofType} from 'redux-observable'
import {
  activateNote,
  CREATE_NOTE,
  createNoteFailure,
  createNoteSuccess,
  DELETE_NOTE,
  deleteNoteFailure,
  deleteNoteSuccess,
  LOAD_NOTE_COLLECTION,
  LOAD_NOTE_COLLECTION_SUCCESS,
  loadNoteCollectionFailure,
  loadNoteCollectionSuccess,
  UPDATE_NOTE,
  updateNoteFailure,
  updateNoteSuccess
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

export const createNote$: Effect = (action$, _, {noteRepository}) => action$.pipe(
  ofType(CREATE_NOTE),
  mergeMap((_) =>
    noteRepository.create('', '').pipe(
      map((note: Note) => createNoteSuccess(note)),
      catchError((error) => of(createNoteFailure(error)))
    )
  )
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

export const deleteNote$: Effect = (action$, state$, {noteRepository}) => action$.pipe(
  ofType(DELETE_NOTE),
  mergeMap((action) =>
    noteRepository.delete(action.id).pipe(
      map(() => {
        const getNextActiveId = () => {
          if (action.id !== state$.value.note.active) {
            return state$.value.note.active
          }

          const collectionArray = [...state$.value.note.collection.values()]
          const deletedNoteIndex: number = collectionArray.findIndex((note) => note.id === action.id)
          if (deletedNoteIndex === 0) {
            return collectionArray.length > 1 ? collectionArray[1].id : null
          }
          return collectionArray[deletedNoteIndex - 1].id
        }

        return deleteNoteSuccess(action.id, getNextActiveId())
      }),
      catchError(error => of(deleteNoteFailure(error)))
    )
  )
)

