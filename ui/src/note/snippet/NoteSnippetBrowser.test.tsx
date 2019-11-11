import {shallow, ShallowWrapper} from 'enzyme'
import createMockStore, {MockStoreEnhanced} from 'redux-mock-store'
import {RootState} from '../../store'
import NoteSnippet, {NoteSnippetProps} from './NoteSnippet'
import * as React from 'react'
import {Note} from '../Note'
import {activateNote} from '../store/actions'
import NoteSnippetBrowser from './NoteSnippetBrowser'

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

let connected: ShallowWrapper
let component: ShallowWrapper
let storeMock: MockStoreEnhanced
let state: RootState

beforeEach(() => {
  storeMock = createMockStore<RootState>()(() => state)
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
  spyOn(storeMock, 'dispatch')
  // @ts-ignore
  connected = shallow(<NoteSnippetBrowser store={storeMock}/>)
  component = connected.dive().shallow()
})

it('should display note collection as snippet list', () => {
  const noteSnippets: ShallowWrapper<NoteSnippetProps> = component.find(NoteSnippet)
  expect(noteSnippets).toHaveLength(2)
  expect(noteSnippets.at(0).props().note).toEqual(notes[0])
  expect(noteSnippets.at(1).props().note).toEqual(notes[1])
})

it('should activate snippet of active note', () => {
  expect(component.find(NoteSnippet).at(0).props().active).toBeTruthy()
  expect(component.find(NoteSnippet).at(1).props().active).toBeFalsy()

  state = {...state, note: {...state.note, active: 'b'}}
  // @ts-ignore
  connected = shallow(<NoteSnippetBrowser store={storeMock}/>)
  component = connected.dive().shallow()

  expect(component.find(NoteSnippet).at(0).props().active).toBeFalsy()
  expect(component.find(NoteSnippet).at(1).props().active).toBeTruthy()
})

it('should express intent to switch active snippet note when one requests it', () => {
  component.find(NoteSnippet).at(1).props().onActivationRequest('b')

  expect(storeMock.dispatch).toHaveBeenCalledWith(activateNote('b'))
})
