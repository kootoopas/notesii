import {Component} from 'react'
import NoteMetaPair from './NoteMetaPair'
import * as React from 'react'

export interface NoteMetaInlineListProps {
  meta?: Map<string, string>
}

export default class NoteMetaInlineList extends Component<NoteMetaInlineListProps> {
  createMetaPairs(): JSX.Element[] {
    const {meta} = this.props
    if (!meta) {
      return []
    }

    const pairs: JSX.Element[] = []
    meta.forEach((value, key) => {
      pairs.push(<NoteMetaPair key={key} metaKey={key} metaValue={value}/>)
    })
    return pairs
  }

  render() {
    return (
      <div className='NoteMetaInlineList'>{this.createMetaPairs()}</div>
    )
  }
}
