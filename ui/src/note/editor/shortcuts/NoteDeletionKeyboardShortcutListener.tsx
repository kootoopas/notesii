import {Component} from 'react'
import {connect} from 'react-redux'
import {deleteNote} from '../../store/actions'
import {fromEvent, Subscription} from 'rxjs'
import {filter, throttleTime} from 'rxjs/operators'
import {RootState} from '../../../store'

export interface NoteDeletionKeyboardShortcutListenerProps {
  deleteNote: (id: string) => void,
  activeId: string | null
}

class NoteDeletionKeyboardShortcutListener extends Component<NoteDeletionKeyboardShortcutListenerProps> {
  // @ts-ignore
  subscription: Subscription

  componentDidMount(): void {
    this.subscription = fromEvent<KeyboardEvent>(window, 'keydown')
      .pipe(
        filter((event) => event.ctrlKey && event.key === 'Backspace'),
        throttleTime(200)
      )
      .subscribe(() => {
        this.props.activeId && this.props.deleteNote(this.props.activeId)
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
    activeId: state.note.active
  }),
  (dispatch) => ({
    deleteNote: (id: string) => dispatch(deleteNote(id))
  })
)(NoteDeletionKeyboardShortcutListener)
