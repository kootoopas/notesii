import {ChangeEvent, Component} from 'react'
import * as React from 'react'
import _ from 'lodash'

export interface BodyEditorProps {
  id?: string,
  body?: string,
  onBodyChange: (body: string) => void
}

export interface BodyEditorState {
  body?: string
}

export default class BodyEditor extends Component<BodyEditorProps, BodyEditorState> {
  state = {
    body: undefined
  }
  private notifyBodyChange: (body: string) => void

  constructor(props: BodyEditorProps) {
    super(props)
    this.onBodyChange = this.onBodyChange.bind(this)
    this.notifyBodyChange = _.debounce(this.props.onBodyChange, 500)
  }

  componentDidUpdate(prevProps: Readonly<BodyEditorProps>): void {
    if (prevProps.onBodyChange !== this.props.onBodyChange){
      this.notifyBodyChange = _.debounce(this.props.onBodyChange, 500)
    }

    if (this.props.id !== prevProps.id) {
      // if note id change set state to new body
      this.setState((_, props) => ({body: props.body}))
    }
  }

  onBodyChange(event: ChangeEvent<HTMLTextAreaElement>): void {
    const body = event.target.value
    this.setState({body})
    this.notifyBodyChange(body)
  }

  render() {
    return <textarea value={this.state.body || ''} onChange={this.onBodyChange}/>
  }
}
