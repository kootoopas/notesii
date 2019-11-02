jest.mock('../utility/request')

import { NoteRepository } from './NoteRepository';
import {Note} from './Note';
import {asMock, getDateString} from '../../test/utilities';
import {notesApiBaseUrl} from '../../test/constants';
import {request} from '../utility/request'
import { of, throwError } from 'rxjs';

let repo: NoteRepository

const date1 = new Date()
const date2 = new Date()
const notes: Note[] = [
  {
    id: 'a',
    title: 'i',
    body: 'x',
    creationDate: date1,
    modificationDate: date1
  },
  {
    id: 'b',
    title: 'j',
    body: 'y',
    creationDate: date2,
    modificationDate: date2
  },
]
const responseNotes = [
  {
    id: 'a',
    title: 'i',
    body: 'x',
    creation_date: date1,
    modification_date: date1
  },
  {
    id: 'b',
    title: 'j',
    body: 'y',
    creation_date: date2,
    modification_date: date2
  },
]
let resourceUrl: string
let requestMock: any

beforeEach(() => {
  requestMock = asMock(request)
  requestMock.mockRestore()
  resourceUrl = `${notesApiBaseUrl}/notes`
  repo = new NoteRepository(resourceUrl)
})

it('should be created', () => {
  expect(repo).toBeTruthy()
})

describe('get', () => {
  it('should retrieve a single note by id', (done) => {
    requestMock.mockReturnValue(of(responseNotes[0]))

    repo.get('a').subscribe(note => {
      expect(note).toEqual(notes[0])
      expect(requestMock).toHaveBeenCalledTimes(1)
      expect(requestMock).toHaveBeenCalledWith(`${resourceUrl}/a`, {'method': 'GET'})
      done()
    })
  })

  it('should return null when server responds with no note', (done) => {
    requestMock.mockReturnValue(of({}))

    repo.get('a').subscribe(note => {
      expect(note).toEqual(null)
      expect(requestMock).toHaveBeenCalledTimes(1)
      expect(requestMock).toHaveBeenCalledWith(`${resourceUrl}/a`, {'method': 'GET'})
      done()
    })
  })
})

describe('getList', () => {
  it('should retrieve notes based on page', (done) => {
    requestMock.mockReturnValue(of([responseNotes[0]]))

    repo.getList(0, 1).subscribe(notes => {
      expect(notes).toEqual([notes[0]])
      expect(requestMock).toHaveBeenCalledTimes(1)
      expect(requestMock).toHaveBeenCalledWith(resourceUrl, {
        method: 'GET',
        body: new URLSearchParams({
          page: '0',
          size: '1'
        })
      })
      done()
    })
  })

  it('should return empty array when server responds with no results', (done) => {
    requestMock.mockReturnValue(of([]))

    repo.getList(1, 1).subscribe(notes => {
      expect(notes).toEqual([])
      expect(requestMock).toHaveBeenCalledTimes(1)
      expect(requestMock).toHaveBeenCalledWith(resourceUrl, {
          method: 'GET',
          body: new URLSearchParams({
            page: '1',
            size: '1'
          })
        }
      )
      done()
    })
  })
})

describe('search', () => {
  it('should retrieve notes based on text search parameter and page', (done) => {
    requestMock.mockReturnValue(of([responseNotes[0]]))

    repo.search('x', 0, 1).subscribe(notes => {
      expect(notes).toEqual([notes[0]])
      expect(requestMock).toHaveBeenCalledTimes(1)
      expect(requestMock).toHaveBeenCalledWith(resourceUrl, {
          method: 'GET',
          body: new URLSearchParams({
            text: 'x',
            page: '0',
            size: '1'
          })
        }
      )
      done()
    })
  })

  it('should return empty array when server responds with no results', (done) => {
    requestMock.mockReturnValue(of([]))

    repo.search('z', 1, 1).subscribe(notes => {
      expect(notes).toEqual([])
      expect(requestMock).toHaveBeenCalledTimes(1)
      expect(requestMock).toHaveBeenCalledWith(resourceUrl, {
        method: 'GET',
        body: new URLSearchParams({
          text: 'z',
          page: '1',
          size: '1'
        })
      })
      done()
    })
  })
})

describe('create', () => {
  it('should request note creation and return the created note on success', (done) => {
    const dateMock = new Date()
    const dateSpy = jest.spyOn(Date, 'now').mockImplementation(() => dateMock.getTime())
    requestMock.mockReturnValue(of({
      id: 'c',
      title: 'k',
      body: 'z',
      creation_date: getDateString(dateMock),
      modification_date: getDateString(dateMock)
    }))

    repo.create('k', 'z').subscribe(note => {
      expect(note).toEqual({
        id: 'c',
        title: 'k',
        body: 'z',
        creationDate: dateMock,
        modificationDate: dateMock
      } as Note)
      expect(requestMock).toHaveBeenCalledTimes(1)
      expect(requestMock).toHaveBeenCalledWith(resourceUrl, {
        method: 'POST',
        body: {
          title: 'k',
          body: 'z'
        }
      })

      dateSpy.mockRestore()
      done()
    })
  })

  it('should throw error when server sends client error response', (done) => {
    requestMock.mockReturnValue(throwError({
      json: () => Promise.resolve({message: 'Error.'})
    }))

    repo.create('k', 'z')
      .subscribe({
        error(error) {
          expect(error).toEqual(new Error('Error.'))
          expect(requestMock).toHaveBeenCalledTimes(1)
          expect(requestMock).toHaveBeenCalledWith(resourceUrl, {
            method: 'POST',
            body: {
              title: 'k',
              body: 'z'
            }
          })
          done()
        }
      })
  })
})

describe('update', () => {
  it('should request note update and return the updated note on success', (done) => {
    const modificationDate = new Date()
    const dateMock = jest.spyOn(Date, 'now').mockImplementation(() => modificationDate.getTime())
    requestMock.mockReturnValue(of({
      id: 'a',
      title: 'i2',
      body: 'y2',
      creation_date: getDateString(notes[0].creationDate),
      modification_date: getDateString(modificationDate)
    }))

    repo.update('a', 'i2', 'y2').subscribe(note => {
      expect(note).toEqual({
        id: 'a',
        title: 'i2',
        body: 'y2',
        creationDate: notes[0].creationDate,
        modificationDate
      } as Note)
      expect(requestMock).toHaveBeenCalledTimes(1)
      expect(requestMock).toHaveBeenCalledWith(`${resourceUrl}/a`, {
        method: 'PUT',
        body: {
          title: 'i2',
          body: 'y2'
        }
      })

      dateMock.mockRestore()
      done()
    })
  })

  it('should throw error when server sends client error response', () => {
    requestMock.mockReturnValue(throwError({
      json: () => Promise.resolve({message: 'Error.'})
    }))

    repo.update('c', 'k', 'z')
      .subscribe({
        error(error) {
          expect(error).toEqual(new Error('Error.'))
          expect(requestMock).toHaveBeenCalledTimes(1)
          expect(requestMock).toHaveBeenCalledWith(`${resourceUrl}/c`, {
            method: 'PUT',
            body: {
              title: 'k',
              body: 'z'
            }
          })
        }
      })
  })
})

describe('delete', () => {
  it('should request note deletion', () => {
    requestMock.mockReturnValue(of({}))

    repo.delete('a').subscribe((deletion) =>  {
      expect(deletion).toBeTruthy()
      expect(requestMock).toHaveBeenCalledTimes(1)
      expect(requestMock).toHaveBeenCalledWith(`${resourceUrl}/a`, {method: 'DELETE'})
    })
  })
})
