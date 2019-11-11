import {activeReducer} from './active'
import {emptyAction} from '../../../../test/constants'
import {activateNote, createNoteSuccess} from '../actions'
import {Note} from '../../Note'

it('should default to no active note', () => {
  expect(activeReducer(undefined, emptyAction)).toBeNull()
})

it('should activate note on request', () => {
  expect(activeReducer(undefined, activateNote('a'))).toBe('a')
  expect(activeReducer(undefined, activateNote('b'))).toBe('b')
})

it('should activate newly created note', () => {
  const note: Note = {
    id: 'a',
    title: 'i',
    body: 'x',
    creationDate: new Date(),
    modificationDate: new Date()
  }
  expect(activeReducer(undefined, createNoteSuccess(note))).toEqual('a')
})
