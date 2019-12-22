import {Component} from 'react'
import * as React from 'react'
import {connect} from 'react-redux';
import {selectNoteCollectionCount} from './store/selectors';
import {RootState} from '../store';

export interface NoteCounterProps {
  count: number
}

class NoteCounter extends Component<NoteCounterProps> {
  render(): React.ReactNode {
    return this.props.count
  }
}

export default connect((state: RootState) => ({ count: selectNoteCollectionCount(state) }))(NoteCounter)
