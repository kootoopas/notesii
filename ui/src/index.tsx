import React from 'react';
import ReactDOM from 'react-dom';
import 'foundation-sites/assets/foundation.scss';
import './index.css';
import App from './App';
import {RemoteNoteRepository} from './note/repository/RemoteNoteRepository'
import {NoteRepository} from './note/repository/NoteRepository'


function initializeApp(noteRepository: NoteRepository) {
  ReactDOM.render(<App noteRepository={noteRepository}/>, document.getElementById('root'))
}

initializeApp(new RemoteNoteRepository('http://localhost:8000/api/v1/notes'))
