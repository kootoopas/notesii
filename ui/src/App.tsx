import React from 'react';
import './App.css';
import BrowsedNoteEditor from './note/editor/BrowsedNoteEditor'
import ErrorMessenger from './error/ErrorMessenger'

const App: React.FC = () => {
  return (
    <div>
      <ErrorMessenger/>
      <BrowsedNoteEditor/>
    </div>
  )
}

export default App
