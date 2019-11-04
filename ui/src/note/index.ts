import {NoteRepository} from './repository/NoteRepository'
import {Note} from './Note'
import {EMPTY, Observable} from 'rxjs'

export function noopNoteRepository(): NoteRepository {
  return {
    delete(id: string): Observable<boolean> {
      return EMPTY;
    }, get(id: string): Observable<Note | null> {
      return EMPTY;
    }, getList(page: number, size: number): Observable<Note[]> {
      return EMPTY;
    }, search(text: string, page: number, size: number): Observable<Note[]> {
      return EMPTY;
    }, update(id: string, title: string, body: string): Observable<Note> {
      return EMPTY;
    },
    create(title: string, body: string): Observable<Note> {
      return EMPTY;
    }
  }
}
