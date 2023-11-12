import axios from "axios";
import React, { useState } from "react";
import {
  MdOutlineDeleteOutline,
  MdEditNote,
  MdOutlineCheckBox,
  MdOutlineCheckBoxOutlineBlank,
} from "react-icons/md";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";

const Table = ({ todos, setTodos }) => {
  const [editText, setEditText] = useState({
    body: "",
  });

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/todo/${id}/`);
      const newList = todos.filter((todo) => todo.id !== id);
      setTodos(newList);
    } catch (error) {
      console.log(error);
    }
  };

  // We are making a patch request and depending on the value
  // the respective value will be updated in the api
  const handleEdit = async (id, value) => {
    try {
      const response = await axios.patch(
        `http://127.0.0.1:8000/api/todo/${id}/`,
        value
      );
      const newTodos = todos.map((todo) =>
        todo.id === id ? response.data : todo
      );
      setTodos(newTodos);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckbox = (id, value) => {
    handleEdit(id, {
      completed: !value,
    });
  };

  const handleChange = (e) => {
    setEditText((prev) => ({
      ...prev,
      body: e.target.value,
    }));
  };

  const handleClick = () => {
    document.getElementById("my_modal_1").showModal()
    setEditText(todoItem)
  };


  return (
    <div className="py-2">
      <table className="w-11/12 max-w-4xl">
        <thead className="border-b-2 border-black">
          <tr>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Checkbox
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              To Do
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Status
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Date Created
            </th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todoItem, index) => {
            return (
              <tr key={todoItem.id} className="border-b border-black">
                <td className="p-3" title={todoItem.id}>
                  <span
                    onClick={() =>
                      handleCheckbox(todoItem.id, todoItem.completed)
                    }
                    className="inline-block cursor-pointer"
                  >
                    {" "}
                    {todoItem.completed ? (
                      <ImCheckboxChecked />
                    ) : (
                      <ImCheckboxUnchecked />
                    )}
                  </span>
                </td>
                <td className="p-3 text-sm">{todoItem.body}</td>
                <td className="p-3 text-sm">
                  <span
                    className={`p-1.5 text-sm font-medium tracking-wider rounded-md ${
                      todoItem.completed ? "bg-green-300" : "bg-red-300"
                    }`}
                  >
                    {todoItem.completed ? "Done" : "Todo"}
                  </span>
                </td>
                <td className="p-3 text-sm">
                  {new Date(todoItem.created).toLocaleString()}
                </td>
                <td className="p-3 text-sm font-medium grid grid-flow-col items-center mt-5">
                  <span className="text-xl cursor-pointer">
                    {" "}
                    <MdEditNote
                      onClick={handleClick}
                    />
                  </span>
                  <span className="text-xl cursor-pointer">
                    {" "}
                    <MdOutlineDeleteOutline
                      onClick={() => handleDelete(todoItem.id)}
                    />
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit Todo</h3>
          <p className="py-4">
            <input
              type="text"
              value={editText.body}
              onChange={handleChange}
              className="input input-bordered w-full max-w-xs"
            />
          </p>
          <div className="modal-action">
            <form method="dialog">
              <button
                className="btn btn-primary mx-3"
                onClick={() => handleEdit(editText.id, editText)}
              >
                Edit
              </button>
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Table;
