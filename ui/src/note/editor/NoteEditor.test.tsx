import {Note} from '../Note'
import {createRenderer, ShallowRenderer} from 'react-dom/test-utils'

let renderer: ShallowRenderer

const note: Note = {
  id: 'a',
  title: 'i',
  body: 'x',
  creationDate: new Date(),
  modificationDate: new Date()
}

beforeEach(() => {
  renderer = createRenderer()
})

it('should render title editor', () => {
})

it('should render body editor', () => {

})

it('should render meta pair list', () => {

})
