import * as React from 'react'
import {Component} from 'react'

import {Note} from '../Note'
import BodyEditor from './BodyEditor'
import TitleEditor from './TitleEditor'
import NoteMetaInlineList from '../meta/NoteMetaInlineList'
import {NoteRepository} from '../repository/NoteRepository'

export interface NoteEditorProps {
  note?: Note,
  onNoteEditSuccess: (note: Note) => void,
  noteRepository: NoteRepository
}

export default class NoteEditor extends Component<NoteEditorProps> {
  constructor(props: NoteEditorProps) {
    super(props)
    this.updateTitle = this.updateTitle.bind(this)
    this.updateBody = this.updateBody.bind(this)
  }

  updateTitle(title: string): void {
    const {note} = this.props
    if (!note) {
      return
    }
    this.updateNote({...note, title})
  }

  updateBody(body: string): void {
    const {note} = this.props
    if (!note) {
      return
    }
    this.updateNote({...note, body})
  }

  private updateNote(note: Note): void {
    console.log(note.id, note.title, note.body)
    this.props.noteRepository.update(note.id, note.title, note.body).subscribe((note) => {
      this.props.onNoteEditSuccess(note)
    })
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
