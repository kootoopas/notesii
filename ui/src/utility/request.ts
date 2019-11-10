import {from, Observable, throwError} from "rxjs"
import {first, mergeMap} from "rxjs/operators"

export function request<T extends any>(
  url: string,
  init: RequestInit | {body?: Record<string, string>}
): Observable<T> {
  return from(fetch(
    url,
    {
      ...init,
      body: init.body && JSON.stringify(init.body)
    }
  )).pipe(
    first(),
    mergeMap((response) => {
      if (!response.ok) {
        return throwError(response)
      }

      return from(response.json())
    })
  )
}

export function createQueryString(params: {[key: string]: Object}): string {
  return Object.entries(params)
    .reduce(
      (qs, [key, value]) => {
        let prefix = '&'
        if (qs === '') {
          prefix = '?'
        }

        return qs + prefix + key + '=' + value.toString()
      },
      ''
    )
}
