import * as React from 'react'
import {Component} from 'react'

import {Note} from '../Note'
import BodyEditor from './BodyEditor'
import TitleEditor from './TitleEditor'
import NoteMetaInlineList from '../meta/NoteMetaInlineList'
import {connect} from 'react-redux'
import {updateNote} from '../store/actions'

export interface NoteEditorProps {
  note?: Note,
  editNote: (note: Note) => void
}

class NoteEditor extends Component<NoteEditorProps> {
  constructor(props: NoteEditorProps) {
    super(props)
    this.updateTitle = this.updateTitle.bind(this)
    this.updateBody = this.updateBody.bind(this)
  }

  updateTitle(title: string): void {
    const {note, editNote} = this.props
    if (!note) {
      return
    }
    editNote({...note, title})
  }

  updateBody(body: string): void {
    const {note, editNote} = this.props
    if (!note) {
      return
    }
    editNote({...note, body})
  }

  render() {
    const {note} = this.props
    return (
      <div className='NoteEditor'>
        <TitleEditor id={note && note.id} title={note && note.title}
                     onTitleChange={this.updateTitle}/>
        <NoteMetaInlineList
          meta={note && new Map([
            ['created at', note.creationDate && note.creationDate.toString()],
            ['modified at', note.modificationDate && note.modificationDate.toString()]
          ])}/>
        <BodyEditor id={note && note.id} body={note && note.body} onBodyChange={this.updateBody}/>
      </div>
    )
  }
}

export default connect(
  null,
  (dispatch) => ({
    editNote: (note: Note) => dispatch(updateNote(note))
  })
)(NoteEditor)
