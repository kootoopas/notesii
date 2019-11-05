import {Component, ReactElement} from 'react'
import {Note} from '../Note'
import NoteEditor from './NoteEditor'
import * as React from 'react'
import {noop} from '../../utility/noop'
import {NoteRepository} from '../repository/NoteRepository'
import {noopNoteRepository} from '../index'
import NoteSnippet from '../snippet/NoteSnippet'

export interface BrowsedNoteEditorState {
  collection: Map<string, Note>,
  activeId: string | null
}

export interface BrowsedNoteEditorProps {
  noteRepository: NoteRepository
}

export default class BrowsedNoteEditor extends Component<BrowsedNoteEditorProps, BrowsedNoteEditorState> {
  state = {
    collection: new Map(),
    activeId: null
  }


  constructor(props: BrowsedNoteEditorProps) {
    super(props)
    this.addNote = this.addNote.bind(this)
    this.activateNote = this.activateNote.bind(this)
  }

  componentDidMount(): void {
    const {noteRepository} = this.props
    noteRepository.getList(0, 100).subscribe((notes) => {
      this.addNotes(notes)
      if (!this.state.activeId) {
        this.activateNote(notes[0].id)
      }
    })
  }

  addNotes(notes: Note[]): void {
    this.setState((state) => {
      const collection = new Map(state.collection)
      notes.forEach(note => {
        collection.set(note.id, note)
      })
      return {collection}
    })
  }

  addNote(note: Note): void {
    this.addNotes([note])
  }

  activateNote(id: string): void {
    this.setState({activeId: id})
  }

  render() {
    const noteSnippets: ReactElement[] = []
    this.state.collection.forEach((note, id) => {
      noteSnippets.push(<NoteSnippet key={id} note={note} active={this.state.activeId === id}
                                     onActivationRequest={this.activateNote}/>)
    })

    const noteEditor = this.state.activeId
      ? (
        <NoteEditor note={this.state.collection.get(this.state.activeId)}
                    onNoteEditSuccess={this.addNote}
                    noteRepository={this.props.noteRepository}/>
      )
      : (
        <NoteEditor note={undefined} onNoteEditSuccess={noop}
                    noteRepository={noopNoteRepository()}/>
      )

    return (
      <div className='BrowsedNoteEditor grid-x'>
        <div className='cell large-3'>{noteSnippets}</div>
        <div className='cell large-9'>{noteEditor}</div>
      </div>
    )
  }
}
