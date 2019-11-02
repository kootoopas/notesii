import {Note} from './Note'

export function marshalApiNote(note: any): Note {
  return {
    id: note.id,
    title: note.title,
    body: note.body,
    creationDate: new Date(note.creation_date),
    modificationDate: new Date(note.modification_date)
  }
}
