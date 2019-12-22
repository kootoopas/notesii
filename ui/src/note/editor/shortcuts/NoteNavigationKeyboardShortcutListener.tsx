import {Component} from 'react'
import {connect} from 'react-redux'
import {activateNote} from '../../store/actions'
import {fromEvent, Subscription} from 'rxjs'
import {filter} from 'rxjs/operators'
import {selectActiveNoteId, selectNoteCollection} from '../../store/selectors';
import {RootState} from '../../../store';
import {NoteCollectionState} from '../../store/reducers/collection';
import {ActiveNoteIdState} from '../../store/reducers/active';

export interface NoteNavigationKeyboardShortcutListenerProps {
  activateNote: (id: string) => void,
  active: ActiveNoteIdState,
  collection: NoteCollectionState
}

class NoteNavigationKeyboardShortcutListener extends Component<NoteNavigationKeyboardShortcutListenerProps> {
  // @ts-ignore
  subscription: Subscription

  componentDidMount(): void {
    this.subscription = fromEvent<KeyboardEvent>(document, 'keydown')
      .pipe(filter((event) => ['ArrowUp', 'ArrowDown'].includes(event.key)))
      .subscribe((event) => {
        const notes = [...this.props.collection.values()]
        const activeNoteIndex = notes.findIndex(note => note.id === this.props.active)
        if (event.key === 'ArrowUp' && activeNoteIndex > 0) {
          this.props.activateNote(notes[activeNoteIndex - 1].id)
        } else if (event.key === 'ArrowDown' && activeNoteIndex < notes.length - 1) {
          this.props.activateNote(notes[activeNoteIndex + 1].id)
        }
      })
  }

  componentWillUnmount(): void {
    this.subscription.unsubscribe()
  }

  render() {
    return null
  }
}

export default connect(
  (state: RootState) => ({
    active: selectActiveNoteId(state),
    collection: selectNoteCollection(state)
  }),
  (dispatch) => ({
    activateNote: (id: string) => dispatch(activateNote(id))
  })
)(NoteNavigationKeyboardShortcutListener)
