import React from 'react';
import ReactDOM from 'react-dom';
import 'foundation-sites/assets/foundation.scss';
import './index.css';
import App from './App';
import {RemoteNoteRepository} from './note/repository/RemoteNoteRepository'
import {NoteRepository} from './note/repository/NoteRepository'
import {Logger} from './Logger'
import ErrorStore from './note/ErrorStore'


function initializeApp(window: Window, noteRepository: NoteRepository, errorStore: ErrorStore, errorLogger: Logger) {
  window.addEventListener('error', (event) => {
    errorLogger.error(event.error)
  })

  ReactDOM.render(<App noteRepository={noteRepository} errorStore={errorStore}/>, window.document.getElementById('root'))
}

const errorLogger = {
  error(error: Error, meta: Map<string, any>): void {
    console.error(error)
    meta && meta.forEach((value, key) => {
      console.error(`${key}: ${value}`)
    })
  }
}
initializeApp(
  window,
  new RemoteNoteRepository('http://localhost:8000/api/v1/notes'),
  new ErrorStore(),
  errorLogger
)
