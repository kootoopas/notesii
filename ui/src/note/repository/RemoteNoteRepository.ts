import {Note} from '../Note';
import {Observable, OperatorFunction, throwError, from} from 'rxjs';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {createQueryString, request} from '../../utility/request';

import {marshalApiNote} from '../marshallers';
import {isEmptyObject} from '../../utility/object'
import {NoteRepository} from './NoteRepository'

export class RemoteNoteRepository implements NoteRepository {

  constructor(private resourceUrl: string) {}

  get(id: string): Observable<Note | null> {
    return request(`${this.resourceUrl}/${id}`, {method: 'GET'})
      .pipe(map((note: any) => {
        if (isEmptyObject(note)) {
          return null
        }

        return marshalApiNote(note)
      }))
  }

  getList(page: number, size: number): Observable<Note[]> {

    return request(
      this.resourceUrl + createQueryString({page, size}), {method: 'GET'}
    ).pipe(map((notes: any[]) => notes.map(note => marshalApiNote(note))))
  }

  search(text: string, page: number, size: number): Observable<Note[]> {
    return request(
      this.resourceUrl + createQueryString({text, page, size}), {method: 'GET'}
    ).pipe(map((notes: any[]) => notes.map(note => marshalApiNote(note))))
  }

  create(title: string, body: string): Observable<Note> {
    return request(this.resourceUrl, {
      method: 'POST',
      body: {
        title,
        body
      }
    }).pipe(
      map((note) => marshalApiNote(note)),
      this.catchError()
    )
  }

  update(id: string, title: string, body: string): Observable<Note> {
    return request(`${this.resourceUrl}/${id}`, {
      method: 'PUT',
      body: {
        title,
        body
      }
    }).pipe(
      map((note) => marshalApiNote(note)),
      this.catchError()
    )
  }

  delete(id: string): Observable<boolean> {
    return request(`${this.resourceUrl}/${id}`, {method: 'DELETE'})
      .pipe(map(_ => true))
  }

  private catchError(): OperatorFunction<Note, Note> {
    return catchError((response: Response) => {
      return from(response.json())
        .pipe(
          mergeMap((body: any) => throwError(new Error(body.message)))
        )
    })
  }
}
