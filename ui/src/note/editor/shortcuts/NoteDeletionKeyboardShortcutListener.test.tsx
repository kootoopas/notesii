import {shallow, ShallowWrapper} from 'enzyme'
import createMockStore, {MockStoreEnhanced} from 'redux-mock-store'
import {asMock, createEmptyRootState} from '../../../../test/utilities'
import {RootState} from '../../../store'
import {deleteNote} from '../../store/actions'
import NoteDeletionKeyboardShortcutListener from './NoteDeletionKeyboardShortcutListener'
import * as React from 'react'

let storeMock: MockStoreEnhanced
let wrapper: ShallowWrapper
let component: ShallowWrapper
let simulateKeyDown: Function

beforeEach(() => {
  const globalEventSimulator = new Map<string, any>()
  window.addEventListener = jest.fn((event, listener) => {
    globalEventSimulator.set(event, listener)
  })
  simulateKeyDown = () => {
    globalEventSimulator.get('keydown')({ctrlKey: true, key: 'Backspace'})
  }
  const state = createEmptyRootState()
  state.note.active = 'a'
  storeMock = createMockStore<RootState>()(state)
  spyOn(storeMock, 'dispatch')
  // @ts-ignore
  wrapper = shallow(<NoteDeletionKeyboardShortcutListener store={storeMock}/>)
  component = wrapper.dive().shallow()
})

it('should express intent to delete note when ctrl-backspace is pressed', () => {
  simulateKeyDown()

  expect(storeMock.dispatch).toHaveBeenCalledWith(deleteNote('a'))
  expect(storeMock.dispatch).toHaveBeenCalledTimes(1)
})

it('should remove shortcut on unmount', () => {
  component.unmount()

  simulateKeyDown()

  expect(storeMock.dispatch).not.toHaveBeenCalled()
})

it('should limit note deletion dispatch to one per 200ms', () => {
  jest.useFakeTimers()

  simulateKeyDown()
  jest.advanceTimersByTime(199)
  simulateKeyDown()
  jest.advanceTimersByTime(1)
  simulateKeyDown()

  expect(asMock(storeMock.dispatch).calls.allArgs()).toEqual([
    [deleteNote('a')],
    [deleteNote('a')]
  ])
})
