import {shallow, ShallowWrapper} from 'enzyme'
import createMockStore, {MockStoreEnhanced} from 'redux-mock-store'
import {asMock, createEmptyRootState} from '../../../test/utilities'
import {RootState} from '../../store'
import {createNote} from '../store/actions'
import NoteCreationKeyboardShortcutListener from './NoteCreationKeyboardShortcutListener'
import * as React from 'react'

let storeMock: MockStoreEnhanced
let wrapper: ShallowWrapper
let component: ShallowWrapper
let simulateKeyboardShortcutDown: Function

beforeEach(() => {
  const globalEventSimulator = new Map<string, any>()
  window.addEventListener = jest.fn((event, listener) => {
    globalEventSimulator.set(event, listener)
  })
  simulateKeyboardShortcutDown = () => {
    globalEventSimulator.get('keydown')({ctrlKey: true, key: 'n'})
  }

  storeMock = createMockStore<RootState>()(createEmptyRootState())
  spyOn(storeMock, 'dispatch')
  // @ts-ignore
  wrapper = shallow(<NoteCreationKeyboardShortcutListener store={storeMock}/>)
  component = wrapper.dive()
})

it('should express intent to create note when ctrl-n is pressed', () => {
  simulateKeyboardShortcutDown()

  expect(storeMock.dispatch).toHaveBeenCalledWith(createNote())
  expect(storeMock.dispatch).toHaveBeenCalledTimes(1)
})

it('should remove shortcut on unmount', () => {
  component.unmount()

  simulateKeyboardShortcutDown()

  expect(storeMock.dispatch).not.toHaveBeenCalled()
})

it('should limit note creation to one per 200ms', () => {
  jest.useFakeTimers()

  simulateKeyboardShortcutDown()
  jest.advanceTimersByTime(199)
  simulateKeyboardShortcutDown()
  jest.advanceTimersByTime(1)
  simulateKeyboardShortcutDown()

  expect(asMock(storeMock.dispatch).calls.allArgs()).toEqual([
    [createNote()],
    [createNote()]
  ])
})
