import React from 'react'
import {NoteRepository} from './NoteRepository'
import {noopNoteRepository} from './index'

export const NoteRepositoryContext = React.createContext<NoteRepository>(noopNoteRepository())

