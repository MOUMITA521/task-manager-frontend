import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const TaskContext = createContext();

const API_URL = 'https://task-manager-backend-6yiw.onrender.com/tasks';

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const { token, logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [sortBy, setSortBy] = useState("createdAt");

  useEffect(() => {
    if (!token) return; // don't run the checker if logged out

    const notifiedTaskIds = new Set(); // tracks which tasks we've already notified for, this session

    const checkDueTasks = () => {
      if (!('Notification' in window) || Notification.permission !== 'granted') return;

      const now = new Date();

      tasks.forEach((task) => {
        if (!task.dueDate || task.completed) return;
        if (notifiedTaskIds.has(task._id)) return;

        const due = new Date(task.dueDate);
        const diffMs = due - now;

        // Notify if the due time is within the last 60 seconds (i.e., it just became due)
        if (diffMs <= 0 && diffMs > -60000) {
          new Notification("DoIt — Task Due", {
            body: task.text,
            icon: "🔔",
          });
          notifiedTaskIds.add(task._id);
        }
      });
    };

    const intervalId = setInterval(checkDueTasks, 30000); // check every 30 seconds
    checkDueTasks(); // also check immediately on load

    return () => clearInterval(intervalId); // cleanup when component unmounts or token changes
  }, [tasks, token]);

  useEffect(() => {
    fetchTasks();
  }, [token]);

  const fetchTasks = async () => {
    try {
      const response = await fetch(API_URL, {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (!response.ok) {
        // Token invalid/expired — log the user out so they're returned to login
        logout();
        return;
      }

      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (text, dueDate, category, priority, description) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ text, dueDate, category, priority, description }),
      });
      const newTask = await response.json();
      setTasks([...tasks, newTask]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      setTasks(tasks.filter(task => task._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const toggleComplete = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const updatedTask = await response.json();
      setTasks(tasks.map(task => task._id === id ? updatedTask : task));
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const editTask = async (id, text, dueDate, category, priority, description) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ text, dueDate, category, priority, description }),
      });
      const updatedTask = await response.json();
      setTasks(tasks.map(task => task._id === id ? updatedTask : task));
    } catch (error) {
      console.error("Error editing task:", error);
    }
  };

  return (
    <TaskContext.Provider value={{
      tasks, filter, setFilter,
      searchTerm, setSearchTerm,
      categoryFilter, setCategoryFilter,
      priorityFilter, setPriorityFilter,
      sortBy, setSortBy,
      addTask, deleteTask, toggleComplete, editTask, loading
    }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  return useContext(TaskContext);
}