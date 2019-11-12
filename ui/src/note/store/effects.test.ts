import {
  createNote$,
  deleteNote$,
  initActiveNote$,
  loadNoteCollection$,
  updateNote$
} from './effects'
import {
  activateNote,
  createNote,
  createNoteFailure,
  createNoteSuccess,
  deleteNote,
  deleteNoteFailure,
  deleteNoteSuccess,
  loadNoteCollection,
  loadNoteCollectionFailure,
  loadNoteCollectionSuccess,
  updateNote,
  updateNoteFailure,
  updateNoteSuccess
} from './actions'
import {ActionsObservable} from 'redux-observable'
import {
  createEmptyRootState,
  createEmptyStateObservable, createObserverMock,
  createStateObservable
} from '../../../test/utilities'
import {Note} from '../Note'
import {Observable, of, throwError} from 'rxjs'
import {AnyAction} from 'redux'
import {RootState} from '../../store'

const notes: Note[] = [
  {
    id: 'a',
    title: 'i',
    body: 'x',
    creationDate: new Date(),
    modificationDate: new Date()
  },
  {
    id: 'b',
    title: 'j',
    body: 'y',
    creationDate: new Date(),
    modificationDate: new Date()
  },
]
let effect$: Observable<AnyAction>

describe('load note collection', () => {
  let dependencyMocks: any

  beforeEach(() => {
    dependencyMocks = {
      noteRepository: {
        getList: jest.fn()
      }
    }
    effect$ = loadNoteCollection$(ActionsObservable.of(loadNoteCollection(0, 100)), createEmptyStateObservable(), dependencyMocks)
  })

  it('should fetch notes and dispatch success on load note collection action', (done) => {
    dependencyMocks.noteRepository.getList.mockReturnValue(of(notes))

    effect$.subscribe((action) => {
      expect(action).toEqual(loadNoteCollectionSuccess(notes))
      done()
    })
  })

  it('should dispatch failure on note collection fetching error', (done) => {
    dependencyMocks.noteRepository.getList.mockReturnValue(throwError(new Error('Error.')))

    effect$.subscribe((action) => {
      expect(action).toEqual(loadNoteCollectionFailure(new Error('Error.')))
      done()
    })
  })
})

describe('init active note', () => {
  it('should activate first note of collection on load success when no note is active', (done) => {
    initActiveNote$(ActionsObservable.of(loadNoteCollectionSuccess(notes)), createEmptyStateObservable(), {} as any)
      .subscribe((action) => {
        expect(action).toEqual(activateNote('a'))
        done()
      })
  })

  it('should not activate note of collection on load success when there\'s already an active note', () => {
    const observerMock = createObserverMock()
    const state = createEmptyRootState()
    state.note.active = 'a'

    initActiveNote$(ActionsObservable.of(loadNoteCollectionSuccess(notes)), createStateObservable(state), {} as any)
      .subscribe(observerMock)

    expect(observerMock.next).toHaveBeenCalledTimes(0)
    expect(observerMock.error).toHaveBeenCalledTimes(0)
    expect(observerMock.complete).toHaveBeenCalledTimes(1)
  })
})

describe('create note', () => {
  let dependencyMocks: any

  beforeEach(() => {
    dependencyMocks = {
      noteRepository: {
        create: jest.fn()
      }
    }
    effect$ = createNote$(ActionsObservable.of(createNote()), createEmptyStateObservable(), dependencyMocks)
  })

  it('should update note and dispatch success on update note action', (done) => {
    const note: Note = {
      id: 'c',
      title: '',
      body: '',
      creationDate: new Date(),
      modificationDate: new Date()
    }
    dependencyMocks.noteRepository.create.mockReturnValue(of(note))

    effect$.subscribe((action) => {
      expect(action).toEqual(createNoteSuccess(note))
      done()
    })
  })

  it('should dispatch failure on note update error', (done) => {
    dependencyMocks.noteRepository.create.mockReturnValue(throwError(new Error('Error.')))

    effect$.subscribe((action) => {
      expect(action).toEqual(createNoteFailure(new Error('Error.')))
      done()
    })
  })
})

describe('update note', () => {
  let dependencyMocks: any
  let note: Note

  beforeEach(() => {
    dependencyMocks = {
      noteRepository: {
        update: jest.fn()
      }
    }
    note = {...notes[0], title: 'a\''}
    effect$ = updateNote$(ActionsObservable.of(updateNote(note)), createEmptyStateObservable(), dependencyMocks)
  })

  it('should update note and dispatch success on note update action', (done) => {
    dependencyMocks.noteRepository.update.mockReturnValue(of(note))

    effect$.subscribe((action) => {
      expect(action).toEqual(updateNoteSuccess(note))
      done()
    })
  })

  it('should dispatch failure on note update error', (done) => {
    dependencyMocks.noteRepository.update.mockReturnValue(throwError(new Error('Error.')))

    effect$.subscribe((action) => {
      expect(action).toEqual(updateNoteFailure(new Error('Error.')))
      done()
    })
  })
})

describe('delete note', () => {
  let dependencyMocks: any
  let state: RootState

  beforeEach(() => {
    dependencyMocks = {
      noteRepository: {
        delete: jest.fn()
      }
    }
    state = createEmptyRootState()
    state.note.collection = new Map([
      [notes[0].id, notes[0]],
      [notes[1].id, notes[1]],
      ['c', {
        id: 'c',
        title: 'k',
        body: 'z',
        creationDate: new Date(),
        modificationDate: new Date()
      }]
    ])
    dependencyMocks.noteRepository.delete.mockReturnValue(of(true))
  })

  it('should delete note and dispatch success with previous adjacent note of collection as next active id when active note is deleted', (done) => {
    state.note.active = 'b'

    deleteNote$(ActionsObservable.of(deleteNote('b')), createStateObservable(state), dependencyMocks)
      .subscribe((action) => {
        expect(action).toEqual(deleteNoteSuccess('b', 'a'))
        done()
      })
  })

  it('should delete note and dispatch success with following adjacent note of collection as next active id when first-in-collection active note is deleted', (done) => {
    state.note.active = 'a'

    deleteNote$(ActionsObservable.of(deleteNote('a')), createStateObservable(state), dependencyMocks)
      .subscribe((action) => {
        expect(action).toEqual(deleteNoteSuccess('a', 'b'))
        done()
      })
  })

  it('should delete note and dispatch success without changing active note when non-active note is deleted', (done) => {
    state.note.active = 'a'

    deleteNote$(ActionsObservable.of(deleteNote('b')), createStateObservable(state), dependencyMocks)
      .subscribe((action) => {
        expect(action).toEqual(deleteNoteSuccess('b', 'a'))
        done()
      })
  })

  it('should delete note and dispatch success with null active id when sole note of collection is active and deleted', (done) => {
    state.note.collection = new Map([
      [notes[0].id, notes[0]]
    ])
    state.note.active = 'a'

    deleteNote$(ActionsObservable.of(deleteNote('a')), createStateObservable(state), dependencyMocks)
      .subscribe((action) => {
        expect(action).toEqual(deleteNoteSuccess('a', null))
        done()
      })
  })

  it('should dispatch failure on note deletion error', (done) => {
    dependencyMocks.noteRepository.delete.mockReturnValue(throwError(new Error('Error.')))

    deleteNote$(ActionsObservable.of(deleteNote('b')), createStateObservable(state), dependencyMocks)
      .subscribe((action) => {
        expect(action).toEqual(deleteNoteFailure(new Error('Error.')))
        done()
      })
  })
})
