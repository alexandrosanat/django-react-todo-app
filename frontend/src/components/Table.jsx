import axios from "axios";
import React from "react";
import {
  MdOutlineDeleteOutline,
  MdEditNote,
  MdOutlineCheckBox,
  MdOutlineCheckBoxOutlineBlank,
} from "react-icons/md";

const Table = ({ todos, setTodos }) => {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/todo/${id}/`);
      const newList = todos.filter(todo => todo.id !== id)
      setTodos(newList)
    } catch (error) {
      console.log(error);
    }
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
                  <span className="inline-block cursor-pointer">
                    {" "}
                    {todoItem.completed ? (
                      <MdOutlineCheckBox />
                    ) : (
                      <MdOutlineCheckBoxOutlineBlank />
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
                    <MdEditNote />
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
    </div>
  );
};

export default Table;
