import React from 'react'

const TodoForm = () => {
  return (
    <div>
      <input type="text" placeholder="Add Todo" className="input input-bordered w-full max-w-xs"/>
      <button class="btn btn-primary ml-2">Add Todo</button>
    </div>
  )
}

export default TodoForm