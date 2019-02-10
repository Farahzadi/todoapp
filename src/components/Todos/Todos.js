// @flow
import React, { useState } from 'react'
import TodoList from '../TodoList'
import TodoInput from '../TodoInput'
import TodoFooter from '../TodoFooter'
import './Todos.css'
import {
  removeTodoById,
  addTodo,
  getActiveTodos,
  getDoneTodos,
  changeTodoTextById,
  changeTodoStatusById
} from '../../utils/todoUtils'
import {
  fetchFilter,
  fetchTodos,
  saveFilter,
  saveTodos
} from '../../api/localStorage'

let todos = fetchTodos()
const initialFilter = fetchFilter()
let didMount = 0

function Todos() {
  const [activeFilter, setActiveFilter] = useState(null)
  const [visibleTodos, setVisibleTodos] = useState([])

  const setTodos = filter => {
    saveTodos(todos)
    if (filter === 'Active') {
      setVisibleTodos(getActiveTodos(todos))
    } else if (filter === 'Completed') {
      setVisibleTodos(getDoneTodos(todos))
    } else {
      setVisibleTodos(todos)
    }
  }

  if(didMount){
  setTodos(initialFilter)
  setActiveFilter(initialFilter)
  didMount = 1
  }

  // event handling
  const handleEnterText = text => {
    todos = addTodo(todos, text)
    setTodos(activeFilter)
  }
  const handleItemRemove = id => {
    todos = removeTodoById(todos, id)
    setTodos(activeFilter)
  }
  const handleChangeItemText = (id, text) => {
    todos = changeTodoTextById(todos, id, text)
    setTodos(activeFilter)
  }
  const handleChangeItemStatus = (id, status) => {
    todos = changeTodoStatusById(todos, id, status)
    setTodos(activeFilter)
  }
  const handleFilterClick = filter => {
    setActiveFilter(filter)
    setTodos(filter)
    saveFilter(filter)
  }
  const handleClearCompletes = () => {
    todos = getActiveTodos(todos)
    setTodos()
  }

  return (
    <div className='todos'>
      <TodoInput onEnterText={handleEnterText} />
      <TodoList
        todos={visibleTodos}
        onItemRemove={handleItemRemove}
        onChangeItemText={handleChangeItemText}
        onChangeItemStatus={handleChangeItemStatus}
      />
      <TodoFooter
        activeFilter={activeFilter}
        doneTodoCount={didMount && getActiveTodos(todos).length}
        onFilterClick={handleFilterClick}
        onClearCompletesClick={handleClearCompletes}
      />
    </div>
  )
}

export default Todos
