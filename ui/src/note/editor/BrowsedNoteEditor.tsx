import {Component} from 'react'
import {NoteRepository} from '../NoteRepository'
import {Note} from '../Note'
import NoteEditor from './NoteEditor'
import * as React from 'react'
import {NoteRepositoryContext} from '../NoteRepositoryContext'
import {noop} from '../../utility/noop'

export interface BrowsedNoteEditorState {
  collection: Map<string, Note>,
  activeId: string | null
}

export default class BrowsedNoteEditor extends Component<{}, BrowsedNoteEditorState> {
  static contextType = NoteRepositoryContext
  state: Readonly<BrowsedNoteEditorState> = {
    collection: new Map(),
    activeId: null
  }

  componentDidMount(): void {
    const noteRepository: NoteRepository = this.context
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
      return <NoteEditor note={undefined} onNoteChangeSuccess={noop}/>
    }

    return <NoteEditor note={this.state.collection.get(this.state.activeId)}
                       onNoteChangeSuccess={note => this.addNotes([note])}/>
  }
}
