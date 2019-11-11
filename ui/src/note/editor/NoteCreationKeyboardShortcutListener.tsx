import {Component} from 'react'
import {connect} from 'react-redux'
import {createNote} from '../store/actions'
import {fromEvent, Subscription} from 'rxjs'
import {filter, throttleTime} from 'rxjs/operators'

export interface NoteCreationKeyboardShortcutListenerProps {
  createNote: () => void
}

class NoteCreationKeyboardShortcutListener extends Component<NoteCreationKeyboardShortcutListenerProps> {
  // @ts-ignore
  subscription: Subscription

  componentDidMount(): void {
    this.subscription = fromEvent<KeyboardEvent>(window, 'keydown')
      .pipe(
        filter((event) => event.ctrlKey && event.key === 'n'),
        throttleTime(200)
      )
      .subscribe(() => {
        this.props.createNote()
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
  null,
  (dispatch) => ({
    createNote: () => dispatch(createNote())
  })
)(NoteCreationKeyboardShortcutListener)
