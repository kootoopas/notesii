import {Component} from 'react'
import * as React from 'react'
import './NoteMetaPair.css'

export interface NoteMetaPairProps {
  metaKey: string
  metaValue: string
}

export default class NoteMetaPair extends Component<NoteMetaPairProps> {
  render() {
    return <span className='NoteMetaPair'>{this.props.metaKey}: {this.props.metaValue}</span>
  }
}
