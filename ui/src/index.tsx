import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {NoteRepository} from './note/NoteRepository'

function initializeApp(noteRepository: NoteRepository) {
  const NoteRepositoryContext = React.createContext<NoteRepository>(noteRepository)

  ReactDOM.render(
    <NoteRepositoryContext.Provider value={noteRepository}>
      <App />
    </NoteRepositoryContext.Provider>,
    document.getElementById('root')
  )
}

initializeApp(new NoteRepository('http://localhost:8000/api/v1/notes'))
