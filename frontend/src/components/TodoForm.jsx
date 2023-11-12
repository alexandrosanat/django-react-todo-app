import React, { useState } from "react";
import axios from "axios";

const TodoForm = ({ setTodos, fetchData }) => {
  const [newTodo, setNewTodo] = useState({
    body: "",
  });

  const handleChange = (e) => {
    setNewTodo((prev) => ({
      ...prev,
      body: e.target.value,
    }));
  };

  const postTodo = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/api/todo/", newTodo);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Add Todo"
        className="input input-bordered w-full max-w-xs"
        onChange={handleChange}
        value={newTodo.body}
      />
      <button className="btn btn-outline btn-primary mx-3" onClick={postTodo}>
        Add Todo
      </button>
    </div>
  );
};

export default TodoForm;
