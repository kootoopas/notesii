import {Component, ReactElement} from 'react'
import {Note} from '../Note'
import NoteEditor from './NoteEditor'
import * as React from 'react'
import {noop} from '../../utility/noop'
import {NoteRepository} from '../repository/NoteRepository'
import {noopNoteRepository} from '../repository'
import NoteSnippet from '../snippet/NoteSnippet'
import ErrorStore from '../ErrorStore'

export interface BrowsedNoteEditorState {
  collection: Map<string, Note>,
  activeId: string | null
}

export interface BrowsedNoteEditorProps {
  noteRepository: NoteRepository,
  errorStore: ErrorStore
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
    this.setNoteEditFailureError = this.setNoteEditFailureError.bind(this)
  }

  componentDidMount(): void {
    const {noteRepository} = this.props
    noteRepository.getList(0, 100).subscribe(
      (notes) => {
        this.addNotes(notes)
        if (notes.length > 0 && !this.state.activeId) {
          this.activateNote(notes[0].id)
        }
      },
      (error: any) => {
        this.props.errorStore.setError(error)
      }
    )
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

  setNoteEditFailureError(note: Note, error: Error): void {
    this.props.errorStore.setError(error)
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
                    onNoteEditFailure={this.setNoteEditFailureError}
                    noteRepository={this.props.noteRepository}/>
      )
      : (
        <NoteEditor note={undefined}
                    onNoteEditSuccess={noop}
                    onNoteEditFailure={noop}
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
