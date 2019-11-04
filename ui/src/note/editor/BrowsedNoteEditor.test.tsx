import {shallow, ShallowWrapper} from 'enzyme'
import {Note} from '../Note'
import BrowsedNoteEditor, {
  BrowsedNoteEditorProps,
  BrowsedNoteEditorState
} from './BrowsedNoteEditor'
import * as React from 'react'
import {of} from 'rxjs'
import {NoteSnippet, NoteSnippetProps} from '../snippet/NoteSnippet'
import NoteEditor from './NoteEditor'

let wrapper: ShallowWrapper<BrowsedNoteEditorProps, BrowsedNoteEditorState>
let noteRepoMock: any

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
  wrapper = shallow(<BrowsedNoteEditor noteRepository={noteRepoMock}/>)
})

it('should display note collection as snippet list', () => {
  const noteSnippets = wrapper.find('div > NoteSnippet')
  expect(noteSnippets).toHaveLength(2)
  expect(noteSnippets.get(0).props.note).toEqual(notes[0])
  expect(noteSnippets.get(1).props.note).toEqual(notes[1])
})


it('should activate first snippet on load', () => {
  const firstNoteSnippet: ShallowWrapper<NoteSnippetProps> = wrapper.find(NoteSnippet).first()
  expect(firstNoteSnippet.props().active).toBeTruthy()
})

it('should activate note of snippet on snippet click', () => {
  // TODO simulate click
})

it('should load first note on editor on collection load', () => {
  expect(wrapper.find(NoteEditor).props().note).toEqual(notes[0])
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
