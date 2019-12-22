import {Component} from 'react'
import {Note} from '../Note'
import * as React from 'react'
import {connect} from 'react-redux'
import {selectActiveNoteId, selectNoteCollection} from '../store/selectors'
import {RootState} from '../../store'
import {loadNoteCollection} from '../store/actions'
import NoteEditor from './NoteEditor'
import NoteCreationKeyboardShortcutListener from './shortcuts/NoteCreationKeyboardShortcutListener'
import NoteSnippetBrowser from '../snippet/NoteSnippetBrowser'
import NoteDeletionKeyboardShortcutListener from './shortcuts/NoteDeletionKeyboardShortcutListener'
import NoteCounter from '../NoteCounter';
import NoteNavigationKeyboardShortcutListener from './shortcuts/NoteNavigationKeyboardShortcutListener';

export interface ActiveNoteEditorProps {
  collection: Map<string, Note>
  activeId: string | null
  loadCollection: (page: number, size: number) => void,
  activateNote: (id: string) => void
}

class ActiveNoteEditor extends Component<ActiveNoteEditorProps> {
  state = {
    collection: new Map(),
    activeId: null
  }

  componentDidMount(): void {
    this.props.loadCollection(0, 100)
  }

  render() {
    return (
      <div className='ActiveNoteEditor grid-x'>
        <div className='cell large-3'>
          <h5 className='text-right'>All Notes  <NoteCounter/></h5>
          <NoteSnippetBrowser/>
        </div>
        <div className='cell large-9'>
          {
            this.props.activeId
              ? <NoteEditor note={this.props.collection.get(this.props.activeId)}/>
              : <NoteEditor note={undefined}/>
          }
        </div>
        <NoteCreationKeyboardShortcutListener/>
        <NoteDeletionKeyboardShortcutListener/>
        <NoteNavigationKeyboardShortcutListener/>
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
  })
)(ActiveNoteEditor)
