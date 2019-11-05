import {shallow, ShallowWrapper} from 'enzyme'
import {Note} from '../Note'
import BrowsedNoteEditor, {
  BrowsedNoteEditorProps,
  BrowsedNoteEditorState
} from './BrowsedNoteEditor'
import * as React from 'react'
import {of, throwError} from 'rxjs'
import NoteSnippet, {NoteSnippetProps} from '../snippet/NoteSnippet'
import NoteEditor from './NoteEditor'

let wrapper: ShallowWrapper<BrowsedNoteEditorProps, BrowsedNoteEditorState>
let noteRepoMock: any
let errorStoreMock: any

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
  noteRepoMock = {
    getList: jest.fn().mockReturnValue(of(notes))
  }
  errorStoreMock = {
    setError: jest.fn()
  }
  wrapper = shallow(<BrowsedNoteEditor noteRepository={noteRepoMock} errorStore={errorStoreMock}/>)
})

it('should display note collection as snippet list on load', () => {
  const noteSnippets: ShallowWrapper<NoteSnippetProps> = wrapper.find(NoteSnippet)
  expect(noteSnippets).toHaveLength(2)
  expect(noteSnippets.at(0).props().note).toEqual(notes[0])
  expect(noteSnippets.at(1).props().note).toEqual(notes[1])
})

it('should inform error store about collection load error', () => {
  noteRepoMock.getList.mockReturnValue(throwError(new Error('Error.')))

  wrapper = shallow(<BrowsedNoteEditor noteRepository={noteRepoMock} errorStore={errorStoreMock}/>)

  expect(errorStoreMock.setError).toHaveBeenCalledWith(new Error('Error.'))
  expect(errorStoreMock.setError).toHaveBeenCalledTimes(1)
})

it('should activate first note snippet on load', () => {
  expect(wrapper.find(NoteSnippet).first().props().active).toBeTruthy()
  expect(noteRepoMock.getList).toHaveBeenCalledWith(0, 100)
  expect(noteRepoMock.getList).toHaveBeenCalledTimes(1)
})

it('should load first note of collection to editor on load', () => {
  expect(wrapper.find(NoteEditor).props().note).toEqual(notes[0])
  expect(noteRepoMock.getList).toHaveBeenCalledWith(0, 100)
  expect(noteRepoMock.getList).toHaveBeenCalledTimes(1)
})

it('should switch active snippet note to the one that requests activation', () => {
  let noteSnippets: ShallowWrapper<NoteSnippetProps> = wrapper.find(NoteSnippet)
  expect(noteSnippets.at(0).props().active).toBeTruthy()
  expect(noteSnippets.at(1).props().active).toBeFalsy()

  noteSnippets.at(1).props().onActivationRequest('b')

  noteSnippets = wrapper.find(NoteSnippet)
  expect(noteSnippets.at(0).props().active).toBeFalsy()
  expect(noteSnippets.at(1).props().active).toBeTruthy()
})

it('should load snippet note to editor when it requests activation', () => {
  expect(wrapper.find(NoteEditor).props().note).toEqual(notes[0])

  wrapper.find(NoteSnippet).at(1).props().onActivationRequest('b')

  expect(wrapper.find(NoteEditor).props().note).toEqual(notes[1])
})

it('should update collection on successful note edit', () => {
  expect(wrapper.state().collection).toEqual(new Map([
    [notes[0].id, notes[0]],
    [notes[1].id, notes[1]]
  ]))

  const note = {...notes[0], title: 'i\''}
  wrapper.find(NoteEditor).props().onNoteEditSuccess(note)

  expect(wrapper.state().collection).toEqual(new Map([
    [notes[0].id, note],
    [notes[1].id, notes[1]]
  ]))
})


it('should inform error store on note edit failure', () => {
  const note = {...notes[0], title: 'i\''}
  wrapper.find(NoteEditor).props().onNoteEditFailure(note, new Error('Error.'))

  expect(errorStoreMock.setError).toHaveBeenCalledWith(new Error('Error.'))
  expect(errorStoreMock.setError).toHaveBeenCalledTimes(1)
})
