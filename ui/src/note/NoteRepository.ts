import {Observable} from 'rxjs'
import {Note} from './Note'

export interface NoteRepository {
  delete(id: string): Observable<boolean>
  get(id: string): Observable<Note | null>
  getList(page: number, size: number): Observable<Note[]>
  search(text: string, page: number, size: number): Observable<Note[]>
  update(id: string, title: string, body: string): Observable<Note>
  create(title: string, body: string): Observable<Note>
}
