import { useState, useEffect } from "react";
import "./App.css";
import TodoForm from "./components/TodoForm";
import Table from "./components/Table";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/todo/");
      setTodos(response.data); // Assuming 'response.data' contains the todos
      setIsLoading(false);
      console.log(response.data); // Log the response data
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData(); // Call fetchData function within useEffect
  }, []);

  return (
    <>
      <div className="bg-indigo-100 px-8 min-h-screen" data-theme="light">
        <nav className="pt-8">
          <h1 className="text-5xl text-center pb-12">ToDo List</h1>
        </nav>
        <TodoForm fetchData={fetchData} />
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <Table todos={todos} setTodos={setTodos} />
        )}{" "}
      </div>
    </>
  );
}

export default App;
