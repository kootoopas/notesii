import {ChangeEvent, Component} from 'react'
import * as React from 'react'
import _ from 'lodash'

export interface TitleEditorProps {
  id?: string
  title?: string
  onTitleChange: (title: string) => void
}

export interface TitleEditorState {
  title?: string
}

export default class TitleEditor extends Component<TitleEditorProps, TitleEditorState> {
  state = {
    title: undefined
  }

  private notifyTitleChange: (title: string) => void

  constructor(props: TitleEditorProps) {
    super(props)
    this.onTitleChange = this.onTitleChange.bind(this)
    this.notifyTitleChange = _.debounce(this.props.onTitleChange, 500)
  }

  componentDidUpdate(prevProps: Readonly<TitleEditorProps>): void {
    if (this.props.onTitleChange !== prevProps.onTitleChange) {
      this.notifyTitleChange = _.debounce(this.props.onTitleChange, 500)
    }

    if (this.props.id !== prevProps.id) {
      this.setState((_, props) => ({title: props.title}))
    }
  }

  onTitleChange(event: ChangeEvent<HTMLInputElement>): void {
    const title = event.target.value
    this.setState({title})
    this.notifyTitleChange(title)
  }

  render() {
    return <input type='text' value={this.state.title || ''} onChange={this.onTitleChange}/>
  }
}
