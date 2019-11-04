import {Component} from 'react'
import {Note} from '../Note'
import NoteEditor from './NoteEditor'
import * as React from 'react'
import {noop} from '../../utility/noop'
import {NoteRepository} from '../repository/NoteRepository'

export interface BrowsedNoteEditorState {
  collection: Map<string, Note>,
  activeId: string | null
}

interface BrowsedNoteEditorProps {
  noteRepository: NoteRepository
}

export default class BrowsedNoteEditor extends Component<BrowsedNoteEditorProps, BrowsedNoteEditorState> {
  state: Readonly<BrowsedNoteEditorState> = {
    collection: new Map(),
    activeId: null
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

  activateNote(id: string): void {
    this.setState({activeId: id})
  }

  render() {
    if (!this.state.activeId) {
      return <NoteEditor note={undefined} onNoteChangeSuccess={noop}
                         noteRepository={this.props.noteRepository}/>
    }

    return <NoteEditor note={this.state.collection.get(this.state.activeId)}
                       onNoteChangeSuccess={note => this.addNotes([note])}
                       noteRepository={this.props.noteRepository}/>
  }
}
