import {activeReducer} from './active'
import {emptyAction} from '../../../../test/constants'
import {activateNote} from '../actions'

it('should default to no active note', () => {
  expect(activeReducer(undefined, emptyAction)).toBeNull()
})

it('should activate note on request', () => {
  expect(activeReducer(undefined, activateNote('a'))).toBe('a')
  expect(activeReducer(undefined, activateNote('b'))).toBe('b')
})
