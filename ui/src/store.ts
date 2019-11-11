import {
  Action,
  applyMiddleware,
  combineReducers, compose,
  createStore as reduxCreateStore
} from 'redux'
import {collectionReducer, NoteCollectionState} from './note/store/reducers/collection'
import {ActiveNoteIdState, activeReducer} from './note/store/reducers/active'
import {combineEpics, createEpicMiddleware, Epic} from 'redux-observable'
import {NoteRepository} from './note/repository/NoteRepository'
import {createNote$, initActiveNote$, loadNoteCollection$, updateNote$} from './note/store/effects'
import {errorMessengerReducer, ErrorMessengerState} from './error/store/reducers'


export interface RootState {
  note: {
    collection: NoteCollectionState,
    active: ActiveNoteIdState
  },
  error: ErrorMessengerState
}

export interface EffectDependencies {
  noteRepository: NoteRepository
}

export interface Effect<
  Input extends Action = any,
  Output extends Input = Input,
  State = RootState,
  Dependencies = EffectDependencies
> extends Epic<Input, Output, State, Dependencies> {}

export function createStore(noteRepository: NoteRepository) {
  const epicMiddleware = createEpicMiddleware<Action, Action, RootState, EffectDependencies>({
    dependencies: {noteRepository}
  })

  // TODO: Type store enhancers
  const store = reduxCreateStore<RootState, Action, any, any>(
    combineReducers({
      note: combineReducers({
        collection: collectionReducer,
        active: activeReducer
      }),
      error: errorMessengerReducer
    }),
    compose(
      applyMiddleware(
        epicMiddleware
      )
    )
  )

  epicMiddleware.run(
    combineEpics(
      loadNoteCollection$,
      initActiveNote$,
      createNote$,
      updateNote$
    )
  )

  return store
}
