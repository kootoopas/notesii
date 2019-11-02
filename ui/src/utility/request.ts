import { from, Observable, throwError, of } from "rxjs"
import { mergeMap } from "rxjs/operators"

export function request(
  url: string,
  init: RequestInit | {body?: Record<string, string>}
): Observable<any | never> {

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
