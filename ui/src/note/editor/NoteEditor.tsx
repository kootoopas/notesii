import * as React from 'react'
import {Component} from 'react'

import {Note} from '../Note'
import BodyEditor from './BodyEditor'
import TitleEditor from './TitleEditor'
import NoteMetaInlineList from './NoteMetaInlineList'
import {NoteRepositoryContext} from '../NoteRepositoryContext'
import {NoteRepository} from '../NoteRepository'

export interface NoteEditorProps {
  note?: Note,
  onNoteChangeSuccess: (note: Note) => void
}

export default class NoteEditor extends Component<NoteEditorProps> {
  static contextType = NoteRepositoryContext

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
    const noteRepository: NoteRepository = this.context
    noteRepository.update(note.id, note.title, note.body).subscribe((note) => {
      this.props.onNoteChangeSuccess(note)
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
            ['created at', note.creationDate.toString()],
            ['modified at', note.modificationDate.toString()]
          ])}/>
        <BodyEditor id={note && note.id} body={note && note.body} onBodyChange={this.updateBody}/>
      </div>
    )
  }
}
