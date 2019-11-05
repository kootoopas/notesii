import {from, Observable, Subject} from 'rxjs'

export default class ErrorStore {
  errorSubject$ = new Subject<Error>()

  setError(error: Error) {
    this.errorSubject$.next(error)
  }

  clearError() {
    this.errorSubject$.next(undefined)
  }

  getError(): Observable<Error> {
    return from(this.errorSubject$)
  }
}
