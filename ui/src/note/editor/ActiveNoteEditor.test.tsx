import {shallow, ShallowWrapper} from 'enzyme'
import {Note} from '../Note'
import ActiveNoteEditor from './ActiveNoteEditor'
import * as React from 'react'
import NoteEditor from './NoteEditor'
import createMockStore, {MockStoreEnhanced} from 'redux-mock-store'
import {RootState} from '../../store'
import {loadNoteCollection} from '../store/actions'
import NoteCreationKeyboardShortcutListener from './shortcuts/NoteCreationKeyboardShortcutListener'
import NoteSnippetBrowser from '../snippet/NoteSnippetBrowser'
import NoteDeletionKeyboardShortcutListener from './shortcuts/NoteDeletionKeyboardShortcutListener'

let connected: ShallowWrapper
let component: ShallowWrapper
let storeMock: MockStoreEnhanced
let state: RootState

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
  }
]

beforeEach(() => {
  storeMock = createMockStore<RootState>()(() => state)
  spyOn(storeMock, 'dispatch')
  state = {
    error: {message: null},
    note: {
      active: 'a',
      collection: new Map([
        ['a', notes[0]],
        ['b', notes[1]]
      ])
    }
  }
  // @ts-ignore
  connected = shallow(<ActiveNoteEditor store={storeMock}/>)
  component = connected.dive().shallow()
})

it('should express intent to load notes on mount', () => {
  expect(storeMock.dispatch).toHaveBeenCalledWith(loadNoteCollection(0, 100))
  expect(storeMock.dispatch).toHaveBeenCalledTimes(1)
})

it('should load active note on editor', () => {
  expect(component.find(NoteEditor).props().note).toEqual(notes[0])

  state = {...state, note: {...state.note, active: 'b'}}
  // @ts-ignore
  connected = shallow(<ActiveNoteEditor store={storeMock}/>)
  component = connected.dive().shallow()

  expect(component.find(NoteEditor).props().note).toEqual(notes[1])
})

it('should render note snippet browser', () => {
  expect(component.find(NoteSnippetBrowser)).toHaveLength(1)
})

it('should render note creation keyboard shortcut listener component', () => {
  expect(component.find(NoteCreationKeyboardShortcutListener)).toHaveLength(1)
})

it('should render note deletion keyboard shortcut listener component', () => {
  expect(component.find(NoteDeletionKeyboardShortcutListener)).toHaveLength(1)
})
