import React from 'react';
import ReactDOM from 'react-dom';
import 'foundation-sites/assets/foundation.scss';
import './index.css';
import App from './App';
import {RemoteNoteRepository} from './note/repository/RemoteNoteRepository'
import {NoteRepository} from './note/repository/NoteRepository'
import {Logger} from './logger/Logger'
import AppErrorBoundary from './AppErrorBoundary'
import ConsoleLogger from './logger/ConsoleLogger'
import {Provider} from 'react-redux'
import {createStore} from './store'


function initializeApp(window: Window, noteRepository: NoteRepository, errorLogger: Logger) {
  window.addEventListener('error', (event) => {
    errorLogger.error(event.error)
  })

  ReactDOM.render(
    <AppErrorBoundary logger={errorLogger}>
      <Provider store={createStore(noteRepository)}>
        <App />
      </Provider>
    </AppErrorBoundary>,
    window.document.getElementById('root'))
}

initializeApp(
  window,
  new RemoteNoteRepository('http://localhost:8000/api/v1/notes'),
  new ConsoleLogger()
)
