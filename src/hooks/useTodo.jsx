import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = 'http://localhost:4000/api/todo';

const useTodo = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch All Todos
  const fetchTodos = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_BASE_URL);
      setTodos(response.data);  
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load todos!");
    } finally {
      setLoading(false);
    }
  };

  // Create a Todo
  const createTodo = async (todo) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(API_BASE_URL, todo);
      setTodos((prevTodos) => [...prevTodos, response.data]); 
      await fetchTodos();
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // Mark Todo as Done
  const markTodoAsDone = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await axios.patch(`${API_BASE_URL}/${id}/done`);
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, isDone: true } : todo
        )
      );
      await fetchTodos();
    } catch (err) {
      setError(err.response?.data?.message || "Could not mark as Done!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return { todos, createTodo, markTodoAsDone, fetchTodos, loading, error };
};

export default useTodo;
