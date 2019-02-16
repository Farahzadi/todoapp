import todos from '../__fixtures__/todos'
import {
  removeTodoById,
  removeTodosById,
  addTodo,
  getDoneTodos,
  getActiveTodos,
  getTodoIndexById,
  changeTodoTextById,
  changeTodoStatusById,
  getTodoIndexByProperty
} from './todoUtils'

test('remove existing todo from todos list successfully', () => {
  const id = '2'
  const result = removeTodoById(todos, id)
  expect(result).toEqual([
    { id: '1', text: 'first todos', done: true },
    { id: '3', text: 'third todos', done: true },
    { id: '4', text: 'forth todos', done: false },
    { id: '5', text: 'fifth todos', done: false }
  ])
})

test('throw error if try to remove todo by non existing id from todos', () => {
  const id = '100'
  expect(() => removeTodoById(todos, id)).toThrow(
    `todo by id "${id}" does not exists!`
  )
})

test('remove todos given list of ids', () => {
  const ids = ['1', '2', '5', 'a']
  const newTodos = removeTodosById(todos, ids)
  expect(newTodos).toEqual([
    { id: '3', text: 'third todos', done: true },
    { id: '4', text: 'forth todos', done: false }
  ])
})

test('throw error if id is null or undefined', () => {
  const id = null
  expect(() => removeTodoById(todos, id)).toThrow(
    'given id is null or undefined'
  )
})

test('add todo successfully', () => {
  const newTodos = addTodo(todos, 'todo text')
  expect(newTodos.length).toBe(todos.length + 1)
  expect(newTodos[newTodos.length - 1]).toMatchObject({
    text: 'todo text',
    done: false
  })
})

test('add todo duplicate ignore', () => {
    window.alert = jest.fn();
    const newTodos = addTodo(todos, 'third todos')
    expect(newTodos.length).toBe(todos.length)
})

test('throw error if todos is not array', () => {
  expect(() => {
    addTodo(null, 'some text')
  }).toThrow('todos should be an array')
})

test('get done todos', () => {
  expect(getDoneTodos(todos)).toEqual([
    { id: '1', text: 'first todos', done: true },
    { id: '3', text: 'third todos', done: true }
  ])
})

test('get active todos', () => {
  expect(getActiveTodos(todos)).toEqual([
    { id: '2', text: 'second todos', done: false },
    { id: '4', text: 'forth todos', done: false },
    { id: '5', text: 'fifth todos', done: false }
  ])
})

test('get todo index of existing id', () => {
  expect(getTodoIndexById(todos, '2')).toBe(1)
})

test('get -1 for todo index of non existing id', () => {
  expect(getTodoIndexById(todos, '223')).toBe(-1)
})

test('get index of non existing id', () => {
    expect(getTodoIndexByProperty(todos,'text', 'second todos')).toBe(1)
})

test('get -1 for todo index of non existing id', () => {
    expect(getTodoIndexByProperty(todos, 'text', '223')).toBe(-1)
})

test('change todo text of existing id', () => {
  const newTodos = changeTodoTextById(todos, '2', 'todo number 2')
  expect(newTodos).toEqual([
    { id: '1', text: 'first todos', done: true },
    { id: '2', text: 'todo number 2', done: false },
    { id: '3', text: 'third todos', done: true },
    { id: '4', text: 'forth todos', done: false },
    { id: '5', text: 'fifth todos', done: false }
  ])
})

test('change todo done status of existing id', () => {
  const newTodos = changeTodoStatusById(todos, '2', true)
  expect(newTodos).toEqual([
    { id: '1', text: 'first todos', done: true },
    { id: '2', text: 'second todos', done: true },
    { id: '3', text: 'third todos', done: true },
    { id: '4', text: 'forth todos', done: false },
    { id: '5', text: 'fifth todos', done: false }
  ])
})
