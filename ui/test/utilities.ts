import {format} from 'date-fns'

// @ts-ignore
import {Mock} from 'jest'
import {StateObservable} from 'redux-observable'
import {RootState} from '../src/store'
import {Observer, Subject} from 'rxjs'

export function asMock(f: Function): Mock {
  return f as unknown as Mock
}

export function getDateString(date: Date): string {
  return format(date, 'yyyy-MM-dd HH:mm:ss:SSS')
}

export function createEmptyRootState(): RootState {
  return {
    error: {
      message: null
    },
    note: {
      active: null,
      collection: new Map()
    }
  }
}

export function createStateObservable(state: RootState = createEmptyRootState()): StateObservable<RootState> {
  return new StateObservable<RootState>(new Subject<RootState>(), state)
}

export function createEmptyStateObservable(): StateObservable<RootState> {
  return createStateObservable(createEmptyRootState())
}

export function createObserverMock(): Observer<Mock> {
  return {
    next: jest.fn(),
    error: jest.fn(),
    complete: jest.fn()
  }
}
