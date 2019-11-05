import React from 'react';
import './App.css';
import BrowsedNoteEditor from './note/editor/BrowsedNoteEditor'
import {NoteRepository} from './note/repository/NoteRepository'
import ErrorStore from './note/ErrorStore'
import ErrorMessenger from './ErrorMessenger'

interface AppProps {
  noteRepository: NoteRepository,
  errorStore: ErrorStore
}

const App: React.FC<AppProps> = (props) => {
  return (
    <div>
      <ErrorMessenger errorStore={props.errorStore}/>
      <BrowsedNoteEditor noteRepository={props.noteRepository} errorStore={props.errorStore} />
    </div>
  );
}

export default App;
