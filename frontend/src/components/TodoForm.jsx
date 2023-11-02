import React from 'react'

const TodoForm = () => {
  return (
    <div>
      <input type="text" placeholder="Add Todo" className="input input-bordered w-full max-w-xs"/>
      <button className="btn btn-outline btn-primary">Add Todo</button>
    </div>
  )
}

export default TodoForm