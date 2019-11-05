import {Note} from '../Note'
import * as React from 'react'
import {Component, Fragment} from 'react'
import './NoteSnippet.css'

export interface NoteSnippetProps {
  note: Note,
  active: boolean,
  onActivationRequest: (id: string) => void
}

export default class NoteSnippet extends Component<NoteSnippetProps> {

  constructor(props: NoteSnippetProps) {
    super(props)
    this.onActivationRequest = this.onActivationRequest.bind(this)
  }

  onActivationRequest(): void {
    this.props.onActivationRequest(this.props.note.id)
  }

  render() {
    const {note, active} = this.props
    return (
      <div className={['NoteSnippet', active ? 'NoteSnippet-active' : undefined].join(' ')}
           onClick={this.onActivationRequest}>
        <h4 className='NoteSnippet-title'>{note.title || <Fragment>&nbsp;</Fragment>}</h4>
        <p className='NoteSnippet-body'>{note.body || <Fragment>&nbsp;</Fragment>}</p>
        <small
          className='NoteSnippet-creation-date'>{note.creationDate.toLocaleString()}</small>
      </div>
    )
  }
}
