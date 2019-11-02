import { from, Observable, throwError } from "rxjs"
import { mergeMap } from "rxjs/operators"

export function request<T extends any>(
  url: string,
  init: RequestInit | {body?: Record<string, string>}
): Observable<T> {

  return from(fetch(
    url,
    {
      ...init,
      body: init.body instanceof Object ? JSON.stringify(init.body) : init.body
    }
  )).pipe(
    mergeMap((response) => {
      if (!response.ok) {
        return throwError(response)
      }

      return from(response.json())
    })
  )
}
