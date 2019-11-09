import {Component, ReactElement} from 'react'
import {Note} from '../Note'
import * as React from 'react'
import NoteSnippet from '../snippet/NoteSnippet'
import {connect} from 'react-redux'
import {selectActiveNoteId, selectNoteCollection} from '../store/selectors'
import {RootState} from '../../store'
import {activateNote, loadNoteCollection} from '../store/actions'
import NoteEditor from './NoteEditor'

export interface BrowsedNoteEditorProps {
  collection: Map<string, Note>
  activeId: string | null
  loadCollection: (page: number, size: number) => void,
  activateNote: (id: string) => void
}

class BrowsedNoteEditor extends Component<BrowsedNoteEditorProps> {
  state = {
    collection: new Map(),
    activeId: null
  }

  componentDidMount(): void {
    this.props.loadCollection(0, 100)
  }

  render() {
    const noteSnippets: ReactElement[] = []
    this.props.collection.forEach((note, id) => {
      noteSnippets.push(<NoteSnippet key={id} note={note} active={this.props.activeId === id}
                                     onActivationRequest={this.props.activateNote}/>)
    })

    return (
      <div className='BrowsedNoteEditor grid-x'>
        <div className='cell large-3'>{noteSnippets}</div>
        <div className='cell large-9'>
          {
            this.props.activeId
              ? <NoteEditor note={this.props.collection.get(this.props.activeId)}/>
              : <NoteEditor note={undefined}/>
          }
        </div>
      </div>
    )
  }
}

export default connect(
  (state: RootState) => ({
    collection: selectNoteCollection(state),
    activeId: selectActiveNoteId(state)
  }),
  (dispatch) => ({
    loadCollection: (page: number, size: number) => dispatch(loadNoteCollection(page, size)),
    activateNote: (id: string) => dispatch(activateNote(id))
  })
)(BrowsedNoteEditor)
