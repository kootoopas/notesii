import {connect} from 'react-redux'
import {RootState} from '../../store'
import {
  selectActiveNoteId,
  selectNoteCollectionAsArray
} from '../store/selectors'
import {activateNote} from '../store/actions'
import {Note} from '../Note'
import {Component, Fragment} from 'react'
import NoteSnippet from './NoteSnippet'
import * as React from 'react'
import './NoteSnippetBrowser.css'

export interface NoteSnippetBrowserProps {
  collection: Note[],
  activeId: string | null,
  activateNote: (id: string) => void
}

class NoteSnippetBrowser extends Component<NoteSnippetBrowserProps> {
  render() {
    return (
      <div className='NoteSnippetBrowser'>
        {this.props.collection.map((note) =>
          <NoteSnippet key={note.id} note={note} active={this.props.activeId === note.id}
                       onActivationRequest={this.props.activateNote}/>)}
      </div>
    )
  }
}

export default connect(
  (state: RootState) => ({
    collection: selectNoteCollectionAsArray(state),
    activeId: selectActiveNoteId(state)
  }),
  (dispatch) => ({
    activateNote: (id: string) => dispatch(activateNote(id))
  })
)(NoteSnippetBrowser)
