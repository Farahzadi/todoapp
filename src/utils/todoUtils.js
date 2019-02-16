// @flow
import uuidv4 from 'uuid/v4'
import type { TodoItemType } from '../types/todos'

type Todos = Array<TodoItemType>

export function removeTodoById(todos: Todos, id: string): Todos {
  if (id === null || id === undefined) {
    throw new Error('given id is null or undefined')
  }
  const newTodos = todos.filter(todo => todo.id !== id)
  if (todos.length === newTodos.length) {
    throw new Error(`todo by id "${id}" does not exists!`)
  }
  return newTodos
}

export function removeTodosById(todos: Todos, ids: Array<string>): Todos {
  return todos.filter(todo => ids.indexOf(todo.id) === -1)
}

export function addTodo(todos: Todos, todoText: string): Todos {
  if (!Array.isArray(todos)) {
    throw new Error('todos should be an array')
  }
  const newTodo = { id: uuidv4(), text: todoText, done: false }
  if(getTodoIndexByProperty(todos,'text', todoText) > -1){
    alert('duplicate task!!');
    return todos;
  }
  return todos.concat(newTodo)
}

export function getDoneTodos(todos: Todos): Todos {
  return todos.filter(todo => todo.done)
}

export function getActiveTodos(todos: Todos): Todos {
  return todos.filter(todo => !todo.done)
}

export function getTodoIndexById(todos: Todos, id: string) {
  let index = -1
  for (let i = 0; i < todos.length; i += 1) {
    if (todos[i].id === id) {
      index = i
      break
    }
  }
  return index
}

export function getTodoIndexByProperty(todos: Todos, property: string, value: any): number {
    let index = -1
    for (let i = 0; i < todos.length; i++) {
        if (todos[i][property] === value) {
            index = i
            break
        }
    }
    return index
}

export function changeTodoTextById(todos: Todos, id: string, text: string) {
  return todos.map<TodoItemType>(todo =>
    todo.id === id ? { ...todo, text } : todo
  )
}

export function changeTodoStatusById(todos: Todos, id: string, done: boolean) {
  return todos.map<TodoItemType>(todo =>
    todo.id === id ? { ...todo, done } : todo
  )
}
