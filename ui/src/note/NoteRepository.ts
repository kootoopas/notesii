import {Note} from './Note';
import {Observable, OperatorFunction, throwError, from} from 'rxjs';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {request} from '../utility/request';

import {marshalApiNote} from './marshallers';
import {isEmptyObject} from '../utility/object'

export class NoteRepository {

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
    return request(this.resourceUrl,
      {
        method: 'GET',
        body: new URLSearchParams({
          page: page.toString(),
          size: size.toString()
        })
      }
    ).pipe(map((notes: any[]) => notes.map(note => marshalApiNote(note))))
  }

  search(text: string, page: number, size: number): Observable<Note[]> {
    return request(this.resourceUrl,
      {
        method: 'GET',
        body: new URLSearchParams({
          text,
          page: page.toString(),
          size: size.toString()
        })
      }
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

  private catchError(): OperatorFunction<never, never> {
    return catchError((response: Response) => {
      return from(response.json())
        .pipe(
          mergeMap((body: any) => throwError(new Error(body.message)))
        )
    })
  }


}
