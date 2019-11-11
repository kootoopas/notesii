import {collectionReducer} from './collection'
import {emptyAction} from '../../../../test/constants'
import {
  createNoteSuccess,
  deleteNoteSuccess,
  loadNoteCollectionSuccess,
  updateNoteSuccess
} from '../actions'

const initialState = new Map([
  ['a', {
    id: 'a',
    title: 'i',
    body: 'x',
    creationDate: new Date(),
    modificationDate: new Date()
  }],
  ['b', {
    id: 'b',
    title: 'j',
    body: 'y',
    creationDate: new Date(),
    modificationDate: new Date()
  }]
])

it('should default to empty map', () => {
  expect(collectionReducer(undefined, emptyAction)).toEqual(new Map())
})

it('should add notes on note collection load success', () => {
  const loadedNotes = [
    {
      id: 'b',
      title: 'j\'',
      body: 'y\'',
      creationDate: new Date(),
      modificationDate: new Date()
    },
    {
      id: 'c',
      title: 'k',
      body: 'z',
      creationDate: new Date(),
      modificationDate: new Date()
    }
  ]
  const state = collectionReducer(initialState, loadNoteCollectionSuccess(loadedNotes))

  const expectedState = new Map(state)
  expectedState.set('b', loadedNotes[0])
  expectedState.set('c', loadedNotes[1])
  expect(state).toEqual(expectedState)
})

it('should prepend note to collection on note creation success', () => {
  const note = {
    id: 'c',
    title: '',
    body: '',
    creationDate: new Date(),
    modificationDate: new Date()
  }
  const state = collectionReducer(initialState, createNoteSuccess(note))

  const expectedState = new Map([
    ['c', note],
    ...initialState.entries()
  ])
  expect(state).toEqual(expectedState)
  expect([...expectedState.values()][0]).toEqual(note)
})

it('should update note on note update success', () => {
  const note = {
    id: 'b',
    title: 'j\'',
    body: 'y\'',
    creationDate: new Date(),
    modificationDate: new Date()
  }
  const state = collectionReducer(initialState, updateNoteSuccess(note))

  const expectedState = new Map(initialState)
  expectedState.set('b', note)
  expect(state).toEqual(expectedState)
})

it('should remove deleted note from collection', () => {
  const state = collectionReducer(initialState, deleteNoteSuccess('a', 'b'))

  const expectedState = new Map(initialState)
  expectedState.delete('a')
  expect(state).toEqual(expectedState)
})
