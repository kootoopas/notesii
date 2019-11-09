import {shallow, ShallowWrapper} from 'enzyme'
import {Note} from '../Note'
import BrowsedNoteEditor from './BrowsedNoteEditor'
import * as React from 'react'
import NoteSnippet, {NoteSnippetProps} from '../snippet/NoteSnippet'
import NoteEditor from './NoteEditor'
import createMockStore, {MockStoreEnhanced} from 'redux-mock-store'
import {RootState} from '../../store'
import {activateNote, loadNoteCollection} from '../store/actions'

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
  connected = shallow(<BrowsedNoteEditor store={storeMock}/>)
  component = connected.dive().shallow()
})

it('should express intent to load notes on mount', () => {
  expect(storeMock.dispatch).toHaveBeenCalledWith(loadNoteCollection(0, 100))
  expect(storeMock.dispatch).toHaveBeenCalledTimes(1)
})

it('should display note collection as snippet list', () => {
  const noteSnippets: ShallowWrapper<NoteSnippetProps> = component.find(NoteSnippet)
  expect(noteSnippets).toHaveLength(2)
  expect(noteSnippets.at(0).props().note).toEqual(notes[0])
  expect(noteSnippets.at(1).props().note).toEqual(notes[1])
})

it('should activate note snippet whose note is active', () => {
  expect(component.find(NoteSnippet).at(0).props().active).toBeTruthy()
  expect(component.find(NoteSnippet).at(1).props().active).toBeFalsy()

  state = {...state, note: {...state.note, active: 'b'}}
  connected = shallow(<BrowsedNoteEditor store={storeMock}/>)
  component = connected.dive().shallow()

  expect(component.find(NoteSnippet).at(0).props().active).toBeFalsy()
  expect(component.find(NoteSnippet).at(1).props().active).toBeTruthy()
})

it('should load active note on editor', () => {
  expect(component.find(NoteEditor).props().note).toEqual(notes[0])

  state = {...state, note: {...state.note, active: 'b'}}
  connected = shallow(<BrowsedNoteEditor store={storeMock}/>)
  component = connected.dive().shallow()

  expect(component.find(NoteEditor).props().note).toEqual(notes[1])
})

it('should express intent to switch active snippet note when one requests it', () => {
  let noteSnippets: ShallowWrapper<NoteSnippetProps> = component.find(NoteSnippet)

  noteSnippets.at(1).props().onActivationRequest('b')

  expect(storeMock.dispatch).toHaveBeenCalledWith(activateNote('b'))
})
