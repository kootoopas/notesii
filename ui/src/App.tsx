import React from 'react';
import './App.css';
import BrowsedNoteEditor from './note/editor/BrowsedNoteEditor'
import {NoteRepository} from './note/repository/NoteRepository'

interface AppProps {
  noteRepository: NoteRepository
}

const App: React.FC<AppProps> = (props) => {
  return (
    <div>
      <BrowsedNoteEditor noteRepository={props.noteRepository} />
    </div>
  );
}

export default App;
