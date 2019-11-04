import {Note} from '../Note'
import * as React from 'react'
import { Fragment } from 'react'
import './NoteSnippet.css'

export interface NoteSnippetProps {
  note: Note,
  active: boolean
}

export const NoteSnippet: React.FC<NoteSnippetProps> = (props) => {
  return (
    <div className={['NoteSnippet', props.active ? 'NoteSnippet-active' : undefined].join(' ')}>
      <h4 className='NoteSnippet-title'>{props.note.title || <Fragment>&nbsp;</Fragment>}</h4>
      <p className='NoteSnippet-body'>{props.note.body || <Fragment>&nbsp;</Fragment>}</p>
      <small
        className='NoteSnippet-creation-date'>{props.note.creationDate.toLocaleString()}</small>
    </div>
  )
}
