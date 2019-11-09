import {shallow, ShallowWrapper} from 'enzyme'

import {Note} from '../Note'
import * as React from 'react'
import NoteEditor from './NoteEditor'
import TitleEditor from './TitleEditor'
import BodyEditor from './BodyEditor'
import NoteMetaInlineList from '../meta/NoteMetaInlineList'
import createMockStore, {MockStoreEnhanced} from 'redux-mock-store'
import {RootState} from '../../store'
import {updateNote} from '../store/actions'


let storeMock: MockStoreEnhanced
let connected: ShallowWrapper
let component: ShallowWrapper

const note: Note = {
  id: 'a',
  title: 'i',
  body: 'x',
  creationDate: new Date(),
  modificationDate: new Date()
}

beforeEach(() => {
  storeMock = createMockStore<RootState>()()
  spyOn(storeMock, 'dispatch')
  connected = shallow(<NoteEditor note={note} store={storeMock}/>)
  component = connected.dive()
})

it('should update note on title change', () => {
  const titleEditor = component.find(TitleEditor)
  expect(titleEditor).toHaveLength(1)

  titleEditor.props().onTitleChange('i\'')

  expect(storeMock.dispatch).toHaveBeenCalledWith(updateNote({...note, title: 'i\''}))
  expect(storeMock.dispatch).toHaveBeenCalledTimes(1)
})

it('should update note on body change', () => {
  const bodyEditor = component.find(BodyEditor)
  expect(bodyEditor).toHaveLength(1)

  bodyEditor.props().onBodyChange('x\'')

  expect(storeMock.dispatch).toHaveBeenCalledWith(updateNote({...note, body: 'x\''}))
  expect(storeMock.dispatch).toHaveBeenCalledTimes(1)
})

it('should render creation and modification dates as meta key-value pairs', () => {
  const list = component.find(NoteMetaInlineList)
  expect(list).toHaveLength(1)
  expect(list.props().meta).toEqual(new Map([
    ['created at', note.creationDate.toString()],
    ['modified at', note.modificationDate.toString()]
  ]))
})

it('should not provide meta pairs to list when no note is provided', () => {
  connected = shallow(<NoteEditor note={undefined} store={storeMock}/>)
  component = connected.dive()

  const list = component.find(NoteMetaInlineList)
  expect(list).toHaveLength(1)
  expect(list.props().meta).toBeUndefined()
})
