import React from 'react';
import './App.css';
import ActiveNoteEditor from './note/editor/ActiveNoteEditor'
import ErrorMessenger from './error/ErrorMessenger'

const App: React.FC = () => {
  return (
    <div>
      <ErrorMessenger/>
      <ActiveNoteEditor/>
    </div>
  )
}

export default App
