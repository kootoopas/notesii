import React from 'react';
import ReactDOM from 'react-dom';
import 'foundation-sites/assets/foundation.scss';
import './index.css';
import App from './App';
import {RemoteNoteRepository} from './note/RemoteNoteRepository'
import {NoteRepository} from './note/NoteRepository'
import {NoteRepositoryContext} from './note/NoteRepositoryContext'


function initializeApp(noteRepository: NoteRepository) {
  ReactDOM.render(
    <NoteRepositoryContext.Provider value={noteRepository}>
      <App />
    </NoteRepositoryContext.Provider>,
    document.getElementById('root')
  )
}

initializeApp(new RemoteNoteRepository('http://localhost:8000/api/v1/notes'))
