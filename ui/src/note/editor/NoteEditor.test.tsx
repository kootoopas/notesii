import {shallow, ShallowWrapper} from 'enzyme'

import {Note} from '../Note'
import * as React from 'react'
import NoteEditor from './NoteEditor'
import TitleEditor from './TitleEditor'
import {of} from 'rxjs'
import BodyEditor from './BodyEditor'
import NoteMetaInlineList from '../meta/NoteMetaInlineList'

let wrapper: ShallowWrapper
let onNoteEditSuccessMock: any
let noteRepoMock: any

const note: Note = {
  id: 'a',
  title: 'i',
  body: 'x',
  creationDate: new Date(),
  modificationDate: new Date()
}

beforeEach(() => {
  onNoteEditSuccessMock = jest.fn()
  noteRepoMock = {
    update: jest.fn()
  }

  wrapper = shallow(<NoteEditor note={note} onNoteEditSuccess={onNoteEditSuccessMock}
                                noteRepository={noteRepoMock}/>)
})

it('should update note on title change', () => {
  const titleEditor = wrapper.find(TitleEditor)
  expect(titleEditor).toHaveLength(1)
  noteRepoMock.update.mockReturnValue(of({...note, title: 'i\''}))

  titleEditor.props().onTitleChange('i\'')

  expect(onNoteEditSuccessMock).toHaveBeenCalledWith({...note, title: 'i\''})
  expect(onNoteEditSuccessMock).toHaveBeenCalledTimes(1)
  expect(noteRepoMock.update).toHaveBeenCalledWith('a', 'i\'', 'x')
  expect(noteRepoMock.update).toHaveBeenCalledTimes(1)
})

it('should update note on body change', () => {
  const bodyEditor = wrapper.find(BodyEditor)
  expect(bodyEditor).toHaveLength(1)
  noteRepoMock.update.mockReturnValue(of({...note, body: 'x\''}))

  bodyEditor.props().onBodyChange('x\'')

  expect(onNoteEditSuccessMock).toHaveBeenCalledWith({...note, body: 'x\''})
  expect(onNoteEditSuccessMock).toHaveBeenCalledTimes(1)
  expect(noteRepoMock.update).toHaveBeenCalledWith('a', 'i', 'x\'')
  expect(noteRepoMock.update).toHaveBeenCalledTimes(1)
})

it('should render creation and modification dates as meta key-value pairs', () => {
  const list = wrapper.find(NoteMetaInlineList)
  expect(list).toHaveLength(1)
  expect(list.props().meta).toEqual(new Map([
    ['created at', note.creationDate.toString()],
    ['modified at', note.modificationDate.toString()]
  ]))
})

it('should not provide meta pairs to list when no note is provided', () => {
  wrapper = shallow(<NoteEditor note={undefined} onNoteEditSuccess={onNoteEditSuccessMock}
                                noteRepository={noteRepoMock}/>)
  const list = wrapper.find(NoteMetaInlineList)
  expect(list).toHaveLength(1)
  expect(list.props().meta).toBeUndefined()
})
